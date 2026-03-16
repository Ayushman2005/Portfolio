import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ name }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDiv, setActiveDiv] = useState('');

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Honors', href: '#achievements' },
        { name: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = navLinks.map(link => link.href.substring(1));
            let current = '';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        current = section;
                        break;
                    }
                }
            }
            setActiveDiv(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-6 left-0 right-0 z-[100] px-6 flex justify-center pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={`pointer-events-auto max-w-[85rem] w-full rounded-[2rem] border border-white/10 dark:border-white/5 shadow-2xl transition-all duration-500 overflow-hidden ${
                    scrolled ? 'glass-card py-3 px-8' : 'bg-transparent py-5 px-4'
                }`}
            >
                <div className="flex justify-between items-center w-full">
                    <a href="#" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            className="w-10 h-10 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-cyan-500/20 transition-all overflow-hidden"
                        >
                            <Code2 className="w-6 h-6 text-white dark:text-neutral-900" />
                        </motion.div>
                        <span className="font-black text-xl tracking-tighter text-neutral-900 dark:text-white uppercase">
                            {name ? name.split(' ')[0] : 'Portfolio'}
                            <span className="text-cyan-500">.</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, index) => {
                            const isActive = activeDiv === link.href.substring(1);
                            return (
                                <a
                                    key={index}
                                    href={link.href}
                                    className={`relative px-5 py-2 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${
                                        isActive ? 'text-cyan-500' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                                    }`}
                                    onClick={() => setActiveDiv(link.href.substring(1))}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className="absolute inset-0 bg-cyan-500/10 rounded-xl"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </a>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle className="hover:scale-110 transition-transform" />
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/Resume.pdf"
                            target="_blank"
                            className="hidden lg:block px-6 py-2.5 rounded-xl border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white text-xs font-black tracking-widest uppercase transition-all hover:bg-neutral-900 dark:hover:bg-white hover:text-white dark:hover:text-neutral-900"
                        >
                            RESUME
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href="#contact"
                            className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-black tracking-widest uppercase shadow-xl hover:shadow-cyan-500/30 transition-all"
                        >
                            LET'S TALK
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        </motion.a>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-neutral-900 dark:text-white p-2"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden border-t border-white/10 dark:border-white/5 mt-4 overflow-hidden"
                        >
                            <div className="flex flex-col gap-6 py-8 px-4">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-2xl font-black tracking-tighter text-neutral-900 dark:text-white uppercase hover:text-cyan-500 transition-colors flex items-center justify-between group"
                                    >
                                        <span>{link.name}</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.a>
                                ))}
                                <motion.a
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: navLinks.length * 0.05 }}
                                    href="/Resume.pdf"
                                    target="_blank"
                                    className="mt-4 px-8 py-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-center font-black tracking-widest uppercase shadow-xl"
                                >
                                    DOWNLOAD RESUME
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </header>
    );
};

export default Navbar;
