import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, 
    LogIn, 
    Send, 
    CheckCircle2, 
    Trash2, 
    Clock, 
    User,
    ShieldCheck,
    Sparkles
} from 'lucide-react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { 
    collection, 
    addDoc, 
    query, 
    where, 
    onSnapshot, 
    orderBy, 
    updateDoc, 
    doc, 
    deleteDoc,
    serverTimestamp 
} from 'firebase/firestore';
import KineticText from './KineticText';

const Guestbook = ({ ownerEmail = "karayushman736@gmail.com" }) => {
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [pendingComments, setPendingComments] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    const isAdmin = user?.email === ownerEmail;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setAuthLoading(false);
        });
        return unsubscribe;
    }, []);

    // Listen for approved comments
    useEffect(() => {
        const q = query(
            collection(db, "guestbook"), 
            where("status", "==", "approved"),
            orderBy("timestamp", "desc")
        );
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setComments(docs);
        });
        
        return unsubscribe;
    }, []);

    // Listen for pending comments (only for Admin)
    useEffect(() => {
        if (!isAdmin) {
            setPendingComments([]);
            return;
        }

        const q = query(
            collection(db, "guestbook"), 
            where("status", "==", "pending"),
            orderBy("timestamp", "desc")
        );
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setPendingComments(docs);
        });
        
        return unsubscribe;
    }, [isAdmin]);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login failed:", error);
            alert(`Login Error: ${error.message}\n\nPlease check if 'localhost' is added to your Authorized Domains in Firebase console.`);
        }
    };

    const handleLogout = () => signOut(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim() || !user) return;

        setLoading(true);
        try {
            await addDoc(collection(db, "guestbook"), {
                text: message,
                uid: user.uid,
                author: user.displayName,
                photo: user.photoURL,
                email: user.email,
                status: "pending", // All comments need approval
                timestamp: serverTimestamp(),
            });
            setMessage("");
            alert("Comment submitted! It will appear once approved by Ayushman.");
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Error submitting comment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const approveComment = async (id) => {
        try {
            await updateDoc(doc(db, "guestbook", id), { status: "approved" });
        } catch (error) {
            console.error("Approval failed:", error);
        }
    };

    const deleteComment = async (id) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return;
        try {
            await deleteDoc(doc(db, "guestbook", id));
        } catch (error) {
            console.error("Deletion failed:", error);
        }
    };

    return (
        <section id="guestbook" className="py-24 relative overflow-visible">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-[11px] font-black tracking-widest uppercase mb-6"
                    >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Community Board
                    </motion.div>

                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        <KineticText text="Digital" /> <br /> <span className="text-gradient"><KineticText text="Guestbook." delay={0.2} /></span>
                    </h2>
                    
                    <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl">
                        Leave a mark in this digital space. Connect via Google to share your thoughts, feedback, or just a friendly hello.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Input Side */}
                    <div className="lg:col-span-5 space-y-8 sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 md:p-10 relative overflow-hidden"
                        >
                            {/* Decorative stripe */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500" />
                            
                            <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                                {user ? "Share Your Thoughts" : "Authentication Required"}
                                <Sparkles className="w-5 h-5 text-pink-500" />
                            </h3>

                            {!user ? (
                                <div className="space-y-6">
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        To maintain a secure and professional environment, please sign in with your Google account to leave a message.
                                    </p>
                                    <button
                                        onClick={handleLogin}
                                        disabled={authLoading}
                                        className="w-full flex items-center justify-center gap-3 bg-white text-black font-black py-4 rounded-2xl hover:bg-neutral-200 transition-all group"
                                    >
                                        <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        Sign in with Google
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <img src={user.photoURL} alt={user.displayName} className="w-12 h-12 rounded-full ring-2 ring-violet-500/20" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Active Session</p>
                                            <p className="text-white font-bold truncate">{user.displayName}</p>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={handleLogout}
                                            className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-tighter"
                                        >
                                            Logout
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Your Message</label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Write something memorable..."
                                            rows="4"
                                            required
                                            className="w-full bg-black/50 border-2 border-transparent focus:border-pink-500/50 rounded-2xl px-6 py-4 text-white font-bold outline-none transition-all placeholder:text-neutral-700 text-sm"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-black py-5 rounded-2xl shadow-xl hover:shadow-pink-500/20 transition-all group disabled:opacity-50"
                                    >
                                        {loading ? "Transmitting..." : "Deliver to Guestbook"}
                                        <Send className="w-5 h-5 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300" />
                                    </button>
                                </form>
                            )}
                        </motion.div>

                        {/* Admin Panel (Conditional) */}
                        <AnimatePresence>
                            {isAdmin && pendingComments.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="glass-card p-6 border-violet-500/30 bg-violet-500/5"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <ShieldCheck className="w-5 h-5 text-violet-400" />
                                        <h4 className="text-sm font-black text-white uppercase tracking-widest">
                                            Admin Moderation Queue ({pendingComments.length})
                                        </h4>
                                    </div>
                                    <div className="space-y-4">
                                        {pendingComments.map((c) => (
                                            <div key={c.id} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <img src={c.photo} className="w-8 h-8 rounded-full" alt="" />
                                                    <span className="text-xs font-bold text-white">{c.author}</span>
                                                </div>
                                                <p className="text-sm text-slate-400 italic">"{c.text}"</p>
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => approveComment(c.id)}
                                                        className="flex-1 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase hover:bg-emerald-500/30 transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteComment(c.id)}
                                                        className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-[10px] font-black uppercase hover:bg-red-500/30 transition-colors"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Display Side */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Recent Entries
                            </h4>
                            <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-black text-slate-500">
                                {comments.length} Verified Messages
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <AnimatePresence mode="popLayout">
                                {comments.map((comment, i) => (
                                    <motion.div
                                        key={comment.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        layout
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start group relative overflow-hidden"
                                    >
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-white/5 group-hover:ring-pink-500/20 transition-all duration-500">
                                                {comment.photo ? (
                                                    <img src={comment.photo} alt={comment.author} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                                        <User className="w-8 h-8 text-slate-600" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 bg-pink-500 rounded-full p-1 border-4 border-[#050505]">
                                                <CheckCircle2 className="w-3 h-3 text-white" />
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-lg font-black text-white">{comment.author}</p>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                                        {comment.timestamp?.toDate().toLocaleDateString(undefined, { 
                                                            month: 'long', 
                                                            day: 'numeric', 
                                                            year: 'numeric' 
                                                        })}
                                                    </p>
                                                </div>
                                                {isAdmin && (
                                                    <button 
                                                        onClick={() => deleteComment(comment.id)}
                                                        className="p-2 rounded-lg bg-white/5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-slate-300 font-medium leading-relaxed italic">
                                                "{comment.text}"
                                            </p>
                                        </div>

                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </motion.div>
                                ))}

                                {comments.length === 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-20 text-center glass-card border-dashed border-2 border-white/5"
                                    >
                                        <p className="text-slate-600 font-black tracking-widest uppercase">The guestbook is currently pristine.</p>
                                        <p className="text-slate-700 text-sm mt-2">Be the first to leave your digital footprint.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Guestbook;
