from rest_framework.routers import DefaultRouter
from .views import ProveedorViewSet, EntradaViewSet, RelacionProductoEntradaViewSet, PagoEntradaViewSet

router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet, basename='proveedores')
router.register(r'entradas', EntradaViewSet, basename='entradas')
router.register(r'relaciones-producto-entrada', RelacionProductoEntradaViewSet, basename='relaciones-producto-entrada')
router.register(r'pagos-entrada', PagoEntradaViewSet, basename='pagos-entrada')

urlpatterns = router.urls
