from rest_framework.routers import DefaultRouter
from .views import GastoViewSet,TipoGastoViewSet

router = DefaultRouter()
router.register(r'gastos', GastoViewSet, basename='gastos')
router.register(r'tipos_de_gasto', TipoGastoViewSet, basename='tipos-de-gastos')

urlpatterns = router.urls
