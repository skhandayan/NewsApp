from django.db import models

# Create your models here.


class news(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True) 
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)


    def __str__(self):
        return self.title