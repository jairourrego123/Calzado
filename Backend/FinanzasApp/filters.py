import django_filters
from .models import *

class MovimientosFilter(django_filters.FilterSet):
    fecha_inicio = django_filters.DateFilter(field_name='fecha', lookup_expr='gte')
    fecha_fin = django_filters.DateFilter(field_name='fecha', lookup_expr='lte',)

    class Meta:
        model = Movimientos
        fields = ['tipo', 'usuario', 'fecha_inicio', 'fecha_fin','fecha']

class CierreFilter(django_filters.FilterSet):
    fecha_inicio = django_filters.DateFilter(field_name='fecha', lookup_expr='gte')
    fecha_fin = django_filters.DateFilter(field_name='fecha', lookup_expr='lte',)

    class Meta:
        model = Cierre
        fields = [ 'fecha_inicio', 'fecha_fin','fecha']

class TransferenciaFilter(django_filters.FilterSet):
    fecha_inicio = django_filters.DateFilter(field_name='fecha', lookup_expr='gte')
    fecha_fin = django_filters.DateFilter(field_name='fecha', lookup_expr='lte',)

    class Meta:
        model = Transferencia
        fields = ['cuenta_origen', 'cuenta_destino', 'fecha_inicio', 'fecha_fin','fecha']
