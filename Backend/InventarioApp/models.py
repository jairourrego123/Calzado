from django.db import models
from ApiBackendApp.models import GeneralModel

class Producto(GeneralModel):
    referencia = models.CharField(max_length=50)
    estilo = models.CharField(max_length=150)
    talla = models.IntegerField()
    color = models.CharField(max_length=50)
    cantidad = models.IntegerField(default=0)
    stock_min = models.IntegerField(default=0)
    disponibilidad = models.BooleanField(default=True)  # True si está disponible
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    valor_compra = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.referencia

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
