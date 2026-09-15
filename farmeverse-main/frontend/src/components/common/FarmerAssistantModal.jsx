import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiMic, FiMicOff, FiSend, FiX, FiVolume2, FiVolumeX, FiZap, FiCheckCircle } from 'react-icons/fi';
import { farmerAssistantAPI } from '../../services/api';

export default function FarmerAssistantModal({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            text: 'Hello Farmer Friend! 🙏 I am your AgriSmart Real-time AI Agronomist.\n\nYou can ask me any question about today\'s temperature, weather forecasts, smart irrigation schedules, crop diseases & spray remedies, fertilizer dosage, or APMC market prices.',
            sources: ['AgriSmart Grounded Knowledge Graph', 'Live IoT Sensor Gateway', 'ICAR Best Practices']
        }
    ]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    // Speech Recognition (STT)
    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Voice recognition is not supported on this browser. Please type your query.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);
            handleSend(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    // Text to Speech (TTS)
    const speakText = (text) => {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();
        if (isSpeaking) {
            setIsSpeaking(false);
            return;
        }

        const cleanText = text
            .replace(/[*_#•]/g, '')
            .replace(/₹/g, 'Rupees ')
            .replace(/°C/g, ' degrees Celsius');

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'en-IN';
        utterance.rate = 0.95;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const handleSend = async (customQuery = null) => {
        const queryText = customQuery || input;
        if (!queryText.trim() || loading) return;

        const userMsg = { sender: 'user', text: queryText };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await farmerAssistantAPI.chat({
                query: queryText,
                language: 'en',
                context: {
                    crop: 'Cotton',
                    growth_stage: 'Flowering Stage',
                    soil_moisture: '28.5',
                    temperature: '32.2',
                    humidity: '61',
                    rain_probability: '15'
                }
            });

            if (res.success && res.data) {
                const aiMsg = {
                    sender: 'ai',
                    text: res.data.reply,
                    sources: res.data.grounded_sources || [],
                    engine: res.data.engine
                };
                setMessages((prev) => [...prev, aiMsg]);
                // Automatically speak response
                speakText(res.data.reply);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: 'ai',
                    text: '⚠️ Unable to reach the assistant service. Please check that the server is online and try again.',
                    sources: ['System Diagnostic']
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Formats markdown text with bolding and bullet list items cleanly
    const renderFormattedMessage = (text) => {
        if (!text) return null;
        const lines = text.split('\n');

        return lines.map((line, lineIdx) => {
            const trimmed = line.trim();
            if (!trimmed) {
                return <div key={lineIdx} className="h-2" />;
            }

            // Split line by bold markers **text**
            const parts = line.split(/(\*\*.*?\*\*)/g);
            const formattedParts = parts.map((part, partIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <strong key={partIdx} className="font-semibold text-inherit">
                            {part.slice(2, -2)}
                        </strong>
                    );
                }
                return part;
            });

            return (
                <div key={lineIdx} className="leading-relaxed">
                    {formattedParts}
                </div>
            );
        });
    };

    const quickChips = [
        '⛅ Give me today temp & weather',
        '💧 When should I irrigate my farm?',
        '🌿 Recommended spray for leaf spot & pests',
        '🌱 Optimal fertilizer & NPK dosage',
        '📈 Today\'s cotton & groundnut market prices'
    ];

    if (!isOpen) return null;

    const modalContent = (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/10 transition-all duration-300 animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-4xl h-[85vh] sm:h-[90vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200 relative ring-1 ring-slate-900/5"
                onClick={(e) => e.stopPropagation()}
            >
                
                {/* Decorative background blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"></div>
                </div>

                {/* Modal Header */}
                <div className="relative z-10 bg-white border-b border-slate-100 p-4 md:px-8 py-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-black shadow-lg shadow-emerald-500/30">
                            <FiZap size={24} className="animate-pulse" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-slate-800 text-lg md:text-xl flex flex-wrap items-center gap-2">
                                <span>AgriSmart AI Assistant</span>
                                <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
                                    Live Grounded
                                </span>
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                                Powered by Real-time IoT Telemetry & Agronomy Engine
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex bg-slate-100/80 text-slate-600 text-xs px-3.5 py-1.5 rounded-full font-bold border border-slate-200/80 shadow-inner">
                            English
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all duration-200 bg-white shadow-sm border border-slate-100"
                        >
                            <FiX size={20} />
                        </button>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="relative z-10 flex-1 p-4 md:p-8 overflow-y-auto space-y-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fadeIn`}
                        >
                            <div
                                className={`max-w-[90%] md:max-w-[80%] rounded-[1.5rem] p-4 md:p-5 text-sm md:text-base leading-relaxed shadow-sm transition-all ${
                                    msg.sender === 'user'
                                        ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-br-sm shadow-emerald-600/20'
                                        : 'bg-white text-slate-700 border border-slate-200/80 rounded-bl-sm shadow-slate-200/50'
                                }`}
                            >
                                <div className={msg.sender === 'user' ? 'text-emerald-50' : 'text-slate-700'}>{renderFormattedMessage(msg.text)}</div>

                                {/* Grounded Citations Badge */}
                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-4 pt-3 border-t border-slate-100/60 flex flex-wrap items-center gap-2 text-[10px] md:text-xs">
                                        <div className="flex items-center gap-1 text-emerald-600 font-bold">
                                            <FiCheckCircle size={14} />
                                            <span>Sources:</span>
                                        </div>
                                        {msg.sources.map((s, i) => (
                                            <span key={i} className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-100 font-medium whitespace-nowrap">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Speaker Action for AI messages */}
                            {msg.sender === 'ai' && (
                                <button
                                    onClick={() => speakText(msg.text)}
                                    className="mt-2 ml-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-600 transition-colors"
                                >
                                    {isSpeaking ? <FiVolumeX size={14} className="text-amber-500" /> : <FiVolume2 size={14} />}
                                    <span>{isSpeaking ? 'Stop speaking' : 'Read aloud'}</span>
                                </button>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="flex items-start gap-3 w-fit animate-pulse">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center border border-emerald-200 shadow-sm shrink-0">
                                <FiZap size={18} className="text-emerald-500" />
                            </div>
                            <div className="bg-white p-4 rounded-[1.5rem] rounded-bl-sm border border-slate-200 shadow-sm flex flex-col gap-2">
                                <div className="flex gap-1.5 px-2 py-1">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                                <span className="text-xs text-slate-400 font-medium px-1">Analyzing telemetry...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Action Chips */}
                <div className="relative z-10 px-4 md:px-8 py-3 bg-white border-t border-slate-100 flex gap-2.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-3">
                    {quickChips.map((chip, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSend(chip)}
                            className="whitespace-nowrap px-4 py-2 rounded-full bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 text-xs md:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                        >
                            {chip}
                        </button>
                    ))}
                </div>

                {/* Input Controls */}
                <div className="relative z-10 p-4 md:p-6 lg:px-8 bg-white border-t border-slate-100 flex items-end gap-3 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                    <button
                        onClick={handleVoiceInput}
                        className={`p-4 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 cursor-pointer ${
                            isListening
                                ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30 scale-110'
                                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 hover:scale-105 border border-emerald-200/50'
                        }`}
                        title="Speak in English"
                    >
                        {isListening ? <FiMicOff size={22} /> : <FiMic size={22} />}
                    </button>

                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl flex items-center p-1.5 focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:border-emerald-400 transition-all shadow-inner">
                        <textarea
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder={isListening ? 'Listening... Speak now' : 'Ask your agricultural question...'}
                            className="flex-1 bg-transparent px-4 py-3 md:py-3.5 text-sm md:text-base outline-none text-slate-800 placeholder-slate-400 resize-none max-h-32"
                            style={{ minHeight: '52px' }}
                        />
                        
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || loading}
                            className="p-3.5 m-0.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-full transition-all shadow-md hover:shadow-lg disabled:shadow-none flex-shrink-0 transform hover:scale-105 disabled:transform-none cursor-pointer"
                        >
                            <FiSend size={20} className={!input.trim() || loading ? 'opacity-50' : 'opacity-100'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}

