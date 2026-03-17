import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const Cursor = () => {
    if (isMobile()) return null;

    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    // Main Dot — snappy
    const mainX = useSpring(0, { stiffness: 1200, damping: 60 });
    const mainY = useSpring(0, { stiffness: 1200, damping: 60 });

    // Ring — moderate lag
    const ringX = useSpring(0, { stiffness: 180, damping: 18 });
    const ringY = useSpring(0, { stiffness: 180, damping: 18 });

    useEffect(() => {
        const move = (e) => {
            mainX.set(e.clientX);
            mainY.set(e.clientY);
            ringX.set(e.clientX);
            ringY.set(e.clientY);
        };
        const down = () => setIsPressed(true);
        const up = () => setIsPressed(false);
        const over = (e) => {
            const el = e.target;
            const interactive =
                el.tagName.toLowerCase() === 'a' ||
                el.tagName.toLowerCase() === 'button' ||
                el.closest('a') ||
                el.closest('button') ||
                el.classList.contains('interactive');
            setIsHovered(!!interactive);
        };

        window.addEventListener('mousemove', move, { passive: true });
        window.addEventListener('mousedown', down);
        window.addEventListener('mouseup', up);
        window.addEventListener('mouseover', over);

        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mousedown', down);
            window.removeEventListener('mouseup', up);
            window.removeEventListener('mouseover', over);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Main dot — snappy */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    x: mainX, y: mainY,
                    translateX: '-50%', translateY: '-50%',
                    width: 8, height: 8,
                    background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                    boxShadow: '0 0 10px rgba(124,58,237,0.7)',
                }}
                animate={{
                    scale: isHovered ? 0 : isPressed ? 1.8 : 1,
                }}
                transition={{ duration: 0.15 }}
            />
        </div>
    );
};

export default Cursor;
