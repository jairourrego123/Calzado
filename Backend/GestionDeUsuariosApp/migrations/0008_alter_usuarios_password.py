# Generated by Django 5.0.6 on 2024-07-11 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionDeUsuariosApp', '0007_alter_usuarios_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='password',
            field=models.CharField(max_length=128, verbose_name='password'),
        ),
    ]
