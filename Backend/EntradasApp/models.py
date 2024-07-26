from django.db import models
from ApiBackendApp.models import GeneralModel, GeneralModelId
from InventarioApp.models import Producto  # Importa el modelo Producto desde InventarioApp
from GestionDeUsuariosApp.models import Usuarios

class Proveedor(GeneralModelId):
    nombre = models.CharField(max_length=150)
    lugar = models.CharField(max_length=150)
    numero_contacto = models.CharField(max_length=30)
    estado = models.BooleanField(default=True)  # True si esta todo correcto

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Proveedor"
        verbose_name_plural = "Proveedores"


class Entrada(GeneralModelId):
    orden = models.CharField(max_length=50,blank=True)
    estado = models.BooleanField(default=False)  # True si esta completado
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_total = models.IntegerField(null=True)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.SET_NULL,null=True)
    usuario = models.ForeignKey(Usuarios, on_delete=models.SET_NULL,null=True)

    def save(self, *args, **kwargs):
        if not self.orden:
            last_gasto = Entrada.objects.filter(tenant=self.tenant, state=True).order_by('id').last()
            if not last_gasto:
                new_orden = 'E00001'
            else:
                last_orden = last_gasto.orden
                orden_number = int(last_orden[1:]) + 1
                new_orden = 'E' + str(orden_number).zfill(5)
            self.orden = new_orden
           
        super(Entrada, self).save(*args, **kwargs)
    def __str__(self):
        return f"Entrada {self.orden}"

    class Meta:
        verbose_name = "Entrada"
        verbose_name_plural = "Entradas"


class RelacionProductoEntrada(GeneralModelId):
    entrada = models.ForeignKey(Entrada, on_delete=models.SET_NULL,null=True)
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL,null=True)
    cantidad = models.IntegerField()
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    valor_ultima_compra = models.DecimalField(max_digits=10, decimal_places=2,null=True)
    cantidad_devuelta = models.IntegerField(null=True)
    def __str__(self):
        return f"Relación {self.id} - Entrada {self.entrada.orden}"

    class Meta:
        verbose_name = "Relación Producto Entrada"
        verbose_name_plural = "Relaciones Producto Entrada"


class PagoEntrada(GeneralModelId):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    metodo_de_pago = models.ForeignKey('FinanzasApp.MetodoDePago', on_delete=models.SET_NULL,null=True)
    entrada = models.ForeignKey(Entrada, on_delete=models.SET_NULL,null=True)

    def __str__(self):
        return f"Pago {self.id} - Entrada {self.entrada.orden}"

    class Meta:
        verbose_name = "Pago Entrada"
        verbose_name_plural = "Pagos Entrada"
