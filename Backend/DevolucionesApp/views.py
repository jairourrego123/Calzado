from ApiBackendApp.views import GeneralViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import status
from .serializers import *
from django.db.models import Sum
from FinanzasApp.models import Movimientos
from FinanzasApp.serializers import MovimientosSerializer
from EntradasApp.models import Entrada
from EntradasApp.serializers import EntradaSerializer
from .models import * 
from .serializers import *
from VentasApp.models import Venta
from VentasApp.serializers import VentaSerializer
from VentasApp.models import Venta
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.db import transaction
from .filters import *

# Create your views here.
class DevolucionViewSet(GeneralViewSet):
    serializer_class = DevolucionSerializer
    filterset_class = DevolucionFilter
    search_fields = ['fecha','orden', 'tipo', 'referencia']
    ordering_fields = ['id', 'fecha', 'tipo']

    @action(detail=False, methods=['get'], url_path='listar_basicos')
    def listar_basicos(self, request):
        queryset = self.get_queryset().values('id', 'tipo', 'fecha', 'referencia','valor_total')
        return Response(queryset)


class MotivoDevolucionViewSet(GeneralViewSet):
    serializer_class = MotivoDevolucionSerializer
    filterset_fields = ['nombre']
    search_fields = ['nombre']
    ordering_fields = ['id', 'nombre']

class RelacionProductoDevolucionViewSet(GeneralViewSet):
    serializer_class = RelacionProductoDevolucionSerializer
    filterset_fields = ['devolucion']
    search_fields = ['cantidad', 'valor_venta', 'descripcion', 'motivo__nombre']
    ordering_fields = ['id', 'cantidad', 'valor_venta']

class RegistrarDevolucionViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['post'], url_path='devolucion')
    def registrar_devolucion(self, request):
        devolucion_data = request.data.get('devolucion')
        productos_data = request.data.get('productos')

        try:
            # Obtener usuario y venta existente
            usuario = request.user
            tenant = usuario.tenant.id
            orden = devolucion_data.get('referencia')
            tipo = devolucion_data.get('tipo')
            if tipo == "VENTA":
                venta = get_object_or_404(Venta, orden=orden, tenant=tenant, state=True)
            else:
                entrada = get_object_or_404(Entrada, orden=orden, tenant=tenant, state=True)

            with transaction.atomic():
                devolucion_data["tenant"] = tenant
                devolucion_data["orden"] = orden
                devolucion_data["usuario"] = usuario.id
                # Validar devolución
                devolucion_serializer = DevolucionCreateSerializer(data=devolucion_data)
                if devolucion_serializer.is_valid():
                    devolucion = devolucion_serializer.save()
                else:
                    raise ValueError(devolucion_serializer.errors)

                # Agregar el ID de la devolución a cada producto
                for producto_data in productos_data:
                    producto_data['devolucion'] = devolucion.id
                    producto_data['tenant'] = tenant
                    producto_data['ganancia_producto'] = producto_data['valor_venta_producto'] - producto_data['costo_producto']  # Calcular ganancia por producto

                # Validar y crear relaciones de devolución-producto
                relacion_serializer = RelacionProductoDevolucionSerializer(data=productos_data, many=True)
                if relacion_serializer.is_valid():
                    relacion_serializer.save()
                else:
                    raise ValueError(relacion_serializer.errors)

                # Crear movimiento
                movimiento_data = {
                    "referencia": orden,
                    "tipo": "Devolución",
                    "valor": devolucion_data['valor_total'],
                    "usuario": usuario.id,
                    "tenant": tenant
                }
                movimientos_serializer = MovimientosSerializer(data=movimiento_data)
                if movimientos_serializer.is_valid():
                    movimientos_serializer.save()
                else:
                    raise ValueError(movimientos_serializer.errors)

                # Calcular el total de devoluciones
                devoluciones = Devolucion.objects.filter(state=True, referencia=orden, tenant=tenant).aggregate(suma_total=Sum('valor_total'))

                # Calcular el total de devoluciones de ganancia
                devoluciones_ganancia = RelacionProductoDevolucion.objects.filter(devolucion__referencia=orden, devolucion__tenant=tenant, devolucion__state=True).aggregate(suma_ganancia=Sum('ganancia_producto'))

                # Asegurar que los valores no sean None
                suma_total_devoluciones = devoluciones['suma_total'] or 0
                suma_ganancia_devoluciones = devoluciones_ganancia['suma_ganancia'] or 0

                # Actualizar la venta existente
                if tipo == "VENTA":
                    valor_total_ajustado = venta.valor_total - suma_total_devoluciones
                    ganancia_total_ajustada = venta.ganancia_total - suma_ganancia_devoluciones
                    venta_serializer = VentaSerializer(venta, data={"valor_total_ajustado": valor_total_ajustado, "ganancia_total_ajustada": ganancia_total_ajustada}, partial=True)
                    if not venta_serializer.is_valid():
                        raise ValueError(venta_serializer.errors)
                    venta_serializer.save()
                else:
                    valor_total_ajustado = entrada.valor_total - suma_total_devoluciones
                    entrada_serializer = EntradaSerializer(entrada, data={"valor_total_ajustado": valor_total_ajustado}, partial=True)
                    if not entrada_serializer.is_valid():
                        raise ValueError(entrada_serializer.errors)
                    entrada_serializer.save()

                # Retornar la devolución creada con sus productos
                devolucion_serializer = DevolucionSerializer(devolucion)
                return Response(devolucion_serializer.data, status=status.HTTP_201_CREATED)

        except Venta.DoesNotExist:
            return Response({'error': 'Venta no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
