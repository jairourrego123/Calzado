# Generated by Django 5.0.6 on 2024-07-15 23:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionDeUsuariosApp', '0010_alter_usuarios_groups'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='permisosgrupo',
            name='group',
        ),
        migrations.AddField(
            model_name='permisosgrupo',
            name='group',
            field=models.ManyToManyField(related_name='permisos_grupo', to='GestionDeUsuariosApp.grupos'),
        ),
    ]
