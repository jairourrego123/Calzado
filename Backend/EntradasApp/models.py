from django.db import models
from ApiBackendApp.models import GeneralModel,GeneralModelId

class Proveedor(GeneralModelId):
    nombre = models.CharField(max_length=150)
    lugar = models.CharField(max_length=150)
    numero_contacto = models.CharField(max_length=30)
    estado = models.BooleanField(default=True)  # True si se le debe algo

class Entrada(GeneralModel):
    orden = models.CharField(max_length=50,primary_key=True)
    estado = models.BooleanField(default=True)  # True si está pendiente de pago
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    usuario = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)

class RelacionProductoEntrada(GeneralModelId):
    entrada = models.ForeignKey('EntradasApp.Entrada', on_delete=models.CASCADE)
    producto = models.ForeignKey('VentasApp.Producto', on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    valor = models.DecimalField(max_digits=10, decimal_places=2)

class PagoEntrada(GeneralModelId):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    metodo_de_pago = models.ForeignKey('FinanzasApp.MetodoDePago', on_delete=models.CASCADE)
