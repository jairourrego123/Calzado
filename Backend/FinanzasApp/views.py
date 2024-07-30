
from rest_framework.response import Response
from decimal import Decimal
from rest_framework.decorators import action
from rest_framework import status
from django.db.models import Sum
from .serializers import MetodoDePagoSerializer, TransferenciaSerializer, MovimientosSerializer, CierreSerializer,TransferenciaCreateSerializer
from ApiBackendApp.views import GeneralViewSet
from .filters import *
from django.db import transaction

class MetodoDePagoViewSet(GeneralViewSet):
    serializer_class = MetodoDePagoSerializer
    filterset_fields = ['nombre']
    search_fields = ['nombre']
    ordering_fields = ['id', 'saldo_actual']

class TransferenciaViewSet(GeneralViewSet):
    serializer_class = TransferenciaSerializer
    filterset_class = TransferenciaFilter
    search_fields = ['cuenta_origen__nombre', 'cuenta_destino__nombre']
    ordering_fields = ['id', 'valor']
    
    def create(self, request, *args, **kwargs):
            try:
                usuario = request.user
                tenant = usuario.tenant
                cuenta_origen_id = int(request.data.get('cuenta_origen'))
                cuenta_destino_id = request.data.get('cuenta_destino')
                
                if not isinstance(cuenta_destino_id, int):
                    
                        cuenta_destino_id = None
                valor = Decimal(request.data.get('valor'))  # Convertir a Decimal
                descripcion = request.data.get('descripcion')

                with transaction.atomic():
                    # Obtener las cuentas origen y destino
                    cuenta_origen = MetodoDePago.objects.get(id=cuenta_origen_id, tenant=tenant, state=True)
                    if cuenta_destino_id:
                        cuenta_destino = MetodoDePago.objects.get(id=cuenta_destino_id, tenant=tenant, state=True)
                    else :
                        cuenta_destino = cuenta_destino_id
                    # Verificar que la cuenta origen tenga suficiente saldo
                    if cuenta_origen.saldo_actual < valor:
                        return Response({'error': 'Saldo insuficiente en la cuenta origen'}, status=status.HTTP_400_BAD_REQUEST)

                    # Restar el valor de la cuenta origen
                    cuenta_origen.saldo_actual -= valor
                    cuenta_origen.save()

                    # Sumar el valor a la cuenta destino
                    if cuenta_destino:
                        cuenta_destino.saldo_actual += valor
                        cuenta_destino.save()

                    # Registrar la transferencia
                    transferencia = Transferencia(
                        cuenta_origen=cuenta_origen,
                        cuenta_destino= cuenta_destino,
                        valor=valor,
                        descripcion=descripcion,
                        usuario=usuario,
                        tenant=tenant
                    )
                    transferencia.save()

                transferencia_serializer = TransferenciaCreateSerializer(transferencia)
                return Response(transferencia_serializer.data, status=status.HTTP_201_CREATED)

            except MetodoDePago.DoesNotExist:
                return Response({'error': 'Cuenta origen o destino no encontrada'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class MovimientosViewSet(GeneralViewSet):
    serializer_class = MovimientosSerializer
    filterset_class = MovimientosFilter
    search_fields = ['referencia', 'usuario__first_name','tipo','metodo_de_pago__nombre']
    ordering_fields = ['id', 'fecha', 'valor']
    
    @action(detail=False, methods=['get'], url_path='suma_total_por_fecha')
    def suma_total_por_fecha(self, request):
        fecha = request.query_params.get('fecha')
        movimientos = self.get_queryset().filter(fecha=fecha).aggregate(suma_total=Sum('valor'))
        return Response(movimientos)

class CierreViewSet(GeneralViewSet):
    serializer_class = CierreSerializer
    filterset_class = CierreFilter  
    search_fields = ['fecha']
    ordering_fields = ['id', 'valor', 'ganancia']

    @action(detail=False, methods=['get'], url_path='rango_fecha')
    def por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        cierres = self.get_queryset().filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(cierres, many=True)
        return Response(serializer.data)
    



