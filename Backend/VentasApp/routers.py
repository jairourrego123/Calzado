from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet, VentaViewSet, PagoVentaViewSet, RelacionProductoVentaViewSet

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet, basename='clientes')
router.register(r'ventas', VentaViewSet, basename='ventas')
router.register(r'pagos_venta', PagoVentaViewSet, basename='pagos-venta')
router.register(r'productos_venta', RelacionProductoVentaViewSet, basename='relaciones-producto-venta')

urlpatterns = router.urls
