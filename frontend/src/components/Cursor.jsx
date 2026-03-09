import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // Smooth springs for the cursor follower
    const springX = useSpring(0, { stiffness: 500, damping: 28 });
    const springY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            springX.set(e.clientX);
            springY.set(e.clientY);
        };

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

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [springX, springY]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-cyan-500 pointer-events-none z-[100] hidden md:block"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                animate={{
                    scale: isHovered ? 1.8 : 1,
                    backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                    borderColor: isHovered ? 'rgba(6, 182, 212, 0.8)' : 'rgba(6, 182, 212, 0.5)',
                }}
                transition={{ duration: 0.15 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full pointer-events-none z-[100] hidden md:block"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovered ? 0 : 1,
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
            />
        </>
    );
};

export default Cursor;
