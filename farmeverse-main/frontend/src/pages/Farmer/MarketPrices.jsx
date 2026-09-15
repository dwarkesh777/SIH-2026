import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useTranslation } from '../../hooks/useTranslation'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import {
    FiSearch,
    FiRefreshCw,
    FiTrendingUp,
    FiMapPin,
    FiAward,
    FiInfo,
    FiCheckCircle,
    FiAlertCircle,
    FiArrowRight,
    FiX
} from 'react-icons/fi'
import { marketPricesAPI } from '../../services/api'

// Translations vocabulary
const dictionary = {
    title: "📈 Live Market Prices",
    subtitle: "Gujarat Market Yards (APMC) Live Govt. AGMARKNET Feeds",
    searchPlaceholder: "Search crop name... (e.g. Cotton, Cumin)",
    allDistricts: "All Districts",
    districtSelector: "Select District",
    refreshBtn: "Update Prices",
    refreshing: "Updating...",
    lastUpdated: "Last Refreshed",
    cropName: "Crop Name",
    marketName: "Market",
    minPrice: "Min Price",
    maxPrice: "Max Price",
    modalPrice: "Modal Price",
    arrivalQty: "Arrival Qty (Quintal)",
    date: "Date",
    source: "Source",
    priceUnit: "/ Quintal (100 kg)",
    todayBadges: "Today's Key Crop Prices",
    bestMarketTitle: "💡 Best Market Recommendation",
    selectCropRec: "Select crop to find best market:",
    suggestedMarket: "Suggested Market",
    expectedPrice: "Expected Selling Price",
    extraIncome: "Extra Expected Income",
    comparedTo: "extra profit compared to lowest price",
    perQuintal: "per Quintal",
    noData: "No market prices found. Please click Refresh.",
    sourceLive: "Government Live Feed",
    sourceOffline: "Local SQLite Cache",
    loading: "Fetching live market prices...",
    feedIntegration: "FEED INTEGRATION STATUS",
    sqliteCache: "SQLite Database Cache OK",
    highAvailability: "High availability active. Fast queries enabled.",
    dataSource: "Data Source",
    apmcMultiCompare: "APMC MULTI-COMPARE",
    min: "Min",
    max: "Max",
    qt: "Qt.",
    man: "Man"
}

import {
    CROP_TRANSLATIONS,
    getLocalizedCropName,
    getLocalizedMarketName,
    toEnglishDigits
} from '../../utils/cropTranslations'

// Map market names to their respective districts
const marketDistrictMap = {
    "Gondal APMC": "Rajkot",
    "Rajkot APMC": "Rajkot",
    "Junagadh APMC": "Junagadh"
};

export const MarketPrices = () => {
    const [prices, setPrices] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    // UI Filters
    const [searchQuery, setSearchQuery] = useState('')
    const [districts, setDistricts] = useState([])
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const [selectedRecommendationCrop, setSelectedRecommendationCrop] = useState('Cotton')

    const { formatCurrency, formatNumber, formatDate } = useLanguage()
    const t = dictionary

    const [priceUnit, setPriceUnit] = useState('quintal') // 'quintal' or 'man'

    const convertPrice = (val) => {
        const num = parseFloat(val) || 0
        return priceUnit === 'man' ? Math.round(num / 5) : Math.round(num)
    }

    const displayUnit = priceUnit === 'man' ? ' / Man' : ' / Quintal'
    const displayPerUnit = priceUnit === 'man' ? 'Per Man' : 'Per Quintal'

    useEffect(() => {
        loadMarketPrices()
        loadDistricts()
    }, [])

    const loadDistricts = async () => {
        try {
            const data = await marketPricesAPI.getDistricts()
            setDistricts(data)
        } catch (err) {
            console.error('Error fetching districts:', err)
        }
    }

    const loadMarketPrices = async (dateParam) => {
        setIsLoading(true)
        setErrorMsg('')
        try {
            const data = await marketPricesAPI.getLatest(dateParam)
            setPrices(data)
            if (data.length > 0 && !dateParam) {
                setSelectedDate(data[0].price_date)
            }
        } catch (err) {
            console.error('Error fetching market prices:', err)
            setErrorMsg('Unable to load market prices. Showing cached records.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate)
        loadMarketPrices(newDate)
    }

    const handleRefresh = async () => {
        setRefreshing(true)
        setErrorMsg('')
        setSuccessMsg('')
        try {
            const res = await marketPricesAPI.refresh()
            const finalData = res.data ? res.data : res
            setPrices(finalData)
            setSuccessMsg('Latest AGMARKNET government prices successfully updated.')
            if (finalData && finalData.length > 0) {
                setSelectedDate(finalData[0].price_date)
            }
        } catch (err) {
            console.error('Error refreshing prices:', err)
            setErrorMsg('Live government AGMARKNET feed is currently syncing. Showing cached APMC data.')
        } finally {
            setRefreshing(false)
        }
    }

    // Search and filter pricing data
    const filteredPrices = prices.filter(p => {
        const query = searchQuery.trim().toLowerCase()
        const pDistrict = p.district_name || marketDistrictMap[p.market_name] || ''
        const districtMatch = selectedDistrict ? pDistrict === selectedDistrict : true

        let cropMatch = true
        if (query) {
            const rawCrop = (p.crop_name || '').toLowerCase()
            const engCrop = getLocalizedCropName(p.crop_name).toLowerCase()
            cropMatch = rawCrop.includes(query) || engCrop.includes(query)
        }

        return districtMatch && cropMatch
    })

    // Setup today's price badges (Average values for each core crop)
    const getCropBadgeStats = (cropName) => {
        const cropRecords = prices.filter(p => {
            const translated = getLocalizedCropName(p.crop_name).toLowerCase()
            return translated.includes(cropName.toLowerCase()) || (p.crop_name || '').toLowerCase().includes(cropName.toLowerCase())
        })
        if (cropRecords.length === 0) return null

        const modals = cropRecords.map(r => parseFloat(r.modal_price))
        const minVal = Math.min(...cropRecords.map(r => parseFloat(r.min_price)))
        const maxVal = Math.max(...cropRecords.map(r => parseFloat(r.max_price)))
        const avgModal = modals.reduce((a, b) => a + b, 0) / modals.length

        const displayCropName = getLocalizedCropName(cropName);

        return {
            name: displayCropName,
            min: convertPrice(minVal),
            max: convertPrice(maxVal),
            avg: convertPrice(avgModal)
        }
    }

    // Recommendation Engine: Best Market logic for selected crop
    const getBestMarketRecommendation = (cropName) => {
        const cropRecords = prices.filter(p => {
            const translated = getLocalizedCropName(p.crop_name).toLowerCase()
            return translated.includes(cropName.toLowerCase()) || (p.crop_name || '').toLowerCase().includes(cropName.toLowerCase())
        })
        if (cropRecords.length < 2) return null

        // Find record with max modal price, using max_price and arrival_quantity as tie-breakers
        const sortedByPrice = [...cropRecords].sort((a, b) => {
            const diffModal = parseFloat(b.modal_price) - parseFloat(a.modal_price)
            if (diffModal !== 0) return diffModal
            const diffMax = parseFloat(b.max_price) - parseFloat(a.max_price)
            if (diffMax !== 0) return diffMax
            return (parseFloat(b.arrival_quantity) || 0) - (parseFloat(a.arrival_quantity) || 0)
        })
        const bestRecord = sortedByPrice[0]
        const worstRecord = sortedByPrice[sortedByPrice.length - 1]

        const bestPrice = parseFloat(bestRecord.modal_price)
        const worstPrice = parseFloat(worstRecord.modal_price)
        const diff = bestPrice - worstPrice

        const bestPriceConverted = convertPrice(bestPrice)
        const worstPriceConverted = convertPrice(worstPrice)
        const diffConverted = bestPriceConverted - worstPriceConverted

        const displayCropName = getLocalizedCropName(cropName);
        const displayBestMarket = getLocalizedMarketName(bestRecord.market_name);
        const displayWorstMarket = getLocalizedMarketName(worstRecord.market_name);

        return {
            crop: displayCropName,
            bestMarket: displayBestMarket,
            worstMarket: displayWorstMarket,
            expectedPrice: bestPriceConverted,
            extraIncome: diffConverted,
            percentage: ((diffConverted / (worstPriceConverted || 1)) * 100).toFixed(1)
        }
    }

    const recommendation = getBestMarketRecommendation(selectedRecommendationCrop)

    return (
        <div className="space-y-6 animate-fadeIn pb-12">
            {/* Header Dashboard section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-card border border-dark/5 shadow-sm">
                <div className="space-y-1">
                    <h1 className="text-xl md:text-2xl font-bold text-primary flex items-center gap-2">
                        <span>{t.title.split(' ')[0]}</span> {t.title.split(' ').slice(1).join(' ')}
                    </h1>
                    <p className="text-xs text-dark-light select-none font-medium">
                        {t.subtitle}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Button
                        disabled={refreshing}
                        onClick={handleRefresh}
                        variant="primary"
                        className="flex items-center gap-2 text-xs md:text-sm font-bold py-2.5 px-4 rounded-btn transition-all active:scale-95 bg-primary text-white shadow-sm disabled:opacity-50"
                    >
                        <FiRefreshCw size={15} className={`${refreshing ? 'animate-spin' : ''}`} />
                        <span>{refreshing ? t.refreshing : t.refreshBtn}</span>
                    </Button>
                </div>
            </div>

            {/* Error and Success Signals */}
            {successMsg && (
                <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 px-4 py-3 rounded-card text-xs md:text-sm font-bold flex items-center justify-between shadow-xs animate-fadeIn">
                    <span className="flex items-center gap-2">
                        <FiCheckCircle size={16} className="text-emerald-600" />
                        {successMsg}
                    </span>
                    <button onClick={() => setSuccessMsg('')} className="p-1 hover:bg-emerald-100 rounded text-emerald-700">
                        <FiX size={15} />
                    </button>
                </div>
            )}
            {errorMsg && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-card text-xs md:text-sm font-bold flex items-center justify-between shadow-xs animate-fadeIn">
                    <span className="flex items-center gap-2">
                        <FiInfo size={16} className="text-amber-600" />
                        {errorMsg}
                    </span>
                    <button onClick={() => setErrorMsg('')} className="p-1 hover:bg-amber-100 rounded text-amber-700">
                        <FiX size={15} />
                    </button>
                </div>
            )}
            {prices.length > 0 && prices[0].source === "Government Latest Available" && (
                <div className="bg-amber-50 border border-amber-250 text-amber-800 px-4 py-3 rounded-card text-xs md:text-sm font-bold flex items-center shadow-xs animate-fadeIn">
                    <span className="flex items-center gap-2">
                        <FiInfo size={16} className="text-amber-600 flex-shrink-0" />
                        <span>
                            Today's live prices are syncing. Showing latest verified APMC market data (Actual Date: {toEnglishDigits(formatDate(prices[0].price_date))}, Source: AGMARKNET).
                        </span>
                    </span>
                </div>
            )}

            {/* Recommendation Engine (Best Market Panel) */}
            {prices.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Best Market Recommendation Card */}
                    <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-emerald-800 to-green-900 text-white rounded-card shadow-md relative overflow-hidden border border-emerald-700">
                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                            <FiAward size={180} />
                        </div>

                        <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
                                    <FiAward className="text-accent text-xl" />
                                    {t.bestMarketTitle}
                                </h3>
                                <span className="bg-emerald-700 text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full border border-emerald-600">
                                    {t.apmcMultiCompare}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 text-xs bg-emerald-750/70 p-2 rounded-btn border border-emerald-700 max-w-lg">
                                <span className="font-bold text-accent">{t.selectCropRec}</span>
                                <div className="flex flex-wrap gap-1">
                                    {['Cotton', 'Groundnut', 'Cumin', 'Wheat', 'Mustard', 'Castor Seed'].map(crop => (
                                        <button
                                            key={crop}
                                            onClick={() => setSelectedRecommendationCrop(crop)}
                                            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${selectedRecommendationCrop === crop
                                                ? 'bg-accent text-dark'
                                                : 'hover:bg-emerald-700 text-emerald-100 bg-emerald-800/50'
                                                }`}
                                        >
                                            {crop}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {recommendation ? (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 divide-y sm:divide-y-0 sm:divide-x divide-emerald-700/50">
                                    {/* Market Suggested */}
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-emerald-250 uppercase font-bold tracking-wider block">{t.suggestedMarket}</span>
                                        <h4 className="text-lg font-extrabold text-white flex items-center gap-1 pb-1 sm:pb-0">
                                            <FiMapPin size={16} className="text-accent" />
                                            {recommendation.bestMarket}
                                        </h4>
                                    </div>

                                    {/* Expected Modal Price */}
                                    <div className="space-y-1 pt-2 sm:pt-0 sm:pl-4">
                                        <span className="text-[10px] text-emerald-250 uppercase font-bold tracking-wider block">{t.expectedPrice}</span>
                                        <h4 className="text-lg font-extrabold text-accent">
                                            {toEnglishDigits(formatCurrency(recommendation.expectedPrice))}<span className="text-xs text-white/80 select-none font-medium ml-1">{displayUnit}</span>
                                        </h4>
                                    </div>

                                    {/* Extra Income / Profit */}
                                    <div className="space-y-1 pt-2 sm:pt-0 sm:pl-4">
                                        <span className="text-[10px] text-emerald-250 uppercase font-bold tracking-wider block">{t.extraIncome}</span>
                                        <h4 className="text-lg font-extrabold text-yellow-300 flex items-center gap-1">
                                            <FiTrendingUp size={16} />
                                            +{toEnglishDigits(recommendation.extraIncome > 0 ? formatCurrency(recommendation.extraIncome) : formatCurrency(0))}
                                            <span className="text-[10px] font-bold text-yellow-105 ml-1">/ {displayPerUnit}</span>
                                        </h4>
                                        <span className="text-[9px] text-emerald-200 select-none block">
                                            {recommendation.extraIncome > 0
                                                ? `(${toEnglishDigits(recommendation.percentage)}% ${t.comparedTo} ${recommendation.worstMarket})`
                                                : `(Prices are uniform across all markets)`
                                            }
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-emerald-200 pt-2 italic">
                                    Comparison is only calculated when data from multiple markets is loaded.
                                </p>
                            )}
                        </div>
                    </Card>

                    {/* Right: Freshness/Source Metadata Card */}
                    <Card className="bg-white p-6 rounded-card border border-dark/5 shadow-sm flex flex-col justify-between">
                        <div className="space-y-3">
                            <h4 className="text-xs uppercase font-extrabold text-dark-light/80 block select-none">
                                {t.feedIntegration}
                            </h4>
                            <div className="flex gap-2 items-center p-3 rounded-btn border border-emerald-100 bg-emerald-50 text-emerald-800 text-xs font-bold leading-normal">
                                <FiCheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
                                <div>
                                    <p className="font-extrabold">{t.sqliteCache}</p>
                                    <p className="font-medium text-[10px] text-emerald-700/90 mt-0.5">{t.highAvailability}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-dark/5 space-y-2 text-xs">
                            <div className="flex justify-between font-bold text-dark-light">
                                <span>{t.lastUpdated}:</span>
                                <span className="text-dark bg-secondary-dark px-2.5 py-0.5 rounded font-mono text-[10px]">
                                    {prices.length > 0 ? toEnglishDigits(formatDate(prices[0].price_date)) : '-'}
                                </span>
                            </div>
                            <div className="flex justify-between font-bold text-dark-light">
                                <span>{t.dataSource}:</span>
                                <span className="text-emerald-750 font-extrabold font-sans text-right">
                                    {prices.length > 0
                                        ? (prices[0].source === "AGMARKNET"
                                            ? t.sourceLive
                                            : (prices[0].source === "Government Latest Available"
                                                ? 'Govt. Market Cache'
                                                : t.sourceOffline))
                                        : '-'}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Crop Prices Badges Grid */}
            {prices.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-xs font-extrabold text-dark-light uppercase select-none tracking-wider">
                        {t.todayBadges}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {['Cotton', 'Groundnut', 'Cumin', 'Wheat', 'Mustard', 'Castor Seed'].map(crop => {
                            const badge = getCropBadgeStats(crop)
                            if (!badge) return null
                            return (
                                <Card key={crop} className="p-3 bg-white border border-dark/5 shadow-xs rounded-btn hover:border-primary/20 transition-all select-none font-sans">
                                    <span className="block text-[10px] text-dark-light uppercase font-bold truncate">
                                        {badge.name}
                                    </span>
                                    <h4 className="text-sm font-extrabold text-primary mt-1">
                                        {toEnglishDigits(formatCurrency(badge.avg))}
                                        <span className="text-[10px] text-dark-light select-none font-medium ml-1">
                                            /{priceUnit === 'man' ? t.man : t.qt}
                                        </span>
                                    </h4>
                                    <div className="flex justify-between text-[8.5px] font-bold text-dark-light/75 mt-1 border-t border-dark/5 pt-1 font-mono">
                                        <span>{t.min}: {toEnglishDigits(badge.min)}</span>
                                        <span>{t.max}: {toEnglishDigits(badge.max)}</span>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Main Interactive Table & Filter Dashboard */}
            <div className="space-y-4">
                {/* Filters Row */}
                <div className="bg-white p-3 md:p-4 rounded-card border border-dark/5 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 items-center">
                    {/* Search Field */}
                    <div className="relative w-full">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            className="w-full h-11 rounded-btn border border-slate-300 pl-10 pr-10 text-xs font-semibold leading-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-secondary-dark/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full">
                                <FiX size={16} aria-label="Clear Search" />
                            </button>
                        )}
                    </div>

                    {/* District Filter */}
                    <div className="relative w-full">
                        <select
                            className="w-full h-11 bg-secondary-dark/20 border border-dark/10 outline-none px-3 py-2 text-xs rounded-btn focus:ring-2 focus:ring-emerald-500 font-semibold text-dark cursor-pointer appearance-none"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                            <option value="">{t.allDistricts}</option>
                            {districts.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-dark-light flex items-center text-[10px]">
                            ▼
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div className="relative flex items-center h-11 bg-secondary-dark/20 rounded-btn border border-dark/10 px-3 shadow-xs">
                        <span className="text-xs font-bold text-dark-light mr-2 whitespace-nowrap hidden xl:inline">
                            {t.date}:
                        </span>
                        <input
                            type="date"
                            className="w-full bg-transparent text-dark outline-none font-semibold text-xs cursor-pointer"
                            value={selectedDate}
                            onChange={(e) => handleDateChange(e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    {/* Price Unit Toggle */}
                    <div className="flex h-11 bg-secondary-dark rounded-btn border border-dark/10 p-0.5 w-full">
                        <button
                            type="button"
                            onClick={() => setPriceUnit('quintal')}
                            className={`flex-1 py-1.5 px-3 rounded-btn text-xs font-bold text-center transition-all ${priceUnit === 'quintal'
                                ? 'bg-primary text-white shadow-xs'
                                : 'text-dark-light hover:text-dark'}`}
                        >
                            Per Quintal
                        </button>
                        <button
                            type="button"
                            onClick={() => setPriceUnit('man')}
                            className={`flex-1 py-1.5 px-3 rounded-btn text-xs font-bold text-center transition-all ${priceUnit === 'man'
                                ? 'bg-primary text-white shadow-xs'
                                : 'text-dark-light hover:text-dark'}`}
                        >
                            Per Man
                        </button>
                    </div>
                </div>

                {/* Table Layout */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-16 bg-white rounded-card border border-dark/5 shadow-sm">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs text-dark-light mt-3 font-semibold">{t.loading}</span>
                    </div>
                ) : prices.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-card border border-dark/5 shadow-sm">
                        <div className="w-14 h-14 bg-secondary-dark rounded-full flex items-center justify-center text-dark-light/50 mb-3.5">
                            <FiAlertCircle size={28} className="text-amber-500" />
                        </div>
                        <h4 className="text-sm font-bold text-dark mb-1">
                            No market data available for selected date.
                        </h4>
                        <p className="text-xs text-dark-light max-w-xs mt-1">
                            Please select another historical date or update today's prices.
                        </p>
                    </div>
                ) : filteredPrices.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-card border border-dark/5 shadow-sm">
                        <div className="w-14 h-14 bg-secondary-dark rounded-full flex items-center justify-center text-dark-light/50 mb-3.5">
                            <FiTrendingUp size={24} />
                        </div>
                        <h4 className="text-sm font-bold text-dark mb-1">{t.noData}</h4>
                        <Button onClick={handleRefresh} variant="primary" className="mt-4 text-xs font-bold py-2 px-4 flex items-center gap-2">
                            <FiRefreshCw size={12} className={`${refreshing ? 'animate-spin' : ''}`} />
                            <span>{t.refreshBtn}</span>
                        </Button>
                    </div>
                ) : (
                    <div className="bg-white rounded-card border border-dark/5 shadow-sm overflow-hidden animate-fadeIn">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-secondary-dark/65 border-b border-dark/5 text-dark-light/95 text-[10px] font-bold uppercase tracking-wider">
                                        <th className="p-4">{t.cropName}</th>
                                        <th className="p-4">{t.marketName}</th>
                                        <th className="p-4 text-right">{t.minPrice}</th>
                                        <th className="p-4 text-right">{t.maxPrice}</th>
                                        <th className="p-4 text-right text-primary bg-emerald-50/20">{t.modalPrice}</th>
                                        <th className="p-4 text-right">{t.arrivalQty}</th>
                                        <th className="p-4 text-center">{t.date}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark/5 text-xs text-dark select-none">
                                    {filteredPrices.map((price, idx) => {
                                        const displayCrop = getLocalizedCropName(price.crop_name);
                                        const displayMarket = getLocalizedMarketName(price.market_name);

                                        return (
                                            <tr
                                                key={price.id || idx}
                                                className="hover:bg-secondary-dark/30 transition-colors"
                                            >
                                                {/* Crop Name */}
                                                <td className="p-4">
                                                    <div className="font-extrabold text-sm text-slate-900">{displayCrop}</div>
                                                    <div className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase mt-0.5">APMC Commodity</div>
                                                </td>

                                                {/* Market Name */}
                                                <td className="p-4 font-extrabold text-dark tracking-tight">
                                                    <div className="flex items-center gap-1">
                                                        <FiMapPin className="text-dark-light/60 flex-shrink-0" size={12} />
                                                        {displayMarket}
                                                    </div>
                                                </td>

                                                {/* Min Price */}
                                                <td className="p-4 text-right font-bold text-dark-light/95 font-mono font-semibold">
                                                    {toEnglishDigits(formatCurrency(convertPrice(price.min_price)))}
                                                </td>

                                                {/* Max Price */}
                                                <td className="p-4 text-right font-bold text-dark-light/95 font-mono font-semibold">
                                                    {toEnglishDigits(formatCurrency(convertPrice(price.max_price)))}
                                                </td>

                                                {/* Modal Price */}
                                                <td className="p-4 text-right font-extrabold text-primary bg-emerald-50/20 font-mono text-[13px]">
                                                    {toEnglishDigits(formatCurrency(convertPrice(price.modal_price)))}
                                                </td>

                                                {/* Arrival Quantity */}
                                                <td className="p-4 text-right font-bold text-dark font-mono">
                                                    {price.arrival_quantity ? toEnglishDigits(formatNumber(parseInt(price.arrival_quantity))) : '0'} {t.qt}
                                                </td>

                                                {/* Date */}
                                                <td className="p-4 text-center text-dark-light font-mono font-medium text-[10px]">
                                                    {toEnglishDigits(formatDate(price.price_date))}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MarketPrices;
