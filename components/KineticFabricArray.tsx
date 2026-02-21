import React, { useState, useContext } from 'react';
import { Grid, Maximize, Zap, Layout, Box, Sparkles, Sliders, Command } from 'lucide-react';
import { LanguageContext } from '../App';

export const KineticFabricArray: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const tiles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    icon: [Zap, Sparkles, Box, Command, Sliders, Layout][i % 6]
  }));

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="fabric-array">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Surface_Elasticity_v4
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Kinetic <br /><span className="text-rose-500">Fabric_Array.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are flexible fabrics. This compound array visualizes structural displacement, where each node reacts to proximity by expanding its volumetric footprint, creating a tactile "squish" effect across the grid.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col gap-3">
                <Maximize className="w-6 h-6 text-rose-500" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Displacement_Factor</div>
                <div className="text-2xl font-tech font-bold text-white uppercase">{hoveredIdx !== null ? '1.42_X' : '1.00_X'}</div>
             </div>
             <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col gap-3">
                <Grid className="w-6 h-6 text-indigo-500" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Grid_Elasticity</div>
                <div className="text-2xl font-tech font-bold text-white uppercase">ACTIVE</div>
             </div>
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center p-12">
           {/* Background Mesh Overlay */}
           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#f43f5e_1px,transparent_1px),linear-gradient(-45deg,#f43f5e_1px,transparent_1px)] bg-[length:24px_24px]" />

           {/* The Fabric Grid */}
           <div className="grid grid-cols-4 gap-4 w-full max-w-2xl relative z-10">
              {tiles.map((tile, i) => {
                const isHovered = hoveredIdx === i;
                const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - i) <= 1;

                return (
                  <div 
                    key={i}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`aspect-square transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) cursor-pointer rounded-2xl border flex items-center justify-center relative ${
                      isHovered ? 'z-50 scale-[1.5] bg-rose-500 border-white shadow-[0_30px_60px_rgba(244,63,94,0.4)]' :
                      isNeighbor ? 'z-20 scale-[1.1] bg-white/10 border-white/20' :
                      'z-10 scale-100 bg-white/5 border-white/5 opacity-40'
                    }`}
                  >
                     <tile.icon className={`w-8 h-8 transition-all duration-500 ${isHovered ? 'text-white' : 'text-zinc-500'}`} />
                     
                     {/* Internal Reflection Edge */}
                     {isHovered && (
                       <div className="absolute inset-0 border-t border-l border-white/40 rounded-[inherit] pointer-events-none" />
                     )}
                  </div>
                );
              })}
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${hoveredIdx !== null ? 'bg-rose-500 animate-ping' : 'bg-zinc-800'}`} />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Matter_Phase: {hoveredIdx !== null ? 'ELASTIC' : 'STABLE'}</span>
           </div>
        </div>
      </div>
    </section>
  );
};
