
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Waves, Droplet, Activity, Compass, Sliders, Wind } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const TidalWaveFlow: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Local Settings
  const [amp, setAmp] = useState(20);
  const [freq, setFreq] = useState(0.05);

  useEffect(() => {
    const interval = setInterval(() => setTime(prev => prev + freq), 30);
    return () => clearInterval(interval);
  }, [freq]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  const text = "OCEANIC_FLOW";
  const letters = text.split("");

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500/50" />
            <div className="w-3 h-3 rounded-full bg-blue-500/50" />
            <div className="w-3 h-3 rounded-full bg-indigo-500/50" />
         </div>
         <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Tidal_Wave_Workbench_v2.0</div>
         <div className="w-12 h-1 bg-current opacity-5 rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* LEFT SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-6">
               <div className="flex items-center gap-3 text-sky-500 mb-6">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Акустика_Волн</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Амплитуда</span>
                     <span className="text-sky-500">{amp}px</span>
                  </div>
                  <input 
                     type="range" min="5" max="80" step="1" 
                     value={amp}
                     onChange={(e) => setAmp(parseInt(e.target.value))}
                     className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-sky-500"
                  />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Частота</span>
                     <span className="text-sky-500">{(freq * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                     type="range" min="0.01" max="0.3" step="0.01" 
                     value={freq}
                     onChange={(e) => setFreq(parseFloat(e.target.value))}
                     className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-sky-500"
                  />
               </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Описание_Стенда</h4>
              <p className="text-xs font-light leading-relaxed text-zinc-500 italic">
                Текст погружен в динамическую среду. Каждая буква обладает плавучестью. Мышь генерирует «приливы», заставляя символы отклоняться и менять глубину в зависимости от расстояния до источника возмущения.
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-3">
               <div className="p-4 bg-black/20 rounded-2xl border border-white/5 flex items-center justify-between">
                  <Wind className="w-4 h-4 text-zinc-500" />
                  <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Buoyancy_Safe</span>
               </div>
            </div>
         </div>

         {/* MAIN VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="flex-1 w-full bg-zinc-950 relative overflow-hidden flex items-center justify-center group shadow-2xl border-white/5"
         >
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-sky-500 blur-xl animate-pulse" />
           </div>
           
           <div className="flex gap-2 items-center justify-center select-none perspective-1000">
              {letters.map((char, i) => {
                const charNormX = i / (letters.length - 1);
                const dx = mousePos.x - charNormX;
                const dy = mousePos.y - 0.5;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                const wave = Math.sin(time + i * 0.5 + dist * 5) * amp;
                const influence = Math.max(0, 1 - dist * 2);

                return (
                  <div 
                    key={i} 
                    className="text-5xl md:text-6xl font-tech font-black text-sky-400 transition-all duration-300 ease-out will-change-transform"
                    style={{ 
                      transform: `translateY(${wave + dy * influence * 150}px) rotateX(${dx * influence * 45}deg) rotateY(${dy * influence * 45}deg)`,
                      opacity: 0.4 + (1 - influence) * 0.6,
                      filter: `blur(${influence * 2}px)`
                    }}
                  >
                    {char}
                  </div>
                );
              })}
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <Compass className="w-4 h-4 text-sky-500 animate-spin-slow" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Surface_Tension: {(1-freq*2).toFixed(2)}</span>
           </div>
        </div>
      </div>
    </div>
  );
};
