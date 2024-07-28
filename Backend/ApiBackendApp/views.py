
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,DjangoModelPermissions

from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from django.db.models import Sum
from rest_framework.decorators import action
from django.contrib.auth.models import *


from VentasApp.models import Venta, RelacionProductoVenta,PagoVenta
from VentasApp.serializers import RelacionProductoVentaSerializer,PagoVentaSerializer
from GastosApp.models import Gasto 
from DevolucionesApp.models import RelacionProductoDevolucion, Devolucion
from FinanzasApp.models import MetodoDePago,Movimientos
from DevolucionesApp.serializers import RelacionProductoDevolucionSerializer
from .serializers import VentaHomeSerializer
from .pagination import StandardResultsSetPagination
from copy import deepcopy

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
            fecha = request.query_params.get('fecha')
            #Ventas
            ventas = Venta.objects.all().filter(state=True,fecha=fecha)[:10]
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
        # tenant_id = request.query_params.get('tenant_id')
        tenant_id = 1
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')

        if not tenant_id or not fecha_inicio or not fecha_fin:
            print('Faltan parámetros requeridos')
            return Response([], status=status.HTTP_200_OK)

        try:
            # Obtener todos los usuarios del tenant específico
            usuarios = User.objects.filter()
            if not usuarios.exists():
                return Response({'error': 'No se encontraron usuarios para el tenant especificado'}, status=status.HTTP_404_NOT_FOUND)

            # Obtener las ventas del tenant en el rango de fechas
            ventas = Venta.objects.filter(tenant_id=tenant_id, fecha__range=[fecha_inicio, fecha_fin])

            # Calcular la suma de las ganancias ajustadas
            ganancias_ajustadas = ventas.aggregate(total_ganancias_ajustadas=Sum('ganancia_total_ajustada'))['total_ganancias_ajustadas'] or 0

            # Obtener los gastos generales de tipo 2 del tenant en el rango de fechas
            gastos_generales = Gasto.objects.filter(tenant_id=tenant_id, tipo_gasto__nombre="General", fecha__range=[fecha_inicio, fecha_fin]).aggregate(total_gastos_generales=Sum('valor'))['total_gastos_generales'] or 0

            # Obtener los gastos individuales de tipo 1 por usuario en el rango de fechas
            gastos_individuales_tipo_1 = Gasto.objects.filter(tenant_id=tenant_id, tipo_gasto__nombre="Personal", fecha__range=[fecha_inicio, fecha_fin]).values('usuario_id').annotate(total_gastos_individuales=Sum('valor'))

            # Crear un diccionario para acceder rápidamente a las ganancias y gastos por usuario
            gastos_individuales_dict = {item['usuario_id']: item['total_gastos_individuales'] for item in gastos_individuales_tipo_1}

            resultados = []

            for usuario in usuarios:
                usuario_id = usuario.id
                ganancias_ajustadas = ganancias_ajustadas
                gastos_individuales_tipo_1 = gastos_individuales_dict.get(usuario_id, 0)

                # Calcular el total
                total = ganancias_ajustadas - gastos_generales - gastos_individuales_tipo_1 

                resultados.append({
                    'id': usuario_id,
                    'usuario':usuario.first_name,
                    'ganancias': ganancias_ajustadas,
                    'periodo_a':fecha_inicio,
                    'periodo_b' : fecha_fin,
                    'gastos_individuales': gastos_individuales_tipo_1,
                    'gastos_generales': gastos_generales,
                    'total': total
                })

            return Response(resultados, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)