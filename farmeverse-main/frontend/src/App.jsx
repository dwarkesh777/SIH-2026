import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiMenu, FiX, FiBell, FiLogOut, FiUser, FiGrid, FiMap, FiFileText,
    FiTrendingUp, FiDollarSign, FiCloudRain, FiCpu, FiDroplet, FiAward,
    FiMessageSquare, FiBarChart2, FiCalendar, FiCheckCircle, FiZap,
    FiLayers, FiShield, FiActivity, FiChevronRight, FiChevronLeft
} from 'react-icons/fi'
import Logo from './components/common/Logo'
import LanguageSwitcher from './components/common/LanguageSwitcher'
import { useTranslation } from './hooks/useTranslation'
import FarmerAssistantModal from './components/common/FarmerAssistantModal'

import LandingPage from './pages/LandingPage'
import PrivacyPolicy from './pages/Public/PrivacyPolicy'
import TermsOfService from './pages/Public/TermsOfService'
import CookiePolicy from './pages/Public/CookiePolicy'
import SecurityCompliance from './pages/Public/SecurityCompliance'
import AboutPage from './pages/Public/AboutPage'
import ContactPage from './pages/Public/ContactPage'
import FarmerLogin from './pages/Authentication/FarmerLogin'
import FarmerRegister from './pages/Authentication/FarmerRegister'
import ForgotPasswordFlow from './pages/Authentication/ForgotPasswordFlow'
import ExpertLogin from './pages/Authentication/ExpertLogin'
import ExpertRegister from './pages/Authentication/ExpertRegister'
import AdminLogin from './pages/Authentication/AdminLogin'
import AdminRegister from './pages/Authentication/AdminRegister'
import NotFoundPage from './pages/NotFoundPage'
import FarmerDashboard from './pages/Farmer/FarmerDashboard'
import MyFarms from './pages/Farmer/MyFarms'
import CropRecords from './pages/Farmer/CropRecords'
import ProfitCalculator from './pages/Farmer/ProfitCalculator'
import MarketPrices from './pages/Farmer/MarketPrices'
import DiseaseDetection from './pages/Farmer/DiseaseDetection'
import Weather from './pages/Farmer/Weather'
import CropRecommendation from './pages/Farmer/CropRecommendation'
import SmartIrrigation from './pages/Farmer/SmartIrrigation'
import SustainabilityScore from './pages/Farmer/SustainabilityScore'
import FarmerProfile from './pages/Farmer/FarmerProfile'
import { ExpertConsultation } from './pages/Farmer/ExpertConsultation'
import { ExpertDashboard } from './pages/Expert/ExpertDashboard'
import { ExpertProfile } from './pages/Expert/ExpertProfile'
import { SendMessage } from './pages/Farmer/SendMessage'
import { MyConsultations } from './pages/Farmer/MyConsultations'
import { ExpertInbox } from './pages/Expert/ExpertInbox'
import { ConversationView } from './pages/Expert/ConversationView'
import { ExpertFarmerList } from './pages/Expert/ExpertFarmerList'
import { ExpertAvailability } from './pages/Expert/ExpertAvailability'
import { authAPI, notificationAPI } from './services/api'
import AdminExpertManagement from './pages/Admin/AdminExpertManagement'
import AdminConsultationCenter from './pages/Admin/AdminConsultationCenter'
import AdminAnalytics from './pages/Admin/AdminAnalytics'
import AdminProfile from './pages/Admin/AdminProfile'

import EmptyState from './components/common/EmptyState'

// Clean Empty-State Page Component
const EmptyStatePage = ({ name }) => (
    <div className="p-4 md:p-8">
        <EmptyState
            icon={FiUser}
            title={name}
            description="This section is not yet available. New features and integrations will appear here in future updates."
        />
    </div>
)

// Categorized Navigation Scheme
const getCategorizedNav = (role) => {
    if (role === 'farmer') {
        return [
            {
                category: 'Farm Operations',
                items: [
                    { to: 'dashboard', label: 'Dashboard Overview', icon: FiGrid },
                    { to: 'my-farm', label: 'My Farm Land', icon: FiMap },
                    { to: 'crops', label: 'Crop Records', icon: FiFileText },
                    { to: 'market', label: 'Market Intelligence', icon: FiTrendingUp },
                    { to: 'profit-calculator', label: 'Profit Calculator', icon: FiDollarSign },
                ]
            },
            {
                category: 'AI & Precision Engine',
                items: [
                    { to: 'crop-recommendation', label: 'Crop Recommendation', icon: FiLayers, badge: 'AI' },
                    { to: 'disease-detection', label: 'Disease Scanner (CV)', icon: FiCpu, badge: '91.8%' },
                    { to: 'smart-irrigation', label: 'Smart Irrigation', icon: FiDroplet, badge: 'IoT' },
                    { to: 'sustainability-score', label: 'Sustainability (ESG)', icon: FiAward, badge: 'Eco' },
                    { to: 'weather', label: 'Weather Radar', icon: FiCloudRain },
                ]
            },
            {
                category: 'Advisory & Services',
                items: [
                    { to: 'consultation', label: 'Expert Advisory', icon: FiMessageSquare },
                    { to: 'profile', label: 'Farmer Profile', icon: FiUser },
                ]
            }
        ]
    }

    if (role === 'admin') {
        return [
            {
                category: 'Administration',
                items: [
                    { to: 'dashboard', label: 'Expert Management', icon: FiGrid },
                    { to: 'consultation', label: 'Consultation Monitor', icon: FiMessageSquare },
                ]
            },
            {
                category: 'Analytics & Config',
                items: [
                    { to: 'analytics', label: 'System Analytics', icon: FiBarChart2, badge: 'Live' },
                    { to: 'profile', label: 'Admin Profile', icon: FiUser },
                ]
            }
        ]
    }

    // Expert role
    return [
        {
            category: 'Consultation Hub',
            items: [
                { to: 'dashboard', label: 'Expert Dashboard', icon: FiGrid },
                { to: 'consultation', label: 'Case Inbox', icon: FiMessageSquare, badge: 'Active' },
                { to: 'farmer-list', label: 'Assigned Farmers', icon: FiFileText },
            ]
        },
        {
            category: 'Availability & Account',
            items: [
                { to: 'availability', label: 'Schedule & Slots', icon: FiCalendar },
                { to: 'profile', label: 'Expert Profile', icon: FiUser },
            ]
        }
    ]
}

// Main Dashboard Layout
const DashboardLayout = ({ role, children }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(() => {
        return localStorage.getItem('sidebar_collapsed') === 'true'
    })

    const toggleCollapse = () => {
        setIsCollapsed(prev => {
            const next = !prev
            localStorage.setItem('sidebar_collapsed', String(next))
            return next
        })
    }

    const [userName, setUserName] = useState('Farmer Friend')
    const [userEmail, setUserEmail] = useState('')
    const [showNotifications, setShowNotifications] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [isAssistantOpen, setIsAssistantOpen] = useState(false)

    const navGroups = getCategorizedNav(role)

    const fetchNotifications = async () => {
        try {
            if (notificationAPI) {
                const res = await notificationAPI.getAll()
                if (res.success && res.data) {
                    setNotifications(res.data)
                    setUnreadCount(res.data.filter(n => !n.is_read).length)
                }
            }
        } catch (err) {
            console.error("Failed to fetch notifications:", err)
        }
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            try {
                const userObj = JSON.parse(storedUser)
                if (userObj) {
                    if (userObj.full_name) setUserName(userObj.full_name)
                    if (userObj.email) setUserEmail(userObj.email)
                }
                const token = localStorage.getItem('access_token')
                if (token && token !== 'null' && token !== 'undefined') {
                    fetchNotifications()
                    const interval = setInterval(fetchNotifications, 30000)
                    return () => clearInterval(interval)
                }
            } catch (err) {
                console.error(err)
            }
        }
    }, [])

    const handleMarkAsRead = async (id) => {
        try {
            await notificationAPI.markAsRead(id)
            await fetchNotifications()
        } catch (err) {
            console.error("Failed to mark as read:", err)
        }
    }

    const handleLogout = async () => {
        try {
            if (authAPI && authAPI.logout) {
                await authAPI.logout()
            }
        } catch (err) {
            console.error('Logout error:', err)
        } finally {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
            localStorage.removeItem('role')
            sessionStorage.clear()
            navigate(`/${role}/login`, { replace: true })
        }
    }

    const sidebarThemes = {
        farmer: {
            asideBg: 'bg-[#058c63]',
            categoryText: 'text-emerald-100/80',
            inactiveLink: 'text-emerald-50/90 hover:bg-white/10 hover:text-white',
            inactiveIcon: 'text-emerald-100/90 group-hover:text-white',
            activeBadge: 'bg-emerald-100 text-[#058c63] border-emerald-300',
            inactiveBadge: 'bg-black/20 text-emerald-100 border-white/20',
            widgetBg: 'bg-black/15 border-white/15 text-white',
            widgetAccent: 'text-emerald-200',
            widgetSub: 'text-emerald-100/75',
            divider: 'border-white/15',
            avatar: 'bg-white text-[#058c63] border-white/30',
            logoutBtn: 'text-emerald-100 hover:text-white hover:bg-white/15 border-white/20 hover:border-white/40',
            roleBadge: 'bg-white/20 text-white border-white/30',
            activeIconColor: 'text-[#058c63]',
        },
        expert: {
            asideBg: 'bg-slate-900',
            categoryText: 'text-slate-400',
            inactiveLink: 'text-slate-300 hover:bg-slate-800/80 hover:text-white',
            inactiveIcon: 'text-slate-400 group-hover:text-emerald-400',
            activeBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
            inactiveBadge: 'bg-slate-800 text-emerald-300 border-slate-700',
            widgetBg: 'bg-slate-800/80 border-slate-700/60 text-slate-300',
            widgetAccent: 'text-emerald-400',
            widgetSub: 'text-slate-400',
            divider: 'border-slate-800',
            avatar: 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white border-emerald-400/30',
            logoutBtn: 'text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 border-slate-700/60 hover:border-rose-800/40',
            roleBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
            activeIconColor: 'text-emerald-700',
        },
        admin: {
            asideBg: 'bg-slate-900',
            categoryText: 'text-slate-400',
            inactiveLink: 'text-slate-300 hover:bg-slate-800/80 hover:text-white',
            inactiveIcon: 'text-slate-400 group-hover:text-emerald-400',
            activeBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
            inactiveBadge: 'bg-slate-800 text-emerald-300 border-slate-700',
            widgetBg: 'bg-slate-800/80 border-slate-700/60 text-slate-300',
            widgetAccent: 'text-emerald-400',
            widgetSub: 'text-slate-400',
            divider: 'border-slate-800',
            avatar: 'bg-gradient-to-tr from-purple-600 to-indigo-500 text-white border-purple-400/30',
            logoutBtn: 'text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 border-slate-700/60 hover:border-rose-800/40',
            roleBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
            activeIconColor: 'text-emerald-700',
        },
    }

    const theme = sidebarThemes[role] || sidebarThemes.farmer

    const sidebarContent = (
        <div className="flex flex-col h-full select-none">
            {/* Brand Header */}
            <div className={`pr-3 pb-5 mb-4 border-b ${theme.divider} flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                <Link to="/" className="hover:opacity-95 transition-opacity" title="AgriSmart AI">
                    <Logo size={isCollapsed ? 'sm' : 'md'} showText={!isCollapsed} invert={true} />
                </Link>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white md:hidden transition-colors"
                >
                    <FiX size={20} />
                </button>
            </div>
            {!isCollapsed && (
                <div className="mt-[-8px] mb-4 pr-3 flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${theme.roleBadge}`}>
                        {role === 'farmer' ? 'Farmer Portal' : role === 'expert' ? 'Agricultural Expert' : 'Platform Administrator'}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                        v2.4
                    </span>
                </div>
            )}

            {/* Categorized Navigation */}
            <nav className="flex-1 space-y-5 overflow-y-auto py-2 pr-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {navGroups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-1.5">
                        {isCollapsed ? (
                            <div className="my-2 border-t border-white/10 mr-2" />
                        ) : (
                            <div className={`text-[10px] font-bold uppercase tracking-wider ${theme.categoryText} px-3 pr-4 flex items-center gap-1.5`}>
                                <span>{group.category}</span>
                            </div>
                        )}
                        <div className="space-y-1.5">
                            {group.items.map((link) => {
                                const Icon = link.icon
                                return (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setSidebarOpen(false)}
                                        title={link.label}
                                        className={({ isActive }) =>
                                            `group flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between pl-3.5 pr-4'} py-2.5 text-xs font-semibold transition-all duration-200 ease-out relative ${
                                                isActive
                                                    ? 'bg-slate-50 text-slate-900 font-bold rounded-l-2xl rounded-r-none mr-0 z-10 shadow-[-3px_0_8px_rgba(0,0,0,0.02)]'
                                                    : `${isCollapsed ? 'mr-2 px-0' : 'mr-3 px-3.5'} ${theme.inactiveLink} rounded-xl`
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {/* Smooth top inverted curve connecting to page */}
                                                {isActive && (
                                                    <svg
                                                        className="hidden md:block absolute right-0 -top-3 w-3 h-3 pointer-events-none z-10"
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M0 12 C6 12 12 6 12 0 L12 12 Z" fill="#f8fafc" />
                                                    </svg>
                                                )}

                                                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
                                                    <Icon
                                                        size={isCollapsed ? 18 : 16}
                                                        className={`transition-transform group-hover:scale-110 flex-shrink-0 ${
                                                            isActive ? theme.activeIconColor : theme.inactiveIcon
                                                        }`}
                                                    />
                                                    {!isCollapsed && (
                                                        <span className={isActive ? 'text-slate-900 font-black tracking-tight truncate' : 'truncate'}>
                                                            {link.label}
                                                        </span>
                                                    )}
                                                </div>

                                                {!isCollapsed && link.badge && (
                                                    <span
                                                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border flex-shrink-0 ${
                                                            isActive
                                                                ? theme.activeBadge
                                                                : theme.inactiveBadge
                                                        }`}
                                                    >
                                                        {link.badge}
                                                    </span>
                                                )}

                                                {isCollapsed && link.badge && (
                                                    <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-300" />
                                                )}

                                                {/* Smooth bottom inverted curve connecting to page */}
                                                {isActive && (
                                                    <svg
                                                        className="hidden md:block absolute right-0 -bottom-3 w-3 h-3 pointer-events-none z-10"
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M12 12 C12 6 6 0 0 0 L12 0 Z" fill="#f8fafc" />
                                                    </svg>
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Live System Status Widget */}
            {isCollapsed ? (
                <div className="flex justify-center my-3 pr-2" title="AI Core Active: Telemetry Synced">
                    <div className="w-8 h-8 rounded-xl bg-black/15 border border-white/15 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                    </div>
                </div>
            ) : (
                <div className={`mr-4 mt-4 pt-3 pb-3 px-3 ${theme.widgetBg} rounded-xl border text-[11px] space-y-1`}>
                    <div className={`flex items-center justify-between font-bold ${theme.widgetAccent}`}>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                            AI Core Active
                        </span>
                        <span className="text-[9px] text-white/70 font-mono">SIH-2026</span>
                    </div>
                    <p className={`text-[10px] ${theme.widgetSub}`}>Edge & Cloud Telemetry Synced</p>
                </div>
            )}

            {/* Bottom Profile & Logout Footer */}
            {isCollapsed ? (
                <div className={`pt-3 border-t ${theme.divider} flex flex-col items-center gap-2 pr-2`}>
                    <div
                        className={`w-8 h-8 rounded-full ${theme.avatar} flex items-center justify-center font-black text-xs shadow-inner flex-shrink-0 border`}
                        title={`${userName} (${role})`}
                    >
                        {userName.slice(0, 1).toUpperCase()}
                    </div>
                    <button
                        onClick={handleLogout}
                        title="Logout session"
                        className={`p-2 rounded-lg ${theme.logoutBtn} transition-all duration-150`}
                    >
                        <FiLogOut size={15} />
                    </button>
                </div>
            ) : (
                <div className={`pr-4 mr-4 mt-3 pt-3 border-t ${theme.divider} flex items-center justify-between`}>
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-8 h-8 rounded-full ${theme.avatar} flex items-center justify-center font-black text-xs shadow-inner flex-shrink-0 border`}>
                            {userName.slice(0, 1).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate max-w-[100px]">{userName}</p>
                            <p className="text-[9px] text-emerald-100/75 capitalize truncate">{role}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        title="Logout session"
                        className={`p-2 rounded-lg ${theme.logoutBtn} transition-all duration-150`}
                    >
                        <FiLogOut size={15} />
                    </button>
                </div>
            )}
        </div>
    )

    return (
        <div className="min-h-screen flex bg-slate-50 text-slate-800 font-sans">
            {/* Desktop Modern Glassmorphic Sidebar */}
            <aside className={`relative ${isCollapsed ? 'w-20 pl-2' : 'w-68 pl-4'} ${theme.asideBg} text-white pt-5 pb-5 pr-0 md:sticky md:top-0 h-screen md:flex flex-col hidden flex-shrink-0 shadow-2xl z-20 transition-all duration-300 ease-in-out`}>
                {/* Desktop Left / Right Sidebar Collapse Toggle Button */}
                <button
                    onClick={toggleCollapse}
                    className="hidden md:flex absolute -right-3.5 top-7 z-40 w-7 h-7 bg-white text-slate-800 hover:text-emerald-700 hover:scale-110 active:scale-95 rounded-full shadow-md border border-slate-200 items-center justify-center transition-all duration-200 cursor-pointer"
                    title={isCollapsed ? "Open sidebar" : "Close sidebar"}
                    aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
                >
                    {isCollapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
                </button>

                {sidebarContent}
            </aside>

            {/* Mobile Sidebar Navigation Drawer */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden animate-fadeIn"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <aside
                className={`fixed inset-y-0 left-0 w-72 ${theme.asideBg} text-white pl-4 pt-5 pb-5 pr-4 z-50 transform transition-transform duration-300 md:hidden shadow-2xl ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {sidebarContent}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 p-4 md:p-6 lg:p-8 overflow-x-hidden bg-slate-50">
                {/* Floating Modern Header */}
                <header className="flex justify-between items-center mb-6 bg-white/85 backdrop-blur-md px-4 md:px-6 py-3.5 rounded-2xl shadow-sm border border-emerald-900/10 relative z-30">
                    <div className="flex items-center gap-3">
                        {role !== 'farmer' && (
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 rounded-xl text-slate-700 hover:bg-emerald-50 md:hidden transition-colors border border-slate-200"
                                aria-label="Toggle Navigation"
                            >
                                <FiMenu size={20} />
                            </button>
                        )}
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider hidden sm:inline">
                                    AgriSmart AI
                                </span>
                                <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                                <h1 className="text-base md:text-lg font-black text-slate-900 capitalize">
                                    {role === 'farmer' ? 'Farmer Intelligent Portal' : `${role} Control Center`}
                                </h1>
                            </div>
                            <p className="text-[11px] text-slate-500 hidden sm:block">Real-time precision farm management & AI analytics</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 md:gap-3.5">
                        {/* IoT & Telemetry Live Chip */}
                        <div className="hidden lg:flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>IoT Gateway: Live</span>
                        </div>

                        {/* GenAI Voice Assistant Quick Trigger */}
                        {role === 'farmer' && (
                            <button
                                onClick={() => setIsAssistantOpen(true)}
                                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-xs font-bold shadow-sm shadow-emerald-700/20 hover:from-emerald-700 hover:to-teal-700 hover:scale-105 transition-all duration-200"
                            >
                                <FiZap size={14} className="text-yellow-300 animate-bounce" />
                                <span>AI Assistant</span>
                            </button>
                        )}

                        {/* Notifications Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 relative transition-all border border-slate-200/70"
                                aria-label="Notifications"
                            >
                                <FiBell size={18} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
                                )}
                            </button>

                            {showNotifications && (
                                <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200 p-4 z-50 space-y-3 animate-fadeIn">
                                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-black text-slate-900">Notifications</span>
                                            {unreadCount > 0 && (
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                                                    {unreadCount} new
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            className="text-[11px] text-emerald-600 hover:underline font-semibold"
                                            onClick={() => setShowNotifications(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                    <div className="space-y-2 max-h-56 overflow-y-auto pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {notifications.length === 0 ? (
                                            <div className="p-4 text-center text-slate-400 text-xs">No new notifications</div>
                                        ) : (
                                            notifications.map(notif => (
                                                <div
                                                    key={notif.id}
                                                    onClick={() => !notif.is_read && handleMarkAsRead(notif.id)}
                                                    className={`p-2.5 rounded-xl text-xs border cursor-pointer transition-all ${
                                                        notif.is_read
                                                            ? 'bg-slate-50/50 text-slate-600 border-slate-100'
                                                            : 'bg-emerald-50/70 border-emerald-200 font-semibold text-slate-900 shadow-xs hover:bg-emerald-100/60'
                                                    }`}
                                                >
                                                    <p className="font-bold text-slate-900">{notif.title}</p>
                                                    <p className="text-[11px] text-slate-600 mt-0.5">{notif.message}</p>
                                                    <span className="text-[9px] text-slate-400 block mt-1">
                                                        {new Date(notif.created_at).toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Global System Pill */}
                        <LanguageSwitcher />

                        {/* Profile Chip */}
                        <div className="flex items-center gap-2 pl-1">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-black text-xs border-2 border-white shadow-sm select-none">
                                {userName.slice(0, 1).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Animated Page Router Outlet */}
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex-1"
                >
                    {children}
                </motion.div>

            </main>

            {/* AI Voice & Text Modal for Farmers */}
            {role === 'farmer' && (
                <FarmerAssistantModal
                    isOpen={isAssistantOpen}
                    onClose={() => setIsAssistantOpen(false)}
                />
            )}
        </div>
    )
}

// ProtectedRoute Wrapper to centralize token check and prevent unauthenticated access
const ProtectedRoute = ({ role, children }) => {
    const token = localStorage.getItem('access_token');

    // Check if token exists
    if (!token) {
        return <Navigate to={`/${role}/login`} replace />;
    }

    // Role check to ensure right user is accessing right module
    const userRole = localStorage.getItem('role');
    if (userRole && userRole.toLowerCase() !== role.toLowerCase()) {
        return <Navigate to={`/${role}/login`} replace />;
    }

    return children;
}

// Always scroll to the top of the page on refresh or route navigation
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);
        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
};

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* Public Landing Area */}
                <Route path="/" element={<LandingPage />} />

                {/* Public Information & Legal Footer Routes */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/cookies" element={<Navigate to="/cookie-policy" replace />} />
                <Route path="/security" element={<SecurityCompliance />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Farmer Authentication Routes */}
                <Route path="/farmer/login" element={<FarmerLogin />} />
                <Route path="/farmer/register" element={<FarmerRegister />} />
                <Route path="/farmer/forgot-password" element={<ForgotPasswordFlow />} />

                {/* Expert & Admin Authentication Routes */}
                <Route path="/expert/login" element={<ExpertLogin />} />
                <Route path="/expert/register" element={<ExpertRegister />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />

                {/* Farmer Dashboard Portal (Guarded in future use, sandbox mode currently) */}
                <Route path="/farmer/*" element={
                    <ProtectedRoute role="farmer">
                        <DashboardLayout role="farmer">
                            <Routes>
                                <Route index element={<Navigate to="dashboard" replace />} />
                                <Route path="dashboard" element={<FarmerDashboard />} />
                                <Route path="my-farm" element={<MyFarms />} />
                                <Route path="crops" element={<CropRecords />} />
                                <Route path="profit-calculator" element={<ProfitCalculator />} />
                                <Route path="market" element={<MarketPrices />} />
                                <Route path="weather" element={<Weather />} />
                                <Route path="disease-detection" element={<DiseaseDetection />} />
                                <Route path="crop-recommendation" element={<CropRecommendation />} />
                                <Route path="smart-irrigation" element={<SmartIrrigation />} />
                                <Route path="sustainability-score" element={<SustainabilityScore />} />
                                <Route path="consultation" element={<ExpertConsultation />} />
                                <Route path="consultation/history" element={<MyConsultations />} />
                                <Route path="consultation/new" element={<SendMessage />} />
                                <Route path="consultation/:id" element={<ConversationView />} />
                                <Route path="profile" element={<FarmerProfile />} />
                                <Route path="*" element={<Navigate to="dashboard" replace />} />
                            </Routes>
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                {/* Expert Dashboard Portal */}
                <Route path="/expert/*" element={
                    <ProtectedRoute role="expert">
                        <DashboardLayout role="expert">
                            <Routes>
                                <Route index element={<Navigate to="dashboard" replace />} />
                                <Route path="dashboard" element={<ExpertDashboard />} />
                                <Route path="consultation" element={<ExpertInbox />} />
                                <Route path="consultation/:id" element={<ConversationView />} />
                                <Route path="farmer-list" element={<ExpertFarmerList />} />
                                <Route path="availability" element={<ExpertAvailability />} />
                                <Route path="profile" element={<ExpertProfile />} />
                                <Route path="*" element={<Navigate to="dashboard" replace />} />
                            </Routes>
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                {/* Admin Dashboard Portal */}
                <Route path="/admin/*" element={
                    <ProtectedRoute role="admin">
                        <DashboardLayout role="admin">
                            <Routes>
                                <Route index element={<Navigate to="dashboard" replace />} />
                                <Route path="dashboard" element={<AdminExpertManagement />} />
                                <Route path="my-farm" element={<Navigate to="../dashboard" replace />} />
                                <Route path="crops" element={<Navigate to="../dashboard" replace />} />
                                <Route path="market" element={<EmptyStatePage name="System Price Feeds" />} />
                                <Route path="weather" element={<Navigate to="../dashboard" replace />} />
                                <Route path="analytics" element={<AdminAnalytics />} />
                                <Route path="consultation" element={<AdminConsultationCenter />} />
                                <Route path="profile" element={<AdminProfile />} />
                                <Route path="*" element={<Navigate to="dashboard" replace />} />
                            </Routes>
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                {/* 404 Fallback routing */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
