from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet, basename='proveedores')
router.register(r'proveedores_paginados', ProveedorPaginadoViewSet, basename='proveedores_paginados')
router.register(r'entradas', EntradaViewSet, basename='entradas')
router.register(r'productos_ingresados', RelacionProductoEntradaViewSet, basename='relaciones-producto-entrada')
router.register(r'pagos_entrada', PagoEntradaViewSet, basename='pagos_entrada')
router.register(r'crear', RegistrarPagosEntradaViewSet, basename='crear-pagos-entrada')

urlpatterns = router.urls
