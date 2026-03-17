import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const Footer = ({ data }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="relative py-24 z-10 w-full overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            
            <div className="max-w-[90rem] mx-auto px-6">
                <div className="glass-card rounded-[3rem] p-12 md:p-16 space-y-16 border-white/10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        <div className="lg:col-span-6 space-y-8">
                            <div className="space-y-4">
                                <span className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white tracking-tighter transition-all">
                                    {data.name ? data.name.split(' ')[0] : 'Portfolio'}
                                    <span className="text-cyan-500">.</span>
                                </span>
                                <p className="text-base md:text-xl text-neutral-500 dark:text-neutral-400 font-medium max-w-md leading-relaxed transition-all">
                                    Building digital experiences that combine powerful engineering with minimalist aesthetics.
                                </p>
                            </div>
                            
                            <div className="flex gap-4">
                                {[
                                    { icon: Github, href: data.github || "https://github.com/Ayushman2005" },
                                    { icon: Linkedin, href: data.linkedin || "https://www.linkedin.com/in/ayushman-kar-08370634b/" },
                                    { icon: Mail, href: `mailto:${data.email}` }
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 hover:bg-cyan-500 hover:border-cyan-400 group transition-all shadow-xl"
                                    >
                                        <social.icon className="w-5 h-5 md:w-6 md:h-6 text-neutral-900 dark:text-white group-hover:text-white transition-colors" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-6 flex flex-col lg:items-end justify-between h-full space-y-12 lg:space-y-0">
                            <motion.button
                                onClick={scrollToTop}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group flex items-center gap-4 px-8 py-4 bg-neutral-900 dark:bg-white rounded-2xl shadow-2xl transition-all"
                            >
                                <span className="text-sm font-black tracking-widest text-white dark:text-neutral-900 uppercase">Back to Top</span>
                                <div className="w-8 h-8 rounded-lg bg-white/10 dark:bg-black/10 flex items-center justify-center transition-colors">
                                    <ArrowUp className="w-5 h-5 text-white dark:text-neutral-900" />
                                </div>
                            </motion.button>

                            <div className="space-y-4 lg:text-right">
                                <h4 className="text-xs font-black tracking-widest text-neutral-400 uppercase">Quick Navigation</h4>
                                <div className="flex flex-wrap lg:justify-end gap-x-8 gap-y-2">
                                    {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                                        <a 
                                            key={item} 
                                            href={`#${item.toLowerCase()}`}
                                            className="text-neutral-600 dark:text-neutral-400 font-bold hover:text-cyan-500 transition-colors"
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-neutral-400 dark:text-neutral-500 font-bold tracking-tight">
                            &copy; {new Date().getFullYear()} {data.name}. Crafted with <span className="text-red-500 animate-pulse inline-block mx-1">❤️</span> and Code.
                        </p>
                        <div className="flex gap-8 text-neutral-400 dark:text-neutral-500 font-bold tracking-tight">
                            <span>Open Source</span>
                            <span>Machine Learning</span>
                            <span>Full Stack</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
