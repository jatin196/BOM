from django.db import models

# Create your models here.

class ProjectManager(models.Manager):

    def get_by_natural_key(self, project_name):
        return self.get(project_name=project_name)

class Project(models.Model):
    project_name = models.CharField(verbose_name='Project Name', max_length=120, unique=True)
    project_desc = models.TextField(verbose_name='Project Description', blank=True, null=True)
    objects=ProjectManager()

    def __str__(self):
        return self.project_name
    

class PartManager(models.Manager):

    def get_by_natural_key(self, part_number):
        return self.get(part_number=part_number)

class Part(models.Model):
    project = models.ForeignKey('Project', on_delete=models.CASCADE, related_name='parts')
    part_number = models.SlugField(unique=True)
    part_desc = models.TextField()
    parent_part = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    
    objects = PartManager()
    def natural_key(self):
        return self.part_number

    # def get_absolute_url(self):
    #     return reverse('part-detail', kwargs={'pk': self.pk})

    def __str__(self):
        return self.part_desc
    



