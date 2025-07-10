from django.urls import path
from . import views

app_name = 'teckko'

urlpatterns = [
    path('', views.home, name='home'),
    path('contact/', views.contact, name='contact'),
]