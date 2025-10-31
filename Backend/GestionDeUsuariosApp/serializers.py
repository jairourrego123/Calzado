from rest_framework import serializers
from .models import  Tenant, Usuarios


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        # Elige los campos que quieres mostrar sobre el usuario
        fields = ['first_name', 'last_name','tenant'] 
        # ¡NUNCA incluyas el campo 'password'!
class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = '__all__'