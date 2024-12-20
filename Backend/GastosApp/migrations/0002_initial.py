# Generated by Django 5.0.6 on 2024-07-10 15:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('GastosApp', '0001_initial'),
        ('GestionDeUsuariosApp', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='gasto',
            name='tenant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='GestionDeUsuariosApp.tenant'),
        ),
        migrations.AddField(
            model_name='gasto',
            name='usuario',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='tipogasto',
            name='tenant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='GestionDeUsuariosApp.tenant'),
        ),
        migrations.AddField(
            model_name='gasto',
            name='tipo_gasto',
            field=models.ForeignKey(max_length=50, null=True, on_delete=django.db.models.deletion.SET_NULL, to='GastosApp.tipogasto'),
        ),
    ]
