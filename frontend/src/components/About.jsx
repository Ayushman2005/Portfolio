import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { GraduationCap, Building2, MapPin, Code2 } from 'lucide-react';

const About = ({ data }) => {
    const ref = useRef(null);

    // Create a slight parallax effect for the entire section
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section id="about" className="py-24 relative" ref={ref}>
            <motion.div
                style={{ y, opacity }}
                className="max-w-5xl mx-auto"
            >
                <div className="flex items-center gap-6 mb-16 px-4">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600"
                    >
                        About Me
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                        className="h-[2px] bg-gradient-to-r from-cyan-500/50 to-transparent flex-grow max-w-sm origin-left"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-7 space-y-6 text-neutral-600 leading-relaxed text-lg"
                    >
                        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-cyan-600 first-letter:float-left first-letter:mr-2">
                            Hello! I'm Ayushman Kar, a Computer Engineering Undergraduate based in Odisha, India. I am highly passionate about Machine Learning, Data Structures, and Web Development.
                        </p>
                        <p>
                            My journey in tech started with a curiosity to understand how intelligent systems make decisions. Currently, I am actively engaging with tech communities like the GDG on Campus and the Cyber Security Club at GIET University.
                        </p>
                        <p className="border-l-4 border-cyan-500 pl-4 py-2 bg-gradient-to-r from-cyan-50 to-transparent rounded-r-lg italic text-neutral-700 font-medium">
                            "Whether it's training machine learning models or building robust full-stack web applications, I enjoy combining logic with creative problem-solving to build solutions that have a real-world impact."
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
                        whileHover={{ scale: 1.02, rotate: 2 }}
                        className="md:col-span-5 relative group cursor-pointer"
                    >
                        {/* Animated glowing backdrop */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-200 to-blue-300 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-70 transition duration-700 animate-pulse-slow h-full w-full pointer-events-none"></div>

                        <div className="relative bg-white/90 backdrop-blur-md border border-neutral-200 rounded-3xl p-8 h-full flex flex-col justify-center shadow-xl hover:shadow-2xl transition-all duration-300 z-10 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100 rounded-bl-full pointer-events-none opacity-50"></div>

                            <h3 className="text-2xl font-bold mb-6 text-neutral-900 border-b-2 border-cyan-100 pb-3 relative z-10">
                                Quick Facts
                            </h3>

                            <ul className="space-y-5 relative z-10">
                                {[
                                    { label: "Degree", value: "B.Tech Computer Engineering", icon: GraduationCap },
                                    { label: "University", value: "GIET University (2024 - 2028)", icon: Building2 },
                                    { label: "Location", value: data.location, icon: MapPin },
                                    { label: "Hobbies", value: "Open Source, Hackathons", icon: Code2 }
                                ].map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.6 + (idx * 0.1) }}
                                            className="flex items-start gap-4 group/item"
                                        >
                                            <div className="mt-1 w-10 h-10 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0 group-hover/item:bg-cyan-500 group-hover/item:border-cyan-500 transition-colors duration-300">
                                                <Icon className="w-5 h-5 text-cyan-600 group-hover/item:text-white transition-colors duration-300" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-neutral-800 uppercase tracking-wider">{item.label}</p>
                                                <p className="text-neutral-600 font-medium">{item.value}</p>
                                            </div>
                                        </motion.li>
                                    )
                                })}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
