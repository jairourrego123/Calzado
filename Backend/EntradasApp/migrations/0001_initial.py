# Generated by Django 5.0.6 on 2024-07-10 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Entrada',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.BooleanField(default=True)),
                ('fecha', models.DateField(auto_now_add=True, null=True)),
                ('update', models.DateTimeField(auto_now=True, null=True)),
                ('orden', models.CharField(blank=True, max_length=50)),
                ('estado', models.BooleanField(default=True)),
                ('valor', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={
                'verbose_name': 'Entrada',
                'verbose_name_plural': 'Entradas',
            },
        ),
        migrations.CreateModel(
            name='PagoEntrada',
            fields=[
                ('state', models.BooleanField(default=True)),
                ('fecha', models.DateField(auto_now_add=True, null=True)),
                ('update', models.DateTimeField(auto_now=True, null=True)),
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('valor', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={
                'verbose_name': 'Pago Entrada',
                'verbose_name_plural': 'Pagos Entrada',
            },
        ),
        migrations.CreateModel(
            name='Proveedor',
            fields=[
                ('state', models.BooleanField(default=True)),
                ('fecha', models.DateField(auto_now_add=True, null=True)),
                ('update', models.DateTimeField(auto_now=True, null=True)),
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('nombre', models.CharField(max_length=150)),
                ('lugar', models.CharField(max_length=150)),
                ('numero_contacto', models.CharField(max_length=30)),
                ('estado', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'Proveedor',
                'verbose_name_plural': 'Proveedores',
            },
        ),
        migrations.CreateModel(
            name='RelacionProductoEntrada',
            fields=[
                ('state', models.BooleanField(default=True)),
                ('fecha', models.DateField(auto_now_add=True, null=True)),
                ('update', models.DateTimeField(auto_now=True, null=True)),
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('cantidad', models.IntegerField()),
                ('valor', models.DecimalField(decimal_places=2, max_digits=10)),
                ('cantidad_devuelta', models.IntegerField(null=True)),
            ],
            options={
                'verbose_name': 'Relación Producto Entrada',
                'verbose_name_plural': 'Relaciones Producto Entrada',
            },
        ),
    ]
