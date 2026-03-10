import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onComplete }) => {
    const [textIndex, setTextIndex] = useState(0);

    const loadingText = [
        "[System] Initialize core modules...",
        "Mounting React v18.3.1...",
        "Loading environment variables... OK",
        "Establishing connection to backend... 200 OK",
        "Fetching portfolio_data.json... SUCCESS",
        "Compiling UI components & framer-motion...",
        "Starting physics engine...",
        "Bypassing security protocols... ",
        ">> Boot sequence complete. Welcome, Ayushman."
    ];

    useEffect(() => {
        if (textIndex < loadingText.length) {
            const isLast = textIndex === loadingText.length - 1;
            const delay = isLast ? 800 : Math.random() * 200 + 100;

            const timeout = setTimeout(() => {
                setTextIndex(prev => prev + 1);
            }, delay);

            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                onComplete();
            }, 1000); // Hold the success screen for a tiny bit
            return () => clearTimeout(timeout);
        }
    }, [textIndex, onComplete, loadingText.length]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40, filter: "blur(10px)", scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-neutral-950 text-cyan-400 font-mono flex items-center justify-center p-6"
        >
            <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.1)] relative overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-6 py-4 border-b border-neutral-800 bg-neutral-950/50">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <span className="ml-4 text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">ayushman-os // boot</span>
                </div>

                {/* Terminal Text */}
                <div className="p-8 space-y-4 min-h-[350px]">
                    {loadingText.slice(0, textIndex + 1).map((text, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`text-sm md:text-base font-medium tracking-wide ${i === loadingText.length - 1 ? "text-green-400 font-bold mt-8" : "text-cyan-300/80"
                                }`}
                        >
                            <span className="text-cyan-600 mr-4 select-none">~</span>
                            {text}
                        </motion.div>
                    ))}
                    {textIndex < loadingText.length && (
                        <motion.div
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2.5 h-5 bg-cyan-400 align-middle ml-2 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                        />
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Loader;
