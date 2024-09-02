
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from django.db.models import Sum
from .models import  *
from .serializers import ProveedorSerializer, EntradaSerializer,EntradaCreateSerializer, RelacionProductoEntradaSerializer, PagoEntradaSerializer
from .filters import EntradaFilter
from django.db import transaction
from ApiBackendApp.views import GeneralViewSet
from FinanzasApp.models import MetodoDePago,Movimientos
from FinanzasApp.serializers import MovimientosSerializer
from InventarioApp.models import Producto
from GastosApp.models import TipoGasto, Gasto
from GastosApp.serializers import GastoCreateSerializer
from DevolucionesApp.serializers import RelacionProductoDevolucionSerializer, RelacionProductoDevolucion

from django.shortcuts import get_object_or_404

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
        tenant = usuario.tenant.id  # Asumiendo que el usuario tiene un atributo tenant
        try:
            with transaction.atomic():
                #Data
                tipo_gasto = TipoGasto.objects.filter(tenant=tenant,state=True,predeterminado_entrada=True).first()
                proveedor = Proveedor.objects.filter(id=entrada_data['proveedor_id'],tenant=tenant,state=True).first()
                # Crear la venta
                entrada_data['usuario'] = usuario.id
                entrada_data['tenant'] = tenant
                entrada_data['proveedor'] = proveedor.id
                entrada_data['valor_total'] = entrada_data['valor']
                entrada_data['valor_total_ajustado'] =entrada_data['valor']
                entrada_serializer = EntradaCreateSerializer(data=entrada_data, context={'request': request})
                if entrada_serializer.is_valid():
                    entrada = entrada_serializer.save()
                else:
                    raise ValueError(entrada_serializer.errors)
                 #Update proveedor
                if  entrada_data['estado']:
                    estado_proveedor = not Entrada.objects.filter(proveedor=proveedor.id,estado=False,state=True).exists()
                    proveedor.estado = estado_proveedor
                    proveedor.save()
                else :
                    proveedor.estado = entrada_data['estado']
                    proveedor.save()
                # Crear las relaciones producto-venta
                for producto_data in productos_data:
                     producto = Producto.objects.get(id=producto_data['id'],tenant=tenant,state=True)
                     producto_data['entrada'] = entrada.id
                     producto_data['tenant'] = tenant
                     producto_data['cantidad_devuelta'] = 0
                     producto_data['producto'] = producto.id
                     producto_data['valor'] = producto_data['valor_venta_producto']
                     relacion_producto_serializer = RelacionProductoEntradaSerializer(data=producto_data)
                     if relacion_producto_serializer.is_valid():
                          relacion_producto = relacion_producto_serializer.save()
                          producto.cantidad += int(producto_data['cantidad'])
                          producto.save()
                     else:
                          raise Exception(relacion_producto_serializer.errors)

                  # Crear los pagos
                for pago_data in pagos_data:
                    pago_data['entrada'] = entrada.id
                    pago_data['tenant'] = tenant
                    pago_serializer = PagoEntradaSerializer(data=pago_data)
                    if pago_serializer.is_valid():
                          pago = pago_serializer.save()

                          metodo_de_pago = MetodoDePago.objects.get(id=pago_data['metodo_de_pago'], tenant=tenant)
                          metodo_de_pago.saldo_actual -= pago_data['valor']
                          metodo_de_pago.save()

                        # Crear movimiento
                          movimiento_data = {
                              'referencia': entrada.orden,
                              'tipo': 'Entrada',
                              'valor': pago_data['valor'],
                              'usuario': usuario.id,
                              'metodo_de_pago': pago_data['metodo_de_pago'],
                              'tenant':tenant,
                              'descripcion':"Entrada de " + proveedor.nombre,
                          }
                          movimiento_serializer = MovimientosSerializer(data=movimiento_data)
                          if movimiento_serializer.is_valid():
                              movimiento_serializer.save()
                          else:
                              raise ValueError(movimiento_serializer.errors)
                        # Crear Gasto
                          gasto_data={
                              'orden':entrada.orden,
                              'valor':pago_data['valor'],
                              'descripcion':"Pago a " + proveedor.nombre + " de entrada "  + entrada.orden,
                              'usuario': usuario.id,
                              'tipo_gasto': tipo_gasto.id,
                              'metodo_de_pago':pago_data['metodo_de_pago'],
                              'tenant':tenant
                          }
                          
                          gasto_serializer = GastoCreateSerializer(data=gasto_data)
                          if gasto_serializer.is_valid():
                              gasto_serializer.save()
                          else:
                              raise ValueError(gasto_serializer.errors)
                          
                         
                        
                    else:
                          raise ValueError(pago_serializer.errors)

            return Response({
                  'entrada': EntradaSerializer(entrada).data,
              }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    
    @action(detail=True, methods=['get'], url_path='detail_entry')
    def detalle_entrada(self, request, pk=None):
        try:
            # Entradas
            entrada = self.get_queryset().filter(id=pk).first()
            usuario = request.user
            tenant = usuario.tenant.id  # Asumiendo que el usuario tiene un atributo tenant
            if not entrada:
                return Response({'error': 'Entrada no encontrada'}, status=404)
            serializerEntrada = EntradaSerializer(entrada)

            # Productos
            productos = RelacionProductoEntrada.objects.filter(state=True, entrada=pk,tenant=tenant)
            serializerProducto = RelacionProductoEntradaSerializer(productos, many=True)

            # Pagos
            pagos = PagoEntrada.objects.filter(state=True, entrada=pk)
            serializerPago = PagoEntradaSerializer(pagos, many=True)

            # Métodos de pago
            metodos_de_pago = MetodoDePago.objects.filter(state=True,tenant=tenant).values("id", "nombre")

             # Devolución
            productos_devueltos = RelacionProductoDevolucion.objects.filter(state=True, devolucion__referencia=entrada.orden)
            serializerDevolucionProductos = RelacionProductoDevolucionSerializer(productos_devueltos, many=True)

            data = {
                'entrada': serializerEntrada.data,
                'proveedor': {"nombre": serializerEntrada.data.get('proveedor')},
                'productos': list(serializerProducto.data),
                'pagos': list(serializerPago.data),
                'devolucion': list(serializerDevolucionProductos.data),
                'metodos_de_pago': list(metodos_de_pago)
            }

            return Response(data, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
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

class RegistrarPagosEntradaViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['post'], url_path='pagos')
    def registrar_pagos_entrada(self, request):
        try:
            usuario = request.user
            tenant = usuario.tenant.id
            tenant_instance = usuario.tenant
            pagos_data = request.data.get('pagos')
            entrada_data = request.data.get('entrada')
            
            with transaction.atomic():
                # Obtener y actualizar la entrada existente
                tipo_gasto = TipoGasto.objects.filter(tenant=tenant, state=True, predeterminado_entrada=True).first()
                entrada = Entrada.objects.get(id=entrada_data['id'], tenant=tenant, state=True)
                entrada_serializer = EntradaCreateSerializer(entrada, data=entrada_data, partial=True)
                proveedor = Proveedor.objects.filter(id=entrada.proveedor_id,tenant=tenant,state=True).first()

                if entrada_serializer.is_valid():
                    entrada_serializer.save()
                else:
                    raise ValueError(entrada_serializer.errors)

                # Añadir usuario y tenant a cada pago en pagos_data
                for pago in pagos_data:
                    pago['usuario'] = usuario.id
                    pago['tenant'] = tenant
                                 #Update proveedor
                if  entrada_data['estado']:
                    estado_proveedor = not Entrada.objects.filter(proveedor=proveedor.id,estado=False,state=True).exists()
                    proveedor.estado = estado_proveedor
                    proveedor.save()
                else :
                    proveedor.estado = entrada_data['estado']
                    proveedor.save()
                # Crear los pagos
                pagos_serializer = PagoEntradaSerializer(data=pagos_data, many=True)
                if pagos_serializer.is_valid():
                    pagos = pagos_serializer.save()
                    # Preparar los movimientos y gastos para bulk_create
                    movimientos = []
                    for pago in pagos:
                        movimientos.append(Movimientos(
                            referencia=entrada.orden,
                            tipo='Abono',
                            valor=pago.valor,
                            metodo_de_pago=pago.metodo_de_pago,
                            usuario=usuario,
                            tenant=tenant_instance,
                            descripcion="Abono a  " + proveedor.nombre,

                        ))
                        
                        gasto = Gasto(
                            valor=pago.valor,
                            descripcion=f'Pago para entrada {entrada.orden}',
                            usuario=usuario,
                            tenant=tenant_instance,
                            tipo_gasto=tipo_gasto,
                            metodo_de_pago=pago.metodo_de_pago,
                            
                        )
                        gasto.save()  # Guardar cada gasto individualmente

                    Movimientos.objects.bulk_create(movimientos)

                    for pago in pagos:
                        metodo_de_pago = MetodoDePago.objects.get(id=pago.metodo_de_pago.id, tenant=tenant)
                        metodo_de_pago.saldo_actual -= pago.valor
                        metodo_de_pago.save()
                else:
                    raise ValueError(pagos_serializer.errors)

            return Response(status=status.HTTP_201_CREATED)

        except Entrada.DoesNotExist:
            return Response({'error': 'Entrada no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
