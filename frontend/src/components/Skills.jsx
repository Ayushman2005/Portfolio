import React from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code2, BrainCircuit, Layout, Wrench, Network, Cpu } from 'lucide-react';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const SkillCard = ({ category, delay }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
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
            className="group relative"
            onMouseMove={handleMouseMove}
        >
            <div className="glass-card relative z-10 p-8 rounded-[2.5rem] h-full flex flex-col hover-glow overflow-hidden">
                {/* Spotlight */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100 hidden lg:block"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                250px circle at ${mouseX}px ${mouseY}px,
                                rgba(6, 182, 212, 0.15),
                                transparent 80%
                            )
                        `,
                    }}
                />

                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6 md:mb-8 border border-neutral-200 dark:border-neutral-700 group-hover:scale-110 transition-transform duration-500">
                    {category.icon}
                </div>

                <h3 className="text-xl md:text-2xl font-black mb-6 text-neutral-900 dark:text-white tracking-tight">
                    {category.title}
                </h3>

                <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                    {category.skills.map((skill, i) => (
                        <motion.div
                            whileHover={!isMobile() ? { scale: 1.05, y: -2 } : {}}
                            key={i}
                            className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm text-neutral-700 dark:text-neutral-300 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm transition-all"
                        >
                            {skill.logo ? (
                                <img src={skill.logo} alt={skill.name} className="w-5 h-5 object-contain" />
                            ) : (
                                skill.fallbackIcon
                            )}
                            <span className="text-sm font-black">{skill.name}</span>
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
            title: "Programming",
            icon: <Code2 className="w-8 h-8 text-cyan-600" />,
            skills: [
                { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
                { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" }
            ],
        },
        {
            title: "Machine Learning",
            icon: <BrainCircuit className="w-8 h-8 text-blue-600" />,
            skills: [
                { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
                { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
                { name: "Scikit", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
                { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
                { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" }
            ],
        },
        {
            title: "Web Development",
            icon: <Layout className="w-8 h-8 text-purple-600" />,
            skills: [
                { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
                { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
                { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
                { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
                { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" }
            ],
        },
        {
            title: "Tools & Concepts",
            icon: <Wrench className="w-8 h-8 text-emerald-600" />,
            skills: [
                { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
                { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
                { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
                { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
                { name: "Data Structures", fallbackIcon: <Network className="w-5 h-5 text-neutral-600" /> },
                { name: "Algorithms", fallbackIcon: <Cpu className="w-5 h-5 text-neutral-600" /> }
            ],
        }
    ];

    return (
        <section id="skills" className="py-32 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>

            <div className="relative z-10 max-w-[90rem] mx-auto px-6">
                <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest text-xs md:text-sm mb-4"
                    >
                        ABILITIES
                    </motion.span>
                    <h2 className="text-3xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6">
                        Technical <span className="text-gradient">Arsenal</span>
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl text-base md:text-xl font-medium leading-relaxed">
                        A curated selection of technologies and tools I've mastered to build high-performance applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                    {categories.map((category, idx) => (
                        <SkillCard key={idx} category={category} delay={idx * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
