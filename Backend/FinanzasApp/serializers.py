from rest_framework import serializers
from .models import MetodoDePago, Transferencia, Movimientos, Cierre

class MetodoDePagoSerializer(serializers.ModelSerializer):
    metodo_pago = serializers.CharField(source='nombre', read_only=True)
    ultima_modificacion = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",source = "update", read_only=True)

    class Meta:
        model = MetodoDePago
        fields = '__all__'

class TransferenciaSerializer(serializers.ModelSerializer):
    cuenta_origen = serializers.CharField(read_only=True)
    cuenta_destino = serializers.CharField(read_only=True)

    class Meta:
        model = Transferencia
        fields = '__all__'

class MovimientosSerializer(serializers.ModelSerializer):
    registra = serializers.CharField(source='user.first_name', read_only=True)
    metodo_pago = serializers.CharField(source='metodo_de_pago', read_only=True)
    class Meta:
        model = Movimientos
        fields = '__all__'

class CierreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cierre
        fields = '__all__'
