# Generated by Django 4.1 on 2022-08-26 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_user_bank_account_no_user_bank_ifsc_code_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='bank_ifsc_code',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
    ]