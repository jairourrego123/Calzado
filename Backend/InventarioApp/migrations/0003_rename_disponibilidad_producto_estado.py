# Generated by Django 5.0.6 on 2024-06-24 19:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('InventarioApp', '0002_remove_producto_tenant_id_producto_tenant_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='producto',
            old_name='disponibilidad',
            new_name='estado',
        ),
    ]
