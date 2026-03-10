import React from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code2, BrainCircuit, Layout, Wrench, Network, Cpu } from 'lucide-react';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const SkillCard = ({ category, delay }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const mobile = isMobile();

    const handleMouseMove = (e) => {
        if (mobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        if (mobile) return;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: delay }}
            style={{ perspective: 1200 }}
            className="h-full interactive"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="relative group bg-white dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 rounded-3xl p-8 shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.3)] transition-shadow duration-300 h-full flex flex-col z-10"
            >
                {/* Floating Icon with 3D transform */}
                <motion.div
                    style={{ translateZ: 50 }}
                    className="w-16 h-16 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:bg-cyan-50 group-hover:border-cyan-200 transition-colors duration-300 relative"
                >
                    {category.icon}
                </motion.div>

                <motion.h3 style={{ translateZ: 30 }} className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-4">
                    {category.title}
                </motion.h3>

                <motion.div style={{ translateZ: 20 }} className="flex flex-wrap gap-3 mt-auto">
                    {category.skills.map((skill, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-2 bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-cyan-400 hover:text-cyan-700 hover:bg-white dark:bg-neutral-900 hover:shadow-md hover:-translate-y-1 transition-all cursor-default"
                        >
                            {skill.logo ? (
                                <img src={skill.logo} alt={skill.name} className="w-5 h-5 object-contain" />
                            ) : (
                                skill.fallbackIcon
                            )}
                            <span className="text-sm font-bold">{skill.name}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const Skills = () => {
    const categories = [
        {
            title: "Programming",
            icon: <Code2 className="w-8 h-8 text-cyan-600 relative z-10" />,
            skills: [
                { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
                { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" }
            ],
        },
        {
            title: "Machine Learning",
            icon: <BrainCircuit className="w-8 h-8 text-cyan-600 relative z-10" />,
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
            icon: <Layout className="w-8 h-8 text-cyan-600 relative z-10" />,
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
            icon: <Wrench className="w-8 h-8 text-cyan-600 relative z-10" />,
            skills: [
                { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
                { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
                { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
                { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
                { name: "Data Structures", fallbackIcon: <Network className="w-5 h-5 text-cyan-600/80" /> },
                { name: "Algorithms", fallbackIcon: <Cpu className="w-5 h-5 text-cyan-600/80" /> }
            ],
        }
    ];

    return (
        <section id="skills" className="py-20 md:py-32 relative">
            <div className="absolute top-1/2 left-0 w-full h-[400px] md:h-[600px] bg-blue-100/40 blur-[100px] md:blur-[150px] -translate-y-1/2 pointer-events-none rounded-full"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center mb-16 md:mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-tr from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm border border-cyan-200"
                    >
                        <BrainCircuit className="w-6 h-6 md:w-8 md:h-8 text-cyan-600" />
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-500 pb-2 leading-tight">
                        Technical Arsenal
                    </h2>
                    <div className="w-24 md:w-32 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-4 md:mt-6 shadow-md mx-auto"></div>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-6 md:mt-8 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
                        A diverse toolkit built for solving complex problems, from intelligent machine learning models to scalable web interfaces.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-10">
                    {categories.map((category, idx) => (
                        <SkillCard key={idx} category={category} delay={idx * 0.15} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
