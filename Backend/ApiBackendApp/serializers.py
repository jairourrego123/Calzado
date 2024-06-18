from rest_framework import serializers
from VentasApp.models import Venta
from GastosApp.models import Gasto

class VentaSerializer(serializers.ModelSerializer):
    cliente = serializers.CharField(source='cliente.nombre')  # Especificar el nombre del cliente
    valor_neto = serializers.CharField(source='valor_total_ajustado')  # Especificar el nombre del cliente
    cantidad = serializers.CharField(source='cantidad_total')  # Especificar el nombre del cliente
    ganancia = serializers.CharField(source='ganancia_total_ajustada')
    class Meta:
        model = Venta
        fields = ['orden', 'cliente', 'cantidad', 'valor_total',"valor_neto",'ganancia', 'estado', 'fecha']



