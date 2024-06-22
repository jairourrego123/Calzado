from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'devoluciones', DevolucionViewSet, basename='devoluciones')
router.register(r'motivos', MotivoDevolucionViewSet, basename='motivos')
router.register(r'productos_devueltos', RelacionProductoDevolucionViewSet, basename='relaciones')
router.register(r'crear', RegistrarDevolucionViewSet, basename='crear')

urlpatterns = router.urls
