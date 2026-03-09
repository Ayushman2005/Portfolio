import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight, Building2 } from 'lucide-react';

const Experience = ({ experience }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end end"]
    });

    const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    return (
        <section id="experience" className="py-20 md:py-32 relative" ref={ref}>
            <div className="absolute right-0 top-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-100/40 blur-[100px] md:blur-[150px] pointer-events-none rounded-full"></div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-5xl mx-auto relative z-10 w-full"
            >
                <div className="flex flex-col items-center mb-16 md:mb-24 px-4 text-center">
                    <motion.div
                        initial={{ rotate: -180, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100, damping: 12 }}
                        className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-tr from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm border border-cyan-200"
                    >
                        <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 pb-2 leading-tight">
                        Experience Timeline
                    </h2>
                    <div className="w-24 md:w-32 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-4 md:mt-6 shadow-[0_0_10px_rgba(6,182,212,0.4)]"></div>
                </div>

                <div className="relative w-full">
                    {/* Desktop SVG Timeline Line */}
                    <div className="absolute left-[31px] md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 overflow-hidden justify-center hidden md:flex">
                        <svg className="h-full w-full" preserveAspectRatio="none">
                            <motion.line
                                x1="50%" y1="0%" x2="50%" y2="100%"
                                stroke="url(#gradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                style={{ pathLength }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#0ea5e9" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Mobile Timeline Line */}
                    <div className="absolute left-[31px] top-4 bottom-4 w-1 bg-gradient-to-b from-cyan-400 via-blue-400 to-transparent rounded-full opacity-30 md:hidden"></div>

                    <div className="space-y-12 md:space-y-24">
                        {experience.map((job, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 0, y: 30 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.1 }}
                                    className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full ${isEven ? "md:flex-row-reverse" : ""}`}
                                >
                                    {/* Timeline dot */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 + (idx * 0.1) }}
                                        className="absolute left-[31px] md:left-1/2 -translate-x-1/2 mt-8 md:mt-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border-4 border-cyan-500 z-10 shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center p-0.5"
                                    >
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full" />
                                    </motion.div>

                                    <div className="hidden md:block w-[45%]"></div>

                                    <div className={`w-full md:w-[50%] pl-16 pr-4 md:px-0 mt-2 md:mt-0 ${isEven ? 'md:pr-14 md:text-right' : 'md:pl-14'} group cursor-default`}>
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -4 }}
                                            className="bg-white/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-[2rem] border border-neutral-200 shadow-xl hover:shadow-cyan-100 group relative overflow-hidden transition-all duration-300 w-full"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-cyan-50 rounded-bl-[80px] md:rounded-bl-[100px] -z-10 group-hover:scale-150 transition-transform duration-500 ease-in-out opacity-50"></div>

                                            <div className={`flex flex-col gap-2 mb-4 md:mb-6 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                                <div className="inline-flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold tracking-wide text-cyan-700 bg-cyan-100/50 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-cyan-200 mb-2 w-fit">
                                                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                                    {job.period}
                                                </div>
                                                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 group-hover:text-cyan-600 transition-colors leading-tight">
                                                    {job.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-cyan-600 font-bold text-lg md:text-xl drop-shadow-sm mt-1">
                                                    <Building2 className="w-4 h-4 md:w-5 md:h-5 text-neutral-400" /> {job.company}
                                                </div>
                                            </div>

                                            <p className="text-neutral-600 leading-relaxed text-base md:text-lg flex flex-col md:flex-row items-start gap-4 mt-6 bg-neutral-50 p-4 md:p-6 rounded-2xl border border-neutral-100 group-hover:bg-white group-hover:border-cyan-100 transition-colors shadow-sm">
                                                <ChevronRight className={`hidden md:block w-6 h-6 text-cyan-400 flex-shrink-0 mt-1 ${isEven ? 'md:hidden' : 'md:block'}`} />
                                                <span className="flex-1">{job.description}</span>
                                                <ChevronRight className={`hidden md:block w-6 h-6 text-cyan-400 flex-shrink-0 mt-1 ${isEven ? 'md:block' : 'md:hidden'} rotate-180`} />
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Experience;
