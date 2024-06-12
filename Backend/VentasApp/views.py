from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum
from .models import Venta, PagoVenta, RelacionProductoVenta
from .serializers import VentaSerializer, PagoVentaSerializer, RelacionProductoVentaSerializer,ClienteSerializer
from ApiBackendApp.views import GeneralViewSet

class ClienteViewSet(GeneralViewSet):
    serializer_class = ClienteSerializer
    filterset_fields = ['estado']
    search_fields = ['nombre', 'lugar']
    ordering_fields = ['id', 'nombre']

class VentaViewSet(GeneralViewSet):
    serializer_class = VentaSerializer
    filterset_fields = ['estado', 'cliente', 'usuario']
    search_fields = ['orden', 'cliente__nombre','fecha']
    ordering_fields = ['id', 'fecha', 'valor_total']

    @action(detail=False, methods=['get'], url_path='suma_total_ventas_por_fecha')
    def suma_total_ventas_por_fecha(self, request):
        fecha = request.query_params.get('fecha')
        ventas = self.get_queryset().filter(fecha=fecha).aggregate(suma_total=Sum('valor_total'))
        return Response(ventas)
    
    @action(detail=False, methods=['get'], url_path='ventas_por_rango_fecha')
    def ventas_por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        ventas = self.get_queryset().filter(fecha__range=[fecha_inicio, fecha_fin])
        serializer = self.get_serializer(ventas, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='ganancias_por_rango_fecha')
    def ganancias_por_rango_fecha(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        ganancias = self.get_queryset().filter(fecha__range=[fecha_inicio, fecha_fin]).aggregate(ganancia_total=Sum('ganancia_total'))
        return Response(ganancias)
    
    @action(detail=False, methods=['get'], url_path='suma_total_ganancias_por_fecha')
    def suma_total_ganancias_por_fecha(self, request):
        fecha = request.query_params.get('fecha')
        ganancias = self.get_queryset().filter(fecha=fecha).aggregate(ganancia_total=Sum('ganancia_total'))
        return Response(ganancias)
    
    @action(detail=False, methods=['get'], url_path='suma_total_por_estado_fecha')
    def suma_total_por_estado_fecha(self, request):
        estado = request.query_params.get('estado')
        fecha = request.query_params.get('fecha')
        ventas = self.get_queryset().filter(estado=estado, fecha=fecha).aggregate(suma_total=Sum('valor_total'))
        return Response(ventas)
    



class PagoVentaViewSet(GeneralViewSet):
    serializer_class = PagoVentaSerializer
    filterset_fields = ['venta', 'metodo_pago']
    search_fields = ['venta__orden']
    ordering_fields = ['id', 'valor']

    @action(detail=False, methods=['get'], url_path='suma_total_pagos_por_fecha')
    def suma_total_pagos_por_fecha(self, request):
        fecha = request.query_params.get('fecha')
        pagos = self.get_queryset().filter(fecha=fecha).aggregate(suma_total=Sum('valor'))
        return Response(pagos)
    
    @action(detail=False, methods=['get'], url_path='suma_total_por_venta_fecha')
    def suma_total_por_venta_fecha(self, request):
        venta = request.query_params.get('venta')
        fecha = request.query_params.get('fecha')
        pagos = self.get_queryset().filter(venta=venta, fecha=fecha).aggregate(suma_total=Sum('valor'))
        return Response(pagos)
    
    @action(detail=False, methods=['get'], url_path='suma_total_pago_por_metodo_pago')
    def suma_total_pago_por_metodo_pago(self, request):
        metodo_pago = request.query_params.get('metodo_pago')
        pagos = self.get_queryset().filter(metodo_pago=metodo_pago).aggregate(suma_total=Sum('valor'))
        return Response(pagos)

class RelacionProductoVentaViewSet(GeneralViewSet):
    serializer_class = RelacionProductoVentaSerializer
    filterset_fields = ['venta', 'producto', 'fecha']
    search_fields = ['venta__orden', 'producto__referencia']
    ordering_fields = ['id', 'cantidad', 'valor_venta_producto']

    
    
    @action(detail=False, methods=['patch'], url_path='actualizar_cantidad_devuelta')
    def actualizar_cantidad_devuelta(self, request, pk=None):
        instance = self.get_object()
        if 'cantidad_devuelta' in request.data:
            instance.cantidad_devuelta = request.data['cantidad_devuelta']
            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        return Response({'error': 'Solo se puede actualizar el campo cantidad devuelta'}, status=status.HTTP_400_BAD_REQUEST)
