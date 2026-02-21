
import React, { useState, useRef } from 'react';
import { Orbit, Zap, Activity, Globe } from 'lucide-react';

export const GravitationalDataWell: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  const nodes = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    x: 0.2 + (i % 3) * 0.3,
    y: 0.2 + Math.floor(i / 3) * 0.3
  }));

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="mb-20 flex justify-between items-end">
         <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-[0.5em]">Gravitational_Singularity</span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
              Гравитационный <br /><span className="text-amber-500">Колодец.</span>
            </h2>
         </div>
         <div className="text-right opacity-40 font-mono text-[10px] uppercase text-zinc-500 italic">Mass_Constant: 1.2M_SUN</div>
      </div>

      <div className="relative h-[600px] bg-zinc-950 rounded-[64px] border border-white/5 overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl group cursor-none">
         {/* The Event Horizon Grid */}
         <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f59e0b 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />

         {/* Attracted Nodes */}
         <div className="relative w-full h-full preserve-3d">
            {nodes.map((node) => {
              const dx = mousePos.x - node.x;
              const dy = mousePos.y - node.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const pull = Math.max(0, 1 - dist * 1.5);
              
              return (
                <div 
                  key={node.id}
                  className="absolute w-32 h-32 transition-all duration-150 ease-out preserve-3d"
                  style={{ 
                    left: `${node.x * 100}%`, 
                    top: `${node.y * 100}%`,
                    transform: `translate(-50%, -50%) translate3d(${dx * pull * 150}px, ${dy * pull * 150}px, ${pull * 100}px) rotateX(${dy * pull * 40}deg) rotateY(${dx * pull * -40}deg) scale(${1 + pull * 0.3})`
                  }}
                >
                   <div className={`w-full h-full bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-2xl flex flex-col items-center justify-center gap-4 transition-colors duration-500 ${pull > 0.6 ? 'border-amber-500/50 bg-amber-500/5' : ''}`}>
                      <Zap className={`w-8 h-8 transition-all ${pull > 0.6 ? 'text-amber-400 scale-110' : 'text-zinc-700'}`} />
                      <div className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">OBJ_0x{node.id}A</div>
                   </div>
                </div>
              );
            })}
         </div>

         {/* The Singularity Pointer */}
         <div 
           className="absolute pointer-events-none transition-transform duration-75 ease-out"
           style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
         >
            <div className="w-24 h-24 bg-amber-600/10 rounded-full blur-3xl animate-pulse" />
            <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_20px_#fff]" />
            <div className="absolute inset-[-20px] border border-dashed border-amber-500/20 rounded-full animate-spin-slow" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[7px] font-black px-3 py-1 rounded-full uppercase whitespace-nowrap shadow-2xl">
               Horizon_Lock: {Math.max(...nodes.map(n => 1 - Math.sqrt(Math.pow(mousePos.x - n.x, 2) + Math.pow(mousePos.y - n.y, 2)) * 1.5)).toFixed(2)}
            </div>
         </div>

         <div className="absolute top-12 left-12 flex items-center gap-4">
            <Orbit className="w-5 h-5 text-amber-500 animate-spin-slow" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Curvature_Level: ACTIVE</span>
         </div>
      </div>
    </div>
  );
};
