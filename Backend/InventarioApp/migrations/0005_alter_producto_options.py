# Generated by Django 5.0.6 on 2024-06-25 14:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('InventarioApp', '0004_alter_producto_referencia'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='producto',
            options={'ordering': ['estilo', 'color', 'talla'], 'verbose_name': 'Producto', 'verbose_name_plural': 'Productos'},
        ),
    ]
