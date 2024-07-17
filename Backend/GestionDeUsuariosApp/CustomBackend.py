# gestiondeusuariosapp/backends.py
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class CustomBackend(ModelBackend):


        
    def get_group_permissions(self, user_obj, obj=None):
        if not user_obj.is_active or user_obj.is_anonymous:
            return set()

        permissions = set()
        for grupo in user_obj.groups.all():
            print("grupos", grupo)
            for permisos_grupo in grupo.grupo_permisos.all():
                permissions.update(permisos_grupo.permisos.values_list('codename', flat=True))
        return permissions

    def get_all_permissions(self, user_obj, obj=None):
        if not user_obj.is_active or user_obj.is_anonymous:
            return set()
        permissions = set()
        permissions.update(user_obj.user_permissions.values_list('codename', flat=True))
        permissions.update(self.get_group_permissions(user_obj, obj))
        return permissions

    def has_perm(self, user_obj, perm, obj=None):
        if not user_obj.is_active or user_obj.is_anonymous:
            return False
        return perm in self.get_all_permissions(user_obj, obj)


