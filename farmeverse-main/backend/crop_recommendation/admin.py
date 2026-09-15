from django.contrib import admin
from .models import CropRecommendationLog

@admin.register(CropRecommendationLog)
class CropRecommendationLogAdmin(admin.ModelAdmin):
    list_display = ('recommended_crop', 'confidence', 'city', 'district', 'soil_type', 'season', 'rainfall', 'user', 'created_at')
    list_filter = ('season', 'soil_type', 'district', 'recommended_crop')
    search_fields = ('recommended_crop', 'city', 'district', 'user__full_name', 'user__mobile')
