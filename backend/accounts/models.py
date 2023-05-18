from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.postgres.fields import ArrayField

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)
    
class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_name(self):
        return self.name
    
    def __str__(self):
        return self.email
    
class Profile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    descripcion = models.TextField(blank=True)
    amigos = models.ManyToManyField(UserAccount, blank=True, related_name='user_friends')
    logros = ArrayField(models.CharField(max_length=100), blank=True)
    imagen = models.ImageField(default='descarga.png', blank=True, null=True)

    def __str__(self):
        return self.descripcion

    def get_imagen_url(self):
        if self.imagen:
            return self.imagen.url
        else:
            return ''

# class Post(models.Model):
#     author = models.ForeignKey(Profile, on_delete=models.CASCADE)
#     created_date = models.DateTimeField(default=datetime.now())
#     title = models.CharField(max_length=200)
#     content = models.TextField()
#     image = models.ImageField(upload_to='post_images/', blank=True)
#     likes = models.ManyToManyField(UserAccount, related_name='liked_posts', blank=True)

#     def total_likes(self):
#         return self.likes.count()

#     def __str__(self):
#         return self.title
    
# class Comment(models.Model):
    # post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    # author = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    # created_date = models.DateTimeField(default=datetime.now())
    # content = models.TextField()

    # def __str__(self):
    #     return f'Comment by {self.author} on {self.post}'