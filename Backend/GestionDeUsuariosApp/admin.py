# from django.contrib import admin
# from django.contrib.admin.widgets import FilteredSelectMultiple
# from .models import Usuarios, Grupos
# from .forms import UserCreationForm, UserChangeForm, GrupoForm
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# class TenantAdminMixin:
#     def get_queryset(self, request):
#         qs = super().get_queryset(request)
#         if request.user.is_superuser:
#             return qs

#         return qs.filter(tenant=request.user.tenant)

# class UsuarioAdmin(TenantAdminMixin, BaseUserAdmin):
#     form = UserChangeForm
#     add_form = UserCreationForm

#     list_display = ('username', 'email', 'tenant', 'is_staff')
#     list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
#     ordering = ('username',)
#     filter_horizontal = ('groups', 'user_permissions')

#         # return qs.filter(tenant=request.user.tenant)
#     add_fieldsets = [
#             (None, {'fields': ('username', 'password1','password2')}),
#             ('Información Personal', {'fields': ('first_name', 'last_name', 'email')}),
#             ('Permisos', {'fields': ('is_active', 'groups')}),
#         ]
#     def save_model(self, request, obj, form, change):
#         if not obj.pk:
#             obj.set_password(form.cleaned_data["password1"])
#             if not obj.tenant:
#                 obj.tenant = request.user.tenant
#         super().save_model(request, obj, form, change)

#     def get_fieldsets(self, request, obj=None):
#         if not obj:
#             return self.add_fieldsets
#         if request.user.is_superuser:
#             return [
#                 (None, {'fields': ('username', 'password','restablecer')}),
#                 ('Información Personal', {'fields': ('first_name', 'last_name', 'email', 'tenant')}),
#                 ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
#                 ('Fechas Importantes', {'fields': ('last_login', 'date_joined')}),
#             ]
#         return [
#             (None, {'fields': ('username', 'password')}),
#             ('Información Personal', {'fields': ('first_name', 'last_name', 'email')}),
#             ('Permisos', {'fields': ('is_active', 'groups')}),
#         ]

# class GrupoAdmin(admin.ModelAdmin):
#     form = GrupoForm

#     fieldsets = [
#          (None, {'fields': ('name', 'tenant', 'permisos_grupo')}),
#     ]
#     list_display = ('id', 'name')
#     search_fields = ('name',)

#     def get_form(self, request, obj=None, **kwargs):
#         form = super().get_form(request, obj, **kwargs)
#         form.base_fields['name'].label = 'Nombre'
#         form.base_fields['permisos_grupo'].label = 'Permisos'
#         return form

