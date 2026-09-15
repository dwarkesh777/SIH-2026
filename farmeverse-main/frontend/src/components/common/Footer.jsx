import React from 'react'
import { Link } from 'react-router-dom'
import {
    FiMail, FiPhone, FiMapPin, FiShield,
    FiCpu, FiBriefcase
} from 'react-icons/fi'
import Logo from './Logo'

export const Footer = () => {
    return (
        <footer
            className="mt-auto text-white border-t border-emerald-400/40 relative overflow-hidden font-sans select-none"
            style={{
                backgroundColor: '#06956a',
                backgroundImage: "url('/footer-bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
                backgroundRepeat: 'no-repeat'
            }}
        >

            {/* Main Footer Directory Columns */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
                {/* Column 1: Brand & SIH Recognition (Spans 2 cols on lg) */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="flex items-center gap-3">
                        <Logo size="md" invert={true} />
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-sm">
                        AgriSmart AI is an end-to-end intelligent precision agriculture ecosystem integrating deep computer vision, autonomous IoT edge telemetry, and predictive agronomic models.
                    </p>

                    <div className="space-y-2.5 pt-1 text-xs text-emerald-100/90">
                        <div className="flex items-center gap-2.5">
                            <FiMapPin className="text-emerald-300 shrink-0 text-sm" />
                            <span>National Agriculture Telemetry Cell, New Delhi / Goa, India</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <FiMail className="text-emerald-300 shrink-0 text-sm" />
                            <a href="mailto:support@agrismart.ai" className="hover:text-white transition-colors">
                                support@agrismart.ai
                            </a>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <FiPhone className="text-emerald-300 shrink-0 text-sm" />
                            <span>1800-AGRI-SMART (Toll-Free Support)</span>
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-300/40 text-emerald-100 text-xs font-mono shadow-xs backdrop-blur-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                        <span>SIH-2026 Production Certified</span>
                    </div>
                </div>

                {/* Column 2: AI Capabilities & Tools */}
                <div className="space-y-4">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                        <FiCpu className="text-emerald-300" />
                        <span>AI Capabilities</span>
                    </h4>
                    <ul className="space-y-2.5 text-xs text-emerald-100/90">
                        <li>
                            <Link to="/farmer/disease-detection" className="hover:text-white transition-colors flex items-center justify-between group">
                                <span>Vision AI Scanner</span>
                                <span className="text-[10px] text-emerald-300 group-hover:text-white">91.8% F1</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/farmer/smart-irrigation" className="hover:text-white transition-colors flex items-center justify-between group">
                                <span>Smart IoT Irrigation</span>
                                <span className="text-[10px] text-emerald-300 group-hover:text-white">Valves</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/farmer/crop-recommendation" className="hover:text-white transition-colors flex items-center justify-between group">
                                <span>Crop Recommendation AI</span>
                                <span className="text-[10px] text-emerald-300 group-hover:text-white">NPK</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/farmer/sustainability-score" className="hover:text-white transition-colors flex items-center justify-between group">
                                <span>ESG Sustainability</span>
                                <span className="text-[10px] text-emerald-300 group-hover:text-white">100-Pt</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/farmer/weather" className="hover:text-white transition-colors flex items-center justify-between group">
                                <span>Hyper-Local Radar</span>
                                <span className="text-[10px] text-emerald-300 group-hover:text-white">Doppler</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/farmer/market" className="hover:text-white transition-colors flex items-center justify-between group">
                                <span>APMC Mandi Intelligence</span>
                                <span className="text-[10px] text-emerald-300 group-hover:text-white">Live</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Portals & Access */}
                <div className="space-y-4">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                        <FiBriefcase className="text-emerald-300" />
                        <span>Portals & Roles</span>
                    </h4>
                    <ul className="space-y-2.5 text-xs text-emerald-100/90">
                        <li>
                            <Link to="/farmer/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                                <span className="text-emerald-300">→</span> Farmer Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/expert/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                                <span className="text-emerald-300">→</span> Expert Scientist Hub
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                                <span className="text-emerald-300">→</span> System Admin Portal
                            </Link>
                        </li>
                        <li>
                            <Link to="/farmer/register" className="hover:text-white transition-colors flex items-center gap-1.5">
                                <span className="text-emerald-300">→</span> New Farmer Registration
                            </Link>
                        </li>
                        <li>
                            <Link to="/farmer/consultation" className="hover:text-white transition-colors flex items-center gap-1.5">
                                <span className="text-emerald-300">→</span> On-Call Agronomists
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Platform, Legal & Compliance */}
                <div className="space-y-4">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                        <FiShield className="text-emerald-300" />
                        <span>Platform & Legal</span>
                    </h4>
                    <ul className="space-y-2.5 text-xs text-emerald-100/90">
                        <li>
                            <Link to="/about" className="hover:text-white transition-colors">
                                About AgriSmart AI
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/terms-of-service" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link to="/cookie-policy" className="hover:text-white transition-colors">
                                Cookie & Storage Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/security" className="hover:text-white transition-colors">
                                Security & Compliance
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-white transition-colors">
                                Contact & Support Hub
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Copyright, Status, and Legal Bar */}
            <div className="relative z-10 border-t border-emerald-500/30 bg-black/15 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-100/80">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                        <span>© 2026 AgriSmart AI. Developed for Smart India Hackathon (SIH-2026).</span>
                        <span className="hidden sm:inline text-emerald-300/40">•</span>
                        <span>All rights reserved.</span>
                    </div>

                    {/* Operational Health Badge */}
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-300/40 text-[11px] text-emerald-100">
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                        <span>All Systems Operational (99.98% SLA)</span>
                    </div>

                    {/* Quick Legal Links */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-emerald-200">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">
                            Privacy
                        </Link>
                        <span>•</span>
                        <Link to="/terms-of-service" className="hover:text-white transition-colors">
                            Terms
                        </Link>
                        <span>•</span>
                        <Link to="/cookie-policy" className="hover:text-white transition-colors">
                            Cookies
                        </Link>
                        <span>•</span>
                        <Link to="/security" className="hover:text-white transition-colors">
                            Security
                        </Link>
                        <span>•</span>
                        <Link to="/contact" className="hover:text-white transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
