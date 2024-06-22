from rest_framework import serializers
from .models import Devolucion, MotivoDevolucion, RelacionProductoDevolucion

class DevolucionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devolucion
        fields = '__all__'

class MotivoDevolucionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MotivoDevolucion
        fields = '__all__'

class RelacionProductoDevolucionSerializer(serializers.ModelSerializer):
    estilo = serializers.CharField(source='producto.estilo', read_only=True)
    talla = serializers.CharField(source='producto.talla', read_only=True)
    color = serializers.CharField(source='producto.color', read_only=True)
    valor_total = serializers.CharField(source='devolucion.valor_total', read_only=True)
    motivo_devolucion = serializers.CharField(source='motivo', read_only=True)
    class Meta:
        model = RelacionProductoDevolucion
        fields = '__all__'