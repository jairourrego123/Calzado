import django_filters
from .models import Gasto

class GastosFilter(django_filters.FilterSet):
    start_date = django_filters.DateFilter(field_name='fecha', lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name='fecha', lookup_expr='lte',)

    class Meta:
        model = Gasto
        fields = ['start_date', 'end_date']