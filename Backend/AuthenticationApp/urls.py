from django.urls import path
from .views import RegisterView, MyTokenObtainPairView,cookie_token_refresh

urlpatterns = [
    path('registrar/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', cookie_token_refresh, name='token_refresh'),
]


