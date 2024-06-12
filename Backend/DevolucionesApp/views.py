from ApiBackendApp.views import GeneralViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from .serializers import *
from django.db.models import Sum


# Create your views here.
class DevolucionViewSet(GeneralViewSet):
    serializer_class = DevolucionSerializer
    filterset_fields = ['fecha', 'tipo', 'referencia']
    search_fields = ['fecha', 'tipo', 'referencia']
    ordering_fields = ['id', 'fecha', 'tipo']

    @action(detail=False, methods=['get'], url_path='listar_basicos')
    def listar_basicos(self, request):
        queryset = self.filter_queryset(self.get_queryset().values('id', 'tipo', 'fecha', 'referencia'))
        return Response(queryset)
    
    @action(detail=False, methods=['get'], url_path='por_rango_fecha')
    def por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        devoluciones = Devolucion.objects.filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(devoluciones, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='suma_total_por_fecha')
    def suma_total_por_fecha(self, request):
        fecha = request.query_params.get('fecha')
        devoluciones = Devolucion.objects.filter(fecha=fecha).aggregate(suma_total=Sum('valor'))
        return Response(devoluciones)

class MotivoDevolucionViewSet(GeneralViewSet):
    serializer_class = MotivoDevolucionSerializer
    filterset_fields = ['nombre']
    search_fields = ['nombre']
    ordering_fields = ['id', 'nombre']

class RelacionProductoDevolucionViewSet(GeneralViewSet):
    serializer_class = RelacionProductoDevolucionSerializer
    filterset_fields = ['cantidad', 'valor_venta', 'descripcion', 'motivo__nombre']
    search_fields = ['cantidad', 'valor_venta', 'descripcion', 'motivo__nombre']
    ordering_fields = ['id', 'cantidad', 'valor_venta']

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        if 'cantidad' in request.data and len(request.data) == 1:
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response({'error': 'Solo se puede actualizar el campo cantidad'}, status=status.HTTP_400_BAD_REQUEST)
