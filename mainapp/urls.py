from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("about/", views.about, name="about"),
    path("blog/", views.blog, name="blog"),
    path("contact/", views.contact, name="contact"),
    path("faq/", views.faq, name="faq"),
    path("pricing/", views.pricing, name="pricing"),
    path("services/", views.services, name="services"),
    path("team/", views.team, name="team"),
    path("privacy/", views.privacy, name="privacy"),
    path("help/", views.help, name="help"),
    path("thankyou/", views.thankyou, name="thankyou"),   # ← landing page
]
