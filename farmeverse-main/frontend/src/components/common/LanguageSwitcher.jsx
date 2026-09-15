import React, { useState, useRef, useEffect } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, SUPPORTED_LANGUAGES } from '../../context/LanguageContext';

export const LanguageSwitcher = () => {
    const { language, changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

    const handleSelect = (code) => {
        changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Dark Pill Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm border border-slate-700/60 transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <FiGlobe size={16} className="text-slate-200 shrink-0" />
                <span>{currentLangObj.name}</span>
            </button>

            {/* Language Selection Modal / Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute right-0 top-full mt-2 w-60 sm:w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2.5 z-[9999] text-left"
                    >
                        {/* Header */}
                        <div className="px-3 pt-1.5 pb-2 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase select-none">
                            Change Language
                        </div>

                        {/* Languages Radio List */}
                        <div className="space-y-1 max-h-80 overflow-y-auto pr-0.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                            {SUPPORTED_LANGUAGES.map((item) => {
                                const isSelected = language === item.code;
                                return (
                                    <button
                                        key={item.code}
                                        type="button"
                                        onClick={() => handleSelect(item.code)}
                                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all text-left cursor-pointer ${
                                            isSelected
                                                ? 'bg-blue-600 text-white font-bold shadow-xs'
                                                : 'text-slate-700 hover:bg-slate-100/70 font-semibold'
                                        }`}
                                    >
                                        {/* Custom Radio Circle matching design */}
                                        {isSelected ? (
                                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs">
                                                <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                                            </div>
                                        ) : (
                                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0"></div>
                                        )}
                                        <span className="truncate">{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
