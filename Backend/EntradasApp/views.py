
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
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

    @action(detail=False, methods=['get'], url_path='rango_fecha')
    def por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        entradas =self.get_queryset().filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(entradas, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='suma_total_por_fecha')
    def suma_total_por_fecha(self, request):
        fecha = request.query_params.get('fecha')
        entradas = self.get_queryset().filter(fecha=fecha).aggregate(suma_total=Sum( 'valor'))
        return Response(entradas)

class RelacionProductoEntradaViewSet(GeneralViewSet):
    serializer_class = RelacionProductoEntradaSerializer
    filterset_fields = ['entrada', 'producto']
    search_fields = ['entrada__orden', 'producto__referencia']
    ordering_fields = ['id', 'cantidad', 'valor']
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        if 'cantidad_devuelta' in request.data and len(request.data) == 1:
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response({'error': 'Solo se puede actualizar el campo cantidad'}, status=status.HTTP_400_BAD_REQUEST)

class PagoEntradaViewSet(GeneralViewSet):
    serializer_class = PagoEntradaSerializer
    filterset_fields = ['entrada', 'metodo_de_pago']
    search_fields = ['entrada__orden', 'metodo_de_pago__metodo_de_pago']
    ordering_fields = ['id', 'valor']
