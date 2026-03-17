import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight, Building2 } from 'lucide-react';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const Experience = ({ experience }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end end"]
    });

    const pathLength = useSpring(scrollYProgress, { 
        stiffness: 100, 
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" className="py-32 relative overflow-hidden" ref={ref}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-[90rem] mx-auto px-6 relative z-10"
            >
                <div className="flex flex-col items-center mb-16 md:mb-24 text-center space-y-4">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest text-xs md:text-sm uppercase"
                    >
                        JOURNEY
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-7xl font-black text-neutral-900 dark:text-white tracking-tighter"
                    >
                        Experience <span className="text-gradient">Timeline.</span>
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* SVG Progress Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2.5px] -translate-x-1/2 opacity-30 md:opacity-100">
                        <svg className="h-full w-full" preserveAspectRatio="none">
                            <motion.line
                                x1="50%" y1="0%" x2="50%" y2="100%"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="8 8"
                                className="text-neutral-200 dark:text-neutral-800"
                            />
                            <motion.line
                                x1="50%" y1="0%" x2="50%" y2="100%"
                                stroke="url(#line-gradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                style={{ pathLength }}
                            />
                            <defs>
                                <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#06b6d4" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="space-y-24">
                        {experience.map((job, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.1 }}
                                    className={`relative flex flex-col md:flex-row items-center justify-between w-full ${isEven ? "md:flex-row-reverse" : ""}`}
                                >
                                    {/* Timeline dot */}
                                    <motion.div 
                                        whileHover={{ scale: 1.2 }}
                                        className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-[1.5rem] bg-neutral-900 dark:bg-white border-4 border-cyan-500 z-20 shadow-2xl flex items-center justify-center p-0.5 group"
                                    >
                                        <Briefcase className="w-6 h-6 text-white dark:text-neutral-900 group-hover:rotate-12 transition-transform" />
                                    </motion.div>

                                    <div className="hidden md:block w-[45%]"></div>

                                    <div className={`w-full md:w-[45%] pl-20 md:pl-0 mt-2 md:mt-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                        <motion.div
                                            whileHover={{ y: -8 }}
                                            className="glass-card p-10 rounded-[2.5rem] hover-glow transition-all duration-500 group border-white/10"
                                        >
                                            <div className={`flex flex-col gap-4 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                                <div className="inline-flex items-center gap-3 text-xs font-black tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-xl border border-cyan-500/20">
                                                    <Calendar className="w-4 h-4" />
                                                    {job.period.toUpperCase()}
                                                </div>
                                                
                                                <h3 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white tracking-tight group-hover:text-cyan-500 transition-colors">
                                                    {job.title}
                                                </h3>
                                                
                                                <div className="flex items-center gap-3 text-xl md:text-2xl font-black tracking-tight text-gradient">
                                                    {job.company}
                                                </div>

                                                <p className="text-sm md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium mt-4">
                                                    {job.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Experience;
