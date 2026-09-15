from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .services import run_agentic_reasoning_loop

class AgenticAdvisorInsightsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        insights = run_agentic_reasoning_loop()
        return Response({"success": True, "data": insights}, status=status.HTTP_200_OK)

    def post(self, request):
        farm_context = request.data.get("farm_context", {})
        insights = run_agentic_reasoning_loop(farm_context=farm_context)
        return Response({"success": True, "data": insights}, status=status.HTTP_200_OK)

class AgenticAdvisorPingView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"status": "online", "module": "Agentic Autonomous Advisor (Bonus Module G)"})
