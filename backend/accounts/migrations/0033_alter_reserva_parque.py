# Generated by Django 4.1.3 on 2023-06-08 23:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0032_alter_reserva_usuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reserva',
            name='parque',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parque', to='accounts.parquecalistenia'),
        ),
    ]
