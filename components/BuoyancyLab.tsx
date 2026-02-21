
import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Anchor, Activity, Wind, Droplets } from 'lucide-react';
import { playUISound } from '../wooden/components/AudioService';

export const BuoyancyLab: React.FC = () => {
  const [fluidDensity, setFluidDensity] = useState(0.84);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const ticker = setInterval(() => setTime(t => t + 0.05), 30);
    return () => clearInterval(ticker);
  }, []);

  const items = [
    { label: 'Heavy_Block', mass: 1.2, color: 'zinc' },
    { label: 'Core_Unit', mass: 0.6, color: 'sky' },
    { label: 'Lite_Bubble', mass: 0.2, color: 'emerald' }
  ];

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            <div className="w-3 h-3 rounded-full bg-zinc-500/50" />
         </div>
         <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Archimedes_Workbench_v2.4</div>
         <div className="w-12 h-1 bg-current opacity-5 rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-6">
               <div className="flex items-center gap-3 text-emerald-400 mb-6">
                  <Anchor className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Плотность_Среды</span>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Плотность_Жидкости</span>
                     <span className="text-emerald-400">{fluidDensity.toFixed(2)}_ρ</span>
                  </div>
                  <input type="range" min="0.1" max="2.0" step="0.01" value={fluidDensity} onChange={e => setFluidDensity(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500" />
               </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Описание_Стенда</h4>
              <p className="text-xs font-light leading-relaxed text-zinc-500 italic">
                Симуляция плавучести. Объекты погружены в цифровую жидкость. Глубина их погружения и амплитуда «раскачки» на волнах зависят от их собственной массы и плотности окружающей среды.
              </p>
            </div>
         </div>

         {/* VIEWPORT */}
         <div className="flex-1 bg-zinc-950 relative overflow-hidden flex items-center justify-around p-12">
            {/* Water Surface Line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.4)] z-0" />
            
            {items.map((item, i) => {
              // Physics logic: погружение зависит от (mass / fluidDensity)
              const buoyancyFactor = item.mass / fluidDensity;
              const depthOffset = (buoyancyFactor - 1) * 100;
              const waveHeight = 20 / item.mass;
              const bobbing = Math.sin(time + i) * waveHeight;

              return (
                <div 
                  key={i}
                  className="relative transition-all duration-1000 ease-out"
                  style={{ transform: `translateY(${depthOffset + bobbing}px)` }}
                >
                   <div className={`w-40 h-56 rounded-[40px] border-2 backdrop-blur-3xl p-8 flex flex-col justify-between shadow-2xl
                     ${item.mass > 1 ? 'bg-zinc-800/40 border-white/10' : item.mass < 0.3 ? 'bg-emerald-500/20 border-emerald-400/40 shadow-emerald-500/20' : 'bg-sky-500/10 border-sky-400/30'}
                   `}>
                      <div className="flex justify-between items-start">
                         <div className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10`}>
                            <Droplets className={`w-5 h-5 ${item.mass < 0.3 ? 'text-emerald-400' : 'text-sky-400'}`} />
                         </div>
                         <div className="text-[8px] font-mono opacity-30 text-white uppercase">0x0{i}</div>
                      </div>
                      <div className="space-y-1">
                         <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{item.label}</div>
                         <div className="text-xl font-tech font-bold text-white uppercase tracking-tighter">{(item.mass).toFixed(1)}kg</div>
                      </div>
                   </div>
                   {/* Submerged Shadow */}
                   <div className="absolute top-full left-1/2 -translate-x-1/2 w-32 h-8 bg-cyan-500/10 blur-2xl rounded-full opacity-40" />
                </div>
              );
            })}

            {/* Environmental HUD */}
            <div className="absolute top-12 left-12 flex items-center gap-4 text-cyan-500/40">
               <Activity className="w-5 h-5 animate-pulse" />
               <span className="text-[10px] font-mono uppercase tracking-widest">Buoyancy_Forces: BALANCED</span>
            </div>
         </div>
      </div>
    </div>
  );
};
