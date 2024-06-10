from django.db import models
from ApiBackendApp.models import GeneralModel, GeneralModelId

class MetodoDePago(GeneralModelId):
    metodo_de_pago = models.CharField(max_length=150)
    saldo_actual = models.DecimalField(max_digits=10, decimal_places=2)
    comision_banco = models.DecimalField(max_digits=5, decimal_places=2)

class Transferencia(GeneralModel):
    cuenta_origen = models.ForeignKey(MetodoDePago, related_name='cuenta_origen', on_delete=models.CASCADE)
    cuenta_destino = models.ForeignKey(MetodoDePago, related_name='cuenta_destino', on_delete=models.CASCADE)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    
class Movimientos(GeneralModelId):
    referencia = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)  # ej. 'entrada' o 'venta'
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    usuario = models.ForeignKey('auth.User', on_delete=models.CASCADE)

class Cierre(GeneralModelId):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    ganancia = models.DecimalField(max_digits=10, decimal_places=2)
