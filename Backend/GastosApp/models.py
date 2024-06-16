from django.db import models
from ApiBackendApp.models import GeneralModel

class Gasto(GeneralModel):
    orden = models.CharField(max_length=50, primary_key=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_gasto = models.CharField(max_length=50)  # ej. 'arriendo', 'servicios'
    descripcion = models.TextField()
    usuario = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    metodo_de_pago = models.ForeignKey('FinanzasApp.MetodoDePago', on_delete=models.CASCADE)

    def __str__(self):
        return f"Gasto {self.orden} - {self.tipo_gasto}"

    class Meta:
        verbose_name = "Gasto"
        verbose_name_plural = "Gastos"
