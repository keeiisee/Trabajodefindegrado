from django.urls import path, include, re_path
from . import views
from rest_framework import routers
from .views import CrearParqueCalisteniaView, DislikeParque, LikeParqueView, PublicacionesDeOtroFav, UpdatePostDescriptionView, EliminarPublicacionView, DeleteUserView, PublicacionesFavoritas, UltimasPublicacionesNoAmigosView,LikePublicacionView, UpdateProfileImageView, CrearProfileView, CrearPublicacionView, RemoveFriendView, ReservasPorParque,UltimaPublicacionView, SendFriendRequestView, RejectFriendRequestView, AddFriendView, ReservaCalisteniaList, ParqueCalisteniaList, PublicacionListForUser, ProfileList, UserDetail, UserListLeter, ProfileDetailForRequestUser, ProfileDetailForUser, PublicacionList

router = routers.DefaultRouter()
router.register(r'profiles/profiles', ProfileList)
router.register(r'publicacion/create', PublicacionList)
router.register(r'parqueCalis/view', ParqueCalisteniaList)
router.register(r'reserva/view', ReservaCalisteniaList)

urlpatterns = [
    re_path(r'^$', views.index, name='index'),
    #url que saca el perfil de todos los usuarios o del id del perfil que le pases
    #path('profiles/', include(router.urls)),
    path('delete/user/', DeleteUserView.as_view(), name='delete_user'),
    #url que saca el perfil del usuario que hace la peticion
    path('profile/', ProfileDetailForRequestUser.as_view({'get': 'list'}), name='profile'),
    #url que saca el perfil del id del perfil que le pasas
    path('profile/<int:pk>/', ProfileDetailForUser.as_view({'get': 'list'}), name='profile-user'),
    path('usuarios/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    #url que saca los usuarios por letra que contenga el nombre
    path('users/<str:pk>/', UserListLeter.as_view({'get': 'list'}), name='user-list-letter'),

    path('crear/perfil/', CrearProfileView.as_view(), name='crear-perfil'),
    path('modificar/perfil/', UpdateProfileImageView.as_view(), name='modificar-perfil'),
    #para publicacion
    path('', include(router.urls)),

    #para ver las publicaciones de profile con la id que le pasemos
    path('publicaciones/<int:pk>/', PublicacionListForUser.as_view({'get': 'list'}), name='publicacion-detail'),
    path('crear/publicacion/', CrearPublicacionView.as_view(), name='create_publi'),
    path('like/publicacion/', LikePublicacionView.as_view(), name='like_publi'),
    path('publicaciones/favoritas/', PublicacionesFavoritas.as_view(), name='publicaciones_favoritas'),
    path('publicacionesDeOtro/favoritas/', PublicacionesDeOtroFav.as_view(), name='publicaciones_favoritas'),
    path('publicacion/delete/', EliminarPublicacionView.as_view(), name='eliminar_publicacion'),
    path('modificar/publicacion/', UpdatePostDescriptionView.as_view(), name='eliminar_update'),

    path('add_friend/', AddFriendView.as_view(), name='add_friend'),
    path('reject_friend/', RejectFriendRequestView.as_view(), name='reject_friend'),
    path('send_friend/', SendFriendRequestView.as_view(), name='send_friend'),
    path('ultima_publi/', UltimaPublicacionView.as_view(), name='last_post'),
    path('utlima_publiNoFriend/', UltimasPublicacionesNoAmigosView.as_view(), name='last_post_noFriend'),
    path('remove_friend/', RemoveFriendView.as_view(), name='remove_friend'),


    path('reservas/parque/<int:pk>/', ReservasPorParque.as_view(), name='reservas_por_parque'),
    path('parque/create/', CrearParqueCalisteniaView.as_view(), name='create_parque'),

    path('parques/like/', LikeParqueView.as_view(), name='like_parque'),
    path('parques/dislike/', DislikeParque.as_view(), name='dislike_parque'),
    
]
