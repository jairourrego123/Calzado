# Generated by Django 5.0.6 on 2024-07-10 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionDeUsuariosApp', '0003_alter_grupos_options_alter_usuarios_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuarios',
            name='group',
        ),
        migrations.AddField(
            model_name='usuarios',
            name='group',
            field=models.ManyToManyField(blank=True, null=True, to='GestionDeUsuariosApp.grupos'),
        ),
    ]