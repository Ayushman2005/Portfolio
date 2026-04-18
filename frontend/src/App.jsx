import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, MotionConfig, useMotionValue, useTransform } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';
import AmbientParticles from './components/AmbientParticles';
import YouTubeMusicCard from './components/YouTubeMusicCard';
import Clock from './components/Clock';
import { portfolioData } from './data';

// Detect mobile/touch devices to skip heavy GPU animations
const isMobileDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(max-width: 768px)').matches ||
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const GlobalMouseGlow = () => {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (isMobileDevice()) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-[1]"
      style={{
        background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)',
        x: useTransform(smoothX, x => x - 300),
        y: useTransform(smoothY, y => y - 300),
        willChange: 'transform'
      }}
    />
  );
};

const GlobalMarquee = ({ name }) => {
  return (
    <div className="fixed inset-0 w-full h-full opacity-[0.04] select-none pointer-events-none z-0 flex flex-col justify-center overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Rotation adds a highly requested premium tilt without risking sharp bounding boxes cutting it oddly */}
        <div className="absolute inset-x-[-20%] top-[-20%] bottom-[-20%] flex flex-col justify-center -rotate-[4deg]">
            {[...Array(6)].map((_, rowIndex) => (
                <motion.div
                    key={rowIndex}
                    animate={{ x: rowIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                    transition={{ duration: 45 + rowIndex * 5, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap my-[-1%]"
                    style={{ willChange: 'transform' }}
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center shrink-0">
                            <h1 className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-black uppercase text-white tracking-tighter leading-none">
                                {name}
                            </h1>
                            <span className="text-[6rem] md:text-[10rem] text-white/20 px-8 md:px-16 font-black">—</span>
                        </div>
                    ))}
                </motion.div>
            ))}
        </div>
    </div>
  );
};

const EntranceReveal = ({ name, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full whitespace-nowrap">
        <motion.h1
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          className="text-[12rem] md:text-[20rem] lg:text-[28rem] font-black uppercase text-white tracking-tighter opacity-10 absolute top-1/2 -translate-y-1/2"
        >
          {name} — {name}
        </motion.h1>
        
        <div className="relative z-10 flex flex-col items-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="flex flex-col items-center mb-4"
            >
                <span className="text-violet-500 font-black tracking-[0.5em] uppercase text-xs mb-4">Establishing Connection</span>
                <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter text-center leading-none">
                     {name.split(' ')[0]}<span className="text-gradient">.</span>
                </h1>
            </motion.div>
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                className="h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent"
            />
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  const [data] = useState(portfolioData);
  const [dataLoaded] = useState(true);
  const [terminalFinished, setTerminalFinished] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const location = useLocation();

  // Instantly scroll to top when changing routes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Disable right-click (inspect) and common developer tool shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    
    const handleKeydown = (e) => {
      // Disable F12, Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect Element), Ctrl+U (View Source)
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeydown);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const PageTransition = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleLoaderComplete = useCallback(() => {
    setTerminalFinished(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true);
  }, []);

  const isAppReady = dataLoaded && terminalFinished;
  const isFullyLoaded = isAppReady && introFinished;

  return (
    <SmoothScroll>
      <div className="dark relative min-h-screen bg-transparent text-slate-100 selection:bg-violet-500/30 font-sans overflow-x-hidden">
        
        {/* Premium Grid Matrix Background for the WHOLE app */}
        <div className="fixed inset-0 bg-[#050505] -z-20"></div>
        <div className="fixed inset-0 opacity-[0.15] -z-10" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, #000 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, #000 30%, transparent 100%)'
        }}></div>
        <GlobalMouseGlow />
        {data && <GlobalMarquee name={data.name} />}

        <MotionConfig transition={{ type: "spring", stiffness: 70, damping: 20, mass: 0.8 }}>
          <AnimatePresence mode="wait">
            {!isAppReady && (
              <Loader
                key="loader"
                isDataReady={dataLoaded}
                onComplete={handleLoaderComplete}
              />
            )}
            {isAppReady && !introFinished && (
               <EntranceReveal 
                key="entrance" 
                name={data.name} 
                onComplete={handleIntroComplete} 
               />
            )}
          </AnimatePresence>

          {isFullyLoaded && data && (
            <>
              <Navbar name={data.name} />
              <YouTubeMusicCard />
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
            {isFullyLoaded && (
              <motion.div
                key="main-app"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Ambient light blobs - desktop only */}
                {!isMobileDevice() && (
                  <>
                    <AmbientParticles />
                    <div className="fixed top-[-15%] left-[-10%] w-[60%] h-[60%] bg-violet-600/[0.05] blur-[100px] rounded-full pointer-events-none animate-blob" style={{ willChange: 'transform' }} />
                    <div className="fixed bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-indigo-600/[0.04] blur-[100px] rounded-full pointer-events-none animate-blob animation-delay-4000" style={{ willChange: 'transform' }} />
                  </>
                )}

                <div className="relative z-10 w-full">
                  {data ? (
                    <>
                      <main className="max-w-[100rem] mx-auto px-6 md:px-16 pt-24 pb-12 w-full min-h-[70vh]">
                        <AnimatePresence mode="wait">
                          <Routes location={location} key={location.pathname}>
                            <Route path="/" element={
                              <PageTransition>
                                <div className="space-y-28 md:space-y-44 w-full">
                                  <Hero data={data} />
                                  <About data={data} summary={true} />
                                  <Skills skills={data.skills} summary={true} />
                                  <Projects projects={data.projects} summary={true} />
                                  <Experience experience={data.experience} summary={true} />
                                  <Achievements achievements={data.certifications} summary={true} />
                                  <Contact data={data} />
                                </div>
                              </PageTransition>
                            } />
                            <Route path="/about" element={<PageTransition><About data={data} /></PageTransition>} />
                            <Route path="/skills" element={<PageTransition><Skills skills={data.skills} /></PageTransition>} />
                            <Route path="/projects" element={<PageTransition><Projects projects={data.projects} /></PageTransition>} />
                            <Route path="/experience" element={<PageTransition><Experience experience={data.experience} /></PageTransition>} />
                            <Route path="/achievements" element={<PageTransition><Achievements achievements={data.certifications} /></PageTransition>} />
                            <Route path="/contact" element={<PageTransition><Contact data={data} /></PageTransition>} />
                          </Routes>
                        </AnimatePresence>
                      </main>
                      <Clock />
                      <Footer data={data} />
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 space-y-6 text-slate-100">
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
      <Analytics />
    </SmoothScroll>
  );
}

export default App;