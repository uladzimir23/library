
import React, { useState, useContext, useRef } from 'react';
import { Droplet, Activity, Wind, Anchor } from 'lucide-react';
import { LanguageContext } from '../App';

export const ViscoelasticSyrup: React.FC = () => {
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

  const text = "VISCOUS_DATA";
  const letters = text.split("");

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <svg className="absolute w-0 h-0">
        <filter id="syrup-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12" result="goo" />
        </filter>
      </svg>

      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              02_Viscoelastic_Flow
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Тягучая <br /><span className="text-amber-500">Материя.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Интерфейс имеет вязкость. Каждая буква связана с курсором невидимой нитью «цифрового сиропа». Движение требует усилий, материя сопротивляется, создавая эффект глубокого тактильного погружения.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-900/50 rounded-[40px] border border-white/10 flex flex-col gap-3">
                <Droplet className="w-6 h-6 text-amber-500" />
                <div className="text-[10px] font-bold text-zinc-500 uppercase">Kinetic_Lag</div>
                <div className="text-2xl font-tech font-bold text-white uppercase">840_MS</div>
             </div>
             <div className="p-8 bg-zinc-900/50 rounded-[40px] border border-white/10 flex flex-col gap-3">
                <Anchor className="w-6 h-6 text-indigo-500" />
                <div className="text-[10px] font-bold text-zinc-500 uppercase">Tension_Alpha</div>
                <div className="text-2xl font-tech font-bold text-white uppercase">0.92_NEW</div>
             </div>
          </div>
        </div>

        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex-[1.5] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5 cursor-none"
        >
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           
           {/* SVG нити тягучести */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              {letters.map((_, i) => {
                 const charX = containerRef.current ? (containerRef.current.offsetWidth / 3.5) + (i * 35) : 0;
                 const charY = 275;
                 const dist = Math.hypot(mousePos.x - charX, mousePos.y - charY);
                 if (dist > 300) return null;
                 
                 return (
                    <path 
                      key={i}
                      d={`M ${charX} ${charY} Q ${charX + (mousePos.x - charX)/2} ${charY}, ${mousePos.x} ${mousePos.y}`}
                      fill="none" 
                      stroke="#f59e0b" 
                      strokeWidth={10 * (1 - dist/300)}
                      className="transition-all duration-300 ease-out"
                    />
                 );
              })}
           </svg>

           <div className="flex gap-1 items-center justify-center select-none" style={{ filter: 'url(#syrup-goo)' }}>
              {letters.map((char, i) => {
                const charX = containerRef.current ? (containerRef.current.offsetWidth / 3.5) + (i * 35) : 0;
                const charY = 275;
                const dx = mousePos.x - charX;
                const dy = mousePos.y - charY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const stretch = Math.max(0, 1 - dist / 350);

                return (
                  <div 
                    key={i} 
                    className="text-4xl md:text-6xl font-tech font-black text-amber-500 transition-all duration-500 ease-out will-change-transform flex items-center justify-center"
                    style={{ 
                      transform: `translate(${dx * stretch * 0.15}px, ${dy * stretch * 0.15}px) scaleX(${1 + Math.abs(dx)*stretch*0.005})`,
                      opacity: 0.4 + stretch * 0.6
                    }}
                  >
                    {char}
                  </div>
                );
              })}
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <Wind className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Atmospheric_Viscosity: HIGH</span>
           </div>
        </div>
      </div>
    </div>
  );
};
