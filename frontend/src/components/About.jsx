import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Heart, Coffee, Sparkles } from 'lucide-react';

const BentoCard = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`glass-card p-6 md:p-8 rounded-[2.5rem] border border-slate-200 hover-glow transition-all duration-500 bg-white/50 flex flex-col ${className}`}
    >
        {children}
    </motion.div>
);

const About = ({ data }) => {
    const containerRef = useRef(null);

    return (
        <section id="about" className="py-24 relative overflow-visible" ref={containerRef}>
            {/* Header */}
            <div className="flex flex-col items-center mb-12 md:mb-32 text-center max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-700 text-[11px] font-black tracking-widest uppercase"
                >
                    <Sparkles className="w-3 h-3 fill-current" />
                    Evolution
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    Deep Dive <span className="text-gradient">About Me.</span>
                </motion.h2>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(200px,auto)]">
                
                {/* Main Bio - Large Card */}
                <BentoCard className="md:col-span-8 md:row-span-2 justify-center">
                    <h3 className="text-3xl md:text-4xl font-black mb-8 text-slate-900 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Architecting Intelligent <br />Digital Solutions.
                    </h3>
                    <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                        <p>
                            I'm an undergraduate student at <span className="text-violet-600 font-bold">GIET University</span>, 
                            specializing in Computer Engineering. My passion lies at the intersection of 
                            <span className="text-indigo-600 font-bold"> machine learning</span> and scalable software architecture.
                        </p>
                        <p>
                            I thrive on solving complex problems, from building syllabus-aware AI assistants that 
                            eliminate hallucinations to engineering robust community management platforms.
                        </p>
                    </div>
                </BentoCard>

                {/* Education Card */}
                <BentoCard className="md:col-span-4 justify-between group" delay={0.1}>
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                        <GraduationCap className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Education</p>
                        <p className="text-lg font-black text-slate-900 leading-tight">B.Tech - Computer Science</p>
                        <p className="text-sm font-bold text-slate-500 mt-1">GIET University, 2024 - 2028</p>
                    </div>
                </BentoCard>

                {/* Location Card */}
                <BentoCard className="md:col-span-4 justify-between group" delay={0.2}>
                    <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500 shadow-sm">
                        <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Location</p>
                        <p className="text-lg font-black text-slate-900">{data.location || "Odisha, India"}</p>
                    </div>
                </BentoCard>

                {/* Passion Card - Small */}
                <BentoCard className="md:col-span-4 group" delay={0.3}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all shadow-sm">
                            <Heart className="w-6 h-6" />
                        </div>
                        <p className="text-lg font-black text-slate-900 uppercase tracking-tighter">Interests</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        {["Machine Learning", "Cybersecurity", "Web Development", "Arificial Intelligence"].map((item, i) => (
                            <span key={i} className="px-4 py-2 bg-slate-100 rounded-xl text-[11px] font-black text-slate-600 uppercase tracking-wide">
                                {item}
                            </span>
                        ))}
                    </div>
                </BentoCard>

                {/* Quote / Philosophy Card - Middle */}
                <BentoCard className="md:col-span-4 md:row-span-1 bg-gradient-to-br from-violet-600/5 to-transparent border-violet-100" delay={0.4}>
                   <Coffee className="w-10 h-10 text-violet-500 mb-8" />
                   <div className="relative">
                       <span className="absolute -top-6 -left-2 text-6xl text-violet-500/20 font-serif">"</span>
                       <p className="text-xl italic font-bold text-slate-800 leading-relaxed relative z-10">
                           Code is the medium through which I translate complex ideas into impactful realities.
                       </p>
                   </div>
                </BentoCard>

                {/* Stats Card */}
                <BentoCard className="md:col-span-4 group" delay={0.5}>
                    <div className="grid grid-cols-2 gap-6 h-full">
                        <div className="text-center p-6 rounded-[2rem] bg-slate-50 flex flex-col justify-center border border-slate-100 shadow-inner">
                            <p className="text-4xl font-black text-gradient">03+</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Projects</p>
                        </div>
                        <div className="text-center p-6 rounded-[2rem] bg-slate-50 flex flex-col justify-center border border-slate-100 shadow-inner">
                            <p className="text-4xl font-black text-gradient">02+</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Impact</p>
                        </div>
                    </div>
                </BentoCard>

            </div>
        </section>
    );
};

export default About;
