from django import forms
from .models import Usuarios, Grupos, PermisosGrupo
from django.contrib.auth.forms import ReadOnlyPasswordHashField

class UserCreationForm(forms.ModelForm):
    first_name = forms.CharField(label='Nombre', max_length=30, required=True)
    email = forms.EmailField(label='Correo', max_length=30, required=True)
    last_name = forms.CharField(label='Apellido', max_length=30, required=True)
    password1 = forms.CharField(label='Contraseña', min_length=8, widget=forms.PasswordInput)
    password2 = forms.CharField(label='Repetir Contraseña', widget=forms.PasswordInput)
    groups = forms.ModelMultipleChoiceField(queryset=Grupos.objects.all(), widget=forms.CheckboxSelectMultiple, label="Grupo de permisos")

    class Meta:
        model = Usuarios
        fields = ('username', 'email', 'tenant', 'first_name', 'last_name', 'groups','password')

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        
        if commit:
            user.save()
        return user

class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(label="Contraseña")
    restablecer = forms.CharField(label='Nueva Contraseña', widget=forms.PasswordInput, required=False)
    first_name = forms.CharField(label='Nombres', max_length=30, required=True)
    email = forms.EmailField(label='Correo', max_length=30, required=True)
    last_name = forms.CharField(label='Apellidos', max_length=30, required=True)
    groups = forms.ModelMultipleChoiceField(queryset=Grupos.objects.all(), widget=forms.CheckboxSelectMultiple, label="Grupo de permisos")

    class Meta:
        model = Usuarios
        fields = ('username', 'email', 'password', 'tenant', 'is_active', 'last_login', 'first_name', 'last_name', 'groups','restablecer')

    def clean_password(self):
        return self.initial["password"]

    def save(self, commit=True):
        user = super().save(commit=False)
        nueva_password = self.cleaned_data.get("restablecer")
        if nueva_password:
            user.set_password(nueva_password)
        if commit:
            user.save()
        return user

class GrupoForm(forms.ModelForm):
    permisos_grupo = forms.ModelMultipleChoiceField(queryset=PermisosGrupo.objects.all(), widget=forms.CheckboxSelectMultiple, label="Grupos")

    class Meta:
        model = Grupos
        fields = '__all__'
