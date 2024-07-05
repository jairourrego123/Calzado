from rest_framework import serializers
from .models import Proveedor, Entrada, RelacionProductoEntrada, PagoEntrada
from ApiBackendApp.serializers import BaseSerializer

class ProveedorSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Proveedor
        

class EntradaSerializer(BaseSerializer):
    
    usuario = serializers.CharField(read_only=True)
    proveedor = serializers.CharField(read_only=True)
    class Meta(BaseSerializer.Meta):
        model = Entrada
        

class RelacionProductoEntradaSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = RelacionProductoEntrada
        

class PagoEntradaSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = PagoEntrada
        
