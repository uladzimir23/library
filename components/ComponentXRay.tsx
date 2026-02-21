import React, { useState, useContext } from 'react';
import { Scan, Box, Layers, MousePointer2, Activity, Sliders, Cpu, Grid3X3 } from 'lucide-react';
import { LanguageContext } from '../App';

export const ComponentXRay: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [xRayMode, setXRayMode] = useState(0.5); // 0: Material, 1: Wireframe
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="x-ray">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-emerald-500">
              <Scan className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Structural_XRay</span>
           </div>

           <div className="space-y-4">
              <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                 <span className="flex items-center gap-2"><Grid3X3 className="w-3 h-3" /> Wireframe_Filter</span>
                 <span className="font-mono text-emerald-500">{(xRayMode * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.01" value={xRayMode}
                onChange={e => setXRayMode(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
           </div>

           <div className="p-6 bg-zinc-900 rounded-3xl border border-white/5">
              <div className="text-[8px] font-mono text-zinc-500 uppercase mb-4 tracking-widest">Vertex_Count: 4.8K</div>
              <div className="space-y-2">
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[82%]" />
                 </div>
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[64%]" />
                 </div>
              </div>
           </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000"
        >
           {/* Wireframe Grid Base */}
           <div className="absolute inset-0 opacity-10" style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }} />

           <div 
             className="relative w-80 h-96 transition-all duration-700 ease-out preserve-3d"
             style={{ transform: `rotateX(${mousePos.y * -20}deg) rotateY(${mousePos.x * 20}deg)` }}
           >
              {/* Material Layer */}
              <div 
                className="absolute inset-0 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[56px] shadow-2xl transition-opacity duration-300 flex flex-col items-center justify-center p-12"
                style={{ opacity: 1 - xRayMode }}
              >
                 <Cpu className="w-16 h-16 text-indigo-500 mb-6" />
                 <div className="text-center">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Refraction_Active</div>
                    <div className="h-1 w-24 bg-white/10 rounded-full" />
                 </div>
              </div>

              {/* Wireframe Layer */}
              <div 
                className="absolute inset-0 border-2 border-emerald-500/40 rounded-[56px] transition-opacity duration-300 flex flex-col items-center justify-center p-12"
                style={{ 
                  opacity: xRayMode,
                  backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 80%)'
                }}
              >
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[120%] h-[120%] border border-emerald-500/5 rounded-full animate-spin-slow" />
                 </div>
                 <Box className="w-16 h-16 text-emerald-500 animate-pulse" />
                 <div className="mt-8 text-[9px] font-mono text-emerald-500 uppercase tracking-widest text-center">
                    LOD_STATE: HIGH<br />
                    TOPOLOGY: QUAD_MESH
                 </div>
              </div>

              {/* Connecting Lines HUD */}
              <div className="absolute -top-12 -right-12 p-4 bg-zinc-900 border border-emerald-500/20 rounded-xl transition-all"
                   style={{ transform: `translateZ(50px)`, opacity: xRayMode }}>
                 <div className="text-[8px] font-mono text-emerald-500">VERTICES: 1204</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
