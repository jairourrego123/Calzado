from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum
from .models import Gasto
from .serializers import GastoSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from ApiBackendApp.views import GeneralViewSet


class GastoViewSet(GeneralViewSet):
    serializer_class = GastoSerializer
    filterset_fields = ['tipo_gasto', 'usuario', 'metodo_pago']
    search_fields = ['orden', 'tipo_gasto', 'usuario__username', 'metodo_pago__metodo_de_pago']
    ordering_fields = ['id', 'fecha', 'valor']

    @action(detail=False, methods=['get'], url_path='por_rango_fecha')
    def por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        gastos = Gasto.objects.filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(gastos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='suma_total_gastos_por_fecha')
    def suma_total_gastos_por_fecha(self, request):
        fecha = request.query_params.get('fecha')
        gastos = Gasto.objects.filter(fecha=fecha).aggregate(suma_total=Sum('valor'))
        return Response(gastos)
    
    @action(detail=False, methods=['get'], url_path='suma_total_por_tipo_gasto')
    def suma_total_por_tipo_gasto(self, request):
        tipo_gasto = request.query_params.get('tipo_gasto')
        gastos = Gasto.objects.filter(tipo_gasto=tipo_gasto).aggregate(suma_total=Sum('valor'))
        return Response(gastos)
    
    @action(detail=False, methods=['get'], url_path='buscar_por_usuario_tipo_metodo_fecha')
    def buscar_por_usuario_tipo_metodo_fecha(self, request):
        usuario = request.query_params.get('usuario')
        tipo_gasto = request.query_params.get('tipo_gasto')
        metodo_pago = request.query_params.get('metodo_pago')
        fecha = request.query_params.get('fecha')
        gastos = Gasto.objects.filter(usuario=usuario, tipo_gasto=tipo_gasto, metodo_pago=metodo_pago, fecha=fecha)
        serializer = self.get_serializer(gastos, many=True)
        return Response(serializer.data)
