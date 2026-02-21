
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Magnet, Activity, Zap, Disc } from 'lucide-react';
import { LanguageContext } from '../App';

export const FerrofluidSpikeType: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left),
        y: (e.clientY - rect.top)
      });
    }
  };

  const text = "FERRO_ACTIVE";
  const letters = text.split("");

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <svg className="absolute w-0 h-0">
        <filter id="ferro-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
        </filter>
      </svg>

      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-zinc-500/10 border border-white/10 text-zinc-400 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              01_Magnetic_Fluid
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Ферро <br /><span className="text-zinc-500">Жидкость.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Интерфейс реагирует на магнитное поле курсора. Буквы состоят из наночастиц железа в вязкой среде: при приближении «магнита» они деформируются, формируя острые пики вдоль силовых линий.
            </p>
          </div>

          <div className="p-8 bg-zinc-900/50 rounded-[40px] border border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white transition-all group-hover:bg-white group-hover:text-black">
                   <Magnet className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Magnetic_Flux</div>
                   <div className="text-lg font-tech font-bold text-white uppercase tracking-widest">12.4_TESLA</div>
                </div>
             </div>
             <Zap className="w-5 h-5 text-indigo-500 animate-pulse" />
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5 cursor-none">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
           
           <div className="flex gap-2 items-center justify-center select-none" style={{ filter: 'url(#ferro-goo)' }}>
              {letters.map((char, i) => {
                const charX = containerRef.current ? (containerRef.current.offsetWidth / 4) + (i * 45) : 0;
                const charY = 275;
                const dx = mousePos.x - charX;
                const dy = mousePos.y - charY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const power = Math.max(0, 1 - dist / 300);

                return (
                  <div 
                    key={i} 
                    className="text-5xl md:text-7xl font-tech font-black transition-all duration-150 ease-out will-change-transform flex items-center justify-center"
                    style={{ 
                      color: power > 0.4 ? '#fff' : '#444',
                      transform: `translate(${dx * power * 0.3}px, ${dy * power * 0.3}px) scale(${1 + power * 0.2})`,
                      textShadow: power > 0.5 ? '0 0 30px rgba(255,255,255,0.3)' : 'none'
                    }}
                  >
                    {char}
                    {/* Визуализация "шипов" феррофлюида */}
                    {power > 0.3 && (
                       <div 
                          className="absolute w-1 bg-white blur-[1px] transition-all duration-75"
                          style={{ 
                             height: power * 100, 
                             transform: `rotate(${Math.atan2(dy, dx) * (180/Math.PI) - 90}deg) translateY(${-50 * power}px)`,
                             opacity: power
                          }}
                       />
                    )}
                  </div>
                );
              })}
           </div>

           {/* Магнитное свечение курсора */}
           <div 
             className="absolute w-40 h-40 bg-white/5 border border-white/10 rounded-full flex items-center justify-center pointer-events-none transition-transform duration-75 ease-out"
             style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: 'translate(-50%, -50%)' }}
           >
              <div className="w-1 h-1 bg-white rounded-full animate-ping" />
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <Activity className="w-4 h-4 text-zinc-500" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Field_Polarity: STABLE</span>
           </div>
        </div>
      </div>
    </div>
  );
};
