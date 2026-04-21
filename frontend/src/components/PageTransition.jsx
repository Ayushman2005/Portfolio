import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    const columns = 5;

    const columnVariants = {
        initial: { 
            scaleY: 1, 
            originY: 0 // Shrink towards top
        },
        animate: (i) => ({
            scaleY: 0,
            originY: 0, 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.08 }
        }),
        exit: (i) => ({
            scaleY: 1,
            originY: 1, // Grow from bottom
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.08 }
        })
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, filter: "blur(15px)", scale: 0.95 }}
                animate={{ 
                    opacity: 1, 
                    filter: "blur(0px)",
                    scale: 1,
                    transition: { duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] } 
                }}
                exit={{ 
                    opacity: 0, 
                    filter: "blur(15px)",
                    scale: 0.95,
                    transition: { duration: 0.4, ease: "easeIn" } 
                }}
                className="w-full"
            >
                {children}
            </motion.div>

            <div className="fixed inset-0 pointer-events-none z-[150] flex">
                {[...Array(columns)].map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={columnVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full h-full"
                        style={{ 
                            background: "linear-gradient(135deg, #121212 0%, #0a0a0a 100%)",
                            borderRight: i < columns - 1 ? "1px solid rgba(124,58,237,0.15)" : "none",
                            boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)"
                        }}
                    >
                         {/* Subtle glowing center line effect for each column */}
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default PageTransition;
