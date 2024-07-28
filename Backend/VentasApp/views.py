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
        tenant = usuario.tenant  # Asumiendo que el usuario tiene un atributo tenant
        try:
            with transaction.atomic():
                
                cliente = Cliente.objects.get(id=venta_data['cliente_id'],tenant=tenant,state=True)
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
                #Update proveedor
                
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
            serializerVenta = VentaSerializer(venta)

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
            metodos_de_pago = MetodoDePago.objects.filter(state=True).values("id", "nombre")

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
        pagos_data = request.data.get('pagos')
        venta_data = request.data.get('venta')

        try:
            # Buscar la venta y usuario existente
            usuario = User.objects.get(id=1)
            orden = venta_data.get('orden')
            venta = get_object_or_404(Venta, orden=orden)

            # Actualizar la venta existente
            venta_serializer = VentaSerializer(venta, data=venta_data, partial=True)
            if not venta_serializer.is_valid():
                print("Error en Actualizar la venta existente de registrar_pagos()",venta_serializer.errors)
                return Response(venta_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            with transaction.atomic():
                # Guardar la venta actualizada
                venta_serializer.save()

                # Crear los pagos
                pagos_serializer = PagoVentaSerializer(data=pagos_data, many=True)
                if pagos_serializer.is_valid():
                    pagos = pagos_serializer.save()
                    #Preparar los movimientos para bulk_create
                    movimientos = [
                        Movimientos(
                            referencia=venta.orden,
                            tipo='Venta',
                            valor=pago.valor,
                            metodo_de_pago=pago.metodo_de_pago,
                            usuario=usuario,
                            tenant=pago.tenant
                        )
                        for pago in pagos
                    ]
                    Movimientos.objects.bulk_create(movimientos)
                    
                else:
                   print("Error en crear el pago de registrar_pagos()",pagos_serializer.errors)
                   return Response({'error': 'No se ha podido registrar el pago. Valida los datos registrados.'}, status=status.HTTP_400_BAD_REQUEST)
                
                
                # Crear los movimientos
                # movimientos_serializer = MovimientosSerializer(data=movimientos_data, many=True)
                # if movimientos_serializer.is_valid():
                #     movimientos_serializer.save()
                # else:
                #     print("Error en crear movimiento de registrar_pagos()",movimientos_serializer.errors)
                #     return Response({'error': 'No se ha podido registrar el pago. Valida los datos registrados.'}, status=status.HTTP_400_BAD_REQUEST)

            # Serializar la venta para la respuesta
           # Serializar la venta y los pagos para la respuesta
            venta_serializer = VentaSerializer(venta)
            pagos_serializer = PagoVentaSerializer(pagos, many=True)
            movimientos_serializer = MovimientosSerializer(Movimientos.objects.filter(status=True,referencia=venta.orden), many=True)

            return Response({
                'venta': venta_serializer.data,
                'pagos': pagos_serializer.data,
                'movimientos': movimientos_serializer.data

            }, status=status.HTTP_201_CREATED)

        except Venta.DoesNotExist:
            return Response({'error': 'Venta no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

