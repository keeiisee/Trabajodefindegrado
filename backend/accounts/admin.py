from django.contrib import admin
from .models import Profile, UserAccount, Publicacion

admin.site.register(Profile)
admin.site.register(UserAccount)
admin.site.register(Publicacion)