import React from 'react'
import { Link } from 'react-router-dom'
import { FiCheckCircle, FiArrowLeft, FiInfo, FiSliders, FiDatabase } from 'react-icons/fi'
import PublicHeader from '../../components/common/PublicHeader'
import Footer from '../../components/common/Footer'

export const CookiePolicy = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            <PublicHeader />

            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 mb-6 transition-colors">
                    <FiArrowLeft size={14} />
                    <span>Back to Homepage</span>
                </Link>

                <div className="space-y-4 border-b border-slate-200 pb-8 mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
                        <FiSliders size={13} />
                        <span>Storage & Cookies</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
                        Cookie & Storage Policy
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                        Last updated: September 13, 2026. This policy explains how AgriSmart AI uses cookies, HTML5 LocalStorage, and session tokens to deliver an optimal experience.
                    </p>
                </div>

                <div className="space-y-10 text-sm sm:text-base text-slate-700 leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-xl font-black text-slate-900">1. What Are Cookies and Local Storage?</h2>
                        <p>
                            Cookies and browser local storage are small data files placed on your device by websites you visit. They are widely used to make modern web applications work efficiently, remember your language preferences, and maintain secure user authentication sessions.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-black text-slate-900">2. Categories of Storage We Use</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md inline-block">
                                    Strictly Necessary
                                </span>
                                <h3 className="text-base font-bold text-slate-900">Authentication & Security Tokens</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Stores encrypted JWT access tokens (<code>access_token</code>, <code>role</code>) to verify farmer or scientist identity across protected API routes and prevent session hijacking.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                                <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md inline-block">
                                    Preferences
                                </span>
                                <h3 className="text-base font-bold text-slate-900">Language & Dialect Selection</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Remembers your chosen agricultural translation language (Hindi, Marathi, English, Gujarati, etc.) via <code>i18nextLng</code> so the portal renders in your native tongue automatically.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                                <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-100 px-2.5 py-1 rounded-md inline-block">
                                    Functional Telemetry
                                </span>
                                <h3 className="text-base font-bold text-slate-900">Offline Sensor Sync Cache</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Temporarily buffers field valve schedules and offline leaf diagnosis logs when working in low-connectivity rural field zones until internet connectivity is restored.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                                <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-1 rounded-md inline-block">
                                    Zero Ad Trackers
                                </span>
                                <h3 className="text-base font-bold text-slate-900">No Third-Party Ad Cookies</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    AgriSmart AI operates with zero commercial cross-site tracking cookies. We do not integrate commercial ad tracking pixels or behavioral marketing scripts.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-black text-slate-900">3. How to Manage or Clear Cookies</h2>
                        <p>
                            You can easily manage, review, or clear your cookies and local storage through your browser settings:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm">
                            <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Third-party cookies and site data.</li>
                            <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data.</li>
                            <li><strong>Safari / iOS:</strong> Settings → Safari → Clear History and Website Data.</li>
                        </ul>
                        <p className="text-xs text-slate-500 italic">
                            *Note: Clearing essential authentication storage will require you to log back into your farmer or scientist account upon your next visit.
                        </p>
                    </section>

                    <section className="space-y-3 border-t border-slate-200 pt-8">
                        <h2 className="text-xl font-black text-slate-900">4. Contact Us</h2>
                        <p className="text-sm text-slate-600">
                            For technical questions regarding our cookie implementation, please email <a href="mailto:privacy@agrismart.ai" className="text-emerald-600 font-semibold underline">privacy@agrismart.ai</a>.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default CookiePolicy
