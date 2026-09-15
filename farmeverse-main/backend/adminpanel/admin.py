from django.contrib import admin
from .models import AdminProfile

@admin.register(AdminProfile)
class AdminProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'username', 'language', 'theme')
    search_fields = ('user__full_name', 'user__mobile', 'user__email', 'username')
