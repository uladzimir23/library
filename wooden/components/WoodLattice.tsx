
import React from 'react';

interface Props {
  mousePos: { x: number; y: number };
  theme: 'dark' | 'light';
}

export const WoodLattice: React.FC<Props> = ({ mousePos, theme }) => {
  const isDark = theme === 'dark';
  
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000 ${isDark ? 'opacity-10' : 'opacity-5'}`}>
      <svg className="w-full h-full">
        <defs>
          <radialGradient id="woodGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isDark ? "#ffffff" : "#000000"} stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        
        {Array.from({ length: 40 }).map((_, i) => {
          const x = (i / 39) * 100;
          const dist = Math.abs(mousePos.x - (x * window.innerWidth) / 100);
          const pull = Math.max(0, 1 - dist / 600);
          
          return (
            <path 
              key={`fiber-${i}`}
              d={`M ${x}% 0 L ${x + (mousePos.x / window.innerWidth - x/100)*pull*2}% 100%`}
              fill="none"
              stroke={isDark ? "#ffffff" : "#000000"}
              strokeWidth="0.3"
              opacity={0.1 + pull * 0.2}
            />
          );
        })}

        <circle 
          cx={mousePos.x} 
          cy={mousePos.y} 
          r="600" 
          fill="url(#woodGlow)" 
        />
      </svg>
    </div>
  );
};
