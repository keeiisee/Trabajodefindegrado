# Generated by Django 4.1.3 on 2023-05-23 00:57

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_alter_reserva_usuario'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='solicitudEnviada',
            field=models.ManyToManyField(blank=True, related_name='sen_solicitud_firend', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='profile',
            name='solicitudRecivida',
            field=models.ManyToManyField(blank=True, related_name='recieve_solicitud_firend', to=settings.AUTH_USER_MODEL),
        ),
    ]
