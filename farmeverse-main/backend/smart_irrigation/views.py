from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .services import evaluate_smart_irrigation

class SmartIrrigationPredictionView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = request.data
            crop_type = data.get("crop_type", "Cotton")
            growth_stage = data.get("growth_stage", "Flowering")
            soil_moisture_pct = float(data.get("soil_moisture_pct", 26.0))
            soil_type = data.get("soil_type", "Black Cotton Soil")
            temperature_c = float(data.get("temperature_c", 32.0))
            humidity_pct = float(data.get("humidity_pct", 60.0))
            rain_probability_pct = float(data.get("rain_probability_pct", 20.0))
            expected_rain_mm = float(data.get("expected_rain_mm", 0.0))
            irrigation_method = data.get("irrigation_method", "Drip")

            result = evaluate_smart_irrigation(
                crop_type=crop_type,
                growth_stage=growth_stage,
                soil_moisture_pct=soil_moisture_pct,
                soil_type=soil_type,
                temperature_c=temperature_c,
                humidity_pct=humidity_pct,
                rain_probability_pct=rain_probability_pct,
                expected_rain_mm=expected_rain_mm,
                irrigation_method=irrigation_method
            )
            return Response({"success": True, "data": result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SmartIrrigationPingView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"status": "online", "module": "Smart Irrigation Engine (Bonus Module B)"})
