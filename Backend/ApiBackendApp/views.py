
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
from EntradasApp.models import Entrada
from DevolucionesApp.models import RelacionProductoDevolucion, Devolucion
from FinanzasApp.models import MetodoDePago,Movimientos,Transferencia
from DevolucionesApp.serializers import RelacionProductoDevolucionSerializer
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
            gastos = Gasto.objects.all().filter(state=True,fecha=fecha).aggregate(suma_total=Sum('valor'))

           
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
            
            # # Convertir la fecha recibida en un objeto datetime
            # fecha_inicio = datetime.strptime(fecha, '%Y-%m-%d')
            # fecha_fin = fecha_inicio.replace(hour=23, minute=59, second=59)

            # Filtrar las ventas del día especificado utilizando el campo 'fecha'
            ventas_pagadas = Venta.objects.filter(tenant=tenant, state=True, fecha=fecha,estado=True)
            ventas_totales = Venta.objects.filter(tenant=tenant, state=True, fecha=fecha)
            
           
            # Filtrar las devoluciones  del día especificado utilizando el campo 'fecha'
            # Filtrar devoluciones del día por tipo Entrada
            
            devoluciones_entrada = Devolucion.objects.filter(tenant=tenant, state=True, fecha=fecha, tipo='ENTRADA')

            # Filtrar devoluciones del día por tipo Venta
            devoluciones_venta = Devolucion.objects.filter(tenant=tenant, state=True, fecha=fecha, tipo='VENTA')
            
             # Sumar devoluciones de ventas del día
            total_devoluciones_ventas = devoluciones_venta.aggregate(total_devoluciones=Sum('valor_total'))
           
            # Sumar devoluciones de entradas del día
          
            total_devoluciones_entradas = devoluciones_entrada.aggregate(total_devoluciones=Sum('valor_total'))

            # Filtrar los pagos correspondientes a esas ventas
            pagos = PagoVenta.objects.filter(venta__in=ventas_totales,tenant=tenant, state=True)

            # Agrupar y sumar los pagos por método de pago
            ventas_por_metodo_pago = pagos.values('metodo_de_pago__nombre').annotate(total_vendido=Sum('valor')).order_by('-total_vendido')

              # Contar cantidad total de productos vendidos
            productos_vendidos = RelacionProductoVenta.objects.filter(venta__in=ventas_totales, state=True)
            total_productos_vendidos = productos_vendidos.aggregate(total_vendidos=Sum('cantidad'))
            productos_por_producto = productos_vendidos.values('producto__estilo','producto__talla','producto__color').annotate(cantidad_vendida=Sum('cantidad')).order_by('-cantidad_vendida')

             # Sumar gastos del día
            gastos = Gasto.objects.filter(tenant=tenant, state=True, fecha=fecha)
            total_gastos = gastos.aggregate(total_gastos=Sum('valor'))
            
           

            # Calcular total vendido
            total_vendido = ventas_pagadas.aggregate(total_vendido=Sum('valor_total'))

            # Calcular total de abonos
            # Abonos que comienzan con 'V'
            abonos_ventas = Movimientos.objects.filter(
                tenant=tenant,
                state=True,
                fecha=fecha,
                tipo='Abono',
                referencia__startswith='V'
            ).aggregate(total_abonos=Sum('valor'))

            # Abonos que comienzan con 'E'
            abonos_entradas = Movimientos.objects.filter(
                tenant=tenant,
                state=True,
                fecha=fecha,
                tipo='Abono',
                referencia__startswith='E'
            ).aggregate(total_abonos=Sum('valor'))
            # Calcular total de ganancias
            
            total_ganancias = ventas_totales.aggregate(total_ganancias=Sum('ganancia_total_ajustada'))
            
            # Tranferencias Externas con estado Null

            transferencias = Transferencia.objects.filter(tenant=tenant, state=True, fecha=fecha,cuenta_destino=None).aggregate(total_transferencias=Sum('valor'))

            # Preparar la data de respuesta
            data = {
                'fecha':fecha,
                'ventas_por_metodo_pago': [{'nombre': item['metodo_de_pago__nombre'], 'valor': item['total_vendido']} for item in ventas_por_metodo_pago],
                'total_productos_vendidos': total_productos_vendidos['total_vendidos']or 0,
                'productos': list(productos_por_producto),
                'total_gastos': total_gastos['total_gastos']or 0 ,
                'total_vendido': total_vendido['total_vendido']or 0,
                'total_ganancias': total_ganancias['total_ganancias']or 0,
                'abonos_ventas': abonos_ventas['total_abonos']or 0 ,
                'abonos_entradas': abonos_entradas['total_abonos']or 0 ,
                'transferencias_externas': transferencias['total_transferencias']or 0 ,
                'total_devoluciones_ventas': total_devoluciones_ventas['total_devoluciones']or 0,
                'total_devoluciones_entradas': total_devoluciones_entradas['total_devoluciones']or 0 
            }
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
