from django.contrib import admin
from .models import OTP

@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ('mobile', 'otp_code', 'purpose', 'created_at', 'expires_at', 'is_expired')
    list_filter = ('purpose', 'created_at')
    search_fields = ('mobile', 'otp_code')
    ordering = ('-created_at',)
