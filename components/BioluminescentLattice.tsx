
import React, { useState, useEffect, useContext, useRef } from 'react';
import { ZapOff, Activity, Sparkles, Wind } from 'lucide-react';
import { LanguageContext } from '../App';

export const BioluminescentLattice: React.FC = () => {
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

  const gridSize = 14;
  const nodes = Array.from({ length: gridSize * gridSize });

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              01_Biolum_Plankton
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Биолюминесценция <br /><span className="text-emerald-400">Света.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Интерфейс — это океан. Микро-узлы реагируют на ваше присутствие: они затухают при прямом контакте (реакция защиты) и начинают мерцать в зоне вашего влияния, создавая живое поле активности.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10 flex flex-col justify-between">
                <ZapOff className="w-8 h-8 text-emerald-500 mb-4" />
                <div>
                   <div className="text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-widest">Inhibition_Factor</div>
                   <div className="text-3xl font-tech font-bold text-zinc-900 dark:text-white">0.94_ALPHA</div>
                </div>
             </div>
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10 flex flex-col justify-between">
                <Sparkles className="w-8 h-8 text-sky-500 mb-4 animate-pulse" />
                <div>
                   <div className="text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-widest">Lumen_Density</div>
                   <div className="text-3xl font-tech font-bold text-emerald-500">1240_NIT</div>
                </div>
             </div>
          </div>
        </div>

        <div className="flex-[1.2] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden p-12 group shadow-2xl border border-white/5 cursor-none">
           <div className="grid h-full w-full gap-2" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}>
              {nodes.map((_, i) => {
                const ix = i % gridSize;
                const iy = Math.floor(i / gridSize);
                const cellX = ix / (gridSize - 1);
                const cellY = iy / (gridSize - 1);
                
                const dx = mousePos.x - cellX;
                const dy = mousePos.y - cellY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Узлы затухают при слишком близком расстоянии (страх)
                // И ярко светятся на среднем расстоянии (возбуждение)
                const fear = Math.max(0, 1 - dist * 8);
                const excite = Math.max(0, 1 - dist * 2.5);
                const finalOpacity = Math.max(0.05, excite - fear);
                const scale = 0.5 + finalOpacity * 1.5;

                return (
                  <div key={i} className="flex items-center justify-center">
                     <div 
                        className="w-2 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          backgroundColor: finalOpacity > 0.3 ? '#10b981' : '#1e293b',
                          boxShadow: finalOpacity > 0.4 ? `0 0 ${finalOpacity * 20}px #10b981` : 'none',
                          opacity: finalOpacity,
                          transform: `scale(${scale})`
                        }}
                     />
                  </div>
                );
              })}
           </div>

           {/* Световой "хищник" */}
           <div 
             className="absolute w-40 h-40 border border-emerald-500/20 rounded-full flex items-center justify-center pointer-events-none transition-transform duration-75"
             style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
           >
              <div className="w-1 h-1 bg-white rounded-full animate-ping" />
              <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-2xl" />
           </div>
        </div>
      </div>
    </div>
  );
};
