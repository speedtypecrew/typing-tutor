from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views
from .views import login_view

urlpatterns = [
    path('users/', views.users, name='users'),
    path('users/details/<int:id>', views.details, name='details'),
    path('typing/', views.typing_test, name='typing_test'),
    path('ranks/create/', views.rank_create, name='rank_create'),
    path('ranks/', views.rank_list, name='rank_list'),
    path('', views.main, name='main'),
    path('login/', login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)