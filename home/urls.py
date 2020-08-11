from django.urls import path
from .views import home, csrf

urlpatterns = [
    path("", home, name="homepage"),
    path("csrf/", csrf, name="csrf"),
]
