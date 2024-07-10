from django.contrib import admin
from django import forms

from DevolucionesApp.models import Devolucion, MotivoDevolucion, RelacionProductoDevolucion
from EntradasApp.models import Proveedor, Entrada, RelacionProductoEntrada, PagoEntrada
from FinanzasApp.models import MetodoDePago, Transferencia, Movimientos, Cierre
from GastosApp.models import Gasto,TipoGasto
from GestionDeUsuariosApp.models import  Tenant, Usuarios, PermisosGrupo, Grupos
from InventarioApp.models import Producto
from VentasApp.models import Cliente, Venta, PagoVenta, RelacionProductoVenta
from django.contrib.admin.widgets import FilteredSelectMultiple

class DevolucionAdmin(admin.ModelAdmin):
    list_display = ('id', 'valor_total', 'tipo', 'referencia', 'fecha','state')
    search_fields = ('tipo', 'referencia')

class MotivoDevolucionAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'fecha','state')
    search_fields = ('nombre',)

class RelacionProductoDevolucionAdmin(admin.ModelAdmin):
    list_display = ('id', 'cantidad', 'valor_venta_producto', 'descripcion', 'motivo', 'devolucion', 'producto', 'fecha','state')
    search_fields = ('descripcion',)

class ProveedorAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'lugar', 'numero_contacto', 'estado', 'fecha','state')
    search_fields = ('nombre', 'numero_contacto')

class EntradaAdmin(admin.ModelAdmin):
    
    readonly_fields = ["orden"]
    list_display = ('orden', 'estado', 'valor', 'usuario', 'proveedor', 'fecha','state')
    search_fields = ('orden', 'usuario__username', 'proveedor__nombre')

class RelacionProductoEntradaAdmin(admin.ModelAdmin):
    list_display = ('id', 'entrada', 'producto', 'cantidad', 'valor', 'fecha','state')
    search_fields = ('entrada__orden', 'producto__referencia')

class PagoEntradaAdmin(admin.ModelAdmin):
    list_display = ('id', 'valor', 'metodo_de_pago', 'entrada', 'fecha','state')
    search_fields = ('entrada__orden', 'metodo_de_pago__metodo_de_pago')

class MetodoDePagoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'saldo_actual', 'comision_banco', 'fecha','state')
    search_fields = ('metodo_de_pago',)

class TransferenciaAdmin(admin.ModelAdmin):
    list_display = ('id', 'cuenta_origen', 'cuenta_destino', 'valor', 'descripcion', 'fecha','state')
    search_fields = ('cuenta_origen__metodo_de_pago', 'cuenta_destino__metodo_de_pago')

class MovimientosAdmin(admin.ModelAdmin):
    list_display = ('id', 'referencia', 'tipo', 'valor', 'usuario', 'fecha','state')
    search_fields = ('referencia', 'tipo', 'usuario__username')

class CierreAdmin(admin.ModelAdmin):
    list_display = ('id', 'valor', 'ganancia', 'fecha','state')
    search_fields = ('id',)

class GastoAdmin(admin.ModelAdmin):
    list_display = ('orden', 'valor', 'tipo_gasto', 'descripcion', 'usuario', 'metodo_de_pago', 'fecha','state')
    search_fields = ('tipo_gasto', 'usuario__username', 'metodo_de_pago__metodo_de_pago')
class TipoGastoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre','state')
    search_fields = ('nombre',)

class UsuarioForm(forms.ModelForm):
    groups = forms.ModelMultipleChoiceField(
        queryset=Grupos.objects.none(),
        widget=forms.CheckboxSelectMultiple,
        label="Grupos"
    )

    def __init__(self, *args, **kwargs):
        tenant = kwargs.pop('tenant', None)
        print("tenant",tenant)
        super().__init__(*args, **kwargs)
        if tenant:
            self.fields['permisos_grupo'].queryset = Grupos.objects.filter(tenant=tenant)


class UsuarioAdmin(admin.ModelAdmin):
    form = UsuarioForm

    fieldsets = [
         ("Información de login", {'fields': ('username', 'password', 'groups','tenant')}),
         ("Información de usuario", {'fields': ('first_name', 'last_name', 'email')}),
     ]
    list_display = ('id', 'username', 'email', 'first_name')
    search_fields = ('username', 'email')

    # Sobrescribe las etiquetas de los campos en los fieldsets
    
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['first_name'].label = 'Nombres'
        form.base_fields['last_name'].label = 'Apellidos'
        form.base_fields['email'].label = 'Correo Elctronico'
        form.base_fields['username'].label = 'Usuario'
        form.base_fields['password'].label = 'Contraseña'
        form.base_fields['groups'].label = 'Grupos'
        form.base_fields['groups'].label = 'Grupos'
        return form
class GrupoForm(forms.ModelForm):
    permisos_grupo = forms.ModelMultipleChoiceField(queryset=PermisosGrupo.objects.all(), widget=forms.CheckboxSelectMultiple, label="Grupos")
    
    class Meta:
        model = Grupos
        fields = '__all__'

class GrupoAdmin(admin.ModelAdmin):
    form = GrupoForm
    
    fieldsets = [
         (None, {'fields': ('name', 'tenant', 'permisos_grupo')}),
     ]
    list_display = ('id', 'name')
    search_fields = ('name',)

    # Sobrescribe las etiquetas de los campos en los fieldsets
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['name'].label = 'Nombre'
        form.base_fields['permisos_grupo'].label = 'Permisos'

        return form

class TenanatAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'direccion', 'telefono', 'email', 'fecha','update','state')
    search_fields = ('nombre',)

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('id', 'referencia', 'estilo', 'talla', 'color', 'cantidad', 'stock_min', 'estado', 'valor', 'valor_compra', 'fecha','state')
    search_fields = ('referencia', 'estilo', 'color')

class ClienteAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'lugar', 'numero_contacto', 'estado', 'fecha','state')
    search_fields = ('nombre', 'numero_contacto')

class VentaAdmin(admin.ModelAdmin):
    list_display = ('orden', 'valor_total', 'valor_total_ajustado', 'ganancia_total', 'ganancia_total_ajustada', 'cantidad_total', 'estado', 'cliente', 'usuario', 'fecha','state')
    search_fields = ('orden', 'cliente__nombre', 'usuario__username')

class PagoVentaAdmin(admin.ModelAdmin):
    list_display = ('id', 'valor', 'metodo_de_pago', 'venta', 'fecha','state')
    search_fields = ('venta__orden', 'metodo_de_pago__metodo_de_pago')

class RelacionProductoVentaAdmin(admin.ModelAdmin):
    list_display = ('id', 'cantidad', 'valor_venta_producto', 'valor_compra', 'ganancia', 'cantidad_devuelta', 'producto', 'venta', 'fecha','state')
    search_fields = ('venta__orden', 'producto__referencia')

# Registering the models with their respective admin classes
admin.site.register(Devolucion, DevolucionAdmin)
admin.site.register(MotivoDevolucion, MotivoDevolucionAdmin)
admin.site.register(RelacionProductoDevolucion, RelacionProductoDevolucionAdmin)
admin.site.register(Proveedor, ProveedorAdmin)
admin.site.register(Entrada, EntradaAdmin)
admin.site.register(RelacionProductoEntrada, RelacionProductoEntradaAdmin)
admin.site.register(PagoEntrada, PagoEntradaAdmin)
admin.site.register(MetodoDePago, MetodoDePagoAdmin)
admin.site.register(TipoGasto, TipoGastoAdmin)
admin.site.register(Transferencia, TransferenciaAdmin)
admin.site.register(Movimientos, MovimientosAdmin)
admin.site.register(Cierre, CierreAdmin)
admin.site.register(Gasto, GastoAdmin)
admin.site.register(Tenant,TenanatAdmin )
admin.site.register(PermisosGrupo)
admin.site.register(Grupos,GrupoAdmin)
admin.site.register(Usuarios,UsuarioAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Venta, VentaAdmin)
admin.site.register(PagoVenta, PagoVentaAdmin)
admin.site.register(RelacionProductoVenta, RelacionProductoVentaAdmin)
