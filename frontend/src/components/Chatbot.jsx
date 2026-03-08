import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import './Chatbot.css'; // Let's just create CSS here or add to index.css

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi there! I am Ayushman\'s AI assistant.How can I help you today?' }
  ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await axios.post('/api/chat', { message: userMessage });
            setMessages((prev) => [...prev, { role: 'assistant', content: response.data.response }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Sorry, I am having trouble connecting right now. Please try again later.' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {/* Action button to open/close chat */}
            <button
                className="chatbot-toggle-btn"
                onClick={toggleChat}
                title={isOpen ? "Close Chat" : "Chat with AI"}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-header-info">
                            <Bot size={24} />
                            <div>
                                <h3 className="chatbot-title">AI Assistant</h3>
                                <span className="chatbot-status">Online</span>
                            </div>
                        </div>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chatbot-message-wrapper ${msg.role === 'user' ? 'user-wrapper' : 'assistant-wrapper'}`}
                            >
                                <div className={`chatbot-message ${msg.role}`}>
                                    {msg.role === 'assistant' ? <Bot size={16} className="msg-icon" /> : <User size={16} className="msg-icon" />}
                                    <div className="msg-content">{msg.content}</div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="chatbot-message-wrapper assistant-wrapper">
                                <div className="chatbot-message assistant typing">
                                    <Loader2 size={16} className="msg-icon spin" />
                                    <div className="msg-content">Typing...</div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="chatbot-input-area">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything about Ayushman..."
                            disabled={isLoading}
                            className="chatbot-input"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="chatbot-send-btn"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
