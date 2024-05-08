from django.urls import path
from . import views

app_name = 'flashcard'

urlpatterns = [
    path('', views.hello_view, name='hello'),
]

