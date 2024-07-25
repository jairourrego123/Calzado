from rest_framework import serializers
from VentasApp.models import Venta 
class BaseSerializer(serializers.ModelSerializer):
    
    # def create(self, validated_data):
    #     request = self.context.get('request')
    #     print("request,",request)
    #     tenant = request.user.tenant if request else None
    #     print("validate data",validated_data)
    #     # Asume que el modelo tiene un campo 'tenant'
    #     validated_data['tenant'] = tenant
    #     return super().create(validated_data)
    
    def update(self, instance, validated_data):
        # Excluir el campo 'tenant' al actualizar
        validated_data.pop('tenant', None)
        return super().update(instance, validated_data)
    class Meta:
        exclude = ['update']
        extra_kwargs = {'tenant': {'write_only': True}}

class VentaHomeSerializer(serializers.ModelSerializer):
     cliente = serializers.CharField(source='cliente.nombre')  # Especificar el nombre del cliente
     valor_neto = serializers.CharField(source='valor_total_ajustado')  # Especificar el nombre del cliente
     cantidad = serializers.CharField(source='cantidad_total')  # Especificar el nombre del cliente
     ganancia = serializers.CharField(source='ganancia_total_ajustada')
     class Meta:
         model = Venta
         fields = ['orden', 'cliente', 'cantidad', 'valor_total',"valor_neto",'ganancia', 'estado', 'fecha']


# class ActualizarVentaEntradaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Venta
#         fields = ['estado']
        


# class RegistrarPagosVentaSerializer(serializers.Serializer):
#     pagos = PagoVentaSerializer(many=True)
#     venta = ActualizarVentaEntradaSerializer()
    
    # Si también necesitas manejar entradas:
    # entrada = serializers.PrimaryKeyRelatedField(queryset=Entrada.objects.all(), required=False)


