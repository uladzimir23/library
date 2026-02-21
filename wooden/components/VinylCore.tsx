
import React, { useState, useEffect } from 'react';
import { Disc, Activity } from 'lucide-react';

interface Props {
  theme: 'dark' | 'light';
}

export const VinylCore: React.FC<Props> = ({ theme }) => {
  const [rotation, setRotation] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setInterval(() => setRotation(prev => prev + 0.5), 20);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 30, y: x * -30 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-[450px] h-[450px] flex items-center justify-center perspective-2000 group"
    >
       <div 
         className="relative w-full h-full transition-transform duration-500 ease-out preserve-3d"
         style={{ transform: `rotateX(${10 + tilt.x}deg) rotateY(${tilt.y}deg)` }}
       >
          {/* Main Disc - Ультра-минималистичный стиль */}
          <div 
            className={`absolute inset-4 rounded-full border transition-all duration-1000 ${isDark ? 'border-white/10' : 'border-black/5'}`}
            style={{ 
              background: isDark 
                ? `conic-gradient(from ${rotation}deg, #0a0a0a, #1a1a1a, #0a0a0a)`
                : `conic-gradient(from ${rotation}deg, #fdfdfd, #ececec, #fdfdfd)`,
              boxShadow: isDark 
                ? 'inset 0 0 80px rgba(0,0,0,0.5), 0 30px 60px rgba(0,0,0,0.4)'
                : 'inset 0 0 40px rgba(0,0,0,0.05), 0 20px 40px rgba(0,0,0,0.1)'
            }}
          >
             {/* Subtle Grooves */}
             <div className="absolute inset-12 rounded-full border border-current opacity-[0.03]" />
             <div className="absolute inset-24 rounded-full border border-current opacity-[0.03]" />

             {/* Minimal Center Label */}
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full flex flex-col items-center justify-center border transition-all duration-700 group-hover:scale-110
               ${isDark ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-black/10 text-black shadow-xl'}
             `}>
                <Disc className="w-10 h-10 opacity-40" />
                <div className="mt-4 text-[7px] font-mono opacity-40 uppercase tracking-[0.4em]">Node_Core</div>
             </div>
          </div>

          {/* Floating HUD Ring */}
          <div 
            className={`absolute inset-0 border border-current rounded-full opacity-[0.05] animate-pulse`} 
            style={{ transform: 'translateZ(60px) scale(1.05)' }}
          />
       </div>

       {/* HUD Labels */}
       <div className="absolute bottom-4 left-4 flex items-center gap-3 opacity-20">
          <Activity className="w-3 h-3 text-amber-500" />
          <span className="text-[8px] font-mono uppercase tracking-widest font-black">Sync: 33.3_RPM</span>
       </div>
    </div>
  );
};
