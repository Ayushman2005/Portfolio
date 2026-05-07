import React from 'react';
import { motion } from 'framer-motion';

const KineticText = ({ 
    text = "", 
    className = "", 
    delay = 0, 
    stagger = 0.02,
    yOffset = 10
}) => {
    if (!text) return null;

    const isGradient = className.includes('text-gradient') || className.includes('bg-clip-text');

    return (
        <span className={`${className}`} style={{ display: 'inline', whiteSpace: 'pre-wrap' }}>
            {text.split("").map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: isGradient ? 0 : yOffset }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ 
                        duration: 0.5,
                        delay: delay + (index * stagger),
                        ease: [0.215, 0.61, 0.355, 1]
                    }}
                    style={{ 
                        display: "inline-block", // Must be inline-block for y-transform
                        // For gradient text, we need to ensure the clip-text background works.
                        // Sometimes browser needs the element to be part of the text flow.
                        WebkitBackgroundClip: isGradient ? 'inherit' : 'initial',
                        backgroundClip: isGradient ? 'inherit' : 'initial',
                        WebkitTextFillColor: isGradient ? 'transparent' : 'inherit',
                    }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </span>
    );
};

export default KineticText;
