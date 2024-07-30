from rest_framework import  status
from rest_framework.response import Response
from django.db import transaction
from rest_framework.decorators import action
from django.db.models import Sum
from .models import Gasto
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from ApiBackendApp.views import GeneralViewSet
from .filters import GastosFilter
from FinanzasApp.serializers import MovimientosSerializer
from FinanzasApp.models import MetodoDePago

class GastoViewSet(GeneralViewSet):
    serializer_class = GastoSerializer
    filterset_class = GastosFilter
    filterset_fields = ['tipo_gasto', 'usuario', 'metodo_de_pago']
    search_fields = ['orden', 'usuario__first_name', 'metodo_de_pago__nombre','fecha']
    ordering_fields = ['id', 'fecha', 'valor']

    def create(self, request, *args, **kwargs):
        gasto_data = request.data
        metodo_de_pago_id = gasto_data.get('metodo_de_pago')
        usuario = request.user
        tenant = usuario.tenant.id
        try:
            with transaction.atomic():
                
                gasto_data["usuario"]=usuario.id
                gasto_data["tenant"]=tenant
                
                # Crear el gasto
                gasto_serializer = GastoCreateSerializer(data=gasto_data)
                if not gasto_serializer.is_valid():
                    return Response(gasto_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                gasto = gasto_serializer.save()
                
                # Crear el movimiento
                movimiento_data = {
                    "referencia": gasto.orden,
                    "tipo": "Gasto "+str(gasto.tipo_gasto),
                    "valor": gasto.valor,
                    "usuario": usuario.id,
                    "metodo_de_pago":metodo_de_pago_id,
                    "tenant":tenant
                }
                movimiento_serializer = MovimientosSerializer(data=movimiento_data)
                if not movimiento_serializer.is_valid():
                    raise ValueError(movimiento_serializer.errors)
                movimiento_serializer.save()

                # Actualizar el saldo del método de pago
                metodo_de_pago = MetodoDePago.objects.get(id=metodo_de_pago_id)
                metodo_de_pago.saldo_actual -= gasto.valor
                metodo_de_pago.save()
                return Response(gasto_serializer.data, status=status.HTTP_201_CREATED)
        except ValueError as ve:
            return Response({'error': ve.args[0]}, status=status.HTTP_400_BAD_REQUEST)
        except MetodoDePago.DoesNotExist:
            return Response({'error': 'Método de pago no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    @action(detail=False, methods=['get'], url_path='rango_fecha')
    def por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        gastos = self.get_queryset().filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(gastos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='suma_total_gastos_por_fecha')
    def suma_total_gastos_por_fecha(self, request):
        fecha = request.query_params.get('fecha')
        gastos = self.get_queryset().filter(fecha=fecha).aggregate(suma_total=Sum('valor'))
        return Response(gastos)
    
    @action(detail=False, methods=['get'], url_path='suma_total_por_tipo_gasto')
    def suma_total_por_tipo_gasto(self, request):
        tipo_gasto = request.query_params.get('tipo_gasto')
        gastos = self.get_queryset().filter(tipo_gasto=tipo_gasto).aggregate(suma_total=Sum('valor'))
        return Response(gastos)
    

class TipoGastoViewSet(GeneralViewSet):
    serializer_class = TipoGastoSerializer
    filterset_fields = ['nombre']
    ordering_fields = ['id', 'fecha', 'valor']