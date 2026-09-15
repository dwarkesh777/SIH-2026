/**
 * gujaratiFormat.js (Standardized English Formatter)
 * 
 * Reusable helpers for converting numbers, dates, times and currency
 * in clean standard English format.
 */

export const toGujaratiDigits = (value) => {
    return String(value)
}

export const formatGujaratiNumber = (value, lang = 'en', decimals = 0) => {
    const num = parseFloat(value)
    if (isNaN(num)) return String(value)
    return decimals > 0 ? num.toFixed(decimals) : String(Math.round(num))
}

export const formatGujaratiDate = (dateValue, lang = 'en') => {
    if (!dateValue) return 'N/A'
    const d = new Date(dateValue)
    if (isNaN(d.getTime())) return 'N/A'

    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = String(d.getFullYear())

    return `${day}/${month}/${year}`
}

export const formatGujaratiDateTime = (dateValue, lang = 'en') => {
    if (!dateValue) return 'N/A'
    const d = new Date(dateValue)
    if (isNaN(d.getTime())) return 'N/A'

    return d.toLocaleString('en-IN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    })
}

export const formatGujaratiTime = (timeStr, lang = 'en') => {
    if (!timeStr) return ''
    const [h, m] = timeStr.split(':').map(Number)
    if (isNaN(h) || isNaN(m)) return timeStr

    const hour12 = h % 12 || 12
    const mins = String(m).padStart(2, '0')
    const ampm = h < 12 ? 'AM' : 'PM'
    return `${String(hour12).padStart(2, '0')}:${mins} ${ampm}`
}

export const formatGujaratiCurrency = (amount, lang = 'en') => {
    const num = parseFloat(amount)
    if (isNaN(num)) return ''
    const formatted = num.toLocaleString('en-IN')
    return `₹${formatted}`
}

