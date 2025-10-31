from rest_framework import generics
from rest_framework.permissions import DjangoModelPermissions
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from GestionDeUsuariosApp.models import Usuarios
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
class RegisterView(generics.CreateAPIView):
    queryset = Usuarios.objects.all()
    permission_classes = (DjangoModelPermissions,)
    serializer_class = RegisterSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh = response.data.get('refresh')
        print("refres",refresh)
        if refresh:
            response.set_cookie(
                key='refresh_token',
                value=refresh,
                httponly=True,
                secure=False,  # Cambiar a True en producción
                samesite='Lax'
            )
            del response.data['refresh']
        return response

@csrf_exempt
@api_view(['POST'])
def cookie_token_refresh(request):
    print("Headers received in request:", request.headers)
    refresh_token = request.COOKIES.get('refresh_token')
    print("refresh_token",request.COOKIES)
    print("refresh_token from cookies:", refresh_token)
    if refresh_token is None:
        return JsonResponse({'error': 'Refresh token is missing'}, status=400)

    try:
        token = RefreshToken(refresh_token)
        data = {'access': str(token.access_token)}
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@api_view(['POST'])
def logout(request):
    response = JsonResponse({'message': 'Logout successful'})
    response.delete_cookie('refresh_token')
    return response
