from rest_framework import serializers
from rest_framework.fields import NullBooleanField
from bom_project.models import Part, Project
from django.shortcuts import get_object_or_404



class PartSerializer(serializers.ModelSerializer):
    queryset=Part.objects.all()
    parent_part = serializers.SlugField(required=False)
    project = serializers.CharField(source='project.project_name')
    # project = ProjectSerializer()
    class Meta:
        depth=2
        model=Part
        fields = '__all__'
    def create(self, validated_data):
        # print(validated_data['project.project_name'])
        # print(validated_data['parent_part'])
        print(validated_data)

        # project = get_object_or_404(Project, project_name=validated_data['project.project_name'])
        project = Project.objects.filter(project_name=validated_data['project']['project_name'])
        parent_part= None
        if 'parent_part' in validated_data:
            parent_part =Part.objects.get(part_desc = validated_data['parent_part'])
            validated_data.pop('parent_part')

        print(project)
        validated_data.pop('project')
        part = Part.objects.create(project=project[0],parent_part=parent_part, **validated_data )
        print(validated_data)
        return part


    def update(self, instance, validated_data):
        print("validated_data")

        print(validated_data)
        instance.part_desc = validated_data.get('part_desc', instance.part_desc)
        instance.qty = validated_data.get('qty', instance.qty)
        instance.part_number = validated_data.get('part_number', instance.part_number)
        instance.status = validated_data.get('status', instance.status)
        instance.modeling_time = validated_data.get('modeling_time', instance.modeling_time)
        instance.detailing_time = validated_data.get('detailing_time', instance.detailing_time)
        instance.assembly_time = validated_data.get('assembly_time', instance.assembly_time)
        instance.supplier = validated_data.get('supplier', instance.supplier)
        if 'parent_part' in validated_data:
            parent_part =Part.objects.filter(part_number = validated_data['parent_part'])
            print(parent_part)
            validated_data.pop('parent_part')
        else:
            parent_part=[None]
        if parent_part:
            instance.parent_part = parent_part[0]
        
        instance.save()
        print(instance)
        return instance


class ProjectSerializer(serializers.ModelSerializer):
    parts = PartSerializer(read_only=True, many=True, required=False)
    class Meta:
        model=Project
        depth=2
        fields = ['id', 'project_name', 'project_desc', 'parts']
    
    def create(self, validated_data):
        print(validated_data)
        project = Project.objects.create(**validated_data )
        print(validated_data)
        return project
 