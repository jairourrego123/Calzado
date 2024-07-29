from rest_framework import serializers
from .models import Proveedor, Entrada, RelacionProductoEntrada, PagoEntrada
from ApiBackendApp.serializers import BaseSerializer

class ProveedorSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Proveedor
        

class EntradaSerializer(BaseSerializer):
    valor_neto = serializers.CharField(source='valor_total_ajustado',read_only=True)  # Especificar el nombre del cliente
    usuario = serializers.CharField(read_only=True)
    proveedor = serializers.CharField(read_only=True)
    class Meta(BaseSerializer.Meta):
        model = Entrada
class EntradaCreateSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Entrada
        
    
class RelacionProductoEntradaSerializer(BaseSerializer):
    estilo = serializers.CharField(source='producto.estilo', read_only=True)
    talla = serializers.CharField(source='producto.talla', read_only=True)
    color = serializers.CharField(source='producto.color', read_only=True)
    valor_venta_producto = serializers.CharField(source='valor', read_only=True)
    class Meta(BaseSerializer.Meta):
        model = RelacionProductoEntrada
        

class PagoEntradaSerializer(BaseSerializer):
    metodo_pago = serializers.CharField(source='metodo_de_pago', read_only=True)

    class Meta(BaseSerializer.Meta):
        model = PagoEntrada
        
