from django.urls import path
from .views import RegisterView, MyTokenObtainPairView,cookie_token_refresh,logout

urlpatterns = [
    path('registrar/', RegisterView.as_view(), name='register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', cookie_token_refresh, name='token_refresh'),
    path('logout/', logout, name='logout'),

]


