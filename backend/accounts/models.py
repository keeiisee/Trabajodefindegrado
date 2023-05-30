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
    is_th = models.BooleanField(default=False)
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_name(self):
        return self.name
    
    def __str__(self):
        return self.name
    
class Profile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    descripcion = models.TextField(blank=True)
    amigos = models.ManyToManyField(UserAccount, blank=True, related_name='user_friends')
    solicitudEnviada = models.ManyToManyField(UserAccount, blank=True, related_name='sen_solicitud_firend')
    solicitudRecibida = models.ManyToManyField(UserAccount, blank=True, related_name='recieve_solicitud_firend')
    logros = models.ManyToManyField('Logro', blank=True, related_name='usuarios_con_logro')
    imagen = models.ImageField(default='descarga.png', blank=True, null=True)
    parques_calistenia = models.ManyToManyField('ParqueCalistenia', blank=True, related_name='usuarios_inscritos')
    misMeGustan = models.ManyToManyField('Publicacion', blank=True, related_name='mis_mg')

    def __str__(self):
        return self.descripcion

    def get_imagen_url(self):
        if self.imagen:
            return self.imagen.url
        else:
            return ''

class Logro(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.nombre

class Publicacion(models.Model):
    autor = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='publicaciones')
    imagen = models.ImageField(default='descarga.png', blank=True, null=True)
    descripcion = models.TextField(max_length=1000)
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    like = models.ManyToManyField(Profile, blank=True, related_name='publicacion_likes')

    def __str__(self):
        return f'{self.autor.user.name}: {self.descripcion}'

class ParqueCalistenia(models.Model):
    nombre = models.CharField(max_length=255)
    placeId = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True)
    imagen = models.ImageField(blank=True, null=True)
    materiales = models.ManyToManyField('Material', blank=True)

    def __str__(self):
        return self.nombre

    def get_imagen_url(self):
        if self.imagen:
            return self.imagen.url
        else:
            return ''

class Material(models.Model):
    usuario = models.ForeignKey(Profile, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255, null=True)
    def __str__(self):
        return f"{self.usuario.user.name}-{self.nombre}"

class Reserva(models.Model):
    usuario = models.ForeignKey(Profile, on_delete=models.CASCADE)
    parque = models.ForeignKey(ParqueCalistenia, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora = models.TimeField()

    def __str__(self):
        return f"{self.usuario.user.name} - {self.parque.nombre} - {self.fecha} - {self.hora}"
    
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