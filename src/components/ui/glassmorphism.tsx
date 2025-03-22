import React from "react";
import { motion } from "framer-motion";
import classNames from 'classnames';

interface GlassmorphismProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'light' | 'medium' | 'heavy';
  borderStyle?: 'none' | 'thin' | 'glowing';
  className?: string;
  children?: React.ReactNode;
}

export function Glassmorphism({
  children,
  intensity = 'medium',
  borderStyle = 'thin',
  className,
  ...props
}: GlassmorphismProps) {
  const intensityClasses = {
    light: 'bg-white/30 dark:bg-gray-900/30 backdrop-blur-md',
    medium: 'bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl',
    heavy: 'bg-white/60 dark:bg-gray-900/50 backdrop-blur-2xl',
  };

  const borderClasses = {
    none: 'border-0',
    thin: 'border border-white/20 dark:border-white/10',
    glowing: 'border border-white/30 dark:border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.5)] dark:shadow-[0_0_15px_rgba(59,130,246,0.3)]',
  };

  return (
    <div
      className={classNames(
        intensityClasses[intensity],
        borderClasses[borderStyle],
        'rounded-2xl shadow-xl',
        className
      )}
      {...props}
    >
      {/* Background blur effect */}
      <div 
        className="absolute inset-0 z-0 bg-white/50 backdrop-blur-xl dark:bg-gray-900/50"
        aria-hidden="true"
      />
      
      {/* Gradient orbs */}
      <div className="absolute -top-24 -left-20 z-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 opacity-20 blur-3xl filter dark:from-blue-700 dark:to-indigo-700" />
      <div className="absolute -bottom-24 -right-20 z-0 h-96 w-96 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 blur-3xl filter dark:from-purple-700 dark:to-pink-700" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
      
      {/* Moving particles */}
      <Particles />
    </div>
  );
}

function Particles() {
  return (
    <div className="absolute inset-0 z-5 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 left-0 h-2 w-2 rounded-full bg-blue-500/30 dark:bg-blue-300/20"
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ 
            width: `${Math.random() * 10 + 2}px`,
            height: `${Math.random() * 10 + 2}px`,
          }}
        />
      ))}
    </div>
  );
} 