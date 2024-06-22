from ApiBackendApp.views import GeneralViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import status
from .serializers import *
from django.db.models import Sum
from FinanzasApp.models import Movimientos
from FinanzasApp.serializers import MovimientosSerializer
from .models import * 
from .serializers import *
from VentasApp.models import Venta
from VentasApp.serializers import VentaSerializer
from VentasApp.models import Venta
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.db import transaction


# Create your views here.
class DevolucionViewSet(GeneralViewSet):
    serializer_class = DevolucionSerializer
    filterset_fields = ['fecha', 'tipo', 'referencia']
    search_fields = ['fecha', 'tipo', 'referencia']
    ordering_fields = ['id', 'fecha', 'tipo']

    @action(detail=False, methods=['get'], url_path='listar_basicos')
    def listar_basicos(self, request):
        queryset = self.get_queryset().values('id', 'tipo', 'fecha', 'referencia','valor')
        return Response(queryset)
    
    @action(detail=False, methods=['get'], url_path='rango_fecha')
    def por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        devoluciones = self.get_queryset().filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(devoluciones, many=True)
        return Response(serializer.data)
    
    # @action(detail=False, methods=['get'], url_path='suma_total')
    # def suma_total_por_fecha(self, request):
    #     fecha = request.query_params.get('fecha')
    #     devoluciones = Devolucion.objects.filter(fecha=fecha).aggregate(suma_total=Sum('valor'))
    #     return Response(devoluciones)

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
            usuario = User.objects.get(id=1)
            orden = devolucion_data.get('referencia')
            venta = get_object_or_404(Venta, orden=orden)

            # Validar devolución
            devolucion_serializer = DevolucionSerializer(data=devolucion_data)
            if not devolucion_serializer.is_valid():
                print("Error en crear devolución en registrar_devolucion()", devolucion_serializer.errors)
                return Response({'error': 'No se ha podido registrar la devolución. Valida los datos registrados.'}, status=status.HTTP_400_BAD_REQUEST)

            with transaction.atomic():
                # Crear devolución
                devolucion = devolucion_serializer.save()

                # Agregar el ID de la devolución a cada producto
                for producto_data in productos_data:
                    producto_data['devolucion'] = devolucion.id

                # Validar y crear relaciones de devolución-producto
                relacion_serializer = RelacionProductoDevolucionSerializer(data=productos_data, many=True)
                if not relacion_serializer.is_valid():
                    print("Error en crear relaciones de devolución-producto", relacion_serializer.errors)
                    return Response({'error': 'No se han podido registrar los productos en la devolución. Valida los datos registrados.'}, status=status.HTTP_400_BAD_REQUEST)
                relacion_serializer.save()

                # Crear movimiento
                movimiento_data = {
                    "referencia": orden,
                    "tipo": devolucion_data['tipo'],
                    "valor": devolucion_data['valor_total'],
                    "usuario": usuario.id,
                }
                movimientos_serializer = MovimientosSerializer(data=movimiento_data)
                if not movimientos_serializer.is_valid():
                    print("Error en crear el movimiento de registrar_devolucion()", movimientos_serializer.errors)
                    return Response({'error': 'No se ha podido registrar la devolución. Valida los datos registrados.'}, status=status.HTTP_400_BAD_REQUEST)
                movimientos_serializer.save()

                # Calcular el total de devoluciones
                devoluciones = Devolucion.objects.filter(state=True, referencia=venta.orden).aggregate(suma_total=Sum('valor_total'))

                # Actualizar la venta existente
                valor_total_ajustado = venta.valor_total_ajustado - devoluciones['suma_total']
                venta_serializer = VentaSerializer(venta, data={"valor_total_ajustado": valor_total_ajustado}, partial=True)
                if not venta_serializer.is_valid():
                    print("Error en actualizar la venta existente en registrar_devolucion()", venta_serializer.errors)
                    return Response(venta_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                venta_serializer.save()

                # Retornar la devolución creada con sus productos
                devolucion_serializer = DevolucionSerializer(devolucion)
                return Response(devolucion_serializer.data, status=status.HTTP_201_CREATED)

        except Venta.DoesNotExist:
            return Response({'error': 'Venta no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(str(e))
    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()

    #     if 'cantidad' in request.data and len(request.data) == 1:
    #         serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #         serializer.is_valid(raise_exception=True)
    #         self.perform_update(serializer)
    #         return Response(serializer.data)
    #     return Response({'error': 'Solo se puede actualizar el campo cantidad'}, status=status.HTTP_400_BAD_REQUEST)
