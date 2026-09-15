import React from 'react'
import { Link } from 'react-router-dom'
import { FiFileText, FiAlertCircle, FiCheckCircle, FiArrowLeft, FiCpu, FiShield, FiHelpCircle } from 'react-icons/fi'
import PublicHeader from '../../components/common/PublicHeader'
import Footer from '../../components/common/Footer'

export const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            <PublicHeader />

            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 mb-6 transition-colors">
                    <FiArrowLeft size={14} />
                    <span>Back to Homepage</span>
                </Link>

                <div className="space-y-4 border-b border-slate-200 pb-8 mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                        <FiFileText size={13} />
                        <span>Platform Usage Terms</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
                        Terms of Service
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                        Last updated: September 13, 2026. Please read these terms carefully before accessing or using the AgriSmart AI precision agriculture platform.
                    </p>
                </div>

                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 mb-10 space-y-3">
                    <h2 className="text-base font-bold text-amber-950 flex items-center gap-2">
                        <FiAlertCircle className="text-amber-600" />
                        <span>Important Agronomic & AI Diagnostics Advisory</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                        AgriSmart AI utilizes deep learning vision models and IoT telemetry to provide high-confidence advisory (91.84% macro-F1 accuracy). While highly reliable, automated recommendations do not substitute for emergency on-ground physical interventions during severe epidemic outbreaks. Farmers are encouraged to utilize our built-in Expert Scientist consultation portal for critical crop emergencies.
                    </p>
                </div>

                <div className="space-y-10 text-sm sm:text-base text-slate-700 leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-xl font-black text-slate-900">1. Acceptance of Terms</h2>
                        <p>
                            By creating an account, connecting field hardware gateways, or accessing the AgriSmart AI web portal, you agree to comply with and be legally bound by these Terms of Service. If you are accessing the service on behalf of a Farmer Producer Organization (FPO) or university, you represent that you have legal authority to bind such entity.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-black text-slate-900">2. Permitted Use & Account Responsibilities</h2>
                        <p>
                            Users are granted a revocable, non-exclusive, non-transferable license to utilize the platform for agricultural management, scientific advisory, and farm telemetry analysis. You agree:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm">
                            <li>To provide accurate farm location and crop data to ensure precision recommendation accuracy.</li>
                            <li>To maintain the confidentiality of your authentication credentials and OTP tokens.</li>
                            <li>Not to reverse-engineer, decompile, or tamper with edge valve firmware or API endpoints.</li>
                            <li>Not to deploy malicious payloads or scrape APMC price streams at non-standard frequencies.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-black text-slate-900">3. Autonomous IoT Valve & Edge Safety</h2>
                        <p>
                            When utilizing automated IoT irrigation controllers, farmers retain physical manual override authority on all field solenoid valves. AgriSmart AI is not liable for mechanical hardware valve failure, electrical short-circuits caused by third-party pumps, or utility power disruptions in rural distribution grids.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-black text-slate-900">4. Intellectual Property Rights</h2>
                        <p>
                            All underlying neural network architectures, custom UI design systems, codebases, and trademark assets are the proprietary intellectual property of the AgriSmart AI development consortium built under the Smart India Hackathon (SIH 2026). Farmer uploaded imagery and field sensor data remain the sole intellectual property of the respective farmer.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-black text-slate-900">5. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted under applicable law, AgriSmart AI and its university research partners shall not be held liable for indirect, incidental, or consequential damages arising from regional meteorological deviations, unprecedented pest climate migrations, or force majeure agricultural events.
                        </p>
                    </section>

                    <section className="space-y-3 border-t border-slate-200 pt-8">
                        <h2 className="text-xl font-black text-slate-900">6. Modifications & Inquiries</h2>
                        <p className="text-sm text-slate-600">
                            We reserve the right to revise these Terms to reflect legislative changes in agricultural policy or platform enhancements. For legal notices:
                        </p>
                        <div className="bg-slate-100 rounded-xl p-4 text-xs sm:text-sm font-mono text-slate-800 space-y-1">
                            <p><strong>Legal Inquiries:</strong> legal@agrismart.ai</p>
                            <p><strong>Support Hotline:</strong> 1800-AGRI-SMART (Toll-Free)</p>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default TermsOfService
