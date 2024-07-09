from django.db import models
from ApiBackendApp.models import GeneralModelId
import time

class Producto(GeneralModelId):
    referencia = models.CharField(max_length=50,blank=True,null=True)
    estilo = models.CharField(max_length=150)
    talla = models.IntegerField()
    color = models.CharField(max_length=50)
    cantidad = models.IntegerField(default=0)
    stock_min = models.IntegerField(default=0)
    estado = models.BooleanField(default=True)  # True si está disponible
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    valor_compra = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        if not self.referencia:
            self.referencia = str(int(time.time()))
         # Actualizar estado basado en stock_min y cantidad
        self.estado = self.cantidad > self.stock_min
        
        # Llamar al método save de la superclase
        super().save(*args, **kwargs)
    def __str__(self):
        return self.referencia

    class Meta:
        ordering=['estilo','color','talla']
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
