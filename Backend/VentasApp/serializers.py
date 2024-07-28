from rest_framework import serializers
from .models import Cliente, Venta, RelacionProductoVenta, PagoVenta
from ApiBackendApp.serializers import BaseSerializer
class ClienteSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Cliente

class VentaBasicosSerializer(serializers.ModelSerializer):
    cliente = serializers.CharField(read_only=True)  # Especificar el nombre del cliente
    valor_neto = serializers.CharField(source='valor_total_ajustado')  # Especificar el nombre del cliente
    cantidad = serializers.CharField(source='cantidad_total')  # Especificar el nombre del cliente
    ganancia = serializers.CharField(source='ganancia_total_ajustada')
    class Meta:
        model = Venta
        fields = ['orden', 'cliente', 'cantidad', 'valor_neto','ganancia', 'estado', 'fecha','id']

class VentaSerializer(BaseSerializer):

    cliente = serializers.CharField(read_only=True)

    class Meta(BaseSerializer.Meta):
        model = Venta

class VentaCreateSerializer(BaseSerializer):


    class Meta(BaseSerializer.Meta):
        model = Venta


class RelacionProductoVentaSerializer(BaseSerializer):
    estilo = serializers.CharField(source='producto.estilo', read_only=True)
    talla = serializers.CharField(source='producto.talla', read_only=True)
    color = serializers.CharField(source='producto.color', read_only=True)
    valor_venta_producto = serializers.CharField(source='valor', read_only=True)
    class Meta(BaseSerializer.Meta):
        model = RelacionProductoVenta
        
class PagoVentaSerializer(BaseSerializer):
    metodo_pago = serializers.CharField(source='metodo_de_pago', read_only=True)
    class Meta(BaseSerializer.Meta):
        model = PagoVenta 
# class ActualizacionVentaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Venta
#         fields = ['orden','estado']

#     def update(self, instance, validated_data):
#         instance.estado = validated_data.get('estado', instance.estado)
#         instance.save()
#         return instance

class RegistroPagosVentaSerializer(BaseSerializer):
    pagos = PagoVentaSerializer(many=True)
    venta = VentaSerializer()
