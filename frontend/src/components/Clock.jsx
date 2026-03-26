import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Clock = () => {
  const [selectedZone, setSelectedZone] = useState('India');
  const [time, setTime] = useState(new Date());

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

  // Helper to format time for a specific timezone
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

  // Progress for radial dials (0.0 to 1.0)
  const secProgress = localizedDate.getSeconds() / 60;
  const minProgress = localizedDate.getMinutes() / 60;
  // Hours progress smoothly interpolates based on minutes passed
  const hrProgress = (hours12 + localizedDate.getMinutes() / 60) / 12; 

  // Dynamic SVG circle circumferences
  const rSec = 110;
  const cSec = 2 * Math.PI * rSec;
  
  const rMin = 85;
  const cMin = 2 * Math.PI * rMin;

  const rHr = 60;
  const cHr = 2 * Math.PI * rHr;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const MapVisual = ({ zone }) => {
    // Simplified SVG paths for regions
    const maps = {
      'India': 'M12 2L10 5L7 4L8 7L5 8L6 11L3 12L6 13L5 16L8 17L7 20L10 19L12 22L14 19L17 20L16 17L19 16L18 13L21 12L18 11L19 8L16 7L17 4L14 5L12 2Z', // Dummy paths, will use better ones
      'USA': 'M2 6L4 4L8 4L11 2L14 4L18 4L22 6L22 14L20 18L16 20L8 20L4 18L2 14V6Z',
      'UK': 'M12 2L14 4V8L16 10L14 14L12 18L10 14L8 10L10 8V4L12 2Z'
    };
    
    // Using actual high-quality silhouettes (simplified)
    const silhouettes = {
        'India': 'M82.2,295.6l-2-5.4l-4.2,0.8l-1.6-4.9l-4.1,3.4l-5.3-2.6L63,284l1-5.7l-4.5-2.6l-0.6-5.8l-5.3-0.9L51.8,264l-4.8,3.2l-3-6.2 l-7.4,1.8l0.4-10.1l-6.2,1l0-6.1l-7.2-2.3l4.5-5.3l-4.3-5.2l7.1-1.3l-0.5-8.5l7.5-1l-3.2-11.4l5.3-7.5l-4-5l6.5-1.5l0.7-9.3l9.6-1.5 l3.3-8.4l14.1,2.8l7.5-13.3l5.8,11.3l12.4,5.4l7.1,5.3l13.5-3l1.5,14.6l-10-0.4l3.5,18.7l-5.4,3.1l2.5,3.9l-6.1,2.3l0.3,16.7l-6.6-4 l-9,16.6l9.3,12l-10,1.3l1,5l-5.6,8.2l4.8,21.6l-5,5.1l5,4.7l-4.2,3.3L82.2,295.6z',
        'USA': 'M1.6,27.5l5.2-10l12.1-5.1l15.1,1.7l11,5.4l16.1,1l18.4-1.9l16,1.4l11.6,12.7l16.3,1.9l18.1,7.8l5.6,18.3l1.1,11.3l-5.1,12.5 l0.4,14.9l-7.5,6.5l-10.3,0l-14.8,8.2l-14.9,2.4L95,123.6l-11.3,7.5l-20.9-1l-10.4,14l-14,3.9l-19.1,10.6l-11,2.4L1,143l1,19 l-10.4,2.9l-8.4-4L1.6,27.5z',
        'UK': 'M49.4,4.1l11.4,10.1l4.4,28L63,48.8l-1.9,13.8l5.8,16.2L63,91.3l6,11.7l-8,14.7l2.1,10.1l-11.4,12l-7-3.9l-11.7,3 L26.3,132l-14.8-11.4l1.6-11.7l-13.1-4L1.3,86.6L3,75.4l9-10.9L7.5,56l1.3-17.5l14.8-13.4l10.8-14.1l10.1-5.6L49.4,4.1z'
    };

    return (
      <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none overflow-hidden pr-4 md:pr-12">
        <motion.svg 
          key={zone}
          initial={{ scale: 0.8, opacity: 0, rotateY: 30 }}
          animate={{ scale: 1.2, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewBox="0 0 300 300" 
          className="w-full h-full fill-white drop-shadow-[0_0_80px_rgba(255,255,255,0.2)]"
        >
          <path d={silhouettes[zone] || silhouettes['India']} />
        </motion.svg>

        {/* Floating holographic label */}
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

  return (
    <div className="w-full overflow-hidden w-screen relative left-1/2 -translate-x-1/2 py-24 md:py-32 bg-[#0a0a0a]/50 border-t border-b border-white/5 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 shadow-2xl group transition-transform duration-500 ease-out perspective-1000 mt-20">
      
      <MapVisual zone={selectedZone} />
      
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
            <div className="flex items-center gap-1.5 mt-1 border-t border-white/10 pt-1">
              {/* Dynamic Seconds Number */}
              <span className="text-xl tabular-nums font-bold text-violet-400 drop-shadow-md">{seconds}</span>
              <span className="text-[10px] font-extrabold text-neutral-400 tracking-widest pt-0.5 uppercase">{ampm}</span>
              <span className="text-[9px] font-black text-white/40 ml-1 bg-white/5 px-1.5 py-0.5 rounded-md border border-white/10">{activeZoneData.label}</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT: HIGH-TECH INFORMATION DISPLAY --- */}
        <div className="relative z-10 flex flex-col items-center lg:items-start gap-8 w-full max-w-md">
          {/* Zone Selector - Replicated from User Screenshot */}
          <div className="flex bg-[#0a0a0a] p-1.5 rounded-full border border-white/5 w-full gap-2 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
            {zones.map((zone) => (
              <button
                key={zone.name}
                onClick={() => setSelectedZone(zone.name)}
                className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full transition-all duration-500 relative z-10 ${
                  selectedZone === zone.name 
                  ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.15)]' 
                  : 'bg-[#121212]/30 text-neutral-500 hover:text-white group'
                }`}
              >
                <div className={`w-6 h-6 md:w-7 md:h-7 rounded-md overflow-hidden flex-shrink-0 border border-white/10 shadow-sm transition-all duration-500 ${selectedZone === zone.name ? 'saturate-100' : 'saturate-0 opacity-50 group-hover:saturate-100 group-hover:opacity-100'}`}>
                    <img 
                      src={zone.flag} 
                      alt={zone.name} 
                      className="w-full h-full object-cover"
                    />
                </div>
                <span className="text-sm font-black tracking-tight uppercase md:normal-case">{zone.name}</span>
                
                {selectedZone === zone.name && (
                    <motion.div 
                        layoutId="active-pill-bg"
                        className="absolute inset-0 bg-white rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 35 }}
                    />
                )}
              </button>
            ))}
          </div>

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
              {days[localizedDate.getDay()]}
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 font-medium tracking-wide">
              {months[localizedDate.getMonth()]} <span className="text-white font-bold">{localizedDate.getDate()}</span>, {localizedDate.getFullYear()}
            </p>
          </div>

          {/* Glowing Digital Dashboard Counter Cards */}
          <div className="grid grid-cols-3 gap-3 md:gap-5 w-full mt-2">
            {[
              { label: 'Hours', val: hours, color: 'blue' },
              { label: 'Minutes', val: minutes, color: 'rose' },
              { label: 'Seconds', val: seconds, color: 'violet' }
            ].map((item) => (
              <motion.div key={item.label} whileHover={{ y: -3 }} className={`group/card flex flex-col p-4 md:p-5 rounded-2xl bg-[#121212]/5 hover:bg-[#121212]/10 border border-transparent backdrop-blur-md shadow-xl transition-colors duration-300 relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-${item.color}-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300`}></div>
                <span className={`text-[10px] uppercase tracking-widest text-${item.color}-400 font-extrabold mb-1 relative z-10`}>{item.label}</span>
                <span className="text-3xl font-black text-white tabular-nums drop-shadow-md relative z-10">{item.val}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Clock;
