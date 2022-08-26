# Generated by Django 4.1 on 2022-08-26 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='bank_account_no',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='bank_ifsc_code',
            field=models.CharField(blank=True, max_length=11, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='bank_name',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
    ]
