import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, Phone, Mail, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const KNOWLEDGE_BASE = [
  {
    keywords: ['who', 'about', 'awais', 'introduce', 'background', 'bio'],
    response: "Awais Iqbal is a Website Development Specialist with 3+ years of professional experience delivering 50+ modern, high-performance web applications. He specializes in React, Next.js, Three.js 3D web designs, and conversion-focused eCommerce.",
  },
  {
    keywords: ['skill', 'stack', 'technolog', 'framework', 'react', 'next', 'node', 'tools'],
    response: "Awais's primary tech stack includes:\n• Frontend: React 19, Next.js 14/15, TypeScript, Tailwind CSS, Vite\n• 3D & Motion: Three.js, React Three Fiber, Framer Motion, GSAP, WebGL\n• Backend & APIs: Node.js, Express, PostgreSQL, MongoDB, REST/GraphQL\n• CMS & Commerce: Shopify, Sanity CMS, Stripe",
  },
  {
    keywords: ['project', 'work', 'portfolio', 'showcase', 'built', 'samples'],
    response: "Awais has built several featured showcases:\n1. Nova Luxe Commerce (Luxury eCommerce)\n2. Apex Metric Dashboard (Real-time SaaS analytics)\n3. Vortex 3D Creative Studio (WebGL interactive experience)\n4. SyncFlow Workspace (Collaboration platform)\nCheck them out in the Featured Projects section above!",
  },
  {
    keywords: ['price', 'cost', 'quote', 'rate', 'hire', 'pricing', 'budget'],
    response: "Awais offers competitive, milestone-based pricing and hourly rates depending on the project scope. Right now, there is an active 20% discount (code: VIBE20) for new projects! You can request a quote by sending a quick message below.",
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'call', 'talk'],
    response: "You can reach Awais directly via:\n📧 Email: vcwithawais@gmail.com\n📱 Phone: +92 300 123 4567\nOr feel free to send a message through the contact form on this page.",
  },
  {
    keywords: ['offer', 'discount', 'promo', 'coupon', 'deal'],
    response: "🎉 Yes! Awais is offering a 20% discount on new website development and 3D web projects using code 'VIBE20'. Click 'Claim Offer' or mention it when contacting him!",
  },
  {
    keywords: ['available', 'availability', 'freelance', 'full time', 'remote'],
    response: "Awais is currently available for freelance contracts, full-time remote engineering positions, and agency consultations worldwide.",
  },
];

const DEFAULT_GREETING = "Hello! 👋 I'm Awais's AI Assistant. How can I help you today? Feel free to ask about his skills, projects, rates, or availability.";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: DEFAULT_GREETING, time: 'Just now' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { addMessage } = usePortfolio();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const findAnswer = (query) => {
    const lower = query.toLowerCase();
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => lower.includes(kw))) {
        return item.response;
      }
    }
    return "Thanks for asking! Awais would be glad to discuss this in detail. Would you like to leave your email and message so he can get back to you directly?";
  };

  const handleSend = (textToSend) => {
    const text = typeof textToSend === 'string' ? textToSend : inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = findAnswer(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        className="chatbot-launcher"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '28px',
          left: '28px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--gradient-primary)',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 8px 30px rgba(255, 107, 0, 0.4)',
          cursor: 'pointer',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Open AI Assistant Chat"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
        {!isOpen && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#22c55e',
              border: '2px solid #0a0a0a',
            }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              bottom: '96px',
              left: '28px',
              width: '360px',
              maxWidth: 'calc(100vw - 56px)',
              height: '520px',
              maxHeight: 'calc(100vh - 120px)',
              background: '#121212',
              border: '1px solid rgba(255, 107, 0, 0.3)',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 107, 0, 0.15)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Chat Header */}
            <div style={{
              padding: '16px 20px',
              background: 'rgba(255, 107, 0, 0.08)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}>
                  <Bot size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff' }}>
                    Awais AI Assistant
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                    Online • 24/7 Support
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Prompt Suggestions */}
            <div style={{
              padding: '10px 14px',
              background: 'rgba(0,0,0,0.3)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              scrollbarWidth: 'none',
            }}>
              {[
                'Who is Awais?',
                'Technical Skills',
                'Featured Projects',
                'Project Rates & Offer',
                'Contact Info',
              ].map((pill) => (
                <button
                  key={pill}
                  onClick={() => handleSend(pill)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '82%',
                      padding: '10px 14px',
                      borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      background: m.sender === 'user' ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.06)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap',
                      border: m.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                    }}
                  >
                    {m.text}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginTop: '3px', padding: '0 4px' }}>
                    {m.time}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', gap: '4px', padding: '8px 12px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '12px', width: 'fit-content' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6b00', animation: 'pulse 1s infinite' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6b00', animation: 'pulse 1s infinite 0.2s' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6b00', animation: 'pulse 1s infinite 0.4s' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <div style={{
              padding: '12px 14px',
              borderTop: '1px solid var(--border-subtle)',
              background: '#0d0d0d',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}>
              <input
                type="text"
                placeholder="Ask anything about Awais..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => handleSend()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'var(--gradient-primary)',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
