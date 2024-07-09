import django_filters
from .models import *

class DevolucionFilter(django_filters.FilterSet):
    fecha_inicio = django_filters.DateFilter(field_name='fecha', lookup_expr='gte')
    fecha_fin = django_filters.DateFilter(field_name='fecha', lookup_expr='lte',)

    class Meta:
        model = Devolucion
        fields = ['tipo', 'referencia', 'fecha_inicio', 'fecha_fin','fecha']