# Generated by Django 5.0.6 on 2024-07-01 21:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('FinanzasApp', '0006_alter_metododepago_options_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='movimientos',
            old_name='usuario',
            new_name='user',
        ),
    ]
