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
            <div className="relative flex items-center justify-center mb-24">
                {/* Orbital Rings */}
                {[...Array(isMobile() ? 1 : 3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                        transition={{ repeat: Infinity, duration: 10 + i * 5, ease: "linear" }}
                        className="absolute rounded-[2.5rem]"
                        style={{
                            width: `${160 + i * 60}px`,
                            height: `${160 + i * 60}px`,
                            border: `1.5px ${i === 1 ? 'dashed' : 'solid'} rgba(124,58,237,${0.25 - i * 0.05})`,
                        }}
                    />
                ))}

                {/* Central Identity Capsule */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="relative w-36 h-36 rounded-[2.5rem] flex items-center justify-center z-10 bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-[0_0_100px_rgba(124,58,237,0.3)]"
                >
                    {/* Inner pulse */}
                    <motion.div
                        className="absolute inset-0 rounded-[2.5rem] bg-violet-600"
                        animate={{ scale: [1, 1.2, 1.4], opacity: [0.15, 0.05, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                    />

                    <div className="text-center relative z-20">
                        <p className="text-4xl font-black text-white tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {progInt}<span className="text-violet-500 font-bold">%</span>
                        </p>
                    </div>
                </motion.div>

                {/* Spinning highlighter */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute w-56 h-56 rounded-[2.5rem]"
                    style={{ borderTop: '4px solid rgba(124,58,237,0.8)', borderRight: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '4px solid transparent' }}
                />
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
