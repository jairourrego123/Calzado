# Generated by Django 4.2.14 on 2024-09-02 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FinanzasApp', '0007_alter_cierre_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='movimientos',
            name='descripcion',
            field=models.TextField(blank=True, null=True),
        ),
    ]
