from rest_framework import serializers
from .models import news


class newsSerializer(serializers.ModelSerializer):
    class Meta:
        model = news
        fields = ["id", "title", "description", "photo"]