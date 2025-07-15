# mainapp/admin.py
from django.contrib import admin
from .models import Service, TeamMember, Testimonial, Contact


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display  = ("id", "title")
    search_fields = ("title",)


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display  = ("id", "name", "role")
    search_fields = ("name", "role")


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display  = ("id", "name", "position")
    search_fields = ("name", "position")


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display   = ("id", "name", "email", "get_service_display", "created")
    search_fields  = ("name", "email")
    list_filter    = ("service", "created")
    ordering       = ("-created",)
    readonly_fields = ("created",)

    # optional: show service label instead of code in changelist
    def get_service_display(self, obj):
        return obj.get_service_display()
    get_service_display.short_description = "Service"
