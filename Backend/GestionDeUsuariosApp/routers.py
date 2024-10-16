from rest_framework.routers import DefaultRouter
from .views import TenantViewSet

router = DefaultRouter()
router.register(r'tenants', TenantViewSet, basename='tenants')
# router.register(r'usuarios', UsuarioViewSet, basename='usuarios')

urlpatterns = router.urls
