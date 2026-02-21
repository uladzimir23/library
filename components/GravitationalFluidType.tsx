
import React, { useState, useContext, useRef } from 'react';
import { Type, Move3d, Activity, Droplets } from 'lucide-react';
import { LanguageContext } from '../App';

export const GravitationalFluidType: React.FC = () => {
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

  const text = "SPATIAL_MATTER";
  const letters = text.split("");

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <svg className="absolute w-0 h-0">
        <filter id="fluid-text">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              02_Fluid_Kinetic_Type
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Гравитация <br /><span className="text-sky-400">Смысла.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Текст — это не статичная картинка. Это набор частиц, обладающих массой. Каждая буква этого заголовка физически притягивается к вашему курсору, искажая пространство вокруг себя.
            </p>
          </div>

          <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500">
                   <Droplets className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Text_Viscosity</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">0.82_POISE</div>
                </div>
             </div>
             <Activity className="w-5 h-5 text-sky-500 animate-pulse" />
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
           
           <div className="flex gap-4 items-center justify-center select-none" style={{ filter: 'url(#fluid-text)' }}>
              {letters.map((char, i) => {
                // Псевдо-физика для каждой буквы
                const rect = containerRef.current?.getBoundingClientRect();
                const charX = rect ? (rect.width / 2) + (i - letters.length / 2) * 40 : 0;
                const charY = rect ? rect.height / 2 : 0;
                
                const dx = mousePos.x - charX;
                const dy = mousePos.y - charY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const pull = Math.max(0, 1 - dist / 300);

                return (
                  <div 
                    key={i} 
                    className="text-7xl md:text-8xl font-tech font-black text-sky-500 transition-transform duration-150 ease-out will-change-transform"
                    style={{ 
                      transform: `translate(${dx * pull * 0.4}px, ${dy * pull * 0.4}px) rotate(${dx * pull * 0.1}deg) scale(${1 + pull * 0.5})`
                    }}
                  >
                    {char}
                  </div>
                );
              })}
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <Type className="w-4 h-4 text-sky-500" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Kinetic_Type_Buffer: ACTIVE</span>
           </div>
        </div>
      </div>
    </div>
  );
};
