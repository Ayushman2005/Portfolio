import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
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
import ThemeToggle from './components/ThemeToggle';

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
      <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white selection:bg-cyan-500/20 font-sans overflow-x-hidden transition-colors duration-700 ease-in-out">
        <Cursor />
        <ThemeToggle />

        <AnimatePresence mode="wait">
          {!isAppReady && (
            <Loader key="loader" onComplete={() => setTerminalFinished(true)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAppReady && (
            <motion.div
              key="main-app"
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              {/* Scroll Progress Bar */}
              <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 origin-left z-[60]"
                style={{ scaleX }}
              />

              {/* Dynamic Animated Background Patterns & Blobs */}
              <div className="fixed inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none transition-all duration-700"></div>

              <motion.div
                animate={{
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="fixed top-0 -left-1/4 w-[800px] h-[800px] bg-cyan-200/40 dark:bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none transition-colors duration-700"
              />
              <motion.div
                animate={{
                  x: [0, -50, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="fixed bottom-0 -right-1/4 w-[800px] h-[800px] bg-blue-200/40 dark:bg-blue-900/20 blur-[120px] rounded-full pointer-events-none transition-colors duration-700"
              />
              <motion.div
                animate={{
                  x: [0, 30, -30, 0],
                  y: [0, -50, 30, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="fixed top-1/2 left-1/4 w-[600px] h-[600px] bg-purple-200/20 dark:bg-purple-900/20 blur-[120px] rounded-full pointer-events-none transition-colors duration-700"
              />

              <div className="relative z-10 w-full">
                {data ? (
                  <>
                    <Navbar name={data.name} />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-20 md:pt-24 pb-12 space-y-20 md:space-y-32">
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
                  <div className="flex items-center justify-center min-h-screen text-xl text-neutral-500 dark:text-neutral-400 font-mono">
                    Error: Backend not responding.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}

export default App;