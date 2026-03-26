import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  const rawHours = time.getHours();
  const hours12 = rawHours % 12 || 12;
  const hours = formatNumber(hours12);
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());
  const ampm = rawHours >= 12 ? 'PM' : 'AM';

  // Progress for radial dials (0.0 to 1.0)
  const secProgress = time.getSeconds() / 60;
  const minProgress = time.getMinutes() / 60;
  // Hours progress smoothly interpolates based on minutes passed
  const hrProgress = (hours12 + time.getMinutes() / 60) / 12; 

  // Dynamic SVG circle circumferences
  const rSec = 110;
  const cSec = 2 * Math.PI * rSec;
  
  const rMin = 85;
  const cMin = 2 * Math.PI * rMin;

  const rHr = 60;
  const cHr = 2 * Math.PI * rHr;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  return (
    <div className="w-full overflow-hidden w-screen relative left-1/2 -translate-x-1/2 py-24 md:py-32 bg-[#0a0a0a]/50 border-t border-b border-white/5 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 shadow-2xl group transition-transform duration-500 ease-out perspective-1000 mt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[100rem] mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24"
      >
        {/* Dynamic Multi-Color Aurora Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-violet-600/20 via-rose-600/20 to-blue-600/20 blur-[130px] rounded-full pointer-events-none opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000"></div>
        {/* Modern Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        {/* --- LEFT: TRIPLE RADIAL DIAL CLOCK --- */}
        <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] flex items-center justify-center shrink-0">
          <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-2xl" viewBox="-130 -130 260 260">
            {/* Faded Background Rings */}
            <circle cx="0" cy="0" r={rSec} fill="none" strokeWidth="6" className="stroke-white/5" />
            <circle cx="0" cy="0" r={rMin} fill="none" strokeWidth="8" className="stroke-white/5" />
            <circle cx="0" cy="0" r={rHr} fill="none" strokeWidth="10" className="stroke-white/5" />

            {/* Glowing Seconds Ring */}
            <motion.circle 
              cx="0" cy="0" r={rSec} fill="none" strokeWidth="6" strokeLinecap="round"
              className="stroke-violet-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]"
              initial={{ strokeDasharray: `${cSec} ${cSec}`, strokeDashoffset: cSec }}
              animate={{ strokeDashoffset: cSec - (cSec * secProgress) }}
              transition={{ type: "tween", ease: "linear", duration: 0.3 }}
            />
            {/* Glowing Minutes Ring */}
            <motion.circle 
              cx="0" cy="0" r={rMin} fill="none" strokeWidth="8" strokeLinecap="round"
              className="stroke-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]"
              initial={{ strokeDasharray: `${cMin} ${cMin}`, strokeDashoffset: cMin }}
              animate={{ strokeDashoffset: cMin - (cMin * minProgress) }}
              transition={{ type: "tween", ease: "easeOut", duration: 1 }}
            />
            {/* Glowing Hours Ring */}
            <motion.circle 
              cx="0" cy="0" r={rHr} fill="none" strokeWidth="10" strokeLinecap="round"
              className="stroke-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
              initial={{ strokeDasharray: `${cHr} ${cHr}`, strokeDashoffset: cHr }}
              animate={{ strokeDashoffset: cHr - (cHr * hrProgress) }}
              transition={{ type: "tween", ease: "easeOut", duration: 1 }}
            />
          </svg>

          {/* Center Digital Display inserted cleanly into the rings */}
          <div className="flex flex-col items-center justify-center z-10 text-white mt-1 translate-y-1">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-5xl font-black tabular-nums tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400 drop-shadow-lg">
                {hours}:{minutes}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              {/* Dynamic Seconds Number */}
              <span className="text-xl tabular-nums font-bold text-violet-400 drop-shadow-md">{seconds}</span>
              <span className="text-[10px] font-extrabold text-neutral-400 tracking-widest pt-0.5 uppercase">{ampm}</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT: HIGH-TECH INFORMATION DISPLAY --- */}
        <div className="relative z-10 flex flex-col items-center lg:items-start gap-8 w-full max-w-md">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#121212]/5 border border-transparent text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#34d399]"></span>
            </span>
            Live Local Sync
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-sm">
              {days[time.getDay()]}
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 font-medium tracking-wide">
              {months[time.getMonth()]} <span className="text-white font-bold">{time.getDate()}</span>, {time.getFullYear()}
            </p>
          </div>

          {/* Glowing Digital Dashboard Counter Cards */}
          <div className="grid grid-cols-3 gap-3 md:gap-5 w-full mt-2">
            <motion.div whileHover={{ y: -3 }} className="group/card flex flex-col p-4 md:p-5 rounded-2xl bg-[#121212]/5 hover:bg-[#121212]/10 border border-transparent backdrop-blur-md shadow-xl transition-colors duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
              <span className="text-[10px] uppercase tracking-widest text-blue-400 font-extrabold mb-1 relative z-10">Hours</span>
              <span className="text-3xl font-black text-white tabular-nums drop-shadow-md relative z-10">{hours}</span>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} className="group/card flex flex-col p-4 md:p-5 rounded-2xl bg-[#121212]/5 hover:bg-[#121212]/10 border border-transparent backdrop-blur-md shadow-xl transition-colors duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
              <span className="text-[10px] uppercase tracking-widest text-rose-400 font-extrabold mb-1 relative z-10">Minutes</span>
              <span className="text-3xl font-black text-white tabular-nums drop-shadow-md relative z-10">{minutes}</span>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} className="group/card flex flex-col p-4 md:p-5 rounded-2xl bg-[#121212]/5 hover:bg-[#121212]/10 border border-transparent backdrop-blur-md shadow-xl transition-colors duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-violet-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
              <span className="text-[10px] uppercase tracking-widest text-violet-400 font-extrabold mb-1 relative z-10">Seconds</span>
              <span className="text-3xl font-black text-white tabular-nums drop-shadow-md relative z-10">{seconds}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Clock;
