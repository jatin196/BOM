from django.urls import path, include
from bom_project.api.views import PartViewset, ProjectViewset
from rest_framework.routers import DefaultRouter, SimpleRouter
from bom_project.models import Part

router = DefaultRouter()

router.register(r'projects', ProjectViewset, basename='project')

router.register(r'parts', PartViewset, basename='part')

urlpatterns = router.urls
