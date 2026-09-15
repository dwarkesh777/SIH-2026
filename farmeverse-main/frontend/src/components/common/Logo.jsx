import React from 'react'
import { motion } from 'framer-motion'
import logoImage from '../../assets/logo.jpg'

export const Logo = ({ size = 'md', showText = true, invert = false }) => {
    const iconSizes = {
        sm: 'w-8 h-8 rounded-lg text-lg',
        md: 'w-11 h-11 rounded-xl text-2xl',
        lg: 'w-14 h-14 rounded-2xl text-3xl',
    }

    const textSizes = {
        sm: 'text-base',
        md: 'text-xl',
        lg: 'text-2xl',
    }

    return (
        <div className="flex items-center gap-3 select-none group">
            <motion.div
                whileHover={{ scale: 1.06, rotate: 2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={`relative flex items-center justify-center overflow-hidden bg-white border border-emerald-500/30 shadow-sm shadow-emerald-900/10 group-hover:shadow-emerald-500/20 transition-all ${iconSizes[size]}`}
            >
                <img src={logoImage} alt="AgriSmart AI Logo" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 to-transparent pointer-events-none" />
            </motion.div>
            {showText && (
                <div className="flex flex-col">
                    <span className={`font-black tracking-tight leading-none ${textSizes[size]} ${invert ? 'text-white' : 'text-slate-900'}`}>
                        AgriSmart <span className="text-emerald-500 group-hover:text-emerald-400 transition-colors">AI</span>
                    </span>
                    <span className={`text-[9px] font-bold tracking-widest uppercase opacity-75 mt-1 flex items-center gap-1 ${invert ? 'text-emerald-300/80' : 'text-emerald-700'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                        Precision Farming
                    </span>
                </div>
            )}
        </div>
    )
}

export default Logo
