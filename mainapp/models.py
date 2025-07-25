from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='services/')
    icon = models.CharField(max_length=50)  # e.g., "icon-custom-software"

    def __str__(self):
        return self.title

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    image = models.ImageField(upload_to='team/')
    facebook = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    youtube = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Testimonial(models.Model):
    quote = models.TextField()
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# app/models.py
from django.db import models

class Contact(models.Model):
    SERVICE_CHOICES = [
        ("ml", "Machine Learning"),
        ("ai", "Artificial Intelligence"),
        ("ar", "Augmented Reality"),
        ("sd", "Software Development"),
    ]

    name     = models.CharField(max_length=100)
    email    = models.EmailField()
    service  = models.CharField(max_length=2, choices=SERVICE_CHOICES)
    message  = models.TextField()
    created  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} – {self.email}"
