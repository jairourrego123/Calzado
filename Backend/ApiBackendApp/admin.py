from django.contrib import admin
from DevolucionesApp.models import Devolucion, MotivoDevolucion, RelacionProductoDevolucion
from EntradasApp.models import Proveedor, Entrada, RelacionProductoEntrada, PagoEntrada
from FinanzasApp.models import MetodoDePago, Transferencia, Movimientos, Cierre
from GastosApp.models import Gasto,TipoGasto
from GestionDeUsuariosApp.models import Usuario, Tenant
from InventarioApp.models import Producto
from VentasApp.models import Cliente, Venta, PagoVenta, RelacionProductoVenta

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
    list_display = ('orden', 'valor', 'tipo_gasto', 'descripcion', 'user', 'metodo_de_pago', 'fecha','state')
    search_fields = ('tipo_gasto', 'user__username', 'metodo_de_pago__metodo_de_pago')
class TipoGastoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre','state')
    search_fields = ('nombre',)

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'first_name', 'last_name', 'is_active')
    search_fields = ('username', 'email')
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
admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Venta, VentaAdmin)
admin.site.register(PagoVenta, PagoVentaAdmin)
admin.site.register(RelacionProductoVenta, RelacionProductoVentaAdmin)
