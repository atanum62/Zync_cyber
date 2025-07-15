from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.contrib import messages
from .models import Contact

# ------------- static pages -------------
def index(request):      return render(request, "index.html")
def about(request):      return render(request, "about-us.html")
def blog(request):       return render(request, "blog.html")
def faq(request):        return render(request, "faq.html")
def pricing(request):    return render(request, "pricing.html")
def services(request):   return render(request, "services.html")
def team(request):       return render(request, "team.html")
def privacy(request):    return render(request, "privacy.html")
def help(request):       return render(request, "help.html")

# ------------- thank‑you page -----------
def thankyou(request):
    return render(request, "thankyou.html")

# ------------- contact (AJAX) -----------
def contact(request):
    """
    POST → save, email, return JSON {redirect: "<url>"}
    GET  → show blank form
    """
    if request.method == "POST":
        # grab fields
        name    = request.POST.get("name")
        email   = request.POST.get("email")
        service = request.POST.get("service")
        message = request.POST.get("message")

        # save
        Contact.objects.create(
            name=name, email=email, service=service, message=message
        )

        # notify staff
        EmailMessage(
            f"New Contact from {name}",
            f"Name: {name}\nEmail: {email}\nService: {service}\n\n{message}",
            settings.DEFAULT_FROM_EMAIL,
            ["atanumaity62899@gmail.com"],
        ).send(fail_silently=False)

        # auto‑reply
        user_body = render_to_string(
            "emails/auto_reply.txt", {"name": name, "service": service}
        )
        EmailMessage(
            "Thanks for contacting ZynCyber!",
            user_body,
            settings.DEFAULT_FROM_EMAIL,
            [email],
        ).send(fail_silently=False)

        # flash msg (optional)
        messages.success(request, "Form submitted successfully!")

        # JSON tells front‑end to redirect
        return JsonResponse({"redirect": reverse("thankyou")})

    # GET
    return render(request, "contact.html")
