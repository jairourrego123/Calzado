import django_filters
from .models import Gasto

class GastosFilter(django_filters.FilterSet):
    fecha_inicio = django_filters.DateFilter(field_name='fecha', lookup_expr='gte')
    fecha_fin = django_filters.DateFilter(field_name='fecha', lookup_expr='lte',)

    class Meta:
        model = Gasto
        fields = ['tipo_gasto', 'usuario', 'metodo_de_pago', 'fecha_inicio', 'fecha_fin']