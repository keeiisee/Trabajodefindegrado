from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
#from .models import Post, Comment
from .models import Profile, Publicacion, ParqueCalistenia, Reserva
from rest_framework import serializers

User = get_user_model()

class PublicacionSerializer(serializers.ModelSerializer):
    #autor = serializers.StringRelatedField()
    class Meta:
        model = Publicacion
        fields = ['autor', 'imagen', 'descripcion', 'fecha_publicacion', 'like']

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')

class ProfileCreateSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model = Profile
        fields = '__all__'

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
    class Meta:
        model = Reserva
        fields = '__all__' 


# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = '__all__'

# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = '__all__'