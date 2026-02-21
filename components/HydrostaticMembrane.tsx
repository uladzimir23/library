import React, { useState, useContext } from 'react';
import { Target, Zap, Activity, Maximize2, Droplets, Move, Sparkles } from 'lucide-react';
import { LanguageContext } from '../App';

export const HydrostaticMembrane: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const elements = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    icon: [Zap, Droplets, Target, Activity, Maximize2, Move, Sparkles, Zap, Droplets][i]
  }));

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="hydrostatic">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Fluid_Collision_v4
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Hydrostatic <br /><span className="text-rose-500">Membrane.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are compressible volumes. Each element in this array exerts hydrostatic pressure on its neighbors, physically displacing the grid to maintain structural equilibrium.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col gap-3 shadow-xl">
                <Droplets className="w-6 h-6 text-rose-500" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Internal_Pressure</div>
                <div className="text-2xl font-tech font-bold text-white uppercase">{hoveredIdx !== null ? '0.94_BAR' : '0.12_BAR'}</div>
             </div>
             <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col gap-3 shadow-xl">
                <Maximize2 className="w-6 h-6 text-indigo-500" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Displacement</div>
                <div className="text-2xl font-tech font-bold text-white uppercase">ACTIVE</div>
             </div>
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center p-12 group shadow-2xl">
           <div className="grid grid-cols-3 gap-6 relative z-10 w-full max-w-xl">
              {elements.map((el, i) => {
                const isHovered = hoveredIdx === i;
                const isNeighbor = hoveredIdx !== null && (
                  Math.abs(Math.floor(hoveredIdx/3) - Math.floor(i/3)) <= 1 && 
                  Math.abs((hoveredIdx%3) - (i%3)) <= 1
                );

                return (
                  <div 
                    key={i}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`aspect-square transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) cursor-pointer rounded-3xl border flex items-center justify-center relative ${
                      isHovered ? 'z-50 scale-[1.3] bg-rose-500 border-white shadow-[0_30px_60px_rgba(244,63,94,0.4)]' :
                      isNeighbor ? 'z-20 scale-[0.9] bg-white/10 border-white/10 opacity-60 translate-y-[-10px]' :
                      'z-10 scale-100 bg-white/5 border-white/5 opacity-40'
                    }`}
                  >
                     <el.icon className={`w-8 h-8 transition-all duration-500 ${isHovered ? 'text-white' : 'text-zinc-600'}`} />
                     {isHovered && (
                       <div className="absolute -top-4 -right-4 bg-zinc-900 border border-white/10 px-2 py-1 rounded-lg text-[8px] font-mono text-white animate-in zoom-in duration-300">
                          P_LOAD: MAX
                       </div>
                     )}
                  </div>
                );
              })}
           </div>

           {/* Depth Shadows */}
           <div className={`absolute bottom-24 right-24 transition-all duration-1000 ${hoveredIdx !== null ? 'scale-150 opacity-10' : 'scale-100 opacity-0'}`}>
              <Droplets className="w-64 h-64 text-rose-500" />
           </div>
        </div>
      </div>
    </section>
  );
};
