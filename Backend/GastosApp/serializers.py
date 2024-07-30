from rest_framework import serializers
from .models import Gasto,TipoGasto
from ApiBackendApp.serializers import BaseSerializer
class GastoSerializer(BaseSerializer):
    usuario = serializers.CharField(read_only=True)
    tipo_de_gasto = serializers.CharField(source='tipo_gasto', read_only=True)
    metodo_pago = serializers.CharField(source='metodo_de_pago', read_only=True)
    class Meta(BaseSerializer.Meta):
        model = Gasto
class GastoCreateSerializer(BaseSerializer):

    class Meta(BaseSerializer.Meta):
        model = Gasto
        


class TipoGastoSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = TipoGasto
