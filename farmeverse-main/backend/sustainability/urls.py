from django.urls import path
from .views import SustainabilityCalculateView, SustainabilityFormulaDocView

urlpatterns = [
    path('calculate/', SustainabilityCalculateView.as_view(), name='sustainability-calculate'),
    path('formula/', SustainabilityFormulaDocView.as_view(), name='sustainability-formula'),
]
