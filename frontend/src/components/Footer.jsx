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
        <footer className="relative mt-32 z-10 w-full bg-white/50 backdrop-blur-xl border-t border-neutral-200">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/30 rounded-full blur-[80px] pointer-events-none -z-10 transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-center justify-between">

                    <div className="md:col-span-5 flex flex-col items-center md:items-start space-y-4">
                        <span className="font-extrabold text-2xl tracking-tight text-neutral-900 group-hover:text-cyan-600 transition-colors">
                            {data.name ? data.name.split(' ')[0] : 'Portfolio'}
                            <span className="text-cyan-500">.</span>
                        </span>
                        <p className="text-neutral-500 text-sm font-medium text-center md:text-left max-w-sm">
                            Building digital experiences that combine powerful engineering with minimalist aesthetics.
                        </p>
                    </div>

                    <div className="md:col-span-4 flex justify-center gap-6">
                        <motion.a
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            href={data.github || "https://github.com"} target="_blank" rel="noopener noreferrer"
                            className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-white hover:bg-neutral-900 hover:border-neutral-900 transition-all shadow-sm group interactive"
                        >
                            <Github className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            href={data.linkedin || "https://linkedin.com"} target="_blank" rel="noopener noreferrer"
                            className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all shadow-sm group interactive"
                        >
                            <Linkedin className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            href={`mailto:${data.email}`}
                            className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all shadow-sm group interactive"
                        >
                            <Mail className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                        </motion.a>
                    </div>

                    <div className="md:col-span-3 flex justify-center md:justify-end">
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="group flex items-center gap-3 px-6 py-3 bg-white border border-neutral-200 rounded-full hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all interactive"
                        >
                            <span className="text-sm font-bold text-neutral-600 group-hover:text-cyan-700">Back to Top</span>
                            <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                                <ArrowUp className="w-4 h-4 text-cyan-600 group-hover:text-white" />
                            </div>
                        </motion.button>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-neutral-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-400 text-sm font-medium">
                    <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
                    <p>Designed with <span className="text-red-500 animate-pulse inline-block">❤️</span> locally.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
