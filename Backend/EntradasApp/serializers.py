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
    class Meta(BaseSerializer.Meta):
        model = RelacionProductoEntrada
        

class PagoEntradaSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = PagoEntrada
        
