from rest_framework.routers import DefaultRouter
from .views import TenantViewSet, UsuarioViewSet

router = DefaultRouter()
router.register(r'tenants', TenantViewSet, basename='tenants')
router.register(r'usuarios', UsuarioViewSet, basename='usuarios')

urlpatterns = router.urls
