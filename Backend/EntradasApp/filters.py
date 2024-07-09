import django_filters
from .models import *

class EntradaFilter(django_filters.FilterSet):
    fecha_inicio = django_filters.DateFilter(field_name='fecha', lookup_expr='gte')
    fecha_fin = django_filters.DateFilter(field_name='fecha', lookup_expr='lte',)

    class Meta:
        model = Entrada
        fields = ['estado', 'proveedor','usuario', 'fecha_inicio', 'fecha_fin','fecha']