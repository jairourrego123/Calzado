from django.db import models
from django.contrib.auth.models import AbstractUser , Group , Permission


class Tenant(models.Model):
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    email = models.EmailField()
    fecha = models.DateField( auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    state = models.BooleanField(default=True,blank=True)
    def __str__(self):
        return self.nombre



class PermisosGrupo(models.Model):
    nombre = models.CharField(max_length=255, unique=True)
    permisos = models.ManyToManyField('auth.Permission', blank=True)
    # Otros campos que necesites

    def __str__(self):
        return self.nombre

class Grupos(Group):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE,null=True,blank=True)
    permisos_grupo = models.ManyToManyField(PermisosGrupo, blank=True)  # Renombrado de permissions
    
    class Meta:
        verbose_name = "Grupo"
        verbose_name_plural = "Grupos"

    def __str__(self):
        return self.name

class Usuarios(AbstractUser):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True,blank=True)
    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
    def __str__(self):
        return self.username
    