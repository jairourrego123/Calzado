from django.db import models
from ApiBackendApp.models import GeneralModel, GeneralModelId

class Devolucion(GeneralModelId):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=50)  # ej. 'entrada' o 'venta'
    referencia = models.CharField(max_length=50)


class MotivoDevolucion(GeneralModel):
    nombre = models.CharField(max_length=100)
    
class RelacionProductoDevolucion(GeneralModelId):
   
    cantidad = models.IntegerField()
    valor_venta = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    motivo =  models.ForeignKey(MotivoDevolucion, on_delete=models.CASCADE)
    devolucion = models.ForeignKey(Devolucion, on_delete=models.CASCADE)
    producto = models.ForeignKey('VentasApp.Producto', on_delete=models.CASCADE)