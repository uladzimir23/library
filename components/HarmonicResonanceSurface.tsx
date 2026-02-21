
import React, { useState, useEffect } from 'react';
import { Waves, Music, Activity, Sliders, Radio } from 'lucide-react';

export const HarmonicResonanceSurface: React.FC = () => {
  const [freq, setFreq] = useState(2);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const ticker = setInterval(() => {
      setTime(t => t + 0.1);
    }, 30);
    return () => clearInterval(ticker);
  }, []);

  const nodes = Array.from({ length: 49 }); // 7x7 Grid

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 flex justify-between items-end">
         <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-[0.5em]">Harmonic_Resonance_v4</span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
              Гармонический <br /><span className="text-amber-500">Резонанс.</span>
            </h2>
         </div>
         <div className="w-64 space-y-4">
            <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
               <span>Resonance_Freq</span>
               <span className="text-amber-500">{freq.toFixed(1)} Hz</span>
            </div>
            <input 
              type="range" min="1" max="10" step="0.1" value={freq}
              onChange={e => setFreq(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500"
            />
         </div>
      </div>

      <div className="relative h-[600px] bg-zinc-950 rounded-[64px] border border-white/5 overflow-hidden flex items-center justify-center shadow-2xl perspective-2000">
         <div className="grid grid-cols-7 gap-6 p-12 relative z-10 preserve-3d">
            {nodes.map((_, i) => {
              const x = i % 7;
              const y = Math.floor(i / 7);
              const distFromCenter = Math.sqrt(Math.pow(x - 3, 2) + Math.pow(y - 3, 2));
              const elevation = Math.sin(distFromCenter * freq - time) * 40;
              const opacity = 0.2 + (elevation + 40) / 100;

              return (
                <div 
                  key={i}
                  className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl transition-all duration-75 flex items-center justify-center group"
                  style={{ 
                    transform: `translateZ(${elevation}px)`,
                    opacity: opacity,
                    borderColor: elevation > 20 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255,255,255,0.1)'
                  }}
                >
                   <div 
                     className={`w-1 h-1 rounded-full transition-colors duration-500 ${elevation > 20 ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'bg-zinc-800'}`} 
                   />
                </div>
              );
            })}
         </div>

         {/* Frequency Visualizer Overlay */}
         <div className="absolute inset-x-0 bottom-0 h-32 opacity-10 pointer-events-none">
            <svg viewBox="0 0 1000 100" className="w-full h-full preserve-3d">
               <path 
                 d={`M 0,50 Q 250,${50 + Math.sin(time)*50} 500,50 T 1000,50`} 
                 fill="none" stroke="#f59e0b" strokeWidth="2" 
               />
            </svg>
         </div>

         <div className="absolute top-12 left-12 flex items-center gap-4">
            <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Oscillation_Buffer: ACTIVE</span>
         </div>
      </div>
    </div>
  );
};
