# Generated by Django 5.0.6 on 2024-06-29 02:50

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('FinanzasApp', '0006_alter_metododepago_options_and_more'),
        ('GestionDeUsuariosApp', '0002_tenant_alter_usuario_options_alter_usuario_groups_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Gasto',
            fields=[
                ('state', models.BooleanField(default=True)),
                ('fecha', models.DateField(auto_now_add=True, null=True)),
                ('update', models.DateTimeField(auto_now=True, null=True)),
                ('orden', models.CharField(blank=True, max_length=50, primary_key=True, serialize=False, unique=True)),
                ('valor', models.DecimalField(decimal_places=2, max_digits=10)),
                ('tipo_gasto', models.CharField(max_length=50)),
                ('descripcion', models.TextField()),
                ('metodo_de_pago', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='FinanzasApp.metododepago')),
                ('tenant', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='GestionDeUsuariosApp.tenant')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Gasto',
                'verbose_name_plural': 'Gastos',
            },
        ),
    ]
