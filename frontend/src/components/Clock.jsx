import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';

const Clock = () => {
  const [selectedZone, setSelectedZone] = useState('India');
  const [time, setTime] = useState(new Date());

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const zones = [
    { name: 'India', id: 'Asia/Kolkata', label: 'IST', flag: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg' },
    { name: 'USA', id: 'America/New_York', label: 'EST', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg' },
    { name: 'UK', id: 'Europe/London', label: 'GMT', flag: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getLocalizedTime = (date, zoneId) => {
    return new Date(date.toLocaleString('en-US', { timeZone: zoneId }));
  };

  const activeZoneData = zones.find(z => z.name === selectedZone);
  const localizedDate = getLocalizedTime(time, activeZoneData.id);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  const rawHours = localizedDate.getHours();
  const hours12 = rawHours % 12 || 12;
  const hours = formatNumber(hours12);
  const minutes = formatNumber(localizedDate.getMinutes());
  const seconds = formatNumber(localizedDate.getSeconds());
  const ampm = rawHours >= 12 ? 'PM' : 'AM';

  const secProgress = localizedDate.getSeconds() / 60;
  const minProgress = localizedDate.getMinutes() / 60;
  const hrProgress = (hours12 + localizedDate.getMinutes() / 60) / 12; 

  const rSec = 110;
  const cSec = 2 * Math.PI * rSec;
  const rMin = 85;
  const cMin = 2 * Math.PI * rMin;
  const rHr = 60;
  const cHr = 2 * Math.PI * rHr;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const MapVisual = ({ zone }) => {
    const silhouettes = {
        'India': 'M82.2,295.6l-2-5.4l-4.2,0.8l-1.6-4.9l-4.1,3.4l-5.3-2.6L63,284l1-5.7l-4.5-2.6l-0.6-5.8l-5.3-0.9L51.8,264l-4.8,3.2l-3-6.2 l-7.4,1.8l0.4-10.1l-6.2,1l0-6.1l-7.2-2.3l4.5-5.3l-4.3-5.2l7.1-1.3l-0.5-8.5l7.5-1l-3.2-11.4l5.3-7.5l-4-5l6.5-1.5l0.7-9.3l9.6-1.5 l3.3-8.4l14.1,2.8l7.5-13.3l5.8,11.3l12.4,5.4l7.1,5.3l13.5-3l1.5,14.6l-10-0.4l3.5,18.7l-5.4,3.1l2.5,3.9l-6.1,2.3l0.3,16.7l-6.6-4 l-9,16.6l9.3,12l-10,1.3l1,5l-5.6,8.2l4.8,21.6l-5,5.1l5,4.7l-4.2,3.3L82.2,295.6z',
        'USA': 'M1.6,27.5l5.2-10l12.1-5.1l15.1,1.7l11,5.4l16.1,1l18.4-1.9l16,1.4l11.6,12.7l16.3,1.9l18.1,7.8l5.6,18.3l1.1,11.3l-5.1,12.5 l0.4,14.9l-7.5,6.5l-10.3,0l-14.8,8.2l-14.9,2.4L95,123.6l-11.3,7.5l-20.9-1l-10.4,14l-14,3.9l-19.1,10.6l-11,2.4L1,143l1,19 l-10.4,2.9l-8.4-4L1.6,27.5z',
        'UK': 'M49.4,4.1l11.4,10.1l4.4,28L63,48.8l-1.9,13.8l5.8,16.2L63,91.3l6,11.7l-8,14.7l2.1,10.1l-11.4,12l-7-3.9l-11.7,3 L26.3,132l-14.8-11.4l1.6-11.7l-13.1-4L1.3,86.6L3,75.4l9-10.9L7.5,56l1.3-17.5l14.8-13.4l10.8-14.1l10.1-5.6L49.4,4.1z'
    };

    return (
      <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center opacity-[0.04] select-none pointer-events-none overflow-hidden pr-4 md:pr-12">
        <motion.svg 
          key={zone}
          initial={{ scale: 0.8, opacity: 0, rotateZ: 10 }}
          animate={{ scale: 1.2, opacity: 1, rotateZ: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewBox="0 0 300 300" 
          className="w-full h-full fill-white/80"
          style={{ willChange: "transform, opacity" }}
        >
          <path d={silhouettes[zone] || silhouettes['India']} />
        </motion.svg>

        <motion.div 
            key={zone + "-label"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 flex flex-col items-end gap-1 opacity-20"
        >
            <span className="text-8xl md:text-[12rem] font-black uppercase text-white tracking-widest leading-none select-none">{zone.charAt(0)}</span>
            <span className="text-xs font-black text-white tracking-[1em] uppercase border-t border-white/40 pt-2">{zone}</span>
        </motion.div>
      </div>
    );
  };

  const bgGradient = useMotionTemplate`radial-gradient(circle at ${useTransform(mouseX, [0, 1], [0, 100])}% ${useTransform(mouseY, [0, 1], [0, 100])}%, rgba(124,58,237,0.1) 0%, rgba(79,70,229,0.1) 30%, transparent 70%)`;

  return (
    <div 
      className="w-full relative py-20 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 group perspective-[2000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ background: bgGradient }} className="absolute inset-0 z-0 transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
      
      <MapVisual zone={selectedZone} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
        className="relative w-full max-w-[100rem] mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 z-10"
      >
        {/* Dynamic Multi-Color Aurora Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-40 group-hover:opacity-80 transition-all duration-[2000ms] rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(79,70,229,0.15) 40%, transparent 70%)", willChange: "opacity" }}></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

        {/* --- LEFT: TRIPLE RADIAL DIAL CLOCK --- */}
        <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] flex items-center justify-center shrink-0 perspective-[1000px]">
          <motion.div
             style={{ transform: "translateZ(80px)" }}
             className="absolute inset-0 flex items-center justify-center w-full h-full"
          >
            <svg className="w-full h-full -rotate-90 overflow-visible" style={{ willChange: "transform" }} viewBox="-130 -130 260 260">
                <defs>
                  <filter id="glow-sec">
                     <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                     <feMerge>
                       <feMergeNode in="coloredBlur"/>
                       <feMergeNode in="SourceGraphic"/>
                     </feMerge>
                  </filter>
                  <filter id="glow-min">
                     <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                     <feMerge>
                       <feMergeNode in="coloredBlur"/>
                       <feMergeNode in="SourceGraphic"/>
                     </feMerge>
                  </filter>
                  <filter id="glow-hr">
                     <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                     <feMerge>
                       <feMergeNode in="coloredBlur"/>
                       <feMergeNode in="SourceGraphic"/>
                     </feMerge>
                  </filter>
                </defs>

                {/* Faded Background Rings */}
                <circle cx="0" cy="0" r={rSec} fill="none" strokeWidth="6" className="stroke-white/10" />
                <circle cx="0" cy="0" r={rMin} fill="none" strokeWidth="8" className="stroke-white/10" />
                <circle cx="0" cy="0" r={rHr} fill="none" strokeWidth="10" className="stroke-white/10" />

                {/* Glowing Seconds Ring & Tip */}
                <motion.circle 
                cx="0" cy="0" r={rSec} fill="none" strokeWidth="6" strokeLinecap="round"
                className="stroke-violet-500" filter="url(#glow-sec)"
                initial={{ strokeDasharray: `${cSec} ${cSec}`, strokeDashoffset: cSec }}
                animate={{ strokeDashoffset: cSec - (cSec * secProgress) }}
                transition={{ type: "tween", ease: "linear", duration: 0.3 }}
                />
                <circle cx={Math.cos(2 * Math.PI * secProgress) * rSec} cy={Math.sin(2 * Math.PI * secProgress) * rSec} r="5" fill="#fff" className="drop-shadow-[0_0_15px_#8b5cf6]" />

                {/* Glowing Minutes Ring & Tip */}
                <motion.circle 
                cx="0" cy="0" r={rMin} fill="none" strokeWidth="8" strokeLinecap="round"
                className="stroke-rose-500" filter="url(#glow-min)"
                initial={{ strokeDasharray: `${cMin} ${cMin}`, strokeDashoffset: cMin }}
                animate={{ strokeDashoffset: cMin - (cMin * minProgress) }}
                transition={{ type: "tween", ease: "easeOut", duration: 1 }}
                />
                <circle cx={Math.cos(2 * Math.PI * minProgress) * rMin} cy={Math.sin(2 * Math.PI * minProgress) * rMin} r="7" fill="#fff" className="drop-shadow-[0_0_15px_#f43f5e]" />

                {/* Glowing Hours Ring & Tip */}
                <motion.circle 
                cx="0" cy="0" r={rHr} fill="none" strokeWidth="10" strokeLinecap="round"
                className="stroke-blue-500" filter="url(#glow-hr)"
                initial={{ strokeDasharray: `${cHr} ${cHr}`, strokeDashoffset: cHr }}
                animate={{ strokeDashoffset: cHr - (cHr * hrProgress) }}
                transition={{ type: "tween", ease: "easeOut", duration: 1 }}
                />
                <circle cx={Math.cos(2 * Math.PI * hrProgress) * rHr} cy={Math.sin(2 * Math.PI * hrProgress) * rHr} r="9" fill="#fff" className="drop-shadow-[0_0_15px_#3b82f6]" />
            </svg>

            {/* Center Digital Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white mt-1 translate-y-1 drop-shadow-2xl font-black">
                <div className="flex items-baseline gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span className="text-4xl md:text-6xl font-black tabular-nums tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                    {hours}:{minutes}
                </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 border-t border-white/10 pt-1">
                <span className="text-xl md:text-2xl tabular-nums font-bold text-violet-400 drop-shadow-md" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{seconds}</span>
                <span className="text-[10px] font-extrabold text-neutral-400 tracking-widest pt-0.5 uppercase">{ampm}</span>
                <span className="text-[9px] font-black text-violet-300 ml-1 bg-violet-500/10 backdrop-blur-md px-2 py-0.5 rounded-md border border-violet-500/20 shadow-lg">{activeZoneData.label}</span>
                </div>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT: HIGH-TECH INFORMATION DISPLAY --- */}
        <motion.div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col items-center lg:items-start gap-8 w-full max-w-md">
          {/* Zone Selector */}
          <div className="flex glass-card p-1.5 rounded-full border border-white/5 w-full gap-2 shadow-2xl">
            {zones.map((zone) => (
              <button
                key={zone.name}
                onClick={() => setSelectedZone(zone.name)}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-full transition-all duration-500 relative z-10 ${
                  selectedZone === zone.name 
                  ? 'text-white font-black shadow-[0_10px_30px_rgba(124,58,237,0.3)] scale-[1.02]' 
                  : 'bg-transparent text-neutral-500 hover:text-white hover:bg-white/5 group font-bold'
                }`}
              >
                <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full overflow-hidden flex-shrink-0 border-2 shadow-sm transition-all duration-500 ${selectedZone === zone.name ? 'border-transparent saturate-100' : 'border-white/10 saturate-0 opacity-50 group-hover:saturate-100 group-hover:opacity-100 group-hover:border-white/20'}`}>
                    <img 
                      src={zone.flag} 
                      alt={zone.name} 
                      className="w-full h-full object-cover"
                    />
                </div>
                <span className="text-sm tracking-widest uppercase">{zone.name}</span>
                
                {selectedZone === zone.name && (
                    <motion.div 
                        layoutId="active-pill-bg-premium"
                        className="absolute inset-0 bg-violet-600 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                )}
              </button>
            ))}
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#121212]/40 border border-white/10 text-white/90 text-xs font-black tracking-[0.2em] uppercase shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_#34d399]"></span>
            </span>
            Live Regional Sync Active
          </div>

          <div className="text-center lg:text-left drop-shadow-2xl">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {days[localizedDate.getDay()]}
            </h2>
            <p className="text-xl md:text-2xl text-neutral-400 font-medium tracking-wide">
              {months[localizedDate.getMonth()]} <span className="text-white font-black">{localizedDate.getDate()}</span>, {localizedDate.getFullYear()}
            </p>
          </div>

          {/* Glowing Digital Dashboard Counter Cards */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 w-full mt-4 perspective-[1000px]">
            {[
              { label: 'Hours', val: hours, color: 'blue' },
              { label: 'Minutes', val: minutes, color: 'indigo' },
              { label: 'Seconds', val: seconds, color: 'violet' }
            ].map((item, idx) => (
              <motion.div key={item.label} whileHover={{ y: -5, scale: 1.05, rotateX: 10, translateZ: 20 }} className={`group/card flex flex-col p-6 rounded-3xl glass-card border border-white/5 backdrop-blur-md shadow-xl transition-all duration-300 relative overflow-hidden`} style={{ willChange: "transform" }}>
                {/* Glow ring */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br from-${item.color}-600/0 via-${item.color}-600/30 to-transparent rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`} />
                <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-600/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`}></div>
                
                <span className={`text-[11px] uppercase tracking-[0.3em] text-${item.color}-400 font-black mb-2 relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`}>{item.label}</span>
                <span className="text-4xl md:text-5xl font-black text-white tabular-nums drop-shadow-2xl relative z-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.val}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Clock;
