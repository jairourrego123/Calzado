from rest_framework.routers import DefaultRouter
from .views import DevolucionViewSet, MotivoDevolucionViewSet, RelacionProductoDevolucionViewSet

router = DefaultRouter()
router.register(r'devoluciones', DevolucionViewSet, basename='devoluciones')
router.register(r'motivos', MotivoDevolucionViewSet, basename='motivos')
router.register(r'productos_devueltos', RelacionProductoDevolucionViewSet, basename='relaciones')

urlpatterns = router.urls
