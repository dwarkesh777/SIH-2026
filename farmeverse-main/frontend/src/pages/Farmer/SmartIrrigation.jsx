import React, { useState, useEffect } from 'react';
import { FiDroplet, FiSun, FiCloudRain, FiClock, FiActivity, FiCheckCircle, FiAlertCircle, FiInfo, FiZap, FiRefreshCw } from 'react-icons/fi';
import { smartIrrigationAPI, iotAPI, weatherAPI } from '../../services/api';

export default function SmartIrrigation() {
    const [cropType, setCropType] = useState('Cotton');
    const [growthStage, setGrowthStage] = useState('Flowering');
    const [soilType, setSoilType] = useState('Black Cotton Soil');
    const [soilMoisture, setSoilMoisture] = useState(26);
    const [irrigationMethod, setIrrigationMethod] = useState('Drip');
    const [temperature, setTemperature] = useState(32);
    const [humidity, setHumidity] = useState(60);
    const [rainProb, setRainProb] = useState(20);
    const [expectedRain, setExpectedRain] = useState(0);

    const [loading, setLoading] = useState(false);
    const [syncingIoT, setSyncingIoT] = useState(false);
    const [result, setResult] = useState(null);

    // Auto sync from IoT and Weather on load
    const syncLiveTelemetry = async () => {
        try {
            setSyncingIoT(true);
            const iotRes = await iotAPI.getLiveTelemetry();
            if (iotRes.success && iotRes.telemetry) {
                const r = iotRes.telemetry.readings;
                setSoilMoisture(r.soil_moisture_pct.value);
                setTemperature(r.ambient_temperature_c.value);
                setHumidity(r.ambient_humidity_pct.value);
            }
        } catch (err) {
            console.error("IoT sync error:", err);
        } finally {
            setSyncingIoT(false);
        }
    };

    const handleCalculate = async () => {
        setLoading(true);
        try {
            const res = await smartIrrigationAPI.predict({
                crop_type: cropType,
                growth_stage: growthStage,
                soil_type: soilType,
                soil_moisture_pct: parseFloat(soilMoisture),
                temperature_c: parseFloat(temperature),
                humidity_pct: parseFloat(humidity),
                rain_probability_pct: parseFloat(rainProb),
                expected_rain_mm: parseFloat(expectedRain),
                irrigation_method: irrigationMethod
            });
            if (res.success && res.data) {
                setResult(res.data);
            }
        } catch (err) {
            console.error("Irrigation calculation error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        syncLiveTelemetry();
        handleCalculate();
    }, []);

    return (
        <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 text-white p-6 md:p-8 rounded-3xl shadow-sm border border-teal-500/20 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-semibold tracking-wider font-mono border border-white/20">
                            BONUS MODULE B
                        </span>
                        <span className="bg-white/15 text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                            FAO-56 Dual-Crop Model
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black font-sans">
                        Smart Irrigation Intelligence
                    </h1>
                    <p className="text-xs md:text-sm text-teal-50/90 max-w-2xl mt-1">
                        Predict precise root-zone irrigation requirements, prevent over-watering, and schedule pumping based on live soil moisture and rain forecasts.
                    </p>
                </div>

                <button
                    onClick={syncLiveTelemetry}
                    disabled={syncingIoT}
                    className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2.5 rounded-2xl border border-white/20 backdrop-blur-md transition-all shadow-sm"
                >
                    <FiRefreshCw className={syncingIoT ? "animate-spin text-amber-300" : ""} size={16} />
                    <span>{syncingIoT ? "Syncing IoT..." : "Sync Live IoT Probes"}</span>
                </button>
            </div>

            {/* Main Form + Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Input Parameters (5 Cols) */}
                <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <FiActivity className="text-teal-700" />
                        <span>Farm & Climate Parameters</span>
                    </h2>

                    {/* Crop & Stage */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Crop Type</label>
                            <select
                                value={cropType}
                                onChange={(e) => setCropType(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="Cotton">Cotton</option>
                                <option value="Groundnut">Groundnut</option>
                                <option value="Wheat">Wheat</option>
                                <option value="Tomato">Tomato</option>
                                <option value="Potato">Potato</option>
                                <option value="Corn">Corn</option>
                                <option value="Mustard">Mustard</option>
                                <option value="Rice">Rice</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Growth Stage</label>
                            <select
                                value={growthStage}
                                onChange={(e) => setGrowthStage(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="Initial">Initial (Germination)</option>
                                <option value="Vegetative">Vegetative Growth</option>
                                <option value="Flowering">Flowering Stage</option>
                                <option value="Yield Formation">Yield Formation</option>
                                <option value="Maturity">Maturity / Harvest</option>
                            </select>
                        </div>
                    </div>

                    {/* Soil Type & Irrigation Method */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Soil Type</label>
                            <select
                                value={soilType}
                                onChange={(e) => setSoilType(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="Black Cotton Soil">Black Cotton Soil</option>
                                <option value="Loamy Soil">Loamy Soil</option>
                                <option value="Sandy Loam">Sandy Loam</option>
                                <option value="Clay Loam">Clay Loam</option>
                                <option value="Alluvial Soil">Alluvial Soil</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Irrigation System</label>
                            <select
                                value={irrigationMethod}
                                onChange={(e) => setIrrigationMethod(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="Drip">Drip Irrigation (90% eff.)</option>
                                <option value="Sprinkler">Sprinkler (75% eff.)</option>
                                <option value="Flood">Flood / Furrow (55% eff.)</option>
                            </select>
                        </div>
                    </div>

                    {/* Soil Moisture Slider */}
                    <div>
                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span>Soil Moisture (%)</span>
                            <span className="text-teal-700 font-mono text-sm">{soilMoisture}%</span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="50"
                            step="0.5"
                            value={soilMoisture}
                            onChange={(e) => setSoilMoisture(e.target.value)}
                            className="w-full accent-teal-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
                        />
                    </div>

                    {/* Weather Details (Temp, Rain, Rain prob) */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 mb-1">Temp (°C)</label>
                            <input
                                type="number"
                                value={temperature}
                                onChange={(e) => setTemperature(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 text-xs font-mono font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 mb-1">Rain Prob (%)</label>
                            <input
                                type="number"
                                value={rainProb}
                                onChange={(e) => setRainProb(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 text-xs font-mono font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 mb-1">Rain (mm)</label>
                            <input
                                type="number"
                                value={expectedRain}
                                onChange={(e) => setExpectedRain(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 text-xs font-mono font-semibold"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleCalculate}
                        disabled={loading}
                        className="w-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-sm mt-2"
                    >
                        <FiDroplet size={18} />
                        <span>{loading ? "Calculating Crop Water Balance..." : "Evaluate Irrigation Decision"}</span>
                    </button>
                </div>

                {/* Right: Decision Output Card (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {result ? (
                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                            {/* Decision Status Banner */}
                            <div className={`p-6 rounded-2xl flex items-start gap-4 border ${
                                result.status === 'IRRIGATE_NOW'
                                    ? 'bg-amber-500/10 border-amber-300 text-amber-900'
                                    : (result.status === 'DELAY_IRRIGATION'
                                        ? 'bg-blue-500/10 border-blue-300 text-blue-900'
                                        : 'bg-emerald-500/10 border-emerald-300 text-emerald-900')
                            }`}>
                                <div className={`p-3 rounded-xl text-white ${
                                    result.status === 'IRRIGATE_NOW' ? 'bg-amber-600' : (result.status === 'DELAY_IRRIGATION' ? 'bg-blue-600' : 'bg-emerald-600')
                                }`}>
                                    <FiDroplet size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-wider font-mono">
                                            Status: {result.status}
                                        </span>
                                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/80 border border-current">
                                            Urgency: {result.urgency}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black mt-1">{result.title}</h3>
                                    <p className="text-sm leading-relaxed mt-1 opacity-90">{result.action}</p>
                                </div>
                            </div>

                            {/* Water Balance Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100">
                                    <span className="text-[11px] font-bold text-gray-500 uppercase">Crop Daily ETc</span>
                                    <div className="text-xl font-black text-gray-900 mt-1">
                                        {result.metrics.crop_daily_etc_mm} <span className="text-xs font-semibold text-gray-400">mm/day</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400">Kc factor: {result.metrics.crop_coefficient_kc}</span>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100">
                                    <span className="text-[11px] font-bold text-gray-500 uppercase">Critical Depletion</span>
                                    <div className="text-xl font-black text-gray-900 mt-1">
                                        {result.metrics.critical_threshold_pct} <span className="text-xs font-semibold text-gray-400">%</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400">MAD threshold</span>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100">
                                    <span className="text-[11px] font-bold text-gray-500 uppercase">Water Needed</span>
                                    <div className="text-xl font-black text-gray-900 mt-1">
                                        {result.metrics.water_volume_liters_per_acre.toLocaleString()} <span className="text-xs font-semibold text-gray-400">L/acre</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400">{result.metrics.recommended_water_depth_mm} mm depth</span>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100">
                                    <span className="text-[11px] font-bold text-gray-500 uppercase">Pump Runtime</span>
                                    <div className="text-xl font-black text-teal-800 mt-1">
                                        {result.metrics.estimated_pump_runtime_hours} <span className="text-xs font-semibold text-gray-400">hrs</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400">5HP Pump benchmark</span>
                                </div>
                            </div>

                            {/* Scientific Methodology / Validation Note */}
                            <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200/80 text-xs text-teal-900">
                                <div className="flex items-center gap-1.5 font-bold mb-1">
                                    <FiCheckCircle className="text-teal-700" />
                                    <span>Scientific Model & Validation:</span>
                                </div>
                                <p className="text-teal-800 leading-relaxed">
                                    {result.scientific_validation.methodology}. {result.scientific_validation.validation_note}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center bg-white rounded-3xl border border-gray-100 text-gray-400">
                            Loading irrigation analysis...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
