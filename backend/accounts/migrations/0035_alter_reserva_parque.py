# Generated by Django 4.1.3 on 2023-06-08 23:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0034_alter_reserva_parque'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reserva',
            name='parque',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parques', to='accounts.parquecalistenia'),
        ),
    ]
