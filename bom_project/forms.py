# from django import forms.M
from .models import Part
# class PartCreateForm(forms.Modelform):
#     class Meta:
#         model=Part
#         fields=['__all__']


from django.forms import ModelForm, Textarea 

class PartForm(ModelForm):
    
    class Meta:
        model = Part
        fields = ('part_number','part_desc','parent_part')
        widgets = {
            'part_desc': Textarea(attrs={'cols': 20, 'rows': 1}),
        }
