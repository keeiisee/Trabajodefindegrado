from django.urls import path, include
from rest_framework import routers
from .views import ProfileList, ProfileDetail

router = routers.DefaultRouter()
router.register(r'profiles', ProfileList)

urlpatterns = [
    path('profiles/', include(router.urls)),
    path('profiles/<int:pk>/', ProfileDetail.as_view(), name='profile-detail'),
]