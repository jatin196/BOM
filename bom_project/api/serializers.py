from rest_framework import serializers
from bom_project.models import Part, Project
from django.shortcuts import get_object_or_404



class PartSerializer(serializers.ModelSerializer):
    parent_part = serializers.PrimaryKeyRelatedField(source='part_number', read_only=True)
    project = serializers.CharField(source='project.project_name')
    # project = ProjectSerializer()
    class Meta:
        
        model=Part
        fields = '__all__'
    def create(self, validated_data):
        # print(validated_data['project.project_name'])
        # print(validated_data['parent_part'])
        print(validated_data)

        # project = get_object_or_404(Project, project_name=validated_data['project.project_name'])
        project = Project.objects.filter(project_name=validated_data['project']['project_name'])

        print(project)
        validated_data.pop('project')

        part = Part.objects.create(project=project[0], **validated_data )
        # print(validated_data)
        # print(project)
        # # project=Project.objects.get(project_name=validated_data['project_name'])
        # project.project_desc = ''
        print(validated_data)

        # return Part.objects.create(part=part, project=project)
        return part
# class ProjectDetailSerializer(serializers.Serializer):
#     project=se
class ProjectSerializer(serializers.ModelSerializer):
    parts = PartSerializer(read_only=True, many=True)
    class Meta:
        model=Project
        depth=1
        fields = '__all__'
    # def create(self, validated_data):
    #     parts = Part.objects.create(**validated_data['PartSerializer'])
    #     return Project.objects.create(parts=parts, deleted=validated_data['deleted'])

