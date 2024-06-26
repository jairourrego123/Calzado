from rest_framework import serializers
from .models import Gasto

class GastoSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(source='user.first_name', read_only=True)
    metodo_pago = serializers.CharField(source='metodo_de_pago', read_only=True)
    class Meta:
        model = Gasto
        fields = '__all__'
