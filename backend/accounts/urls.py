from django.urls import path, include
from rest_framework import routers
from .views import ProfileList, ProfileDetail, UserDetail, UserListLeter, ProfileDetailForUser

router = routers.DefaultRouter()
router.register(r'profiles', ProfileList)

urlpatterns = [
    path('profiles/', include(router.urls)),
    #url que saca el perfil del id del perfil que le pases
    path('profiles/<int:pk>/', ProfileDetail.as_view(), name='profile-detail'),
    #url que saca el perfil del usuario que hace la peticion
    path('profile/', ProfileDetailForUser.as_view({'get': 'list'}), name='profile'),
    path('usuarios/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    
    path('users/<str:pk>/', UserListLeter.as_view({'get': 'list'}), name='user-list-letter'),
    #url que saca los usuarios por letra que contenga el nombre
]