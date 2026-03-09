import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, rotate: theme === 'dark' ? -15 : 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="fixed bottom-6 right-6 z-[90] p-4 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-2xl border border-neutral-200/50 dark:border-neutral-700/50 text-neutral-800 dark:text-cyan-400 overflow-hidden group"
            aria-label="Toggle Theme"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: -30, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 30, opacity: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative z-10"
                >
                    {theme === 'dark' ? <Moon size={24} fill="currentColor" className="opacity-80 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" /> : <Sun size={24} fill="currentColor" className="text-amber-500 opacity-90 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
};

export default ThemeToggle;
