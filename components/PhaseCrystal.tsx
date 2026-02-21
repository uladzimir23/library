
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Snowflake, Zap, Activity, Maximize2, Shield, Sliders, RefreshCw, Layers } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const PhaseCrystal: React.FC = () => {
  const [entropy, setEntropy] = useState(0.2); // 0 (frozen) to 1 (liquid)
  const [symmetry, setSymmetry] = useState(0.8); // 0 to 1
  const [phaseBias, setPhaseBias] = useState(0.5);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

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
            <div className="w-3 h-3 rounded-full bg-indigo-500/50" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Phase_Shift_Workbench_v5.2</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Lattice_Symmetry: {symmetry > 0.7 ? 'OPTIMAL' : 'DEGRADED'}</div>
            <div className="w-12 h-1 bg-white/5 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-indigo-400">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Параметры_Фазы</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Энтропия (Entropy)</span>
                     <span className="text-indigo-400">{(entropy * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.01" value={entropy} onChange={e => setEntropy(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Симметрия</span>
                     <span className="text-indigo-400">{(symmetry * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.05" value={symmetry} onChange={e => setSymmetry(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Фазовый_Сдвиг</span>
                     <span className="text-indigo-400">{(phaseBias * 10).toFixed(1)}π</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.05" value={phaseBias} onChange={e => setPhaseBias(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-indigo-500">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">Stability_Index</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{(1 - entropy).toFixed(3)}</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="flex-1 bg-[#020308] relative overflow-hidden flex items-center justify-center p-12 group shadow-inner cursor-none"
         >
            {/* Refraction Aura */}
            <div 
              className="absolute inset-0 transition-all duration-1000 ease-out opacity-20"
              style={{ 
                background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, #6366f1 0%, transparent 60%)`,
                filter: `blur(${40 + entropy * 100}px)`
              }}
            />

            {/* The Morphing Crystal Body */}
            <div 
              className={`relative w-80 h-80 transition-all duration-1000 ease-out flex flex-col items-center justify-center p-12 overflow-hidden shadow-2xl border-2`}
              style={{ 
                backgroundColor: `rgba(255, 255, 255, ${0.05 + entropy * 0.1})`,
                backdropFilter: `blur(${20 + (1 - entropy) * 60}px)`,
                borderRadius: `${(1 - symmetry) * 100 + entropy * 100}%`,
                borderColor: `rgba(99, 102, 241, ${0.2 + (1 - entropy) * 0.4})`,
                transform: `rotateX(${mousePos.y * 40}deg) rotateY(${mousePos.x * 40}deg) scale(${1 + entropy * 0.2}) rotate(${phaseBias * 360}deg)`,
                boxShadow: `0 0 ${entropy * 100}px rgba(99, 102, 241, 0.2), inset 0 0 50px rgba(255,255,255,${1 - entropy})`
              }}
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-indigo-500/10 pointer-events-none" />
               
               <div className={`relative z-10 flex flex-col items-center gap-8 transition-all duration-1000 ${entropy > 0.7 ? 'scale-90 blur-sm' : 'scale-110 blur-0'}`}>
                  <div className={`w-24 h-24 bg-indigo-600/20 border border-indigo-400/30 rounded-3xl flex items-center justify-center text-indigo-400 shadow-xl transition-all duration-1000 ${symmetry > 0.8 ? 'rotate-45' : 'rotate-0'}`}>
                     {entropy < 0.3 ? <Snowflake className="w-12 h-12 animate-spin-slow" /> : <Layers className="w-12 h-12" />}
                  </div>
                  <div className="text-center">
                     <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-white">Phase_Transition_0x88</div>
                     <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter">
                        {entropy > 0.8 ? 'Fluid' : entropy > 0.4 ? 'Viscous' : 'Ordered'}
                     </div>
                  </div>
               </div>

               {/* Internal "Lattice" details */}
               <div className={`absolute inset-10 border border-white/5 rounded-full transition-opacity duration-1000 ${entropy < 0.5 ? 'opacity-20' : 'opacity-0'}`} />
            </div>

            {/* CURSOR HUD */}
            <div 
              className="absolute pointer-events-none transition-transform duration-100"
              style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
            >
               <div className="w-16 h-16 border border-indigo-500/40 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                  <RefreshCw className="w-4 h-4 text-indigo-500 absolute opacity-40 animate-spin-slow" />
               </div>
            </div>

            <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <Zap className={`w-4 h-4 text-indigo-400 ${entropy > 0.1 ? 'animate-pulse' : ''}`} />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black">Entropy_Search: {(entropy).toFixed(4)}_E</span>
            </div>
         </div>
      </div>
    </div>
  );
};
