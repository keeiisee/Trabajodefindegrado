from django.contrib import admin
from .models import Profile, UserAccount, Publicacion, ParqueCalistenia, Reserva

admin.site.register(Profile)
admin.site.register(UserAccount)
admin.site.register(Publicacion)
admin.site.register(ParqueCalistenia)
admin.site.register(Reserva)