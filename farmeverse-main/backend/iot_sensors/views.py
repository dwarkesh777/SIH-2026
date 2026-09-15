from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .services import get_live_iot_telemetry, get_telemetry_history, get_iot_architecture_doc

class IoTTelemetryLiveView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        node_id = request.query_params.get("node_id", "ESP32-AGRI-GATEWAY-01")
        data = get_live_iot_telemetry(node_id=node_id)
        return Response({"success": True, "telemetry": data}, status=status.HTTP_200_OK)

class IoTTelemetryHistoryView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        hours = int(request.query_params.get("hours", 24))
        history = get_telemetry_history(hours=hours)
        return Response({"success": True, "history": history}, status=status.HTTP_200_OK)

class IoTArchitectureDocView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        doc = get_iot_architecture_doc()
        return Response({"success": True, "architecture": doc}, status=status.HTTP_200_OK)
