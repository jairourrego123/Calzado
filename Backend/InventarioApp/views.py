from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum
from .models import Producto
from .serializers import ProductoSerializer
from ApiBackendApp.views import GeneralViewSet

class ProductoViewSet(GeneralViewSet):
    serializer_class = ProductoSerializer
    filterset_fields = ['producto', 'tipo_movimiento', 'usuario']
    search_fields = ['producto__referencia', 'tipo_movimiento', 'usuario__username']
    ordering_fields = ['id', 'fecha', 'cantidad']

    @action(detail=False, methods=['get'], url_path='por_rango_fecha')
    def por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        movimientos = Producto.objects.filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(movimientos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='suma_total_por_fecha')
    def suma_total_por_fecha(self, request):
        fecha = request.query_params.get('fecha')
        movimientos = Producto.objects.filter(fecha=fecha).aggregate(suma_total=Sum('cantidad'))
        return Response(movimientos)
    
    @action(detail=False, methods=['get'], url_path='suma_total_por_producto')
    def suma_total_por_producto(self, request):
        producto = request.query_params.get('producto')
        movimientos = Producto.objects.filter(producto=producto).aggregate(suma_total=Sum('cantidad'))
        return Response(movimientos)
    
    @action(detail=False, methods=['get'], url_path='buscar_por_tipo_usuario_fecha')
    def buscar_por_tipo_usuario_fecha(self, request):
        tipo_movimiento = request.query_params.get('tipo_movimiento')
        usuario = request.query_params.get('usuario')
        fecha = request.query_params.get('fecha')
        movimientos = Producto.objects.filter(tipo_movimiento=tipo_movimiento, usuario=usuario, fecha=fecha)
        serializer = self.get_serializer(movimientos, many=True)
        return Response(serializer.data)
