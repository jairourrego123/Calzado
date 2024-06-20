from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet, basename='clientes')
router.register(r'ventas', VentaViewSet, basename='ventas')
router.register(r'crear', RegistrarPagosViewSet, basename='crear-pagos')
router.register(r'pagos_venta', PagoVentaViewSet, basename='pagos-venta')
router.register(r'productos_venta', RelacionProductoVentaViewSet, basename='relaciones-producto-venta')

urlpatterns = router.urls
