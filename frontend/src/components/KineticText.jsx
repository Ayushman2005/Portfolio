import React from 'react';
import { motion } from 'framer-motion';

const KineticText = ({ 
    text = "", 
    className = "", 
    delay = 0, 
    stagger = 0.015,
    yOffset = 10
}) => {
    if (!text) return null;

    const isGradient = className.includes('text-gradient') || className.includes('bg-clip-text');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: stagger,
            }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: isGradient ? 0 : yOffset },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.4,
                ease: [0.215, 0.61, 0.355, 1]
            }
        }
    };

    return (
        <motion.span 
            className={`${className}`} 
            style={{ display: 'inline', whiteSpace: 'pre-wrap' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
        >
            {text.split("").map((letter, index) => (
                <motion.span
                    key={index}
                    variants={letterVariants}
                    style={{ 
                        display: "inline-block",
                        WebkitBackgroundClip: isGradient ? 'inherit' : 'initial',
                        backgroundClip: isGradient ? 'inherit' : 'initial',
                        WebkitTextFillColor: isGradient ? 'transparent' : 'inherit',
                    }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default KineticText;
