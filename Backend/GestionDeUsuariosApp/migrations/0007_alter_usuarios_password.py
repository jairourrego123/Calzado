# Generated by Django 5.0.6 on 2024-07-11 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionDeUsuariosApp', '0006_remove_usuarios_group'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='password',
            field=models.CharField(max_length=128),
        ),
    ]
