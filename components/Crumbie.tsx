"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CrumbieProps {
  className?: string;
  variant?: 'logo' | 'hero' | 'section' | 'newsletter';
}

export default function Crumbie({ className, variant = 'section' }: CrumbieProps) {
  // Animation variants based on context
  const animations = {
    logo: {
      y: [0, -3, 0],
      rotate: [0, 2, -2, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    hero: {
      y: [0, -10, 0],
      scale: [1, 1.05, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    section: {
      x: [0, 5, 0],
      rotate: [0, 5, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    },
    newsletter: {
      y: [0, -5, 0],
      rotate: [0, -5, 5, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className={cn("relative inline-block select-none pointer-events-none", className)}
      animate={animations[variant]}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="crumbieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Body */}
        <path
          d="M20 50 C 15 30, 30 10, 50 15 C 70 10, 85 30, 80 50 C 90 65, 75 90, 50 90 C 25 90, 10 65, 20 50 Z"
          fill="url(#crumbieGradient)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Face Details based on variant */}
        <g transform="translate(0, 5)">
          {/* Eyes */}
          <circle cx="40" cy="50" r={variant === 'logo' ? 6 : 7} fill="white" />
          <circle cx="40" cy="50" r={variant === 'logo' ? 2.5 : 3} fill="black">
            <animate attributeName="cx" values="39;41;39" dur="3s" repeatCount="indefinite" />
          </circle>

          <circle cx="60" cy="50" r={variant === 'logo' ? 6 : 7} fill="white" />
          <circle cx="60" cy="50" r={variant === 'logo' ? 2.5 : 3} fill="black">
             <animate attributeName="cx" values="59;61;59" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* Glasses */}
          <circle cx="40" cy="50" r={variant === 'logo' ? 9 : 10} stroke="black" strokeWidth="1.5" fill="rgba(255,255,255,0.1)" />
          <circle cx="60" cy="50" r={variant === 'logo' ? 9 : 10} stroke="black" strokeWidth="1.5" fill="rgba(255,255,255,0.1)" />
          <path d="M50 50 Q 50 48 50 50" stroke="black" strokeWidth="1.5" />
        </g>

        {/* Smile */}
        <path 
          d={variant === 'newsletter' ? "M45 70 Q 50 75 55 70" : "M45 68 Q 50 72 55 68"} 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Hands/Props based on variant */}
        {variant === 'section' && (
           <path d="M75 60 Q 85 55 90 65" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" fill="none" />
        )}
        {variant === 'hero' && (
           <circle cx="85" cy="40" r="5" fill="#ffd700" opacity="0.8">
             <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
           </circle>
        )}
      </svg>
    </motion.div>
  );
}
