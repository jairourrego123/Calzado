"""
URL configuration for ApiBackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api-auth/', include('rest_framework.urls')),
        # path('api/auth/', include('authentication.urls')),
    path('api/auth/', include('AuthenticationApp.urls')),
    path('api/data/', include('ApiBackendApp.urls')),
    path('api/devoluciones/', include('DevolucionesApp.routers')),
    path('api/entradas/', include('EntradasApp.routers')),
    path('api/finanzas/', include('FinanzasApp.routers')),
    path('api/gastos/', include('GastosApp.routers')),
    path('api/gestion_usuarios/', include('GestionDeUsuariosApp.routers')),
    path('api/inventario/', include('InventarioApp.routers')),
    path('api/ventas/', include('VentasApp.routers')),
]