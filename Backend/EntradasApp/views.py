
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum
from .models import  Entrada
from .serializers import ProveedorSerializer, EntradaSerializer, RelacionProductoEntradaSerializer, PagoEntradaSerializer
from ApiBackendApp.views import GeneralViewSet

class ProveedorViewSet(GeneralViewSet):
    serializer_class = ProveedorSerializer
    filterset_fields = ['estado']
    search_fields = ['nombre', 'lugar']
    ordering_fields = ['id', 'nombre']

class EntradaViewSet(GeneralViewSet):
    serializer_class = EntradaSerializer
    filterset_fields = ['estado', 'proveedor', 'usuario']
    search_fields = ['orden', 'proveedor__nombre']
    ordering_fields = ['orden', 'fecha', 'valor']

    @action(detail=False, methods=['get'], url_path='por_rango_fecha')
    def por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        entradas = Entrada.objects.filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(entradas, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='suma_total_por_fecha')
    def suma_total_por_fecha(self, request):
        fecha = request.query_params.get('fecha')
        entradas = Entrada.objects.filter(fecha=fecha).aggregate(suma_total=Sum('valor'))
        return Response(entradas)

class RelacionProductoEntradaViewSet(GeneralViewSet):
    serializer_class = RelacionProductoEntradaSerializer
    filterset_fields = ['entrada', 'producto']
    search_fields = ['entrada__orden', 'producto__referencia']
    ordering_fields = ['id', 'cantidad', 'valor']

class PagoEntradaViewSet(GeneralViewSet):
    serializer_class = PagoEntradaSerializer
    filterset_fields = ['entrada', 'metodo_de_pago']
    search_fields = ['entrada__orden', 'metodo_de_pago__metodo_de_pago']
    ordering_fields = ['id', 'valor']
