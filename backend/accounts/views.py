from rest_framework import generics, permissions, viewsets
# from .models import Post, Comment
# from .serializers import PostSerializer, CommentSerializer
from .models import Profile
from .serializers import ProfileCreateSerializer

class ProfileList(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerializer
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