# Generated by Django 5.0.6 on 2024-06-10 22:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('EntradasApp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='entrada',
            name='tenant_id',
        ),
        migrations.RemoveField(
            model_name='pagoentrada',
            name='tenant_id',
        ),
        migrations.RemoveField(
            model_name='proveedor',
            name='tenant_id',
        ),
        migrations.RemoveField(
            model_name='relacionproductoentrada',
            name='tenant_id',
        ),
    ]
