import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiArrowRight, FiShield, FiBriefcase, FiUser, FiLogIn } from 'react-icons/fi'
import logoImage from '../../assets/logo.jpg'
import farmerIntroBg from '../../assets/farmer-intro-bg.png'
import LanguageSwitcher from './LanguageSwitcher'

/**
 * MorphingNavbar
 *
 * Sequence requested by user:
 * 1. Stage 0 (0ms - 900ms)   : First show logo ONLY centered on screen (with glowing ring & bounce)
 * 2. Stage 1 (900ms - 1550ms) : Logo moves up to navbar position; dark backdrop fades out
 * 3. Stage 2 (1550ms - 2200ms): Expands / converts into full rounded floating navbar ("pop up")
 * 4. Stage 3 (2200ms+)       : Resting state; fires onComplete so hero content reveals
 */
export const MorphingNavbar = ({ onComplete }) => {
    // 0: logo-center, 1: moving-up, 2: expand-navbar, 3: ready
    const [stage, setStage] = useState(0)
    const [portalsOpen, setPortalsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userRole, setUserRole] = useState(null)
    const [portalUrl, setPortalUrl] = useState('/farmer/login')
    const portalsRef = useRef(null)

    // Check dynamic authentication state
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('access_token')
            const role = (localStorage.getItem('role') || '').toLowerCase()
            if (token && token !== 'null' && token !== 'undefined') {
                setIsLoggedIn(true)
                setUserRole(role)
                if (role === 'admin') setPortalUrl('/admin/dashboard')
                else if (role === 'expert') setPortalUrl('/expert/dashboard')
                else setPortalUrl('/farmer/dashboard')
            } else {
                setIsLoggedIn(false)
                setUserRole(null)
                setPortalUrl('/farmer/login')
            }
        }
        checkAuth()
        window.addEventListener('storage', checkAuth)
        window.addEventListener('focus', checkAuth)
        return () => {
            window.removeEventListener('storage', checkAuth)
            window.removeEventListener('focus', checkAuth)
        }
    }, [])

    // Close portal dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (portalsRef.current && !portalsRef.current.contains(event.target)) {
                setPortalsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        const t1 = setTimeout(() => setStage(1), 950)   // start gliding up
        const t2 = setTimeout(() => setStage(2), 1600)  // expand into navbar
        const t3 = setTimeout(() => {
            setStage(3)
            onComplete?.()
        }, 2250)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
        }
    }, [onComplete])

    return (
        <>
            {/* Cinematic Farmer Backdrop with Deep Blue & Blur Treatment — fades out as logo glides up */}
            <AnimatePresence>
                {stage < 2 && (
                    <motion.div
                        key="intro-backdrop"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: stage >= 1 ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.65, ease: 'easeInOut' }}
                        className="fixed inset-0 z-40 overflow-hidden pointer-events-none bg-slate-950"
                    >
                        {/* Farmer Landscape Image with natural colors & soft blur */}
                        <img
                            src={farmerIntroBg}
                            alt="AgriSmart Farmer Background"
                            className="w-full h-full object-cover scale-105 blur-[4px] brightness-90"
                        />

                        {/* Subtle natural contrast overlay (no blue color) */}
                        <div className="absolute inset-0 bg-black/25" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

                        {/* Soft emerald glow centered behind the logo */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    'radial-gradient(circle 320px at 50% 50%, rgba(16,185,129,0.25) 0%, transparent 70%)',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Full-width fixed wrapper that guarantees 100% horizontal centering at all times */}
            <motion.div
                initial={false}
                animate={{
                    top: stage === 0 ? '50%' : '2.25rem',
                    y: stage === 0 ? '-50%' : '0%',
                }}
                transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="fixed inset-x-0 z-50 flex justify-center pointer-events-none px-4"
            >
                <motion.header
                    layout
                    initial={false}
                    animate={{
                        width:
                            stage === 0
                                ? '152px'
                                : stage === 1
                                ? '52px'
                                : 'min(64rem, 100%)',
                        height: stage === 0 ? '152px' : stage === 1 ? '52px' : '52px',
                        borderRadius: stage === 0 ? '32px' : '9999px',
                        paddingLeft: stage === 0 ? '10px' : stage === 1 ? '8px' : '18px',
                        paddingRight: stage === 0 ? '10px' : stage === 1 ? '8px' : '18px',
                        paddingTop: stage === 0 ? '10px' : '6px',
                        paddingBottom: stage === 0 ? '10px' : '6px',
                        boxShadow:
                            stage === 0
                                ? '0 0 70px rgba(16,185,129,0.55), 0 25px 50px -12px rgba(0,0,0,0.7)'
                                : '0 20px 45px -10px rgba(0,0,0,0.3)',
                    }}
                    transition={{
                        width:
                            stage >= 2
                                ? { type: 'spring', stiffness: 240, damping: 22 }
                                : { duration: 0.5, ease: 'easeInOut' },
                        height: { duration: 0.5, ease: 'easeInOut' },
                        borderRadius: { duration: 0.5 },
                        boxShadow: { duration: 0.6 },
                    }}
                    className={`pointer-events-auto flex items-center justify-between bg-white/95 backdrop-blur-xl border border-white/50 transition-colors hover:bg-white ${
                        stage >= 2 ? 'overflow-visible' : 'overflow-hidden'
                    }`}
                >
                {/* ─── LEFT: Logo Icon + Brand Text ─── */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    {/* The Logo Image — Centered in stage 0/1, docked on left in stage 2/3 */}
                    <motion.div
                        className={`relative overflow-hidden bg-white border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-sm ${
                            stage === 0
                                ? 'w-32 h-32 rounded-2xl'
                                : 'w-8 h-8 rounded-lg'
                        }`}
                        animate={{
                            scale: stage === 0 ? [0.3, 1.08, 1] : 1,
                        }}
                        transition={
                            stage === 0
                                ? {
                                      type: 'spring',
                                      stiffness: 280,
                                      damping: 18,
                                      duration: 0.7,
                                  }
                                : { duration: 0.4 }
                        }
                    >
                        <img
                            src={logoImage}
                            alt="AgriSmart AI Logo"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/15 to-transparent pointer-events-none" />

                        {/* Pulsing ring visible only while centered in stage 0 */}
                        {stage === 0 && (
                            <motion.div
                                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 1.8, repeat: Infinity }}
                                className="absolute inset-0 rounded-2xl border-2 border-emerald-400 pointer-events-none"
                            />
                        )}
                    </motion.div>

                    {/* Brand Name Text — pops in beside logo when expanding */}
                    <AnimatePresence>
                        {stage >= 2 && (
                            <motion.div
                                key="brand-text"
                                initial={{ opacity: 0, x: -18, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 24,
                                    delay: 0.08,
                                }}
                                className="flex flex-col select-none"
                            >
                                <span className="text-base font-black tracking-tight leading-none text-slate-900">
                                    AgriSmart{' '}
                                    <span className="text-emerald-500">AI</span>
                                </span>
                                <span className="text-[9px] font-bold tracking-widest uppercase opacity-75 mt-1 flex items-center gap-1 text-emerald-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                                    Precision Farming
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ─── CENTER: Desktop Navigation Links ─── */}
                <AnimatePresence>
                    {stage >= 2 && (
                        <motion.nav
                            key="nav-links"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.18,
                            }}
                            className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700 select-none mx-4 overflow-visible"
                        >
                            <a
                                href="#features"
                                className="hover:text-emerald-700 transition-colors py-1"
                            >
                                AI Features
                            </a>
                            <a
                                href="#architecture"
                                className="hover:text-emerald-700 transition-colors py-1"
                            >
                                IoT Pipeline
                            </a>
                            <a
                                href="#metrics"
                                className="hover:text-emerald-700 transition-colors py-1"
                            >
                                Model Benchmarks
                            </a>

                            {/* User Portals Interactive Dropdown */}
                            <div className="relative" ref={portalsRef}>
                                <button
                                    type="button"
                                    onClick={() => setPortalsOpen(prev => !prev)}
                                    className={`hover:text-emerald-700 transition-all flex items-center gap-1.5 py-1 px-2.5 rounded-full cursor-pointer select-none border ${
                                        portalsOpen
                                            ? 'text-emerald-700 bg-emerald-50 border-emerald-300/80 shadow-xs'
                                            : 'border-transparent text-slate-700 hover:bg-slate-50'
                                    }`}
                                    aria-expanded={portalsOpen}
                                >
                                    <span>User Portals</span>
                                    <FiChevronDown
                                        size={13}
                                        className={`transition-transform duration-200 ${
                                            portalsOpen ? 'rotate-180 text-emerald-600' : ''
                                        }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {portalsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                            transition={{ duration: 0.16, ease: 'easeOut' }}
                                            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200/90 p-2 z-50 text-left"
                                        >
                                            <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                                                <span>Select Portal Access</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            </div>

                                            <div className="p-1 space-y-1 mt-1">
                                                {/* Admin Portal */}
                                                <Link
                                                    to={isLoggedIn && userRole === 'admin' ? '/admin/dashboard' : '/admin/login'}
                                                    onClick={() => setPortalsOpen(false)}
                                                    className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-900 transition-all"
                                                >
                                                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                                                        <FiShield size={18} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-xs font-bold text-slate-800 group-hover:text-white flex items-center justify-between">
                                                            <span>Admin Portal</span>
                                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                                                {isLoggedIn && userRole === 'admin' ? 'Open' : 'Admin'}
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 group-hover:text-slate-300 truncate">
                                                            System verification & management
                                                        </p>
                                                    </div>
                                                </Link>

                                                {/* Expert Portal */}
                                                <Link
                                                    to={isLoggedIn && userRole === 'expert' ? '/expert/dashboard' : '/expert/login'}
                                                    onClick={() => setPortalsOpen(false)}
                                                    className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-900 transition-all"
                                                >
                                                    <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                                                        <FiBriefcase size={18} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-xs font-bold text-slate-800 group-hover:text-white flex items-center justify-between">
                                                            <span>Expert Portal</span>
                                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-700 font-bold group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                                                {isLoggedIn && userRole === 'expert' ? 'Open' : 'Scientist'}
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 group-hover:text-slate-300 truncate">
                                                            Agronomist consultation & telemetry
                                                        </p>
                                                    </div>
                                                </Link>

                                                {/* Farmer Portal */}
                                                <Link
                                                    to={isLoggedIn && userRole === 'farmer' ? '/farmer/dashboard' : '/farmer/login'}
                                                    onClick={() => setPortalsOpen(false)}
                                                    className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-900 transition-all"
                                                >
                                                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                                                        <FiUser size={18} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-xs font-bold text-slate-800 group-hover:text-white flex items-center justify-between">
                                                            <span>Farmer Portal</span>
                                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                                                {isLoggedIn && userRole === 'farmer' ? 'Open' : 'Producer'}
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 group-hover:text-slate-300 truncate">
                                                            Farm operations & AI scanner
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>

                {/* ─── RIGHT: Language & Action Button (Login / Launch Portal) ─── */}
                <AnimatePresence>
                    {stage >= 2 && (
                        <motion.div
                            key="nav-actions"
                            initial={{ opacity: 0, scale: 0.85, x: 14 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 280,
                                damping: 22,
                                delay: 0.15,
                            }}
                            className="flex items-center gap-2.5 shrink-0"
                        >
                            <div className="hidden sm:block">
                                <LanguageSwitcher />
                            </div>
                            {isLoggedIn ? (
                                <Link
                                    to={portalUrl}
                                    className="px-4 sm:px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-full text-xs font-extrabold shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                >
                                    <span>Launch Portal</span>
                                    <FiArrowRight size={13} />
                                </Link>
                            ) : (
                                <Link
                                    to="/farmer/login"
                                    className="px-4 sm:px-5 py-2 bg-slate-950 hover:bg-emerald-800 text-white rounded-full text-xs font-extrabold shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                >
                                    <FiLogIn size={13} />
                                    <span>Login</span>
                                </Link>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </motion.div>
    </>
)
}

export default MorphingNavbar
