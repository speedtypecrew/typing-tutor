# Generated by Django 5.0.6 on 2024-06-26 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rank',
            name='icon',
            field=models.CharField(max_length=300),
        ),
    ]
