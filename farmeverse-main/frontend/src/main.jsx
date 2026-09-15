import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext'

// Always open from the top of the page on refresh/reload
if (typeof window !== 'undefined') {
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0)
    })
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <LanguageProvider>
            <App />
        </LanguageProvider>
    </React.StrictMode>,
)


