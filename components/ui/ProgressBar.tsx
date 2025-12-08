import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  colorClass?: string;
}

export default function ProgressBar({ progress, className = '', colorClass = 'bg-bc-blue' }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className={`w-full bg-white/10 rounded-full overflow-hidden h-2 ${className}`}>
      <div 
        className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}