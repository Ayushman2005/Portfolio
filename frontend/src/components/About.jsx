import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Heart, Coffee, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';

const BentoCard = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`glass-card p-6 md:p-8 flex flex-col ${className}`}
    >
        {children}
    </motion.div>
);

const About = ({ data, summary = false }) => {
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
                    className="text-5xl md:text-7xl font-black text-white tracking-tighter"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    Deep Dive <span className="text-gradient">About Me.</span>
                </motion.h2>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(200px,auto)]">
                
                {/* Main Bio - Large Card */}
                <BentoCard className="md:col-span-8 md:row-span-2 justify-center">
                    <h3 className="text-3xl md:text-4xl font-black mb-8 text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Architecting Intelligent <br />Digital Solutions.
                    </h3>
                    <div className="space-y-6 text-neutral-500 text-lg md:text-xl leading-relaxed font-medium">
                        <p>
                            I'm an undergraduate student at <span className="text-violet-600 font-bold">GIET University</span>, 
                            specializing in Computer Engineering. My journey began with a persistent curiosity about the inner workings of web applications, 
                            which has organically grown into a profound focus on the intersection of 
                            <span className="text-indigo-600 font-bold"> artificial intelligence</span> and scalable software architecture.
                        </p>
                        <p>
                            As a passionate developer, I've cultivated specialized skills bridging the gap between elegant frontend experiences and robust backend logic. I regularly employ tools like React, powerful motion libraries, and modern Node or Python ecosystems to bring comprehensive projects to life.
                        </p>
                        <p>
                            I inherently thrive on dissecting complex real-world challenges—whether it's engineering a smart, syllabus-aware AI assistant that effectively mitigates hallucinations or architecting comprehensive community management platforms that scale autonomously. My core objective is building highly functional technology that is equally beautiful to use, fundamentally driving impact and pushing boundaries.
                        </p>
                    </div>
                </BentoCard>

                {/* Education Card */}
                <BentoCard className="md:col-span-4 justify-between group" delay={0.1}>
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                        <GraduationCap className="w-7 h-7" />
                    </div>
                    <div className="space-y-4">
                        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Education</p>

                        <div className="border-l-2 border-indigo-200 pl-4 space-y-1">
                            <p className="text-sm font-black text-white leading-tight">B.Tech — Computer Science</p>
                            <p className="text-xs font-bold text-violet-500">GIET University &bull; 2024 – 2028</p>
                        </div>

                        <div className="border-l-2 border-transparent pl-4 space-y-1">
                            <p className="text-sm font-black text-white leading-tight">Class 12th (PCM)</p>
                            <p className="text-xs font-bold text-slate-400">Kendriya Vidyalaya Bargarh &bull; 2024</p>
                        </div>

                        <div className="border-l-2 border-transparent pl-4 space-y-1">
                            <p className="text-sm font-black text-white leading-tight">Class 10th</p>
                            <p className="text-xs font-bold text-slate-400">Kendriya Vidyalaya Bargarh &bull; 2022</p>
                        </div>
                    </div>
                </BentoCard>

                {/* Location Card */}
                <BentoCard className="md:col-span-4 justify-between group" delay={0.2}>
                    <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500 shadow-sm">
                        <MapPin className="w-7 h-7" />
                    </div>
                    <div className="space-y-3">
                        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Location</p>

                        <div className="border-l-2 border-violet-200 pl-4 space-y-0.5">
                            <p className="text-sm font-black text-white">Bargarh, Odisha</p>
                            <p className="text-xs font-bold text-slate-400">Hometown · 768028, India</p>
                        </div>

                        <div className="border-l-2 border-transparent pl-4 space-y-0.5">
                            <p className="text-sm font-black text-white">Gunupur, Odisha</p>
                            <p className="text-xs font-bold text-slate-400">Current · 765022, India</p>
                        </div>
                    </div>
                </BentoCard>

                {/* Passion Card - Small */}
                <BentoCard className="md:col-span-4 group" delay={0.3}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all shadow-sm">
                            <Heart className="w-6 h-6" />
                        </div>
                        <p className="text-lg font-black text-white uppercase tracking-tighter">Interests</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        {["Machine Learning", "Cybersecurity", "Web Development", "Arificial Intelligence"].map((item, i) => (
                            <span key={i} className="px-4 py-2 bg-[#121212]/5 rounded-xl text-[11px] font-black text-neutral-500 uppercase tracking-wide">
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
                       <p className="text-xl italic font-bold text-neutral-300 leading-relaxed relative z-10">
                           Code is the medium through which I translate complex ideas into impactful realities.
                       </p>
                   </div>
                </BentoCard>

                {/* Stats Card */}
                <BentoCard className="md:col-span-4 group" delay={0.5}>
                    <div className="grid grid-cols-2 gap-6 h-full">
                        <div className="text-center p-6 rounded-[2rem] bg-[#0a0a0a] flex flex-col justify-center border border-transparent shadow-inner">
                            <p className="text-4xl font-black text-gradient">03+</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Projects</p>
                        </div>
                        <div className="text-center p-6 rounded-[2rem] bg-[#0a0a0a] flex flex-col justify-center border border-transparent shadow-inner">
                            <p className="text-4xl font-black text-gradient">02+</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Impact</p>
                        </div>
                    </div>
                </BentoCard>

                {/* Core Principles Matrix */}
                {!summary && (
                    <BentoCard className="md:col-span-12 group !p-6 md:!p-8" delay={0.55}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h4 className="text-2xl font-black text-white tracking-tighter">My Core Principles</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-[2rem] bg-[#0a0a0a] border border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <p className="text-[10px] font-black tracking-widest text-violet-500 uppercase mb-3 text-center">Engineering</p>
                                <h5 className="font-bold text-white mb-2 text-center text-lg">Scalability First</h5>
                                <p className="text-sm text-neutral-500 text-center font-medium leading-relaxed">Designing clean, reusable, and modern architectures that are fully prepared to grow gracefully and dynamically alongside the user base.</p>
                            </div>
                            <div className="p-6 rounded-[2rem] bg-[#0a0a0a] border border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <p className="text-[10px] font-black tracking-widest text-pink-500 uppercase mb-3 text-center">Innovation</p>
                                <h5 className="font-bold text-white mb-2 text-center text-lg">Continuous Learning</h5>
                                <p className="text-sm text-neutral-500 text-center font-medium leading-relaxed">Persistently researching and rapidly implementing the absolute cutting-edge in machine learning advancements and responsive web technologies.</p>
                            </div>
                            <div className="p-6 rounded-[2rem] bg-[#0a0a0a] border border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <p className="text-[10px] font-black tracking-widest text-indigo-500 uppercase mb-3 text-center">Experience</p>
                                <h5 className="font-bold text-white mb-2 text-center text-lg">User-Centric Empathy</h5>
                                <p className="text-sm text-neutral-500 text-center font-medium leading-relaxed">Fostering intense dedication towards ensuring every technical deployment acts seamlessly, intuitively, and beautifully for the end user.</p>
                            </div>
                        </div>
                    </BentoCard>
                )}

                {/* Life & Moments Carousel */}
                {!summary && (
                    <BentoCard className="md:col-span-12 !p-2 md:!p-4 bg-slate-900/5 group" delay={0.6}>
                        <div className="w-full flex items-center justify-between px-4 md:px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shadow-sm">
                                    <Heart className="w-6 h-6 text-violet-600" />
                                </div>
                                <p className="text-lg md:text-xl font-black text-white tracking-tighter">My Life & Moments</p>
                            </div>
                            <div className="px-4 py-2 bg-slate-900 rounded-full">
                                <span className="text-[10px] font-black tracking-widest text-white uppercase flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-violet-400" /> Moments
                                </span>
                            </div>
                        </div>
                        <div className="mt-2 text-white">
                            <ImageCarousel />
                        </div>
                    </BentoCard>
                )}

                {/* Summary read more button */}
                {summary && (
                    <div className="md:col-span-12 flex justify-center mt-6">
                        <Link to="/about" className="group relative px-12 py-6 rounded-[2rem] bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5 hover:border-violet-500/30 transition-all duration-500 overflow-hidden shadow-2xl">
                            {/* Hover Aurora Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 text-white font-black text-xs md:text-sm uppercase tracking-[0.4em] flex items-center gap-4">
                                Read Full Biography
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                            </span>
                        </Link>
                    </div>
                )}

            </div>
        </section>
    );
};

export default About;
