import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Send, MapPin, Mail, Sparkles } from 'lucide-react';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const Contact = ({ data }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        if (isMobile()) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
        try {
            if (FORMSPREE_ID) {
                const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify(formData),
                });
                if (res.ok) {
                    setStatus({ type: 'success', msg: 'Message sent successfully! I will reply soon.' });
                    setFormData({ name: '', email: '', message: '' });
                } else {
                    throw new Error('Formspree submission failed');
                }
            } else {
                // In local development or if ID is missing
                console.log('Form submission (no ID):', formData);
                setStatus({ type: 'success', msg: 'Form simulation successful! (Add VITE_FORMSPREE_ID for real emails)' });
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'Something went wrong. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-32 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-[90rem] mx-auto px-6 relative z-10"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left Side: Info */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest text-xs md:text-sm uppercase"
                            >
                                CONTACT
                            </motion.span>
                            <h2 className="text-3xl md:text-7xl font-black text-neutral-900 dark:text-white leading-[0.9] tracking-tighter">
                                Let's Build <br /> <span className="text-gradient">Something.</span>
                            </h2>
                            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium max-w-sm">
                                Have an idea or a project in mind? Reach out and let's make it real.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="glass-card p-8 rounded-[2rem] flex items-center gap-6 hover-glow group transition-all duration-500">
                                <div className="w-16 h-16 rounded-2xl bg-neutral-900 dark:bg-white flex items-center justify-center border border-neutral-700 dark:border-neutral-200 group-hover:scale-110 transition-transform">
                                    <Mail className="w-8 h-8 text-white dark:text-neutral-900" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black tracking-widest text-neutral-400 uppercase mb-1">Email Me</p>
                                    <p className="text-lg md:text-xl font-black text-neutral-900 dark:text-white tracking-tight">{data.email}</p>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-[2rem] flex items-center gap-6 hover-glow group transition-all duration-500">
                                <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 group-hover:scale-110 transition-transform">
                                    <MapPin className="w-8 h-8 text-neutral-900 dark:text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black tracking-widest text-neutral-400 uppercase mb-1">Location</p>
                                    <p className="text-lg md:text-xl font-black text-neutral-900 dark:text-white tracking-tight">{data.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            onMouseMove={handleMouseMove}
                            className="glass-card relative p-10 md:p-16 rounded-[3.5rem] overflow-hidden"
                        >
                            {/* Spotlight */}
                            {!isMobile() && (
                                <motion.div
                                    className="pointer-events-none absolute -inset-px rounded-[3.5rem] opacity-0 transition duration-500 group-hover:opacity-100 hidden lg:block"
                                    style={{
                                        background: useMotionTemplate`
                                            radial-gradient(
                                                600px circle at ${mouseX}px ${mouseY}px,
                                                rgba(6, 182, 212, 0.1),
                                                transparent 80%
                                            )
                                        `,
                                    }}
                                />
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black tracking-widest text-neutral-400 uppercase ml-2">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-neutral-100 dark:bg-neutral-800 border-2 border-transparent focus:border-cyan-500 rounded-3xl px-8 py-5 text-neutral-900 dark:text-white font-bold outline-none transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black tracking-widest text-neutral-400 uppercase ml-2">Your Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full bg-neutral-100 dark:bg-neutral-800 border-2 border-transparent focus:border-cyan-500 rounded-3xl px-8 py-5 text-neutral-900 dark:text-white font-bold outline-none transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black tracking-widest text-neutral-400 uppercase ml-2">Your Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="6"
                                        placeholder="Tell me about your project..."
                                        className="w-full bg-neutral-100 dark:bg-neutral-800 border-2 border-transparent focus:border-cyan-500 rounded-[2rem] px-8 py-6 text-neutral-900 dark:text-white font-bold outline-none transition-all resize-none placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                                        required
                                    />
                                </div>

                                {status.msg && (
                                    <div className={`p-6 rounded-2xl font-bold tracking-tight ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                        {status.msg}
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full group relative bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-black py-6 rounded-[2rem] shadow-2xl transition-all overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-4 text-xl tracking-tighter">
                                        {loading ? 'SENDING...' : 'SEND MESSAGE'}
                                        <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
