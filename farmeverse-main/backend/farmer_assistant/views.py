from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .services import ask_farmer_assistant

class FarmerAssistantChatView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            query = request.data.get("query", "").strip()
            if not query:
                return Response(
                    {"success": False, "error": "Query cannot be empty."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            language = request.data.get("language", "gu")
            context = request.data.get("context", {})
            
            result = ask_farmer_assistant(query=query, language=language, context=context)
            return Response({"success": True, "data": result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FarmerAssistantPingView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"status": "online", "module": "Grounded GenAI Farmer Assistant (Bonus Module E)"})
