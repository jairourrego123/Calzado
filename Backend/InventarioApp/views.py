from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum,F
from .serializers import ProductoSerializer
from ApiBackendApp.views import GeneralViewSet

class ProductoViewSet(GeneralViewSet):
    serializer_class = ProductoSerializer
    filterset_fields = ['referencia', 'estado']
    search_fields = ['estilo', 'color', 'fecha','referencia']
    ordering_fields = ['id', 'fecha', 'estilo','color']

    @action(detail=False, methods=['get'], url_path='rango_fecha')
    def por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        producto = self.get_queryset().filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(producto, many=True)
        return Response(serializer.data)
    @action(detail=False, methods=['get'], url_path='suma_total')
    def suma_total_por_fecha(self, request):
            movimientos = self.get_queryset().aggregate(
                suma_total=Sum(F('valor_compra') * F('cantidad'))
            )
            return Response(movimientos)
        
   
    
   
    