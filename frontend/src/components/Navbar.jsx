import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = ({ name }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDiv, setActiveDiv] = useState('');

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active nav item based on scroll position
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
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${scrolled
                ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
                : 'py-6 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2 group interactive">
                    <motion.div
                        whileHover={{ rotate: 90 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="w-10 h-10 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/30 transition-shadow"
                    >
                        <Code2 className="w-6 h-6 text-white" />
                    </motion.div>
                    <span className="font-extrabold text-xl tracking-tight text-neutral-900 group-hover:text-cyan-600 transition-colors">
                        {name ? name.split(' ')[0] : 'Portfolio'}
                        <span className="text-cyan-500">.</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1 bg-neutral-100/50 p-1.5 rounded-full border border-neutral-200/50 backdrop-blur-md">
                    {navLinks.map((link, index) => {
                        const isActive = activeDiv === link.href.substring(1);
                        return (
                            <a
                                key={index}
                                href={link.href}
                                className={`relative px-5 py-2 rounded-full text-sm font-bold transition-colors interactive ${isActive ? 'text-white' : 'text-neutral-600 hover:text-cyan-600'
                                    }`}
                                onClick={(e) => setActiveDiv(link.href.substring(1))}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-active-pill"
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-md"
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    />
                                )}
                                <span className="relative z-10">{link.name}</span>
                            </a>
                        );
                    })}
                </div>

                <div className="hidden md:block">
                    <a
                        href={import.meta.env.VITE_RESUME_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:10000'}/static/Resume.pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="interactive px-5 py-2.5 rounded-xl border-2 border-cyan-500 text-cyan-600 font-bold hover:bg-cyan-500 hover:text-white transition-all shadow-sm hover:shadow-cyan-500/20 active:scale-95"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-neutral-800 p-2 focus:outline-none interactive"
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-white/95 backdrop-blur-3xl border-b border-neutral-200 overflow-hidden shadow-2xl"
                    >
                        <div className="px-6 py-6 flex flex-col space-y-4">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-lg font-bold text-neutral-800 hover:text-cyan-600 border-b border-neutral-100 pb-3"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                href={import.meta.env.VITE_RESUME_URL || "#"}
                                className="text-center py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-md active:scale-95 transition-transform"
                            >
                                Download Resume
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
