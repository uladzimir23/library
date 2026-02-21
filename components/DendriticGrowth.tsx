
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Network, Zap, Cpu, Sparkles, Activity, Sliders, Target, Gauge } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const DendriticGrowth: React.FC = () => {
  const [nodeA] = useState({ x: 30, y: 50 });
  const [nodeB, setNodeB] = useState({ x: 70, y: 50 });
  const [proximity, setProximity] = useState(0.4); // Чувствительность
  const [firingRate, setFiringRate] = useState(0.5); // Частота вспышек
  const [isGrowing, setIsGrowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setNodeB({ x, y });
      const dist = Math.sqrt(Math.pow(x - nodeA.x, 2) + Math.pow(y - nodeA.y, 2));
      const threshold = 20 + proximity * 60;
      if (dist < threshold && !isGrowing) {
        setIsGrowing(true);
        playUISound('success');
      } else if (dist >= threshold && isGrowing) {
        setIsGrowing(false);
      }
    }
  };

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500/50 animate-pulse" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Dendritic_Growth_Workbench_v5.2</div>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Synapse_Type: HEBBIAN</div>
            <div className="w-12 h-1 bg-white/5 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-indigo-400">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Параметры_Связи</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Чувствительность</span>
                     <span className="text-indigo-400">{(proximity * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.05" value={proximity} onChange={e => setProximity(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Частота_Сигналов</span>
                     <span className="text-indigo-400">{(firingRate * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.05" value={firingRate} onChange={e => setFiringRate(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-emerald-500">
                  <Gauge className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">Signal_Integrity</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{isGrowing ? 'Optimal' : 'Searching'}</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="flex-1 bg-[#050308] relative overflow-hidden flex items-center justify-center p-12 group shadow-inner cursor-none"
         >
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            {/* Neural Web (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-50">
               <defs>
                  <filter id="neural-glow">
                     <feGaussianBlur stdDeviation="6" result="blur" />
                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
               </defs>
               
               <path 
                d={`M ${nodeA.x}% ${nodeA.y}% Q ${nodeA.x}% ${nodeB.y}% ${nodeB.x}% ${nodeB.y}%`}
                fill="none" 
                stroke={isGrowing ? "#10b981" : "#6366f1"}
                strokeWidth={isGrowing ? "3" : "1"}
                strokeDasharray={isGrowing ? "none" : "8 8"}
                className="transition-all duration-700 ease-out"
                filter={isGrowing ? "url(#neural-glow)" : "none"}
              />

              {/* Firing Pulses along the link */}
              {isGrowing && (
                 <circle r="6" fill="#fff" filter="blur(3px)">
                    <animateMotion 
                       dur={`${2 - firingRate}s`} 
                       repeatCount="indefinite" 
                       path={`M ${nodeA.x}% ${nodeA.y}% Q ${nodeA.x}% ${nodeB.y}% ${nodeB.x}% ${nodeB.y}%`} 
                    />
                 </circle>
              )}
            </svg>

            {/* STATIC NODE A */}
            <div 
              className="absolute w-28 h-28 bg-indigo-600 rounded-[32px] flex items-center justify-center text-white shadow-2xl z-20 transition-all duration-700"
              style={{ left: `${nodeA.x}%`, top: `${nodeA.y}%`, transform: 'translate(-50%, -50%)', boxShadow: isGrowing ? '0 0 60px rgba(99, 102, 241, 0.4)' : 'none' }}
            >
               <Cpu className={`w-12 h-12 transition-transform duration-700 ${isGrowing ? 'rotate-90' : 'rotate-0'}`} />
               <div className="absolute -top-12 whitespace-nowrap text-[8px] font-mono text-indigo-400 uppercase tracking-widest font-black">Kernel_Master_01</div>
            </div>

            {/* MOVING NODE B (Cursor) */}
            <div 
              className={`absolute w-24 h-24 rounded-[32px] border-2 flex items-center justify-center transition-all duration-300 z-20
                ${isGrowing ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_0_80px_rgba(16,185,129,0.5)] scale-110' : 'bg-white/5 border-white/20 text-zinc-500 opacity-40'}
              `}
              style={{ left: `${nodeB.x}%`, top: `${nodeB.y}%`, transform: 'translate(-50%, -50%)' }}
            >
               <Activity className={`w-10 h-10 ${isGrowing ? 'animate-pulse' : ''}`} />
            </div>

            <div className="absolute bottom-12 left-12 flex items-center gap-4">
               <div className={`w-2 h-2 rounded-full ${isGrowing ? 'bg-emerald-500 animate-ping' : 'bg-indigo-500'}`} />
               <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold text-shadow-sm">Synapse_Lock: {isGrowing ? 'ACTIVE' : 'SEEKING'}</span>
            </div>
         </div>
      </div>
    </div>
  );
};
