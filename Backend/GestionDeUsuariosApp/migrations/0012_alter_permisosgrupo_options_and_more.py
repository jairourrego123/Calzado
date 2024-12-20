# Generated by Django 5.0.6 on 2024-07-15 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionDeUsuariosApp', '0011_remove_permisosgrupo_group_permisosgrupo_group'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='permisosgrupo',
            options={'verbose_name': 'Permiso', 'verbose_name_plural': 'Permisos'},
        ),
        migrations.RemoveField(
            model_name='permisosgrupo',
            name='group',
        ),
        migrations.AddField(
            model_name='grupos',
            name='grupo_permisos',
            field=models.ManyToManyField(related_name='permisos_grupo', to='GestionDeUsuariosApp.permisosgrupo'),
        ),
    ]
