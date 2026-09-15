from django.urls import path
from .views import FarmerAssistantChatView, FarmerAssistantPingView

urlpatterns = [
    path('ping/', FarmerAssistantPingView.as_view(), name='farmer-assistant-ping'),
    path('chat/', FarmerAssistantChatView.as_view(), name='farmer-assistant-chat'),
]
