from django.contrib import admin
from .models import AgricultureExpert

@admin.register(AgricultureExpert)
class AgricultureExpertAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialization', 'qualification', 'district', 'experience', 'phone', 'email', 'rating', 'active_status')
    list_filter = ('district', 'specialization', 'active_status')
    search_fields = ('name', 'specialization', 'qualification', 'phone', 'email', 'district')
    ordering = ('-created_date',)
