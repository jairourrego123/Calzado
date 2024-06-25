from rest_framework import serializers
from .models import Gasto

class GastoSerializer(serializers.ModelSerializer):
    nombre_usuario = serializers.CharField(source='usuario.first_name', read_only=True)

    class Meta:
        model = Gasto
        fields = '__all__'
