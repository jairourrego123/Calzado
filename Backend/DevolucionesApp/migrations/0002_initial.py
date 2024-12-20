# Generated by Django 5.0.6 on 2024-07-10 15:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('DevolucionesApp', '0001_initial'),
        ('GestionDeUsuariosApp', '0001_initial'),
        ('InventarioApp', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='devolucion',
            name='tenant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='GestionDeUsuariosApp.tenant'),
        ),
        migrations.AddField(
            model_name='devolucion',
            name='usuario',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='motivodevolucion',
            name='tenant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='GestionDeUsuariosApp.tenant'),
        ),
        migrations.AddField(
            model_name='relacionproductodevolucion',
            name='devolucion',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='DevolucionesApp.devolucion'),
        ),
        migrations.AddField(
            model_name='relacionproductodevolucion',
            name='motivo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='DevolucionesApp.motivodevolucion'),
        ),
        migrations.AddField(
            model_name='relacionproductodevolucion',
            name='producto',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='InventarioApp.producto'),
        ),
        migrations.AddField(
            model_name='relacionproductodevolucion',
            name='tenant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='GestionDeUsuariosApp.tenant'),
        ),
    ]
