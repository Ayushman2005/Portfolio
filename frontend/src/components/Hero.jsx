import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
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

    // Parallax effect on scroll — skip on mobile for smoothness
    const { scrollY } = useScroll();
    const _y1Raw = useTransform(scrollY, [0, 500], [0, 150]);
    const _y2Raw = useTransform(scrollY, [0, 500], [0, -100]);
    const _opacity1Raw = useTransform(scrollY, [0, 300], [1, 0]);
    const mobile = isMobile();
    const y1 = mobile ? 0 : _y1Raw;
    const y2 = mobile ? 0 : _y2Raw;
    const opacity1 = mobile ? 1 : _opacity1Raw;

    // Floating Window Physics — skip on mobile
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]), { damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]), { damping: 20 });

    function handleMouseMove(e) {
        if (mobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        mouseX.set((mouseXPos / width) - 0.5);
        mouseY.set((mouseYPos / height) - 0.5);
    }

    function handleMouseLeave() {
        if (mobile) return;
        mouseX.set(0);
        mouseY.set(0);
    }

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
                staggerChildren: 0.2,
                delayChildren: 0.1,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 12 }
        }
    };

    return (
        <section id="hero" className="min-h-[90vh] flex flex-col md:flex-row items-center justify-between relative overflow-visible pt-10">
            <motion.div
                style={{ y: y1, opacity: opacity1 }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6 max-w-3xl relative z-10 w-full"
            >
                <motion.p variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono text-sm tracking-wide font-bold shadow-sm mb-2 border border-neutral-200 dark:border-neutral-700">
                    <span className="text-cyan-600 mr-2">●</span> Welcome to my portfolio
                </motion.p>

                <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                    {data.name}.
                </motion.h1>

                <motion.h2 variants={itemVariants} className="text-2xl sm:text-4xl md:text-5xl font-bold text-neutral-500 dark:text-neutral-400 min-h-[1.4em]">
                    I'm a <br className="sm:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600"> {typedText}</span>
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="text-cyan-600 font-light"
                    >|</motion.span>
                </motion.h2>

                <motion.p variants={itemVariants} className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mt-8 font-medium">
                    {data.bio || "Computer Engineering student passionate about Machine Learning, Data Structures, and Web Development. Interested in building scalable systems and solving real-world problems."}
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-5 pt-10">
                    <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href="#projects"
                        className="interactive px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl shadow-[0_10px_20px_-10px_rgba(6,182,212,0.6)] hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.8)] transition-all flex items-center gap-2"
                    >
                        Explore Work
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href="#contact"
                        className="interactive px-8 py-4 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 hover:border-cyan-500 text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 font-bold rounded-2xl shadow-sm hover:shadow-lg transition-all"
                    >
                        Get in touch
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Dynamic 3D Floating Window Element */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8, type: "spring", damping: 15 }}
                style={{ y: y2, perspective: 1000 }}
                className="w-full max-w-lg relative z-20 mt-16 md:mt-0 mx-auto md:mx-0"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="relative bg-white dark:bg-neutral-900/70 backdrop-blur-2xl border border-neutral-200 dark:border-neutral-700 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-cyan-500/10 cursor-default"
                >
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>

                    <div className="flex items-center gap-2 mb-6 border-b border-neutral-100 dark:border-neutral-800 pb-4" style={{ transform: 'translateZ(20px)' }}>
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <p className="ml-4 font-mono text-xs text-neutral-400 tracking-wider">developer_profile.json</p>
                    </div>

                    <div className="space-y-4 font-mono text-sm" style={{ transform: 'translateZ(40px)' }}>
                        <div className="flex items-start gap-4 p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-800 transition-colors hover:bg-white dark:bg-neutral-900 hover:border-cyan-200">
                            <Terminal className="w-5 h-5 text-purple-500 mt-1" />
                            <div>
                                <p className="text-neutral-500 dark:text-neutral-400 font-semibold mb-1">// Backend Logic</p>
                                <div className="flex items-center gap-2 text-cyan-700">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" className="w-4 h-4" alt="python" /> Python
                                    <span className="text-neutral-400">|</span>
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" className="w-4 h-4" alt="flask" /> Flask
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-800 transition-colors hover:bg-white dark:bg-neutral-900 hover:border-blue-200">
                            <Database className="w-5 h-5 text-blue-500 mt-1" />
                            <div>
                                <p className="text-neutral-500 dark:text-neutral-400 font-semibold mb-1">// Data & Intelligence</p>
                                <div className="flex items-center gap-2 text-blue-700">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" className="w-4 h-4" alt="TF" /> TensorFlow
                                    <span className="text-neutral-400">|</span>
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" className="w-4 h-4" alt="PyTorch" /> PyTorch
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-800 transition-colors hover:bg-white dark:bg-neutral-900 hover:border-green-200">
                            <Code2 className="w-5 h-5 text-green-500 mt-1" />
                            <div>
                                <p className="text-neutral-500 dark:text-neutral-400 font-semibold mb-1">// Frontend UI</p>
                                <div className="flex items-center gap-2 text-green-700">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" className="w-4 h-4" alt="React" /> React
                                    <span className="text-neutral-400">|</span>
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" className="w-4 h-4 filter grayscale brightness-0 opacity-60 mix-blend-multiply" alt="Tailwind" /> Tailwind
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Decorative floating rings - desktop only */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -right-10 w-40 h-40 border-[1px] border-dashed border-cyan-300 rounded-full -z-10 hidden md:block will-change-transform"
                ></motion.div>
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-8 -left-8 w-32 h-32 border-[1px] border-cyan-200 rounded-full -z-10 bg-gradient-to-tr from-cyan-100/50 to-transparent backdrop-blur-3xl hidden md:block will-change-transform"
                ></motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
