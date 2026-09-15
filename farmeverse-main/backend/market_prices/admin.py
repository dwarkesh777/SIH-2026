from django.contrib import admin
from .models import MarketPrice

@admin.register(MarketPrice)
class MarketPriceAdmin(admin.ModelAdmin):
    list_display = ('crop_name', 'crop_name_gu', 'market_name', 'district_name', 'modal_price', 'min_price', 'max_price', 'price_date', 'source')
    list_filter = ('district_name', 'market_name', 'price_date', 'source')
    search_fields = ('crop_name', 'crop_name_gu', 'market_name', 'district_name')
    ordering = ('-price_date', 'market_name', 'crop_name')
