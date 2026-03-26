import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onComplete, isDataReady }) => {
    const isMobile = () =>
        typeof window !== 'undefined' &&
        (window.matchMedia('(max-width: 768px)').matches ||
            /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState(0);

    const phases = ['INITIALIZING CORE...', 'LOADING INTEL...', 'DESIGNING INTERFACE...', 'SYNCHRONIZING...'];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 400);
                    return 100;
                }
                if (prev >= 90 && !isDataReady) return 90;
                const inc = isDataReady ? 2.5 : 1.2;
                return Math.min(prev + inc, 100);
            });
        }, isDataReady ? 12 : 28);

        const phaseInterval = setInterval(() => {
            setPhase(prev => (prev + 1) % phases.length);
        }, 800);

        return () => { clearInterval(interval); clearInterval(phaseInterval); };
    }, [onComplete, isDataReady]);

    const progInt = Math.round(progress);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(24px)", scale: 1.05 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-8 overflow-hidden bg-slate-950"
        >
            {/* Dot grid bg */}
            <div className="absolute inset-0 opacity-100 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.15) 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />

            {/* Ambient blobs */}
            <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] rounded-full blur-[140px] pointer-events-none bg-violet-500/10" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] rounded-full blur-[140px] pointer-events-none bg-indigo-500/10" />

            {/* Loader core container */}
            <div className="relative flex items-center justify-center mb-20 md:mb-28">
                {/* SVG Circular Progress Bar */}
                <svg className="absolute w-56 h-56 md:w-72 md:h-72 -rotate-90 pointer-events-none">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        className="stroke-slate-800/30 fill-none"
                        strokeWidth="2"
                    />
                    <motion.circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        className="stroke-violet-500 fill-none"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: progress / 100 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                            filter: 'drop-shadow(0 0 12px rgba(124,58,237,0.8))'
                        }}
                    />
                </svg>

                {/* Rotating Outer Ring Dotted */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-dashed border-violet-500/20"
                />

                {/* Central Image Container */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden p-2 bg-[#0a0a0a] border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                >
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                         <img
                            src="/profile.png"
                            alt="Loading Profile"
                            className="w-full h-full object-cover filter brightness-90 grayscale-[0.2]"
                        />
                        {/* Scanning beam overlay */}
                        <motion.div 
                            animate={{ top: ["-100%", "200%"] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-violet-500/30 to-transparent pointer-events-none"
                        />
                    </div>
                </motion.div>

                {/* Floating percentage next to ring */}
                <div className="absolute top-[85%] font-black text-2xl md:text-3xl text-white tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {progInt}<span className="text-violet-500">%</span>
                </div>
            </div>

            {/* Information Overlay */}
            <div className="space-y-8 text-center max-w-sm">
                <div className="relative h-6 flex justify-center items-center">
                    <motion.p
                        key={phase}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="text-[11px] font-black tracking-[0.45em] uppercase text-violet-600/80 absolute whitespace-nowrap"
                    >
                        {phases[phase]}
                    </motion.p>
                </div>

                {/* Progress Tracking Bar */}
                <div className="w-80 h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner flex items-center">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                        style={{ background: 'linear-gradient(90deg, #7c3aed, #4f46e5, #ec4899)' }}
                    />
                </div>

                {/* Identity Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-1"
                >
                    <p className="text-[9px] font-black tracking-[0.2em] text-slate-500 uppercase">Production by</p>
                    <p className="text-white font-black text-2xl tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Ayushman<span className="text-violet-600">.</span>
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Loader;
