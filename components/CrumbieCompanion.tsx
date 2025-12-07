"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function CrumbieCompanion() {
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("Hi! I'm Crumbie! 🧠✨");
  const [isHovered, setIsHovered] = useState(false);

  // Rotate helpful messages
  useEffect(() => {
    const messages = [
      "Exploring the future? Me too!",
      "Don't forget to check the deep dives!",
      "Need a mental snack? Have a thought-crumb! 🍪",
      "Crypto is confusing, but we got this.",
      "Curiosity is the best fuel for your brain.",
      "I love diagrams! Do you?",
      "Floating is my favorite cardio."
    ];
    
    const interval = setInterval(() => {
      if (!isHovered) {
         const randomMsg = messages[Math.floor(Math.random() * messages.length)];
         setMessage(randomMsg);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isHovered]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:block">
      {/* Message Bubble */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={message}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          className="absolute bottom-full right-0 mb-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-2xl rounded-br-none shadow-[0_0_20px_rgba(139,92,246,0.3)] w-52 text-sm font-medium relative pointer-events-none select-none"
        >
          {message}
          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white/10 border-r border-b border-white/20 transform rotate-45" />
        </motion.div>
      </AnimatePresence>

      {/* Crumbie Character */}
      <motion.div
        drag
        dragConstraints={{ left: -200, right: 0, top: -500, bottom: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 3, -3, 0]
        }}
        transition={{ 
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="cursor-grab active:cursor-grabbing relative group"
      >
        <div className="relative w-28 h-28">
            {/* Close button (visible on hover) */}
            <button 
                onClick={() => setIsVisible(false)}
                className="absolute -top-2 -right-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Dismiss Crumbie"
            >
                <X size={14} />
            </button>

            {/* Brain Body SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_25px_rgba(236,72,153,0.6)] overflow-visible">
                <defs>
                    <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" /> {/* Pink-500 */}
                        <stop offset="100%" stopColor="#8b5cf6" /> {/* Purple-500 */}
                    </linearGradient>
                </defs>
                
                {/* Main Brain Shape - Cloud-like */}
                <path 
                    d="M20 50 C 15 30, 30 10, 50 15 C 70 10, 85 30, 80 50 C 90 65, 75 90, 50 90 C 25 90, 10 65, 20 50 Z" 
                    fill="url(#brainGradient)" 
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                />
                
                {/* Brain folds/gyri */}
                <path d="M35 35 Q 50 25 65 35" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
                <path d="M30 50 Q 50 45 70 50" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
                <path d="M35 65 Q 50 75 65 65" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />

                {/* Eyes (Nerdy & Cute) */}
                <g transform="translate(0, 5)">
                  {/* Left Eye */}
                  <circle cx="40" cy="50" r="7" fill="white" />
                  <circle cx="40" cy="50" r="3" fill="black">
                    <animate attributeName="cx" values="39;41;39" dur="4s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Right Eye */}
                  <circle cx="60" cy="50" r="7" fill="white" />
                  <circle cx="60" cy="50" r="3" fill="black">
                    <animate attributeName="cx" values="59;61;59" dur="4s" repeatCount="indefinite" />
                  </circle>

                  {/* Glasses (Nerdy) */}
                  <circle cx="40" cy="50" r="10" stroke="black" strokeWidth="1.5" fill="rgba(255,255,255,0.1)" />
                  <circle cx="60" cy="50" r="10" stroke="black" strokeWidth="1.5" fill="rgba(255,255,255,0.1)" />
                  <line x1="50" y1="50" x2="50" y2="50" stroke="black" strokeWidth="1.5" /> {/* Bridge */}
                  <path d="M50 50 Q 50 48 50 50" stroke="black" strokeWidth="1.5" />
                </g>

                {/* Smile */}
                <path d="M45 68 Q 50 72 55 68" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
            
            {/* Crumb Blaster Pouch - Accessory */}
            <motion.div 
               className="absolute bottom-2 right-0 text-2xl filter drop-shadow-lg"
               animate={{ rotate: [0, 10, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
            >
               👜
            </motion.div>

            {/* Sparkle Trail Particles */}
            <motion.div 
               animate={{ 
                 y: [0, -20, 0], 
                 x: [0, 5, 0], 
                 opacity: [0, 1, 0], 
                 scale: [0, 1, 0]
               }}
               transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
               className="absolute top-0 left-0"
            >
                <Sparkles size={12} className="text-yellow-300" />
            </motion.div>
            <motion.div 
               animate={{ 
                 y: [0, -15, 0], 
                 x: [0, -10, 0], 
                 opacity: [0, 1, 0], 
                 scale: [0, 0.8, 0]
               }}
               transition={{ duration: 2, repeat: Infinity, delay: 1 }}
               className="absolute bottom-0 right-10"
            >
                <Sparkles size={10} className="text-bc-cyan" />
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
