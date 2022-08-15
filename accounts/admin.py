from django.contrib import admin

from .models import User


class UserAdmin(admin.ModelAdmin):
    exclude = ["password"]
    list_display = ["email", "full_name", "contact_no"]
    search_fields = ["email", "full_name", "contact_no"]


admin.site.register(User, UserAdmin)
