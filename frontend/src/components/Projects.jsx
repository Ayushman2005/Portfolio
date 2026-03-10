import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
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
    const mobile = isMobile();

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        if (mobile) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
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
            className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-xl hover:shadow-[0_20px_40px_-20px_rgba(6,182,212,0.4)] flex flex-col h-full interactive w-full"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-50 hidden md:block"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.12),
              transparent 80%
            )
          `,
                }}
            />

            <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                {imageUrl ? (
                    <>
                        <img src={imageUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out z-0" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent z-10 w-full opacity-80 group-hover:opacity-40 transition-opacity"></div>
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-200/50 to-transparent z-10 w-full"></div>

                        <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-all duration-700 ease-out group-hover:scale-110 flex items-center justify-center pointer-events-none">
                            <div className="w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-100/50 via-white to-neutral-50 dark:to-neutral-950 flex items-center justify-center animate-[spin_40s_linear_infinite] group-hover:animate-[spin_20s_linear_infinite]">
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-8 opacity-20">
                                    {[...Array(16)].map((_, i) => (
                                        <Code2 key={i} className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-600" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            whileHover={{ scale: 1.2, opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center z-10 drop-shadow-md pointer-events-none transition-transform duration-700"
                        >
                            <FolderGit2 className="w-16 h-16 sm:w-24 sm:h-24 text-cyan-600/50 group-hover:text-cyan-600/70 transition-colors" />
                        </motion.div>
                    </>
                )}

                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex flex-row sm:flex-col gap-2 sm:gap-3 sm:translate-x-20 sm:group-hover:translate-x-0 transition-transform duration-500 sm:delay-100">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-neutral-900/95 backdrop-blur-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all shadow-md sm:shadow-xl hover:scale-110 active:scale-95 interactive"
                    >
                        <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    {project.demo && project.demo !== '#' && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-neutral-900/95 backdrop-blur-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all shadow-md sm:shadow-xl hover:scale-110 active:scale-95 interactive"
                        >
                            <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                    )}
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    whileHover={{ scale: 1.2, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center z-10 drop-shadow-md pointer-events-none transition-transform duration-700"
                >
                    <FolderGit2 className="w-16 h-16 sm:w-24 sm:h-24 text-cyan-600/50 group-hover:text-cyan-600/70 transition-colors" />
                </motion.div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col relative z-20 bg-white dark:bg-neutral-900">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mb-3 sm:mb-4 group-hover:text-cyan-600 transition-colors line-clamp-2">
                    {project.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 sm:mb-8 flex-1 text-base sm:text-lg">
                    {project.description}
                </p>

                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800/50">
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                        {project.technologies.slice(0, 5).map((tech, i) => {
                            const iconRes = getTechIcon(tech);
                            return (
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    key={i}
                                    className="flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide text-cyan-700 bg-cyan-50 px-2.5 sm:px-3 py-1.5 rounded-xl border border-cyan-200 shadow-sm whitespace-nowrap interactive cursor-default"
                                >
                                    {iconRes && <img src={iconRes} alt={tech} className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />}
                                    {!iconRes && <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-600/70" />}
                                    {tech}
                                </motion.div>
                            );
                        })}
                        {project.technologies.length > 5 && (
                            <div className="flex items-center text-xs sm:text-sm font-bold tracking-wide text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 sm:px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 whitespace-nowrap cursor-default">
                                +{project.technologies.length - 5}
                            </div>
                        )}
                    </div>
                </div>
            </div>
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
                className="relative z-10 w-full"
            >
                <div className="flex flex-col items-center mb-16 md:mb-24 text-center px-4">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100, damping: 12 }}
                        className="w-14 h-14 md:w-16 md:h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm border border-cyan-200"
                    >
                        <Code2 className="w-6 h-6 md:w-8 md:h-8 text-cyan-600" />
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 pb-2 leading-tight">
                        Featured Projects
                    </h2>
                    <div className="w-24 md:w-32 h-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mt-4 md:mt-6 shadow-md"></div>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-6 md:mt-8 max-w-2xl text-lg md:text-xl leading-relaxed">
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
