from rest_framework import serializers
from .models import MetodoDePago, Transferencia, Movimientos, Cierre
from ApiBackendApp.serializers import BaseSerializer

class MetodoDePagoSerializer(BaseSerializer):
    metodo_pago = serializers.CharField(source='nombre', read_only=True)
    ultima_modificacion = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",source = "update", read_only=True)

    class Meta(BaseSerializer.Meta):
        model = MetodoDePago
        

class TransferenciaSerializer(BaseSerializer):
    cuenta_origen = serializers.CharField(read_only=True)
    cuenta_destino = serializers.CharField(read_only=True)

    class Meta(BaseSerializer.Meta):
        model = Transferencia
        

class MovimientosSerializer(BaseSerializer):
    registra = serializers.CharField(source='user.first_name', read_only=True)
    metodo_pago = serializers.CharField(source='metodo_de_pago', read_only=True)
    class Meta(BaseSerializer.Meta):
        model = Movimientos
        

class CierreSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Cierre
        
