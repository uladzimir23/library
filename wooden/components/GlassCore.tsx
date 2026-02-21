
import React, { useState, useEffect } from 'react';
import { Target, Zap, Cpu, Aperture, Box } from 'lucide-react';

interface Props {
  theme: 'dark' | 'light';
}

export const GlassCore: React.FC<Props> = ({ theme }) => {
  const [rotation, setRotation] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setInterval(() => setRotation(prev => prev + 0.2), 20);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 40, y: x * -40 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative w-[500px] h-[500px] flex items-center justify-center perspective-2000 group cursor-crosshair scale-110 md:scale-125"
    >
       {/* Ambient Depth Glow */}
       <div 
         className={`absolute inset-0 rounded-full transition-all duration-1000 blur-[120px] ${isDark ? 'bg-indigo-600 opacity-20' : 'bg-indigo-300 opacity-30'}`}
         style={{ transform: `translate(${tilt.y}px, ${tilt.x}px)` }}
       />

       {/* THE MASTER OBJECT */}
       <div 
         className="relative w-full h-full transition-transform duration-700 ease-out preserve-3d"
         style={{ transform: `rotateX(${15 + tilt.x}deg) rotateY(${tilt.y}deg)` }}
       >
          {/* Main Structural Shell */}
          <div 
            className={`absolute inset-10 rounded-[80px] border transition-all duration-1000 overflow-hidden
              ${isDark ? 'bg-white/5 border-white/20 shadow-2xl' : 'bg-white/80 border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]'}
            `}
            style={{ 
              backdropFilter: 'blur(60px)',
              transform: 'translateZ(40px)',
              background: isDark 
                ? `linear-gradient(${45 + rotation}deg, rgba(255,255,255,0.1), transparent)`
                : `linear-gradient(${45 + rotation}deg, rgba(99,102,241,0.05), transparent)`
            }}
          >
             {/* Internal Scanning HUD */}
             <div className={`absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(99,102,241,0.05)_50%)] bg-[length:100%_4px] animate-pulse ${!isDark && 'opacity-20'}`} />
             
             {/* Center Processor */}
             <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
                <div className={`w-28 h-28 rounded-[40px] flex items-center justify-center transition-all duration-1000 shadow-[0_0_50px_rgba(99,102,241,0.3)]
                  ${isDark ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-white'}
                `}>
                   <Aperture className="w-14 h-14 animate-spin-slow" />
                </div>
                <div className="text-center">
                   <div className="text-[10px] font-mono text-indigo-500 font-black uppercase tracking-[0.6em] mb-3 animate-pulse">Matter_Core_v4.2</div>
                   <div className={`text-5xl font-tech font-bold uppercase tracking-tighter ${isDark ? 'text-white' : 'text-zinc-900'}`}>0x8892_STB</div>
                </div>
             </div>

             {/* HUD Detail brackets */}
             <div className="absolute top-10 left-10 w-6 h-6 border-t-2 border-l-2 border-indigo-500/30" />
             <div className="absolute bottom-10 right-10 w-6 h-6 border-b-2 border-r-2 border-indigo-500/30" />
          </div>

          {/* External Orbital Elements */}
          <div 
            className={`absolute inset-[-20px] border rounded-full opacity-20 pointer-events-none ${isDark ? 'border-white/5' : 'border-black/5'}`}
            style={{ transform: 'translateZ(-100px)' }}
          />
       </div>

       {/* System Telemetry Labels */}
       <div className="absolute bottom-4 left-4 flex flex-col gap-2 opacity-30">
          <div className="flex items-center gap-3">
             <Zap className="w-4 h-4 text-indigo-500" />
             <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-zinc-900'}`}>Energy: 1.21_GW</span>
          </div>
       </div>
    </div>
  );
};
