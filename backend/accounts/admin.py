from django.contrib import admin
from .models import Rutina, SetEjercicio, Material, Profile, UserAccount, Publicacion, ParqueCalistenia, Reserva

admin.site.register(Profile)
admin.site.register(UserAccount)
admin.site.register(Publicacion)
admin.site.register(ParqueCalistenia)
admin.site.register(Reserva)
admin.site.register(Material)
admin.site.register(Rutina)
admin.site.register(SetEjercicio)