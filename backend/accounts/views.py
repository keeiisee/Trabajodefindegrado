import random
from django.db.models import Q
from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from .models import Profile, UserAccount, Publicacion, ParqueCalistenia, Reserva
from .serializers import ProfileUpdateSerializer, PublicacionSerializer, ReservaCreateSerializer, ProfileCreateSerializer, UserCreateSerializerView, PublicacionCreateSerializer, ParqueCalisteniaCreateSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.generics import ListAPIView
from datetime import date

class DeleteUserView(APIView):
    def post(self, request):
        print("Dddddddddddd")
        user = request.user
        user.delete()
        return Response({'status': 'success', 'message': 'User account deleted successfully'}, status=status.HTTP_200_OK)

class UltimasPublicacionesNoAmigosView(generics.GenericAPIView):
    queryset = Publicacion.objects.all()
    serializer_class = PublicacionSerializer

    def get(self, request, *args, **kwargs):
        user = UserAccount.objects.get(email=request.user.email)
        profile = Profile.objects.get(user=user)
        amigos = profile.amigos.all()

        no_amigos = UserAccount.objects.exclude(Q(id__in=amigos) | Q(id=user.id))
        
        no_amigos_profiles = []
        for no_amigo in no_amigos:
            no_amigos_profiles.append(Profile.objects.get(user=no_amigo))

        # Si hay menos de 5 usuarios no amigos, selecciona todos
        if len(no_amigos_profiles) <= 5:
            seleccionados = no_amigos_profiles
        else:
            # Si hay más de 5 usuarios no amigos, selecciona 5 de manera aleatoria
            seleccionados = random.sample(no_amigos_profiles, 5)

        ultimas_publicaciones = []
        for perfil_seleccionado in seleccionados:
            try:
                ultima_publicacion = Publicacion.objects.filter(autor=perfil_seleccionado).latest('fecha_publicacion')
                ultimas_publicaciones.append(ultima_publicacion)
            except Publicacion.DoesNotExist:
                pass

        serializer = self.get_serializer(ultimas_publicaciones, many=True)
        return Response(serializer.data)
    
class UltimaPublicacionView(generics.GenericAPIView):
    queryset = Publicacion.objects.all()
    serializer_class = PublicacionSerializer

    def get(self, request, *args, **kwargs):
        user = UserAccount.objects.get(email=request.user.email)
        profile = Profile.objects.get(user=user)
        amigos = profile.amigos.all()

        ultimas_publicaciones = []
        for amigo in amigos:
            amigo_profile = Profile.objects.get(user=amigo)
            try:
                ultima_publicacion = Publicacion.objects.filter(autor=amigo_profile).latest('fecha_publicacion')
                ultimas_publicaciones.append(ultima_publicacion)
            except Publicacion.DoesNotExist:
                pass
        
        serializer = self.get_serializer(ultimas_publicaciones, many=True)
        return Response(serializer.data)
        
class PublicacionesFavoritas(APIView):

    def get(self, request):
        user = UserAccount.objects.get(email=request.user.email)
        profile = Profile.objects.get(user=user)
        publicaciones = profile.misMeGustan.all()

        serializer = PublicacionSerializer(publicaciones, many=True, context={'request': request})
        return Response(serializer.data)

class LikePublicacionView(generics.GenericAPIView):
    
    def post(self, request, *args, **kwargs):
        publicacion_id = request.data.get("publicacion_id")
        like = request.data.get("like")

        if publicacion_id is None or like is None:
            return Response({"error": "Faltan datos en la solicitud."}, status=400)

        try:
            publicacion = Publicacion.objects.get(pk=publicacion_id)
            profile = request.user.profile

            if like:
                profile.misMeGustan.add(publicacion)
                publicacion.like.add(profile)
            else:
                profile.misMeGustan.remove(publicacion)
                publicacion.like.remove(profile)

            publicacion.save()
            profile.save()

            return JsonResponse({"success": True})

        except Publicacion.DoesNotExist:
            return Response({"error": "No se encontró la publicación con el ID proporcionado."}, status=404)
        except Exception as e:
            return Response({"error": f"Error al procesar la solicitud: {str(e)}"}, status=500)

class ReservasPorParque(ListAPIView):
    serializer_class = ReservaCreateSerializer

    def get_queryset(self):
        parque_id = self.kwargs['pk']
        return Reserva.objects.filter(parque=parque_id, fecha=date.today())
    
class RemoveFriendView(APIView):
    def post(self, request):
        friend_id = request.data.get('friend_id')
        if friend_id is None:
            return Response({'error': 'ID de amigo no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            friend = UserAccount.objects.get(pk=friend_id)
        except UserAccount.DoesNotExist:
            return Response({'error': 'Amigo no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        user_profile = request.user.profile
        friend_profile = friend.profile

        # Comprobar si son amigos
        if friend not in user_profile.amigos.all():
            return Response({'error': 'El usuario no es tu amigo'}, status=status.HTTP_400_BAD_REQUEST)

        # Eliminar la amistad: quitar al amigo del campo amigos en ambos perfiles
        user_profile.amigos.remove(friend)
        friend_profile.amigos.remove(request.user)

        user_profile.save()
        friend_profile.save()

        serializer = ProfileCreateSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

        
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

    def create(self, request, *args, **kwargs):
        parque = request.data.get('parque')
        fecha = request.data.get('fecha')
        hora = request.data.get('hora')
        
        if not (parque and fecha and hora):
            return Response({'error': 'Por favor, proporcione todos los campos requeridos (parque, fecha, hora).'}, status=status.HTTP_400_BAD_REQUEST)
        
        parque1 = ParqueCalistenia.objects.filter(placeId = parque)
        print(parque)
        reserva = Reserva(
            parque=parque1[0],
            fecha=fecha,
            hora=hora,
            usuario=request.user.profile
        )
        reserva.save()

        serializer = self.get_serializer(reserva)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
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
        return self.queryset.filter(autor=perfil).order_by('-fecha_publicacion')
    
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
            

class CrearPublicacionView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        serializer = PublicacionSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CrearProfileView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        serializer = ProfileCreateSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateProfileImageView(APIView):
    def put(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({"error": "Debe proporcionar un user_id."}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(UserAccount, id=user_id)
        profile = user.profile

        serializer = ProfileUpdateSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)