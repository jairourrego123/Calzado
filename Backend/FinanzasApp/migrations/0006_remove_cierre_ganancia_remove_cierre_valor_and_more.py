# Generated by Django 5.0.6 on 2024-08-08 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FinanzasApp', '0005_alter_movimientos_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cierre',
            name='ganancia',
        ),
        migrations.RemoveField(
            model_name='cierre',
            name='valor',
        ),
        migrations.AddField(
            model_name='cierre',
            name='estado',
            field=models.BooleanField(default=False),
        ),
    ]