import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink, Code2, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import KineticText from './KineticText';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const techIconMap = {
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
};

const getTechIcon = (name) => {
    const key = Object.keys(techIconMap).find(k => name.toLowerCase().includes(k.toLowerCase()));
    return key ? techIconMap[key] : null;
};

const gradients = [
    'from-violet-600/10 via-indigo-600/5 to-transparent',
    'from-indigo-600/10 via-blue-600/5 to-transparent',
    'from-pink-600/10 via-violet-600/5 to-transparent',
];

const ProjectCard = ({ project, index }) => {
    const [hovered, setHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const mxSpring = useSpring(mx, { stiffness: 100, damping: 20 });
    const mySpring = useSpring(my, { stiffness: 100, damping: 20 });
    const rotateX = useTransform(mySpring, [-0.5, 0.5], isMobile() ? ['0deg', '0deg'] : ['10deg', '-10deg']);
    const rotateY = useTransform(mxSpring, [-0.5, 0.5], isMobile() ? ['0deg', '0deg'] : ['-10deg', '10deg']);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
        mx.set((e.clientX - left) / width - 0.5);
        my.set((e.clientY - top) / height - 0.5);
    };
    const handleMouseLeave = () => { mx.set(0); my.set(0); };

    const spotlight = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(124,58,237,0.1), transparent 80%)`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{ perspective: 1200 }}
            className="group pointer-events-auto h-full"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="glass-card flex flex-col h-full"
            >
                {/* Spotlight layer */}
                {!isMobile() && (
                    <motion.div
                        className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: spotlight }}
                    />
                )}

                {/* Project image */}
                <div className={`relative h-56 sm:h-64 overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                    {project.image ? (
                        <>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out shadow-inner"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                        </>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Code2 className="w-24 h-24 text-violet-500/10" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/5 to-indigo-600/5" />
                        </div>
                    )}

                    {/* Left side badge */}
                    <div className="absolute top-6 left-6 z-20">
                        <span className="px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest text-violet-700 uppercase border border-transparent bg-black/40 backdrop-blur-md shadow-sm">
                            Case {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Action buttons */}
                    <div className="absolute top-6 right-6 z-20 flex gap-2.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-2xl bg-[#121212] shadow-xl border border-transparent flex items-center justify-center text-neutral-300 hover:text-violet-600 transition-all"
                            >
                                <Github className="w-5.5 h-5.5" />
                            </a>
                        )}
                        {project.demo && project.demo !== '#' && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-2xl bg-violet-600 shadow-xl border border-violet-500 flex items-center justify-center text-white transition-all hover:bg-violet-700"
                            >
                                <ExternalLink className="w-5.5 h-5.5" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex-1 flex flex-col relative z-20">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl md:text-3xl font-black text-white leading-tight group-hover:text-violet-600 transition-colors flex-1 mr-4"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {project.title}
                        </h3>
                        <div className="w-10 h-10 rounded-full border border-transparent flex items-center justify-center group-hover:border-violet-200 group-hover:bg-violet-50 transition-all shrink-0">
                            <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-violet-500 transition-all" />
                        </div>
                    </div>

                    {project.description && (
                        <p className="text-base text-slate-500 leading-relaxed mb-4 font-medium">
                            {project.description}
                        </p>
                    )}

                    <div className="space-y-4 mb-6 relative z-10">
                        {project.problem && (
                            <div>
                                <h4 className="text-[11px] font-black text-rose-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-rose-500"></span> Problem Statement
                                </h4>
                                <p className="text-sm text-slate-400 leading-relaxed">{project.problem}</p>
                            </div>
                        )}
                        {project.solution && (
                            <div>
                                <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-blue-500"></span> Solution
                                </h4>
                                <p className="text-sm text-slate-400 leading-relaxed">{project.solution}</p>
                            </div>
                        )}
                        {project.results && (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl mt-2">
                                <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Results & Impact
                                </h4>
                                <p className="text-sm text-emerald-100/90 leading-relaxed font-semibold">{project.results}</p>
                            </div>
                        )}
                        
                        {project.type && (
                            <div className="inline-block px-3 py-1 bg-violet-600/10 border border-violet-500/20 rounded-lg mt-2">
                                <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">{project.type}</span>
                            </div>
                        )}
                    </div>

                    {/* Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                        <ul className="mb-8 space-y-2">
                            {project.highlights.map((h, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06 }}
                                    className="flex items-start gap-2.5 text-[12px] text-slate-500 font-medium leading-snug"
                                >
                                    <span className="mt-[3px] w-4 h-4 rounded-md bg-violet-100 border border-violet-200 flex items-center justify-center flex-shrink-0">
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </span>
                                    {h}
                                </motion.li>
                            ))}
                        </ul>
                    )}

                    <div className="flex flex-wrap gap-2.5 pt-6 border-t border-transparent">
                        {project.technologies.slice(0, 5).map((tech, i) => {
                            const icon = getTechIcon(tech);
                            return (
                                <span
                                    key={i}
                                    className="flex items-center gap-2 text-[10px] font-black tracking-widest text-violet-700 bg-violet-50/80 px-4 py-1.5 rounded-xl border border-violet-100 group-hover:border-violet-200 transition-colors"
                                >
                                    {icon && <img src={icon} alt={tech} className="w-4 h-4 object-contain filter grayscale group-hover:grayscale-0 transition-all" />}
                                    {tech.toUpperCase()}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Projects = ({ projects, summary = false }) => {
    const displayedProjects = summary ? projects.slice(0, 2) : projects;

    return (
        <section id="projects" className="py-24 relative overflow-visible">
            {/* Header */}
            <div className="flex flex-col items-center mb-20 md:mb-32 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 text-[11px] font-black tracking-widest uppercase mb-8"
                >
                    <Code2 className="w-3.5 h-3.5" />
                    Featured Projects
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    <KineticText text="Curated" /> <br /> <KineticText text="Creations." delay={0.2} className="text-gradient" />
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.18 }}
                    className="text-slate-500 text-lg md:text-2xl font-medium leading-relaxed"
                >
                    Bridging AI complexity with seamless user experiences through engineering excellence.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
                {displayedProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>

            {/* View more link */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-20 flex justify-center"
            >
                {summary ? (
                    <Link
                        to="/projects"
                        className="group relative px-12 py-6 rounded-[2rem] bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5 hover:border-violet-500/30 transition-all duration-500 overflow-hidden shadow-2xl"
                    >
                        {/* Hover Aurora Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10 text-white font-black text-xs md:text-sm uppercase tracking-[0.4em] flex items-center gap-4">
                            View All Projects
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </span>
                    </Link>
                ) : (
                    <motion.a
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.96 }}
                        href="https://github.com/Ayushman2005"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-10 py-5 rounded-2xl glass-card border border-transparent text-neutral-300 font-black text-xs tracking-[0.2em] uppercase hover:bg-[#121212] hover:border-violet-300 transition-all shadow-xl"
                    >
                        <Github className="w-5 h-5 mr-1" />
                        GitHub Repository
                        <ArrowUpRight className="w-4 h-4 ml-1 text-violet-500" />
                    </motion.a>
                )}
            </motion.div>
        </section>
    );
};

export default Projects;
