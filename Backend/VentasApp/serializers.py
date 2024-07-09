from rest_framework import serializers
from .models import Cliente, Venta, RelacionProductoVenta, PagoVenta

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        exclude = ['tenant', 'update']

class VentaBasicosSerializer(serializers.ModelSerializer):
    cliente = serializers.CharField(read_only=True)  # Especificar el nombre del cliente
    valor = serializers.CharField(source='valor_total_ajustado')  # Especificar el nombre del cliente
    cantidad = serializers.CharField(source='cantidad_total')  # Especificar el nombre del cliente
    ganancia = serializers.CharField(source='ganancia_total_ajustada')
    class Meta:
        model = Venta
        fields = ['orden', 'cliente', 'cantidad', 'valor','ganancia', 'estado', 'fecha']
8
class VentaSerializer(serializers.ModelSerializer):
    cliente = serializers.CharField(read_only=True)  # Especificar el nombre del cliente
  
    class Meta:
        model = Venta 
        exclude = ['tenant', 'update']

class RelacionProductoVentaSerializer(serializers.ModelSerializer):
    estilo = serializers.CharField(source='producto.estilo', read_only=True)
    talla = serializers.CharField(source='producto.talla', read_only=True)
    color = serializers.CharField(source='producto.color', read_only=True)
    class Meta:
        model = RelacionProductoVenta
        fields = ["id","estilo","talla","color","valor_compra","valor_venta_producto","ganancia","cantidad_devuelta","cantidad",'tenant']

class PagoVentaSerializer(serializers.ModelSerializer):
    metodo_pago = serializers.CharField(source='metodo_de_pago', read_only=True)
    class Meta:
        model = PagoVenta 
        exclude = ['tenant', 'update']
# class ActualizacionVentaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Venta
#         fields = ['orden','estado']

#     def update(self, instance, validated_data):
#         instance.estado = validated_data.get('estado', instance.estado)
#         instance.save()
#         return instance

class RegistroPagosVentaSerializer(serializers.Serializer):
    pagos = PagoVentaSerializer(many=True)
    venta = VentaSerializer()
