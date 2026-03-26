import React, { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        // Native scrolling is always smoother on mobile — only enable Lenis on desktop
        const isDesktop = window.matchMedia('(min-width: 768px)').matches;
        if (!isDesktop) return;

        const lenis = new Lenis({
            duration: 2.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 0.9,
            wheelMultiplier: 0.9,
            lerp: 0.08,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
