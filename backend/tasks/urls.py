from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/tasks/', views.tasks_collection, name='tasks_collection'),
    path('api/tasks/<str:task_id>/complete/', views.complete_task, name='complete_task'),
    path('api/tasks/<str:task_id>/', views.delete_task, name='delete_task'),
]
