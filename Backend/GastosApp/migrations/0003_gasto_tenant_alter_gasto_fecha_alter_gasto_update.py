# Generated by Django 5.0.6 on 2024-06-10 22:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GastosApp', '0002_remove_gasto_tenant_id'),
        ('GestionDeUsuariosApp', '0002_tenant_alter_usuario_options_alter_usuario_groups_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='gasto',
            name='tenant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='GestionDeUsuariosApp.tenant'),
        ),
        migrations.AlterField(
            model_name='gasto',
            name='fecha',
            field=models.DateField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='gasto',
            name='update',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
