# Generated by Django 5.0.6 on 2024-06-18 02:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('DevolucionesApp', '0003_devolucion_tenant_motivodevolucion_tenant_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='devolucion',
            old_name='valor',
            new_name='valor_total',
        ),
        migrations.RenameField(
            model_name='relacionproductodevolucion',
            old_name='valor_venta',
            new_name='valor',
        ),
    ]
