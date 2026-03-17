import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useScroll, useSpring, MotionConfig } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';

// Detect mobile/touch devices to skip heavy GPU animations
const isMobileDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(max-width: 768px)').matches ||
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

function App() {
  const [data, setData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [terminalFinished, setTerminalFinished] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';
        const response = await axios.get(`${API_URL}/api/data`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setDataLoaded(true);
      }
    };

    fetchData();
  }, []);

  const isAppReady = dataLoaded && terminalFinished;

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white selection:bg-cyan-500/20 font-sans overflow-x-hidden transition-colors duration-700 ease-in-out mesh-gradient theme-transition">
        <MotionConfig transition={{ type: "spring", stiffness: 100, damping: 40 }}>
          <AnimatePresence mode="wait">
            {!isAppReady && (
              <Loader key="loader" onComplete={() => setTerminalFinished(true)} />
            )}
          </AnimatePresence>

          <Cursor />

        {isAppReady && data && (
          <>
            <Navbar name={data.name} />
            {/* Scroll Progress Bar */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 origin-left z-[100]"
              style={{ scaleX }}
            />
          </>
        )}

        <AnimatePresence>
          {isAppReady && (
            <motion.div
              key="main-app"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >

              {/* Background Patterns — static for performance */}
              <div className="fixed inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.15] pointer-events-none"></div>

              {/* Large, static performance-friendly blobs - simplified for mobile */}
              {!isMobileDevice() && (
                <>
                  <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/[0.04] dark:bg-cyan-500/[0.06] blur-[150px] rounded-full pointer-events-none" />
                  <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/[0.04] dark:bg-blue-500/[0.06] blur-[150px] rounded-full pointer-events-none" />
                </>
              )}
              {isMobileDevice() && (
                <div className="fixed top-[20%] left-[20%] w-[60%] h-[60%] bg-cyan-500/[0.02] dark:bg-cyan-500/[0.03] blur-[100px] rounded-full pointer-events-none" />
              )}

              <div className="relative z-10 w-full">
                {data ? (
                  <>
                    <main className="max-w-[90rem] mx-auto px-6 md:px-16 pt-24 pb-12 space-y-32 md:space-y-48">
                      <Hero data={data} />
                      <About data={data} />
                      <Skills skills={data.skills} />
                      <Projects projects={data.projects} />
                      <Experience experience={data.experience} />
                      <Achievements achievements={data.certifications} />
                      <Contact data={data} />
                    </main>
                    <Footer data={data} />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 space-y-6">
                    <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <h1 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter">
                      System offline.
                    </h1>
                    <p className="max-w-md text-neutral-500 dark:text-neutral-400 font-medium">
                      The neural link to the backend has been severed. Please ensure the server is operational and try refreshing.
                    </p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.reload()}
                      className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-black tracking-widest uppercase rounded-2xl shadow-xl shadow-red-500/10"
                    >
                      Initialize Reconnection
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </MotionConfig>
      </div>
    </SmoothScroll>
  );
}

export default App;