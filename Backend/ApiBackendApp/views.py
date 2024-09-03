
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,DjangoModelPermissions
from decimal import Decimal
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from django.db.models import Sum, Count, F
from rest_framework.decorators import action


from VentasApp.models import Venta, RelacionProductoVenta,PagoVenta
from VentasApp.serializers import RelacionProductoVentaSerializer,PagoVentaSerializer
from GastosApp.models import Gasto 
from EntradasApp.models import Entrada, RelacionProductoEntrada,PagoEntrada
from DevolucionesApp.models import RelacionProductoDevolucion, Devolucion
from FinanzasApp.models import MetodoDePago,Movimientos,Transferencia
from DevolucionesApp.serializers import RelacionProductoDevolucionSerializer
from InventarioApp.models import Producto
from .serializers import VentaHomeSerializer
from .pagination import StandardResultsSetPagination
from copy import deepcopy
from GestionDeUsuariosApp.models import Usuarios
from datetime import datetime

# api key
class CustomDjangoModelPermission(DjangoModelPermissions):

    def __init__(self):
        # Crear una copia de perms_map y agregar el permiso 'view'
        self.perms_map = deepcopy(self.perms_map)
        self.perms_map['GET'] = ['%(app_label)s.view_%(model_name)s']
        self.perms_map['OPTIONS'] = ['%(app_label)s.view_%(model_name)s']
        self.perms_map['HEAD'] = ['%(app_label)s.view_%(model_name)s']

    def has_permission(self, request, view):
        # Verificar si se deben ignorar los permisos del modelo
        if getattr(view, '_ignore_model_permissions', False):
            return True
        
        # Llamar al método de la clase base para verificar los permisos
        return super().has_permission(request, view)
class GeneralViewSet(viewsets.ModelViewSet):# Lista los objetos con ListAPIVIEW
    
    serializer_class = None
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    filterset_fields = '__all__'
    ordering_fields = '__all__'
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    pagination_class= StandardResultsSetPagination
    # permission_classes = [(HasAPIKey | IsAuthenticated) & CustomDjangoModelPermission]
    

    # permission_classes = [CustomDjangoModelPermission]
   
   
    def get_queryset(self,pk=None):
       
        model=self.get_serializer().Meta.model.objects # Recoje la informacion del modelo que aparece en el meta de los serializer
        user = self.request.user
        if pk is None:
            return model.filter(state=True,tenant=user.tenant)
    
        return model.filter(state=True, id=pk,tenant=user.tenant).first() # retorna todos los valores con estado = true
   
    def perform_create(self, serializer):
        if isinstance(serializer.validated_data, list):
            for item in serializer.validated_data:
                item['tenant'] = self.request.user.tenant
        else:
            serializer.save(tenant=self.request.user.tenant)
        serializer.save()
    def create(self, request, *args, **kwargs): 
        is_many = isinstance(request.data,list)
        if not is_many:
            return super(GeneralViewSet,self).create(request, *args, **kwargs)
           
        else:
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    

    def destroy(self,request,pk=None):
            
        queryset = self.get_queryset().filter(pk=pk).first()
        if  queryset:
            queryset.state= False
            queryset.save()
            return Response (queryset.pk)
        return Response(status = status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['delete'], url_path='bulk-delete')
    def bulk_delete(self, request):
        pks = request.data.get('ids')
        if not pks:
            return Response({"detail": "No se proporcionaron IDs"}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.get_queryset().filter(pk__in=pks)
        
        if queryset.exists():
            queryset.update(state=False)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response({"detail": "No se encontraron registros para eliminar"}, status=status.HTTP_404_NOT_FOUND)
class EspecificViewSet(viewsets.ModelViewSet):# Lista los objetos con ListAPIVIEW
    serializer_class = None
    # pagination_class= StandardResultsSetPagination
    # permission_classes = [(HasAPIKey | IsAuthenticated) & CustomDjangoModelPermission]

    
   
    def get_queryset(self,pk=None):
        model=self.get_serializer().Meta.model.objects # Recoje la informacion del modelo que aparece en el meta de los serializer
        if pk is None:
            return model.filter()
        
        return model.filter(id=pk).first() # retorna todos los valores con estado = true


class DatosHome(APIView):
    def get(self, request, *args, **kwargs):
        try:
            usuario = request.user
            tenant = usuario.tenant.id
            fecha = request.query_params.get('fecha')
            #Ventas
            ventas = Venta.objects.all().filter(state=True,fecha=fecha,tenant=tenant)[:10]
            serializerVenta = VentaHomeSerializer(ventas, many=True)

            #suma total Venta
            suma_ventas =ventas.aggregate(suma_total=Sum('valor_total_ajustado'))
            #sumaGanancia
            suma_ganancia = ventas.aggregate(suma_total=Sum('ganancia_total_ajustada'))
            #Gastos del dia 
            gastos = Gasto.objects.all().filter(state=True,fecha=fecha,tenant=tenant).aggregate(suma_total=Sum('valor'))

           
            data = {
                'venta': list(serializerVenta.data),
                'suma_ventas': suma_ventas,
                "suma_gastos":gastos,
                "suma_ganancia":suma_ganancia
               
            }

            return Response(data)
        except Exception as e:
            return Response({'error': str(e)}, status=400)



class DataGanancias(APIView):
    def get(self, request):
        usuario = request.user
        tenant = usuario.tenant.id
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')

        if not fecha_inicio or not fecha_fin:
            print('Faltan parámetros requeridos')
            return Response([], status=status.HTTP_200_OK)

        try:
            # Obtener todos los usuarios del tenant específico
            usuarios = Usuarios.objects.filter(tenant=tenant, is_active=True,es_socio=True)
            if not usuarios.exists():
                return Response({'error': 'No se encontraron usuarios socios'}, status=status.HTTP_204_NO_CONTENT)

            # Obtener las ventas del tenant en el rango de fechas
            ventas = Venta.objects.filter(tenant=tenant, fecha__range=[fecha_inicio, fecha_fin], state=True)

            # Calcular la suma de las ganancias ajustadas
            ganancias_ajustadas = ventas.aggregate(total_ganancias_ajustadas=Sum('ganancia_total_ajustada'))['total_ganancias_ajustadas'] or 0

            # Obtener los gastos generales de tipo "General" del tenant en el rango de fechas
            gastos_generales = Gasto.objects.filter(tenant=tenant, tipo_gasto__nombre="General", fecha__range=[fecha_inicio, fecha_fin], state=True).aggregate(total_gastos_generales=Sum('valor'))['total_gastos_generales'] or 0
            # Obtener los gastos generales de tipo "General" del tenant en el rango de fechas
            gastos_individuales = Gasto.objects.filter(tenant=tenant, tipo_gasto__nombre="Personal", fecha__range=[fecha_inicio, fecha_fin], state=True).aggregate(total_gastos_individuales=Sum('valor'))['total_gastos_individuales'] or 0

            # Obtener los gastos individuales de tipo "Personal" por usuario en el rango de fechas
            gastos_individuales_tipo_1 = Gasto.objects.filter(tenant=tenant, tipo_gasto__nombre="Personal", fecha__range=[fecha_inicio, fecha_fin], state=True).values('usuario').annotate(total_gastos_individuales=Sum('valor'))

            # Crear un diccionario para acceder rápidamente a las ganancias y gastos por usuario
            gastos_individuales_dict = {item['usuario']: item['total_gastos_individuales'] for item in gastos_individuales_tipo_1}

            resultados = []

            for usuario in usuarios:
                usuario_id = usuario.id
                usuario_nombre = usuario.first_name
                gastos_individuales_usuario = gastos_individuales_dict.get(usuario_id, 0)
                participacion =  Decimal(usuario.porcentaje_participacion/100)
                equivalente_gastos_generales = gastos_generales * participacion
                equivalente_ganancias = ganancias_ajustadas * participacion
                # Calcular el total
                total_individual = equivalente_ganancias - equivalente_gastos_generales - gastos_individuales_usuario

                resultados.append({
                    'id': usuario_id,
                    'usuario': usuario_nombre,
                    'fecha_inicio': fecha_inicio,
                    'fecha_fin': fecha_fin,
                    'ganancias': equivalente_ganancias,
                    'gastos_individuales': gastos_individuales_usuario,
                    'gastos_generales': equivalente_gastos_generales,
                    'total': total_individual
                })

            total = ganancias_ajustadas - gastos_generales
            data = {
                'datos_individuales' : list(resultados),
                'datos_generales' : {
                    "ganancias":ganancias_ajustadas,
                    "gastos_individuales":gastos_individuales,
                    "gastos_generales":gastos_generales,
                    "total":total
                },

            }
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
class ReporteDiarioViewSet(APIView):

    def get(self, request):
        try:
            usuario = request.user
            tenant = usuario.tenant
            fecha = request.query_params.get('fecha')

            if not fecha:
                return Response({'error': 'Se requiere una fecha'}, status=status.HTTP_400_BAD_REQUEST)

            # Filtrar las ventas del día especificado
            ventas_pagadas = Venta.objects.filter(tenant=tenant, state=True, fecha=fecha, estado=True)
            ventas_totales = Venta.objects.filter(tenant=tenant, state=True, fecha=fecha)
            
            # Filtrar las entradas del día especificado
            entradas = Entrada.objects.filter(tenant=tenant, state=True, fecha=fecha, estado=True)

            # Filtrar devoluciones del día
            devoluciones_entrada = Devolucion.objects.filter(tenant=tenant, state=True, fecha=fecha, tipo__startswith='E')
            devoluciones_venta = Devolucion.objects.filter(tenant=tenant, state=True, fecha=fecha, tipo__startswith='V')

            # Filtrar los productos asociados a devoluciones de entrada y venta
            productos_devolucion_entrada = RelacionProductoDevolucion.objects.filter(devolucion__in=devoluciones_entrada, devolucion__tenant=tenant, devolucion__state=True)
            productos_devolucion_venta = RelacionProductoDevolucion.objects.filter(devolucion__in=devoluciones_venta, devolucion__tenant=tenant, devolucion__state=True)

            # Filtrar pagos correspondientes a esas ventas
            pagos = PagoVenta.objects.filter(venta__in=ventas_totales, tenant=tenant, state=True)
            ventas_por_metodo_pago = pagos.values('metodo_de_pago__nombre').annotate(total_vendido=Sum('valor')).order_by('-total_vendido')

            # Contar cantidad total de productos vendidos e ingresados
            productos_vendidos = RelacionProductoVenta.objects.filter(venta__in=ventas_totales, tenant=tenant, state=True)
            total_productos_vendidos = productos_vendidos.aggregate(total_vendidos=Sum('cantidad'))
            productos_por_producto_vendidos = productos_vendidos.values('producto__estilo', 'producto__talla', 'producto__color').annotate(cantidad_vendida=Sum('cantidad')).order_by('-cantidad_vendida')

            productos_ingresados = RelacionProductoEntrada.objects.filter(entrada__in=entradas, tenant=tenant, state=True)
            total_productos_ingresados = productos_ingresados.aggregate(total_ingresados=Sum('cantidad'))
            productos_por_producto_ingresados = productos_ingresados.values('producto__estilo', 'producto__talla', 'producto__color').annotate(cantidad_ingresada=Sum('cantidad')).order_by('-cantidad_ingresada')

            # Filtrar y sumar gastos del día
            gastos = Gasto.objects.filter(tenant=tenant, state=True, fecha=fecha)
            total_gastos = gastos.aggregate(total_gastos=Sum('valor'))

            # Filtrar abonos del día
            abonos_ventas = Movimientos.objects.filter(tenant=tenant, state=True, fecha=fecha, tipo='Abono', referencia__startswith='V')
            abonos_entradas = Movimientos.objects.filter(tenant=tenant, state=True, fecha=fecha, tipo='Abono', referencia__startswith='E')
            total_abonos_ventas = abonos_ventas.aggregate(total_abonos=Sum('valor'))
            total_abonos_entradas = abonos_entradas.aggregate(total_abonos=Sum('valor'))

            # Filtrar transferencias del día
            transferencias = Transferencia.objects.filter(tenant=tenant, state=True, fecha=fecha, cuenta_destino=None)
            total_transferencias = transferencias.aggregate(total_transferencias=Sum('valor'))

            # Sumar devoluciones del día directamente desde el modelo Devolucion
            total_devoluciones_ventas = devoluciones_venta.aggregate(total_devoluciones=Sum('valor_total'))
            total_devoluciones_entradas = devoluciones_entrada.aggregate(total_devoluciones=Sum('valor_total'))

            # Calcular totales
            total_vendido = ventas_pagadas.aggregate(total_vendido=Sum('valor_total'))
            total_ganancias = ventas_totales.aggregate(total_ganancias=Sum('ganancia_total_ajustada'))

            total_ingresos = (total_vendido['total_vendido'] or 0) + (total_abonos_ventas['total_abonos'] or 0) 
            total_egresos = (total_gastos['total_gastos'] or 0) + (total_transferencias['total_transferencias'] or 0) 
            saldos_metodos_pago = MetodoDePago.objects.filter(tenant=tenant,state=True,).values('id','nombre', 'saldo_actual')

            # Preparar la data de respuesta organizada por categorías
            data = {
                'fecha': fecha,
                'ventas': {
                    'total_vendido': total_vendido['total_vendido'] or 0,
                    'total_ganancias': total_ganancias['total_ganancias'] or 0,
                    'ventas_por_metodo_pago': [{'nombre': item['metodo_de_pago__nombre'], 'valor': item['total_vendido']} for item in ventas_por_metodo_pago],
                    'total_productos_vendidos': total_productos_vendidos['total_vendidos'] or 0,
                    'productos_vendidos': list(productos_por_producto_vendidos),
                },
                'entradas': {
                    'total_productos_ingresados': total_productos_ingresados['total_ingresados'] or 0,
                    'productos_ingresados': list(productos_por_producto_ingresados),
                },
                'gastos': {
                    'total_gastos': total_gastos['total_gastos'] or 0,
                    'detalle_gastos': list(gastos.values('tipo_gasto__nombre','descripcion', 'valor'))
                },
                'abonos': {
                    'total_abonos_ventas': total_abonos_ventas['total_abonos'] or 0,
                    'detalle_abonos_ventas': list(abonos_ventas.values('referencia','valor','metodo_de_pago__nombre','descripcion')),
                    'total_abonos_entradas': total_abonos_entradas['total_abonos'] or 0,
                    'detalle_abonos_entradas': list(abonos_entradas.values('referencia','valor','metodo_de_pago__nombre','descripcion'))
                },
                'devoluciones': {
                    'total_devoluciones_ventas': total_devoluciones_ventas['total_devoluciones'] or 0,
                    'detalle_devoluciones_ventas': list(productos_devolucion_venta.values('producto__estilo', 'cantidad', 'valor_venta_producto')),
                    'total_devoluciones_entradas': total_devoluciones_entradas['total_devoluciones'] or 0,
                    'detalle_devoluciones_entradas': list(productos_devolucion_entrada.values('producto__estilo', 'cantidad', 'valor_venta_producto'))
                },
                'transferencias': {
                    'total_transferencias': total_transferencias['total_transferencias'] or 0,
                    'detalle_transferencias': list(transferencias.values('valor', 'descripcion', 'cuenta_origen', 'cuenta_destino'))
                },
                'totales': {
                    'total_ingresos': total_ingresos,
                    'total_egresos': total_egresos
                },
                'saldos_metodos_pago':list(saldos_metodos_pago)
            }
            
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ResumenFinancieroViewSet(APIView):

    def get(self, request):
        try:
            usuario = request.user
            tenant = usuario.tenant

            # Calcular el total en dinero del inventario
            inventario_total = Producto.objects.filter(tenant=tenant, state=True).annotate(
                total_valor=F('cantidad') * F('valor_compra')
            ).aggregate(total_inventario=Sum('total_valor'))

            # Calcular las ventas pendientes
            ventas_pendientes = Venta.objects.filter(tenant=tenant, state=True, estado=False)
            total_pagos_ventas = PagoVenta.objects.filter(venta__in=ventas_pendientes, tenant=tenant, state=True).aggregate(total_pagado=Sum('valor'))
            total_ventas_pendientes = ventas_pendientes.aggregate(total_ventas=Sum('valor_total'))
            ventas_pendientes_saldo = total_ventas_pendientes['total_ventas'] - (total_pagos_ventas['total_pagado'] or 0)

            # Calcular deudas a proveedores
            entradas_pendientes = Entrada.objects.filter(tenant=tenant, state=True, estado=False)
            total_pagos_entradas = PagoEntrada.objects.filter(entrada__in=entradas_pendientes, tenant=tenant, state=True).aggregate(total_pagado=Sum('valor'))
            total_entradas_pendientes = entradas_pendientes.aggregate(total_entradas=Sum('valor_total'))
            deuda_proveedores = Decimal(total_entradas_pendientes['total_entradas'] or 0 ) - Decimal(total_pagos_entradas['total_pagado'] or 0)

            # Calcular el total de dinero disponible
            total_dinero_disponible = Decimal(inventario_total['total_inventario'] or 0) + Decimal(ventas_pendientes_saldo or 0) - Decimal(deuda_proveedores or 0)

            # Preparar la data de respuesta
            data = {
                
                "items":
                    [
                        {
                            "item":'Total inventario',
                            "valor": inventario_total['total_inventario'] or 0,
                        },
                        {
                            "item":'Ventas pendiente de pago',
                            "valor": ventas_pendientes_saldo or 0,
                        },
                        {
                            "item":'Deuda a proveedores',
                            "valor":  deuda_proveedores or 0,
                        },   
                    ],
                "total": total_dinero_disponible or 0
            }

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)