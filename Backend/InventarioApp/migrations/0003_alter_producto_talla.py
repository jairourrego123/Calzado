# Generated by Django 5.0.6 on 2024-07-30 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('InventarioApp', '0002_alter_producto_tenant'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='talla',
            field=models.CharField(max_length=50),
        ),
    ]
