from django.contrib import admin
from .models import Farm, Crop, Expense, Sales, Notification

@admin.register(Farm)
class FarmAdmin(admin.ModelAdmin):
    list_display = ('farm_name', 'farmer', 'village', 'taluka', 'district', 'total_area', 'area_unit', 'soil_type', 'created_at')
    list_filter = ('district', 'soil_type', 'irrigation_type', 'area_unit')
    search_fields = ('farm_name', 'village', 'taluka', 'district', 'farmer__full_name', 'farmer__mobile')

@admin.register(Crop)
class CropAdmin(admin.ModelAdmin):
    list_display = ('crop_name', 'crop_variety', 'farm', 'season', 'crop_status', 'disease_status', 'area_used', 'total_cost', 'created_at')
    list_filter = ('season', 'crop_status', 'disease_status')
    search_fields = ('crop_name', 'crop_variety', 'farm__farm_name', 'farm__farmer__full_name')

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('expense_type', 'amount', 'crop', 'expense_date', 'created_at')
    list_filter = ('expense_type', 'expense_date')
    search_fields = ('expense_type', 'description', 'crop__crop_name')

@admin.register(Sales)
class SalesAdmin(admin.ModelAdmin):
    list_display = ('crop', 'market_yard', 'sold_quantity', 'price_per_kg', 'total_revenue', 'sale_date')
    list_filter = ('market_yard', 'sale_date')
    search_fields = ('crop__crop_name', 'market_yard')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'expert', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('title', 'message', 'user__full_name', 'user__mobile', 'expert__name')
