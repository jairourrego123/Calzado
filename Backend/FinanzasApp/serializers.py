from rest_framework import serializers
from .models import MetodoDePago, Transferencia, Movimientos, Cierre

class MetodoDePagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetodoDePago
        fields = '__all__'

class TransferenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transferencia
        fields = '__all__'

class MovimientosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movimientos
        fields = '__all__'

class CierreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cierre
        fields = '__all__'
