"""
AgriSmart AI - Agentic Autonomous Agricultural Advisor (Bonus Module G)
Executes continuous OBSERVE -> REASON -> DECIDE -> ACT/NOTIFY cycle.
Exposes transparent decision loop audit trail and generates automated farmer advisories.
"""

from datetime import datetime
from iot_sensors.services import get_live_iot_telemetry
from smart_irrigation.services import evaluate_smart_irrigation

def run_agentic_reasoning_loop(farm_context=None):
    """
    Executes an end-to-end autonomous agent loop.
    Returns the reasoning chain and prioritized actionable decisions.
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    if farm_context is None:
        farm_context = {}
        
    crop = farm_context.get("crop", "Cotton")
    stage = farm_context.get("growth_stage", "Flowering")
    location = farm_context.get("location", "Rajkot, Gujarat")
    
    # 1. OBSERVE
    telemetry = get_live_iot_telemetry()
    readings = telemetry["readings"]
    
    soil_moisture = readings["soil_moisture_pct"]["value"]
    ambient_temp = readings["ambient_temperature_c"]["value"]
    ambient_humidity = readings["ambient_humidity_pct"]["value"]
    soil_ph = readings["soil_ph"]["value"]
    
    # Weather forecast context
    forecast_rain_prob = 15.0
    forecast_temp_max = 35.0
    
    observations = {
        "timestamp": timestamp,
        "crop_profile": f"{crop} ({stage}) at {location}",
        "sensor_inputs": {
            "soil_moisture_pct": soil_moisture,
            "ambient_temp_c": ambient_temp,
            "ambient_humidity_pct": ambient_humidity,
            "soil_ph": soil_ph
        },
        "meteorological_inputs": {
            "rain_probability_24h": f"{forecast_rain_prob}%",
            "forecast_peak_temp": f"{forecast_temp_max}°C",
            "wind_speed_kmh": "11 km/h"
        }
    }
    
    # 2. REASON (Multi-variable risk evaluation)
    reasoning_steps = []
    actions = []
    
    # Water stress evaluation
    if soil_moisture < 24.0 and forecast_rain_prob < 30:
        reasoning_steps.append({
            "variable": "Soil Moisture + Forecast",
            "observation": f"Moisture at {soil_moisture}% (below threshold 25%), no rain expected ({forecast_rain_prob}%).",
            "deduction": f"Crop '{crop}' in '{stage}' stage cannot tolerate moisture deficit without blossom abortion.",
            "severity": "HIGH"
        })
        actions.append({
            "id": "ACT-IRR-01",
            "priority": "URGENT",
            "category": "Smart Irrigation",
            "title": "Trigger Automated 45-Min Drip Cycle",
            "description": f"Soil moisture dropped to {soil_moisture}%. Peak afternoon heat ({forecast_temp_max}°C) will accelerate evapotranspiration.",
            "instruction": "Run drip irrigation for 45 minutes between 06:00 AM - 08:00 AM.",
            "impact": "Prevents flower dropping and conserves 3,500L water vs flood irrigation."
        })
    else:
        reasoning_steps.append({
            "variable": "Soil Moisture & Water Aeration",
            "observation": f"Moisture at {soil_moisture}% is within optimum comfort band.",
            "deduction": "Root zone water potential is healthy.",
            "severity": "NORMAL"
        })

    # Disease & Fungal risk evaluation
    if ambient_humidity > 70.0 and 24.0 <= ambient_temp <= 32.0:
        reasoning_steps.append({
            "variable": "Microclimate Fungal Index",
            "observation": f"Canopy humidity at {ambient_humidity}% combined with {ambient_temp}°C creates prime sporulation environment.",
            "deduction": "High risk of Leaf Spot / Powdery Mildew emergence in the next 48-72 hours.",
            "severity": "WARNING"
        })
        actions.append({
            "id": "ACT-IPM-02",
            "priority": "WARNING",
            "category": "Proactive Pest & Disease Prevention",
            "title": "Preventive Bio-Fungicide Foliar Spray Recommended",
            "description": "Fungal spore index is elevated due to sustained high relative humidity.",
            "instruction": "Spray Neem Oil (10,000 ppm @ 3ml/L) or Copper Oxychloride (2g/L) during safe spray window (07:00 AM - 09:30 AM).",
            "impact": "Averts up to 25% potential foliage damage before symptoms become visible."
        })

    # Soil pH & Nutrient evaluation
    if soil_ph > 7.8:
        reasoning_steps.append({
            "variable": "Soil pH & Micronutrient Availability",
            "observation": f"Soil pH is slightly alkaline ({soil_ph}).",
            "deduction": "Micronutrients like Zinc and Iron may have reduced root uptake.",
            "severity": "INFO"
        })
        actions.append({
            "id": "ACT-NUT-03",
            "priority": "INFO",
            "category": "Soil Health Management",
            "title": "Apply Chelated Zinc + Gypsum Amendment",
            "description": "Alkaline tendency detected in soil telemetry.",
            "instruction": "Apply 5kg/acre chelated micronutrient mix during next irrigation fertigation.",
            "impact": "Maintains chlorophyll density and balanced root nutrient absorption."
        })

    # 3. DECIDE (Synthesizing master advisory)
    primary_alert = actions[0] if actions else {
        "id": "ACT-OPT-00",
        "priority": "NORMAL",
        "category": "Farm Status",
        "title": "All Farm Parameters Balanced",
        "description": "Moisture, microclimate, and nutrient readings are within ideal agronomic ranges.",
        "instruction": "Maintain routine daily farm monitoring.",
        "impact": "Optimal plant growth conditions."
    }

    # 4. ACT / NOTIFY
    return {
        "agent_meta": {
            "agent_name": "AgriSmart Autonomous Reasoning Engine",
            "version": "v1.2-Autonomous",
            "decision_cycle": "OBSERVE -> REASON -> DECIDE -> ACT/NOTIFY",
            "last_cycle_timestamp": timestamp,
            "status": "ACTIVE_MONITORING"
        },
        "observations": observations,
        "reasoning_chain": reasoning_steps,
        "decisions_and_actions": actions,
        "primary_recommendation": primary_alert
    }
