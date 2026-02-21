
import React, { useState, useRef, useEffect } from 'react';
import { Target, Zap, Waves, Droplets, Sliders, Activity, Gauge, Fingerprint, Move } from 'lucide-react';
import { playUISound } from './AudioService';

export const HapticPhysicsLab: React.FC<{ theme: string }> = ({ theme }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [viscosity, setViscosity] = useState(0.42);
  const [tension, setTension] = useState(0.65);
  const [intensity, setIntensity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect) {
      const nx = ((e.clientX - rect.left) / rect.width) * 100;
      const ny = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x: nx, y: ny });
      setIntensity(prev => Math.min(1, prev + 0.05));
    }
  };

  useEffect(() => {
    const decay = setInterval(() => {
      setIntensity(prev => Math.max(0, prev - 0.02));
    }, 50);
    return () => clearInterval(decay);
  }, []);

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500/50 animate-pulse" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40 text-indigo-500">Viscosity_Solvent_Workbench_v4.2</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Solvent_Type: SYNTH_GEL</div>
            <div className="w-12 h-1 bg-indigo-500/20 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-indigo-400">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Реология_Геля</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Вязкость (Viscosity)</span>
                     <span className="text-indigo-400">{(viscosity * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="0.9" step="0.01" value={viscosity} onChange={e => setViscosity(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Поверхн_Натяжение</span>
                     <span className="text-indigo-400">{(tension * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1.5" step="0.05" value={tension} onChange={e => setTension(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-emerald-500">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">Shear_Stress</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{(intensity * viscosity * 14.2).toFixed(2)}_PA</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="flex-1 bg-[#050508] relative overflow-hidden flex items-center justify-center group shadow-inner cursor-none"
         >
            <svg className="absolute w-0 h-0">
               <filter id="haptic-goo-refined">
                  <feGaussianBlur in="SourceGraphic" stdDeviation={15 * tension} result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 45 -15" result="goo" />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
               </filter>
            </defs>

            {/* The Fluid Container */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ filter: 'url(#haptic-goo-refined)' }}>
               {/* Core Attractor (Cursor) - Убрана задержка перемещения для мгновенного отклика */}
               <div 
                 className="absolute w-56 h-56 bg-indigo-600 rounded-full shadow-2xl transition-opacity duration-300 ease-out"
                 style={{ 
                   left: `${mousePos.x}%`, 
                   top: `${mousePos.y}%`, 
                   transform: 'translate(-50%, -50%)',
                   opacity: 0.8 + intensity * 0.2
                 }}
               />
               {/* Distributed Particles */}
               {[...Array(6)].map((_, i) => (
                 <div 
                   key={i}
                   className="absolute w-40 h-40 bg-indigo-500/30 rounded-full transition-all duration-[1500ms] ease-out"
                   style={{ 
                     left: `${50 + (i - 2.5) * 12}%`, 
                     top: `${50 + Math.sin(Date.now()/2000 + i)*5}%`, 
                     transform: `translate(-50%, -50%) scale(${1 + intensity * 0.2})`,
                     transitionDelay: `${i * 100}ms`
                   }}
                 />
               ))}
            </div>

            {/* INTERACTION OVERLAY */}
            <div className="relative z-10 flex flex-col items-center gap-8">
               <div 
                 onClick={() => { playUISound('click'); setIntensity(1); }}
                 className="w-32 h-32 rounded-[40px] bg-white/5 border border-white/20 backdrop-blur-3xl flex items-center justify-center shadow-[0_0_80px_rgba(99,102,241,0.2)] hover:scale-105 active:scale-95 transition-all duration-500 cursor-pointer group/target"
               >
                  <Fingerprint className={`w-12 h-12 transition-all duration-700 ${intensity > 0.5 ? 'text-indigo-400 scale-110' : 'text-zinc-600 group-hover/target:text-white'}`} />
                  <div className="absolute inset-4 border border-indigo-500/20 rounded-[32px] animate-spin-slow opacity-20" />
               </div>
               <div className="text-center">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-2">Matter_Solvent_0x88</div>
                  <div className="text-4xl font-tech font-bold text-white uppercase tracking-tighter">Liquid_Logic</div>
               </div>
            </div>

            {/* CURSOR HUD - Убрана задержка перемещения */}
            <div 
              className="absolute pointer-events-none"
              style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
            >
               <div className="w-16 h-16 border border-indigo-500/30 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping shadow-[0_0_15px_#6366f1]" />
               </div>
            </div>

            <div className="absolute bottom-12 left-12">
               <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900/80 border border-white/10 rounded-full">
                  <Waves className="w-3 h-3 text-indigo-400 animate-pulse" />
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Viscous_Sync: ENABLED</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
