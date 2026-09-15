"""
AgriSmart AI - IoT Sensor Gateway & Telemetry Stream Engine (Bonus Module F)
Conforms to Section 12 IoT Architecture:
Sensors -> ESP32/RPi -> Cloud/API -> AI/ML Engine -> Recommendation Engine -> Web/Mobile App -> Farmer
"""

import time
import math
import random
from datetime import datetime, timedelta

def get_live_iot_telemetry(node_id="ESP32-AGRI-GATEWAY-01"):
    """
    Generates realistic dynamic telemetry stream representing live field sensor probes.
    Includes diurnal solar curve variations and calibrated agricultural thresholds.
    """
    now = datetime.now()
    hour = now.hour + (now.minute / 60.0)
    
    # Diurnal temperature cycle: peak around 14:00 (2 PM), low around 05:00 (5 AM)
    temp_variation = math.sin((hour - 8.0) * math.pi / 12.0)
    ambient_temp = round(28.0 + (temp_variation * 6.5) + random.uniform(-0.4, 0.4), 1)
    soil_temp = round(24.5 + (temp_variation * 3.2) + random.uniform(-0.2, 0.2), 1)
    
    # Humidity inversely related to temperature
    ambient_humidity = round(max(35.0, min(95.0, 65.0 - (temp_variation * 18.0) + random.uniform(-1.5, 1.5))), 1)
    
    # Soil moisture naturally drifts downward during day
    base_moisture = 27.5 - (max(0, temp_variation) * 2.5) + random.uniform(-0.3, 0.3)
    soil_moisture = round(max(12.0, min(48.0, base_moisture)), 1)
    
    # Soil pH (healthy slightly acidic/neutral 6.5 - 7.2)
    soil_ph = round(6.8 + random.uniform(-0.15, 0.15), 2)
    
    # N-P-K nutrient sensor (mg/kg)
    nitrogen_mg_kg = int(140 + random.randint(-5, 5))
    phosphorus_mg_kg = int(38 + random.randint(-2, 2))
    potassium_mg_kg = int(185 + random.randint(-6, 6))
    
    # Threshold condition evaluations
    moisture_status = "Optimal" if soil_moisture >= 25.0 else ("Dry (Irrigation Needed)" if soil_moisture < 22.0 else "Adequate")
    ph_status = "Optimal (Neutral)" if 6.2 <= soil_ph <= 7.5 else ("Acidic" if soil_ph < 6.2 else "Alkaline")
    
    return {
        "device_meta": {
            "node_id": node_id,
            "hardware": "ESP32-WROOM-32D / Raspberry Pi 4 Gateway",
            "firmware_version": "v2.4.1-AgriSense",
            "communication_protocol": "MQTT / HTTPS REST Stream",
            "signal_rssi_dbm": random.randint(-68, -58),
            "battery_level_pct": 94,
            "solar_charging": 10 <= now.hour <= 17,
            "last_synced_timestamp": now.isoformat(),
            "status": "ONLINE_STREAMING"
        },
        "readings": {
            "soil_moisture_pct": {
                "value": soil_moisture,
                "unit": "%",
                "sensor": "Capacitive Soil Moisture Probe v1.2",
                "status": moisture_status,
                "threshold_min": 22.0,
                "threshold_max": 40.0
            },
            "soil_temperature_c": {
                "value": soil_temp,
                "unit": "°C",
                "sensor": "DS18B20 Waterproof Thermal Probe",
                "status": "Optimal"
            },
            "ambient_temperature_c": {
                "value": ambient_temp,
                "unit": "°C",
                "sensor": "DHT22 / SHT31 Ambient Sensor",
                "status": "Warm" if ambient_temp > 34 else "Normal"
            },
            "ambient_humidity_pct": {
                "value": ambient_humidity,
                "unit": "%",
                "sensor": "DHT22 / SHT31 Humidity Sensor",
                "status": "High (Fungal Watch)" if ambient_humidity > 78 else "Normal"
            },
            "soil_ph": {
                "value": soil_ph,
                "unit": "pH",
                "sensor": "Industrial Glass Electrode pH Sensor",
                "status": ph_status,
                "optimal_range": "6.5 - 7.2"
            },
            "npk_nutrients": {
                "nitrogen_mg_kg": nitrogen_mg_kg,
                "phosphorus_mg_kg": phosphorus_mg_kg,
                "potassium_mg_kg": potassium_mg_kg,
                "unit": "mg/kg (ppm)",
                "sensor": "RS485 Soil NPK Sensor Probe",
                "status": "Balanced"
            }
        }
    }

def get_telemetry_history(hours=24):
    """
    Returns historical time-series for visual graphing and telemetry trend analysis.
    """
    history = []
    now = datetime.now()
    
    for i in range(hours, -1, -2):
        point_time = now - timedelta(hours=i)
        hr = point_time.hour
        t_var = math.sin((hr - 8.0) * math.pi / 12.0)
        
        history.append({
            "timestamp": point_time.strftime("%H:%M"),
            "soil_moisture": round(28.0 - (max(0, t_var) * 3.0) + (i % 3) * 0.4, 1),
            "ambient_temp": round(26.0 + (t_var * 7.0), 1),
            "humidity": round(max(40, 68.0 - (t_var * 20.0)), 1),
            "soil_ph": round(6.8 + (i % 2) * 0.05, 2)
        })
    return history

def get_iot_architecture_doc():
    """Returns documentation of Section 12 IoT Architecture."""
    return {
        "title": "AgriSmart AI End-to-End IoT & Telemetry Architecture",
        "diagram_flow": "Sensors (Real/Simulated) -> ESP32 / Raspberry Pi -> Cloud / API -> AI/ML Engine -> Recommendation Engine -> Web/Mobile App -> Farmer",
        "layers": {
            "1_Perception_Layer": ["Capacitive Soil Moisture Probe", "DS18B20 Soil Temp", "DHT22 Ambient", "Analog pH", "RS485 NPK"],
            "2_Edge_Gateway": ["ESP32-WROOM-32D with FreeRTOS", "ADC calibration & anti-noise Kalman filter", "JSON payload serialization"],
            "3_Transport_Layer": ["HTTPS REST / MQTT broker", "AES-128 telemetry encryption", "Automatic offline queueing"],
            "4_AI_Intelligence_Layer": ["FAO-56 Evapotranspiration Model", "Agentic Autonomous Advisor", "Predictive Irrigation Thresholds"],
            "5_Application_Layer": ["Interactive Farmer Dashboard", "Live Gauges", "SMS/Push Automated Alerts"]
        }
    }
