from django.db import models

# Create your models here.

class GeneralModel(models.Model):
    state = models.BooleanField(default=True,null=False,blank=False) # los modelos que apliquen baseModels tendran estos dos campos
    tenant_id = models.IntegerField(blank=True,null=True)
    fecha = models.DateField( auto_now_add=False)
    update = models.DateTimeField(auto_now=True)
    class Meta:
       abstract = True # Este modelo no creara una tabla en la Base de datos de este modelo 


class GeneralModelId(GeneralModel):
    id = models.AutoField(primary_key=True, unique=True) # los modelos que apliquen baseModels tendran estos dos campos
    class Meta:
       abstract = True # Este modelo no creara una tabla en la Base de datos de este modelo 