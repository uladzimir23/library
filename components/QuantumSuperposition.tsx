
import React, { useState, useContext, useEffect } from 'react';
import { Target, Zap, Sparkles, Box, Maximize2, RefreshCw, Activity, ShieldCheck, Sliders } from 'lucide-react';
import { playUISound } from '../wooden/components/AudioService';

export const QuantumSuperposition: React.FC = () => {
  const [state, setState] = useState(0); 
  const [isLocked, setIsLocked] = useState(false);
  const [stability, setStability] = useState(33);
  
  // Local Settings
  const [amplitude, setAmplitude] = useState(1.8); // Probability shift speed
  const [fixDelay, setFixDelay] = useState(500); // ms

  useEffect(() => {
    if (!isLocked) {
      const interval = setInterval(() => {
        setState(prev => (prev + 1) % 3);
        setStability(Math.floor(Math.random() * 15) + 25);
      }, amplitude * 1000);
      return () => clearInterval(interval);
    } else {
      setStability(100);
    }
  }, [isLocked, amplitude]);

  const states = [
    { label: 'Рефракционное Стекло', blur: 'backdrop-blur-3xl', border: 'border-white/20', bg: 'bg-white/10', glow: 'shadow-[0_0_40px_rgba(255,255,255,0.1)]' },
    { label: 'Зеркальный Хром', blur: 'backdrop-blur-md', border: 'border-white/40', bg: 'bg-zinc-200/20 dark:bg-zinc-700/30', glow: 'shadow-[inset_0_0_60px_rgba(255,255,255,0.2),0_0_50px_rgba(99,102,241,0.2)]' },
    { label: 'Нейронный Фантом', blur: 'backdrop-blur-none', border: 'border-white/10', bg: 'bg-transparent opacity-40', glow: 'shadow-none' }
  ];

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
         </div>
         <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Superposition_Workbench_v2.1</div>
         <div className="w-12 h-1 bg-current opacity-5 rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* LEFT SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-6">
               <div className="flex items-center gap-3 text-rose-500 mb-6">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Вероятностные_Метрики</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Амплитуда_Перехода</span>
                     <span className="text-rose-500">{amplitude.toFixed(1)}s</span>
                  </div>
                  <input 
                     type="range" min="0.5" max="4.0" step="0.1" 
                     value={amplitude}
                     onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                     className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-rose-500"
                  />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Порог_Когерентности</span>
                     <span className="text-rose-500">{stability}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${isLocked ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} style={{ width: `${stability}%` }} />
                  </div>
               </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Описание_Модуля</h4>
              <p className="text-xs font-light leading-relaxed text-zinc-500 italic">
                В этой среде объект не имеет фиксированной формы. Он существует как суперпозиция трех состояний. Наведение курсора имитирует "акт измерения", который схлопывает волновую функцию в конкретную форму.
              </p>
            </div>

            <div className="mt-auto p-4 bg-black/20 rounded-2xl border border-white/5 text-[8px] font-mono text-zinc-600 uppercase">
               Entropy_Safe: TRUE<br />
               Observer_Effect: ACTIVE
            </div>
         </div>

         {/* MAIN VIEWPORT */}
         <div className="flex-1 relative flex items-center justify-center p-12 overflow-hidden bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.02)_0%,transparent_100%)]">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            
            <div 
              onMouseEnter={() => { setIsLocked(true); playUISound('click'); }}
              onMouseLeave={() => setIsLocked(false)}
              className={`relative w-80 h-80 transition-all duration-1000 rounded-[56px] border flex flex-col items-center justify-center p-12 z-10 ${states[state].blur} ${states[state].border} ${states[state].bg} ${states[state].glow}`}
              style={{ transform: `rotateX(15deg) rotateY(-15deg) translateZ(50px) scale(${isLocked ? 1.05 : 1})` }}
            >
               <div className="text-center relative z-20">
                  <div className={`w-20 h-20 bg-rose-500 rounded-full blur-3xl absolute -top-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${isLocked ? 'opacity-30' : 'opacity-10'}`} />
                  {isLocked ? <ShieldCheck className="w-16 h-16 text-white mb-6 animate-[bounce_2s_infinite]" /> : <Target className="w-16 h-16 text-white/40 mb-6" />}
                  <div className="text-[10px] font-mono text-white opacity-40 uppercase tracking-[0.4em] mb-2">Matter_ID: 0xQuantum</div>
                  <div className="text-2xl font-tech font-bold text-white uppercase tracking-tight">{states[state].label.split(' ')[0]}</div>
               </div>
            </div>

            <div className="absolute bottom-12 right-12 text-right">
               <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Coherence_Locked</div>
               <div className={`text-3xl font-tech font-bold transition-colors duration-500 ${isLocked ? 'text-emerald-500' : 'text-rose-500'}`}>
                 {isLocked ? 'TRUE' : 'PENDING'}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
