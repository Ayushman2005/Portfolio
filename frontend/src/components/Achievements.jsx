import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Trophy, Award, Target, Star, ShieldCheck, Zap, ChevronRight } from 'lucide-react';

const icons = [Trophy, Award, Target, Star, ShieldCheck, Zap];
const iconColors = ['#7c3aed', '#4f46e5', '#ec4899', '#f97316', '#10b981', '#06b6d4'];

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const AchievementCard = ({ title, index }) => {
    const [hovered, setHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        if (isMobile()) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const Icon = icons[index % icons.length];
    const color = iconColors[index % iconColors.length];

    const spotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${color}12, transparent 80%)`;

    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative h-full"
        >
            <div className="glass-card relative p-8 md:p-10 rounded-[2.5rem] overflow-hidden border border-slate-200 transition-all duration-500 bg-white/60 hover-glow group-hover:border-violet-200 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
                {/* Spotlight */}
                {!isMobile() && (
                    <motion.div
                        className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: spotlight }}
                    />
                )}

                {/* Corner accent */}
                <div 
                    className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
                    style={{ 
                        background: `radial-gradient(circle at top right, ${color}, transparent 70%)`,
                        borderRadius: '0 0 0 100%'
                    }}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                    {/* Icon Box */}
                    <motion.div
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 shadow-2xl transition-all duration-500 border"
                        style={{ 
                            background: `linear-gradient(135deg, ${color}20, ${color}05)`, 
                            borderColor: `${color}30` 
                        }}
                    >
                        <Icon className="w-10 h-10" style={{ color }} />
                    </motion.div>

                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                            <span 
                                className="px-3 py-1 rounded-lg text-[9px] font-black tracking-[0.2em] uppercase border"
                                style={{ color, backgroundColor: `${color}10`, borderColor: `${color}20` }}
                            >
                                Recognition {String(index + 1).padStart(2, '0')}
                            </span>
                            <div className="h-[1px] flex-1 bg-slate-100 group-hover:bg-violet-100 transition-colors" />
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-violet-700 transition-colors">
                            {title}
                        </h3>
                    </div>

                    <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <ChevronRight className="w-6 h-6 text-slate-300" style={{ color: hovered ? color : undefined }} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Achievements = ({ achievements }) => {
    const items = achievements && achievements.length > 0
        ? achievements.map(a => a.title)
        : [
            "Hackathon Participant – TechieDominators (PS-HK19)",
            "Active DSA Practice on LeetCode",
            "GDG on Campus Member – GIET University",
            "Cyber Security Club Member – GIET University",
        ];

    return (
        <section id="achievements" className="py-24 relative overflow-visible">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 gap-10">
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-700 text-[11px] font-black tracking-widest uppercase"
                    >
                        <Star className="w-4 h-4 fill-current" />
                        Milestones & Impact
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Honors & <br /> <span className="text-gradient">Distinctions.</span>
                    </motion.h2>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-md text-lg md:text-xl text-slate-500 font-medium leading-relaxed"
                >
                    Celebrating competitive achievements, community leadership, and certifications that define my growth.
                </motion.p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                {items.map((item, idx) => (
                    <AchievementCard key={idx} title={item} index={idx} />
                ))}
            </div>

            {/* Bottom Accent */}
            <div className="mt-32 flex justify-center opacity-30">
                <div className="w-[1px] h-32 bg-gradient-to-b from-slate-300 via-slate-100 to-transparent" />
            </div>
        </section>
    );
};

export default Achievements;
