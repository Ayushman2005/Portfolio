import React from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink, Code2, FolderGit2, Cpu } from 'lucide-react';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const getTechIcon = (techName) => {
    const icons = {
        'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
        'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        'scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
        'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
        'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
        'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
        'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
        'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
        'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
        'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg'
    };
    const key = Object.keys(icons).find(k => techName.toLowerCase().includes(k.toLowerCase()));
    return key ? icons[key] : null;
};

const ProjectCard = ({ project, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], !isMobile() ? ["10deg", "-10deg"] : ["0deg", "0deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], !isMobile() ? ["-10deg", "10deg"] : ["0deg", "0deg"]);

    function handleMouseMove(e) {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const mX = e.clientX - left;
        const mY = e.clientY - top;
        
        mouseX.set(mX);
        mouseY.set(mY);

        const xPct = (mX / width) - 0.5;
        const yPct = (mY / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';
    const imageUrl = project.image ? `${API_URL}/static/images/${project.image}` : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 12, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
            className="group relative h-full pointer-events-auto"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="glass-card relative rounded-[2.5rem] overflow-hidden transition-all duration-500 flex flex-col h-full hover-glow"
            >
                {/* Spotlight */}
                {!isMobile() && (
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100 z-50"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    400px circle at ${mouseX}px ${mouseY}px,
                                    rgba(6, 182, 212, 0.15),
                                    transparent 80%
                                )
                            `,
                        }}
                    />
                )}

                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    {imageUrl ? (
                        <>
                            <img 
                                src={imageUrl} 
                                alt={project.title} 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                                loading="lazy" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 transition-opacity" />
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                            <Code2 className="w-24 h-24 text-neutral-800" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10" />
                        </div>
                    )}

                    <div className="absolute top-6 right-6 z-20 flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                        {project.demo && project.demo !== '#' && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-2xl bg-cyan-500 border border-cyan-400 flex items-center justify-center text-white hover:scale-110 transition-all"
                            >
                                <ExternalLink className="w-6 h-6" />
                            </a>
                        )}
                    </div>
                </div>

                <div className="p-8 flex-1 flex flex-col relative z-20 pointer-events-none">
                    <h3 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white mb-3 md:mb-4 tracking-tight group-hover:text-cyan-500 transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-sm md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6 md:mb-8 flex-1 font-medium">
                        {project.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-neutral-200/50 dark:border-neutral-800/50">
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 5).map((tech, i) => {
                                const iconRes = getTechIcon(tech);
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 text-[10px] font-black tracking-[0.15em] text-cyan-500 bg-cyan-500/5 px-4 py-2 rounded-xl border border-cyan-500/10 group-hover:border-cyan-500/30 transition-colors"
                                    >
                                        {iconRes && <img src={iconRes} alt={tech} className="w-4 h-4 object-contain brightness-110" />}
                                        {tech.toUpperCase()}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Shifting Light Sweep */}
                <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-10 pointer-events-none"
                />
            </motion.div>
        </motion.div>
    );
};

const Projects = ({ projects }) => {
    return (
        <section id="projects" className="py-20 md:py-32 relative">
            <div className="absolute left-0 top-1/4 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-cyan-100/40 blur-[150px] md:blur-[200px] pointer-events-none rounded-full"></div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-[90rem] mx-auto"
            >
                <div className="flex flex-col items-center mb-12 md:mb-24 text-center px-4">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100, damping: 12 }}
                        className="w-12 h-12 md:w-16 md:h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm border border-cyan-200"
                    >
                        <Code2 className="w-5 h-5 md:w-8 md:h-8 text-cyan-600" />
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 pb-2 leading-tight">
                        Featured Projects
                    </h2>
                    <div className="w-16 md:w-32 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mt-4 md:mt-6 shadow-md"></div>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-6 md:mt-8 max-w-2xl text-base md:text-xl leading-relaxed">
                        A showcase of my recent work, highlighting my expertise in full-stack development, machine learning, and problem-solving.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
