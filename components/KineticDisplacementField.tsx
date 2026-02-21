
import React, { useState, useRef, useEffect } from 'react';
import { Target, Move, Activity } from 'lucide-react';

export const KineticDisplacementField: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const gridSize = 12;
  const nodes = Array.from({ length: gridSize * gridSize });

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="mb-20 flex justify-between items-end">
         <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em]">Volumetric_Displacement</span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
              Поле <br /><span className="text-emerald-500">Вытеснения.</span>
            </h2>
         </div>
         <div className="text-right opacity-40 font-mono text-[10px] uppercase text-zinc-500">Interaction_Type: REPELLENT</div>
      </div>

      <div className="relative h-[600px] bg-zinc-950 rounded-[64px] border border-white/5 overflow-hidden flex items-center justify-center group shadow-2xl">
         {/* Background Matter Grid */}
         <div className="grid h-full w-full p-20" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}>
            {nodes.map((_, i) => {
               const ix = i % gridSize;
               const iy = Math.floor(i / gridSize);
               
               // Calculate node center relative to grid cell
               const nodeX = (ix + 0.5) * (100 / gridSize);
               const nodeY = (iy + 0.5) * (100 / gridSize);
               
               // Cursor distance calculation (pseudo-coordinates)
               const rect = containerRef.current?.getBoundingClientRect();
               const cx = (mousePos.x / (rect?.width || 1)) * 100;
               const cy = (mousePos.y / (rect?.height || 1)) * 100;
               
               const dx = cx - nodeX;
               const dy = cy - nodeY;
               const dist = Math.sqrt(dx * dx + dy * dy);
               
               // Repulsion physics
               const maxDist = 25;
               const strength = Math.max(0, 1 - dist / maxDist);
               const moveX = (dx / (dist || 1)) * -strength * 30;
               const moveY = (dy / (dist || 1)) * -strength * 30;

               return (
                 <div key={i} className="flex items-center justify-center">
                    <div 
                      className="w-1.5 h-1.5 rounded-full bg-emerald-500 transition-all duration-300 ease-out"
                      style={{ 
                        transform: `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 2})`,
                        opacity: 0.1 + strength * 0.9,
                        boxShadow: strength > 0.4 ? `0 0 15px rgba(16, 185, 129, ${strength})` : 'none'
                      }}
                    />
                 </div>
               );
            })}
         </div>

         {/* Displacement Wave HUD */}
         <div 
           className="absolute w-40 h-40 border border-emerald-500/20 rounded-full pointer-events-none transition-transform duration-75"
           style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }}
         >
            <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-[40px] animate-pulse" />
            <div className="absolute inset-4 border border-dashed border-emerald-500/10 rounded-full animate-spin-slow" />
         </div>

         <div className="absolute bottom-12 left-12 flex items-center gap-4 text-emerald-500/40">
            <Activity className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase tracking-widest font-black">Force_Repulsion_Active: 0.84N</span>
         </div>
      </div>
    </div>
  );
};
