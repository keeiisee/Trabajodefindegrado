from django.urls import path, include
from rest_framework import routers
from .views import PublicacionListForUser, ProfileList, UserDetail, UserListLeter, ProfileDetailForRequestUser, ProfileDetailForUser, PublicacionList

router = routers.DefaultRouter()
router.register(r'profiles/profiles', ProfileList)
router.register(r'publicacion/create', PublicacionList)
urlpatterns = [
    #url que saca el perfil de todos los usuarios o del id del perfil que le pases
    #path('profiles/', include(router.urls)),
    
    #url que saca el perfil del usuario que hace la peticion
    path('profile/', ProfileDetailForRequestUser.as_view({'get': 'list'}), name='profile'),
    #url que saca el perfil del id del perfil que le pasas
    path('profile/<int:pk>/', ProfileDetailForUser.as_view({'get': 'list'}), name='profile-user'),
    path('usuarios/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    #url que saca los usuarios por letra que contenga el nombre
    path('users/<str:pk>/', UserListLeter.as_view({'get': 'list'}), name='user-list-letter'),
    
    #para publicacion
    path('', include(router.urls)),

    #para ver las publicaciones de profile con la id que le pasemos
    path('publicaciones/<int:pk>/', PublicacionListForUser.as_view({'get': 'list'}), name='publicacion-detail'),
]