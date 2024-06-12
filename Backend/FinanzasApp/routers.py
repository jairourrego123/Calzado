from rest_framework.routers import DefaultRouter
from .views import MetodoDePagoViewSet, TransferenciaViewSet, MovimientosViewSet, CierreViewSet

router = DefaultRouter()
router.register(r'metodos-de-pago', MetodoDePagoViewSet, basename='metodos-de-pago')
router.register(r'transferencias', TransferenciaViewSet, basename='transferencias')
router.register(r'movimientos', MovimientosViewSet, basename='movimientos')
router.register(r'cierres', CierreViewSet, basename='cierres')

urlpatterns = router.urls
