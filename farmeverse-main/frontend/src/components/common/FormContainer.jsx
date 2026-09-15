import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Card from './Card'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'

export const FormContainer = ({
    children,
    title,
    subtitle,
    backTo = '/',
    backLabel = 'Back to Home',
    roleTheme = 'farmer', // default, changes style elements (farmer, expert, admin)
}) => {
    // Modern nature-inspired themes
    const themes = {
        farmer: {
            bgGradients: 'from-emerald-100/50 via-teal-50/50 to-green-100/50',
            blob1: 'bg-emerald-400/20',
            blob2: 'bg-green-300/20',
            accentBar: 'bg-gradient-to-r from-emerald-500 to-teal-400',
            textGradient: 'bg-gradient-to-r from-emerald-800 to-teal-900',
            border: 'border-emerald-200/50',
        },
        expert: {
            bgGradients: 'from-blue-100/50 via-cyan-50/50 to-sky-100/50',
            blob1: 'bg-blue-400/20',
            blob2: 'bg-cyan-300/20',
            accentBar: 'bg-gradient-to-r from-blue-500 to-cyan-400',
            textGradient: 'bg-gradient-to-r from-blue-800 to-cyan-900',
            border: 'border-blue-200/50',
        },
        admin: {
            bgGradients: 'from-purple-100/50 via-fuchsia-50/50 to-pink-100/50',
            blob1: 'bg-purple-400/20',
            blob2: 'bg-fuchsia-300/20',
            accentBar: 'bg-gradient-to-r from-purple-600 to-pink-500',
            textGradient: 'bg-gradient-to-r from-purple-900 to-fuchsia-900',
            border: 'border-purple-200/50',
        }
    }

    const activeTheme = themes[roleTheme] || themes.farmer

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br ${activeTheme.bgGradients} relative overflow-hidden font-sans`}>
            
            {/* Dynamic Animated Background Blobs */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    borderRadius: ["20%", "50%", "20%"]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] ${activeTheme.blob1} blur-3xl opacity-60 z-0`} 
            />
            <motion.div 
                animate={{ 
                    scale: [1, 1.5, 1],
                    rotate: [0, -90, 0],
                    borderRadius: ["50%", "30%", "50%"]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className={`absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] ${activeTheme.blob2} blur-3xl opacity-60 z-0`} 
            />

            {/* Subtle Grid Overlay for modern texture */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4wNSkiLz48L3N2Zz4=')] opacity-50 z-0 mask-image:linear-gradient(to_bottom,white,transparent)"></div>

            {/* Language Switcher */}
            <div className="absolute top-6 right-6 z-50">
                <LanguageSwitcher />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="w-full max-w-lg z-10 relative"
            >
                {/* Back Link */}
                <div className="mb-4 ml-1">
                    <Link
                        to={backTo}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors duration-200 group"
                    >
                        <span className="transform group-hover:-translate-x-1 transition-transform">←</span> {backLabel}
                    </Link>
                </div>

                {/* Glassmorphic Form Card */}
                <div className={`relative bg-white/70 backdrop-blur-xl border ${activeTheme.border} shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 sm:p-10 overflow-hidden`}>
                    
                    {/* Theme Accent Gradient Bar */}
                    <div className={`absolute top-0 left-0 w-full h-1.5 ${activeTheme.accentBar}`} />

                    {/* Logo & Headers */}
                    <div className="flex flex-col items-center mb-8 text-center select-none relative">
                        <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
                            <Logo size="lg" />
                        </div>
                        <h2 className={`text-2xl font-black bg-clip-text text-transparent ${activeTheme.textGradient} tracking-tight`}>
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-sm font-medium text-slate-500 mt-2 max-w-[85%] mx-auto leading-relaxed">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Form Content */}
                    <div className="relative z-10">
                        {children}
                    </div>
                </div>
                
                {/* Bottom decorative text/info */}
                <div className="mt-6 text-center text-xs font-semibold text-slate-400 select-none">
                    Protected by AgriSmart Security &bull; SSL Encrypted
                </div>
            </motion.div>
        </div>
    )
}

export default FormContainer
