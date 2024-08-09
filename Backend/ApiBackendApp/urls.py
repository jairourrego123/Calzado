from django.urls import path
from .views import DatosHome, DataGanancias,ReporteDiarioViewSet,ResumenFinancieroViewSet

urlpatterns = [
    path('home/', DatosHome.as_view(), name='datos_home'),
    path('ganancias', DataGanancias.as_view(), name='ganancias'),
    path('analisis-dia', ReporteDiarioViewSet.as_view(), name='analisis-dia'),
    path('resumen-financiero/', ResumenFinancieroViewSet.as_view(), name='resumen-financiero'),
]