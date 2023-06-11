from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
#from .models import Post, Comment
from .models import Profile, Publicacion, ParqueCalistenia, Reserva, Material
from rest_framework import serializers

User = get_user_model()
class ImagenUrlField(serializers.ImageField):
    def to_representation(self, value):
        if value:
            request = self.context.get('request')
            return request.build_absolute_uri(value.url)
        else:
            return ''

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'nombre']       

class PublicacionSerializer(serializers.ModelSerializer):
    #autor = serializers.StringRelatedField()
    # imagen = ImagenUrlField()
    autor_name = serializers.CharField(source='autor.user.name', read_only=True)
    class Meta:
        model = Publicacion
        fields = ['id','autor','autor_name', 'imagen', 'descripcion', 'fecha_publicacion', 'like']

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')

class ProfileOtherSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Profile
        fields = ('user_id', 'user_name', 'descripcion', 'amigos', 'solicitudEnviada', 'solicitudRecibida', 'imagen', 'misMeGustan', 'is_private', 'telefono', 'edad')

class ParqueCalisteniaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParqueCalistenia
        fields = ['nombre', 'placeId', 'descripcion', 'imagenUrl', 'baneado', 'likes', 'dislikes']

class ReservaCreateSerializer(serializers.ModelSerializer):
    usuario_name = serializers.CharField(source='usuario.user.name', read_only=True)
    materiales = MaterialSerializer(many=True, read_only=True)
    class Meta:
        model = Reserva
        fields = ('usuario', 'parque', 'fecha', 'hora', 'usuario_name', 'materiales')

class ReservaSerializer(serializers.ModelSerializer):
    usuario_name = serializers.CharField(source='usuario.user.name', read_only=True)
    materiales = MaterialSerializer(many=True, read_only=True)
    parque = ParqueCalisteniaCreateSerializer(read_only=True)
    class Meta:
        model = Reserva
        fields = ('usuario', 'parque', 'fecha', 'hora', 'usuario_name', 'materiales')

class ProfileCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    user_publicaciones = PublicacionSerializer(source="publicaciones", many=True, read_only=True)
    user_reservas = ReservaSerializer(source="reserva", many=True, read_only=True)
    publicaciones_con_mis_likes = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ('id', 'user','user_publicaciones','publicaciones_con_mis_likes', 'descripcion','solicitudEnviada','solicitudRecibida','amigos','imagen','user_id', 'user_name','user_email','telefono','edad','is_private', 'user_reservas')
    def get_publicaciones_con_mis_likes(self, obj):
        # Filtra las publicaciones que tienen tu "me gusta"
        publicaciones_con_mis_likes = Publicacion.objects.filter(like=obj)
        # Utiliza el serializer "PublicacionSerializer" para serializar las publicaciones
        return PublicacionSerializer(publicaciones_con_mis_likes, many=True).data
    
class UserCreateSerializerView(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','name')

class UserSearchSerializerView(serializers.ModelSerializer):
    profile = ProfileCreateSerializer()
    class Meta:
        model = User
        fields = ('id','name', 'profile')

class PublicacionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicacion
        fields = '__all__'



class ProfileUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = [
            'descripcion',
            'imagen',
            'telefono',
            'edad',
            'is_private'
        ]
        extra_kwargs = {
            'descripcion': {'required': False},
            'imagen': {'required': False},
            'telefono': {'required': False},
            'edad': {'required': False},
            'is_private': {'required': False},
        }

    def update(self, instance, validated_data):
        instance.telefono = validated_data.get('telefono', instance.telefono)
        instance.edad = validated_data.get('edad', instance.edad)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.is_private = validated_data.get('is_private', instance.is_private)
        instance.imagen = validated_data.get('imagen', instance.imagen)

        instance.save()
        return instance
    
