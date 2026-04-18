import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, MoveUpRight } from 'lucide-react';

const Footer = ({ data }) => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

    const socials = [
        { icon: Github, href: data.github || "https://github.com/Ayushman2005", label: 'GitHub' },
        { icon: Linkedin, href: data.linkedin || "https://www.linkedin.com/in/ayushman-kar-08370634b/", label: 'LinkedIn' },
        { icon: Mail, href: `mailto:${data.email}`, label: 'Email' },
    ];

    return (
        <footer className="relative w-full overflow-hidden mt-20 pt-20 border-t border-white/10 bg-[#050505]/80 backdrop-blur-3xl z-40">
            {/* Dynamic Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/20 blur-[150px] pointer-events-none rounded-full"></div>
            
            {/* Glowing top lip */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>

            <div className="max-w-[100rem] mx-auto px-6 md:px-16 relative z-10 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start mb-24">
                    
                    {/* Left: Massive Brand Statement */}
                    <div className="space-y-8">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Let's Build <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">The Future.</span>
                        </motion.h2>
                        <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-lg">
                            Ready to engineer intelligent digital experiences with performance and precision.
                        </p>
                        
                        {/* Interactive Email Button CTA */}
                        <motion.a
                            href={`mailto:${data.email}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-4 px-8 py-5 rounded-full bg-white text-black font-black text-sm tracking-[0.2em] uppercase shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all mt-6"
                        >
                            <Mail className="w-5 h-5" />
                            Start a Conversation
                            <MoveUpRight className="w-5 h-5 ml-2 opacity-50" />
                        </motion.a>
                    </div>

                    {/* Right: Modern Grid Layout for Links */}
                    <div className="flex flex-col sm:flex-row justify-start lg:justify-end gap-16 lg:gap-24">
                        {/* Navigation */}
                        <div className="space-y-8">
                            <p className="text-xs font-black tracking-[0.4em] text-slate-500 uppercase">Directory</p>
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <a
                                        key={link}
                                        href={`#${link.toLowerCase()}`}
                                        className="text-lg md:text-xl text-slate-300 font-bold hover:text-white hover:translate-x-2 transition-all w-fit"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="space-y-8">
                            <p className="text-xs font-black tracking-[0.4em] text-slate-500 uppercase">Connect</p>
                            <div className="flex flex-col gap-4">
                                {socials.map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg md:text-xl text-slate-300 font-bold hover:text-violet-400 hover:translate-x-2 transition-all flex items-center gap-3 group w-fit"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        <Icon className="w-5 h-5 text-slate-500 group-hover:text-violet-400 transition-colors" />
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Massive Horizontal Divider */}
                <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/20 to-white/10 mb-8" />

                {/* Bottom Bar Segment */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3 text-slate-400 font-bold text-sm tracking-widest uppercase">
                        <span>© {new Date().getFullYear()}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                        <span className="text-white">{data.name}</span>
                    </div>

                    <div className="flex gap-6 text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase pointer-events-none text-center">
                        <span>Engines Online</span>
                        <span className="hidden md:inline text-slate-700">|</span>
                        <span>All Systems Nominal</span>
                    </div>

                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1, y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-violet-600 hover:border-violet-500 transition-colors text-white shadow-xl flex-shrink-0"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-6 h-6" />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
