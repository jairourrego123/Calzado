
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend


# api key
# from rest_framework_api_key.permissions import HasAPIKey

class GeneralViewSet(viewsets.ModelViewSet):# Lista los objetos con ListAPIVIEW
    
    serializer_class = None
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    filterset_fields = '__all__'
    ordering_fields = '__all__'

    # pagination_class= StandardResultsSetPagination
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
            
        queryset = self.get_queryset().filter(id=pk).first()
        if  queryset:
            queryset.state= False
            queryset.save()
            return Response (queryset.id)
        return Response(status = status.HTTP_404_NOT_FOUND)

class EspecificViewSet(viewsets.ModelViewSet):# Lista los objetos con ListAPIVIEW
    serializer_class = None
    # pagination_class= StandardResultsSetPagination
    # permission_classes = [(HasAPIKey | IsAuthenticated) & CustomDjangoModelPermission]

    
   
    def get_queryset(self,pk=None):
        model=self.get_serializer().Meta.model.objects # Recoje la informacion del modelo que aparece en el meta de los serializer
        if pk is None:
            return model.filter()
        
        return model.filter(id=pk).first() # retorna todos los valores con estado = true



    