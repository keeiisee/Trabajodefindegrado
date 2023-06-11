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
        return self.name
    

class Profile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    descripcion = models.TextField(blank=True)
    amigos = models.ManyToManyField(UserAccount, blank=True, related_name='user_friends')
    solicitudEnviada = models.ManyToManyField(UserAccount, blank=True, related_name='sen_solicitud_firend')
    solicitudRecibida = models.ManyToManyField(UserAccount, blank=True, related_name='recieve_solicitud_firend')
    imagen = models.TextField(blank=True, null=True)
    misMeGustan = models.ManyToManyField('Publicacion', blank=True, related_name='mis_mg')
    is_private = models.BooleanField(default=False)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    edad = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.user.name

    def get_imagen_url(self):
        if self.imagen:
            return self.imagen.url
        else:
            return ''

class Publicacion(models.Model):
    autor = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='publicaciones')
    imagen = models.TextField(blank=True, null=True)
    descripcion = models.TextField(max_length=1000)
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    like = models.ManyToManyField(Profile, blank=True, related_name='publicacion_likes')

    def __str__(self):
        return f'{self.autor.user.name}: {self.descripcion}'

class ParqueCalistenia(models.Model):
    nombre = models.CharField(max_length=255)
    placeId = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True)
    imagenUrl = models.TextField(max_length=10000, blank=True, null=True)
    baneado = models.BooleanField(default=False)
    likes = models.ManyToManyField(UserAccount, blank=True, related_name='parques_likes')  # Campo para 'likes'
    dislikes = models.ManyToManyField(UserAccount, blank=True, related_name='parques_dislikes') # Campo para 'dislikes'
    def __str__(self):
        return self.nombre
        
class Material(models.Model):
    nombre = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre
    
class Reserva(models.Model):
    usuario = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='reserva')
    parque = models.ForeignKey(ParqueCalistenia, on_delete=models.CASCADE, related_name='parques')
    fecha = models.DateField()
    hora = models.TimeField()
    materiales = models.ManyToManyField(Material, blank=True)

    def __str__(self):
        return f"{self.usuario.user.name} - {self.parque.nombre} - {self.fecha} - {self.hora}"
