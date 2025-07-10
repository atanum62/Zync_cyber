from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from .models import Service, TeamMember, Testimonial

def home(request):
    services = Service.objects.all()
    team_members = TeamMember.objects.all()
    testimonials = Testimonial.objects.all()
    context = {
        'services': services,
        'team_members': team_members,
        'testimonials': testimonials,
    }
    return render(request, 'home.html', context)

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('mail')
        message = request.POST.get('message')
        service = request.POST.get('service')
        send_mail(
            subject=f'New Contact Form Submission from {name}',
            message=f'Name: {name}\nEmail: {email}\nService: {service}\nMessage: {message}',
            from_email=email,
            recipient_list=[settings.EMAIL_HOST_USER],  # Configure in settings.py
        )
        return redirect('home')  # Redirect to home after submission
    return render(request, 'home.html')