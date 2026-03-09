import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Trophy, Award, Target, Star, ShieldCheck } from 'lucide-react';

const AchievementCard = ({ title, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Assign a random icon based on index to make it visually interesting
    const icons = [Trophy, Award, Target, Star, ShieldCheck];
    const IconComponent = icons[index % icons.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            className="group relative bg-white rounded-3xl p-[1px] overflow-hidden interactive flex h-full shadow-lg hover:shadow-cyan-100/50 transition-shadow duration-500"
        >
            {/* Animated Gradient Border */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.4),
              transparent 80%
            )
          `,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0"></div>

            <div className="relative bg-white border border-neutral-100/50 rounded-[23px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 z-10 w-full hover:bg-white/95 backdrop-blur-sm transition-colors duration-300">
                <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-cyan-500 group-hover:text-white transition-colors duration-300" />
                </div>

                <div className="flex-1">
                    <h3 className="text-xl font-bold text-neutral-800 leading-snug group-hover:text-cyan-700 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-2 font-medium">Verified Achievement</p>
                </div>

                <div className="hidden lg:flex w-10 h-10 rounded-full bg-neutral-50 border border-neutral-200 items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
            </div>
        </motion.div>
    );
};

const Achievements = ({ achievements }) => {
    const defaultAchievements = achievements && achievements.length > 0 ? achievements.map(a => a.title) : [
        "Hackathon Participant - TechieDominators",
        "Active DSA practice on LeetCode",
        "Member of GDG on Campus, GIET University",
        "Member of Cyber Security Club, GIET University"
    ];

    return (
        <section id="achievements" className="py-20 md:py-32 relative overflow-hidden">
            {/* Abstract Backgrounds */}
            <div className="absolute -left-[20%] top-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-100/40 blur-[100px] md:blur-[150px] pointer-events-none rounded-full rotate-45 z-0"></div>
            <div className="absolute -right-[20%] bottom-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-100/40 blur-[100px] md:blur-[120px] pointer-events-none rounded-full -rotate-12 z-0"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8 border-b border-neutral-200/60 pb-6 md:pb-8"
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                            <div className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2 w-fit">
                                <Star className="w-3 h-3" /> Milestones
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 leading-tight">
                            Honors & Activities
                        </h2>
                    </div>
                    <p className="max-w-md text-neutral-500 font-medium text-lg text-left md:text-right">
                        A collection of hackathons, club memberships, and personal milestones in my tech journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {defaultAchievements.map((item, index) => (
                        <AchievementCard key={index} title={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
