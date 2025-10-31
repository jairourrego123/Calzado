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
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('stock-genius/admin/', admin.site.urls),
    # path('api-auth/', include('rest_framework.urls')),
        # path('api/auth/', include('authentication.urls')),
    path('stock-genius/api/auth/', include('AuthenticationApp.urls')),
    path('stock-genius/api/data/', include('ApiBackendApp.urls')),
    path('stock-genius/api/devoluciones/', include('DevolucionesApp.routers')),
    path('stock-genius/api/entradas/', include('EntradasApp.routers')),
    path('stock-genius/api/finanzas/', include('FinanzasApp.routers')),
    path('stock-genius/api/gastos/', include('GastosApp.routers')),
    path('stock-genius/api/gestion_usuarios/', include('GestionDeUsuariosApp.routers')),
    path('stock-genius/api/inventario/', include('InventarioApp.routers')),
    path('stock-genius/api/ventas/', include('VentasApp.routers')),
    path('stock-genius/api/usuarios/', include('GestionDeUsuariosApp.urls')),
]+static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)