import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiAlertTriangle, FiCheckCircle, FiTrendingUp, FiCloudRain,
    FiLayers, FiBriefcase, FiBarChart2, FiAward, FiCpu, FiDroplet,
    FiShield, FiZap, FiActivity, FiArrowRight, FiExternalLink,
    FiChevronDown
} from 'react-icons/fi'
import Logo from '../components/common/Logo'
import Card from '../components/common/Card'
import LanguageSwitcher from '../components/common/LanguageSwitcher'
import MorphingNavbar from '../components/common/MorphingNavbar'
import FeatureCardsFan from '../components/common/FeatureCardsFan'
import Footer from '../components/common/Footer'
import { useTranslation } from '../hooks/useTranslation'

export const LandingPage = () => {
    const { t } = useTranslation()
    const videoRef = useRef(null)
    const [introComplete, setIntroComplete] = useState(false)
    const handleIntroComplete = useCallback(() => setIntroComplete(true), [])

    // Ensure landing page always opens from the very top on refresh or initial visit
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const features = [
        {
            title: 'Vision AI Disease Scanner',
            desc: 'Instant crop pathogen diagnosis across 21 multi-crop classes with 91.84% Macro-F1 accuracy and organic treatment protocols.',
            icon: FiCpu,
            badge: 'Computer Vision',
            color: 'text-emerald-700 bg-white border-emerald-300 shadow-xs',
            cardBg: 'bg-emerald-50/90 border-emerald-200/90',
            activeRing: 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-[0_28px_60px_-15px_rgba(16,185,129,0.32)]',
            btnColor: 'text-emerald-700 hover:text-emerald-800',
            path: '/farmer/disease-detection',
            stats: '91.84% Macro-F1'
        },
        {
            title: 'Smart IoT Irrigation Engine',
            desc: 'Automated field valve scheduling driven by soil moisture thresholds, ambient temperature, and live weather precipitation forecasts.',
            icon: FiDroplet,
            badge: 'IoT Telemetry',
            color: 'text-blue-700 bg-white border-blue-300 shadow-xs',
            cardBg: 'bg-blue-50/90 border-blue-200/90',
            activeRing: 'border-blue-500 ring-2 ring-blue-500/30 shadow-[0_28px_60px_-15px_rgba(59,130,246,0.32)]',
            btnColor: 'text-blue-700 hover:text-blue-800',
            path: '/farmer/smart-irrigation',
            stats: '38% Water Saved'
        },
        {
            title: 'Crop Recommendation AI',
            desc: 'Multi-parameter soil NPK matching, seasonal yield forecasting, and optimal crop rotation guidance powered by neural models.',
            icon: FiLayers,
            badge: 'Crop Precision',
            color: 'text-lime-700 bg-white border-lime-300 shadow-xs',
            cardBg: 'bg-lime-50/90 border-lime-200/90',
            activeRing: 'border-lime-500 ring-2 ring-lime-500/30 shadow-[0_28px_60px_-15px_rgba(132,204,22,0.32)]',
            btnColor: 'text-lime-700 hover:text-lime-800',
            path: '/farmer/crop-recommendation',
            stats: '94.2% Yield Match'
        },
        {
            title: 'ESG Sustainability Scoring',
            desc: '100-point environmental benchmark measuring water efficiency, chemical reduction, and carbon sequestration readiness.',
            icon: FiAward,
            badge: 'Eco Metric',
            color: 'text-teal-700 bg-white border-teal-300 shadow-xs',
            cardBg: 'bg-teal-50/90 border-teal-200/90',
            activeRing: 'border-teal-500 ring-2 ring-teal-500/30 shadow-[0_28px_60px_-15px_rgba(20,184,166,0.32)]',
            btnColor: 'text-teal-700 hover:text-teal-800',
            path: '/farmer/sustainability-score',
            stats: '100-Pt Benchmark'
        },
        {
            title: 'Hyper-Local Weather Radar',
            desc: 'Multi-source meteorological intelligence with 7-day predictive rain alerts, humidity tracking, and wind direction telemetry.',
            icon: FiCloudRain,
            badge: 'Radar Live',
            color: 'text-sky-700 bg-white border-sky-300 shadow-xs',
            cardBg: 'bg-sky-50/90 border-sky-200/90',
            activeRing: 'border-sky-500 ring-2 ring-sky-500/30 shadow-[0_28px_60px_-15px_rgba(14,165,233,0.32)]',
            btnColor: 'text-sky-700 hover:text-sky-800',
            path: '/farmer/weather',
            stats: '7-Day Doppler'
        },
        {
            title: 'APMC Market Intelligence',
            desc: 'Real-time commodity price tracking across regional mandis with dynamic yield profit forecasting and trend analysis.',
            icon: FiTrendingUp,
            badge: 'Market Sync',
            color: 'text-amber-700 bg-white border-amber-300 shadow-xs',
            cardBg: 'bg-amber-50/90 border-amber-200/90',
            activeRing: 'border-amber-500 ring-2 ring-amber-500/30 shadow-[0_28px_60px_-15px_rgba(245,158,11,0.32)]',
            btnColor: 'text-amber-700 hover:text-amber-800',
            path: '/farmer/market',
            stats: 'Live Mandi Sync'
        },
        {
            title: 'Expert Agronomist Advisory',
            desc: 'Direct consultation pipeline connecting field farmers with certified university scientists and agronomy researchers.',
            icon: FiBriefcase,
            badge: 'Advisory 24/7',
            color: 'text-purple-700 bg-white border-purple-300 shadow-xs',
            cardBg: 'bg-purple-50/90 border-purple-200/90',
            activeRing: 'border-purple-500 ring-2 ring-purple-500/30 shadow-[0_28px_60px_-15px_rgba(168,85,247,0.32)]',
            btnColor: 'text-purple-700 hover:text-purple-800',
            path: '/farmer/consultation',
            stats: 'PhD Agronomists'
        }
    ]

    const tickerItems = [
        { text: '91.84% CV Macro-F1 Accuracy', highlight: true },
        { text: '21 Multi-Crop Classes', highlight: false },
        { text: 'Autonomous IoT Valves', highlight: false },
        { text: '< 120ms AI Inference Latency', highlight: true },
        { text: '38% Water Resource Savings', highlight: false },
        { text: '100-Pt ESG Ready', highlight: false },
        { text: '7-Day Predictive Rain Radar', highlight: false },
        { text: 'Real-time APMC Mandi Tracking', highlight: false },
        { text: '24/7 Certified Agronomist Advisory', highlight: true },
        { text: 'SIH-2026 Full Stack Certified', highlight: false },
    ]

    const workflow = [
        {
            step: '01',
            title: 'Field Telemetry & Vision Input',
            desc: 'Collect leaf photographs, soil moisture sensor data, and hyper-local climate streams via smartphone or IoT gateway.'
        },
        {
            step: '02',
            title: 'Neural Engine & Agronomy Logic',
            desc: 'PyTorch deep vision models detect pathogens while the agentic engine calculates water deficit and fertilizer dosage.'
        },
        {
            step: '03',
            title: 'Autonomous Action & Expert Guidance',
            desc: 'Smart irrigation valves trigger automatically while treatment remedies and expert consultations guide the farmer.'
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { y: 25, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
            {/* ─── Morphing Intro & Floating Navbar ─── */}
            <MorphingNavbar onComplete={handleIntroComplete} />

            {/* Full-Screen Hero Section with Edge-to-Edge Background Video */}
            <section className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-950">
                {/* Full-Screen Background Video */}
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                    <video
                        ref={videoRef}
                        src="/videos/make_part__gwr_video_mvp.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover scale-105"
                    >
                        <source src="/make_part__gwr_video_mvp.mp4" type="video/mp4" />
                    </video>
                    {/* Multi-layered Cinematic Gradient Overlays for optimal contrast & text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />
                    <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply" />
                    {/* Subtle vignette */}
                    <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" />
                </div>

                {/* Top spacer so hero content starts below the floating navbar */}
                <div className="w-full h-24 md:h-28 shrink-0 pointer-events-none" />

                {/* Hero Centerpiece Content Stack — fades in after intro */}
                <motion.div
                    className="relative z-30 max-w-4xl mx-auto px-4 text-center my-auto py-12 md:py-20 flex flex-col items-center justify-center space-y-6"
                    initial={{ opacity: 0 }}
                    animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                >
                    {/* Script Cursive Accent (Matching "Truly" from reference design) */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-center"
                    >
                        <span className="font-serif italic text-amber-300 text-3xl sm:text-4xl md:text-5xl font-normal drop-shadow-[0_2px_14px_rgba(245,158,11,0.6)] tracking-wide">
                            Truly
                        </span>
                    </motion.div>

                    {/* Mammoth Bold Center Headline (Matching "FEELS LIKE HOME" uppercase style) */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-black text-white tracking-tight uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] leading-[1.04]"
                    >
                        FUTURE OF FARMING
                    </motion.h1>
                </motion.div>

                {/* Organic Curved Bottom Wave Divider (Matching Bottom Wave in Screenshot) */}
                <div className="relative w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg
                        viewBox="0 0 1440 120"
                        preserveAspectRatio="none"
                        className="relative block w-full h-12 sm:h-16 md:h-20 text-slate-50 fill-current"
                    >
                        <path d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
                    </svg>
                </div>
            </section>

            {/* Seamless Infinite Marquee Ticker moving Left to Right */}
            <section id="metrics" className="w-full bg-slate-50/90 border-y border-slate-200/90 py-3.5 relative overflow-hidden select-none">
                {/* Edge fade gradients for seamless disappearance */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex whitespace-nowrap gap-10 sm:gap-14 items-center will-change-transform"
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{
                        ease: 'linear',
                        duration: 25,
                        repeat: Infinity,
                    }}
                >
                    {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 shrink-0">
                            <span className="text-slate-900 font-bold text-sm">✓</span>
                            <span className={item.highlight ? 'text-emerald-600 font-bold' : 'text-slate-700 font-medium'}>
                                {item.text}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Core Features Grid */}
            <section id="features" className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto w-full">
                <div className="text-center space-y-3 mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
                        Full-Stack Capabilities
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-950">
                        Intelligent AI Tools Built for Farmers
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base">
                        Cutting-edge machine learning and IoT automation integrated into a single seamless platform.
                    </p>
                </div>

                {/* Fanned Arc Card Stack Deck (matching reference design) */}
                <FeatureCardsFan features={features} />
            </section>

            {/* Architecture Pipeline Workflow */}
            <section id="architecture" className="bg-slate-100/70 py-20 px-4 md:px-8 border-y border-slate-200">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                            System Architecture
                        </span>
                        <h2 className="text-3xl font-black text-slate-950">How AgriSmart AI Works</h2>
                        <p className="text-slate-600 text-sm max-w-lg mx-auto">
                            From edge sensors in the field to neural networks in the cloud and back to automated valves.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {workflow.map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
                                <span className="text-4xl font-black text-emerald-100 absolute top-4 right-4 select-none">
                                    {item.step}
                                </span>
                                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                                    {idx + 1}
                                </div>
                                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comprehensive Platform Footer with Legal & System Status Links */}
            <Footer />
        </div>
    )
}

export default LandingPage
