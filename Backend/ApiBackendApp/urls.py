from django.urls import path
from .views import DatosHome, DataGanancias

urlpatterns = [
    path('home/', DatosHome.as_view(), name='datos_home'),
    path('ganancias', DataGanancias.as_view(), name='ganancias'),
]