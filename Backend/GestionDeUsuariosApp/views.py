from .serializers import  TenantSerializer
from ApiBackendApp.views import GeneralViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer

class UserProfileView(APIView):
    """
    Vista para obtener los datos del usuario actualmente autenticado.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # DRF se encarga de obtener el usuario a partir del token en el header
        # y lo asigna a 'request.user'.
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


  
class TenantViewSet(GeneralViewSet):
    serializer_class = TenantSerializer
    filterset_fields = ['nombre']
    search_fields = ['nombre', 'direccion', 'telefono', 'email']
    ordering_fields = ['nombre', 'fecha']
    