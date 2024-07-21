from django.db import models
from ApiBackendApp.models import GeneralModel, GeneralModelId
from GestionDeUsuariosApp.models import Usuarios

class MetodoDePago(GeneralModelId):
    nombre = models.CharField(max_length=150)
    saldo_actual = models.DecimalField(max_digits=10, decimal_places=2)
    comision_banco = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre

    class Meta:
        ordering=['nombre']
        verbose_name = "Método de Pago"
        verbose_name_plural = "Métodos de Pago"


class Transferencia(GeneralModelId):
    cuenta_origen = models.ForeignKey(MetodoDePago, related_name='cuenta_origen', on_delete=models.SET_NULL,null=True)
    cuenta_destino = models.ForeignKey(MetodoDePago, related_name='cuenta_destino', on_delete=models.SET_NULL,null=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    usuario = models.ForeignKey(Usuarios, on_delete=models.SET_NULL,null=True)

    descripcion = models.TextField()

    def __str__(self):
        return f"Transferencia de {self.cuenta_origen} a {self.cuenta_destino}"

    class Meta:
        ordering=['id']
        verbose_name = "Transferencia"
        verbose_name_plural = "Transferencias"


class Movimientos(GeneralModelId):
    referencia = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)  # ej. 'entrada' o 'venta'
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    usuario = models.ForeignKey(Usuarios, on_delete=models.SET_NULL,null=True)
    metodo_de_pago = models.ForeignKey('FinanzasApp.MetodoDePago', on_delete=models.SET_NULL, null=True)

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
