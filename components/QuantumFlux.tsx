
import React, { useState, useContext, useEffect } from 'react';
import { Zap, Radio, RefreshCcw, Activity, ShieldAlert, Cpu, Sliders } from 'lucide-react';
import { playUISound } from '../wooden/components/AudioService';

export const QuantumFlux: React.FC = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [stability, setStability] = useState(100);
  
  // Local Settings
  const [noiseScale, setNoiseScale] = useState(0.8);
  const [frequency, setFrequency] = useState(1500);

  useEffect(() => {
    const interval = setInterval(() => {
      const chance = Math.random();
      if (chance > (1.1 - noiseScale)) {
        setIsGlitching(true);
        setStability(Math.floor(Math.random() * 40) + 20);
        playUISound('process');
        setTimeout(() => {
          setIsGlitching(false);
          setStability(100);
        }, 150);
      }
    }, frequency);
    return () => clearInterval(interval);
  }, [noiseScale, frequency]);

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
         </div>
         <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Decoherence_Workbench_v1.0</div>
         <div className="w-12 h-1 bg-current opacity-5 rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* LEFT SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-6">
               <div className="flex items-center gap-3 text-indigo-500 mb-6">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Инжекция_Хаоса</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Шум_Текстуры</span>
                     <span className="text-indigo-500">{(noiseScale * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                     type="range" min="0.1" max="1.0" step="0.05" 
                     value={noiseScale}
                     onChange={(e) => setNoiseScale(parseFloat(e.target.value))}
                     className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
                  />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Частота_Скачков</span>
                     <span className="text-indigo-500">{frequency}ms</span>
                  </div>
                  <input 
                     type="range" min="500" max="5000" step="100" 
                     value={frequency}
                     onChange={(e) => setFrequency(parseInt(e.target.value))}
                     className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
                  />
               </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Описание_Модуля</h4>
              <p className="text-xs font-light leading-relaxed text-zinc-500 italic">
                Квантовая нестабильность (Flux) — это состояние материи, при котором структурные связи начинают спонтанно разрушаться. В этом окне вы можете калибровать уровень декогеренции и наблюдать за восстановлением системы.
              </p>
            </div>

            <div className="mt-auto p-4 bg-black/20 rounded-2xl border border-white/5 text-[8px] font-mono text-zinc-600 uppercase">
               Interference: DETECTED<br />
               Sync_Mode: QUANTUM
            </div>
         </div>

         {/* MAIN VIEWPORT */}
         <div className="flex-1 w-full h-[600px] bg-zinc-950 relative overflow-hidden flex items-center justify-center group">
            <div className={`relative w-80 h-96 transition-all duration-75 border flex flex-col items-center justify-center p-12 overflow-hidden ${
              isGlitching ? 'bg-rose-500/20 border-rose-500/50 blur-[2px] skew-x-2' : 'bg-white/5 border-white/20 blur-0 skew-x-0'
            } rounded-[48px] backdrop-blur-3xl shadow-2xl`}>
               
               {isGlitching && (
                 <div className="absolute inset-0 z-50 flex flex-col justify-between p-4 opacity-50">
                    <div className="h-[2px] w-full bg-rose-500/40" />
                    <div className="h-[1px] w-1/2 bg-white/40 ml-auto" />
                    <div className="h-[3px] w-full bg-indigo-500/40" />
                 </div>
               )}

               <div className={`w-20 h-20 rounded-3xl bg-rose-500 flex items-center justify-center text-white shadow-xl transition-transform ${isGlitching ? 'scale-125 rotate-6 translate-x-2' : 'scale-100 rotate-0'}`}>
                  <Zap className="w-10 h-10" />
               </div>
               
               <div className="mt-8 text-center">
                  <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-zinc-900 dark:text-white">Состояние: {isGlitching ? 'НЕСТАБИЛЬНО' : 'СТАБИЛЬНО'}</div>
                  <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter">Блок_0xFlux</div>
               </div>
            </div>

            <div className="absolute bottom-12 left-12 flex items-center gap-3">
               <div className={`w-2 h-2 rounded-full ${isGlitching ? 'bg-rose-500 animate-ping' : 'bg-zinc-800'}`} />
               <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Сигнал: {isGlitching ? 'ОШИБКА' : 'НОРМА'}</span>
            </div>
         </div>
      </div>
    </div>
  );
};
