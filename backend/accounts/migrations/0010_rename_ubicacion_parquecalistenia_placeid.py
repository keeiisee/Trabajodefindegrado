# Generated by Django 4.1.3 on 2023-05-24 19:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_rename_solicitudrecivida_profile_solicitudrecibida'),
    ]

    operations = [
        migrations.RenameField(
            model_name='parquecalistenia',
            old_name='ubicacion',
            new_name='placeId',
        ),
    ]