import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { GraduationCap, Building2, MapPin, Code2 } from 'lucide-react';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const About = ({ data }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], !isMobile() ? [100, -100] : [0, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
            <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
            
            <motion.div style={{ y, opacity }} className="max-w-[90rem] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                    <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-4">
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest text-sm uppercase"
                            >
                                IDENTITY
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-6xl font-black text-neutral-900 dark:text-white tracking-tighter"
                            >
                                Who is Behind <span className="text-gradient">the Code?</span>
                            </motion.h2>
                        </div>

                        <div className="space-y-8">
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium"
                            >
                                Hello! I'm <span className="text-neutral-900 dark:text-white font-black underline decoration-cyan-500 decoration-3 underline-offset-4">Ayushman Kar</span>, 
                                a Computer Engineering Undergraduate based in Odisha, India. 
                                I am highly passionate about Machine Learning, Data Structures, and Web Development.
                            </motion.p>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed"
                            >
                                My journey in tech started with a curiosity to understand how intelligent systems make decisions. 
                                Currently, I am actively engaging with tech communities like the GDG on Campus and 
                                the Cyber Security Club at GIET University.
                            </motion.p>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="glass-card p-8 rounded-[2rem] border-l-8 border-l-cyan-500 italic relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
                                <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-medium relative z-10">
                                    "Whether it's training machine learning models or building robust full-stack web applications, 
                                    I enjoy combining logic with creative problem-solving to build solutions that have a real-world impact."
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <div className="glass-card relative p-10 rounded-[3rem] space-y-10 hover-glow transition-all duration-500">
                            <h3 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                                Quick Facts
                            </h3>

                            <div className="space-y-8">
                                {[
                                    { label: "Degree", value: "B.Tech Computer Engineering", icon: GraduationCap },
                                    { label: "University", value: "GIET University (2024 - 2028)", icon: Building2 },
                                    { label: "Location", value: data.location || "Odisha, India", icon: MapPin },
                                    { label: "Interests", value: "Open Source, Hackathons, AI", icon: Code2 }
                                ].map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={idx} className="flex gap-6 group/item">
                                            <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 group-hover/item:bg-cyan-500 group-hover/item:border-cyan-400 transition-all duration-500 shadow-xl group-hover/item:shadow-cyan-500/20">
                                                <Icon className="w-7 h-7 text-neutral-900 dark:text-white group-hover/item:text-white transition-colors" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs font-black tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">{item.label}</p>
                                                <p className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">{item.value}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                                <p className="text-neutral-400 dark:text-neutral-500 text-sm font-medium">
                                    Currently open to internships and collaborative projects in AI & Full-stack development.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
