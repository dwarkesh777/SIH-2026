import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheckCircle, FiHelpCircle, FiArrowLeft } from 'react-icons/fi'
import PublicHeader from '../../components/common/PublicHeader'
import Footer from '../../components/common/Footer'

export const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        state: 'Goa',
        inquiryType: 'Farmer Technical Support',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setFormData({
                name: '',
                phone: '',
                email: '',
                state: 'Goa',
                inquiryType: 'Farmer Technical Support',
                message: ''
            })
        }, 5000)
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            <PublicHeader />

            <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 mb-6 transition-colors">
                    <FiArrowLeft size={14} />
                    <span>Back to Homepage</span>
                </Link>

                <div className="space-y-4 border-b border-slate-200 pb-8 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                        <FiPhone size={13} />
                        <span>Support & Research Cell</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
                        Contact AgriSmart AI
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                        Have questions regarding field sensor integration, disease diagnostics, or university researcher partnerships? Our dedicated agronomic engineering team is here to assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Contact Information Cards (1 col) */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                            <h3 className="text-base font-bold text-slate-900">Direct Inquiries</h3>

                            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                                        <FiPhone size={16} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Toll-Free Kisan Helpline</p>
                                        <p>1800-AGRI-SMART (1800-247-4762)</p>
                                        <p className="text-[11px] text-slate-400">Mon - Sat: 8:00 AM - 7:00 PM IST</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                                        <FiMail size={16} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Email Support</p>
                                        <p><a href="mailto:support@agrismart.ai" className="hover:text-emerald-600">support@agrismart.ai</a></p>
                                        <p><a href="mailto:research@agrismart.ai" className="hover:text-emerald-600">research@agrismart.ai</a></p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
                                        <FiMapPin size={16} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Research Headquarters</p>
                                        <p>National Agri-Telemetry Innovation Hub</p>
                                        <p>Panaji, Goa / New Delhi, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fast Response Guarantee */}
                        <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-5 text-xs text-emerald-900 space-y-2">
                            <div className="flex items-center gap-2 font-bold text-emerald-950">
                                <FiCheckCircle className="text-emerald-600" />
                                <span>24-Hour Resolution Target</span>
                            </div>
                            <p className="leading-relaxed">
                                Field telemetry tickets and pest diagnosis inquiries are assigned to certified university agronomists within 2 hours.
                            </p>
                        </div>
                    </div>

                    {/* Interactive Contact Form (2 cols) */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-black text-slate-900 mb-6">Send Us an Official Message</h2>

                        {submitted ? (
                            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                                <FiCheckCircle className="text-emerald-600 mx-auto" size={40} />
                                <h3 className="text-lg font-bold text-emerald-950">Message Submitted Successfully!</h3>
                                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                                    Thank you for reaching out. A confirmation has been generated and our agronomy engineering desk will respond shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Ramesh Patil"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="name@example.com"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Inquiry Category</label>
                                        <select
                                            value={formData.inquiryType}
                                            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none bg-white"
                                        >
                                            <option>Farmer Technical Support</option>
                                            <option>IoT Field Valve & Sensor Setup</option>
                                            <option>University Research Partnership</option>
                                            <option>APMC Market Data Integration</option>
                                            <option>General Inquiries</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700">Your Message or Issue Details *</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Please describe your farm question, sensor issue, or collaboration inquiry in detail..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-sm font-bold shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <FiSend size={15} />
                                    <span>Transmit Message</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default ContactPage
