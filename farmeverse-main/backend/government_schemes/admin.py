from django.contrib import admin
from .models import GovernmentScheme

@admin.register(GovernmentScheme)
class GovernmentSchemeAdmin(admin.ModelAdmin):
    list_display = ('scheme_name', 'scheme_type', 'department', 'status', 'featured', 'start_date', 'end_date', 'is_deleted')
    list_filter = ('scheme_type', 'status', 'featured', 'is_deleted')
    search_fields = ('scheme_name', 'title', 'gujarati_name', 'department', 'description', 'farmer_category', 'crop_category')
