from rest_framework import serializers
from .models import Cliente, Venta, RelacionProductoVenta, PagoVenta

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class VentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = '__all__'

class RelacionProductoVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RelacionProductoVenta
        fields = '__all__'

class PagoVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PagoVenta
        fields = '__all__'
