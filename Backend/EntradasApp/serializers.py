from rest_framework import serializers
from .models import Proveedor, Entrada, RelacionProductoEntrada, PagoEntrada

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'

class EntradaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrada
        fields = '__all__'

class RelacionProductoEntradaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RelacionProductoEntrada
        fields = '__all__'

class PagoEntradaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PagoEntrada
        fields = '__all__'
