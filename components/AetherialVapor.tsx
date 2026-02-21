
import React, { useState, useContext, useRef } from 'react';
import { Wind, Activity, Zap, Cloud } from 'lucide-react';
import { LanguageContext } from '../App';

export const AetherialVapor: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
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

  const text = "AETHER_GAS";
  const letters = text.split("");

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <svg className="absolute w-0 h-0">
        <filter id="vapor-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              01_Vapor_Disintegration
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Эфирный <br /><span className="text-rose-400">Газ.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Текст, который ведет себя как дым. Каждая буква состоит из вязкой материи, которая начинает испаряться и терять форму при контакте с вашим энергетическим полем (курсором).
            </p>
          </div>

          <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 transition-all group-hover:scale-110">
                   <Wind className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Gas_Density</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">0.14_KPA</div>
                </div>
             </div>
             <Cloud className="w-5 h-5 text-rose-500 animate-pulse" />
          </div>
        </div>

        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex-[1.5] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5 cursor-none"
        >
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f43f5e 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
           
           <div className="flex gap-2 items-center justify-center select-none" style={{ filter: 'url(#vapor-goo)' }}>
              {letters.map((char, i) => {
                const charX = containerRef.current ? (containerRef.current.offsetWidth / 4) + (i * 50) : 0;
                const charY = 275;
                const dx = mousePos.x - charX;
                const dy = mousePos.y - charY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const push = Math.max(0, 1 - dist / 250);

                return (
                  <div 
                    key={i} 
                    className="text-6xl md:text-7xl font-tech font-black text-rose-500 transition-all duration-300 ease-out will-change-transform flex items-center justify-center"
                    style={{ 
                      transform: `translate(${dx * push * -0.6}px, ${dy * push * -0.6}px) scale(${1 + push * 1.5})`,
                      filter: `blur(${push * 15}px)`,
                      opacity: 1 - push * 0.5
                    }}
                  >
                    {char}
                    {/* Локальные "капли" дыма */}
                    <div className="absolute w-4 h-4 bg-rose-500 rounded-full blur-md opacity-40 animate-ping" style={{ display: isHovered && push > 0.3 ? 'block' : 'none' }} />
                  </div>
                );
              })}
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <Activity className="w-4 h-4 text-rose-500" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Atmospheric_Stability: LOW</span>
           </div>
        </div>
      </div>
    </div>
  );
};
