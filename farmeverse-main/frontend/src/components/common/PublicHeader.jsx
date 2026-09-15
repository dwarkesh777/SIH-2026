import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX, FiArrowRight, FiShield, FiCpu, FiHome, FiInfo, FiMail, FiLogIn } from 'react-icons/fi'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'

export const PublicHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [portalUrl, setPortalUrl] = useState('/farmer/login')

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('access_token')
            const role = (localStorage.getItem('role') || '').toLowerCase()
            if (token && token !== 'null' && token !== 'undefined') {
                setIsLoggedIn(true)
                if (role === 'admin') setPortalUrl('/admin/dashboard')
                else if (role === 'expert') setPortalUrl('/expert/dashboard')
                else setPortalUrl('/farmer/dashboard')
            } else {
                setIsLoggedIn(false)
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

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
                {/* Brand Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <Logo size="md" />
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                    <Link to="/" className="hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        <FiHome size={15} />
                        <span>Home</span>
                    </Link>
                    <Link to="/#features" className="hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        <FiCpu size={15} />
                        <span>AI Modules</span>
                    </Link>
                    <Link to="/about" className="hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        <FiInfo size={15} />
                        <span>About Platform</span>
                    </Link>
                    <Link to="/security" className="hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        <FiShield size={15} />
                        <span>Security</span>
                    </Link>
                    <Link to="/contact" className="hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        <FiMail size={15} />
                        <span>Contact</span>
                    </Link>
                </nav>

                {/* Right Action Stack */}
                <div className="hidden sm:flex items-center gap-4">
                    <LanguageSwitcher />

                    {isLoggedIn ? (
                        <Link
                            to={portalUrl}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center gap-2"
                        >
                            <span>Launch Portal</span>
                            <FiArrowRight size={14} />
                        </Link>
                    ) : (
                        <Link
                            to="/farmer/login"
                            className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
                        >
                            <FiLogIn size={14} />
                            <span>Login</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Navigation"
                    className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-emerald-600 hover:bg-slate-200 transition-colors"
                >
                    {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200/80 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
                    <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        Home
                    </Link>
                    <Link
                        to="/#features"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        AI Capabilities
                    </Link>
                    <Link
                        to="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        About Platform
                    </Link>
                    <Link
                        to="/security"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        Security & Data
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        Contact & Support
                    </Link>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <LanguageSwitcher />
                        {isLoggedIn ? (
                            <Link
                                to={portalUrl}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold flex items-center gap-1.5"
                            >
                                <span>Launch Portal</span>
                                <FiArrowRight size={12} />
                            </Link>
                        ) : (
                            <Link
                                to="/farmer/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-bold flex items-center gap-1.5"
                            >
                                <FiLogIn size={12} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default PublicHeader
