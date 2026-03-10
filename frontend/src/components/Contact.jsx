import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Send, MapPin, Mail, Sparkles } from 'lucide-react';

// ─── InputWrapper lives OUTSIDE Contact so it never gets recreated on re-render ───
// If it were defined inside Contact, every keystroke (state update) would cause React
// to treat it as a brand-new component type, unmounting + remounting the input and
// losing focus after every single character.
const InputWrapper = ({ children, id, label, focusedInput, hasValue }) => {
    const isFocused = focusedInput === id;
    return (
        <div className="relative group/input mt-8 first:mt-0">
            <motion.label
                htmlFor={id}
                initial={false}
                animate={{
                    y: isFocused || hasValue ? -28 : 14,
                    scale: isFocused || hasValue ? 0.85 : 1,
                    color: isFocused ? '#0891b2' : '#737373',
                    x: isFocused || hasValue ? 0 : 16,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute left-0 top-0 font-medium pointer-events-none transform origin-left z-10 bg-white dark:bg-neutral-900 px-1"
            >
                {label}
            </motion.label>
            <div className="relative">
                {children}
                {/* Animated focus underline */}
                <motion.div
                    initial={false}
                    animate={{ scaleX: isFocused ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 origin-left"
                />
            </div>
        </div>
    );
};

const inputClass =
    'w-full bg-neutral-50 dark:bg-neutral-950 border-0 border-b-2 border-neutral-200 dark:border-neutral-700 rounded-t-xl px-4 py-4 text-neutral-900 dark:text-white focus:outline-none focus:bg-cyan-50/30 transition-all font-medium';

const Contact = ({ data }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
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
        const useFormspree = FORMSPREE_ID && FORMSPREE_ID !== 'mbdzggoj';

        try {
            if (useFormspree) {
                // ── Formspree path ──────────────────────────────────────────
                const res = await fetch(`https://formspree.io/f/${mbdzggoj}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                    }),
                });
                if (res.ok) {
                    setStatus({ type: 'success', msg: 'Transmission successful! I will reply shortly.' });
                    setFormData({ name: '', email: '', message: '' });
                    setTimeout(() => setStatus({ type: '', msg: '' }), 5000);
                } else {
                    const json = await res.json();
                    const errMsg = json?.errors?.map((err) => err.message).join(', ') || 'Submission failed. Please try again.';
                    setStatus({ type: 'error', msg: errMsg });
                }
            } else {
                // ── Flask backend fallback ──────────────────────────────────
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';
                const res = await fetch(`${API_URL}/api/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                if (res.ok) {
                    setStatus({ type: 'success', msg: 'Transmission successful! I will reply shortly.' });
                    setFormData({ name: '', email: '', message: '' });
                    setTimeout(() => setStatus({ type: '', msg: '' }), 5000);
                } else {
                    setStatus({ type: 'error', msg: 'Message could not be delivered. Please try again.' });
                }
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', msg: 'Failed to send. Please check your connection and try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 md:py-32 relative w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto px-4 w-full"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Info Side */}
                    <div className="lg:col-span-5 space-y-8 md:space-y-10">
                        <div>
                            <motion.div
                                initial={{ rotate: -10, opacity: 0 }}
                                whileInView={{ rotate: 0, opacity: 1 }}
                                transition={{ type: 'spring', delay: 0.2 }}
                                className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-tr from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-cyan-200"
                            >
                                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-cyan-600" />
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white mb-4 md:mb-6 leading-tight tracking-tight">
                                Let's Build <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Something New.</span>
                            </h2>
                            <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl font-medium max-w-md">
                                Whether it's a collaborative project, a freelance inquiry, or just networking—my inbox is always open.
                            </p>
                        </div>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-6 p-6 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-cyan-50 flex items-center justify-center rounded-xl text-cyan-500 border border-cyan-100 shadow-inner">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-400 font-bold uppercase tracking-wider mb-1">Email</p>
                                    <a href={`mailto:${data.email}`} className="text-lg font-bold text-neutral-800 dark:text-neutral-200 hover:text-cyan-600 transition-colors">
                                        {data.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-6 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center rounded-xl text-blue-500 border border-blue-100 shadow-inner">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-400 font-bold uppercase tracking-wider mb-1">Location</p>
                                    <span className="text-lg font-bold text-neutral-800 dark:text-neutral-200">{data.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <motion.div
                        onMouseMove={handleMouseMove}
                        className="lg:col-span-7 relative group/form interactive"
                    >
                        <motion.div
                            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover/form:opacity-100 z-0"
                            style={{
                                background: useMotionTemplate`
                                    radial-gradient(
                                        500px circle at ${mouseX}px ${mouseY}px,
                                        rgba(6, 182, 212, 0.4),
                                        transparent 80%
                                    )
                                `,
                            }}
                        />

                        <div className="relative z-10 bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-700 shadow-2xl shadow-cyan-500/10">
                            <form onSubmit={handleSubmit} className="relative z-20" noValidate>

                                <InputWrapper id="name" label="Full Name" focusedInput={focusedInput} hasValue={formData.name !== ''}>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedInput('name')}
                                        onBlur={() => setFocusedInput(null)}
                                        required
                                        autoComplete="name"
                                        className={inputClass}
                                    />
                                </InputWrapper>

                                <InputWrapper id="email" label="Email Address" focusedInput={focusedInput} hasValue={formData.email !== ''}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedInput('email')}
                                        onBlur={() => setFocusedInput(null)}
                                        required
                                        autoComplete="email"
                                        className={inputClass}
                                    />
                                </InputWrapper>

                                <InputWrapper id="message" label="Project Details & Message" focusedInput={focusedInput} hasValue={formData.message !== ''}>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedInput('message')}
                                        onBlur={() => setFocusedInput(null)}
                                        required
                                        rows="5"
                                        className={`${inputClass} resize-none mt-1`}
                                    />
                                </InputWrapper>

                                {status.msg && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 rounded-xl text-sm font-bold mt-6 flex items-center gap-3 ${status.type === 'success'
                                            ? 'bg-green-50 text-green-700 border border-green-200'
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                            }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${status.type === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                                        {status.msg}
                                    </motion.div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-10 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-5 rounded-2xl shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3 relative overflow-hidden group/btn"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                    <span className="relative z-10 text-lg">
                                        {loading ? 'Transmitting...' : 'Send Message'}
                                    </span>
                                    {!loading && (
                                        <motion.div
                                            className="relative z-10"
                                            initial={{ x: 0, y: 0 }}
                                            whileHover={{ x: 5, y: -5 }}
                                            transition={{ type: 'spring', stiffness: 400 }}
                                        >
                                            <Send className="w-5 h-5" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
