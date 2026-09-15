import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize2,
    FiActivity, FiCpu, FiDroplet, FiTrendingUp, FiShield, FiRadio
} from 'react-icons/fi'

export const HeroVideoPlayer = () => {
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(true)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [showHud, setShowHud] = useState(true)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleTimeUpdate = () => {
            if (video.duration) {
                setProgress((video.currentTime / video.duration) * 100)
                setCurrentTime(video.currentTime)
            }
        }

        const handleLoadedMetadata = () => {
            setDuration(video.duration || 0)
        }

        video.addEventListener('timeupdate', handleTimeUpdate)
        video.addEventListener('loadedmetadata', handleLoadedMetadata)

        // Attempt autoplay
        const playPromise = video.play()
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Auto-play was prevented, keep paused state in sync
                setIsPlaying(false)
            })
        }

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate)
            video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        }
    }, [])

    const togglePlay = (e) => {
        e?.stopPropagation()
        const video = videoRef.current
        if (!video) return

        if (video.paused) {
            video.play()
            setIsPlaying(true)
        } else {
            video.pause()
            setIsPlaying(false)
        }
    }

    const toggleMute = (e) => {
        e?.stopPropagation()
        const video = videoRef.current
        if (!video) return

        video.muted = !video.muted
        setIsMuted(video.muted)
    }

    const handleFullscreen = (e) => {
        e?.stopPropagation()
        const video = videoRef.current
        if (!video) return

        if (video.requestFullscreen) {
            video.requestFullscreen()
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen()
        }
    }

    const handleSeek = (e) => {
        const video = videoRef.current
        if (!video || !duration) return
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const width = rect.width
        const newTime = (clickX / width) * duration
        video.currentTime = newTime
    }

    const formatTime = (secs) => {
        if (isNaN(secs)) return '0:00'
        const m = Math.floor(secs / 60)
        const s = Math.floor(secs % 60)
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl lg:max-w-none group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Dynamic Multi-layered Ambient Back-Glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500/30 via-teal-400/25 to-emerald-600/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 -z-10" />
            <div className="absolute -top-6 -right-6 w-36 h-36 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* High-Tech Cockpit Terminal Frame */}
            <div className="relative rounded-2xl md:rounded-3xl bg-slate-950/90 border border-emerald-500/30 shadow-[0_20px_60px_-15px_rgba(6,78,59,0.4)] backdrop-blur-xl overflow-hidden">
                
                {/* Cockpit Window Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-emerald-500/20 text-xs select-none">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                        </div>
                        <span className="text-slate-600 pl-2">|</span>
                        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-emerald-300/90 tracking-wide">
                            <FiRadio className="text-emerald-400 animate-pulse" size={13} />
                            <span>FARMEVERSE NEURAL HUB // FEED_01</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            LIVE AI
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                            60 FPS
                        </span>
                    </div>
                </div>

                {/* Video Viewport Container */}
                <div 
                    onClick={togglePlay}
                    className="relative aspect-video w-full bg-black cursor-pointer overflow-hidden flex items-center justify-center"
                >
                    <video
                        ref={videoRef}
                        src="/videos/make_part__gwr_video_mvp.mp4"
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    >
                        {/* Fallback source in case root public path is preferred */}
                        <source src="/make_part__gwr_video_mvp.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Subtle Cinematic Grid & Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />
                    
                    {/* Centered Play Overlay when Paused */}
                    <AnimatePresence>
                        {!isPlaying && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs z-20 pointer-events-none"
                            >
                                <div className="w-16 h-16 rounded-full bg-emerald-500/90 text-slate-950 flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(16,185,129,0.7)] border border-emerald-300">
                                    <FiPlay size={28} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* HUD Overlay: Vision AI Target Reticle & Scan Status (Top Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="absolute top-3 left-3 z-10 pointer-events-none max-w-[210px] sm:max-w-xs"
                    >
                        <div className="bg-slate-950/75 backdrop-blur-md p-2.5 rounded-xl border border-emerald-400/40 text-white space-y-1 shadow-lg">
                            <div className="flex items-center justify-between text-[10px] font-mono text-emerald-300">
                                <span className="flex items-center gap-1 font-bold">
                                    <FiCpu className="text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} size={12} />
                                    <span>PYTORCH VISION ENGINE</span>
                                </span>
                                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-400/30 font-bold">
                                    91.8% F1
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <p className="text-[11px] font-bold text-slate-100 truncate">
                                    Multi-Crop Pathogen Scanner
                                </p>
                            </div>
                            <p className="text-[9px] text-emerald-200/80 font-mono">
                                Status: Healthy Canopy • 0 Pathogens
                            </p>
                        </div>
                    </motion.div>

                    {/* HUD Overlay: IoT Sensor Node Telemetry (Bottom Left) */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-12 left-3 z-10 pointer-events-none hidden sm:block"
                    >
                        <div className="bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-emerald-500/30 text-white space-y-1.5 shadow-xl">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                                    <FiDroplet size={13} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-slate-400 uppercase">Field Sensor Node 04</p>
                                    <p className="text-xs font-black text-emerald-300">Moisture: 68% <span className="text-[10px] font-normal text-slate-300">• Valve Auto</span></p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* HUD Overlay: ESG & APMC Market Live Pill (Top Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="absolute top-3 right-3 z-10 pointer-events-none hidden xs:block"
                    >
                        <div className="bg-slate-950/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-teal-400/30 text-right shadow-lg">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-teal-300">
                                <FiTrendingUp size={12} />
                                <span>APMC MANDI SYNC</span>
                            </div>
                            <p className="text-[11px] font-extrabold text-white">
                                Wheat: <span className="text-emerald-400">₹2,420/Qtl</span> <span className="text-[9px] text-emerald-300">(+3.2%)</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Bottom Controls Bar */}
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 pt-6 z-20 transition-opacity duration-300 ${
                            isHovered || !isPlaying ? 'opacity-100' : 'opacity-80 md:opacity-0 group-hover:opacity-100'
                        }`}
                    >
                        {/* Interactive Scrubber Bar */}
                        <div 
                            onClick={handleSeek}
                            className="relative w-full h-1.5 bg-slate-800/80 hover:h-2.5 rounded-full cursor-pointer overflow-hidden transition-all mb-2.5 group/seek"
                        >
                            <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full relative"
                                style={{ width: `${progress}%` }}
                            >
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/seek:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        {/* Player Controls & Time Display */}
                        <div className="flex items-center justify-between text-xs text-white">
                            <div className="flex items-center gap-3">
                                {/* Play/Pause Button */}
                                <button
                                    onClick={togglePlay}
                                    type="button"
                                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                                    className="w-8 h-8 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md shadow-emerald-900/50"
                                >
                                    {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} className="pl-0.5" />}
                                </button>

                                {/* Mute/Unmute Button */}
                                <button
                                    onClick={toggleMute}
                                    type="button"
                                    aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white border border-slate-700 text-[11px] font-mono transition-colors"
                                >
                                    {isMuted ? (
                                        <>
                                            <FiVolumeX size={14} className="text-amber-400" />
                                            <span className="hidden sm:inline">Unmute Sound</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiVolume2 size={14} className="text-emerald-400" />
                                            <span className="hidden sm:inline text-emerald-300">Audio Active</span>
                                        </>
                                    )}
                                </button>

                                {/* Current Time */}
                                <span className="font-mono text-[11px] text-slate-400">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 hidden xs:inline-block">
                                    4K MVP PROTOTYPE
                                </span>

                                {/* Fullscreen Button */}
                                <button
                                    onClick={handleFullscreen}
                                    type="button"
                                    aria-label="Toggle Fullscreen"
                                    className="w-8 h-8 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
                                >
                                    <FiMaximize2 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cockpit Status Bar Footer */}
                <div className="px-4 py-2.5 bg-slate-900/95 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                    <div className="flex items-center gap-2 text-emerald-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-bold">Autonomous Agentic Pipeline</span>
                        <span className="text-slate-600 hidden sm:inline">•</span>
                        <span className="text-slate-400 hidden sm:inline">SIH-2026 Innovation Model</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                        <span className="text-emerald-400/90 font-bold">Latency: 112ms</span>
                        <span>|</span>
                        <span className="text-teal-300 font-bold">Inference: Edge-Cloud</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default HeroVideoPlayer
