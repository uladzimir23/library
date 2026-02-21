
import React, { useState, useRef, useEffect } from 'react';
import { Waves, Droplet, Activity, Zap, Sliders, Dna, Gauge } from 'lucide-react';
import { playUISound } from '../wooden/components/AudioService';

export const BioMimeticMesh: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [metabolism, setMetabolism] = useState(0.3); // Скорость пульсации
  const [viscosity, setViscosity] = useState(0.15); // Тягучесть
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = setInterval(() => {
      setTime(t => t + metabolism * 0.2);
    }, 30);
    return () => clearInterval(ticker);
  }, [metabolism]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500/50 animate-pulse" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Bio_Mimetic_Workbench_v4.2</div>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-[8px] font-mono text-zinc-500 uppercase">Tissue_Type: COLLAGEN_SYNTH</div>
            <div className="w-12 h-1 bg-emerald-500/20 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-emerald-500">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Генетический_Код</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Метаболизм (Speed)</span>
                     <span className="text-emerald-500">{(metabolism * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.05" max="1" step="0.01" value={metabolism} onChange={e => setMetabolism(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Вязкость_Ткани</span>
                     <span className="text-emerald-500">{(viscosity * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.01" max="0.5" step="0.01" value={viscosity} onChange={e => setViscosity(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-emerald-500">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">Cell_Activity</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{(1.2 + Math.sin(time) * 0.2).toFixed(3)}_Hz</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="flex-1 bg-[#020805] relative overflow-hidden flex items-center justify-center group shadow-inner cursor-none"
         >
            {/* Organic Mesh Visualizer */}
            <div className="relative w-[500px] h-[500px] flex items-center justify-center">
               {/* Atmosphere Glow */}
               <div 
                 className="absolute inset-0 rounded-full blur-[100px] transition-all duration-1000 opacity-20"
                 style={{ 
                   background: `radial-gradient(circle, #10b981 0%, transparent 70%)`,
                   transform: `translate(${(mousePos.x - 0.5) * 100}px, ${(mousePos.y - 0.5) * 100}px) scale(${1 + Math.sin(time)*0.1})`
                 }}
               />

               {/* The Soft-Body Core */}
               <div 
                 className="relative w-80 h-80 transition-all duration-300 ease-out backdrop-blur-3xl border border-white/20 bg-emerald-500/5 shadow-[0_0_80px_rgba(16,185,129,0.1)] flex flex-col items-center justify-center p-12 overflow-hidden"
                 style={{ 
                   transform: `rotateX(${(mousePos.y - 0.5) * -20}deg) rotateY(${(mousePos.x - 0.5) * 20}deg) scale(${1 + Math.sin(time)*0.02})`,
                   borderRadius: `${60 + Math.sin(time) * 20}% ${40 + Math.cos(time) * 20}% ${50 + Math.sin(time * 0.8) * 20}% ${50 + Math.cos(time * 0.8) * 20}% / ${50 + Math.sin(time * 0.5) * 20}% ${50 + Math.cos(time * 0.5) * 20}% ${40 + Math.sin(time) * 20}% ${60 + Math.cos(time) * 20}%`,
                   boxShadow: `inset 0 0 ${20 + Math.sin(time) * 20}px rgba(16, 185, 129, 0.2)`
                 }}
               >
                  <Dna className="w-16 h-16 text-emerald-500 animate-pulse" />
                  <div className="mt-8 text-center">
                     <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-white">Gen_088_Flux</div>
                     <div className="text-2xl font-tech font-bold text-white uppercase tracking-tighter">Bio_Matter</div>
                  </div>
                  
                  {/* Dynamic Displacement Lines */}
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                     {[...Array(3)].map((_, i) => (
                       <div key={i} className="absolute inset-8 border border-emerald-500/20 rounded-full animate-ping" style={{ animationDelay: `${i * 1.2}s` }} />
                     ))}
                  </div>
               </div>
            </div>

            {/* CURSOR HUD */}
            <div 
              className="absolute pointer-events-none transition-transform duration-75"
              style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
            >
               <div className="w-12 h-12 border border-emerald-500/30 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
