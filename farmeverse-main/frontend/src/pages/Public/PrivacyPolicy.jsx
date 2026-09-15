import React from 'react'
import { Link } from 'react-router-dom'
import { FiShield, FiLock, FiCheckCircle, FiArrowLeft, FiDatabase, FiEye, FiUserCheck, FiFileText } from 'react-icons/fi'
import PublicHeader from '../../components/common/PublicHeader'
import Footer from '../../components/common/Footer'

export const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            <PublicHeader />

            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Back Link */}
                <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 mb-6 transition-colors">
                    <FiArrowLeft size={14} />
                    <span>Back to Homepage</span>
                </Link>

                {/* Hero Header */}
                <div className="space-y-4 border-b border-slate-200 pb-8 mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                        <FiShield size={13} />
                        <span>Data Governance & Privacy</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                        Last updated: September 13, 2026. AgriSmart AI is committed to protecting the privacy, sovereignty, and security of farmers, agricultural scientists, and ecosystem partners.
                    </p>
                </div>

                {/* Key Privacy Highlights Card */}
                <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 mb-10 space-y-3">
                    <h2 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                        <FiCheckCircle className="text-emerald-600" />
                        <span>Our Core Privacy Commitments</span>
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-emerald-900/90">
                        <li className="flex items-start gap-2">
                            <span className="font-bold text-emerald-700">✓</span>
                            <span><strong>100% Farmer Data Ownership:</strong> You retain complete legal ownership of all field imagery, soil data, and farm records.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold text-emerald-700">✓</span>
                            <span><strong>Zero Commercial Sale:</strong> We never sell, lease, or monetize individual farmer telemetry to third-party ad brokers.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold text-emerald-700">✓</span>
                            <span><strong>End-to-End Encryption:</strong> TLS 1.3 encryption in transit and AES-256 encryption at rest across all storage nodes.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold text-emerald-700">✓</span>
                            <span><strong>Right to Export & Delete:</strong> Export your full farm telemetry into standard GeoJSON/CSV or purge your account anytime.</span>
                        </li>
                    </ul>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-10 text-sm sm:text-base text-slate-700 leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            <FiDatabase className="text-emerald-600" />
                            <span>1. Information We Collect</span>
                        </h2>
                        <p>
                            To provide precision agriculture recommendations, disease detection models, and autonomous IoT valve actuation, AgriSmart AI collects:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm">
                            <li><strong>Farmer Account Details:</strong> Name, phone number (for OTP authentication), preferred language dialect, and cooperative/FPO affiliation.</li>
                            <li><strong>Field Geodata & Farm Boundaries:</strong> Latitude/longitude boundaries, acreage, soil types, and primary crop cultivars.</li>
                            <li><strong>Sensor & IoT Telemetry:</strong> Real-time soil moisture percentages, ambient field temperature, humidity, and valve telemetry collected by edge gateways.</li>
                            <li><strong>Crop Leaf Photographs:</strong> Leaf and foliage images uploaded for deep vision neural network disease diagnosis.</li>
                            <li><strong>Mandi Market Inquiries:</strong> APMC commodity queries, historical pricing comparisons, and yield estimations.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            <FiEye className="text-emerald-600" />
                            <span>2. How Your Data Is Processed</span>
                        </h2>
                        <p>
                            All collected data is processed strictly for precision agronomic decision support:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm">
                            <li>Running PyTorch deep vision models to diagnose leaf pathogens and calculate confidence scores.</li>
                            <li>Calculating evapotranspiration deficits to trigger automated IoT field valves.</li>
                            <li>Formulating customized NPK organic soil treatment protocols with university agronomy research teams.</li>
                            <li>Aggregating anonymized regional climate statistics for public research under the Smart India Hackathon framework.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            <FiLock className="text-emerald-600" />
                            <span>3. Security & Storage Infrastructure</span>
                        </h2>
                        <p>
                            Your agricultural data is hosted on sovereign cloud servers situated within the Republic of India adhering to the Digital Personal Data Protection Act (DPDP 2023) and National Data Governance Framework Policy (NDGFP):
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm">
                            <li>Restricted Role-Based Access Control (RBAC) preventing unauthorized cross-farm data leakage.</li>
                            <li>Encrypted MQTT protocols for IoT gateway communication with hardware token authentication.</li>
                            <li>Daily automated encrypted backups with geo-redundant disaster recovery snapshots.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            <FiUserCheck className="text-emerald-600" />
                            <span>4. Your Rights & Data Portability</span>
                        </h2>
                        <p>
                            As a registered farmer or institution, you have the statutory right to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm">
                            <li><strong>Access & Inspect:</strong> Review every photo, sensor reading, and diagnosis log stored in your profile.</li>
                            <li><strong>Export Data:</strong> Download your multi-season yield records in open CSV, Excel, or JSON formats.</li>
                            <li><strong>Request Erasure:</strong> Purge your account, historical imagery, and field geometry within 7 business days.</li>
                        </ul>
                    </section>

                    <section className="space-y-3 border-t border-slate-200 pt-8">
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            <FiFileText className="text-emerald-600" />
                            <span>5. Contact Our Data Protection Officer (DPO)</span>
                        </h2>
                        <p className="text-sm text-slate-600">
                            If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our dedicated Data Governance Cell:
                        </p>
                        <div className="bg-slate-100 rounded-xl p-4 text-xs sm:text-sm font-mono text-slate-800 space-y-1">
                            <p><strong>Email:</strong> privacy@agrismart.ai</p>
                            <p><strong>Grievance Officer:</strong> National Agriculture Telemetry Cell, New Delhi / Goa, India</p>
                            <p><strong>Helpline:</strong> 1800-AGRI-SMART (Toll-Free, 9 AM - 6 PM IST)</p>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default PrivacyPolicy
