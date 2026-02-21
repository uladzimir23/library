
import React, { useState, useContext, useRef } from 'react';
import { Droplet, Activity, Zap, Disc } from 'lucide-react';
import { LanguageContext } from '../App';

export const MoltenChromeFlow: React.FC = () => {
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

  const text = "LIQUID_METAL";
  const letters = text.split("");

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <svg className="absolute w-0 h-0">
        <filter id="chrome-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-zinc-500/10 border border-white/10 text-zinc-400 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              01_Mercury_Dynamics
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Жидкий <br /><span className="text-zinc-400">Хром.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Текст как ртуть. Буквы обладают экстремальным поверхностным натяжением. При сближении они пытаются поглотить друг друга, создавая неразрывный поток металлической мысли.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-white/5 dark:bg-zinc-900/50 rounded-[40px] border border-white/5 flex flex-col justify-between group">
                <Droplet className="w-8 h-8 text-zinc-400 mb-4 group-hover:animate-bounce" />
                <div>
                   <div className="text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-widest">Surface_Tension</div>
                   <div className="text-3xl font-tech font-bold text-white">0.98_SIGMA</div>
                </div>
             </div>
             <div className="p-8 bg-white/5 dark:bg-zinc-900/50 rounded-[40px] border border-white/5 flex flex-col justify-between group">
                <Disc className="w-8 h-8 text-indigo-500 mb-4 animate-spin-slow" />
                <div>
                   <div className="text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-widest">Reflect_Power</div>
                   <div className="text-3xl font-tech font-bold text-white">MAX_SPEC</div>
                </div>
             </div>
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5 cursor-none">
           <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 via-zinc-950 to-zinc-800/20" />
           
           <div className="flex gap-1 items-center justify-center select-none" style={{ filter: 'url(#chrome-goo)' }}>
              {letters.map((char, i) => {
                const charX = containerRef.current ? (containerRef.current.offsetWidth / 4) + (i * 45) : 0;
                const charY = 275;
                const dx = mousePos.x - charX;
                const dy = mousePos.y - charY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const pull = Math.max(0, 1 - dist / 350);

                return (
                  <div 
                    key={i} 
                    className="text-6xl md:text-8xl font-tech font-black transition-transform duration-150 ease-out will-change-transform flex items-center justify-center"
                    style={{ 
                      color: '#e5e7eb',
                      textShadow: '0 0 20px rgba(255,255,255,0.3)',
                      transform: `translate(${dx * pull * 0.5}px, ${dy * pull * 0.5}px) scale(${1 + pull * 0.8})`,
                      backgroundImage: 'linear-gradient(to bottom, #fff, #9ca3af, #374151)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {char}
                  </div>
                );
              })}
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <Activity className="w-4 h-4 text-zinc-500" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Molecular_Flow: ACTIVE</span>
           </div>
        </div>
      </div>
    </div>
  );
};
