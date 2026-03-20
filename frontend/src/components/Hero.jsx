import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Sparkles } from 'lucide-react';

const Magnetic = ({ children }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
};

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const Hero = ({ data }) => {
    const roles = ["Machine Learning Engineer.", "Full Stack Developer.", "Problem Solver.", "AI Enthusiast."];
    const [currentRole, setCurrentRole] = React.useState(0);
    const [typedText, setTypedText] = React.useState('');
    const [isDeleting, setIsDeleting] = React.useState(false);

    const { scrollY } = useScroll();
    const smoothY = useSpring(scrollY, { stiffness: 80, damping: 25 });
    const y1 = useTransform(smoothY, [0, 600], [0, 100]);
    const opacity = useTransform(smoothY, [0, 500, 800], [1, 0.8, 0]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mxSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const mySpring = useSpring(mouseY, { stiffness: 100, damping: 30 });
    
    // Convert relative mouse coords to slight rotations
    const rotateX = useTransform(mySpring, [0, 800], [12, -12]);
    const rotateY = useTransform(mxSpring, [0, 1200], [-12, 12]);

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const spotlight = useMotionTemplate`radial-gradient(1200px circle at ${mouseX}px ${mouseY}px, rgba(124,58,237,0.08), transparent 80%)`;

    React.useEffect(() => {
        let timeout;
        const typeSpeed = isDeleting ? 35 : 90;

        if (!isDeleting && typedText === roles[currentRole]) {
            timeout = setTimeout(() => setIsDeleting(true), 2800);
        } else if (isDeleting && typedText === '') {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
        } else {
            const full = roles[currentRole];
            timeout = setTimeout(() => {
                setTypedText(full.substring(0, typedText.length + (isDeleting ? -1 : 1)));
            }, typeSpeed);
        }

        return () => clearTimeout(timeout);
    }, [typedText, isDeleting, currentRole]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 14 } }
    };

    return (
        <section
            id="hero"
            onMouseMove={handleMouseMove}
            className="min-h-screen flex flex-col lg:flex-row items-center justify-between relative overflow-visible py-20 gap-16 pointer-events-none"
        >
            {/* Spotlight */}
            {!isMobile() && (
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ background: spotlight }}
                />
            )}

            {/* Animated blobs - more prominent in light mode */}
            <div className="absolute top-1/4 -left-32 w-[800px] h-[800px] bg-violet-400/10 blur-[180px] rounded-full animate-blob pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-[800px] h-[800px] bg-indigo-400/8 blur-[180px] rounded-full animate-blob animation-delay-4000 pointer-events-none" />

            {/* Left Text Content */}
            <motion.div
                style={{ y: y1, opacity }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-10 relative z-10 w-full lg:max-w-[55%] pointer-events-auto"
            >
                {/* Status badge */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-white/40 text-violet-700 text-[10px] font-black tracking-widest uppercase shadow-lg"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                    </span>
                    Available for Work
                </motion.div>

                {/* Name */}
                <motion.div variants={itemVariants} className="space-y-2">
                    <div className="text-xs font-black text-slate-400 tracking-[0.3em] uppercase mb-4">
                        Hi, my name is
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-9xl font-black tracking-tighter text-slate-900 leading-[0.95] md:leading-[0.9]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {data.name.split(' ').map((word, i, arr) => (
                            <span key={i} className={`block ${i === arr.length - 1 ? 'text-gradient' : ''}`}>
                                {word}
                            </span>
                        ))}
                    </h1>
                </motion.div>

                {/* Typewriter role */}
                <motion.div variants={itemVariants} className="flex items-center gap-4 h-10">
                    <div className="h-[3px] w-12 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full flex-shrink-0" />
                    <p className="text-xl md:text-3xl font-bold text-slate-500">
                        <span className="text-slate-900">{typedText}</span>
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.75 }}
                            className="inline-block w-[3px] h-[0.85em] bg-violet-600 ml-1 align-middle"
                        />
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-5 pt-2">
                    <Magnetic>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            href="#projects"
                            className="btn-primary group flex items-center gap-3 px-10 py-5 font-black text-sm tracking-widest uppercase rounded-2xl"
                        >
                            View My Work
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </motion.a>
                    </Magnetic>

                    <Magnetic>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            href="/Resume.pdf"
                            target="_blank"
                            className="group flex items-center gap-3 px-10 py-5 glass-card text-slate-900 font-black text-sm tracking-widest uppercase rounded-2xl border border-slate-200 hover:border-violet-300 transition-all shadow-xl"
                        >
                            Resume ↗
                        </motion.a>
                    </Magnetic>
                </motion.div>

                {/* Social links */}
                <motion.div variants={itemVariants} className="flex items-center gap-6 pt-6">
                    <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">Connect</span>
                    <div className="h-[1px] w-12 bg-slate-200" />
                    <div className="flex gap-4">
                        {[
                            { href: data.github, icon: Github, label: 'GitHub' },
                            { href: data.linkedin, icon: Linkedin, label: 'LinkedIn' },
                        ].map(({ href, icon: Icon, label }) => (
                            <Magnetic key={label}>
                                <motion.a
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-12 h-12 rounded-2xl glass-card border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-300 transition-all shadow-lg"
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            </Magnetic>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Right Visual — Profile Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, type: "spring", damping: 20, delay: 0.4 }}
                className="w-full lg:max-w-[42%] flex justify-center items-center relative z-20 pointer-events-auto flex-shrink-0"
            >
                <div className="relative">
                    {/* Decorative elements */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-[2px] border-dashed border-violet-500/10 rounded-full scale-[1.3] pointer-events-none"
                    />
                    
                    {/* Profile Image with 3D Parallax */}
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[30rem] lg:h-[30rem] group perspective-1000"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="w-full h-full overflow-hidden border-[8px] border-white shadow-[0_50px_100px_-20px_rgba(124,58,237,0.3)]"
                            style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', transformStyle: "preserve-3d" }}
                        >
                            <img
                                src="/profile.png"
                                alt={data.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 translate-z-10"
                                style={{ transform: "translateZ(50px)" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 to-transparent mix-blend-overlay" />
                        </motion.div>
                    </motion.div>

                    {/* Floating badges with high light mode contrast */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 -right-4 glass-card px-5 py-3 rounded-2xl border border-violet-100 shadow-2xl z-30"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-xl">🧠</div>
                            <div>
                                <p className="text-[9px] font-black text-violet-500 uppercase tracking-widest">Expertise</p>
                                <p className="text-sm font-black text-slate-800">AI / ML Engineer</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-8 -left-8 glass-card px-5 py-3 rounded-2xl border border-indigo-100 shadow-2xl z-30"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-xl">⚡</div>
                            <div>
                                <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Status</p>
                                <p className="text-sm font-black text-slate-800">Available 24/7</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-auto"
            >
                <span className="text-[9px] tracking-[0.3em] font-black text-slate-400 uppercase">Explore</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-slate-200 rounded-full flex justify-center pt-2 shadow-inner"
                >
                    <div className="w-1.5 h-2 bg-violet-500 rounded-full shadow-lg" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
