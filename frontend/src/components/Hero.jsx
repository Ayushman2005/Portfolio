import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Cpu, Code2 } from 'lucide-react';

const Magnetic = ({ children, strength = 0.2 }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * strength, y: middleY * strength });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-block relative z-50 pointer-events-auto cursor-pointer"
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
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
    
    // Smooth cursor follow
    const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };

    // Calculate rotation strictly limited limits to prevent extreme flips
    const rotateX = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [12, -12]);
    const rotateY = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-12, 12]);

    const firstName = data.name.split(' ')[0] || "Portfolio";
    const lastName = data.name.split(' ').slice(1).join(' ');

    return (
        <section
            id="hero"
            onMouseMove={handleMouseMove}
            className="min-h-[100svh] relative flex items-center justify-center pt-32 pb-20 overflow-hidden pointer-events-none"
        >
            {/* Massive Parallax Background Name Tracking Scroll */}
            <motion.div style={{ y: y1 }} className="absolute whitespace-nowrap top-1/4 -left-[10%] opacity-[0.02] select-none pointer-events-none z-0">
                <h1 className="text-[12rem] md:text-[18rem] lg:text-[24rem] font-black uppercase text-white tracking-tighter leading-none">
                    {data.name} — {data.name}
                </h1>
            </motion.div>

            {/* Premium Grid Matrix Background */}
            <div className="absolute inset-0 bg-[#050505] -z-20"></div>
            <div className="absolute inset-0 opacity-20 -z-10" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '100px 100px',
                maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 20%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 20%, transparent 100%)'
            }}></div>
            
            {/* Interactive Flashlight Glow following Cursor */}
            {!isMobile() && (
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-30 pointer-events-none -z-10 mix-blend-screen"
                    style={{
                        background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, rgba(59,130,246,0.1) 50%, transparent 80%)',
                        left: useTransform(smoothX, x => x - 300),
                        top: useTransform(smoothY, y => y - 300)
                    }}
                />
            )}

            <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-20 lg:gap-8">
                
                {/* Left Side: Typography & Interactions */}
                <motion.div 
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-start w-full lg:w-1/2 pointer-events-auto"
                >
                    <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#34d399]"></span>
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-violet-300 uppercase">Available for Hire</span>
                    </div>

                    <div className="relative mb-8 w-full">
                        <h2 className="text-xs md:text-sm font-bold text-neutral-500 uppercase tracking-[0.3em] mb-4">
                            System Initialized //
                        </h2>
                        <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-black text-white tracking-tighter leading-[0.9] flex flex-col">
                            <span className="drop-shadow-sm">{firstName}</span> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 drop-shadow-md mt-1">
                                {lastName}
                            </span>
                        </h1>
                    </div>

                    <p className="text-lg md:text-xl text-neutral-400 max-w-lg mb-12 leading-relaxed border-l-2 border-violet-500/40 pl-6 shadow-sm">
                        Bridging the gap between cutting-edge Artificial Intelligence and robust Full-Stack Architecture.
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-6 w-full">
                        <Magnetic strength={0.2}>
                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="#projects"
                                className="relative group overflow-hidden rounded-2xl p-[1.5px] w-full sm:w-auto"
                            >
                                {/* Animated spinning gradient edge */}
                                <span className="absolute inset-[-100%] bg-[animate-spin] opacity-100 group-hover:opacity-100 transition-opacity"
                                      style={{
                                          background: 'conic-gradient(from 0deg, transparent 40%, #8b5cf6 60%, #3b82f6 80%, transparent 100%)',
                                          animation: 'spin 4s linear infinite',
                                      }}></span>
                                <div className="relative flex items-center justify-center gap-3 bg-[#050505] px-10 py-5 rounded-[15px] font-black text-[11px] md:text-sm tracking-widest uppercase text-white transition-colors group-hover:bg-[#121212]/80 backdrop-blur-xl">
                                    Initialize Stack
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                                </div>
                            </motion.a>
                        </Magnetic>

                        <div className="flex items-center gap-4">
                            {[
                                { href: data.github, icon: Github, label: 'GH' },
                                { href: data.linkedin, icon: Linkedin, label: 'IN' },
                            ].map((social, i) => (
                                <Magnetic key={i} strength={0.4}>
                                    <motion.a
                                        whileHover={{ y: -4, scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={social.href}
                                        target="_blank"
                                        aria-label={social.label}
                                        className="flex items-center justify-center w-14 h-14 rounded-full border border-white/5 bg-[#121212] hover:bg-[#1a1a1a] text-neutral-400 hover:text-white transition-colors backdrop-blur-md shadow-xl"
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                </Magnetic>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Futuristic 3D Glass Profile Frame */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                    className="relative w-full lg:w-1/2 flex justify-center lg:justify-end xl:pr-16 pointer-events-auto perspective-[1200px]"
                >
                    <motion.div 
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] lg:w-[380px] lg:h-[480px] rounded-[2rem] mx-auto lg:mx-0 group"
                    >
                        {/* Huge Ambient Glow behind the card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-transparent to-blue-600 rounded-[2rem] opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700"></div>
                        
                        <div className="absolute inset-0 border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-3xl rounded-[2rem] overflow-hidden flex items-center justify-center shadow-2xl transition-all duration-700">
                            {/* Inner Profile Image with cinematic styling */}
                            <img 
                                src="/profile.png" 
                                alt={data.name} 
                                className="w-full h-full object-cover object-top scale-100 opacity-90 mix-blend-luminosity filter contrast-125 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105 group-hover:mix-blend-normal"
                            />
                            {/* Bottom Fade Overlay for sleek text integration */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>
                            
                            {/* Inner abstract geometric decoration */}
                            <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-1.5 opacity-40">
                                <div className="w-8 h-1 bg-violet-500 rounded-full"></div>
                                <div className="w-5 h-1 bg-blue-500 rounded-full"></div>
                                <div className="w-3 h-1 bg-white rounded-full"></div>
                            </div>
                        </div>

                        {/* Floating Status Card 1 */}
                        <motion.div 
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            style={{ transform: "translateZ(60px)" }}
                            className="absolute -left-4 lg:-left-16 top-1/4 bg-[#121212]/95 border border-white/5 backdrop-blur-xl p-3.5 md:p-5 rounded-2xl shadow-2xl flex items-center gap-3 md:gap-4"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center">
                                <Cpu className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
                            </div>
                            <div className="pr-2">
                                <p className="text-[9px] md:text-[10px] text-neutral-500 font-black uppercase tracking-widest leading-none mb-1 md:mb-1.5">Logic Pipeline</p>
                                <p className="text-xs md:text-sm text-white font-extrabold tracking-tight leading-none">AI Architecture</p>
                            </div>
                        </motion.div>

                        {/* Floating Status Card 2 */}
                        <motion.div 
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            style={{ transform: "translateZ(80px)" }}
                            className="absolute -right-4 lg:-right-12 bottom-1/4 bg-[#121212]/95 border border-white/5 backdrop-blur-xl p-3.5 md:p-5 rounded-2xl shadow-2xl flex items-center gap-3 md:gap-4"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                                <Code2 className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                            </div>
                            <div className="pr-2">
                                <p className="text-[9px] md:text-[10px] text-neutral-500 font-black uppercase tracking-widest leading-none mb-1 md:mb-1.5">Stack</p>
                                <p className="text-xs md:text-sm text-white font-extrabold tracking-tight leading-none">Full-Stack Dev</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
            
            {/* Custom Tailwind animation extension for the button spinning border */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
        </section>
    );
};

export default Hero;
