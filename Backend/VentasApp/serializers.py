from rest_framework import serializers
from .models import Cliente, Venta, RelacionProductoVenta, PagoVenta

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class VentaSerializer(serializers.ModelSerializer):
    comprador = serializers.CharField(source='cliente',read_only=True)  # Especificar el nombre del cliente

    class Meta:
        model = Venta
        fields = '__all__'

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
        fields = ["id","metodo_pago","metodo_de_pago","valor","fecha","venta",'tenant']
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
