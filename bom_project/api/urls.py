from django.urls import path, include
from bom_project.api.views import PartViewset, ProjectViewset
from rest_framework.routers import DefaultRouter, SimpleRouter
from bom_project.models import Part

# Create a router and register our viewsets with it.
router = DefaultRouter()

router.register(r'projects', ProjectViewset, basename='project')

router.register(r'parts', PartViewset, basename='part')
# urlpatterns = [
#     path('projects/<id>/detail/', ProjectDetail, name='project-detail')
# ]
# router.register(r'users', views.UserViewSet)

# The API URLs are now determined automatically by the router.
# urlpatterns = [
#     path('', include(router.urls)),
# ]
urlpatterns = router.urls
