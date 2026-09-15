import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoImage from '../../assets/logo.jpg'

/**
 * SplashIntro — 4-phase intro animation
 *
 * Phase 0 (0.0s–0.6s)  : Black screen fade-in
 * Phase 1 (0.6s–1.4s)  : Logo icon pops into center
 * Phase 2 (1.4s–2.2s)  : Website name types / slides in beside logo
 * Phase 3 (2.2s–3.0s)  : Whole badge glides up & shrinks into navbar position
 * Phase 4 (3.0s+)      : Splash fully hidden, page content revealed
 */
const PHASE_TIMINGS = {
    LOGO_IN: 600,       // logo appears
    NAME_IN: 1400,      // name appears
    MOVE_UP: 2200,      // start moving to navbar
    DONE: 3100,         // fully gone
}

const SplashIntro = ({ onComplete }) => {
    const [phase, setPhase] = useState(0) // 0=black, 1=logo, 2=name, 3=moving, 4=done
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), PHASE_TIMINGS.LOGO_IN)
        const t2 = setTimeout(() => setPhase(2), PHASE_TIMINGS.NAME_IN)
        const t3 = setTimeout(() => setPhase(3), PHASE_TIMINGS.MOVE_UP)
        const t4 = setTimeout(() => {
            setPhase(4)
            setVisible(false)
            onComplete?.()
        }, PHASE_TIMINGS.DONE)

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
    }, [onComplete])

    if (!visible) return null

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 pointer-events-none"
                >
                    {/* Phase 3: the whole badge moves toward top-center (navbar position) */}
                    <motion.div
                        animate={
                            phase >= 3
                                ? {
                                      y: '-43vh',
                                      scale: 0.38,
                                      opacity: phase === 4 ? 0 : 1,
                                  }
                                : { y: 0, scale: 1, opacity: 1 }
                        }
                        transition={
                            phase >= 3
                                ? { duration: 0.72, ease: [0.32, 0, 0.67, 0] }
                                : { duration: 0 }
                        }
                        className="flex items-center gap-4 select-none"
                    >
                        {/* Logo Icon — pops in Phase 1 */}
                        <AnimatePresence>
                            {phase >= 1 && (
                                <motion.div
                                    key="logo-icon"
                                    initial={{ scale: 0.2, opacity: 0, rotate: -12 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 260,
                                        damping: 20,
                                        duration: 0.6,
                                    }}
                                    className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.4)] bg-white"
                                >
                                    <img
                                        src={logoImage}
                                        alt="AgriSmart AI Logo"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/15 to-transparent" />
                                    {/* Pulsing ring */}
                                    <motion.div
                                        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 rounded-2xl border-2 border-emerald-400"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Brand Name — slides in Phase 2 */}
                        <AnimatePresence>
                            {phase >= 2 && (
                                <motion.div
                                    key="brand-name"
                                    initial={{ x: -24, opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                                    animate={{ x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex flex-col"
                                >
                                    <span className="text-5xl font-black tracking-tight text-white leading-none">
                                        AgriSmart{' '}
                                        <span className="text-emerald-400">AI</span>
                                    </span>
                                    <motion.span
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25, duration: 0.4 }}
                                        className="text-sm font-bold tracking-widest uppercase text-emerald-400/80 mt-1.5 flex items-center gap-1.5"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                                        Precision Farming Intelligence
                                    </motion.span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Subtle radial glow behind logo */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase >= 1 && phase < 3 ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            background:
                                'radial-gradient(ellipse 55% 40% at 50% 50%, rgba(16,185,129,0.10) 0%, transparent 70%)',
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SplashIntro
