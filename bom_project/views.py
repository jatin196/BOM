from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import ListView, FormView, CreateView
from .models import Part
from .forms import PartForm
from django.contrib.auth.mixins import LoginRequiredMixin


class AllParts(ListView):
    model = Part
    template_name='part/list.html'

class AddPart(LoginRequiredMixin, CreateView):
    login_url=reverse_lazy("account_login")
    model = Part
    template_name='part/CreateForm.html'
    form_class=PartForm
    success_url=reverse_lazy('part-list')
    # fields=['part_number', 'part_desc']
    



    