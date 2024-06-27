from django.http import HttpResponse
from django.template import loader
from .models import User

# Create your views here.

def users(request):
  template = loader.get_template('myfirst.html')
  return HttpResponse(template.render())