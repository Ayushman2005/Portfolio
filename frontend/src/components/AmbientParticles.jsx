import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const AmbientParticles = () => {
    // We generate 30 particles with random properties
    const particles = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        size: Math.random() * 8 + 3, // 3px to 11px
        x: Math.random() * 100, // vw
        y: Math.random() * 100, // vh
        duration: Math.random() * 25 + 15, // 15s to 40s
        delay: Math.random() * -20, // Negative start
    })), []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden h-screen w-screen">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-violet-500/20"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}vw`,
                        top: `${p.y}vh`,
                        boxShadow: '0 0 15px rgba(124,58,237,0.4)',
                    }}
                    animate={{
                        y: [-200, -800],
                        x: [0, (Math.random() - 0.5) * 300],
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1.5, 0.5],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

export default AmbientParticles;
