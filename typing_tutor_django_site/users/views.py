from django.http import HttpResponse
from django.template import loader
from .models import User
import random
import time
from django.shortcuts import render
from .sentence_generator import main as sgmain
from .accuracy_checker import calculate_accuracy

# Create your views here.

def users(request):
  myusers = User.objects.all().values()
  template = loader.get_template('all_users.html')
  context = {
    'myusers': myusers,
  }
  return HttpResponse(template.render(context, request))

def details(request, id):
  myuser = User.objects.get(id=id)
  template = loader.get_template('details.html')
  context = {
    'myuser': myuser,
  }
  return HttpResponse(template.render(context, request))

# Typing practice functionality
start_time = 0

def typing_test(request):
    global start_time
    if request.method == 'POST':
        user_input = request.POST.get('user_input', '')
        original_text = request.POST.get('original_text', '')
        results = calculate_score(original_text, user_input)
        context = {
            'original_text': original_text,
            'user_input': user_input,
            'results': results,
        }
        return render(request, 'practice/results.html', context)
    else:
        text = sgmain()
        start_time = time.time()
        return render(request, 'practice/typing_test.html', {'text': text})

def calculate_score(text, user_input):
    global start_time
    words_typed = user_input.split()
    words_expected = text.split()
    correct_words = sum(1 for i in range(min(len(words_typed), len(words_expected))) if words_typed[i] == words_expected[i])
    duration = time.time() - start_time
    wpm = len(words_typed) / (duration / 60)
    score = correct_words  # Simplified scoring
    return {'correct_words': correct_words, 'wpm': wpm, 'score': score}
