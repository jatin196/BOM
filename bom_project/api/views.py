from rest_framework import viewsets
from bom_project.models import Part, Project
from rest_framework.decorators import api_view
from rest_framework.response import Response
from bom_project.models import Project
from django.shortcuts import get_object_or_404
from bom_project.api.serializers import PartSerializer, ProjectSerializer

class PartViewset(viewsets.ModelViewSet):
    serializer_class=PartSerializer
    queryset=Part.objects.all()

class ProjectViewset(viewsets.ModelViewSet):
    serializer_class=ProjectSerializer
    queryset=Project.objects.all()
