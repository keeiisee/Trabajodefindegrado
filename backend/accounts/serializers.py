from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
#from .models import Post, Comment
from .models import Profile, Publicacion, ParqueCalistenia, Reserva, Logro
from rest_framework import serializers

User = get_user_model()
class ImagenUrlField(serializers.ImageField):
    def to_representation(self, value):
        if value:
            request = self.context.get('request')
            return request.build_absolute_uri(value.url)
        else:
            return ''
        
# class PublicacionCreateSerializer(serializers.ModelSerializer):
#     #autor = serializers.StringRelatedField()
#     #imagen = ImagenUrlField()
#     class Meta:
#         model = Publicacion
#         fields = ['id','autor', 'imagen', 'descripcion', 'fecha_publicacion', 'like']

class PublicacionSerializer(serializers.ModelSerializer):
    #autor = serializers.StringRelatedField()
    imagen = ImagenUrlField()
    class Meta:
        model = Publicacion
        fields = ['id','autor', 'imagen', 'descripcion', 'fecha_publicacion', 'like']

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')

class ProfileCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)
    user_publicaciones = PublicacionSerializer(source="publicaciones", many=True, read_only=True)
    class Meta:
        model = Profile
        fields = ('id', 'user','user_publicaciones', 'descripcion','parques_calistenia','logros','solicitudEnviada','solicitudRecibida','amigos','imagen','user_id', 'user_name',)

class UserCreateSerializerView(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','name')

class PublicacionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicacion
        fields = '__all__'

class ParqueCalisteniaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParqueCalistenia
        fields = '__all__'  

class ReservaCreateSerializer(serializers.ModelSerializer):
    usuario_name = serializers.CharField(source='usuario.user.name', read_only=True)
    class Meta:
        model = Reserva
        fields = ('usuario', 'parque', 'fecha', 'hora', 'usuario_name')

class ProfileUpdateSerializer(serializers.ModelSerializer):

    logros = serializers.PrimaryKeyRelatedField(many=True, queryset=Logro.objects.all(), required=False)
    
    class Meta:
        model = Profile
        fields = [
            'descripcion',
            'logros',
            'imagen',
        ]
        extra_kwargs = {
            'descripcion': {'required': False},
            'imagen': {'required': False},
        }

    def update(self, instance, validated_data):
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.logros.set(validated_data.get('logros', instance.logros.all()))
  
        if 'imagen' in validated_data:
            instance.imagen = validated_data['imagen']

        instance.save()
        return instance
    
# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = '__all__'

# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = '__all__'