import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Trophy, Award, Target, Star, ShieldCheck } from 'lucide-react';

const AchievementCard = ({ title, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const isMobile = () =>
        typeof window !== 'undefined' &&
        (window.matchMedia('(max-width: 768px)').matches ||
            /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        if (isMobile()) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const icons = [Trophy, Award, Target, Star, ShieldCheck];
    const IconComponent = icons[index % icons.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            className="glass-card relative p-8 rounded-[2.5rem] overflow-hidden group transition-all duration-500"
        >
            {!isMobile() && (
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                400px circle at ${mouseX}px ${mouseY}px,
                                rgba(6, 182, 212, 0.1),
                                transparent 80%
                            )
                        `,
                    }}
                />
            )}

            <div className="relative z-10 flex items-center gap-8">
                <div className="w-20 h-20 rounded-2xl bg-neutral-900 dark:bg-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                    <IconComponent className="w-10 h-10 text-white dark:text-neutral-900" />
                </div>

                <div className="space-y-2">
                    <p className="text-[10px] font-black tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
                        ACHIEVEMENT {index + 1}
                    </p>
                    <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
                        {title}
                    </h3>
                </div>
            </div>
        </motion.div>
    );
};

const Achievements = ({ achievements }) => {
    const defaultAchievements = achievements && achievements.length > 0 ? achievements.map(a => a.title) : [
        "Hackathon Participant - TechieDominators",
        "Active DSA practice on LeetCode",
        "Participant of GDG on Campus, GIET University",
        "Participant of Cyber Security Club, GIET University"
    ];

    return (
        <section id="achievements" className="py-32 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[90rem] mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
                    <div className="space-y-4">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest text-sm uppercase"
                        >
                            RECOGNITIONS
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-7xl font-black text-neutral-900 dark:text-white tracking-tighter"
                        >
                            Honors & <span className="text-gradient">Activities.</span>
                        </motion.h2>
                    </div>
                    <motion.p 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-md text-base md:text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed"
                    >
                        A collection of hackathons, club memberships, and personal milestones in my tech journey.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {defaultAchievements.map((item, index) => (
                        <AchievementCard key={index} title={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
