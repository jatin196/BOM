from rest_framework import serializers
from bom_project.models import Part, Project
from django.shortcuts import get_object_or_404



class PartSerializer(serializers.ModelSerializer):
    queryset=Part.objects.all()
    parent_part = serializers.SlugField()
    project = serializers.CharField(source='project.project_name')
    # project = ProjectSerializer()
    class Meta:
        depth=2
        model=Part
        fields = ('id','project', 'part_desc', 'part_number', 'parent_part')
    def create(self, validated_data):
        # print(validated_data['project.project_name'])
        # print(validated_data['parent_part'])
        print(validated_data)

        # project = get_object_or_404(Project, project_name=validated_data['project.project_name'])
        project = Project.objects.filter(project_name=validated_data['project']['project_name'])
        parent_part =Part.objects.filter(part_number = validated_data['parent_part'])
        print(project)
        validated_data.pop('project')
        validated_data.pop('parent_part')
        part = Part.objects.create(project=project[0],parent_part=parent_part[0], **validated_data )
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
        depth=2
        fields = '__all__'
    # def create(self, validated_data):
    #     parts = Part.objects.create(**validated_data['PartSerializer'])
    #     return Project.objects.create(parts=parts, deleted=validated_data['deleted'])

