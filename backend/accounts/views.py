from rest_framework import generics, permissions, viewsets
# from .models import Post, Comment
# from .serializers import PostSerializer, CommentSerializer
from .models import Profile, UserAccount
from .serializers import ProfileCreateSerializer, UserCreateSerializerView

class ProfileList(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerializer

class ProfileDetailForUser(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerializer
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializerView

class UserListLeter(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializerView
    def get_queryset(self):
        letter = self.kwargs['pk']
        return self.queryset.filter(name__icontains=letter, is_active=True)

# class PostList(viewsets.ModelViewSet):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         # Obtener la lista de posts del usuario autenticado
#         return self.queryset.filter(author=self.request.user)

# class CommentList(generics.ListCreateAPIView):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         # Obtener la lista de comentarios del usuario autenticado
#         return self.queryset.filter(author=self.request.user)