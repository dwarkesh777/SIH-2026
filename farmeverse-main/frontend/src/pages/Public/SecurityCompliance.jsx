import React from 'react'
import { Link } from 'react-router-dom'
import { FiShield, FiLock, FiServer, FiCpu, FiCheckCircle, FiArrowLeft, FiActivity, FiKey } from 'react-icons/fi'
import PublicHeader from '../../components/common/PublicHeader'
import Footer from '../../components/common/Footer'

export const SecurityCompliance = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            <PublicHeader />

            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 mb-6 transition-colors">
                    <FiArrowLeft size={14} />
                    <span>Back to Homepage</span>
                </Link>

                <div className="space-y-4 border-b border-slate-200 pb-8 mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                        <FiShield size={13} />
                        <span>Infrastructure Defense</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
                        Security & Compliance
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                        AgriSmart AI employs enterprise-grade cryptographic security, isolated microservice architecture, and zero-trust IoT edge device authentication to safeguard mission-critical agricultural infrastructure.
                    </p>
                </div>

                {/* 4 Pillars of AgriSmart Defense */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                            <FiLock size={24} />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">Cryptographic Data Protection</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            All API communication utilizes TLS 1.3 with Perfect Forward Secrecy (PFS). Database records, historical soil metrics, and crop health scans are encrypted at rest using industry-standard AES-256 cipher blocks.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                            <FiCpu size={24} />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">Edge IoT Gateway Hardening</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Field sensor hubs and automated valve relays authenticate via mutual TLS (mTLS) with cryptographically unique hardware keys, preventing rogue signal spoofing or unauthorized field valve actuation.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center">
                            <FiKey size={24} />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">Zero-Trust Role-Based Access (RBAC)</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Strict tenant isolation ensures farmers only access their assigned parcels. University scientists, agronomists, and system administrators operate under least-privilege access token architectures with short expiration windows.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                            <FiServer size={24} />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">High Availability & Resiliency</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Deployed across redundant cloud availability zones with automated failover, delivering 99.98% operational uptime. Automated continuous backups with immutable transaction logs ensure zero data loss during network disruptions.
                        </p>
                    </div>
                </div>

                <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-xl font-black text-slate-900">Compliance & Regulatory Standards</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                            <li className="bg-slate-100 p-3 rounded-lg flex items-center gap-2">
                                <FiCheckCircle className="text-emerald-600 shrink-0" />
                                <span>Digital Personal Data Protection Act (DPDP Act 2023)</span>
                            </li>
                            <li className="bg-slate-100 p-3 rounded-lg flex items-center gap-2">
                                <FiCheckCircle className="text-emerald-600 shrink-0" />
                                <span>National Data Governance Framework Policy (NDGFP)</span>
                            </li>
                            <li className="bg-slate-100 p-3 rounded-lg flex items-center gap-2">
                                <FiCheckCircle className="text-emerald-600 shrink-0" />
                                <span>OWASP Top 10 API Security Compliance</span>
                            </li>
                            <li className="bg-slate-100 p-3 rounded-lg flex items-center gap-2">
                                <FiCheckCircle className="text-emerald-600 shrink-0" />
                                <span>Smart India Hackathon (SIH 2026) Architecture Verification</span>
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-3 border-t border-slate-200 pt-8">
                        <h2 className="text-xl font-black text-slate-900">Vulnerability Disclosure Program</h2>
                        <p className="text-sm text-slate-600">
                            We encourage responsible security researchers and agronomy institutions to report potential vulnerabilities. Please submit proof-of-concept reports to our security engineering team:
                        </p>
                        <div className="bg-slate-100 rounded-xl p-4 text-xs sm:text-sm font-mono text-slate-800 space-y-1">
                            <p><strong>Security Operations:</strong> security@agrismart.ai</p>
                            <p><strong>PGP Key Fingerprint:</strong> 9D42 A8C1 3F10 8E6B 2201 445F 7A1C 92BE</p>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default SecurityCompliance
