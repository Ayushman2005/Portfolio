import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-neutral-950 flex flex-col items-center justify-center p-6 overflow-hidden"
        >
            {/* Technical grid background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #06b6d4 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="relative flex items-center justify-center">
                {/* Advanced technical rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                        transition={{ repeat: Infinity, duration: 10 + i * 5, ease: "linear" }}
                        className="absolute rounded-full border border-cyan-500/20"
                        style={{
                            width: `${160 + i * 40}px`,
                            height: `${160 + i * 40}px`,
                            borderStyle: i === 1 ? 'dashed' : 'solid',
                            borderWidth: i === 2 ? '2px' : '1px'
                        }}
                    />
                ))}
                
                {/* Glowing Core */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-32 h-32 rounded-full bg-neutral-900 border-2 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.5)] flex items-center justify-center relative z-10"
                >
                    <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-pulse" />
                    <span className="text-3xl font-black text-white tracking-tighter">
                        {progress}%
                    </span>
                    
                    {/* Pulsing outer rings for core */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-cyan-500"
                        animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                    />
                </motion.div>

                {/* technical scanners */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute w-64 h-64 border-t-2 border-cyan-500/40 rounded-full"
                />
            </div>
            
            <div className="mt-24 space-y-6 flex flex-col items-center text-center">
                <div className="space-y-2">
                    <motion.h1 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white text-xs font-black tracking-[0.5em] uppercase"
                    >
                        Initializing Systems
                    </motion.h1>
                    <div className="h-1 w-64 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                        />
                    </div>
                </div>

                <div className="flex gap-12">
                    {['CORE', 'MODULES', 'BIOMETRICS'].map((item, i) => (
                        <div key={item} className="space-y-1">
                            <p className="text-[10px] font-black text-cyan-500/40 tracking-widest">{item}</p>
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, j) => (
                                    <div key={j} className={`w-3 h-1 rounded-full ${progress > (i * 30 + j * 10) ? 'bg-cyan-500' : 'bg-neutral-800'}`} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Loader;
