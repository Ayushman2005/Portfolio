import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Trophy, Star, ChevronRight, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const accentColors = [
    { from: '#7c3aed', to: '#4f46e5', ring: 'rgba(124,58,237,0.18)' },
    { from: '#3b82f6', to: '#06b6d4', ring: 'rgba(59,130,246,0.18)' },
    { from: '#ec4899', to: '#f97316', ring: 'rgba(236,72,153,0.18)' },
    { from: '#10b981', to: '#06b6d4', ring: 'rgba(16,185,129,0.18)' },
    { from: '#f97316', to: '#eab308', ring: 'rgba(249,115,22,0.18)' },
    { from: '#8b5cf6', to: '#ec4899', ring: 'rgba(139,92,246,0.18)' },
];

const AchievementCard = ({ item, index }) => {
    const [hovered, setHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        if (isMobile()) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const accent = accentColors[index % accentColors.length];
    const spotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${accent.ring}, transparent 80%)`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: index * 0.08 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative h-full"
        >
            <div className="glass-card relative p-8 md:p-10 rounded-[2.5rem] overflow-hidden border border-transparent transition-all duration-500 bg-black/50 h-full flex flex-col group-hover:border-violet-200 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
                {/* Spotlight */}
                {!isMobile() && (
                    <motion.div
                        className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: spotlight }}
                    />
                )}

                {/* Corner gradient accent */}
                <div
                    className="absolute top-0 right-0 w-48 h-48 opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at top right, ${accent.from}, transparent 70%)`,
                        borderRadius: '0 2.5rem 0 100%'
                    }}
                />

                <div className="relative z-10 flex flex-col h-full gap-5">
                    {/* Top row: badge + meta */}
                    <div className="flex items-start gap-5">
                        {/* Emoji Badge */}
                        <motion.div
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 text-3xl shadow-xl border"
                            style={{
                                background: `linear-gradient(135deg, ${accent.from}18, ${accent.from}06)`,
                                borderColor: `${accent.from}30`
                            }}
                        >
                            {item.badge || '🏅'}
                        </motion.div>

                        <div className="flex-1 min-w-0">
                            {/* Issuer + Date */}
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span
                                    className="px-3 py-1 rounded-lg text-[9px] font-black tracking-[0.2em] uppercase border"
                                    style={{ color: accent.from, backgroundColor: `${accent.from}10`, borderColor: `${accent.from}20` }}
                                >
                                    {item.issuer || 'Certification'}
                                </span>
                                {item.date && (
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                        <Calendar className="w-3 h-3" />
                                        {item.date}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-lg md:text-xl font-black text-white leading-tight tracking-tight group-hover:text-violet-700 transition-colors">
                                {item.title}
                            </h3>
                        </div>

                        <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 flex-shrink-0">
                            <ChevronRight className="w-5 h-5 text-slate-300" style={{ color: hovered ? accent.from : undefined }} />
                        </div>
                    </div>

                    {/* Description */}
                    {item.description && (
                        <p className="text-sm text-slate-500 leading-relaxed font-medium flex-1">
                            {item.description}
                        </p>
                    )}

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-transparent mt-auto">
                            {item.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase bg-[#0a0a0a] text-neutral-500 border border-transparent group-hover:border-violet-100 group-hover:bg-violet-50/50 group-hover:text-violet-700 transition-colors"
                                >
                                    <Tag className="w-2.5 h-2.5" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Achievements = ({ achievements, summary = false }) => {
    const items = achievements && achievements.length > 0
        ? achievements
        : [
            { title: "Hackathon Participant – TechieDominators (PS-HK19)", badge: "🏆", issuer: "EduTech National Hackathon", date: "2026", description: "Reached the finals building NeuralNotes — an AI-powered, syllabus-aware doubt resolution system." },
            { title: "Active DSA Practice on LeetCode", badge: "💻", issuer: "LeetCode", date: "Ongoing", description: "Solved 50+ problems in arrays, DP, graphs, and system design." },
            { title: "GDG on Campus Member – GIET University", badge: "🚀", issuer: "Google Developer Groups", date: "2026", description: "Engaging in workshops, speaker sessions, and collaborative coding events." },
        ];

    const displayedItems = summary ? items.slice(0, 2) : items;

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
                        className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]"
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

            {/* Trophy stat row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-4 mb-16 max-w-2xl"
            >
                {[
                    { value: `${items.length}+`, label: "Milestones" },
                    { value: "50+", label: "LeetCode Problems" },
                    { value: "24h", label: "Hackathon Sprint" },
                ].map((stat, i) => (
                    <div key={i} className="glass-card rounded-2xl p-5 border border-transparent text-center">
                        <p className="text-3xl font-black text-violet-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
                        <p className="text-[10px] font-black tracking-widest uppercase text-slate-400 mt-1">{stat.label}</p>
                    </div>
                ))}
            </motion.div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                {displayedItems.map((item, idx) => (
                    <AchievementCard key={idx} item={item} index={idx} />
                ))}
            </div>

            {/* Bottom Accent */}
            {summary ? (
                <div className="mt-20 flex justify-center pb-8 border-none">
                    <Link to="/achievements" className="px-10 py-5 bg-violet-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-violet-700 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl">
                        View All Milestones
                    </Link>
                </div>
            ) : (
                <div className="mt-32 flex justify-center opacity-30">
                    <div className="w-[1px] h-32 bg-gradient-to-b from-slate-300 via-slate-100 to-transparent" />
                </div>
            )}
        </section>
    );
};

export default Achievements;
