from django.contrib import admin
from .models import WeatherRequestLog

@admin.register(WeatherRequestLog)
class WeatherRequestLogAdmin(admin.ModelAdmin):
    list_display = ('city', 'temperature', 'condition', 'user', 'created_at')
    list_filter = ('condition', 'created_at')
    search_fields = ('city', 'condition', 'user__full_name', 'user__mobile')
