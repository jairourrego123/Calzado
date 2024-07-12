from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth.hashers import make_password


class Tenant(models.Model):
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    email = models.EmailField()
    fecha = models.DateField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    state = models.BooleanField(default=True, blank=True)

    def __str__(self):
        return self.nombre


class PermisosGrupo(models.Model):
    nombre = models.CharField(max_length=255, unique=True)
    permisos = models.ManyToManyField(Permission, blank=True)

    def __str__(self):
        return self.nombre


class Grupos(Group):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True, blank=True)
    permisos_grupo = models.ManyToManyField(PermisosGrupo, blank=True)

    class Meta:
        verbose_name = "Grupo"
        verbose_name_plural = "Grupos"

    def __str__(self):
        return self.name


class Usuarios(AbstractUser):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return self.username

    
    def get_group_permissions(self, obj=None):
        if not self.is_active or self.is_anonymous:
            return set()
        print(self.groups.all())
        permissions = set()
        for group in self.groups.all():
            if isinstance(group, Grupos):
                for permisos_grupo in group.permisos_grupo.all():
                    permissions.update(permisos_grupo.permisos.values_list('codename', flat=True))
        
        return permissions
    def get_all_permissions(self, obj=None):
        if not self.is_active or self.is_anonymous:
            return set()

        permissions = self.get_user_permissions(obj=obj)
        permissions.update(self.get_group_permissions(obj=obj))
        return permissions

    def has_perm(self, perm, obj=None):
        if not self.is_active:
            return False
        return perm in self.get_all_permissions(obj=obj)
