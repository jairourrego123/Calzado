# Generated by Django 5.0.6 on 2024-07-15 23:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionDeUsuariosApp', '0008_alter_usuarios_password'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='grupos',
            name='permisos_grupo',
        ),
        migrations.AddField(
            model_name='permisosgrupo',
            name='group',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='permisos_grupo', to='GestionDeUsuariosApp.grupos'),
            preserve_default=False,
        ),
    ]