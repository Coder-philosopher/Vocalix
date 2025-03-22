import React from 'react';

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i}
          className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-${i+1}`}
          style={{
            width: `${Math.random() * 400 + 100}px`,
            height: `${Math.random() * 400 + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, 255, 0.4), rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100)}, 255, 0.2))`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${Math.random() * 20 + 20}s`
          }}
        />
      ))}
    </div>
  );
}

export function HexagonGrid() {
  return (
    <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2) rotate(0)">
            <polygon points="25,0 50,14.4 50,43.4 25,58 0,43.4 0,14.4" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
} 