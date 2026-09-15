import React, { useState, useEffect } from 'react';
import { FiAward, FiDroplet, FiFeather, FiShield, FiTrendingUp, FiCheckCircle, FiInfo, FiCode, FiX, FiLayers } from 'react-icons/fi';
import { sustainabilityAPI } from '../../services/api';

export default function SustainabilityScore() {
    const [irrigationMethod, setIrrigationMethod] = useState('Drip');
    const [weatherScheduling, setWeatherScheduling] = useState(true);
    const [soilSensors, setSoilSensors] = useState(true);
    const [organicPct, setOrganicPct] = useState(45);
    const [soilHealthCard, setSoilHealthCard] = useState(true);
    const [cropRotation, setCropRotation] = useState(true);
    const [bioPesticides, setBioPesticides] = useState(true);
    const [aiDiseaseDetection, setAiDiseaseDetection] = useState(true);
    const [farmAcres, setFarmAcres] = useState(3.5);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [showFormulaModal, setShowFormulaModal] = useState(false);
    const [formulaDoc, setFormulaDoc] = useState(null);

    const calculateScore = async () => {
        setLoading(true);
        try {
            const res = await sustainabilityAPI.calculate({
                irrigation_method: irrigationMethod,
                uses_weather_scheduling: weatherScheduling,
                uses_soil_sensors: soilSensors,
                organic_fertilizer_pct: parseFloat(organicPct),
                follows_soil_health_card: soilHealthCard,
                practices_crop_rotation: cropRotation,
                uses_bio_pesticides: bioPesticides,
                uses_ai_disease_detection: aiDiseaseDetection,
                farm_area_acres: parseFloat(farmAcres)
            });
            if (res.success && res.data) {
                setResult(res.data);
            }
        } catch (err) {
            console.error("Failed to calculate sustainability score:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchFormulaDoc = async () => {
        try {
            const res = await sustainabilityAPI.getFormula();
            if (res.success && res.formula_documentation) {
                setFormulaDoc(res.formula_documentation);
                setShowFormulaModal(true);
            }
        } catch (err) {
            console.error("Formula doc fetch error:", err);
        }
    };

    useEffect(() => {
        calculateScore();
    }, [irrigationMethod, weatherScheduling, soilSensors, organicPct, soilHealthCard, cropRotation, bioPesticides, aiDiseaseDetection, farmAcres]);

    return (
        <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white p-6 md:p-8 rounded-3xl shadow-sm border border-emerald-500/20 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-semibold tracking-wider font-mono border border-white/20">
                            BONUS MODULE D
                        </span>
                        <span className="bg-white/15 text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                            Reproducible Eco-Scoring Model
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black font-sans">
                        Farm Sustainability & Eco Score
                    </h1>
                    <p className="text-xs md:text-sm text-emerald-50/90 max-w-2xl mt-1">
                        Quantify water conservation, organic nutrient adoption, and carbon footprint reduction with transparent, reproducible scoring rules.
                    </p>
                </div>

                <button
                    onClick={fetchFormulaDoc}
                    className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2.5 rounded-2xl border border-white/20 backdrop-blur-md transition-all shadow-sm"
                >
                    <FiCode size={16} />
                    <span>View Published Scoring Formula</span>
                </button>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Input Control Matrix (5 Cols) */}
                <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                        <FiLayers className="text-emerald-700" />
                        <span>Farm Sustainable Practices Matrix</span>
                    </h2>

                    {/* Farm Size & Irrigation */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Farm Area (Acres)</label>
                            <input
                                type="number"
                                min="0.5"
                                max="100"
                                step="0.5"
                                value={farmAcres}
                                onChange={(e) => setFarmAcres(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-mono font-semibold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Irrigation System</label>
                            <select
                                value={irrigationMethod}
                                onChange={(e) => setIrrigationMethod(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="Drip">Micro-Drip Irrigation</option>
                                <option value="Sprinkler">Sprinkler Irrigation</option>
                                <option value="Flood">Flood / Furrow Irrigation</option>
                            </select>
                        </div>
                    </div>

                    {/* Organic % Slider */}
                    <div>
                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span>Organic Fertilizer / Compost Ratio</span>
                            <span className="text-emerald-700 font-mono text-sm">{organicPct}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={organicPct}
                            onChange={(e) => setOrganicPct(e.target.value)}
                            className="w-full accent-emerald-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
                        />
                    </div>

                    {/* Toggles Matrix */}
                    <div className="space-y-2.5 pt-2 border-t border-gray-100">
                        <label className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50/50 cursor-pointer transition-colors text-xs font-semibold text-gray-800">
                            <span>Weather-Based Rain Delay Scheduling</span>
                            <input
                                type="checkbox"
                                checked={weatherScheduling}
                                onChange={(e) => setWeatherScheduling(e.target.checked)}
                                className="w-4 h-4 accent-emerald-600 rounded"
                            />
                        </label>

                        <label className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50/50 cursor-pointer transition-colors text-xs font-semibold text-gray-800">
                            <span>IoT Soil Moisture & Telemetry Probes</span>
                            <input
                                type="checkbox"
                                checked={soilSensors}
                                onChange={(e) => setSoilSensors(e.target.checked)}
                                className="w-4 h-4 accent-emerald-600 rounded"
                            />
                        </label>

                        <label className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50/50 cursor-pointer transition-colors text-xs font-semibold text-gray-800">
                            <span>Soil Health Card Calibrated Nutrition</span>
                            <input
                                type="checkbox"
                                checked={soilHealthCard}
                                onChange={(e) => setSoilHealthCard(e.target.checked)}
                                className="w-4 h-4 accent-emerald-600 rounded"
                            />
                        </label>

                        <label className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50/50 cursor-pointer transition-colors text-xs font-semibold text-gray-800">
                            <span>Legume Crop Rotation / Cover Cropping</span>
                            <input
                                type="checkbox"
                                checked={cropRotation}
                                onChange={(e) => setCropRotation(e.target.checked)}
                                className="w-4 h-4 accent-emerald-600 rounded"
                            />
                        </label>

                        <label className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50/50 cursor-pointer transition-colors text-xs font-semibold text-gray-800">
                            <span>Neem Bio-Pesticides & Pheromone IPM</span>
                            <input
                                type="checkbox"
                                checked={bioPesticides}
                                onChange={(e) => setBioPesticides(e.target.checked)}
                                className="w-4 h-4 accent-emerald-600 rounded"
                            />
                        </label>
                    </div>
                </div>

                {/* Right: Score Card & Eco-Metrics (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {result ? (
                        <>
                            {/* Master Score Display */}
                            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-6">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
                                        Overall Sustainability Index
                                    </span>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="text-5xl font-black text-emerald-800">{result.overall_score}</span>
                                        <span className="text-lg font-bold text-gray-400">/ 100</span>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                                        <FiAward />
                                        <span>Tier: {result.tier}</span>
                                    </div>
                                </div>

                                {/* Quantified Impact Badges */}
                                <div className="space-y-2">
                                    <div className="bg-blue-50 px-4 py-2.5 rounded-2xl border border-blue-100 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                                            <FiDroplet size={16} />
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-blue-800">Annual Water Saved</span>
                                            <div className="text-sm font-black text-gray-900">
                                                {result.quantified_impact.water_saved_liters_annual.toLocaleString()} Liters
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                                            <FiFeather size={16} />
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-emerald-800">Carbon Offset</span>
                                            <div className="text-sm font-black text-gray-900">
                                                {result.quantified_impact.carbon_offset_kg_co2.toLocaleString()} kg CO₂e
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sub-scores Progress Breakdown */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                                <h3 className="text-sm font-bold text-gray-900">Component Score Breakdown</h3>
                                
                                <div className="space-y-3">
                                    {/* Water Score */}
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                                            <span>Water Efficiency (Weight: 40%)</span>
                                            <span className="text-blue-700">{result.sub_scores.water_efficiency.score} / 100</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                            <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${result.sub_scores.water_efficiency.score}%` }}></div>
                                        </div>
                                    </div>

                                    {/* Resource Score */}
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                                            <span>Resource & Soil Health (Weight: 35%)</span>
                                            <span className="text-emerald-700">{result.sub_scores.resource_management.score} / 100</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                            <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${result.sub_scores.resource_management.score}%` }}></div>
                                        </div>
                                    </div>

                                    {/* Health Score */}
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                                            <span>Crop Protection & IPM (Weight: 25%)</span>
                                            <span className="text-teal-700">{result.sub_scores.crop_health_eco.score} / 100</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                            <div className="bg-teal-600 h-full rounded-full transition-all duration-500" style={{ width: `${result.sub_scores.crop_health_eco.score}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actionable Improvement Checklist */}
                            {result.improvement_suggestions && result.improvement_suggestions.length > 0 && (
                                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-gray-900">
                                            Actionable Opportunities to Reach {result.potential_max_score} Pts
                                        </h3>
                                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                            High ROI Actions
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        {result.improvement_suggestions.map((sug, idx) => (
                                            <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-gray-100 text-xs flex items-start justify-between gap-3">
                                                <div>
                                                    <div className="font-bold text-gray-900">{sug.action}</div>
                                                    <div className="text-gray-500 mt-0.5">{sug.resource_benefit}</div>
                                                </div>
                                                <span className="font-bold text-emerald-700 whitespace-nowrap bg-emerald-100/70 px-2 py-1 rounded-lg">
                                                    {sug.impact}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : null}
                </div>
            </div>

            {/* Reproducible Formula Modal */}
            {showFormulaModal && formulaDoc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[85vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b pb-3">
                            <h3 className="font-bold text-base text-gray-900">{formulaDoc.title}</h3>
                            <button onClick={() => setShowFormulaModal(false)} className="p-1.5 text-gray-400 hover:text-gray-700">
                                <FiX size={20} />
                            </button>
                        </div>

                        <div className="bg-slate-900 text-emerald-300 p-4 rounded-2xl font-mono text-xs">
                            <strong>Master Formula:</strong><br />
                            {formulaDoc.master_equation}
                        </div>

                        <div className="space-y-3 text-xs text-gray-700">
                            {Object.entries(formulaDoc.components).map(([k, v]) => (
                                <div key={k} className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                                    <strong className="text-gray-900 block mb-1">{k}</strong>
                                    <div className="space-y-1 text-gray-600 text-[11px]">
                                        {Object.entries(v.weights).map(([wKey, wVal]) => (
                                            <div key={wKey}>• <strong>{wKey}:</strong> {wVal}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
