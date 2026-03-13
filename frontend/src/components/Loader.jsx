import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onComplete }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onComplete();
        }, 2500); // Loader duration slightly longer for dramatic effect
        return () => clearTimeout(timeout);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center p-6"
        >
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-[#12b4e8]/20"
                />
                
                {/* Segmented Ring 1 */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-dashed border-[#12b4e8]/40"
                    style={{ borderDasharray: "10 15" }}
                />

                {/* Inner Ring with glow */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[3px] border-[#e8faff]/20 border-t-[#12b4e8] shadow-[0_0_20px_rgba(18,180,232,0.4)]"
                />
                
                {/* Core Arc Reactor Pulse */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-[0_0_40px_10px_rgba(18,180,232,0.8),inset_0_0_20px_5px_rgba(18,180,232,0.8)] flex items-center justify-center relative"
                >
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-[#12b4e8]"
                        animate={{ scale: [1, 1.6, 2], opacity: [0.8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                    />
                    {/* Center point */}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#ccf4ff] shadow-[0_0_15px_rgba(255,255,255,1)]" />
                </motion.div>
                
                {/* Triangular Accents (Palladium Core Brackets) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {[0, 120, 240].map((rotation, index) => (
                        <motion.div
                            key={index}
                            className="absolute w-1.5 h-10 sm:h-14 bg-[#12b4e8]/60 blur-[1px] rounded-full"
                            style={{ rotate: rotation, translateY: -40 }}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                        />
                    ))}
                </div>
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-16 text-[#12b4e8] text-sm sm:text-base font-bold tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(18,180,232,0.8)] flex flex-col items-center"
            >
                JARVIS INITIALIZING
                <span className="flex justify-center gap-2 mt-3">
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#12b4e8]" />
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#12b4e8]" />
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#12b4e8]" />
                </span>
            </motion.div>
        </motion.div>
    );
};

export default Loader;
