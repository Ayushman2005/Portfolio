import React, { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        // Native scrolling is always smoother on mobile — only enable Lenis on desktop
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            wheelMultiplier: 1,
            lerp: 0.1,
            smoothTouch: true,
            touchMultiplier: 2,
            infinite: false,
        });

        // Expose lenis to window for use in navigation
        window.lenis = lenis;

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
