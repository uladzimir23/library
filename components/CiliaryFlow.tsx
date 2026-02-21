
import React, { useState, useContext, useRef } from 'react';
import { Wind, MousePointer2, Activity, Fingerprint } from 'lucide-react';
import { LanguageContext } from '../App';

export const CiliaryFlow: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  const gridSize = 16;
  const cells = Array.from({ length: gridSize * gridSize });

  return (
    <div className="scroll-mt-24">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              02_Ciliary_Dynamics
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Ресничный <br /><span className="text-emerald-500">Поток.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Поверхность интерфейса покрыта цифровыми «ресничками». Они реагируют на аэродинамику ваших движений, отклоняясь и создавая визуальное сопротивление, как если бы вы проводили рукой по воде.
            </p>
          </div>

          <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 transition-all group-hover:scale-110">
                   <Wind className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Fluid_Viscosity</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">0.42_STOKES</div>
                </div>
             </div>
             <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
          className="flex-[1.2] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5 cursor-none"
        >
           {/* Сетка ресничек */}
           <div className="grid h-full w-full p-8" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}>
              {cells.map((_, i) => {
                const ix = i % gridSize;
                const iy = Math.floor(i / gridSize);
                const cellX = ix / (gridSize - 1);
                const cellY = iy / (gridSize - 1);
                
                const dx = mousePos.x - cellX;
                const dy = mousePos.y - cellY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                
                // Плавное затухание силы влияния (Gaussian-like)
                const influenceRadius = 0.4;
                const strength = Math.exp(-(dist * dist) / (2 * influenceRadius * influenceRadius));

                return (
                  <div key={i} className="flex items-center justify-center">
                     <div 
                        className="w-0.5 h-6 bg-emerald-500/20 rounded-full transition-all duration-300 ease-out will-change-transform"
                        style={{ 
                          transform: `rotate(${angle}deg) scaleY(${1 + strength * 2.5})`,
                          backgroundColor: strength > 0.4 ? `rgba(16, 185, 129, ${0.2 + strength * 0.8})` : 'rgba(16,185,129,0.15)',
                          opacity: 0.1 + strength * 0.9
                        }}
                     />
                  </div>
                );
              })}
           </div>

           {/* Кастомный курсор "давления" */}
           <div 
             className="absolute w-24 h-24 border border-emerald-500/20 rounded-full flex items-center justify-center pointer-events-none transition-transform duration-75 ease-out"
             style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
           >
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
              <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-xl" />
              <Fingerprint className="w-6 h-6 text-emerald-500 opacity-40 absolute" />
           </div>
        </div>
      </div>
    </div>
  );
};
