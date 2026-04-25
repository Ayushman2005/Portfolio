import React, { useEffect } from 'react';
import Lenis from 'lenis';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        if (isMobile()) return; // Native scrolling is always smoother on mobile

        const lenis = new Lenis({
            lerp: 0.06, // Ultra-smooth scroll interpolation
            wheelMultiplier: 1.1, // Slight boost for native speed matching
            smoothWheel: true,
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
