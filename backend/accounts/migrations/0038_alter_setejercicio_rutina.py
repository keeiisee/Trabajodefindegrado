# Generated by Django 4.1.3 on 2023-06-12 20:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0037_rename_experiencia_rutina_repeticiones_set_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='setejercicio',
            name='rutina',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sets', to='accounts.rutina'),
        ),
    ]
