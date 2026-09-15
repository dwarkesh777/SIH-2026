from django.contrib import admin
from .models import Consultation, ConsultationReply, ExpertReview

class ConsultationReplyInline(admin.TabularInline):
    model = ConsultationReply
    extra = 0
    readonly_fields = ('created_date',)

@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
    list_display = ('id', 'subject', 'farmer', 'expert', 'status', 'created_date', 'is_deleted')
    list_filter = ('status', 'is_deleted', 'created_date')
    search_fields = ('subject', 'message', 'farmer__full_name', 'farmer__mobile', 'expert__name')
    inlines = [ConsultationReplyInline]

@admin.register(ConsultationReply)
class ConsultationReplyAdmin(admin.ModelAdmin):
    list_display = ('consultation', 'sender', 'created_date')
    list_filter = ('sender', 'created_date')
    search_fields = ('message', 'consultation__subject')

@admin.register(ExpertReview)
class ExpertReviewAdmin(admin.ModelAdmin):
    list_display = ('expert', 'farmer', 'rating', 'consultation', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('expert__name', 'farmer__full_name', 'review')
