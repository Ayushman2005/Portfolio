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

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setTimeout(() => {
          setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: "Please add your VITE_GEMINI_API_KEY in the .env file to enable AI responses!" }]);
          setIsTyping(false);
        }, 1000);
        return;
      }

      const history = messages.slice(1).map(m => ({
        role: m.type === 'bot' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));
      history.push({ role: 'user', parts: [{ text: userText }] });

      const payload = {
        system_instruction: {
          parts: { text: `You are Ayushman's AI Assistant. You must answer all questions SHORTLY and concisely (max 2-3 sentences). The current date and time is ${new Date().toLocaleString()}. Here is his portfolio data: ${JSON.stringify(portfolioData)}. Use this to answer questions about him, but you can also answer general questions like what the time is.` }
        },
        contents: history,
        generationConfig: {
          maxOutputTokens: 800,
        }
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const responseText = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: responseText }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: "Sorry, I encountered an error connecting to the AI. Please check your API key." }]);
    } finally {
      setIsTyping(false);
    }
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
