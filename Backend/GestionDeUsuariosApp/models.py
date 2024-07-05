from django.db import models
from django.contrib.auth.models import AbstractUser

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

class Usuario(AbstractUser):
    tenant = models.ForeignKey(Tenant, on_delete=models.SET_NULL,null=True)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',  # Cambia el related_name aquí
        blank=True,
        help_text=('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',  # Cambia el related_name aquí
        blank=True,
        help_text=('Specific permissions for this user.'),
        related_query_name='user',
    )

    def __str__(self):
        return self.username
