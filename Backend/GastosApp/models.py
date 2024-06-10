from django.db import models
from ApiBackendApp.models import GeneralModelId

class Gasto(GeneralModelId):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_gasto = models.CharField(max_length=50)  # ej. 'arriendo', 'servicios'
    descripcion = models.TextField()
    usuario = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    metodo_pago = models.ForeignKey('FinanzasApp.MetodoDePago', on_delete=models.CASCADE)

