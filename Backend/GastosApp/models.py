from django.db import models
from ApiBackendApp.models import GeneralModel, GeneralModelId

class TipoGasto(GeneralModelId):
    nombre = models.CharField(max_length=50)
   
class Gasto(GeneralModel):
    orden = models.CharField(max_length=50, primary_key=True,unique=True,blank=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    user = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True)
    tipo_gasto = models.ForeignKey(TipoGasto,max_length=50, on_delete=models.SET_NULL, null=True)  # ej. 'arriendo', 'servicios'
    metodo_de_pago = models.ForeignKey('FinanzasApp.MetodoDePago', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        
        last_gasto = Gasto.objects.all().order_by('orden').last()
        if not last_gasto:
            new_orden = 'G00001'
        else:
            last_orden = last_gasto.orden
            print(last_orden)
            orden_number = int(last_orden[1:]) + 1
            print(orden_number)
            new_orden = 'G' + str(orden_number).zfill(5)
            self.orden = new_orden
        super(Gasto, self).save(*args, **kwargs)
    def __str__(self):
        return f"Gasto {self.orden} - {self.tipo_gasto}"

    class Meta:
        verbose_name = "Gasto"
        verbose_name_plural = "Gastos"
