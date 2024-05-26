from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import news
from .serializers import newsSerializer
from django.shortcuts import redirect

def home(request):
    return redirect('/todos')


@api_view(["GET", "POST"])
def news_list(request):
    if request.method == "GET":
        todos = news.objects.all()
        serializer = newsSerializer(todos, many=True)
        return Response(serializer.data)
    
    elif request.method == "POST":
        serializer = newsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "PATCH", "PUT", "DELETE"])
def news_detail(request, pk):
    todo = get_object_or_404(news, id=pk)

    if request.method == "GET":
        serializer = newsSerializer(todo)
        return Response(serializer.data)

    elif request.method in ["PUT", "PATCH"]:
        serializer = newsSerializer(todo, data=request.data, partial=True)  # Allow partial updates for PATCH
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
