# urls.py
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path("todos", views.news_list),
    path("todos/<int:pk>", views.news_detail)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



# urls:
    # http://127.0.0.1:8000/todos
    # http://127.0.0.1:8000/todos/id