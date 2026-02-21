
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Share2, Zap, Activity, Waves, Sliders, Droplets, Info, RefreshCw, Gauge } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const CapillaryFlowSync: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [spread, setSpread] = useState(0);
  const [isWicking, setIsWicking] = useState(false);
  const [viscosity, setViscosity] = useState(0.5);
  const [porosity, setPorosity] = useState(0.7);

  // Сетка 15x15 для визуализации каналов
  const gridSize = 15;
  const cells = useMemo(() => Array.from({ length: gridSize * gridSize }), []);

  useEffect(() => {
    let interval: any;
    if (isWicking) {
      interval = setInterval(() => {
        setSpread(prev => {
          if (prev >= 100) {
            setIsWicking(false);
            return 100;
          }
          // Скорость зависит от вязкости (обратно) и пористости (прямо)
          const speed = (0.5 + porosity) * (1.1 - viscosity) * 1.2;
          return prev + speed;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isWicking, viscosity, porosity]);

  const resetAbsorption = () => {
    setSpread(0);
    setIsWicking(false);
    playUISound('click');
  };

  const startAbsorption = () => {
    if (spread >= 100) setSpread(0);
    setIsWicking(true);
    playUISound('process');
  };

  return (
    <div className="relative rounded-[48px] border overflow-hidden glass-panel p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/5 bg-zinc-100/50 dark:bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500/50 animate-pulse" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-cyan-500 dark:text-cyan-400/60">Capillary_Transport_System_v6.0</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-text-muted uppercase tracking-widest">Hydraulic_State: {isWicking ? 'WICKING' : spread >= 100 ? 'SATURATED' : 'READY'}</div>
            <div className="w-12 h-1 bg-cyan-500/10 rounded-full overflow-hidden">
               <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${spread}%` }} />
            </div>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-black/5 dark:border-white/5 p-8 flex flex-col gap-10 bg-zinc-100/30 dark:bg-zinc-900/50">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-cyan-600 dark:text-cyan-400">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-main">Параметры_Среды</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-text-muted">
                     <span>Вязкость (Viscosity)</span>
                     <span className="text-cyan-600 dark:text-cyan-400">{(viscosity * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="0.9" step="0.01" value={viscosity} onChange={e => setViscosity(parseFloat(e.target.value))} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-text-muted">
                     <span>Пористость (Porosity)</span>
                     <span className="text-cyan-600 dark:text-cyan-400">{(porosity * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.01" value={porosity} onChange={e => setPorosity(parseFloat(e.target.value))} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500" />
               </div>

               <div className="flex flex-col gap-3 pt-4">
                  <button 
                    onClick={startAbsorption}
                    disabled={isWicking}
                    className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 ${isWicking ? 'bg-zinc-300 dark:bg-zinc-800 text-text-muted' : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-cyan-600/20'}`}
                  >
                     {isWicking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                     {isWicking ? 'Впитывание...' : 'Запустить_Трансфер'}
                  </button>
                  <button onClick={resetAbsorption} className="w-full py-4 border border-black/10 dark:border-white/10 rounded-2xl text-[9px] font-bold text-text-muted uppercase hover:bg-black/5 dark:hover:bg-white/5 transition-all">Сбросить_Буфер</button>
               </div>
            </div>

            <div className="mt-auto p-6 bg-white/50 dark:bg-black/40 rounded-[32px] border border-black/5 dark:border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-500">
                  <Gauge className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">Flow_Rate</span>
               </div>
               <div className="text-2xl font-tech font-bold text-text-main uppercase">{(spread * (1.5 - viscosity)).toFixed(1)}_μL/S</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div className="flex-1 bg-surface relative overflow-hidden flex items-center justify-center group shadow-inner">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Simulation Canvas (Container) */}
            <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center p-20">
               
               {/* Капиллярная сетка */}
               <div className="absolute inset-0 grid grid-cols-15 grid-rows-15 p-12 opacity-60 dark:opacity-40">
                  {cells.map((_, i) => {
                     const row = Math.floor(i / gridSize);
                     const col = i % gridSize;
                     const dist = Math.hypot(col - (gridSize/2 - 0.5), row - (gridSize/2 - 0.5));
                     const normalizedDist = (dist / (gridSize / 1.41)) * 100;
                     const isFilled = spread > normalizedDist;
                     
                     return (
                        <div 
                           key={i} 
                           className="relative flex items-center justify-center border-[0.5px] border-black/5 dark:border-white/5"
                        >
                           {/* Горизонтальный канал */}
                           <div className={`absolute w-full h-[1px] transition-all duration-1000 ${isFilled ? 'bg-cyan-500 shadow-[0_0_8px_#0ea5e9]' : 'bg-black/5 dark:bg-white/5'}`} />
                           {/* Вертикальный канал */}
                           <div className={`absolute h-full w-[1px] transition-all duration-1000 ${isFilled ? 'bg-cyan-500 shadow-[0_0_8px_#0ea5e9]' : 'bg-black/5 dark:bg-white/5'}`} />
                           
                           {/* Узел-контейнер */}
                           <div 
                              className={`w-1 h-1 rounded-full transition-all duration-500 ${isFilled ? 'bg-cyan-600 dark:bg-white scale-150 shadow-sm' : 'bg-zinc-200 dark:bg-zinc-800'}`} 
                              style={{ 
                                 opacity: isFilled ? 1 : 0.2,
                                 transitionDelay: `${dist * 50}ms`
                              }}
                           />
                        </div>
                     );
                  })}
               </div>

               {/* Основной визуальный объект впитывания */}
               <div className="relative z-10 text-center">
                  <div className="relative">
                     <Droplets className={`w-24 h-24 mx-auto mb-8 transition-all duration-1000 ${spread > 50 ? 'text-cyan-600 dark:text-white scale-110 drop-shadow-[0_0_30px_#0ea5e9]' : 'text-cyan-500/20'}`} />
                     {isWicking && (
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-32 h-32 border border-cyan-500/20 rounded-full animate-ping" />
                        </div>
                     )}
                  </div>
                  <div className="space-y-2">
                     <div className="text-[10px] font-mono text-cyan-600 dark:text-cyan-500/60 uppercase tracking-[0.5em]">System_Saturation</div>
                     <div className="text-5xl font-tech font-bold text-text-main uppercase tracking-tighter">
                        {spread.toFixed(1)}%
                     </div>
                  </div>
               </div>

               {/* Декоративные частицы "испарения" */}
               {isWicking && [...Array(10)].map((_, i) => (
                 <div 
                   key={i}
                   className="absolute w-1 h-1 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-float-up opacity-0"
                   style={{ 
                     left: `${20 + Math.random() * 60}%`, 
                     bottom: '40%', 
                     animationDelay: `${i * 0.3}s`,
                     animationDuration: `${2 + Math.random() * 2}s`
                   }}
                 />
               ))}
            </div>

            <div className="absolute bottom-12 left-12 flex items-center gap-4">
               <Info className="w-4 h-4 text-text-muted opacity-40" />
               <div className="text-[9px] font-mono text-text-muted uppercase tracking-widest leading-tight">
                  Механика: Адгезия {porosity > 0.5 ? 'ВЫСОКАЯ' : 'НОРМА'} <br />
                  Коэффициент: {viscosity.toFixed(2)} PAS
               </div>
            </div>
         </div>
      </div>

      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }
        .animate-float-up { animation: float-up 3s ease-out infinite; }
        .grid-cols-15 { grid-template-columns: repeat(15, 1fr); }
        .grid-rows-15 { grid-template-rows: repeat(15, 1fr); }
      `}</style>
    </div>
  );
};
