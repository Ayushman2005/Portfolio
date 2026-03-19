import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    '/images/Myself/IMG_5381.JPG'
];

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Slower interval for smoother reading
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleDragEnd = (e, { offset, velocity }) => {
        const swipe = offset.x;
        if (swipe < -50) setCurrentIndex((prev) => (prev + 1) % images.length);
        else if (swipe > 50) setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div 
            className="relative w-full h-[450px] md:h-[600px] rounded-[3rem] overflow-hidden bg-slate-950 group shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] flex items-center justify-center"
            style={{ perspective: 1500 }}
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-pink-600/20 z-0 blur-3xl opacity-70 mix-blend-screen pointer-events-none" />

            <div 
                className="relative w-full h-full z-10 flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {images.map((img, i) => {
                    // Calculate relative distance mathematically
                    let diff = i - currentIndex;
                    // Handle wrap-around math for continuous infinite looping
                    if (diff > images.length / 2) diff -= images.length;
                    if (diff < -images.length / 2) diff += images.length;

                    const absDiff = Math.abs(diff);
                    // Filter rendering to only show nearby images for performance
                    if (absDiff > 3) return null;

                    const mobile = isMobile();
                    const xOffset = mobile ? 65 : 180;
                    
                    return (
                        <motion.div
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            initial={false}
                            animate={{
                                x: diff * xOffset,
                                scale: 1 - absDiff * (mobile ? 0.15 : 0.2),
                                zIndex: 20 - absDiff,
                                rotateY: diff * -15, // Softer tilt
                                opacity: 1 - absDiff * 0.3,
                                filter: `blur(${absDiff * 2}px)`, // Lighter blur for performance smoothness
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Ultra smooth Apple-like easing instead of snappy spring
                            drag={absDiff === 0 ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2} // Less rubber-banding
                            onDragEnd={handleDragEnd}
                            className={`absolute flex items-center justify-center w-[75%] md:w-[45%] h-[75%] md:h-[80%] rounded-[2rem] overflow-hidden shadow-2xl bg-black/40 backdrop-blur-sm ${
                                absDiff === 0 
                                    ? 'border-2 border-violet-500/50 cursor-grab active:cursor-grabbing hover:shadow-[0_0_50px_rgba(124,58,237,0.3)]' 
                                    : 'border border-white/10 cursor-pointer'
                            }`}
                        >
                            <img
                                src={img}
                                className="w-full h-full object-contain transition-transform duration-700"
                                style={{ transform: absDiff === 0 ? 'scale(1.02)' : 'scale(1)' }}
                                alt={`Portrait ${i + 1}`}
                                loading="lazy"
                            />
                            {/* Inner vignette overlay */}
                            <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${absDiff === 0 ? 'opacity-0' : 'opacity-60'}`} />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
                        </motion.div>
                    );
                })}
            </div>
            
            {/* Interactive Progress Bar Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className="relative h-2 rounded-full overflow-hidden transition-all duration-300 group-hover:h-3"
                        style={{ width: i === currentIndex ? '3.5rem' : '1rem', backgroundColor: 'rgba(255,255,255,0.2)' }}
                        aria-label={`Go to image ${i + 1}`}
                    >
                        {i === currentIndex && (
                            <motion.div 
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 to-indigo-500"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 4, ease: "linear" }}
                                key={currentIndex} 
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
