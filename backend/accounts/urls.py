from django.urls import path, include
from rest_framework import routers
from .views import ProfileList, ProfileDetail, UserDetail, UserListLeter

router = routers.DefaultRouter()
router.register(r'profiles', ProfileList)

urlpatterns = [
    path('profiles/', include(router.urls)),
    path('profiles/<int:pk>/', ProfileDetail.as_view(), name='profile-detail'),
    path('usuarios/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('users/<str:pk>/', UserListLeter.as_view({'get': 'list'}), name='user-list-letter'),
]