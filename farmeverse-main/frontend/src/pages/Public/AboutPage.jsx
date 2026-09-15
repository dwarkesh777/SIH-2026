import React from 'react'
import { Link } from 'react-router-dom'
import { FiAward, FiCpu, FiDroplet, FiTrendingUp, FiCheckCircle, FiArrowRight, FiUsers, FiTarget } from 'react-icons/fi'
import PublicHeader from '../../components/common/PublicHeader'
import Footer from '../../components/common/Footer'

export const AboutPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            <PublicHeader />

            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="space-y-4 border-b border-slate-200 pb-8 mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                        <FiAward size={13} />
                        <span>Smart India Hackathon 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
                        About AgriSmart AI
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                        Pioneering next-generation precision agriculture by combining deep computer vision, autonomous edge IoT automation, and real-time economic intelligence for Indian farmers.
                    </p>
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                            <FiTarget size={24} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">Our Core Mission</h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            To eliminate yield vulnerability for smallholder farmers across India by providing state-of-the-art pathogen diagnosis in under 120 milliseconds, conserving up to 38% of irrigation water, and democratizing direct access to university agronomy scientists.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                            <FiUsers size={24} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">Ecosystem Synergy</h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Bridging the gap between grassroots field telemetry, APMC wholesale mandis, and certified ICAR agricultural researchers into a cohesive, multilingual decision support ecosystem designed for high impact.
                        </p>
                    </div>
                </div>

                {/* Key Pillars */}
                <div className="space-y-8 mb-12">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">The 5 Pillars of Our Technology</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                            <span className="text-emerald-600 font-black text-lg">01. Deep Vision AI</span>
                            <h3 className="font-bold text-sm text-slate-900">21-Class Pathogen Diagnosis</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                PyTorch convolutional neural networks trained on diverse multi-spectral leaf imagery, achieving 91.84% macro-F1 classification accuracy.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                            <span className="text-blue-600 font-black text-lg">02. Autonomous IoT</span>
                            <h3 className="font-bold text-sm text-slate-900">Field Valve Scheduling</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Soil moisture and evapotranspiration telemetry trigger automated irrigation valves, saving critical groundwater and electricity.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                            <span className="text-amber-600 font-black text-lg">03. Market Sync</span>
                            <h3 className="font-bold text-sm text-slate-900">Live APMC Mandi Rates</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Real-time price tracking across regional mandis with dynamic yield profit forecasting and trend intelligence.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action Card */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight">Ready to Modernize Your Farm?</h3>
                        <p className="text-xs sm:text-sm text-emerald-100 max-w-md">
                            Join thousands of progressive farmers and agricultural researchers on AgriSmart AI today.
                        </p>
                    </div>
                    <Link
                        to="/farmer/register"
                        className="px-6 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 text-xs sm:text-sm font-black shadow-md transition-all shrink-0 flex items-center gap-2"
                    >
                        <span>Get Started Free</span>
                        <FiArrowRight size={15} />
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default AboutPage
