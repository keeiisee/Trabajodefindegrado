# Generated by Django 4.1.3 on 2023-06-03 23:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0021_rename_is_th_useraccount_is_private_profile_edad_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='is_private',
        ),
        migrations.AddField(
            model_name='profile',
            name='is_private',
            field=models.BooleanField(default=False),
        ),
    ]
