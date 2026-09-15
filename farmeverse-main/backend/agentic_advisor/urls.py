from django.urls import path
from .views import AgenticAdvisorInsightsView, AgenticAdvisorPingView

urlpatterns = [
    path('ping/', AgenticAdvisorPingView.as_view(), name='agentic-advisor-ping'),
    path('insights/', AgenticAdvisorInsightsView.as_view(), name='agentic-advisor-insights'),
    path('run-loop/', AgenticAdvisorInsightsView.as_view(), name='agentic-advisor-run-loop'),
]
