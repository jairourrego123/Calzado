from rest_framework import serializers
from .models import Devolucion, MotivoDevolucion, RelacionProductoDevolucion
from ApiBackendApp.serializers import BaseSerializer

class DevolucionSerializer(BaseSerializer):
    valor_devolucion = serializers.CharField(source="valor_total", read_only = True)
    usuario = serializers.CharField( read_only = True)
    class Meta(BaseSerializer.Meta):
        model = Devolucion
        

class MotivoDevolucionSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = MotivoDevolucion
        

class RelacionProductoDevolucionSerializer(BaseSerializer):
    estilo = serializers.CharField(source='producto.estilo', read_only=True)
    talla = serializers.CharField(source='producto.talla', read_only=True)
    color = serializers.CharField(source='producto.color', read_only=True)
    valor_total = serializers.CharField(source='devolucion.valor_total', read_only=True)
    motivo_devolucion = serializers.CharField(source='motivo', read_only=True)
    class Meta(BaseSerializer.Meta):
        model = RelacionProductoDevolucion
        