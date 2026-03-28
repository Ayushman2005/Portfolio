import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const YouTubeMusicCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Fallback in case of API failure or loading state
  const [currentSong, setCurrentSong] = useState({
    title: "Loading...",
    artist: "Getting playlist",
    thumbnail: "https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg",
    url: "https://music.youtube.com/playlist?list=PLQdYle6qwS4nDmf7ZNZEuZGxozT_PYZyD"
  });

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const playlistId = "PLQdYle6qwS4nDmf7ZNZEuZGxozT_PYZyD";
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        const data = await response.json();

        if (data.status === 'ok' && data.items.length > 0) {
          // Calculate the day of the year
          const now = new Date();
          const start = new Date(now.getFullYear(), 0, 0);
          const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
          const oneDay = 1000 * 60 * 60 * 24;
          const dayOfYear = Math.floor(diff / oneDay);
          
          const targetSong = data.items[dayOfYear % data.items.length];
          
          // Clean up " - Topic" from YouTube music authors
          let artistName = targetSong.author;
          if (artistName.endsWith(" - Topic")) {
            artistName = artistName.replace(" - Topic", "");
          }

          setCurrentSong({
            title: targetSong.title,
            artist: artistName,
            thumbnail: targetSong.thumbnail,
            url: targetSong.link
          });
        }
      } catch (error) {
        console.error("Failed to fetch YouTube playlist:", error);
        setCurrentSong({
          title: "Blinding Lights",
          artist: "The Weeknd",
          thumbnail: "https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg",
          url: "https://music.youtube.com/watch?v=4NRXx6U8ABQ"
        });
      }
    };

    fetchPlaylist();
  }, []);

  return (
    <div 
      className="fixed bottom-6 left-6 z-[100] flex flex-col items-start drop-shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-[320px] origin-bottom-left relative group select-none cursor-pointer"
          >
            <a href={currentSong.url} target="_blank" rel="noopener noreferrer" className="block relative">
              <div className="glass-card w-full p-5 shadow-xl">
                 {/* Subtle gradient glowing backgrounds */}
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF0000]/20 rounded-full blur-[50px] -z-10 mix-blend-screen pointer-events-none"></div>
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#121212]/5 rounded-full blur-[40px] -z-10 mix-blend-screen pointer-events-none"></div>
                 
                 {/* Top Header */}
                 <div className="flex justify-between items-center mb-5 relative z-10 w-full">
                    <div className="flex items-center gap-2">
                       <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FF0000]/20 text-[#FF0000]">
                          {/* Music Note SVG */}
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                             <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                          </svg>
                       </div>
                       <span className="text-black dark:text-white font-bold text-sm tracking-wide shadow-sm">Listening to</span>
                    </div>
                    
                    {/* Animated visualizer */}
                    <div className="flex items-end gap-[3px] h-3.5">
                       <motion.div animate={{ height: ["40%", "100%", "60%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} className="w-1 bg-[#FF0000] rounded-sm"></motion.div>
                       <motion.div animate={{ height: ["80%", "40%", "100%", "60%", "80%"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.15 }} className="w-1 bg-[#FF0000] rounded-sm"></motion.div>
                       <motion.div animate={{ height: ["50%", "100%", "30%", "80%", "50%"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.3 }} className="w-1 bg-[#FF0000] rounded-sm"></motion.div>
                       <motion.div animate={{ height: ["100%", "60%", "90%", "40%", "100%"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.45 }} className="w-1 bg-[#FF0000] rounded-sm"></motion.div>
                    </div>
                 </div>

                 {/* Content row */}
                 <div className="flex gap-4 items-center mb-6 relative z-10 w-full">
                    {/* Album Art Container */}
                    <div className="relative shrink-0">
                       <div className="w-16 h-16 bg-gradient-to-br from-neutral-200 to-neutral-400 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl flex items-center justify-center shadow-lg border border-transparent overflow-hidden relative">
                          <img 
                            src={currentSong.thumbnail} 
                            alt="Album Cover" 
                            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                          />
                       </div>
                       {/* Status dot overlay matches screenshot */}
                       <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#121212] rounded-full flex items-center justify-center border-2 border-[#121212]">
                          <div className="w-2.5 h-2.5 bg-[#FF0000] rounded-full shadow-[0_0_8px_#FF0000]"></div>
                       </div>
                    </div>

                    {/* Text Info */}
                    <div className="flex flex-col flex-1 min-w-0">
                       <span className="text-[#FF0000] text-[9px] font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                          UPDATED DAILY
                       </span>
                       <h3 className="text-black dark:text-white text-[15px] font-extrabold truncate leading-tight mb-0.5 tracking-tight shadow-sm">
                          {currentSong.title}
                       </h3>
                       <p className="text-neutral-600 dark:text-neutral-400 text-[13px] font-medium truncate leading-tight mb-0.5">
                          {currentSong.artist}
                       </p>
                       <p className="text-neutral-500 text-[11px] truncate leading-tight">
                          YouTube Music | Song of the Day
                       </p>
                    </div>
                 </div>

                 {/* Footer */}
                 <div className="flex justify-between items-center relative z-10 w-full pt-1">
                    <span className="text-neutral-500 dark:text-neutral-400/80 text-[10px] font-bold tracking-[0.2em] leading-none uppercase">
                       REC
                    </span>
                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                       <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-neutral-400 dark:text-neutral-500 group-hover:text-[#FF0000] transition-colors duration-300">
                         <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                         <path d="M10 8v8l6-4z"/>
                       </svg>
                       <span className="text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 text-[10px] tracking-widest font-bold lowercase">
                          youtube music
                       </span>
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
          isHovered ? 'bg-[#FF0000] shadow-[#FF0000]/40 hover:shadow-[#FF0000]/60' : 'bg-slate-900/80 backdrop-blur-md border border-transparent hover:border-[#FF0000]/50'
        }`}
      >
        <svg 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          className="transition-colors duration-300 relative z-10"
          fill={isHovered ? "white" : "#FF0000"}
        >
          {/* Inner play button icon */}
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
          <path d="M10 8v8l6-4z"/>
        </svg>
        {/* Subtle ring effect when not hovered to draw attention */}
        {!isHovered && (
          <div className="absolute inset-0 rounded-full border border-[#FF0000]/30 animate-ping opacity-30"></div>
        )}
      </motion.button>
    </div>
  );
};

export default YouTubeMusicCard;
