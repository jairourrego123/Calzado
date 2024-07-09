# Generated by Django 5.0.6 on 2024-07-09 16:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('EntradasApp', '0002_initial'),
        ('GestionDeUsuariosApp', '__first__'),
        ('InventarioApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='relacionproductoentrada',
            name='producto',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='InventarioApp.producto'),
        ),
        migrations.AddField(
            model_name='relacionproductoentrada',
            name='tenant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='GestionDeUsuariosApp.tenant'),
        ),
    ]
