from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .services import calculate_sustainability_score, get_reproducible_formula_doc

class SustainabilityCalculateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = request.data
            irrigation_method = data.get("irrigation_method", "Drip")
            uses_weather_scheduling = bool(data.get("uses_weather_scheduling", True))
            uses_soil_sensors = bool(data.get("uses_soil_sensors", True))
            organic_fertilizer_pct = float(data.get("organic_fertilizer_pct", 40.0))
            follows_soil_health_card = bool(data.get("follows_soil_health_card", True))
            practices_crop_rotation = bool(data.get("practices_crop_rotation", True))
            uses_bio_pesticides = bool(data.get("uses_bio_pesticides", True))
            uses_ai_disease_detection = bool(data.get("uses_ai_disease_detection", True))
            farm_area_acres = float(data.get("farm_area_acres", 3.5))

            result = calculate_sustainability_score(
                irrigation_method=irrigation_method,
                uses_weather_scheduling=uses_weather_scheduling,
                uses_soil_sensors=uses_soil_sensors,
                organic_fertilizer_pct=organic_fertilizer_pct,
                follows_soil_health_card=follows_soil_health_card,
                practices_crop_rotation=practices_crop_rotation,
                uses_bio_pesticides=uses_bio_pesticides,
                uses_ai_disease_detection=uses_ai_disease_detection,
                farm_area_acres=farm_area_acres
            )
            return Response({"success": True, "data": result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SustainabilityFormulaDocView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        doc = get_reproducible_formula_doc()
        return Response({"success": True, "formula_documentation": doc}, status=status.HTTP_200_OK)
