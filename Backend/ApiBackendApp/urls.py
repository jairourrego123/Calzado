from django.urls import path
from .views import DatosHome, DetailSpend

urlpatterns = [
    path('home/', DatosHome.as_view(), name='datos_home'),
    path('detail_venta/<str:id>', DetailSpend.as_view(), name='detalle_venta'),
]