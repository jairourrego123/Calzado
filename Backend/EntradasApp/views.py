
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.db.models import Sum
from .models import  Entrada
from .serializers import ProveedorSerializer, EntradaSerializer,EntradaCreateSerializer, RelacionProductoEntradaSerializer, PagoEntradaSerializer
from ApiBackendApp.views import GeneralViewSet
from .filters import EntradaFilter
from django.db import transaction

class ProveedorViewSet(GeneralViewSet):
    serializer_class = ProveedorSerializer
    filterset_fields = ['estado']
    search_fields = ['nombre', 'lugar']
    ordering_fields = ['id', 'nombre']

class EntradaViewSet(GeneralViewSet):
    serializer_class = EntradaSerializer
    filterset_class = EntradaFilter
    search_fields = ['orden', 'proveedor__nombre']
    ordering_fields = ['orden', 'fecha', 'valor_total']

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
    
    def create(self, request, *args, **kwargs):
        entrada_data = request.data.get('entrada')
        productos_data = request.data.get('productos')
        pagos_data = request.data.get('pagos')

        usuario = request.user
        tenant = usuario.tenant  # Asumiendo que el usuario tiene un atributo tenant
        try:
            with transaction.atomic():

                # Crear la venta

                entrada_data['usuario'] = usuario.id
                entrada_data['tenant'] = tenant.id
                entrada_data['valor_total'] = entrada_data['valor']
                entrada_serializer = EntradaCreateSerializer(data=entrada_data, context={'request': request})
                if entrada_serializer.is_valid():
                    entrada = entrada_serializer.save()
                else:
                    raise ValueError(entrada_serializer.errors)
            return Response({}, status=status.HTTP_201_CREATED)
                # Crear las relaciones producto-venta
            #     for producto_data in productos_data:
            #         producto = Producto.objects.get(id=producto_data['id'],tenant=tenant.id)
            #         producto_data['venta'] = venta.id
            #         producto_data['tenant'] = tenant.id
            #         producto_data['cantidad_devuelta'] = 0
            #         producto_data['producto'] = producto.id
            #         producto_data['valor_compra'] = producto.valor_compra
            #         relacion_producto_serializer = RelacionProductoVentaSerializer(data=producto_data)
            #         if relacion_producto_serializer.is_valid():
            #              relacion_producto = relacion_producto_serializer.save()
            #              producto.cantidad -= int(producto_data['cantidad'])
            #              producto.save()
            #         else:
            #              raise Exception(relacion_producto_serializer.errors)
            #      # Crear los pagos
            #     for pago_data in pagos_data:
            #         pago_data['venta'] = venta.id
            #         pago_data['tenant'] = tenant.id
            #         pago_serializer = PagoVentaSerializer(data=pago_data)
            #         if pago_serializer.is_valid():
            #              pago = pago_serializer.save()

            #              metodo_de_pago = MetodoDePago.objects.get(id=pago_data['metodo_de_pago'], tenant=tenant.id)
            #              metodo_de_pago.saldo_actual += pago_data['valor']
            #              metodo_de_pago.save()

            #              # Crear movimiento
            #              movimiento_data = {
            #                  'referencia': venta.orden,
            #                  'tipo': 'Venta',
            #                  'valor': pago_data['valor'],
            #                  'usuario': usuario.id,
            #                  'metodo_de_pago': pago_data['metodo_de_pago'],
            #                  'tenant':tenant.id
            #              }
            #              movimiento_serializer = MovimientosSerializer(data=movimiento_data)
            #              if movimiento_serializer.is_valid():
            #                  movimiento_serializer.save()
            #              else:
            #                  raise ValueError(movimiento_serializer.errors)
            #         else:
            #              raise ValueError(pago_serializer.errors)

            # return Response({
            #      'venta': VentaBasicosSerializer(venta).data,
            #  }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



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
        return Response({'error': 'Solo se puede actualizar la cantidad devuelta'}, status=status.HTTP_400_BAD_REQUEST)

class PagoEntradaViewSet(GeneralViewSet):
    serializer_class = PagoEntradaSerializer
    filterset_fields = ['entrada', 'metodo_de_pago']
    search_fields = ['entrada__orden', 'metodo_de_pago__metodo_de_pago']
    ordering_fields = ['id', 'valor']
