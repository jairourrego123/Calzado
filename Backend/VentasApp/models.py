from django.db import models
from ApiBackendApp.models import GeneralModelId, GeneralModel
from GestionDeUsuariosApp.models import Usuarios

class Cliente(GeneralModelId):
    nombre = models.CharField(max_length=255)
    lugar = models.CharField(max_length=255)
    numero_contacto = models.CharField(max_length=20)
    estado = models.BooleanField(default=True)  # True no debe nada
    cliente_predeterminado =models.BooleanField(default=False)

    def __str__(self):
        return self.nombre

    class Meta:
        ordering=['nombre']
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
        
class Venta(GeneralModelId):
    orden = models.CharField(max_length=50,blank=True)
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    valor_total_ajustado = models.DecimalField(max_digits=10, decimal_places=2)
    ganancia_total = models.DecimalField(max_digits=10, decimal_places=2)
    ganancia_total_ajustada = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_total = models.IntegerField()
    estado = models.BooleanField(default=False)  # True si esta completado
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL,null=True)
    usuario = models.ForeignKey(Usuarios, on_delete=models.SET_NULL,null=True)

    def save(self, *args, **kwargs):
        if not self.orden:
            last_gasto = Venta.objects.filter(tenant=self.tenant, state=True).order_by('id').last()
            if not last_gasto:
                new_orden = 'V00001'
            else:
                last_orden = last_gasto.orden
                orden_number = int(last_orden[1:]) + 1
                new_orden = 'V' + str(orden_number).zfill(5)
            self.orden = new_orden
           
        super(Venta, self).save(*args, **kwargs)

    def __str__(self):
        return f"Venta {self.orden}"

    class Meta:
        ordering = ['-id']
        verbose_name = "Venta"
        verbose_name_plural = "Ventas"
        
class PagoVenta(GeneralModelId):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    metodo_de_pago = models.ForeignKey('FinanzasApp.MetodoDePago', on_delete=models.CASCADE)
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)

    def __str__(self):
        return f"Pago Venta {self.venta}"

    class Meta:
        ordering=['id']
        verbose_name = "Pago Venta"
        verbose_name_plural = "Pagos Ventas"
        
class RelacionProductoVenta(GeneralModel):
    cantidad = models.IntegerField()
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    valor_ultima_compra = models.DecimalField(max_digits=10, decimal_places=2)
    ganancia = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_devuelta = models.IntegerField(default=0,blank=True,null=True)
    producto = models.ForeignKey('InventarioApp.Producto', on_delete=models.CASCADE)
    venta = models.ForeignKey('VentasApp.Venta', on_delete=models.CASCADE)
    def __str__(self):
        return f"Relación Producto Venta {self.venta}"

    class Meta:
        ordering=['id']
        verbose_name = "Relación Producto Venta"
        verbose_name_plural = "Relaciones Productos Ventas"