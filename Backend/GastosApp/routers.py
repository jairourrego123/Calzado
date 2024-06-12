from rest_framework.routers import DefaultRouter
from .views import GastoViewSet

router = DefaultRouter()
router.register(r'gastos', GastoViewSet, basename='gastos')

urlpatterns = router.urls
