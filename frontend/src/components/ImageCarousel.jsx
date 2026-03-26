import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const images = [
    '/images/Myself/IMG-20251220-WA0009.jpg',
    '/images/Myself/IMG-20251220-WA0018.jpg',
    '/images/Myself/IMG20251228102936.jpg',
    '/images/Myself/IMG_20241007_120715.jpg',
    '/images/Myself/IMG_20250118_124343.jpg',
    '/images/Myself/IMG_20250202_130319.jpg',
    '/images/Myself/IMG_20260123_123623.jpg',
    '/images/Myself/IMG_20260310_234333.jpg',
    '/images/Myself/IMG_20260317_100054.jpg',
    '/images/Myself/IMG_5381.JPG',
];

const INTERVAL = 6000;
const TRANSITION = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

// Pre-compute mobile once at module load – never re-run in render/loop
const IS_MOBILE =
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const X_OFFSET = IS_MOBILE ? 68 : 185;
const SCALE_STEP = IS_MOBILE ? 0.14 : 0.18;

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef(null);

    // Fixed timer — does NOT depend on currentIndex to avoid restart jitter
    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, INTERVAL);
    }, []);

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [startTimer]);

    const goTo = useCallback((i) => {
        setCurrentIndex(i);
        startTimer(); // reset timer on manual nav
    }, [startTimer]);

    const handleDragEnd = useCallback((_, { offset }) => {
        if (offset.x < -40) goTo((currentIndex + 1) % images.length);
        else if (offset.x > 40) goTo((currentIndex - 1 + images.length) % images.length);
    }, [currentIndex, goTo]);

    return (
        <div
            className="relative w-full h-[450px] md:h-[600px] rounded-[3rem] overflow-hidden bg-slate-950 group flex items-center justify-center select-none"
            style={{ willChange: 'auto' }}
        >
            {/* Static ambient glow — NOT animated, no blur repaints */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(236,72,153,0.12) 0%, transparent 60%)',
                }}
            />

            {/* Cards — only translate/scale/opacity (GPU compositor-only properties) */}
            <div className="relative w-full h-full z-10 flex items-center justify-center">
                {images.map((img, i) => {
                    let diff = i - currentIndex;
                    if (diff > images.length / 2) diff -= images.length;
                    if (diff < -images.length / 2) diff += images.length;

                    const absDiff = Math.abs(diff);
                    if (absDiff > 2) return null; // render only 5 cards max

                    const isActive = absDiff === 0;
                    const scale = 1 - absDiff * SCALE_STEP;
                    const opacity = isActive ? 1 : 1 - absDiff * 0.35;
                    const x = diff * X_OFFSET;
                    const zIndex = 20 - absDiff;

                    return (
                        <motion.div
                            key={i}
                            onClick={() => !isActive && goTo(i)}
                            initial={false}
                            animate={{ x, scale, opacity, zIndex }}
                            transition={TRANSITION}
                            drag={isActive ? 'x' : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.15}
                            onDragEnd={handleDragEnd}
                            className={`absolute w-[75%] md:w-[44%] h-[75%] md:h-[82%] rounded-[2rem] overflow-hidden shadow-2xl ${
                                isActive
                                    ? 'border-2 border-violet-500/60 cursor-grab active:cursor-grabbing'
                                    : 'border border-transparent cursor-pointer'
                            }`}
                            style={{ willChange: 'transform, opacity' }}
                        >
                            <img
                                src={img}
                                alt={`Portrait ${i + 1}`}
                                loading={absDiff <= 1 ? 'eager' : 'lazy'}
                                decoding="async"
                                className="w-full h-full object-contain bg-black"
                            />
                            {/* Simple static overlay — no animated opacity */}
                            {!isActive && (
                                <div
                                    className="absolute inset-0 bg-black/55 pointer-events-none"
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Progress dot navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to image ${i + 1}`}
                        className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500 group-hover:h-2.5"
                        style={{
                            width: i === currentIndex ? '3rem' : '0.75rem',
                            backgroundColor: 'rgba(255,255,255,0.18)',
                        }}
                    >
                        {i === currentIndex && (
                            <motion.div
                                key={currentIndex}
                                className="absolute inset-y-0 left-0 rounded-full"
                                style={{ background: 'linear-gradient(90deg, #7c3aed, #818cf8)' }}
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
