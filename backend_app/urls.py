from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('my-employees/', views.get_my_employees, name='my_employees'),
    path('ready-employees/', views.get_ready_employees, name='ready_employees'),
    path('chat/', views.send_message, name='chat'),
]