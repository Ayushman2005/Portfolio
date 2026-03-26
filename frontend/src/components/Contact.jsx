import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Send, MapPin, Mail, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

const isMobile = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const InputField = ({ label, id, type = "text", name, value, onChange, placeholder, required }) => (
    <div className="space-y-3">
        <label htmlFor={id} className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">{label}</label>
        <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full bg-[#0a0a0a] border-2 border-transparent focus:border-violet-500 focus:bg-[#121212] rounded-[1.5rem] px-6 py-5 text-white font-bold outline-none transition-all placeholder:text-neutral-600 text-sm shadow-inner"
        />
    </div>
);

const Contact = ({ data }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        if (isMobile()) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const spotlight = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(124,58,237,0.1), transparent 80%)`;

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

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
                    setStatus({ type: 'success', msg: '🎉 Message delivered! I\'ll reply briefly.' });
                    setFormData({ name: '', email: '', message: '' });
                } else {
                    throw new Error('Failed');
                }
            } else {
                setStatus({ type: 'success', msg: '✓ Simulation: Message sent successfully!' });
                setFormData({ name: '', email: '', message: '' });
            }
        } catch {
            setStatus({ type: 'error', msg: 'Delivery failed. Use direct email instead.' });
        } finally {
            setLoading(false);
        }
    };

    const contacts = [
        { icon: Mail, label: 'Deep Connect', value: data.email, href: `mailto:${data.email}`, color: '#7c3aed' },
        { icon: MapPin, label: 'HQ Base', value: data.location, href: null, color: '#4f46e5' },
        { icon: MessageSquare, label: 'Response Slot', value: '2-4 Response Window', href: null, color: '#ec4899' },
    ];

    return (
        <section id="contact" className="py-24 relative overflow-visible">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    {/* Left Info */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 text-[11px] font-black tracking-widest uppercase"
                            >
                                <MessageSquare className="w-3.5 h-3.5" />
                                Initiate Contact
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Let's <br /> <span className="text-gradient">Innovate.</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.18 }}
                                className="text-lg md:text-2xl text-slate-500 font-medium leading-relaxed max-w-sm"
                            >
                                Transforming visionary ideas into technical reality. Send me a message.
                            </motion.p>
                        </div>

                        {/* Contact info grid */}
                        <div className="grid grid-cols-1 gap-5">
                            {contacts.map(({ icon: Icon, label, value, href, color }, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                >
                                    {href ? (
                                        <a href={href} className="glass-card p-6 md:p-8 rounded-[2rem] flex items-center gap-6 border border-transparent bg-black/30 hover:bg-[#121212] hover:border-violet-300 transition-all group shadow-sm hover:shadow-xl">
                                            <div className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 shadow-lg transition-transform group-hover:scale-110" style={{ background: `${color}15`, border: `1.5px solid ${color}25` }}>
                                                <Icon className="w-7 h-7" style={{ color }} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">{label}</p>
                                                <p className="text-lg font-black text-white transition-colors group-hover:text-violet-600 truncate">{value}</p>
                                            </div>
                                            <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
                                        </a>
                                    ) : (
                                        <div className="glass-card p-6 md:p-8 rounded-[2rem] flex items-center gap-6 border border-transparent bg-black/30 shadow-sm">
                                            <div className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 shadow-lg" style={{ background: `${color}15`, border: `1.5px solid ${color}25` }}>
                                                <Icon className="w-7 h-7" style={{ color }} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">{label}</p>
                                                <p className="text-lg font-black text-white">{value}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            onMouseMove={handleMouseMove}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="glass-card relative p-10 md:p-16 rounded-[3rem] overflow-hidden border border-transparent bg-[#121212] shadow-2xl shadow-violet-900/20"
                        >
                            {/* Spotlight */}
                            {!isMobile() && (
                                <motion.div
                                    className="pointer-events-none absolute inset-0 rounded-[3rem] opacity-50"
                                    style={{ background: spotlight }}
                                />
                            )}

                            {/* Top decorative stripe */}
                            <div className="absolute top-0 left-0 right-0 h-1.5"
                                style={{ background: 'linear-gradient(90deg, #7c3aed, #4f46e5, #ec4899)' }} />

                            <div className="relative z-10 mb-10 border-b border-transparent pb-10">
                                <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                                    Quick Message <Sparkles className="w-6 h-6 text-violet-500" />
                                </h3>
                                <p className="text-slate-500 font-medium mt-2">I'll respond within the next technical cycle.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <InputField
                                        label="Full Name"
                                        id="contact-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                    <InputField
                                        label="Digital Address"
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="email@example.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="contact-message" className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase ml-1">The Proposal</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="6"
                                        placeholder="Describe your project or just say hi..."
                                        required
                                        className="w-full bg-[#0a0a0a] border-2 border-transparent focus:border-violet-500 focus:bg-[#121212] rounded-[1.5rem] px-6 py-5 text-white font-bold outline-none transition-all resize-none placeholder:text-neutral-600 text-sm shadow-inner"
                                    />
                                </div>

                                {status.msg && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`p-6 rounded-2xl text-[13px] font-black tracking-wide flex items-center gap-3 border ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${status.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                                        {status.msg.toUpperCase()}
                                    </motion.div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    whileTap={{ scale: 0.96 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full group relative text-white font-black py-6 rounded-[1.5rem] shadow-2xl transition-all overflow-hidden text-xs tracking-[0.25em] uppercase disabled:opacity-70"
                                    style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        {loading ? (
                                            <>
                                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-5 h-5 border-3 border-transparent border-t-white rounded-full" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Deliver Message
                                                <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                                            </>
                                        )}
                                    </span>
                                    {/* Shimmer effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                        animate={{ x: ["-150%", "150%"] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />
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
