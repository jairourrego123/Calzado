from django.db import models
from ApiBackendApp.models import GeneralModel, GeneralModelId

class MetodoDePago(GeneralModelId):
    metodo_de_pago = models.CharField(max_length=150)
    saldo_actual = models.DecimalField(max_digits=10, decimal_places=2)
    comision_banco = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.metodo_de_pago

    class Meta:
        verbose_name = "Método de Pago"
        verbose_name_plural = "Métodos de Pago"


class Transferencia(GeneralModel):
    cuenta_origen = models.ForeignKey(MetodoDePago, related_name='cuenta_origen', on_delete=models.CASCADE)
    cuenta_destino = models.ForeignKey(MetodoDePago, related_name='cuenta_destino', on_delete=models.CASCADE)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()

    def __str__(self):
        return f"Transferencia de {self.cuenta_origen} a {self.cuenta_destino}"

    class Meta:
        verbose_name = "Transferencia"
        verbose_name_plural = "Transferencias"


class Movimientos(GeneralModelId):
    referencia = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)  # ej. 'entrada' o 'venta'
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    usuario = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return f"Movimiento {self.referencia} - {self.tipo}"

    class Meta:
        verbose_name = "Movimiento"
        verbose_name_plural = "Movimientos"


class Cierre(GeneralModelId):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    ganancia = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Cierre {self.id}"

    class Meta:
        verbose_name = "Cierre"
        verbose_name_plural = "Cierres"