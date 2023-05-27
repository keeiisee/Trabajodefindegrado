from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from .models import Profile, UserAccount, Publicacion, ParqueCalistenia, Reserva
from .serializers import PublicacionSerializer, ReservaCreateSerializer, ProfileCreateSerializer, UserCreateSerializerView, PublicacionCreateSerializer, ParqueCalisteniaCreateSerializer
from rest_framework.views import APIView

class UltimaPublicacionView(generics.GenericAPIView):
    queryset = Publicacion.objects.all()
    serializer_class = PublicacionSerializer

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        if user_id is None:
            return Response({"error": "No se proporcionó un ID de usuario."}, status=400)

        try:
            user = UserAccount.objects.get(pk=user_id)
            profile = user.profile
            ultima_publicacion = Publicacion.objects.filter(autor=profile).latest('fecha_publicacion')
            serializer = self.get_serializer(ultima_publicacion)
            return Response(serializer.data)
        except UserAccount.DoesNotExist:
            return Response({"error": "No se encontró un usuario con ese ID."}, status=404)
        except Publicacion.DoesNotExist:
            return Response({"error": "El usuario no tiene publicaciones."}, status=404)

class AddFriendView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        if user_id is None:
            return Response({'error': 'ID de usuario no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            friend = UserAccount.objects.get(pk=user_id)
        except UserAccount.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        user_profile = request.user.profile
        friend_profile = friend.profile

        # Comprobar si la solicitud de amistad fue recibida
        if friend not in user_profile.solicitudRecibida.all():
            return Response({'error': 'Solicitud de amistad no recibida'}, status=status.HTTP_400_BAD_REQUEST)

        # Aceptar la solicitud de amistad: agregar al campo amigos y eliminar del campo solicitudRecibida
        user_profile.amigos.add(friend)
        user_profile.solicitudRecibida.remove(friend)

        # Agregar al usuario que realiza la solicitud como amigo del usuario que recibe la solicitud
        friend_profile.amigos.add(request.user)

        # Eliminar la solicitud enviada del perfil del usuario que realiza la solicitud
        friend_profile.solicitudEnviada.remove(request.user)

        user_profile.save()
        friend_profile.save()

        serializer = ProfileCreateSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SendFriendRequestView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        if user_id is None:
            return Response({'error': 'ID de usuario no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            recipient = UserAccount.objects.get(pk=user_id)
        except UserAccount.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        user_profile = request.user.profile
        recipient_profile = recipient.profile

        # Añadir al usuario con ese ID al campo solicitudEnviada del perfil del usuario que realiza la solicitud
        user_profile.solicitudEnviada.add(recipient)

        # Añadir al usuario que realiza la solicitud al campo solicitudRecibida del perfil del usuario que recibe la solicitud
        recipient_profile.solicitudRecibida.add(request.user)

        user_profile.save()
        recipient_profile.save()

        serializer = ProfileCreateSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class RejectFriendRequestView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        if user_id is None:
            return Response({'error': 'ID de usuario no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            requester = UserAccount.objects.get(pk=user_id)
        except UserAccount.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        user_profile = request.user.profile
        requester_profile = requester.profile

        # Comprobar si la solicitud de amistad fue recibida
        if requester not in user_profile.solicitudRecibida.all():
            return Response({'error': 'Solicitud de amistad no recibida'}, status=status.HTTP_400_BAD_REQUEST)

        # Eliminar al usuario con ese ID del campo solicitudRecibida del perfil del usuario que realiza la solicitud
        user_profile.solicitudRecibida.remove(requester)

        # Eliminar al usuario que realiza la solicitud del campo solicitudEnviada del perfil del usuario que recibió la solicitud
        requester_profile.solicitudEnviada.remove(request.user)

        user_profile.save()
        requester_profile.save()

        serializer = ProfileCreateSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ReservaCalisteniaList(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaCreateSerializer

class ParqueCalisteniaList(viewsets.ModelViewSet):
    queryset = ParqueCalistenia.objects.all()
    serializer_class = ParqueCalisteniaCreateSerializer

class PublicacionList(viewsets.ModelViewSet):
    queryset = Publicacion.objects.all()
    serializer_class = PublicacionCreateSerializer

class PublicacionListForUser(viewsets.ModelViewSet):
    queryset = Publicacion.objects.all()
    serializer_class = PublicacionCreateSerializer
    def get_queryset(self): 
        perfil = Profile.objects.get(id=self.kwargs['pk'])
        return self.queryset.filter(autor=perfil)
    
class ProfileList(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
   

class ProfileDetailForRequestUser(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerializer
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class ProfileDetailForUser(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerializer
    def get_queryset(self):
        return self.queryset.filter(user=self.kwargs['pk'])

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializerView

class UserListLeter(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializerView
    def get_queryset(self):
        letter = self.kwargs['pk']
        return self.queryset.filter(name__icontains=letter, is_active=True).exclude(pk=self.request.user.pk)
            
