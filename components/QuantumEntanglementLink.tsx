
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Infinity, Zap, Activity, Radio, Share2, Target, Globe, RefreshCw, Layers, Sliders } from 'lucide-react';
import { playUISound } from '../wooden/components/AudioService';

type QuantumState = 'СВЯЗАНО' | 'ПОТОК' | 'РАЗРЫВ';

export const QuantumEntanglementLink: React.FC = () => {
  const [state, setState] = useState<QuantumState>('СВЯЗАНО');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [entanglement, setEntanglement] = useState(0.98);
  
  // Local Settings
  const [couplingPower, setCouplingPower] = useState(0.8);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5
      });
    }
  };

  useEffect(() => {
    if (state === 'СВЯЗАНО') setEntanglement(0.98);
    if (state === 'ПОТОК') setEntanglement(0.4 + Math.random() * 0.4);
    if (state === 'РАЗРЫВ') setEntanglement(0.02);
  }, [state]);

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
         </div>
         <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Entanglement_Lab_v4.2</div>
         <div className="w-12 h-1 bg-current opacity-5 rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* LEFT SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-6">
               <div className="flex items-center gap-3 text-emerald-500 mb-6">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Параметры_Спутанности</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Сила_Когерентности</span>
                     <span className="text-emerald-500">{(couplingPower * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                     type="range" min="0.1" max="1.0" step="0.05" 
                     value={couplingPower}
                     onChange={(e) => setCouplingPower(parseFloat(e.target.value))}
                     className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
               </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Описание_Модуля</h4>
              <p className="text-xs font-light leading-relaxed text-zinc-500 italic">
                Квантовая спутанность позволяет двум узлам синхронизировать свои состояния на любом расстоянии. В данном симуляторе второй узел дублирует движения первого с задержкой, определяемой чистотой квантового канала.
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-3">
               {(['СВЯЗАНО', 'ПОТОК', 'РАЗРЫВ'] as QuantumState[]).map((s) => (
                 <button 
                   key={s}
                   onClick={() => { setState(s); playUISound('click'); }}
                   className={`py-3 rounded-xl border text-[9px] font-bold uppercase transition-all ${state === s ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}`}
                 >
                    {s}
                 </button>
               ))}
            </div>
         </div>

         {/* MAIN VIEWPORT */}
         <div 
           onMouseMove={handleMouseMove}
           className="flex-1 bg-white/5 relative flex flex-col lg:flex-row items-center justify-around p-8 overflow-hidden group shadow-inner"
         >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02)_0%,transparent_70%)]" />

            {/* NODE A */}
            <div 
              className="relative w-48 h-48 transition-all duration-300 ease-out"
              style={{ transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px) rotateX(${mousePos.y * 30}deg) rotateY(${mousePos.x * 30}deg)` }}
            >
               <div className={`absolute inset-0 rounded-[40px] border-2 border-emerald-500/30 bg-emerald-500/5 shadow-2xl flex items-center justify-center`}>
                  <Infinity className={`w-12 h-12 text-emerald-500 animate-pulse`} />
               </div>
            </div>

            {/* NODE B (The Mirror) */}
            <div 
              className="relative w-48 h-48 transition-all duration-500 ease-out"
              style={{ 
                transform: `translate(${mousePos.x * 60 * entanglement * couplingPower}px, ${mousePos.y * 60 * entanglement * couplingPower}px) rotateX(${mousePos.y * 30 * entanglement}deg) rotateY(${mousePos.x * 30 * entanglement}deg)`,
                opacity: 0.2 + entanglement * 0.8,
                filter: `blur(${(1 - entanglement) * 10}px)`
              }}
            >
               <div className={`absolute inset-0 rounded-[40px] border-2 border-indigo-500/30 bg-indigo-500/5 shadow-2xl flex items-center justify-center`} />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Infinity className={`w-12 h-12 text-indigo-400 opacity-60`} />
               </div>
            </div>

            {/* Sync Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
               <line 
                 x1="30%" y1="50%" x2="70%" y2="50%" 
                 stroke="#10b981" strokeWidth="2" strokeDasharray="10 20" 
                 className={`transition-all duration-1000 ${state === 'СВЯЗАНО' ? 'animate-[dash_2s_linear_infinite]' : ''}`}
                 style={{ opacity: entanglement }}
               />
            </svg>
         </div>
      </div>
      <style>{`
        @keyframes dash { to { stroke-dashoffset: -30; } }
      `}</style>
    </div>
  );
};
