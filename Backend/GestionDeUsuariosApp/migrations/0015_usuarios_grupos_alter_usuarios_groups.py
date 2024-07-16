# Generated by Django 5.0.6 on 2024-07-16 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionDeUsuariosApp', '0014_alter_usuarios_groups'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='grupos',
            field=models.ManyToManyField(related_name='grupos_usuario', to='GestionDeUsuariosApp.permisosgrupo'),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups'),
        ),
    ]