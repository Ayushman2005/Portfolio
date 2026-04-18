import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ name }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState(null);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Skills', href: '/skills' },
        { name: 'Projects', href: '/projects' },
        { name: 'Experience', href: '/experience' },
        { name: 'Honors', href: '/achievements' },
        { name: 'Contact', href: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-[110] flex justify-center pointer-events-none">
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
                    className={`pointer-events-auto w-full transition-all duration-500 border-b border-white/5 ${
                        scrolled 
                        ? 'bg-black/70 backdrop-blur-3xl py-2 md:py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]' 
                        : 'bg-black/30 backdrop-blur-xl py-4 shadow-none'
                    }`}
                >
                    <div className="flex justify-between items-center w-full max-w-[100rem] mx-auto px-6 md:px-12">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 15 }}
                                className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-lg"
                                style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
                            >
                                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </motion.div>
                            <span className="font-black text-xl md:text-2xl tracking-tighter text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                {name ? name.split(' ')[0] : 'Ayushman'}
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1 lg:gap-2">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onMouseEnter={() => setHoveredPath(link.href)}
                                        onMouseLeave={() => setHoveredPath(null)}
                                        className={`relative px-5 py-2.5 rounded-xl text-[10px] lg:text-xs font-black tracking-widest uppercase transition-all duration-300 ${
                                            isActive
                                                ? 'text-violet-500'
                                                : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        <AnimatePresence>
                                            {hoveredPath === link.href && !isActive && (
                                                <motion.div
                                                    layoutId="nav-hover"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="absolute inset-0 rounded-xl bg-white/[0.03] border border-white/5 shadow-inner"
                                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                />
                                            )}
                                        </AnimatePresence>

                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-active"
                                                className="absolute inset-0 rounded-xl bg-violet-600/10 border border-violet-500/20 shadow-[0_0_20px_rgba(124,58,237,0.08)]"
                                                transition={{ type: "spring", stiffness: 380, damping: 25 }}
                                            >
                                                <motion.div
                                                    layoutId="nav-dot"
                                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_10px_#8b5cf6]"
                                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                />
                                            </motion.div>
                                        )}
                                        <motion.span 
                                            animate={hoveredPath === link.href ? { y: -1 } : { y: 0 }}
                                            className="relative z-10 flex items-center justify-center"
                                        >
                                            {link.name}
                                        </motion.span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/Resume.pdf"
                                target="_blank"
                                className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-transparent text-neutral-400 text-[10px] font-black tracking-[0.15em] uppercase transition-all hover:border-violet-200 hover:text-violet-600"
                            >
                                Resume ↗
                            </motion.a>

                            <Link to="/contact" className="hidden sm:block">
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-white text-[10px] font-black tracking-[0.2em] uppercase shadow-[0_10px_30px_-5px_rgba(124,58,237,0.4)] transition-all"
                                    style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
                                >
                                    Let's Connect
                                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse transition-all duration-300 ${location.pathname === '/contact' ? 'bg-emerald-500 shadow-[0_0_8px_#34d399]' : 'bg-black/40'}`} />
                                </motion.div>
                            </Link>

                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden text-neutral-400 p-2.5 rounded-xl hover:bg-[#121212]/5 transition-all flex items-center justify-center"
                                aria-label="Toggle Menu"
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
                                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                className="md:hidden border-t border-transparent mt-5 overflow-hidden"
                            >
                                <div className="flex flex-col gap-5 py-8 px-4">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ x: -40, opacity: 0, rotateX: -20 }}
                                            animate={{ x: 0, opacity: 1, rotateX: 0 }}
                                            transition={{ 
                                                type: "spring", 
                                                stiffness: 300, 
                                                damping: 30, 
                                                delay: index * 0.08 
                                            }}
                                            viewport={{ once: true }}
                                        >
                                            <Link
                                                to={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="text-3xl font-black text-white uppercase tracking-tighter hover:text-violet-500 transition-all flex items-center justify-between group block w-full py-1.5"
                                            >
                                                <motion.span whileHover={{ x: 10 }}>{link.name}</motion.span>
                                                <div className="w-2 h-2 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-all scale-0 group-hover:scale-110 shadow-[0_0_10px_#8b5cf6]" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: navLinks.length * 0.05 }}
                                        className="mt-6 flex flex-col gap-4"
                                    >
                                        <a
                                            href="/Resume.pdf"
                                            target="_blank"
                                            className="w-full py-5 rounded-2xl bg-[#0a0a0a] border-2 border-transparent text-white text-center font-black tracking-widest uppercase"
                                        >
                                            Resume ↗
                                        </a>
                                        <Link
                                            to="/contact"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <motion.div
                                                className="w-full py-5 rounded-2xl text-white text-center font-black tracking-widest uppercase shadow-xl flex items-center justify-center gap-3"
                                                style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
                                            >
                                                Let's Connect
                                                <div className={`w-2 h-2 rounded-full animate-pulse transition-all duration-300 ${location.pathname === '/contact' ? 'bg-emerald-500 shadow-[0_0_8px_#34d399]' : 'bg-black/40'}`} />
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
            </header>

            {/* Back to top button */}
            <AnimatePresence>
                {scrolled && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-2xl bg-[#121212] shadow-2xl border border-transparent flex items-center justify-center text-violet-600 hover:bg-violet-600 hover:text-white transition-all group"
                        aria-label="Back to Top"
                    >
                        <ArrowUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
