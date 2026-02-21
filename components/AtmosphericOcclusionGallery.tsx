
import React, { useState } from 'react';
import { Cloud, Eye, Wind, Maximize, Box } from 'lucide-react';

export const AtmosphericOcclusionGallery: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const items = [
    { label: 'Volumetric_A', z: -100 },
    { label: 'Volumetric_B', z: -200 },
    { label: 'Volumetric_C', z: -300 },
    { label: 'Volumetric_D', z: -400 }
  ];

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 flex justify-between items-end">
         <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.5em]">Atmospheric_Scattering_v19</span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
              Атмосферная <br /><span className="text-sky-500">Окклюзия.</span>
            </h2>
         </div>
         <div className="text-right opacity-40 font-mono text-[10px] uppercase text-zinc-500">Haze_Density: 0.94_PRO</div>
      </div>

      <div className="relative h-[600px] bg-zinc-950 rounded-[64px] border border-white/5 overflow-hidden flex items-center justify-center shadow-2xl perspective-2000">
         {/* Atmospheric Fog Layers */}
         <div className="absolute inset-0 bg-gradient-to-t from-sky-900/10 via-zinc-950 to-zinc-950 pointer-events-none" />
         <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

         {/* The Z-Stack Cards */}
         <div className="relative w-full h-full flex items-center justify-center preserve-3d gap-8">
            {items.map((item, i) => {
              const isFocused = hoveredIdx === i;
              const anyHovered = hoveredIdx !== null;
              
              return (
                <div 
                  key={i}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative w-64 h-80 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer border rounded-[48px] flex flex-col items-center justify-center gap-6
                    ${isFocused ? 'bg-sky-500/10 border-sky-400 shadow-[0_0_80px_rgba(14,165,233,0.3)] z-50' : 'bg-white/5 border-white/10'}
                  `}
                  style={{ 
                    transform: `translateZ(${isFocused ? 150 : item.z}px) scale(${isFocused ? 1.1 : 1})`,
                    filter: `blur(${isFocused ? 0 : anyHovered ? 20 : Math.abs(item.z / 20)}px)`,
                    opacity: isFocused ? 1 : anyHovered ? 0.1 : 0.3
                  }}
                >
                   <div className={`w-16 h-16 rounded-3xl bg-zinc-900 flex items-center justify-center transition-all duration-700 ${isFocused ? 'rotate-12 scale-110 text-sky-400' : 'text-zinc-700'}`}>
                      <Box className="w-8 h-8" />
                   </div>
                   <div className="text-center space-y-1">
                      <div className="text-xs font-tech font-bold text-white uppercase tracking-widest">{item.label}</div>
                      <div className="text-[8px] font-mono text-zinc-500 uppercase">Z_DEPTH: {item.z}PX</div>
                   </div>
                   
                   {isFocused && (
                     <div className="absolute inset-4 border border-sky-500/20 rounded-[32px] animate-pulse pointer-events-none" />
                   )}
                </div>
              );
            })}
         </div>

         {/* Floating Haze HUD */}
         <div className="absolute top-12 left-12 flex items-center gap-4 text-sky-500/40">
            <Cloud className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-widest font-black">Medium_Viscosity: 0.124_LXS</span>
         </div>
      </div>
    </div>
  );
};
