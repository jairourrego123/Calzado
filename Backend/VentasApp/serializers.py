from rest_framework import serializers
from .models import Cliente, Venta, RelacionProductoVenta, PagoVenta
from ApiBackendApp.serializers import BaseSerializer
class ClienteSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Cliente

class VentaBasicosSerializer(serializers.ModelSerializer):
    cliente = serializers.CharField(read_only=True)  # Especificar el nombre del cliente
    valor = serializers.CharField(source='valor_total_ajustado')  # Especificar el nombre del cliente
    cantidad = serializers.CharField(source='cantidad_total')  # Especificar el nombre del cliente
    ganancia = serializers.CharField(source='ganancia_total_ajustada')
    class Meta:
        model = Venta
        fields = ['orden', 'cliente', 'cantidad', 'valor','ganancia', 'estado', 'fecha']

class VentaSerializer(BaseSerializer):
    cliente_id = serializers.PrimaryKeyRelatedField(
        source='cliente',  # El campo en el modelo es `cliente`
        queryset=Cliente.objects.none(),  # Se establecerá dinámicamente
        write_only=True
    )
    cliente = serializers.CharField(source='cliente.nombre', read_only=True)

    class Meta(BaseSerializer.Meta):
        model = Venta

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Obtener el usuario del contexto
        request = self.context.get('request')
        if request:
            user = request.user
            # Ajustar dinámicamente el queryset de cliente_id
            self.fields['cliente_id'].queryset = Cliente.objects.filter(state=True, tenant=user.tenant)

class RelacionProductoVentaSerializer(BaseSerializer):
    estilo = serializers.CharField(source='producto.estilo', read_only=True)
    talla = serializers.CharField(source='producto.talla', read_only=True)
    color = serializers.CharField(source='producto.color', read_only=True)
    class Meta:
        model = RelacionProductoVenta
        fields = ["id","producto","venta","estilo","talla","color","valor_compra","valor_venta_producto","ganancia","cantidad_devuelta","cantidad",'tenant']

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
