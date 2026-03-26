import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Briefcase, Building2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Experience = ({ experience, summary = false }) => {
    const displayedExperience = summary ? experience.slice(0, 2) : experience;
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end end"]
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 28,
        restDelta: 0.001
    });

    return (
        <section id="experience" className="py-24 relative overflow-visible" ref={ref}>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
            >
                {/* Header */}
                <div className="flex flex-col items-start mb-12 md:mb-32 space-y-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 text-[11px] font-black tracking-widest uppercase"
                    >
                        <Briefcase className="w-3.5 h-3.5" />
                        Professional Journey
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Career <br /> <span className="text-gradient">Evolution.</span>
                    </motion.h2>
                </div>

                {/* Timeline */}
                <div className="relative max-w-5xl mx-auto pl-4 md:pl-0">
                    {/* Animated vertical line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2">
                        {/* Background track */}
                        <div className="absolute inset-0 bg-[#121212]/5 rounded-full" />
                        {/* Progress fill */}
                        <motion.div
                            className="absolute top-0 left-0 right-0 rounded-full origin-top"
                            style={{
                                scaleY: pathLength,
                                background: 'linear-gradient(180deg, #7c3aed, #4f46e5, #ec4899)',
                                height: '100%'
                            }}
                        />
                    </div>

                    <div className="space-y-20 md:space-y-32">
                        {displayedExperience.map((job, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ type: "spring", stiffness: 80, damping: 18, delay: idx * 0.1 }}
                                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Center marker */}
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        className="absolute left-6 md:left-1/2 -translate-x-1/2 z-30 w-16 h-16 rounded-[1.5rem] border-[4px] border-transparent bg-[#121212] shadow-[0_15px_35px_-5px_rgba(124,58,237,0.3)] flex items-center justify-center flex-shrink-0"
                                    >
                                        <div className="w-10 h-10 rounded-2xl bg-violet-600 flex items-center justify-center text-white shadow-inner">
                                            <Briefcase className="w-5 h-5" />
                                        </div>
                                    </motion.div>

                                    {/* Spacer for other side on desktop */}
                                    <div className="hidden md:block w-[calc(50%-4rem)]" />

                                    {/* Card Container */}
                                    <div className={`w-full md:w-[calc(50%-4rem)] pl-24 md:pl-0`}>
                                        <motion.div
                                            whileHover={{ y: -8, x: isEven ? -4 : 4 }}
                                            className="glass-card p-8 md:p-12 rounded-[2.5rem] hover-glow border border-transparent bg-black/50 transition-all duration-500 group relative shadow-xl"
                                        >
                                            {/* Side connector for desktop */}
                                            <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-[2px] bg-[#121212]/5 ${isEven ? '-right-8' : '-left-8'}`} />

                                            {/* Period Badge */}
                                            <div className="inline-flex items-center gap-2.5 text-[10px] font-black tracking-widest text-violet-700 bg-violet-50 px-4 py-2 rounded-xl border border-violet-100 mb-8 shadow-sm">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {job.period.toUpperCase()}
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-violet-600 transition-colors"
                                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                                {job.title}
                                            </h3>

                                            <div className="flex items-center gap-3 mb-6 bg-[#0a0a0a] w-fit px-4 py-2 rounded-xl border border-transparent">
                                                <Building2 className="w-4 h-4 text-indigo-500" />
                                                <span className="text-base font-black text-neutral-400 uppercase tracking-wide">{job.company}</span>
                                            </div>

                                            <p className="text-base md:text-lg text-neutral-500 font-medium leading-relaxed mb-6">
                                                {job.description}
                                            </p>

                                            <div className="flex items-center gap-2 text-xs font-black text-violet-500 group-hover:gap-4 transition-all uppercase tracking-widest">
                                                View Details <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {summary && (
                        <div className="mt-20 flex justify-center pb-8">
                            <Link to="/experience" className="px-10 py-5 bg-violet-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-violet-700 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl">
                                Full Work History
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default Experience;
