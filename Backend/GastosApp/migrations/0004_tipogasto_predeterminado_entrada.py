# Generated by Django 5.0.6 on 2024-07-26 03:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GastosApp', '0003_alter_gasto_tenant_alter_tipogasto_tenant'),
    ]

    operations = [
        migrations.AddField(
            model_name='tipogasto',
            name='predeterminado_entrada',
            field=models.BooleanField(default=False),
        ),
    ]
