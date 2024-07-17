# gestiondeusuariosapp/models.py

from django.contrib.auth.models import AbstractUser, Group as AuthGroup, Permission
from django.contrib.auth.models import BaseUserManager, Permission, Group

from django.db import models

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

    class Meta:
        verbose_name = "Permiso"
        verbose_name_plural = "Permisos"

    def __str__(self):
        return self.nombre

class Grupos(AuthGroup):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True, blank=True)
    grupo_permisos = models.ManyToManyField(PermisosGrupo, related_name='permisos_grupo')

    class Meta:
        verbose_name = "Grupo"
        verbose_name_plural = "Grupos"

    def __str__(self):
        return self.name
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        # if not email:
        #     raise ValueError('El correo electrónico es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class Usuarios(AbstractUser):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True, blank=True)
    groups = models.ManyToManyField(Grupos, related_name='user_set', blank=True)
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='user_set',
        related_query_name='user',
    )

    objects = CustomUserManager()

    def _get_permissions(self, obj, from_name):
        if not self.is_active or self.is_anonymous or obj is not None:
            return set()

        perm_cache_name = f"_{from_name}_perm_cache"
        if not hasattr(self, perm_cache_name):
            if self.is_superuser:
                perms = Permission.objects.all()
            else:
                perms = getattr(self, f"_get_{from_name}_permissions")()
            perms = perms.values_list("content_type__app_label", "codename").order_by()
            setattr(self, perm_cache_name, {f"{ct}.{name}" for ct, name in perms})
        return getattr(self, perm_cache_name)

    def _get_user_permissions(self):
        return self.user_permissions.all()

    def _get_group_permissions(self):
        perms = Permission.objects.none()
        for group in self.groups.all():
            for permisos_grupo in group.grupo_permisos.all():
                perms = perms | permisos_grupo.permisos.all()
        return perms

    def get_user_permissions(self, obj=None):
        return self._get_permissions(obj, 'user')

    def get_group_permissions(self, obj=None):
        return self._get_permissions(obj, 'group')

    def get_all_permissions(self, obj=None):
        return self.get_user_permissions(obj) | self.get_group_permissions(obj)

    def has_perm(self, perm, obj=None):
        return perm in self.get_all_permissions(obj)

    def has_module_perms(self, app_label):
        for perm in self.get_all_permissions():
            if perm.startswith(f"{app_label}."):
                return True
        return False

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return self.username