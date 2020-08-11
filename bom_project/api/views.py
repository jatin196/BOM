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

# @api_view(['GET'])
# def ProjectDetail(request, id):
#     print(id)
#     project= {}
#     obj= get_object_or_404(Project, pk=id)
#     print(obj.project_name)
#     if obj:
#         parts = []
#         print(obj.parts.all())
#         for x in obj.parts.all():
#             part_detail = {}
#             print(x.id)
#             part_detail['id'] = x.id
#             part_detail['desc'] = x.part_desc
#             part_detail['parent'] = x.parent_part.part_desc
#             parts.append(part_detail)
#         print("all parts", parts)
#         project = {
#             'id' : id , 
#             'name' : obj.project_name ,
#             'desc' : "" ,
#             'parts' : parts
#         }
#         if obj.project_desc:
#             project['desc'] = obj.project_desc
#     print("project", project)
#     return Response({'msg' : "Hello there mate"})