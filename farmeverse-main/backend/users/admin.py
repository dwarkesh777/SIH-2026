from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('mobile', 'full_name', 'email', 'role', 'is_verified', 'is_active', 'is_staff', 'created_at')
    list_filter = ('role', 'is_verified', 'is_active', 'is_staff')
    search_fields = ('mobile', 'full_name', 'email')
    ordering = ('-created_at',)
    readonly_fields = ('uuid', 'created_at', 'updated_at')
