# Generated by Django 3.2.5 on 2021-08-29 10:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_auto_20210829_1432'),
    ]

    operations = [
        migrations.AddField(
            model_name='media',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product'),
        ),
    ]