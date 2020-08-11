from datetime import time
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.shortcuts import reverse
from django.core.mail import send_mail

# Create your models here.

class UserManager(BaseUserManager):

    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model(
            email = email,
            is_staff=is_staff,
            is_superuser=is_superuser,
            joined=now,
            **extra_fields,
        )
        user.set_password(password)
        user.save(self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        self._create_user(email, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        user = self._create_user(email, password, True, True, **extra_fields)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=250, unique=True)
    name = models.CharField(max_length=180)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()
    

    def get_absolute_url(self):
        return reverse("user", kwargs={"pk": self.pk})

    def email_user(self, subject, message, from_email=None, **kwargs):
        '''
        Sends an email to this User.
        '''
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def username(self):
        return self.email


    