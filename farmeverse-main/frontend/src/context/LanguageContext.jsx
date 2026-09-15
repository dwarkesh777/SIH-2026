import React, { createContext, useState, useEffect, useContext } from 'react';

export const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', label: 'English – EN' },
    { code: 'hi', name: 'Hindi', label: 'Hindi – HI' },
    { code: 'gu', name: 'Gujarati', label: 'Gujarati – GU' },
    { code: 'ta', name: 'Tamil', label: 'Tamil – TA' },
    { code: 'te', name: 'Telugu', label: 'Telugu – TE' },
    { code: 'kn', name: 'Kannada', label: 'Kannada – KN' },
    { code: 'ml', name: 'Malayalam', label: 'Malayalam – ML' },
    { code: 'bn', name: 'Bengali', label: 'Bengali – BN' },
    { code: 'mr', name: 'Marathi', label: 'Marathi – MR' },
];

export const applyGoogleTranslate = (langCode) => {
    const domain = window.location.hostname;
    const isLocalhost = domain === 'localhost' || domain === '127.0.0.1';

    if (langCode === 'en') {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'googtrans=/en/en; path=/;';
        if (!isLocalhost) {
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${domain}; path=/;`;
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
            document.cookie = `googtrans=/en/en; domain=.${domain}; path=/;`;
        }
    } else {
        const cookieVal = `/en/${langCode}`;
        document.cookie = `googtrans=${cookieVal}; path=/;`;
        if (!isLocalhost) {
            document.cookie = `googtrans=${cookieVal}; domain=.${domain}; path=/;`;
            document.cookie = `googtrans=${cookieVal}; domain=${domain}; path=/;`;
        }
    }

    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
    } else {
        window.location.reload();
    }
};

export const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('appLanguage') || 'en';
    });

    useEffect(() => {
        const savedLang = localStorage.getItem('appLanguage') || 'en';
        document.documentElement.setAttribute('lang', savedLang);
    }, [language]);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('appLanguage', lang);
        document.documentElement.setAttribute('lang', lang);
        applyGoogleTranslate(lang);
    };

    const formatNumber = (num) => {
        const value = Number(num) || 0;
        return new Intl.NumberFormat('en-IN').format(value);
    };

    const formatCurrency = (num) => {
        const value = Number(num) || 0;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatDate = (dateStr, options = { day: 'numeric', month: 'long', year: 'numeric' }) => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat('en-GB', options).format(date);
        } catch {
            return dateStr;
        }
    };

    return (
        <LanguageContext.Provider value={{
            language,
            changeLanguage,
            formatNumber,
            formatCurrency,
            formatDate
        }}>
            {children}
        </LanguageContext.Provider>
    );
};
