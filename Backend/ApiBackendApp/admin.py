from django.contrib import admin

from DevolucionesApp.models import Devolucion, MotivoDevolucion, RelacionProductoDevolucion
from EntradasApp.models import Proveedor, Entrada, RelacionProductoEntrada, PagoEntrada
from FinanzasApp.models import MetodoDePago, Transferencia, Movimientos, Cierre
from GastosApp.models import Gasto,TipoGasto
from GestionDeUsuariosApp.models import  Tenant, Usuarios, PermisosGrupo, Grupos
# from django.contrib.auth.admin import  GroupAdmin

from InventarioApp.models import Producto
from VentasApp.models import Cliente, Venta, PagoVenta, RelacionProductoVenta
# from GestionDeUsuariosApp.admin import UsuarioAdmin, GrupoAdmin
from GestionDeUsuariosApp.admin import UsuariosAdmin,GrupoAdmin
from GestionDeUsuariosApp.utils.mixins import TenantAdminMixin

    
class DevolucionAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'valor_total', 'tipo', 'referencia', 'fecha','tenant','state')
    search_fields = ('tipo', 'referencia')

class MotivoDevolucionAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'nombre', 'fecha','tenant','state')
    search_fields = ('nombre',)

class RelacionProductoDevolucionAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = (  'producto','cantidad', 'valor_venta_producto', 'descripcion', 'motivo', 'devolucion', 'fecha','tenant','state')
    search_fields = ('descripcion',)

class ProveedorAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'nombre', 'lugar', 'numero_contacto', 'estado', 'fecha','tenant','state')
    search_fields = ('nombre', 'numero_contacto')

class EntradaAdmin(TenantAdminMixin,admin.ModelAdmin):
    
    readonly_fields = ["orden"]
    list_display = ('orden', 'estado', 'valor', 'usuario', 'proveedor', 'fecha','tenant','state')
    search_fields = ('orden', 'usuario__first_name', 'proveedor__nombre')

class RelacionProductoEntradaAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'entrada', 'producto', 'cantidad', 'valor', 'fecha','tenant','state')
    search_fields = ('entrada__orden', 'producto__referencia')

class PagoEntradaAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'valor', 'metodo_de_pago', 'entrada', 'fecha','tenant','state')
    search_fields = ('entrada__orden', 'metodo_de_pago__metodo_de_pago')

class MetodoDePagoAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'nombre', 'saldo_actual', 'comision_banco', 'fecha','tenant','state')
    search_fields = ('metodo_de_pago',)

class TransferenciaAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'cuenta_origen', 'cuenta_destino', 'valor', 'descripcion', 'fecha','tenant','state')
    search_fields = ('cuenta_origen__metodo_de_pago', 'cuenta_destino__metodo_de_pago')

class MovimientosAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'referencia', 'tipo', 'valor', 'usuario', 'fecha','tenant','state')
    search_fields = ('referencia', 'tipo', 'usuario__first_name')

class CierreAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'valor', 'ganancia', 'fecha','tenant','state')
    search_fields = ()

class GastoAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ('orden', 'valor', 'tipo_gasto', 'descripcion', 'usuario', 'metodo_de_pago', 'fecha','tenant','state')
    search_fields = ('tipo_gasto', 'usuario__first_name', 'metodo_de_pago__metodo_de_pago')
class TipoGastoAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'nombre','tenant','state')
    search_fields = ('nombre',)



class TenanatAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'nombre', 'direccion', 'telefono', 'email', 'fecha','update','state')
    search_fields = ('nombre',)

class ProductoAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'referencia', 'estilo', 'talla', 'color', 'cantidad', 'stock_min', 'estado', 'valor', 'valor_compra', 'fecha','tenant','state')
    search_fields = ('referencia', 'estilo', 'color')

class ClienteAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'nombre', 'lugar', 'numero_contacto', 'estado', 'fecha','tenant','state')
    search_fields = ('nombre', 'numero_contacto')

class VentaAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ('orden', 'valor_total', 'valor_total_ajustado', 'ganancia_total', 'ganancia_total_ajustada', 'cantidad_total', 'estado', 'cliente', 'usuario', 'fecha','tenant','state')
    search_fields = ('orden', 'cliente__nombre', 'usuario__first_name')

class PagoVentaAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'valor', 'metodo_de_pago', 'venta', 'fecha','tenant','state')
    search_fields = ('venta__orden', 'metodo_de_pago__metodo_de_pago')

class RelacionProductoVentaAdmin(TenantAdminMixin,admin.ModelAdmin):
    list_display = ( 'cantidad', 'valor_venta_producto', 'valor_compra', 'ganancia', 'cantidad_devuelta', 'producto', 'venta', 'fecha','tenant','state')
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
admin.site.register(Usuarios,UsuariosAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Venta, VentaAdmin)
admin.site.register(PagoVenta, PagoVentaAdmin)
admin.site.register(RelacionProductoVenta, RelacionProductoVentaAdmin)
