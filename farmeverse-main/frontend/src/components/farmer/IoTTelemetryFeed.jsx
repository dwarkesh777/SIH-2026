import React, { useState, useEffect } from 'react';
import { FiCpu, FiDroplet, FiThermometer, FiSun, FiActivity, FiRefreshCw, FiWifi, FiBatteryCharging } from 'react-icons/fi';
import { iotAPI } from '../../services/api';

export default function IoTTelemetryFeed() {
    const [telemetry, setTelemetry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const fetchTelemetry = async () => {
        try {
            setLoading(true);
            const res = await iotAPI.getLiveTelemetry();
            if (res.success && res.telemetry) {
                setTelemetry(res.telemetry);
                setLastUpdated(new Date());
            }
        } catch (err) {
            console.error("Failed to fetch IoT telemetry:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTelemetry();
        // Live poll every 15 seconds
        const interval = setInterval(fetchTelemetry, 15000);
        return () => clearInterval(interval);
    }, []);

    if (!telemetry) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-emerald-700">
                    <FiRefreshCw className="animate-spin text-xl" />
                    <span className="font-semibold text-sm">Connecting to IoT Gateway (ESP32)...</span>
                </div>
            </div>
        );
    }

    const { device_meta, readings } = telemetry;

    return (
        <div className="bg-gradient-to-br from-white to-emerald-50/40 rounded-2xl p-6 shadow-sm border border-emerald-100/80 transition-all hover:shadow-md">
            {/* Header / Gateway Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100/80 pb-4 mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                        <FiCpu size={20} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 text-base">Live IoT Telemetry Stream</h3>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                LIVE STREAM
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">
                            Gateway: {device_meta.node_id} • {device_meta.hardware}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                        <FiWifi className="text-emerald-600" />
                        <span>{device_meta.signal_rssi_dbm} dBm</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                        <FiBatteryCharging className="text-emerald-600" />
                        <span>{device_meta.battery_level_pct}% {device_meta.solar_charging ? '☀️ Solar' : ''}</span>
                    </div>
                    <button
                        onClick={fetchTelemetry}
                        disabled={loading}
                        className="p-1.5 text-gray-400 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                        title="Force telemetry refresh"
                    >
                        <FiRefreshCw size={16} className={loading ? "animate-spin text-emerald-600" : ""} />
                    </button>
                </div>
            </div>

            {/* Sensor Dials Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {/* Soil Moisture */}
                <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-xs hover:border-blue-300 transition-all">
                    <div className="flex items-center justify-between text-blue-600 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Soil Moisture</span>
                        <FiDroplet size={18} />
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-900">{readings.soil_moisture_pct.value}</span>
                        <span className="text-sm font-semibold text-gray-500">{readings.soil_moisture_pct.unit}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                            readings.soil_moisture_pct.value >= 25 
                                ? 'bg-emerald-50 text-emerald-700' 
                                : 'bg-amber-50 text-amber-700'
                        }`}>
                            {readings.soil_moisture_pct.status}
                        </span>
                        <span className="text-[10px] text-gray-400">Opt: 25-35%</span>
                    </div>
                </div>

                {/* Soil Temperature */}
                <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-xs hover:border-amber-300 transition-all">
                    <div className="flex items-center justify-between text-amber-600 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Soil Temp</span>
                        <FiThermometer size={18} />
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-900">{readings.soil_temperature_c.value}</span>
                        <span className="text-sm font-semibold text-gray-500">{readings.soil_temperature_c.unit}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                            {readings.soil_temperature_c.status}
                        </span>
                        <span className="text-[10px] text-gray-400">DS18B20</span>
                    </div>
                </div>

                {/* Ambient Humidity */}
                <div className="bg-white p-4 rounded-xl border border-teal-100 shadow-xs hover:border-teal-300 transition-all">
                    <div className="flex items-center justify-between text-teal-600 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Air Humidity</span>
                        <FiActivity size={18} />
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-900">{readings.ambient_humidity_pct.value}</span>
                        <span className="text-sm font-semibold text-gray-500">{readings.ambient_humidity_pct.unit}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                            readings.ambient_humidity_pct.value > 75 
                                ? 'bg-amber-50 text-amber-700' 
                                : 'bg-teal-50 text-teal-700'
                        }`}>
                            {readings.ambient_humidity_pct.status}
                        </span>
                        <span className="text-[10px] text-gray-400">DHT22</span>
                    </div>
                </div>

                {/* Soil pH */}
                <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-xs hover:border-purple-300 transition-all">
                    <div className="flex items-center justify-between text-purple-600 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Soil pH</span>
                        <FiSun size={18} />
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-900">{readings.soil_ph.value}</span>
                        <span className="text-sm font-semibold text-gray-500">{readings.soil_ph.unit}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
                            {readings.soil_ph.status}
                        </span>
                        <span className="text-[10px] text-gray-400">Opt: 6.5-7.2</span>
                    </div>
                </div>
            </div>

            {/* Nutrients & Last Sync */}
            <div className="bg-white/80 rounded-xl p-3 border border-emerald-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-700">Soil N-P-K (RS485 Probe):</span>
                    <span className="text-emerald-800 font-semibold">N: {readings.npk_nutrients.nitrogen_mg_kg} mg/kg</span>
                    <span className="text-emerald-800 font-semibold">P: {readings.npk_nutrients.phosphorus_mg_kg} mg/kg</span>
                    <span className="text-emerald-800 font-semibold">K: {readings.npk_nutrients.potassium_mg_kg} mg/kg</span>
                </div>
                <div className="text-gray-400 font-mono">
                    Synced: {lastUpdated.toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
}
