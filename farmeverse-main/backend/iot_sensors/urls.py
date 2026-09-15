from django.urls import path
from .views import IoTTelemetryLiveView, IoTTelemetryHistoryView, IoTArchitectureDocView

urlpatterns = [
    path('live-telemetry/', IoTTelemetryLiveView.as_view(), name='iot-live-telemetry'),
    path('history/', IoTTelemetryHistoryView.as_view(), name='iot-telemetry-history'),
    path('architecture/', IoTArchitectureDocView.as_view(), name='iot-architecture-doc'),
]
