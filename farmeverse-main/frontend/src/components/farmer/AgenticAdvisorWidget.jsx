import React, { useState, useEffect } from 'react';
import { FiZap, FiAlertTriangle, FiCheckCircle, FiChevronDown, FiChevronUp, FiRefreshCw, FiArrowRight } from 'react-icons/fi';
import { agenticAdvisorAPI } from '../../services/api';

export default function AgenticAdvisorWidget() {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLoopDetails, setShowLoopDetails] = useState(false);

    const fetchInsights = async () => {
        try {
            setLoading(true);
            const res = await agenticAdvisorAPI.getInsights();
            if (res.success && res.data) {
                setInsights(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch agentic insights:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInsights();
        const timer = setInterval(fetchInsights, 20000);
        return () => clearInterval(timer);
    }, []);

    if (!insights) {
        return null;
    }

    const { agent_meta, observations, reasoning_chain, decisions_and_actions, primary_recommendation } = insights;

    return (
        <div className="bg-gradient-to-br from-white via-emerald-50/30 to-slate-50 rounded-2xl p-6 shadow-sm border border-emerald-100/90 mb-6 transition-all hover:shadow-md">
            {/* Top Bar / Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-emerald-100/80">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-sm shadow-amber-500/20">
                        <FiZap size={22} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-base md:text-lg tracking-tight">Autonomous Agentic Advisor</h3>
                            <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full border border-emerald-300 font-semibold font-mono">
                                {agent_meta.decision_cycle}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 font-sans mt-0.5">
                            Continuous monitoring of IoT telemetry, microclimate, and crop health models.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={fetchInsights}
                        disabled={loading}
                        className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-xs font-semibold rounded-xl text-slate-700 transition-all flex items-center gap-1.5 border border-slate-200 shadow-xs hover:border-slate-300"
                    >
                        <FiRefreshCw size={12} className={loading ? "animate-spin text-emerald-600" : "text-slate-500"} />
                        <span>Run Decision Cycle</span>
                    </button>
                    <button
                        onClick={() => setShowLoopDetails(!showLoopDetails)}
                        className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl transition-all flex items-center gap-1 border border-amber-200 shadow-xs"
                    >
                        <span>{showLoopDetails ? "Hide Decision Loop" : "View Reasoning Chain"}</span>
                        {showLoopDetails ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                    </button>
                </div>
            </div>

            {/* Primary Action Card */}
            <div className="mt-5 bg-white rounded-xl p-4 border border-emerald-100/90 shadow-xs">
                <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl mt-0.5 flex-shrink-0 ${
                        primary_recommendation.priority === 'URGENT' 
                            ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                            : (primary_recommendation.priority === 'WARNING' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200')
                    }`}>
                        {primary_recommendation.priority === 'URGENT' ? <FiAlertTriangle size={20} /> : <FiCheckCircle size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                Priority Action • {primary_recommendation.category}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                                Triggered: {agent_meta.last_cycle_timestamp}
                            </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mt-1">
                            {primary_recommendation.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {primary_recommendation.description}
                        </p>
                        <div className="mt-3 bg-emerald-50/80 rounded-xl p-3 border border-emerald-200/70 text-xs text-emerald-900">
                            <strong className="text-emerald-950 font-bold">Recommended Instruction:</strong> {primary_recommendation.instruction}
                        </div>
                        <div className="mt-2.5 text-[11px] text-slate-600 flex items-center gap-1">
                            <span>🌱 <strong className="text-slate-800">Impact:</strong> {primary_recommendation.impact}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expandable Decision Loop Audit Trail */}
            {showLoopDetails && (
                <div className="mt-5 pt-4 border-t border-emerald-100/80 space-y-4 animate-fadeIn">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Autonomous Decision Loop Audit Trail
                    </h5>

                    {/* Step 1: Observations */}
                    <div className="bg-slate-50/90 rounded-xl p-3.5 border border-slate-200 text-xs">
                        <span className="text-emerald-700 font-bold font-mono">1. OBSERVE (Telemetry Ingestion)</span>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-2.5 text-slate-600 text-[11px]">
                            <div className="bg-white p-2 rounded-lg border border-slate-200/80">Soil Moisture: <span className="font-bold text-slate-900">{observations.sensor_inputs.soil_moisture_pct}%</span></div>
                            <div className="bg-white p-2 rounded-lg border border-slate-200/80">Temperature: <span className="font-bold text-slate-900">{observations.sensor_inputs.ambient_temp_c}°C</span></div>
                            <div className="bg-white p-2 rounded-lg border border-slate-200/80">Humidity: <span className="font-bold text-slate-900">{observations.sensor_inputs.ambient_humidity_pct}%</span></div>
                            <div className="bg-white p-2 rounded-lg border border-slate-200/80">Rain Risk: <span className="font-bold text-slate-900">{observations.meteorological_inputs.rain_probability_24h}</span></div>
                        </div>
                    </div>

                    {/* Step 2: Reasoning Chain */}
                    <div className="bg-slate-50/90 rounded-xl p-3.5 border border-slate-200 text-xs space-y-2">
                        <span className="text-amber-700 font-bold font-mono">2. REASON (Multi-Variable Agronomic Deduction)</span>
                        {reasoning_chain.map((step, idx) => (
                            <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] flex items-start gap-2 shadow-xs text-slate-700">
                                <FiArrowRight className="text-amber-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <strong className="text-slate-900">{step.variable}:</strong> {step.observation} → <span className="text-emerald-700 font-semibold">{step.deduction}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Step 3: Decisions */}
                    <div className="bg-slate-50/90 rounded-xl p-3.5 border border-slate-200 text-xs">
                        <span className="text-blue-700 font-bold font-mono">3. DECIDE & ACT (Generated Recommendations)</span>
                        <div className="space-y-2 mt-2">
                            {decisions_and_actions.map((act) => (
                                <div key={act.id} className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                                    <strong className="text-slate-900 font-bold">[{act.priority}] {act.title}</strong>: {act.instruction}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
