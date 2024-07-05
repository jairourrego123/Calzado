from django.db import models
from ApiBackendApp.models import GeneralModel, GeneralModelId
from InventarioApp.models import Producto  # Importa el modelo Producto desde InventarioApp

class Devolucion(GeneralModelId):
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=50)  # ej. 'entrada' o 'venta'
    referencia = models.CharField(max_length=50)
    usuario = models.ForeignKey('auth.User', on_delete=models.SET_NULL,null=True)

    
    def __str__(self):
        return f"Devolución {self.id} - {self.tipo}"

    class Meta:
        ordering=['id']
        verbose_name = "Devolución"
        verbose_name_plural = "Devoluciones"


class MotivoDevolucion(GeneralModel):
    nombre = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre

    class Meta:
        ordering=['nombre']
        verbose_name = "Motivo de Devolución"
        verbose_name_plural = "Motivos de Devolución"


class RelacionProductoDevolucion(GeneralModelId):
    cantidad = models.IntegerField()
    valor_venta_producto = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    motivo = models.ForeignKey(MotivoDevolucion, on_delete=models.SET_NULL,null=True)
    devolucion = models.ForeignKey(Devolucion, on_delete=models.SET_NULL,null=True)
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL,null=True)

    def __str__(self):
        return f"Relación {self.id} - Producto {self.producto.referencia}"

    class Meta:
        ordering=['id']
        verbose_name = "Relación Producto Devolución"
        verbose_name_plural = "Relaciones Producto Devolución"
