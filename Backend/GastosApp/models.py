from django.db import models
from ApiBackendApp.models import GeneralModel, GeneralModelId
from GestionDeUsuariosApp.models import Usuarios

class TipoGasto(GeneralModelId):
    nombre = models.CharField(max_length=50)
    predeterminado_entrada =models.BooleanField(default=False)
    def __str__(self):
        return self.nombre
class Gasto(GeneralModelId):
    orden = models.CharField(max_length=50,blank=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    usuario = models.ForeignKey(Usuarios, on_delete=models.SET_NULL, null=True)
    tipo_gasto = models.ForeignKey(TipoGasto,max_length=50, on_delete=models.SET_NULL, null=True)  # ej. 'arriendo', 'servicios'
    metodo_de_pago = models.ForeignKey('FinanzasApp.MetodoDePago', on_delete=models.SET_NULL,null=True)

    def save(self, *args, **kwargs):
        
        last_gasto = Gasto.objects.all().order_by('id').last()
        print(last_gasto)
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
        ordering=["-id"]
        verbose_name = "Gasto"
        verbose_name_plural = "Gastos"
