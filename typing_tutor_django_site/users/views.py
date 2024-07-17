from django.http import HttpResponse
from django.template import loader
from .models import User
import time
from django.shortcuts import render
from .sentence_generator import main as sgmain
from .accuracy_checker import calculate_accuracy
from django.shortcuts import render, redirect
from .models import Rank, User
from .forms import RankForm
from django.template import loader
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm 
from django.contrib.auth import login

# Create your views here.

def main(request):
    template = loader.get_template('main.html')
    return HttpResponse(template.render())

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

def rank_create(request):
    if request.method == 'POST':
        form = RankForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('rank_list')  # Change this to your desired redirect
    else:
        form = RankForm()
    return render(request, 'rank_form.html', {'form': form})

def rank_list(request):
    ranks = Rank.objects.all()
    return render(request, 'rank_list.html', {'ranks': ranks})


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
        text_lines = sgmain()
        text = '\n'.join(text_lines)
        start_time = time.time()
        return render(request, 'practice/typing_test.html', {'text': text})

def calculate_score(text, user_input):
    global start_time
    words_typed = user_input.split()
    words_expected = text.split()
    correct_words = sum(1 for i in range(min(len(words_typed), len(words_expected))) if words_typed[i] == words_expected[i])
    duration = time.time() - start_time
    words_per_minute = int(len(words_typed) / (duration / 60))  
    score = int((correct_words / len(words_expected)) * 100) if len(words_expected) > 0 else 0
    return {'correct_words': correct_words, 'words_per_minute': words_per_minute, 'score': f'{score}%'}

def register_view(request):
    if request.method == "POST": 
        form = UserCreationForm(request.POST) 
        if form.is_valid(): 
            login(request, form.save())
            return redirect("posts:list")
    else:
        form = UserCreationForm()
    return render(request, "users/register.html", { "form": form })

def login_view(request): 
    if request.method == "POST": 
        form = AuthenticationForm(data=request.POST)
        if form.is_valid(): 
            login(request, form.get_user())
            return redirect("posts:list")
    else: 
        form = AuthenticationForm()
    return render(request, "users/login.html", { "form": form })
