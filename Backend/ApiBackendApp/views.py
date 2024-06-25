
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from django.db.models import Sum
from rest_framework.decorators import action


from VentasApp.models import Venta, RelacionProductoVenta,PagoVenta
from VentasApp.serializers import RelacionProductoVentaSerializer,PagoVentaSerializer
from GastosApp.models import Gasto 
from DevolucionesApp.models import RelacionProductoDevolucion, Devolucion
from FinanzasApp.models import MetodoDePago,Movimientos
from DevolucionesApp.serializers import RelacionProductoDevolucionSerializer
from .serializers import VentaSerializer , RegistrarPagosVentaSerializer
from .pagination import StandardResultsSetPagination
# api key
# from rest_framework_api_key.permissions import HasAPIKey

class GeneralViewSet(viewsets.ModelViewSet):# Lista los objetos con ListAPIVIEW
    
    serializer_class = None
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    filterset_fields = '__all__'
    ordering_fields = '__all__'

    pagination_class= StandardResultsSetPagination
    # permission_classes = [(HasAPIKey | IsAuthenticated) & CustomDjangoModelPermission]
    

    # permission_classes = [CustomDjangoModelPermission]
   
   
    def get_queryset(self,pk=None):
       
        model=self.get_serializer().Meta.model.objects # Recoje la informacion del modelo que aparece en el meta de los serializer
        if pk is None:
            return model.filter(state=True)
    
        return model.filter(state=True, id=pk).first() # retorna todos los valores con estado = true
   
   
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
        print(pks)
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
            serializerVenta = VentaSerializer(ventas, many=True)

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

class DetailSpend(APIView):
    def get(self, request,id):
        try:
            #Ventas
            ventas = Venta.objects.filter(state=True,orden=id)
            serializerVenta = VentaSerializer(ventas,many=True)

            #Productos
            productos = RelacionProductoVenta.objects.filter(state=True,venta=id)
            serializerProducto = RelacionProductoVentaSerializer(productos,many = True)

            #pagos
            pagos = PagoVenta.objects.filter(state=True,venta=id)
            serializerPago = PagoVentaSerializer(pagos,many=True)

            #Devolucion
            
            productos_devueltos = RelacionProductoDevolucion.objects.filter(state=True,devolucion__referencia=id)
            serializerDevolucionProductos = RelacionProductoDevolucionSerializer(productos_devueltos,many=True)

            #Metodos de pago

            metodos_de_pago = MetodoDePago.objects.filter(state=True).values("id","nombre")
            
            data = {
                'venta':serializerVenta.data[0],
                'productos':list(serializerProducto.data),
                'pagos':list(serializerPago.data),
                'devolucion':list(serializerDevolucionProductos.data),
                'metodos_de_pago':list(metodos_de_pago)
               
            }

            return Response(data)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
