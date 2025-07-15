from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.contrib import messages
from .models import Contact


# ───────────── static pages (unchanged) ─────────────
def index(request):      return render(request, "index.html")
def about(request):      return render(request, "about-us.html")
def blog(request):       return render(request, "blog.html")
def faq(request):        return render(request, "faq.html")
def pricing(request):    return render(request, "pricing.html")
def services(request):   return render(request, "services.html")
def team(request):       return render(request, "team.html")
def privacy(request):    return render(request, "privacy.html")
def help(request):       return render(request, "help.html")

# ───────────── thank‑you page ─────────────
def thankyou(request):
    return render(request, "thankyou.html")


# ───────────── contact (AJAX) ─────────────
def contact(request):
    """
    POST → save, send emails, return JSON {"redirect": "<url>"}
    GET  → show blank form
    """
    if request.method == "POST":
        # 1️⃣  grab fields
        name     = request.POST.get("name")
        email    = request.POST.get("email")
        service  = request.POST.get("service")   # e.g. "ml"
        message  = request.POST.get("message")

        # 2️⃣  save + get instance back
        contact = Contact.objects.create(
            name=name,
            email=email,
            service=service,
            message=message,
        )

        # convert "ml" → "Machine Learning"
        service_label = contact.get_service_display()

        # 3️⃣  notify staff
        staff_body = (
            f"Name: {name}\n"
            f"Email: {email}\n"
            f"Service: {service_label}\n\n"
            f"{message}"
        )
        EmailMessage(
            subject=f"New Contact from {name}",
            body=staff_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=["atanumaity62899@gmail.com"],
        ).send(fail_silently=False)

        # 4️⃣  auto‑reply to visitor
        user_body = render_to_string(
            "emails/auto_reply.txt",
            {"name": name, "service": service_label},
        )
        EmailMessage(
            subject="Thanks for contacting ZynCyber!",
            body=user_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[email],
        ).send(fail_silently=False)

        # 5️⃣  flash message (optional, shown on /thankyou/)
        messages.success(request, "Form submitted successfully!")

        # 6️⃣  instruct front‑end to redirect
        return JsonResponse({"redirect": reverse("thankyou")})

    # GET → render form
    return render(request, "contact.html")
