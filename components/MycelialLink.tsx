
import React, { useState, useContext, useRef, useEffect } from 'react';
import { GitBranch, Share2, Activity, Zap, Sliders, Target, Leaf } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const MycelialLink: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [branching, setBranching] = useState(0.6);
  const [pulseSpeed, setPulseSpeed] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    }
  };

  const anchors = [
    { x: 15, y: 15 }, { x: 85, y: 15 },
    { x: 15, y: 85 }, { x: 85, y: 85 },
    { x: 50, y: 10 }, { x: 50, y: 90 }
  ];

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-emerald-500/60">Mycelial_Network_Workbench_v5.2</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Connectivity_Mode: ORGANIC</div>
            <div className="w-12 h-1 bg-emerald-500/10 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-emerald-400">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Морфология_Корней</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Ветвление (Branching)</span>
                     <span className="text-emerald-400">{(branching * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.05" value={branching} onChange={e => setBranching(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Скорость_Импульса</span>
                     <span className="text-emerald-400">{pulseSpeed}s</span>
                  </div>
                  <input type="range" min="1" max="6" step="0.5" value={pulseSpeed} onChange={e => setPulseSpeed(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-emerald-500">
                  <Activity className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase">Root_Density</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{anchors.length * 2}_NODES</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="flex-1 bg-[#020503] relative overflow-hidden flex items-center justify-center p-12 group shadow-inner cursor-none"
         >
            {/* Mycelial Grid Visual */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {anchors.map((anchor, i) => (
                <g key={i}>
                   <path 
                    d={`M ${anchor.x}% ${anchor.y}% C ${anchor.x + (mousePos.x - anchor.x)*branching}% ${anchor.y}%, ${mousePos.x}% ${anchor.y + (mousePos.y - anchor.y)*branching}%, ${mousePos.x}% ${mousePos.y}%`}
                    fill="none" 
                    stroke="rgba(16,185,129,0.25)" 
                    strokeWidth="1.5" 
                    className="transition-all duration-700 ease-out"
                  />
                  <circle r="2.5" fill="#10b981" filter="blur(1px)">
                     <animateMotion 
                       dur={`${pulseSpeed + i * 0.2}s`} 
                       repeatCount="indefinite" 
                       path={`M ${anchor.x}% ${anchor.y}% C ${anchor.x + (mousePos.x - anchor.x)*branching}% ${anchor.y}%, ${mousePos.x}% ${anchor.y + (mousePos.y - anchor.y)*branching}%, ${mousePos.x}% ${mousePos.y}%`} 
                     />
                  </circle>
                </g>
              ))}
            </svg>

            {/* Anchors */}
            {anchors.map((anchor, i) => (
              <div 
                key={i}
                className="absolute w-3 h-3 bg-emerald-900 border border-emerald-500/40 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                style={{ left: `${anchor.x}%`, top: `${anchor.y}%`, transform: 'translate(-50%, -50%)' }}
              />
            ))}

            {/* Nutrient Hub (Cursor) */}
            <div 
              className="absolute w-24 h-24 bg-emerald-600/10 backdrop-blur-xl border border-emerald-500/30 rounded-full flex items-center justify-center transition-all duration-75 ease-out shadow-[0_0_60px_rgba(16,185,129,0.2)]"
              style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%`, transform: 'translate(-50%, -50%)' }}
            >
               <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                  <Zap className="w-5 h-5 fill-current" />
               </div>
               {/* Internal Detail Brackets */}
               <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
            </div>

            <div className="absolute bottom-12 right-12 text-right">
               <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold mb-1">Signal_Loom: ACTIVE</div>
               <div className="text-[8px] font-mono text-zinc-700 uppercase tracking-tighter">Coord_X: {mousePos.x.toFixed(2)}</div>
            </div>
         </div>
      </div>
    </div>
  );
};
