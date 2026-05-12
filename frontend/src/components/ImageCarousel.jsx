import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

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

const INTERVAL = 8000;
const TRANSITION_SPRING = { 
    type: "spring", 
    stiffness: 40, 
    damping: 20, 
    mass: 0.8,
    restDelta: 0.001 
};

const TRANSITION_TWEEN = {
    type: "tween",
    duration: 0.4,
    ease: "easeOut"
};

const IS_MOBILE =
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef(null);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, INTERVAL);
    }, []);

    useEffect(() => {
        if (!isHovered) startTimer();
        return () => clearInterval(timerRef.current);
    }, [startTimer, isHovered]);

    const goTo = useCallback((i) => {
        const index = (i + images.length) % images.length;
        setCurrentIndex(index);
    }, []);

    const next = () => goTo(currentIndex + 1);
    const prev = () => goTo(currentIndex - 1);

    const handleDragEnd = useCallback((_, { offset, velocity }) => {
        const swipe = Math.abs(offset.x) * velocity.x;
        if (swipe < -5000 || offset.x < -80) next();
        else if (swipe > 5000 || offset.x > 80) prev();
    }, [currentIndex]);

    return (
        <div
            className="relative w-full h-[500px] md:h-[650px] rounded-[3rem] overflow-hidden bg-[#050505] group select-none flex flex-col items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ willChange: 'contents' }}
        >
            {/* Immersive Background Blur - Cinematic bleeding light */}
            {!IS_MOBILE && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.35 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0 z-0 pointer-events-none blur-[100px] scale-150"
                        style={{
                            backgroundImage: `url(${images[currentIndex]})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            willChange: 'opacity'
                        }}
                    />
                </AnimatePresence>
            )}

            {/* Premium Header Overlay */}
            <div className="absolute top-8 left-8 right-8 z-30 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
                    <Camera className="w-4 h-4 text-violet-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                        Gallery Portfolio // {currentIndex + 1} of {images.length}
                    </span>
                </div>
            </div>

            {/* 3D Stage */}
            <div className="relative w-full h-full flex items-center justify-center perspective-[2000px] z-10">
                {images.map((img, i) => {
                    let diff = i - currentIndex;
                    if (diff > images.length / 2) diff -= images.length;
                    if (diff < -images.length / 2) diff += images.length;

                    const absDiff = Math.abs(diff);
                    if (absDiff > 2) return null; // Only render immediate neighbors for max performance

                    const isActive = absDiff === 0;
                    
                    const x = IS_MOBILE ? diff * 110 : diff * 260;
                    const rotateY = diff * -20;
                    const scale = 1 - absDiff * 0.12;
                    const opacity = 1 - absDiff * 0.5;
                    const translateZ = -absDiff * 350;
                    const zIndex = 50 - absDiff * 10;

                    return (
                        <motion.div
                            key={i}
                            initial={false}
                            animate={{
                                x,
                                rotateY,
                                scale,
                                opacity,
                                translateZ,
                                zIndex,
                            }}
                            transition={IS_MOBILE ? TRANSITION_TWEEN : TRANSITION_SPRING}
                            drag={isActive ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            onClick={() => !isActive && goTo(i)}
                            className={`absolute w-[280px] h-[380px] md:w-[420px] md:h-[580px] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] preserve-3d ${
                                isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                            }`}
                            style={{ willChange: 'transform, opacity' }}
                        >
                            {/* Glass border effect */}
                            <div className={`absolute inset-0 z-20 border-2 rounded-[2.5rem] transition-colors duration-1000 ${
                                isActive ? 'border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.1)]' : 'border-white/5'
                            }`} />

                            {/* Image with Parallax Shift */}
                            <motion.img
                                src={img}
                                alt={`Life Moment ${i}`}
                                className="w-full h-full object-cover bg-neutral-900 transition-transform duration-1000"
                                style={{
                                    transform: `scale(${isActive ? 1 : 1.1})`,
                                    willChange: 'transform'
                                }}
                            />

                            {/* Lighting Overlay */}
                            <div className={`absolute inset-0 z-10 transition-opacity duration-1000 pointer-events-none ${
                                isActive 
                                    ? 'bg-gradient-to-t from-black/50 via-transparent to-white/5 opacity-100' 
                                    : 'bg-black/60 opacity-100'
                            }`} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Interaction Controls */}
            <div className="absolute inset-x-0 bottom-12 flex items-center justify-center gap-8 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <button 
                    onClick={prev}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 text-white transition-all hover:scale-110 active:scale-95"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-2.5 bg-black/40 backdrop-blur-3xl px-6 py-4 rounded-full border border-white/5 shadow-2xl">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className="relative h-1 rounded-full overflow-hidden transition-all duration-700"
                            style={{
                                width: i === currentIndex ? '2.5rem' : '0.5rem',
                                backgroundColor: i === currentIndex ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.1)'
                            }}
                        >
                            {i === currentIndex && (
                                <motion.div
                                    layoutId="progress"
                                    className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '0%' }}
                                    transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={next}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 text-white transition-all hover:scale-110 active:scale-95"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default ImageCarousel;
