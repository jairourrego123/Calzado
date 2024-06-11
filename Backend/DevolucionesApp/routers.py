from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()

router.register(r'devoluciones', DevolucionViewSet, basename='devoluciones')
router.register(r'motivos', MotivoDevolucionViewSet, basename='motivos')
router.register(r'relaciones', RelacionProductoDevolucionViewSet, basename='relaciones')

urlpatterns = router.urls