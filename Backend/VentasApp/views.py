from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView

from django.db.models import Sum
from .models import Venta, PagoVenta, RelacionProductoVenta
from FinanzasApp.models import Movimientos, MetodoDePago
from FinanzasApp.serializers import MovimientosSerializer
from InventarioApp.models import Producto
from DevolucionesApp.serializers import RelacionProductoDevolucionSerializer, RelacionProductoDevolucion
from .serializers import *
from .models import PagoVenta,Cliente
from django.contrib.auth.models import User
from ApiBackendApp.views import GeneralViewSet
from django.shortcuts import get_object_or_404
from django.db import transaction
from .filters import *

class ClienteViewSet(GeneralViewSet):
    serializer_class = ClienteSerializer
    filterset_fields = ['estado']
    search_fields = ['nombre', 'lugar']
    ordering_fields = ['id', 'nombre']
    permission_classes = []
    
    def paginate_queryset(self, queryset):
        return None


class VentaViewSet(GeneralViewSet):
    serializer_class = VentaSerializer
    filterset_class = VentaFilter
    search_fields = ['orden', 'cliente__nombre','fecha']
    ordering_fields = ['id', 'fecha', 'valor_total']


    def get_serializer_class(self):
        if self.action == 'list':
            return VentaBasicosSerializer
        return super().get_serializer_class()
    
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
    
    
    
    def create(self, request, *args, **kwargs):
        venta_data = request.data.get('venta')
        productos_data = request.data.get('productos')
        pagos_data = request.data.get('pagos')

        usuario = request.user
        tenant = usuario.tenant.id # Asumiendo que el usuario tiene un atributo tenant
        try:
            with transaction.atomic():
                if venta_data['cliente_id']:
                    cliente = Cliente.objects.filter(id=venta_data['cliente_id'],tenant=tenant,state=True).first()
                else:
                    cliente = Cliente.objects.filter(cliente_predeterminado=True,tenant=tenant,state=True).first()
                # Crear la venta
                venta_data['usuario'] = usuario.id
                venta_data['tenant'] = tenant
                venta_data['cliente'] = cliente.id
                venta_data['valor_total'] = venta_data['valor']
                venta_data['valor_total_ajustado'] = venta_data['valor']
                venta_data['ganancia_total'] = venta_data['ganancia_total']
                venta_data['ganancia_total_ajustada'] = venta_data['ganancia_total']
                venta_serializer = VentaCreateSerializer(data=venta_data)
                if venta_serializer.is_valid():
                    venta = venta_serializer.save()
                else:
                    raise ValueError(venta_serializer.errors)
                
            # return Response({}, status=status.HTTP_201_CREATED)
                #Update Cliente
                
                if  venta_data['estado']:
                    estado_cliente = not Venta.objects.filter(cliente=cliente.id,estado=False,state=True).exists()
                    cliente.estado = estado_cliente
                    cliente.save()
                else :
                    cliente.estado = venta_data['estado']
                    cliente.save()
                
                # Crear las relaciones producto-venta
                for producto_data in productos_data:
                    producto = Producto.objects.get(id=producto_data['id'],tenant=tenant,state=True)
                    producto_data['venta'] = venta.id
                    producto_data['tenant'] = tenant
                    producto_data['cantidad_devuelta'] = 0
                    producto_data['producto'] = producto.id
                    producto_data['valor'] = producto_data['valor_venta_producto']
                    producto_data['valor_ultima_compra'] = producto.valor_compra
                    relacion_producto_serializer = RelacionProductoVentaSerializer(data=producto_data)
                    if relacion_producto_serializer.is_valid():
                         relacion_producto = relacion_producto_serializer.save()
                         producto.cantidad -= int(producto_data['cantidad'])
                         producto.save()
                    else:
                         raise Exception(relacion_producto_serializer.errors)
                 
                 # Crear los pagos
                for pago_data in pagos_data:
                    pago_data['venta'] = venta.id
                    pago_data['tenant'] = tenant
                    pago_serializer = PagoVentaSerializer(data=pago_data)
                    if pago_serializer.is_valid():
                         pago = pago_serializer.save()

                         metodo_de_pago = MetodoDePago.objects.get(id=pago_data['metodo_de_pago'], tenant=tenant)
                         metodo_de_pago.saldo_actual += pago_data['valor']
                         metodo_de_pago.save()

                         # Crear movimiento
                         movimiento_data = {
                             'referencia': venta.orden,
                             'tipo': 'Venta',
                             'valor': pago_data['valor'],
                             'usuario': usuario.id,
                             'metodo_de_pago': pago_data['metodo_de_pago'],
                             'descripcion':"Venta a " + cliente.nombre,
                             'tenant':tenant
                         }
                         movimiento_serializer = MovimientosSerializer(data=movimiento_data)
                         if movimiento_serializer.is_valid():
                             movimiento_serializer.save()
                         else:
                             raise ValueError(movimiento_serializer.errors)
                    else:
                         raise ValueError(pago_serializer.errors)

            return Response({
                 'venta': VentaBasicosSerializer(venta).data,
             }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['get'], url_path='detail_spend')
    def detalle_venta(self, request, pk=None):
        try:
            # Ventas
            venta = self.get_queryset().filter(id=pk).first()
            if not venta:
                return Response({'error': 'Venta no encontrada'}, status=404)
            serializerVenta = VentaBasicosSerializer(venta)

            # Productos
            productos = RelacionProductoVenta.objects.filter(state=True, venta=pk)
            serializerProducto = RelacionProductoVentaSerializer(productos, many=True)

            # Pagos
            pagos = PagoVenta.objects.filter(state=True, venta=pk)
            serializerPago = PagoVentaSerializer(pagos, many=True)

            # Devolución
            productos_devueltos = RelacionProductoDevolucion.objects.filter(state=True, devolucion__referencia=venta.orden)
            serializerDevolucionProductos = RelacionProductoDevolucionSerializer(productos_devueltos, many=True)

            # Métodos de pago
            metodos_de_pago = MetodoDePago.objects.filter(state=True,tenant=request.user.tenant).values("id", "nombre")

            data = {
                'venta': serializerVenta.data,
                'cliente': {"nombre": serializerVenta.data.get('cliente')},
                'productos': list(serializerProducto.data),
                'pagos': list(serializerPago.data),
                'devolucion': list(serializerDevolucionProductos.data),
                'metodos_de_pago': list(metodos_de_pago)
            }

            return Response(data, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

class PagoVentaViewSet(GeneralViewSet):
    serializer_class = PagoVentaSerializer
    filterset_fields = ['venta', 'metodo_de_pago']
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
        metodo_pago = request.query_params.get('metodo_de_pago')
        pagos = self.get_queryset().filter(metodo_de_pago=metodo_pago).aggregate(suma_total=Sum('valor'))
        return Response(pagos)

class RelacionProductoVentaViewSet(GeneralViewSet):
    serializer_class = RelacionProductoVentaSerializer
    filterset_fields = ['venta', 'producto', 'fecha']
    search_fields = ['venta__orden', 'producto__referencia']
    ordering_fields = ['id', 'cantidad', 'valor_venta_producto']

    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        if 'cantidad_devuelta' in request.data and len(request.data) == 1:
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response({'error': 'Solo se puede actualizar la cantidad devuelta'}, status=status.HTTP_400_BAD_REQUEST)


class RegistrarPagosViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['post'], url_path='pagos')
    def registrar_pagos(self, request):
        try:
            usuario = request.user
            tenant = usuario.tenant.id
            tenant_instance = usuario.tenant
            pagos_data = request.data.get('pagos')
            venta_data = request.data.get('venta')
            
            with transaction.atomic():
                # Obtener y actualizar la venta existente
                venta = Venta.objects.get(id=venta_data['id'], tenant=tenant, state=True)
                venta_serializer = VentaCreateSerializer(venta, data=venta_data, partial=True)

                # Crear la venta
                if venta_serializer.is_valid():
                    venta_serializer.save()
                else:
                    raise ValueError(venta_serializer.errors)
                print("venta",venta.cliente_id)
                if venta.cliente_id:
                    cliente = Cliente.objects.filter(id=venta.cliente_id,tenant=tenant,state=True).first()
                else:
                    cliente = Cliente.objects.filter(cliente_predeterminado=True,tenant=tenant,state=True).first()
                    
                # Añadir usuario y tenant a cada pago en pagos_data
                for pago in pagos_data:
                    pago['usuario'] = usuario.id
                    pago['tenant'] = tenant
                
                
                   #Update Cliente
                
                if  venta_data['estado']:
                    estado_cliente = not Venta.objects.filter(cliente=cliente.id,estado=False,state=True).exists()
                    cliente.estado = estado_cliente
                    cliente.save()
                else :
                    cliente.estado = venta_data['estado']
                    cliente.save()
                    
                # Crear los pagos
                pagos_serializer = PagoVentaSerializer(data=pagos_data, many=True)
                if pagos_serializer.is_valid():
                    pagos = pagos_serializer.save()
                    # Preparar los movimientos para bulk_create
                    movimientos = []
                    for pago in pagos:
                        movimientos.append(Movimientos(
                            referencia=venta.orden,
                            tipo='Abono',
                            valor=pago.valor,
                            metodo_de_pago=pago.metodo_de_pago,
                            usuario=usuario,
                            descripcion="Abono de " + cliente.nombre,
                            tenant=tenant_instance
                            
                        ))

                        # Actualizar el saldo del método de pago sumando el valor del pago
                        metodo_de_pago = MetodoDePago.objects.get(id=pago.metodo_de_pago.id, tenant=tenant)
                        metodo_de_pago.saldo_actual += pago.valor
                        metodo_de_pago.save()

                    Movimientos.objects.bulk_create(movimientos)
                else:
                    raise ValueError(pagos_serializer.errors)

            return Response(status=status.HTTP_201_CREATED)

        except Venta.DoesNotExist:
            return Response({'error': 'Venta no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
