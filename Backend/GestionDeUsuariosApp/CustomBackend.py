from django.contrib.auth.backends import ModelBackend
from  .models import Usuarios

class CustomBackend(ModelBackend):
    def get_user(self, user_id):
        try:
            return Usuarios.objects.get(pk=user_id)
        except Usuarios.DoesNotExist:
            return None

    def get_group_permissions(self, user_obj, obj=None):
        if user_obj.is_anonymous or not user_obj.is_active:
            return set()
        return user_obj.get_group_permissions(obj=obj)

    def get_all_permissions(self, user_obj, obj=None):
        if user_obj.is_anonymous or not user_obj.is_active:
            return set()
        return user_obj.get_all_permissions(obj=obj)

    def has_perm(self, user_obj, perm, obj=None):
        if user_obj.is_anonymous or not user_obj.is_active:
            return False
        return perm in self.get_all_permissions(user_obj, obj=obj)
