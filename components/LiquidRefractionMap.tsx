
import React, { useState, useRef } from 'react';
// Added Globe to imports to fix "Cannot find name 'Globe'" error
import { Droplets, Activity, Eye, Waves, Globe } from 'lucide-react';

export const LiquidRefractionMap: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width * 100,
        y: (e.clientY - rect.top) / rect.height * 100
      });
    }
  };

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="mb-20 flex justify-between items-end">
         <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.5em]">Viscous_Fluid_Optics</span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
              Жидкое <br /><span className="text-sky-500">Преломление.</span>
            </h2>
         </div>
         <div className="text-right bg-zinc-900 p-4 rounded-2xl border border-white/5">
            <div className="text-[8px] font-mono text-zinc-500 uppercase mb-1 tracking-widest">Medium_IOR</div>
            <div className="text-2xl font-tech font-bold text-white">1.442_N</div>
         </div>
      </div>

      <div className="relative h-[600px] bg-zinc-950 rounded-[64px] border border-white/5 overflow-hidden flex items-center justify-center shadow-2xl group cursor-none">
         {/* Background Static Data (To be distorted) */}
         <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 p-20 opacity-20 pointer-events-none">
            {Array.from({ length: 100 }).map((_, i) => (
               <div key={i} className="flex items-center justify-center text-[8px] font-mono text-zinc-500">
                  {i.toString(16).toUpperCase()}
               </div>
            ))}
         </div>

         {/* The Refractive Lens (Moving) */}
         <div 
           className="absolute w-[400px] h-[400px] transition-all duration-150 ease-out"
           style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%`, transform: 'translate(-50%, -50%)' }}
         >
            {/* The Lens Layers */}
            <div className="absolute inset-0 bg-sky-500/5 backdrop-blur-[60px] rounded-full border border-sky-500/20 shadow-[0_0_80px_rgba(14,165,233,0.2)] overflow-hidden">
               {/* Scaled mirror of content underneath */}
               <div className="absolute inset-0 flex items-center justify-center opacity-80" style={{ transform: 'scale(1.2)' }}>
                  <Globe className="w-48 h-48 text-sky-500 animate-spin-slow opacity-10" />
               </div>
            </div>
            
            {/* HUD Callout on Lens */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
               <div className="w-16 h-16 rounded-full bg-sky-600 flex items-center justify-center text-white shadow-2xl animate-pulse">
                  <Activity className="w-8 h-8" />
               </div>
               <div className="mt-4 text-[8px] font-mono text-sky-400 font-black uppercase tracking-widest">Ray_Trace_Lock</div>
            </div>
         </div>

         {/* Atmospheric Dust Particles */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

         <div className="absolute top-12 left-12 flex items-center gap-4 text-sky-500/40">
            <Droplets className="w-5 h-5 animate-bounce" />
            <span className="text-[10px] font-mono uppercase tracking-widest font-black">Fluid_Dynamics: NOMINAL</span>
         </div>
      </div>
    </div>
  );
};
