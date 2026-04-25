import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// High-end hacker text scrambling decrypt effect
const ScrambleText = ({ text }) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#';

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText((prev) =>
                text.split("").map((letter, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 2;
        }, 80);
        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayText}</span>;
};

const Loader = ({ onComplete, isDataReady }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState(0);

    const phases = [
        'INITIALIZING_CORE_SYSTEMS', 
        'ESTABLISHING_SECURE_CONNECTION', 
        'DECRYPTING_UI_ASSETS', 
        'SYNCHRONIZING_NEURAL_LINK'
    ];

    // Stutter/blip linear incrementation for technical simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                if (prev >= 95 && !isDataReady) return 95;
                // Add some stutter and randomness to the loading mimicking a real boot sequence
                const inc = isDataReady ? (Math.random() * 3) + 0.5 : (Math.random() * 1.5) + 0.2;
                return Math.min(prev + inc, 100);
            });
        }, isDataReady ? 30 : 60);

        const phaseInterval = setInterval(() => {
            setPhase(prev => (prev + 1) % phases.length);
        }, 1400);

        return () => { clearInterval(interval); clearInterval(phaseInterval); };
    }, [onComplete, isDataReady]);

    const progDisplay = progress.toFixed(1); // 1 decimal place

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 md:p-8 overflow-hidden bg-[#050505]"
        >
            {/* Glowing noise background */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen" 
                 style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            {/* Ambient blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[140px] pointer-events-none bg-violet-600/15 mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[140px] pointer-events-none bg-blue-600/10 mix-blend-screen" />

            {/* The multi-layered mechanical loader rings */}
            <div className="relative flex items-center justify-center mb-24 md:mb-32">
                {/* 1. Outer fast dotted ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-dotted border-violet-500/20 opacity-50 shadow-[0_0_40px_rgba(139,92,246,0.1)]"
                />
                
                {/* 2. Middle reverse dashed ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                    className="absolute w-[260px] h-[260px] md:w-[330px] md:h-[330px] rounded-full border-2 border-dashed border-blue-500/10 opacity-70"
                />

                {/* 3. Precise SVG Circular Progress Bar with dashes */}
                <svg className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] -rotate-90 pointer-events-none">
                    <circle
                        cx="50%" cy="50%" r="48%"
                        className="stroke-violet-500/5 fill-none" strokeWidth="1"
                    />
                    <motion.circle
                        cx="50%" cy="50%" r="48%"
                        className="stroke-violet-500 fill-none"
                        strokeWidth="2" strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: progress / 100 }}
                        transition={{ duration: 0.2, ease: "linear" }}
                        style={{ filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.8))' }}
                        strokeDasharray="4 4"
                    />
                </svg>

                {/* Central Image Container */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotateX: 45 }}
                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden p-2 bg-[#050505] border border-white/10 shadow-[0_0_80px_rgba(124,58,237,0.15)]"
                    style={{ perspective: 1000 }}
                >
                    <div className="w-full h-full rounded-full overflow-hidden relative border border-white/5">
                         <img
                            src="/profile.png"
                            alt="System Initializing"
                            className="w-full h-full object-cover filter brightness-75 contrast-125 sepia-[0.3] hue-rotate-[-30deg] saturate-[1.2]"
                        />
                    </div>
                </motion.div>

                {/* Floating percentage attached dynamically */}
                <div className="absolute -bottom-10 flex justify-center items-center font-black text-2xl md:text-3xl text-white tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <motion.span className="text-violet-400 text-[10px] md:text-xs tracking-[0.2em] font-mono mr-3 opacity-60 font-medium pb-1 hidden sm:block">SYS.LOAD_</motion.span> 
                    {progDisplay}<span className="text-violet-500 ml-1">%</span>
                </div>
            </div>

            {/* Information Overlay */}
            <div className="space-y-6 text-center w-full max-w-sm px-4">
                <div className="relative h-6 flex justify-center items-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={phase}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-violet-400 absolute whitespace-nowrap drop-shadow-md"
                        >
                            <ScrambleText text={phases[phase]} />
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Cyberpunk Progress Tracking Bar */}
                <div className="relative w-full h-1.5 bg-[#121212] overflow-hidden rounded-full border border-white/5">
                    {/* Background grid markings inside the bar */}
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:10%_100%]" />
                    
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="relative h-full shadow-[0_0_15px_rgba(124,58,237,0.8)]"
                        style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #d946ef)' }}
                        transition={{ duration: 0.2, ease: "linear" }}
                    >
                         {/* Flare at the tip of the progress bar */}
                         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[4px] opacity-80" />
                    </motion.div>
                </div>

                {/* Identity Tag Segment */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-between items-end pt-4 border-t border-white/10"
                >
                    <div className="text-left font-mono text-[8px] md:text-[9px] text-slate-500 uppercase flex flex-col gap-1 tracking-widest">
                        <span>Auth: [OK]</span>
                        <span>Protocols: [ENGAGED]</span>
                    </div>
                    <div className="text-right">
                        <p className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] text-slate-500 uppercase mb-1">Architecture by</p>
                        <p className="text-white font-black text-xl md:text-2xl tracking-tighter leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            Ayushman<span className="text-violet-600">.</span>
                        </p>
                    </div>
                </motion.div>
            </div>
            
        </motion.div>
    );
};

export default Loader;
