import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

const Footer = ({ data }) => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

    const socials = [
        { icon: Github, href: data.github || "https://github.com/Ayushman2005", label: 'GitHub' },
        { icon: Linkedin, href: data.linkedin || "https://linkedin.com/in/ayushman-kar", label: 'LinkedIn' },
        { icon: Mail, href: `mailto:${data.email}`, label: 'Email' },
    ];

    return (
        <footer className="relative py-16 z-10 w-full overflow-hidden">
            {/* Top divider */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="max-w-[100rem] mx-auto px-6 relative z-10">
                <div className="glass-card rounded-[3rem] p-12 md:p-16 border border-slate-200 bg-white shadow-2xl shadow-slate-200/50">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
                        {/* Brand Column */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-[1.25rem] flex items-center justify-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-3xl font-black text-slate-900 tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    {data.name ? data.name.split(' ')[0] : 'Ayushman'}<span className="text-violet-500">.</span>
                                </span>
                            </div>

                            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm">
                                Engineering intelligent digital experiences with a focus on performance, intelligence, and accessibility.
                            </p>

                            {/* Social Buttons */}
                            <div className="flex gap-4">
                                {socials.map(({ icon: Icon, href, label }) => (
                                    <motion.a
                                        key={label}
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-violet-600 hover:border-violet-500 hover:text-white transition-all shadow-md group"
                                    >
                                        <Icon className="w-5.5 h-5.5 transition-transform" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation and CTA Column */}
                        <div className="lg:col-span-7 flex flex-col sm:flex-row justify-between gap-12 lg:pl-12">
                            <div className="space-y-6">
                                <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Directory</p>
                                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link}
                                            href={`#${link.toLowerCase()}`}
                                            className="text-base text-slate-600 font-black hover:text-violet-600 transition-all uppercase tracking-tight"
                                        >
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col items-start sm:items-end gap-6">
                                <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Action</p>
                                <motion.button
                                    onClick={scrollToTop}
                                    whileHover={{ scale: 1.05, y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-black text-sm tracking-[0.2em] uppercase shadow-2xl transition-all"
                                    style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
                                >
                                    <ArrowUp className="w-5 h-5" />
                                    To Top
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Horizontal Line */}
                    <div className="h-[1px] bg-slate-100 mb-10" />

                    {/* Bottom Info Row */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-slate-400 text-sm font-bold">
                            <span>© {new Date().getFullYear()} {data.name}</span>
                            <span className="hidden md:inline text-slate-200">|</span>
                            <span>Engineered with Precision</span>
                        </div>
                        
                        <div className="flex gap-8 text-[10px] font-black text-slate-300 tracking-[0.25em] uppercase pointer-events-none">
                            <span>Open Source</span>
                            <span>Intelligence</span>
                            <span>Design</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
