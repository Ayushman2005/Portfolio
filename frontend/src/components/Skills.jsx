import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Code2, BrainCircuit, Layout, Zap, ShieldCheck } from 'lucide-react';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const SkillCard = ({ category, delay }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        if (isMobile()) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
            className="group relative h-full"
            onMouseMove={handleMouseMove}
        >
            <div className="glass-card relative z-10 p-8 rounded-[2.5rem] h-full flex flex-col hover-glow overflow-hidden border border-slate-200 transition-all duration-500 bg-white/60">
                {/* Spotlight */}
                {!isMobile() && (
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    350px circle at ${mouseX}px ${mouseY}px,
                                    rgba(124, 58, 237, 0.12),
                                    transparent 80%
                                )
                            `,
                        }}
                    />
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 shadow-xl border border-white/40 bg-gradient-to-br ${category.gradient} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <category.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-black mb-6 text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {category.title}
                </h3>

                <div className="flex flex-wrap gap-2.5 mt-auto">
                    {category.skills.map((skill, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -3, scale: 1.05 }}
                            className="flex items-center gap-2.5 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl border border-slate-200/50 text-[11px] font-black tracking-widest uppercase transition-all hover:bg-white hover:text-violet-600 hover:border-violet-200 hover:shadow-md"
                        >
                            {skill.logo ? (
                                <img src={skill.logo} alt={skill.name} className="w-4 h-4 object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                            ) : (
                                <Zap className="w-3.5 h-3.5 fill-violet-500 text-violet-500" />
                            )}
                            {skill.name}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const categories = [
        {
            title: "Core Programming",
            icon: Code2,
            gradient: "from-violet-500 to-indigo-600",
            skills: [
                { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
                { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
                { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
            ],
        },
        {
            title: "Intelligence & ML",
            icon: BrainCircuit,
            gradient: "from-blue-500 to-cyan-600",
            skills: [
                { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
                { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
                { name: "Scikit-Learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
                { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
            ],
        },
        {
            title: "Full Stack Dev",
            icon: Layout,
            gradient: "from-violet-500 to-indigo-600",
            skills: [
                { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
                { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
                { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
            ],
        },
        {
            title: "Dev & Security",
            icon: ShieldCheck,
            gradient: "from-emerald-500 to-teal-600",
            skills: [
                { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
                { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
                { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
                { name: "Scapy", logo: null },
            ],
        }
    ];

    return (
        <section id="skills" className="py-24 relative overflow-visible">
            {/* Header */}
            <div className="flex flex-col items-center mb-12 md:mb-32 text-center max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-700 text-[11px] font-black tracking-widest uppercase mb-8"
                >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    Technical Arsenal
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    Mastery & <span className="text-gradient">Versatility.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed"
                >
                    Engineered for high performance, intelligence, and robust security across the stack.
                </motion.p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((cat, idx) => (
                    <SkillCard key={idx} category={cat} delay={idx * 0.1} />
                ))}
            </div>
            
            {/* Scroll hint line */}
            <div className="mt-24 flex justify-center">
                <div className="w-[2px] h-24 bg-gradient-to-b from-violet-500/40 via-violet-500/10 to-transparent rounded-full shadow-sm" />
            </div>
        </section>
    );
};

export default Skills;
