
import React, { useState } from 'react';
import { Scissors, Zap, Maximize, Target } from 'lucide-react';

export const ProceduralShardArray: React.FC = () => {
  const [isExploded, setIsExploded] = useState(false);
  const shards = Array.from({ length: 24 });

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 flex justify-between items-end">
         <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.5em]">Procedural_Geometry</span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
              Массив <br /><span className="text-sky-500">Осколков.</span>
            </h2>
         </div>
         <button 
           onClick={() => setIsExploded(!isExploded)}
           className="px-8 py-4 bg-sky-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-500 transition-all shadow-xl active:scale-95"
         >
           {isExploded ? 'Reform_Core' : 'Trigger_Shatter'}
         </button>
      </div>

      <div 
        onMouseEnter={() => setIsExploded(true)}
        onMouseLeave={() => setIsExploded(false)}
        className="relative h-[600px] bg-zinc-950 rounded-[64px] border border-white/5 overflow-hidden flex items-center justify-center group shadow-2xl perspective-2000"
      >
         {/* The Shard Field */}
         <div className="relative w-80 h-80 preserve-3d">
            {shards.map((_, i) => {
              const row = Math.floor(i / 6);
              const col = i % 6;
              const delay = i * 20;
              
              // Randomized trajectories for explosion
              const tx = isExploded ? (col - 2.5) * 120 + (Math.random() - 0.5) * 100 : 0;
              const ty = isExploded ? (row - 1.5) * 120 + (Math.random() - 0.5) * 100 : 0;
              const tz = isExploded ? (Math.random() * 300) : 0;
              const rot = isExploded ? (Math.random() * 360) : 0;

              return (
                <div 
                  key={i}
                  className="absolute w-12 h-12 transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1)"
                  style={{ 
                    left: `${col * 16}%`, 
                    top: `${row * 24}%`,
                    transform: `translate3d(${tx}px, ${ty}px, ${tz}px) rotateX(${rot}deg) rotateY(${rot}deg)`,
                    transitionDelay: `${delay}ms`
                  }}
                >
                   <div className={`w-full h-full border rounded-lg transition-all duration-700
                     ${isExploded ? 'bg-sky-500/20 border-sky-400 shadow-[0_0_30px_rgba(14,165,233,0.3)]' : 'bg-white/5 border-white/10'}
                   `}>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-1 h-1 bg-sky-400 rounded-full opacity-20" />
                      </div>
                   </div>
                </div>
              );
            })}

            {/* Central Logic Node */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isExploded ? 'opacity-100 scale-125' : 'opacity-0 scale-50'}`}>
               <div className="w-24 h-24 bg-sky-600 rounded-[32px] flex items-center justify-center text-white shadow-2xl border-2 border-white/20">
                  <Zap className="w-10 h-10 animate-pulse" />
               </div>
            </div>
         </div>

         {/* HUD Data */}
         <div className="absolute bottom-12 right-12 text-right">
            <div className="text-[10px] font-mono text-sky-500 uppercase tracking-widest font-black mb-1">Shard_Count: 24_POLY</div>
            <div className="text-[8px] font-mono text-zinc-600 uppercase">Kinetic_Frag_Buffer: ACTIVE</div>
         </div>

         <div className="absolute top-12 left-12 flex items-center gap-3 text-sky-500/40">
            <Scissors className="w-4 h-4" />
            <span className="text-[9px] font-mono uppercase tracking-[0.4em]">Topology_Deconstruction_Ready</span>
         </div>
      </div>
    </div>
  );
};
