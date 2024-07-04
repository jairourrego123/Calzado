from django.db import models
from ApiBackendApp.models import GeneralModel, GeneralModelId
from InventarioApp.models import Producto  # Importa el modelo Producto desde InventarioApp

class Proveedor(GeneralModelId):
    nombre = models.CharField(max_length=150)
    lugar = models.CharField(max_length=150)
    numero_contacto = models.CharField(max_length=30)
    estado = models.BooleanField(default=False)  # True si se le debe algo

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Proveedor"
        verbose_name_plural = "Proveedores"


class Entrada(GeneralModel):
    orden = models.CharField(max_length=50, primary_key=True)
    estado = models.BooleanField(default=True)  # True si está pendiente de pago
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)

    def __str__(self):
        return f"Entrada {self.orden}"

    class Meta:
        verbose_name = "Entrada"
        verbose_name_plural = "Entradas"


class RelacionProductoEntrada(GeneralModelId):
    entrada = models.ForeignKey(Entrada, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_devuelta = models.IntegerField(null=True)
    def __str__(self):
        return f"Relación {self.id} - Entrada {self.entrada.orden}"

    class Meta:
        verbose_name = "Relación Producto Entrada"
        verbose_name_plural = "Relaciones Producto Entrada"


class PagoEntrada(GeneralModelId):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    metodo_de_pago = models.ForeignKey('FinanzasApp.MetodoDePago', on_delete=models.CASCADE)
    entrada = models.ForeignKey(Entrada, on_delete=models.CASCADE)

    def __str__(self):
        return f"Pago {self.id} - Entrada {self.entrada.orden}"

    class Meta:
        verbose_name = "Pago Entrada"
        verbose_name_plural = "Pagos Entrada"
