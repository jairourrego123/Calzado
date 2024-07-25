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
class EntradaCreateSerializer(BaseSerializer):
    proveedor_id = serializers.PrimaryKeyRelatedField(
        source='proveedor',  # El campo en el modelo es `cliente`
        queryset=Proveedor.objects.none(),  # Se establecerá dinámicamente
        write_only=True,
        
    )
    class Meta(BaseSerializer.Meta):
        model = Entrada
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Obtener el usuario del contexto
        request = self.context.get('request')
        if request:
            user = request.user
            # Ajustar dinámicamente el queryset de cliente_id
            self.fields['proveedor_id'].queryset = Proveedor.objects.filter(state=True, tenant=user.tenant) 

class RelacionProductoEntradaSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = RelacionProductoEntrada
        

class PagoEntradaSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = PagoEntrada
        
