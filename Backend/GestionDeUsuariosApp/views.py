from .serializers import  TenantSerializer
from ApiBackendApp.views import GeneralViewSet

# class UsuarioViewSet(GeneralViewSet):
#     serializer_class = UsuarioSerializer
#     filterset_fields = ['is_active', 'is_staff']
#     search_fields = ['username', 'email', 'first_name', 'last_name']
#     ordering_fields = ['id', 'date_joined']


  
class TenantViewSet(GeneralViewSet):
    serializer_class = TenantSerializer
    filterset_fields = ['nombre']
    search_fields = ['nombre', 'direccion', 'telefono', 'email']
    ordering_fields = ['nombre', 'fecha']