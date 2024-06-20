
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum
from .serializers import MetodoDePagoSerializer, TransferenciaSerializer, MovimientosSerializer, CierreSerializer
from ApiBackendApp.views import GeneralViewSet


class MetodoDePagoViewSet(GeneralViewSet):
    serializer_class = MetodoDePagoSerializer
    filterset_fields = ['metodo_de_pago']
    search_fields = ['metodo_de_pago']
    ordering_fields = ['id', 'saldo_actual']

class TransferenciaViewSet(GeneralViewSet):
    serializer_class = TransferenciaSerializer
    filterset_fields = ['cuenta_origen', 'cuenta_destino']
    search_fields = ['cuenta_origen__metodo_de_pago', 'cuenta_destino__metodo_de_pago']
    ordering_fields = ['id', 'valor']

    @action(detail=False, methods=['get'], url_path='rango_fecha')
    def por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        transferencia = self.get_queryset().filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(transferencia, many=True)
        return Response(serializer.data)
    
class MovimientosViewSet(GeneralViewSet):
    serializer_class = MovimientosSerializer
    filterset_fields = ['tipo', 'usuario']
    search_fields = ['referencia', 'usuario__username','tipo','metodo_de_pago__metodo_de_pago']
    ordering_fields = ['id', 'fecha', 'valor']

    @action(detail=False, methods=['get'], url_path='rango_fecha')
    def por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        movimientos = self.get_queryset().filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(movimientos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='suma_total_por_fecha')
    def suma_total_por_fecha(self, request):
        fecha = request.query_params.get('fecha')
        movimientos = self.get_queryset().filter(fecha=fecha).aggregate(suma_total=Sum('valor'))
        return Response(movimientos)

class CierreViewSet(GeneralViewSet):
    serializer_class = CierreSerializer
    filterset_fields = ['fecha']
    search_fields = ['fecha']
    ordering_fields = ['id', 'valor', 'ganancia']

    @action(detail=False, methods=['get'], url_path='rango_fecha')
    def por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        cierres = self.get_queryset().filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(cierres, many=True)
        return Response(serializer.data)
    



