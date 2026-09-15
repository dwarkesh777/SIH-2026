from django.urls import path
from .views import SmartIrrigationPredictionView, SmartIrrigationPingView

urlpatterns = [
    path('ping/', SmartIrrigationPingView.as_view(), name='smart-irrigation-ping'),
    path('predict/', SmartIrrigationPredictionView.as_view(), name='smart-irrigation-predict'),
]
