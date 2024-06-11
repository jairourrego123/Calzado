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
    class Meta:
        model = RelacionProductoDevolucion
        fields = '__all__'
