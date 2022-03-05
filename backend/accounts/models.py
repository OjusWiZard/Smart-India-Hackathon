from sys import last_traceback
from django.db import models

from datetime import date
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _

from .manager import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=128, blank=True)
    last_name = models.CharField(max_length=128, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateField(default=date.today)
    phone_number = models.BigIntegerField(unique=True)
    phone_number_verified = models.BooleanField(default=False)
    two_factor_auth = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['phone_number']

    class Meta:
        ordering = ('phone_number')
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_short_name(self):
        if self.first_name != '' and self.last_name != '':
            return self.first_name + self.last_name
        else:
            return str(self.phone_number)