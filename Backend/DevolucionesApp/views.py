from ApiBackendApp.views import GeneralViewSet
from rest_framework.response import Response
from rest_framework import  status
from rest_framework.decorators import action


from .serializers  import *

# Create your views here.
class DevolucionViewSet(GeneralViewSet):  # Una sola clase para los metodos de rest 

    serializer_class = DevolucionSerializer
    filterset_fields = ['fecha','tipo','referencia']
    search_fields = ['fecha','tipo','referencia']
    ordering_fields = ['id','fecha','tipo']

    @action(detail=False, methods=['get'] ,url_path='basicos')
    def listar_basicos(self, request):
        queryset = self.get_queryset().values('id', 'tipo', 'fecha')
        return Response(queryset, status=status.HTTP_200_OK)
    
class DevolucionViewSet(GeneralViewSet):
    serializer_class = DevolucionSerializer
    filterset_fields = ['fecha', 'tipo', 'referencia']
    search_fields = ['fecha', 'tipo', 'referencia']
    ordering_fields = ['id', 'fecha', 'tipo']

class MotivoDevolucionViewSet(GeneralViewSet):
    serializer_class = MotivoDevolucionSerializer
    filterset_fields = ['nombre']
    search_fields = ['nombre']
    ordering_fields = ['id', 'nombre']

class RelacionProductoDevolucionViewSet(GeneralViewSet):
    serializer_class = RelacionProductoDevolucionSerializer
    filterset_fields = ['cantidad', 'valor_venta', 'descripcion', 'motivo__nombre']
    search_fields = ['cantidad', 'valor_venta', 'descripcion', 'motivo__nombre']
    ordering_fields = ['id', 'cantidad', 'valor_venta']


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        if 'cantidad' in request.data and len(request.data) == 1:
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response({'error': 'Solo se puede actualizar el campo cantidad'}, status=status.HTTP_400_BAD_REQUEST)