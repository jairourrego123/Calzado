from django.db import models
from GestionDeUsuariosApp.models import Tenant
# Create your models here.

class GeneralModel(models.Model):
    state = models.BooleanField(default=True,null=False,blank=False) # los modelos que apliquen baseModels tendran estos dos campos
    tenant = models.ForeignKey(Tenant, on_delete=models.SET_NULL, null=True,blank=True)    
    fecha = models.DateField( auto_now_add=True, null=True)
    update = models.DateTimeField(auto_now=True,null=True)
    
    class Meta:
       abstract = True # Este modelo no creara una tabla en la Base de datos de este modelo 


class GeneralModelId(GeneralModel):
    id = models.AutoField(primary_key=True, unique=True) # los modelos que apliquen baseModels tendran estos dos campos
    class Meta:
        abstract = True # Este modelo no creara una tabla en la Base de datos de este modelo 
        
        
class Reporte(GeneralModel):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    descripcion = models.TextField(null=True, blank=True)
    
    class Meta:
        verbose_name = "Reporte"
        verbose_name_plural = "Reportes"
        ordering = ['nombre']
        
    def __str__(self):
        return self.nombre