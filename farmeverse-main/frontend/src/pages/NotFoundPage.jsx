import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

export const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-light/50 to-white flex flex-col items-center justify-center p-6 text-center select-none">
            {/* 404 Agriculture Animation */}
            <motion.div
                animate={{
                    rotate: [0, -10, 10, -10, 0],
                    y: [0, -5, 5, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="text-8xl filter drop-shadow-md mb-6"
            >
                🌾💨
            </motion.div>

            <h1 className="text-6xl font-extrabold text-primary-dark">404</h1>
            <h2 className="text-2xl font-bold text-dark mt-2">Page Not Found</h2>
            <p className="text-dark-light max-w-md mt-4 mb-8 text-sm">
                We're sorry, but the page or agricultural dataset you are looking for is unavailable or has been moved.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-auto">
                <Link to="/">
                    <Button variant="primary" className="px-8 py-3">
                        Back to Home
                    </Button>
                </Link>
            </motion.div>
        </div>
    )
}

export default NotFoundPage
