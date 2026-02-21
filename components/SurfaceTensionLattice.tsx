
import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Waves, Zap, Droplets, Target, Activity } from 'lucide-react';
import { playUISound } from '../wooden/components/AudioService';

export const SurfaceTensionLattice: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [tension, setTension] = useState(0.72);
  const [elasticity, setElasticity] = useState(0.4);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Обновляем состояние мгновенно
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const gridSize = 10;
  const VB = 1000; // viewBox scale

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500/50" />
            <div className="w-3 h-3 rounded-full bg-blue-500/50" />
            <div className="w-3 h-3 rounded-full bg-indigo-500/50" />
         </div>
         <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Surface_Lattice_Workbench_v5.2</div>
         <div className="w-12 h-1 bg-current opacity-5 rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-6">
               <div className="flex items-center gap-3 text-cyan-400 mb-6">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Гидростатика_Сетки</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Натяжение</span>
                     <span className="text-cyan-400">{(tension * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.01" value={tension} onChange={e => setTension(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Эластичность</span>
                     <span className="text-cyan-400">{(elasticity * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.01" value={elasticity} onChange={e => setElasticity(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500" />
               </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Описание_Стенда</h4>
              <p className="text-xs font-light leading-relaxed text-zinc-500 italic">
                Оптимизированная версия 5.2. Убраны задержки рендеринга. Сетка теперь жестко привязана к системному таймеру отрисовки, обеспечивая мгновенный отклик на движение курсора.
              </p>
            </div>

            <div className="mt-auto flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-white/5">
               <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
               <div className="text-[8px] font-mono text-zinc-500 uppercase">Latency: 0.02ms</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="flex-1 bg-zinc-950 relative overflow-hidden flex items-center justify-center group shadow-inner cursor-none"
         >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_80%)]" />

            <svg viewBox={`0 0 ${VB} ${VB}`} className="w-full h-full p-20 overflow-visible">
               <defs>
                  <filter id="lineGlow">
                     <feGaussianBlur stdDeviation="3" result="blur" />
                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
               </defs>
               
               {/* Horizontal Lines - No transitions for direct coordinates */}
               {Array.from({ length: gridSize + 1 }).map((_, i) => {
                 const y = (i / gridSize) * VB;
                 const mx = mousePos.x * VB;
                 const my = mousePos.y * VB;
                 const distY = Math.abs(mousePos.y - (i / gridSize));
                 const influence = Math.max(0, 1 - distY * 3.5);
                 
                 return (
                   <path 
                     key={`h-${i}`}
                     d={`M 0 ${y} Q ${mx} ${my} ${VB} ${y}`}
                     fill="none" 
                     stroke={influence > 0.4 ? "#22d3ee" : "#10b981"} 
                     strokeWidth={0.5 + influence * 3} 
                     style={{ 
                       opacity: 0.08 + influence * 0.5 + (1 - tension) * 0.2,
                       filter: influence > 0.6 ? 'url(#lineGlow)' : 'none'
                     }}
                   />
                 );
               })}

               {/* Vertical Lines - No transitions for direct coordinates */}
               {Array.from({ length: gridSize + 1 }).map((_, i) => {
                 const x = (i / gridSize) * VB;
                 const mx = mousePos.x * VB;
                 const my = mousePos.y * VB;
                 const distX = Math.abs(mousePos.x - (i / gridSize));
                 const influence = Math.max(0, 1 - distX * 3.5);

                 return (
                   <path 
                     key={`v-${i}`}
                     d={`M ${x} 0 Q ${mx} ${my} ${x} ${VB}`}
                     fill="none" 
                     stroke={influence > 0.4 ? "#22d3ee" : "#10b981"} 
                     strokeWidth={0.5 + influence * 3} 
                     style={{ 
                        opacity: 0.08 + influence * 0.5 + (1 - tension) * 0.2,
                        filter: influence > 0.6 ? 'url(#lineGlow)' : 'none'
                     }}
                   />
                 );
               })}

               {/* Intersection Nodes - Real-time placement */}
               {Array.from({ length: gridSize + 1 }).map((_, iy) => 
                 Array.from({ length: gridSize + 1 }).map((_, ix) => {
                   const x = (ix / gridSize);
                   const y = (iy / gridSize);
                   const dx = mousePos.x - x;
                   const dy = mousePos.y - y;
                   const dist = Math.sqrt(dx*dx + dy*dy);
                   const influence = Math.max(0, 1 - dist * 4);
                   
                   if (influence < 0.1) return null;

                   return (
                     <circle 
                       key={`${ix}-${iy}`}
                       cx={x * VB + dx * influence * VB * 0.15}
                       cy={y * VB + dy * influence * VB * 0.15}
                       r={1.5 + influence * 5}
                       fill={influence > 0.5 ? "#fff" : "#22d3ee"}
                       style={{ opacity: influence * 0.9 }}
                     />
                   );
                 })
               )}
            </svg>

            {/* Pointer HUD - No delayed transitions */}
            <div 
              className="absolute pointer-events-none"
              style={{ 
                left: `${mousePos.x * 100}%`, 
                top: `${mousePos.y * 100}%`, 
                transform: 'translate(-50%, -50%)' 
              }}
            >
               <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 border border-cyan-500/40 rounded-full animate-[spin_4s_linear_infinite]" />
                  <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_25px_#22d3ee]" />
                  <div className="absolute -top-12 bg-zinc-900/90 border border-white/20 px-3 py-1 rounded-lg text-[8px] font-mono text-cyan-400 whitespace-nowrap shadow-2xl backdrop-blur-md">
                     LOC: {mousePos.x.toFixed(3)} , {mousePos.y.toFixed(3)}
                  </div>
               </div>
            </div>

            <div className="absolute bottom-12 right-12 text-right">
               <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Grid_Coherence</div>
               <div className="text-3xl font-tech font-bold text-cyan-400">{(1.0 - tension + elasticity).toFixed(3)}_N</div>
            </div>
         </div>
      </div>
    </div>
  );
};
