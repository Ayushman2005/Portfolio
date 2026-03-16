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

    // Main Dot
    const mainX = useSpring(0, { stiffness: 1000, damping: 50, restDelta: 0.1, restSpeed: 0.1 });
    const mainY = useSpring(0, { stiffness: 1000, damping: 50, restDelta: 0.1, restSpeed: 0.1 });
 
    // Inner Ring
    const innerX = useSpring(0, { stiffness: 400, damping: 30, restDelta: 0.5, restSpeed: 0.5 });
    const innerY = useSpring(0, { stiffness: 400, damping: 30, restDelta: 0.5, restSpeed: 0.5 });
 
    // Outer Ring
    const outerX = useSpring(0, { stiffness: 150, damping: 20, restDelta: 1, restSpeed: 1 });
    const outerY = useSpring(0, { stiffness: 150, damping: 20, restDelta: 1, restSpeed: 1 });

    useEffect(() => {
        const moveMouse = (e) => {
            mainX.set(e.clientX);
            mainY.set(e.clientY);
            innerX.set(e.clientX);
            innerY.set(e.clientY);
            outerX.set(e.clientX);
            outerY.set(e.clientY);
        };

        const handleMouseDown = () => setIsPressed(true);
        const handleMouseUp = () => setIsPressed(false);

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive')
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Outer Follower */}
            <motion.div
                className="absolute w-12 h-12 border-2 border-cyan-500/20 rounded-full flex items-center justify-center"
                style={{ x: outerX, y: outerY, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    scale: isHovered ? 2 : isPressed ? 0.8 : 1,
                    opacity: isHovered ? 0 : 1
                }}
            />

            {/* Inner Follower */}
            <motion.div
                className="absolute w-8 h-8 border border-cyan-500/40 rounded-full"
                style={{ x: innerX, y: innerY, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    scale: isHovered ? 2.5 : isPressed ? 0.5 : 1,
                    borderColor: isHovered ? 'rgba(6, 182, 212, 0.8)' : 'rgba(6, 182, 212, 0.4)',
                    backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.1)' : 'transparent'
                }}
            />

            {/* Main Dot */}
            <motion.div
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                style={{ x: mainX, y: mainY, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    scale: isHovered ? 0 : isPressed ? 1.5 : 1
                }}
            />
        </div>
    );
};

export default Cursor;
