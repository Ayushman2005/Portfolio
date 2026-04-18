import React, { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        // Native scrolling is always smoother on mobile — only enable Lenis on desktop
        const lenis = new Lenis({
            lerp: 0.06, // Ultra-smooth scroll interpolation
            wheelMultiplier: 1.1, // Slight boost for native speed matching
            smoothWheel: true,
            syncTouch: true,
            smoothTouch: false,
            touchMultiplier: 2,
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
