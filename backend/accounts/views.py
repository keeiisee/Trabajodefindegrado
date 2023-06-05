import random
from django.db.models import Q
from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from .models import Material, Profile, UserAccount, Publicacion, ParqueCalistenia, Reserva
from .serializers import ProfileOtherSerializer, UserSearchSerializerView, ProfileUpdateSerializer, PublicacionSerializer, ReservaCreateSerializer, ProfileCreateSerializer, UserCreateSerializerView, PublicacionCreateSerializer, ParqueCalisteniaCreateSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.generics import ListAPIView
from datetime import date

class EliminarPublicacionView(APIView):
    def post(self, request, *args, **kwargs):
        # Obtener el ID de la publicación a eliminar del cuerpo de la solicitud
        publicacion_id = request.data.get("publicacion_id")
        
        # Verificar que se proporcionó un ID válido
        if not publicacion_id:
            return Response({'error': 'Debe proporcionar un ID de publicación'}, status=status.HTTP_400_BAD_REQUEST)

        # Obtener la publicación correspondiente y eliminarla
        try:
            publicacion = Publicacion.objects.get(id=publicacion_id)
            publicacion.delete()
            return Response({'success': 'Publicación eliminada correctamente'}, status=status.HTTP_200_OK)
        except Publicacion.DoesNotExist:
            return Response({'error': 'La publicación especificada no existe'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UpdatePostDescriptionView(APIView):
    def post(self, request, *args, **kwargs):
        publicacion_id = request.data.get("publicacion_id")

        if not publicacion_id:
            return Response({"error": "Debe proporcionar un publicacion_id."}, status=status.HTTP_400_BAD_REQUEST)

        publicacion = get_object_or_404(Publicacion, id=publicacion_id)

        serializer = PublicacionCreateSerializer(publicacion, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class DeleteUserView(APIView):
    def post(self, request):
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
            perfil_no_amigo = Profile.objects.filter(user=no_amigo, is_private=False).first()
            if perfil_no_amigo:
                no_amigos_profiles.append(perfil_no_amigo)

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
        user = get_object_or_404(UserAccount, email=request.user.email)
        profile = get_object_or_404(Profile, user=user)
        publicaciones = profile.misMeGustan.all()

        # Filtrar publicaciones de usuarios que no son amigos y tienen perfiles privados
        publicaciones_filtradas = []
        for publicacion in publicaciones:
            autor_profile = publicacion.autor
            if not (autor_profile.is_private and autor_profile.user not in profile.amigos.all()):
                publicaciones_filtradas.append(publicacion)

        serializer = PublicacionSerializer(publicaciones_filtradas, many=True, context={'request': request})
        return Response(serializer.data)
    
    
class PublicacionesDeOtroFav(APIView):

    def post(self, request):
        user_id = request.data.get('id')
        if not user_id:
            return Response({"detail": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = UserAccount.objects.get(id=user_id)
            profile = Profile.objects.get(user=user)
            publicaciones = profile.misMeGustan.all()

            serializer = PublicacionSerializer(publicaciones, many=True, context={'request': request})
            return Response(serializer.data)

        except UserAccount.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        
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
        user_id = request.user.id
        friend_id = request.data.get('recipient_id')

        if not friend_id:
            return Response({"error": "No se proporcionó un ID de amigo"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_profile = Profile.objects.get(user__id=user_id)
            friend_profile = Profile.objects.get(user__id=friend_id)
        except Profile.DoesNotExist:
            return Response({"error": "Perfil no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        user_profile.amigos.remove(friend_profile.user)
        friend_profile.amigos.remove(user_profile.user)

        user_profile.save()
        friend_profile.save()

        serializer = ProfileOtherSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

        
class AddFriendView(APIView):
    def post(self, request):
        user_id = request.user.id
        requester_id = request.data.get('recipient_id')

        if not requester_id:
            return Response({"error": "No se proporcionó un ID de solicitante"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_profile = Profile.objects.get(user__id=user_id)
            requester_profile = Profile.objects.get(user__id=requester_id)
        except Profile.DoesNotExist:
            return Response({"error": "Perfil no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        user_profile.solicitudRecibida.remove(requester_profile.user)
        requester_profile.solicitudEnviada.remove(user_profile.user)

        user_profile.amigos.add(requester_profile.user)
        requester_profile.amigos.add(user_profile.user)

        user_profile.save()
        requester_profile.save()

        serializer = ProfileOtherSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SendFriendRequestView(APIView):
    def post(self, request):
        sender_id = request.user.id
        recipient_id = request.data.get('recipient_id')

        if not recipient_id:
            return Response({"error": "No se proporcionó un ID de destinatario"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            sender_profile = Profile.objects.get(user__id=sender_id)
            recipient_profile = Profile.objects.get(user__id=recipient_id)
        except Profile.DoesNotExist:
            return Response({"error": "Perfil no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        sender_profile.solicitudEnviada.add(recipient_profile.user)
        recipient_profile.solicitudRecibida.add(sender_profile.user)

        sender_profile.save()
        recipient_profile.save()

        serializer = ProfileOtherSerializer(sender_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class RejectFriendRequestView(APIView):
    def post(self, request):
        user_id = request.user.id
        requester_id = request.data.get('recipient_id')

        if not requester_id:
            return Response({"error": "No se proporcionó un ID de solicitante"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_profile = Profile.objects.get(user__id=user_id)
            requester_profile = Profile.objects.get(user__id=requester_id)
        except Profile.DoesNotExist:
            return Response({"error": "Perfil no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        user_profile.solicitudRecibida.remove(requester_profile.user)
        requester_profile.solicitudEnviada.remove(user_profile.user)

        user_profile.save()
        requester_profile.save()

        serializer = ProfileOtherSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ReservaCalisteniaList(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaCreateSerializer

    def create(self, request, *args, **kwargs):
        parque_place_id = request.data.get('parque')
        fecha = request.data.get('fecha')
        hora = request.data.get('hora')
        materiales_nombres = request.data.get('materiales', [])

        if not (parque_place_id and fecha and hora):
            return Response({'error': 'Por favor, proporcione todos los campos requeridos (parque, fecha, hora).'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            parque = ParqueCalistenia.objects.get(placeId=parque_place_id)
        except ParqueCalistenia.DoesNotExist:
            return Response({'error': f'Parque no encontrado: {parque_place_id}'}, status=status.HTTP_400_BAD_REQUEST)

        reserva = Reserva(
            parque=parque,
            fecha=fecha,
            hora=hora,
            usuario=request.user.profile
        )
        reserva.save()

        for material_nombre in materiales_nombres:
            try:
                material = Material.objects.get(nombre=material_nombre)
                reserva.materiales.add(material)
            except Material.DoesNotExist:
                reserva.delete()
                return Response({'error': f'Material no encontrado: {material_nombre}'}, status=status.HTTP_400_BAD_REQUEST)

        reserva.save()

        serializer = self.get_serializer(reserva)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CrearParqueCalisteniaView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ParqueCalisteniaCreateSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
    serializer_class = UserSearchSerializerView
    def get_queryset(self):
        letter = self.kwargs['pk']
        return self.queryset.filter(name__icontains=letter, is_active=True, profile__isnull=False).exclude(pk=self.request.user.pk)
            

class CrearPublicacionView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = PublicacionCreateSerializer(data=request.data)
        
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