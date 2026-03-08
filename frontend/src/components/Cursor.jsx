import React, { useEffect, useRef } from 'react';

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (cursorRef.current && followerRef.current) {
                cursorRef.current.style.left = e.clientX + 'px';
                cursorRef.current.style.top = e.clientY + 'px';

                setTimeout(() => {
                    if (followerRef.current) {
                        followerRef.current.style.left = e.clientX + 'px';
                        followerRef.current.style.top = e.clientY + 'px';
                    }
                }, 100);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        // Add hover effect to clickable elements
        const handleMouseEnter = () => {
            if (cursorRef.current && followerRef.current) {
                cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
                followerRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
            }
        };

        const handleMouseLeave = () => {
            if (cursorRef.current && followerRef.current) {
                cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
                followerRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        };

        // Use event delegation for hover effects
        const handleMouseOverDelegated = (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.project-card') || e.target.closest('.skill-card')) {
                handleMouseEnter();
            }
        };

        const handleMouseOutDelegated = (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.project-card') || e.target.closest('.skill-card')) {
                handleMouseLeave();
            }
        };

        document.addEventListener('mouseover', handleMouseOverDelegated);
        document.addEventListener('mouseout', handleMouseOutDelegated);


        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOverDelegated);
            document.removeEventListener('mouseout', handleMouseOutDelegated);
        };
    }, []);

    return (
        <>
            <div className="cursor" ref={cursorRef} onContextMenu={(e) => e.preventDefault()}></div>
            <div className="cursor-follower" ref={followerRef} onContextMenu={(e) => e.preventDefault()}></div>
        </>
    );
};

export default Cursor;
