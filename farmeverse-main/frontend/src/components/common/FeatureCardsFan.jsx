import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export const FeatureCardsFan = ({ features = [] }) => {
    // 7 boxes: default index 3 (ESG Sustainability Scoring) sits in the center
    const [activeIndex, setActiveIndex] = useState(3)
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200
    )
    const touchStartX = useRef(0)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const isMobile = windowWidth < 640
    const isTablet = windowWidth >= 640 && windowWidth < 1024
    const totalCards = features.length // 7

    // Automatic rotation every 2 seconds without pause on hover (as requested)
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % totalCards)
        }, 2000)

        return () => clearInterval(timer)
    }, [totalCards])

    // Touch swipe support for mobile
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX
        const diff = touchStartX.current - touchEndX
        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                setActiveIndex(prev => (prev + 1) % totalCards)
            } else {
                setActiveIndex(prev => (prev === 0 ? totalCards - 1 : prev - 1))
            }
        }
    }

    // Mathematical curved fan positioning: exactly 3 on left, 1 in center, 3 on right
    const getCardPlacement = (index) => {
        let diff = index - activeIndex
        // Circular wrap for 7 items: guarantees diff is strictly in range [-3, -2, -1, 0, +1, +2, +3]
        if (diff > 3) diff -= totalCards
        if (diff < -3) diff += totalCards

        const isActive = diff === 0
        const isCardHovered = hoveredIndex === index
        const absDiff = Math.abs(diff)
        const sign = diff < 0 ? -1 : 1

        // Horizontal spacing parameters balanced from left and right
        const stepX = isMobile ? 40 : isTablet ? 84 : 136
        const rotFactor = isMobile ? 5.0 : isTablet ? 6.8 : 8.2
        const yCurve = isMobile ? 12 : isTablet ? 18 : 24

        if (isActive) {
            return {
                x: 0,
                y: isMobile ? -8 : -14, // Elevated center box
                rotate: 0, // Perfectly upright 0°
                scale: isMobile ? 1.02 : (isCardHovered ? 1.06 : 1.04),
                zIndex: 45, // Top-most layer
                opacity: 1,
            }
        }

        // Side cards: hovering slightly lifts them to signal clickability
        const hoverLift = isCardHovered ? -14 : 0
        const hoverScale = isCardHovered ? 0.03 : 0

        // 3 cards fanned to the left, 3 cards fanned to the right
        return {
            x: diff * stepX,
            y: Math.pow(absDiff, 1.26) * yCurve + hoverLift, // Parabolic curve drop
            rotate: sign * (absDiff * rotFactor), // Outward fanned rotation
            scale: Math.max(0.85, 1 - absDiff * 0.04) + hoverScale,
            zIndex: isCardHovered ? 42 : (35 - absDiff * 6),
            opacity: 1,
        }
    }

    return (
        <div className="w-full flex flex-col items-center select-none pt-4 pb-10">
            {/* The 7-Card Curved Fan Stage */}
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative w-full max-w-7xl h-[470px] sm:h-[510px] md:h-[560px] flex items-center justify-center overflow-visible"
            >
                {/* Subtle Radial Glow */}
                <div className="absolute inset-0 max-w-3xl mx-auto rounded-full bg-gradient-to-t from-emerald-100/50 via-emerald-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

                {/* The 7 Fanned Cards Stack */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {features.map((feat, index) => {
                        let diff = index - activeIndex
                        if (diff > 3) diff -= totalCards
                        if (diff < -3) diff += totalCards

                        const isActive = diff === 0
                        const isCardHovered = hoveredIndex === index
                        const placement = getCardPlacement(index)
                        const Icon = feat.icon

                        return (
                            <motion.div
                                key={index}
                                animate={{
                                    x: placement.x,
                                    y: placement.y,
                                    rotate: placement.rotate,
                                    scale: placement.scale,
                                    zIndex: placement.zIndex,
                                    opacity: placement.opacity,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 270,
                                    damping: 26,
                                    mass: 0.85,
                                }}
                                style={{
                                    position: 'absolute',
                                    transformOrigin: '50% 115%', // Bottom anchor for natural card arc
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setActiveIndex(index)}
                                className="select-none cursor-pointer"
                            >
                                {/* Card Body: Light color matching top-left icon color */}
                                <div
                                    className={`relative w-[245px] sm:w-[265px] md:w-[280px] h-[375px] sm:h-[395px] md:h-[415px] rounded-[28px] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 border ${
                                        feat.cardBg || 'bg-emerald-50/90 border-emerald-200/90'
                                    } ${
                                        isActive
                                            ? (feat.activeRing || 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-[0_28px_60px_-15px_rgba(16,185,129,0.32)]')
                                            : isCardHovered
                                            ? 'shadow-[0_20px_45px_-10px_rgba(0,0,0,0.18)]'
                                            : 'shadow-[0_16px_36px_-12px_rgba(0,0,0,0.12)]'
                                    }`}
                                >
                                    {/* Subtle Top Gradient Highlight */}
                                    <div className="absolute inset-x-0 top-0 h-36 rounded-t-[28px] bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none" />

                                    {/* Depth Dimming on the 6 non-center side cards (fades out slightly on hover or active) */}
                                    <div
                                        className={`absolute inset-0 rounded-[28px] bg-slate-950/[0.11] pointer-events-none transition-opacity duration-300 ${
                                            isActive ? 'opacity-0' : isCardHovered ? 'opacity-30' : 'opacity-100'
                                        }`}
                                    />

                                    {/* ── Card Header: Squircle Icon + Category Pill ── */}
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div
                                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-transform duration-300 ${feat.color} ${
                                                isActive || isCardHovered ? 'scale-105' : ''
                                            }`}
                                        >
                                            <Icon size={22} />
                                        </div>

                                        {/* High-Contrast Pill Badge */}
                                        <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase px-3.5 py-1 rounded-full bg-white/95 text-slate-900 border border-slate-200/90 shadow-xs">
                                            {feat.badge}
                                        </span>
                                    </div>

                                    {/* ── Card Content ── */}
                                    <div className="relative z-10 space-y-2.5 my-auto">
                                        {/* Key metric badge */}
                                        {feat.stats && (
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/80 text-slate-800 border border-slate-200/80 text-[10px] font-bold shadow-xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span>{feat.stats}</span>
                                            </div>
                                        )}

                                        <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug tracking-tight">
                                            {feat.title}
                                        </h3>

                                        <p className="text-xs sm:text-[13px] text-slate-700/90 leading-relaxed line-clamp-4 font-normal">
                                            {feat.desc}
                                        </p>
                                    </div>

                                    {/* ── Card Footer: Explore Action Link on Center Box ── */}
                                    <div className="relative z-10 pt-3 border-t border-slate-900/10 flex items-center justify-between">
                                        {isActive ? (
                                            <Link
                                                to={feat.path || '#'}
                                                onClick={(e) => e.stopPropagation()}
                                                className={`text-xs font-black flex items-center gap-1.5 group/btn transition-colors cursor-pointer ${
                                                    feat.btnColor || 'text-emerald-700 hover:text-emerald-800'
                                                }`}
                                            >
                                                <span>Explore capability</span>
                                                <FiArrowRight
                                                    size={13}
                                                    className="group-hover/btn:translate-x-1 transition-transform"
                                                />
                                            </Link>
                                        ) : (
                                            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                                <span>Click to center</span>
                                                <FiArrowRight size={12} className="opacity-60" />
                                            </span>
                                        )}

                                        {/* Active Center Dot Indicator */}
                                        {isActive && (
                                            <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                                                Active
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Auto-rotation status & interactive navigation dots */}
            <div className="flex flex-col items-center gap-3 mt-4">
                {/* 7 Clickable Indicator Dots */}
                <div className="flex items-center gap-2">
                    {features.map((feat, idx) => {
                        const isCurrent = activeIndex === idx
                        return (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                title={feat.title}
                                aria-label={`Select ${feat.title}`}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    isCurrent
                                        ? 'w-7 bg-emerald-600 shadow-xs'
                                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                                }`}
                            />
                        )
                    })}
                </div>

                {/* Subtle 2-second rotation badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600 border border-slate-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Auto-cycling every 2s • Click any card to select</span>
                </div>
            </div>
        </div>
    )
}

export default FeatureCardsFan
