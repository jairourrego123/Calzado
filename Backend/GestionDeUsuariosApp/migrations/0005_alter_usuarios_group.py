# Generated by Django 5.0.6 on 2024-07-10 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionDeUsuariosApp', '0004_remove_usuarios_group_usuarios_group'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='group',
            field=models.ManyToManyField(blank=True, to='GestionDeUsuariosApp.grupos'),
        ),
    ]
