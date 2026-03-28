import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data';

const initialMessages = [
  {
    id: 1,
    type: 'bot',
    text: `Hi there! 👋 I'm Ayushman's AI Assistant. How can I help you explore his portfolio today?`
  }
];

const getBotResponseFromText = (text) => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('project') || lowerText.includes('build') || lowerText.includes('work') || lowerText.includes('portfolio') || lowerText.includes('made')) {
    const projectNames = portfolioData.projects.map(p => `• **${p.title}**`).join('\n');
    return `Here are some of his top projects:\n${projectNames}\n\nYou can find more details in the Projects section!`;
  }
  
  if (lowerText.includes('skill') || lowerText.includes('tech') || lowerText.includes('tool') || lowerText.includes('language') || lowerText.includes('framework') || lowerText.includes('know')) {
    const skillsList = portfolioData.skills.map(s => s.name).join(', ');
    return `Ayushman is highly skilled in: ${skillsList}. He actively uses Python, C++, React, Node.js, and Flask to build scalable applications.`;
  }
  
  if (lowerText.includes('experience') || lowerText.includes('cert') || lowerText.includes('achieve') || lowerText.includes('hackathon') || lowerText.includes('intern') || lowerText.includes('job') || lowerText.includes('work')) {
    return `He is an active member of GDG on Campus and the Cyber Security Club at GIETU. He was also a hackathon finalist (PS-HK19) and holds an NPTEL certification in C Programming from IIT Kharagpur!`;
  }
  
  if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('phone') || lowerText.includes('hire') || lowerText.includes('reach') || lowerText.includes('talk') || lowerText.includes('message')) {
    return `You can reach him at ${portfolioData.email} or call ${portfolioData.phone}. Connect with him on LinkedIn or check out his GitHub (@Ayushman2005).`;
  }
  
  if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey') || lowerText.includes('greetings')) {
    return "Hello! I can tell you about Ayushman's projects, skills, experience, or contact information. What would you like to know?";
  }
  
  if (lowerText.includes('who') || lowerText.includes('about') || lowerText.includes('education') || lowerText.includes('university') || lowerText.includes('study') || lowerText.includes('student') || lowerText.includes('background')) {
      return `Ayushman is an undergraduate Computer Engineering student at GIET University (2024–2028). He specializes in Machine Learning, AI, and Full Stack Development.`;
  }

  return "I'm not exactly sure what you mean, but you can ask me about his **projects**, **skills**, **experience**, or **contact** info!";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: userText }]);
    setIsTyping(true);

    // Simulate bot thinking/typing
    setTimeout(() => {
      const responseText = getBotResponseFromText(userText);
      setIsTyping(false);
      
      setMessages(prev => [
        ...prev, 
        { id: Date.now(), type: 'bot', text: responseText }
      ]);

    }, 1000);
  };

  const renderTextWithFormatting = (text) => {
    // Basic bold formatting for **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-[320px] md:w-[380px] h-[500px] max-h-[70vh] glass-card shadow-2xl overflow-hidden flex flex-col border border-white/10"
          >
            {/* Header */}
            <div className="bg-[#050505] border-b border-white/10 p-4 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-violet-500/10 opacity-50"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">Ayushman's Assistant</h3>
                  <p className="text-green-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors relative z-10"
              >
                <X className="w-4 h-4 text-slate-300" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-900/30 backdrop-blur-sm">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className="shrink-0 mt-1">
                      {msg.type === 'user' ? (
                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50">
                          <User className="w-3 h-3 text-indigo-400" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center shadow-sm">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    {/* Bubble */}
                    <div className={`p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                      msg.type === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-sm' 
                        : 'bg-white/5 border border-white/5 text-slate-300 rounded-tl-sm'
                    }`}>
                      <div className="whitespace-pre-wrap font-medium">
                        {renderTextWithFormatting(msg.text)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center shadow-sm">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm flex items-center gap-1.5 h-[38px]">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Options / Input Area */}
            <div className="bg-[#050505] p-3 border-t border-white/10 shrink-0">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-[#121212] border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1.5 w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 -ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 relative bg-violet-600 shadow-violet-600/40 hover:shadow-violet-600/60 z-10"
      >
        <MessageSquare className="w-6 h-6 text-white absolute" />
        <div className="absolute inset-0 rounded-full border border-violet-400/30 animate-ping opacity-30"></div>
      </motion.button>
    </div>
  );
};

export default Chatbot;
