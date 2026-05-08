import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import spotifyTracks from '../spotifyTracks.json';

const SpotifyMusicCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const updateSong = async () => {
      // Calculate Day of the Year
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      // Pick song from our local verified list
      const targetTrack = spotifyTracks[dayOfYear % spotifyTracks.length];
      
      // Initialize with local data
      setCurrentSong({
        ...targetTrack,
        album: "Heaven✨💖" // Your playlist name
      });

      // Try to fetch a high-quality cover image via Spotify OEmbed (No API key needed)
      try {
        const oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(targetTrack.url)}`;
        const response = await fetch(oembedUrl);
        const data = await response.json();
        
        if (data.thumbnail_url) {
          setCurrentSong(prev => ({
            ...prev,
            thumbnail: data.thumbnail_url
          }));
        }
      } catch (e) {
        console.error("OEmbed fetch failed, using fallback thumbnail");
      }
    };

    updateSong();
  }, []);
  
  return (
    <div 
      className="fixed bottom-6 left-6 z-[100] flex flex-col items-start drop-shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && currentSong && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-[320px] origin-bottom-left relative group select-none cursor-pointer"
          >
            <a href={currentSong.url} target="_blank" rel="noopener noreferrer" className="block relative">
              <div className="glass-card w-full p-5 shadow-xl overflow-hidden">
                 {/* Spotify Green glowing backgrounds */}
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1DB954]/20 rounded-full blur-[50px] -z-10 mix-blend-screen pointer-events-none"></div>
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1DB954]/5 rounded-full blur-[40px] -z-10 mix-blend-screen pointer-events-none"></div>
                 
                 {/* Top Header */}
                 <div className="flex justify-between items-center mb-5 relative z-10 w-full">
                    <div className="flex items-center gap-2">
                       <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#1DB954]/20 text-[#1DB954]">
                          {/* Spotify Logo SVG */}
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                             <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.215.353-.674.464-1.027.249-2.846-1.74-6.429-2.13-10.648-1.168-.404.093-.812-.162-.905-.565-.093-.404.162-.812.565-.905 4.615-1.055 8.57-.611 11.764 1.343.353.215.464.674.251 1.026zm1.464-3.259c-.27.441-.845.58-1.286.31-3.259-2-8.232-2.585-12.088-1.414-.497.151-1.024-.131-1.175-.628s.131-1.024.628-1.175c4.409-1.338 9.894-.688 13.626 1.606.441.27.58.845.31 1.286v.015zm.136-3.415c-3.911-2.323-10.355-2.536-14.126-1.391-.599.182-1.234-.158-1.416-.757-.182-.599.158-1.234.757-1.416 4.316-1.31 11.439-1.06 15.901 1.588.54.321.716 1.016.395 1.556-.321.54-1.016.716-1.556.395l-.055.025z"/>
                          </svg>
                       </div>
                       <span className="text-black dark:text-white font-bold text-sm tracking-wide shadow-sm">Listening on Spotify</span>
                    </div>
                    
                    {/* Animated visualizer */}
                    <div className="flex items-end gap-[3px] h-3.5">
                       <motion.div animate={{ height: ["40%", "100%", "60%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} className="w-1 bg-[#1DB954] rounded-sm"></motion.div>
                       <motion.div animate={{ height: ["80%", "40%", "100%", "60%", "80%"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.15 }} className="w-1 bg-[#1DB954] rounded-sm"></motion.div>
                       <motion.div animate={{ height: ["50%", "100%", "30%", "80%", "50%"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.3 }} className="w-1 bg-[#1DB954] rounded-sm"></motion.div>
                       <motion.div animate={{ height: ["100%", "60%", "90%", "40%", "100%"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.45 }} className="w-1 bg-[#1DB954] rounded-sm"></motion.div>
                    </div>
                 </div>

                 {/* Content row */}
                 <div className="flex gap-4 items-center mb-6 relative z-10 w-full">
                    {/* Album Art Container */}
                    <div className="relative shrink-0">
                       <div className="w-20 h-20 bg-gradient-to-br from-neutral-200 to-neutral-400 dark:from-neutral-800 dark:to-neutral-900 rounded-xl flex items-center justify-center shadow-lg border border-transparent overflow-hidden relative">
                          <img 
                            src={currentSong.thumbnail} 
                            alt="Album Cover" 
                            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                          />
                       </div>
                       {/* Status dot overlay */}
                       <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#121212] rounded-full flex items-center justify-center border-2 border-[#121212]">
                          <div className="w-2.5 h-2.5 bg-[#1DB954] rounded-full shadow-[0_0_8px_#1DB954]"></div>
                       </div>
                    </div>

                    {/* Text Info */}
                    <div className="flex flex-col flex-1 min-w-0">
                       <span className="text-[#1DB954] text-[9px] font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                          SONG OF THE DAY
                       </span>
                       <h3 className="text-black dark:text-white text-[16px] font-extrabold truncate leading-tight mb-0.5 tracking-tight shadow-sm">
                          {currentSong.title}
                       </h3>
                       <p className="text-neutral-600 dark:text-neutral-400 text-[14px] font-medium truncate leading-tight mb-0.5">
                          {currentSong.artist}
                       </p>
                       <p className="text-neutral-500 text-[11px] truncate leading-tight">
                          {currentSong.album}
                       </p>
                    </div>
                 </div>

                 {/* Progress Bar (Fake but looks cool) */}
                 <div className="relative z-10 w-full mb-4">
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: "65%" }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="h-full bg-[#1DB954]"
                        />
                    </div>
                    <div className="flex justify-between mt-1.5">
                        <span className="text-[10px] text-neutral-500">2:45</span>
                        <span className="text-[10px] text-neutral-500">4:10</span>
                    </div>
                 </div>

                 {/* Footer */}
                 <div className="flex justify-between items-center relative z-10 w-full pt-1">
                    <div className="flex gap-3">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-neutral-500 hover:text-[#1DB954] cursor-pointer transition-colors">
                            <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
                        </svg>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-neutral-500 hover:text-[#1DB954] cursor-pointer transition-colors">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                       <span className="text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 text-[10px] tracking-widest font-bold uppercase">
                          Open Spotify
                       </span>
                       <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1DB954]">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                       </svg>
                    </div>
                 </div>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsHovered(!isHovered)}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 relative ${
          isHovered ? 'bg-[#1DB954] shadow-[#1DB954]/40 hover:shadow-[#1DB954]/60' : 'bg-slate-900/80 backdrop-blur-md border border-transparent hover:border-[#1DB954]/50'
        }`}
      >
        <svg 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          className="transition-colors duration-300 relative z-10"
          fill={isHovered ? "white" : "#1DB954"}
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.215.353-.674.464-1.027.249-2.846-1.74-6.429-2.13-10.648-1.168-.404.093-.812-.162-.905-.565-.093-.404.162-.812.565-.905 4.615-1.055 8.57-.611 11.764 1.343.353.215.464.674.251 1.026zm1.464-3.259c-.27.441-.845.58-1.286.31-3.259-2-8.232-2.585-12.088-1.414-.497.151-1.024-.131-1.175-.628s.131-1.024.628-1.175c4.409-1.338 9.894-.688 13.626 1.606.441.27.58.845.31 1.286v.015zm.136-3.415c-3.911-2.323-10.355-2.536-14.126-1.391-.599.182-1.234-.158-1.416-.757-.182-.599.158-1.234.757-1.416 4.316-1.31 11.439-1.06 15.901 1.588.54.321.716 1.016.395 1.556-.321.54-1.016.716-1.556.395l-.055.025z"/>
        </svg>
        {/* Subtle ring effect when not hovered to draw attention */}
        {!isHovered && (
          <div className="absolute inset-0 rounded-full border border-[#1DB954]/30 animate-ping opacity-30"></div>
        )}
      </motion.button>
    </div>
  );
};

export default SpotifyMusicCard;
