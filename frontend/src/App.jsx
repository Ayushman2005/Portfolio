import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { portfolioData } from './data';

// Detect mobile/touch devices to skip heavy GPU animations
const isMobileDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(max-width: 768px)').matches ||
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

function App() {
  const [data] = useState(portfolioData);
  const [dataLoaded] = useState(true);
  const [terminalFinished, setTerminalFinished] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleLoaderComplete = useCallback(() => {
    setTerminalFinished(true);
  }, []);

  const isAppReady = dataLoaded && terminalFinished;

  return (
    <SmoothScroll>
      <div className="relative min-h-screen text-slate-900 selection:bg-violet-500/20 font-sans overflow-x-hidden">
        <MotionConfig transition={{ type: "spring", stiffness: 100, damping: 40 }}>
          <AnimatePresence mode="wait">
            {!isAppReady && (
              <Loader
                key="loader"
                isDataReady={dataLoaded}
                onComplete={handleLoaderComplete}
              />
            )}
          </AnimatePresence>

          <Cursor />

          {isAppReady && data && (
            <>
              <Navbar name={data.name} />
              {/* Scroll Progress Bar */}
              <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[110]"
                style={{
                  scaleX,
                  background: 'linear-gradient(90deg, #7c3aed, #4f46e5, #ec4899)'
                }}
              />
            </>
          )}

          <AnimatePresence>
            {isAppReady && (
              <motion.div
                key="main-app"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Ambient light blobs - desktop only */}
                {!isMobileDevice() && (
                  <>
                    <div className="fixed top-[-15%] left-[-10%] w-[60%] h-[60%] bg-violet-600/[0.07] blur-[160px] rounded-full pointer-events-none animate-blob" />
                    <div className="fixed bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-indigo-600/[0.06] blur-[140px] rounded-full pointer-events-none animate-blob animation-delay-4000" />
                  </>
                )}

                <div className="relative z-10 w-full">
                  {data ? (
                    <>
                      <main className="max-w-[100rem] mx-auto px-6 md:px-16 pt-24 pb-12 space-y-28 md:space-y-44">
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
                    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 space-y-6 text-slate-900">
                      <h1 className="text-4xl font-bold">
                        Something went wrong.
                      </h1>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="btn-primary px-8 py-3"
                      >
                        Reload
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