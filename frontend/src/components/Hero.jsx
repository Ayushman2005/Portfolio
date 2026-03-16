import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Terminal, Database, Code2 } from 'lucide-react';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const Hero = ({ data }) => {
    const words = ["Machine Learning Engineer.", "Full Stack Developer.", "Problem Solver."];
    const [currentWord, setCurrentWord] = React.useState(0);
    const [typedText, setTypedText] = React.useState('');
    const [isDeleting, setIsDeleting] = React.useState(false);

    // Parallax & Spotlight effect with smoothing
    const { scrollY } = useScroll();
    const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
    
    const y1 = useTransform(smoothY, [0, 500], [0, 100]);
    const y2 = useTransform(smoothY, [0, 500], [0, -50]);
    const opacity = useTransform(smoothY, [0, 500, 800], [1, 1, 0]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleContainerMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const spotlightBackground = useMotionTemplate`
        radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            rgba(6, 182, 212, 0.1),
            transparent 80%
        )
    `;

    React.useEffect(() => {
        let timeout;
        const typeSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && typedText === words[currentWord]) {
            timeout = setTimeout(() => setIsDeleting(true), 2500);
        } else if (isDeleting && typedText === '') {
            setIsDeleting(false);
            setCurrentWord((prev) => (prev + 1) % words.length);
            timeout = setTimeout(() => { }, 400);
        } else {
            const currentFullText = words[currentWord];
            timeout = setTimeout(() => {
                setTypedText(currentFullText.substring(0, typedText.length + (isDeleting ? -1 : 1)));
            }, typeSpeed);
        }

        return () => clearTimeout(timeout);
    }, [typedText, isDeleting, currentWord, words]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 80, damping: 15 }
        }
    };

    return (
        <section 
            id="hero" 
            onMouseMove={handleContainerMouseMove}
            className="min-h-screen flex flex-col md:flex-row items-center justify-between relative overflow-visible py-20 pointer-events-none"
        >
            {/* Spotlight and Mesh Background */}
            <motion.div 
                className="absolute inset-0 z-0 opacity-50 dark:opacity-30 pointer-events-none"
                style={{ background: spotlightBackground }}
            />
            <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse-slow pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>

            <motion.div
                style={{ y: y1, opacity }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8 max-w-6xl relative z-10 w-full pointer-events-auto"
            >
                <motion.div 
                    variants={itemVariants} 
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass-card text-neutral-600 dark:text-neutral-400 font-mono text-sm tracking-widest font-bold shadow-xl border border-white/20 dark:border-white/5"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                    AVAILABLE FOR NEW PROJECTS
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-neutral-900 dark:text-white leading-[0.9]">
                        {data.name.split(' ').map((word, i) => (
                            <span key={i} className="block last:text-gradient">
                                {word}
                            </span>
                        ))}
                    </h1>
                </motion.div>

                <motion.h2 variants={itemVariants} className="text-2xl sm:text-4xl md:text-5xl font-bold text-neutral-500 dark:text-neutral-400 min-h-[1.4em] tracking-tight">
                    I am a <span className="text-neutral-900 dark:text-white">{typedText}</span>
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="text-cyan-500 inline-block w-[2px] h-[0.9em] bg-cyan-500 ml-1 align-middle"
                    />
                </motion.h2>

                <motion.p variants={itemVariants} className="text-lg sm:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    {data.bio}
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-10">
                    <motion.a
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        href="#projects"
                        className="group relative px-10 py-5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-black rounded-2xl shadow-[0_20px_50px_rgba(6,182,212,0.3)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            VIEW WORK
                            <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Shifting Light Beam */}
                        <motion.div 
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-20 pointer-events-none"
                        />
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        href="#contact"
                        className="group flex items-center gap-3 px-10 py-5 glass-card text-neutral-900 dark:text-white font-black rounded-2xl transition-all border border-neutral-200 dark:border-white/10 hover:border-cyan-500/50 shadow-xl"
                    >
                        <span>LET'S TALK</span>
                        <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover:animate-ping" />
                    </motion.a>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1.5, type: "spring", damping: 20 }}
                style={{ y: y2 }}
                className="w-full max-w-lg relative z-20 mt-20 md:mt-0 mx-auto md:mx-0 flex justify-center items-center pointer-events-auto"
            >
                <div className="relative group p-6 sm:p-12">
                    {/* Pulsing Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 blur-[80px] sm:blur-[120px] opacity-20 group-hover:opacity-60 transition-opacity duration-1000 animate-pulse-slow rounded-full" />
                    
                    {/* Orbiting Rotating Rings */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-cyan-500/20 rounded-full scale-110 pointer-events-none"
                    />
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border border-blue-500/10 rounded-full scale-105 pointer-events-none"
                    />

                    {/* Tech Badges with Independent Orbit */}
                    <motion.div 
                        animate={{ y: [0, -20, 0], x: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 z-40 glass-card p-3 sm:p-4 rounded-full shadow-2xl border-white/20 dark:border-white/10 hidden sm:flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16"
                    >
                        <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-500" />
                    </motion.div>
                    <motion.div 
                        animate={{ y: [0, 20, 0], x: [0, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute bottom-4 right-4 z-40 glass-card p-3 sm:p-4 rounded-full shadow-2xl border-white/20 dark:border-white/10 hidden sm:flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16"
                    >
                        <Database className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                    </motion.div>

                    {/* Main Circular Image with 3D POV */}
                        <motion.div
                            style={{ 
                                rotateX: !isMobile() ? useTransform(mouseY, [0, 500], [15, -15]) : 0,
                                rotateY: !isMobile() ? useTransform(mouseX, [0, 500], [-15, 15]) : 0,
                                transformStyle: "preserve-3d",
                                perspective: "1200px"
                            }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-64 h-64 sm:w-[32rem] sm:h-[32rem] rounded-full border-[8px] sm:border-[15px] border-white dark:border-neutral-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] group-hover:shadow-cyan-500/30 transition-all duration-700 overflow-visible"
                        >
                            {/* Status Indicator */}
                            <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 z-50">
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass-card px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-cyan-500/30 flex items-center gap-2 shadow-xl"
                                >
                                    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-cyan-500"></span>
                                    </span>
                                    <span className="text-[8px] sm:text-[10px] font-black tracking-[0.2em] text-cyan-500 uppercase">System Active</span>
                                </motion.div>
                            </div>

                        {/* Inner 3D Container for Image */}
                        <div className="absolute inset-0 rounded-full overflow-hidden bg-neutral-900">
                            <img
                                src="/profile.png"
                                alt={data.name}
                                className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(data.name) + "&size=512&background=0a0a0a&color=fff";
                                }}
                            />
                            
                            {/* Scanning Effect */}
                            <motion.div 
                                animate={{ top: ["-10%", "110%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-40 blur-[2px]"
                            />
                            <motion.div 
                                animate={{ top: ["-10%", "110%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.1 }}
                                className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent z-30"
                            />

                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </div>

                        {/* Holographic HUD Elements */}
                        <div className="absolute inset-0 rounded-full border border-cyan-500/20 z-40 pointer-events-none" />
                        <div className="absolute inset-8 rounded-full border border-blue-500/10 z-30 pointer-events-none" />

                        {/* Bottom coordinates label */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                           <span className="text-[8px] sm:text-[10px] font-mono text-neutral-500 tracking-widest uppercase truncate max-w-[150px]">LOC: 23.49 / 85.32</span>
                        </div>

                        {/* Depth Ring */}
                        <div className="absolute inset-[-2px] rounded-full border-4 border-cyan-500/30 blur-sm group-hover:opacity-100 opacity-0 transition-opacity" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
