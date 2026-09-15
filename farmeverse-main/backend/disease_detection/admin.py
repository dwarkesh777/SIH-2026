from django.contrib import admin
from .models import DiseaseDetection

@admin.register(DiseaseDetection)
class DiseaseDetectionAdmin(admin.ModelAdmin):
    list_display = ('crop', 'prediction', 'confidence', 'status', 'farmer', 'farm', 'created_at')
    list_filter = ('status', 'crop', 'created_at')
    search_fields = ('crop', 'prediction', 'farmer__full_name', 'farmer__mobile')
