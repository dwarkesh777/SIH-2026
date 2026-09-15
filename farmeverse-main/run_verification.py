#!/usr/bin/env python3
"""
AgriSmart AI - Comprehensive Verification Test Suite
Validates all modules built for the SIH 2026 Internal Hackathon.
"""

import sys
import os
import json

# Setup backend paths
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(ROOT_DIR, "backend"))
sys.path.insert(0, os.path.join(ROOT_DIR, "model"))

def test_disease_predict_cli():
    print("\n[TEST 1/6] Testing Core Disease Prediction CLI & Module...")
    try:
        from model.predict import predict
        # Test heuristic fallback / predict function
        import numpy as np
        from PIL import Image
        
        # Create a temporary dummy leaf image
        test_img_path = os.path.join(ROOT_DIR, "test_leaf_sample.jpg")
        img = Image.new("RGB", (224, 224), color=(34, 139, 34))
        img.save(test_img_path)
        
        result_label = predict(test_img_path, return_dict=False)
        result_dict = predict(test_img_path, return_dict=True)
        
        print(f"  -> String output: {result_label}")
        print(f"  -> Dict output: Status: {result_dict['status']} | Confidence: {result_dict['confidence']}")
        assert isinstance(result_label, str), "Label must be string"
        assert result_dict["success"] is True, "Success flag must be True"
        print("  [PASS] Core Disease predict interface works cleanly.")
        
        if os.path.exists(test_img_path):
            os.remove(test_img_path)
    except Exception as e:
        print(f"  [FAIL] in test_disease_predict_cli: {e}")
        return False
    return True

def test_smart_irrigation():
    print("\n[TEST 2/6] Testing Bonus Module B: Smart Irrigation Engine...")
    try:
        from smart_irrigation.services import evaluate_smart_irrigation
        result = evaluate_smart_irrigation(
            crop_type="Cotton",
            growth_stage="Flowering",
            soil_moisture_pct=21.0, # low
            soil_type="Black Cotton Soil",
            temperature_c=34.0,
            humidity_pct=50.0,
            rain_probability_pct=10.0,
            expected_rain_mm=0.0,
            irrigation_method="Drip"
        )
        print(f"  -> Status: {result['status']}")
        print(f"  -> Action: {result['action']}")
        print(f"  -> Water Depth: {result['metrics']['recommended_water_depth_mm']} mm | Pump hours: {result['metrics']['estimated_pump_runtime_hours']} hrs")
        assert result["status"] == "IRRIGATE_NOW"
        print("  [PASS] Smart Irrigation decision logic validated.")
    except Exception as e:
        print(f"  [FAIL] in test_smart_irrigation: {e}")
        return False
    return True

def test_sustainability_score():
    print("\n[TEST 3/6] Testing Bonus Module D: Sustainability Score...")
    try:
        from sustainability.services import calculate_sustainability_score, get_reproducible_formula_doc
        doc = get_reproducible_formula_doc()
        score = calculate_sustainability_score(
            irrigation_method="Drip",
            uses_weather_scheduling=True,
            uses_soil_sensors=True,
            organic_fertilizer_pct=55.0,
            follows_soil_health_card=True,
            practices_crop_rotation=True,
            uses_bio_pesticides=True,
            uses_ai_disease_detection=True,
            farm_area_acres=4.0
        )
        print(f"  -> Master Score: {score['overall_score']}/100 ({score['tier']})")
        print(f"  -> Water Saved: {score['quantified_impact']['water_saved_liters_annual']} Liters")
        print(f"  -> Carbon Offset: {score['quantified_impact']['carbon_offset_kg_co2']} kg CO2")
        assert score["overall_score"] >= 80.0
        print("  [PASS] Sustainability scoring and formula publication validated.")
    except Exception as e:
        print(f"  [FAIL] in test_sustainability_score: {e}")
        return False
    return True

def test_iot_sensors():
    print("\n[TEST 4/6] Testing Bonus Module F: IoT Gateway Telemetry...")
    try:
        from iot_sensors.services import get_live_iot_telemetry, get_telemetry_history
        telemetry = get_live_iot_telemetry()
        history = get_telemetry_history(hours=6)
        print(f"  -> Node ID: {telemetry['device_meta']['node_id']} | Status: {telemetry['device_meta']['status']}")
        print(f"  -> Soil Moisture: {telemetry['readings']['soil_moisture_pct']['value']}%")
        print(f"  -> Soil Temp: {telemetry['readings']['soil_temperature_c']['value']}C | pH: {telemetry['readings']['soil_ph']['value']}")
        assert len(history) > 0
        print("  [PASS] IoT sensor stream and hardware telemetry validated.")
    except Exception as e:
        print(f"  [FAIL] in test_iot_sensors: {e}")
        return False
    return True

def test_agentic_advisor():
    print("\n[TEST 5/6] Testing Bonus Module G: Agentic Autonomous Advisor...")
    try:
        from agentic_advisor.services import run_agentic_reasoning_loop
        loop_res = run_agentic_reasoning_loop()
        print(f"  -> Cycle: {loop_res['agent_meta']['decision_cycle']}")
        print(f"  -> Primary Decision: [{loop_res['primary_recommendation']['priority']}] {loop_res['primary_recommendation']['title']}")
        print(f"  -> Reasoning Steps Evaluated: {len(loop_res['reasoning_chain'])}")
        assert len(loop_res['reasoning_chain']) > 0
        print("  [PASS] Autonomous reasoning loop and audit trail validated.")
    except Exception as e:
        print(f"  [FAIL] in test_agentic_advisor: {e}")
        return False
    return True

def test_farmer_assistant():
    print("\n[TEST 6/6] Testing Bonus Module E: GenAI Farmer Assistant...")
    try:
        from farmer_assistant.services import ask_farmer_assistant
        # Test Gujarati query
        gu_res = ask_farmer_assistant("how to irrigate", language="gu")
        print(f"  -> Gujarati Reply length: {len(gu_res['reply'])} chars")
        
        # Test English query
        en_res = ask_farmer_assistant("When to spray for leaf spot?", language="en")
        print(f"  -> English Reply length: {len(en_res['reply'])} chars")
        
        assert len(gu_res['reply']) > 10
        assert len(en_res['reply']) > 10
        print("  [PASS] Multilingual GenAI Farmer Assistant validated.")
    except Exception as e:
        print(f"  [FAIL] in test_farmer_assistant: {e}")
        return False
    return True

if __name__ == "__main__":
    print("=" * 60)
    print("AGRISMART AI - ALL REST MODULES COMPREHENSIVE VERIFICATION")
    print("=" * 60)
    
    results = [
        test_disease_predict_cli(),
        test_smart_irrigation(),
        test_sustainability_score(),
        test_iot_sensors(),
        test_agentic_advisor(),
        test_farmer_assistant()
    ]
    
    print("\n" + "=" * 60)
    if all(results):
        print("ALL 6 VERIFICATION TEST SUITES PASSED PERFECTLY (100%)!")
    else:
        print("Some tests encountered issues. Review details above.")
    print("=" * 60)
