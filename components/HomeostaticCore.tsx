
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Target, Activity, RefreshCw, Zap } from 'lucide-react';
import { LanguageContext } from '../App';

export const HomeostaticCore: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    const update = () => {
      // Физика пружины (возврат к центру)
      const stiffness = 0.12;
      const damping = 0.82;

      let ax = -stiffness * offset.x;
      let ay = -stiffness * offset.y;

      // Внешнее влияние курсора (реактивное отталкивание)
      if (mouseRef.current.active) {
        const dx = offset.x - mouseRef.current.x;
        const dy = offset.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const forceLimit = 300;
        
        if (dist < forceLimit) {
          const pushStrength = Math.pow(1 - dist / forceLimit, 2) * 25;
          ax += (dx / dist) * pushStrength;
          ay += (dy / dist) * pushStrength;
        }
      }

      const newVx = (velocity.x + ax) * damping;
      const newVy = (velocity.y + ay) * damping;

      setVelocity({ x: newVx, y: newVy });
      setOffset(prev => ({
        x: prev.x + newVx,
        y: prev.y + newVy
      }));

      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [offset, velocity]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Координаты относительно центра контейнера
    mouseRef.current = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
      active: true
    };
  };

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => mouseRef.current.active = false}>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              01_Homeostatic_Balance
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Гомеостаз <br /><span className="text-emerald-500">Материи.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Интерфейс стремится к покою. Как живая клетка, ядро BioGlass восстанавливает свою структуру после любого внешнего воздействия, используя алгоритмы биологической инерции.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10">
                <RefreshCw className={`w-8 h-8 text-emerald-500 mb-4 ${Math.abs(velocity.x) > 0.5 ? 'animate-spin' : ''}`} />
                <div className="text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-widest">Equilibrium_Lag</div>
                <div className="text-3xl font-tech font-bold text-zinc-900 dark:text-white">
                  {(Math.abs(offset.x) + Math.abs(offset.y)).toFixed(1)}ms
                </div>
             </div>
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10">
                <Activity className="w-8 h-8 text-indigo-500 mb-4 animate-pulse" />
                <div className="text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-widest">Stability_Acc</div>
                <div className="text-3xl font-tech font-bold text-emerald-500">99.98%</div>
             </div>
          </div>
        </div>

        <div className="flex-[1.2] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           
           {/* Центральная "Якорная" точка */}
           <div className="absolute w-2 h-2 bg-emerald-500/20 rounded-full" />

           {/* Гомеостатическое ядро */}
           <div 
             className="relative w-48 h-48 will-change-transform"
             style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
           >
              <div className="absolute inset-0 bg-emerald-600/10 backdrop-blur-3xl border border-emerald-500/30 rounded-full shadow-[0_0_100px_rgba(16,185,129,0.2)] flex items-center justify-center">
                 <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                    <Zap className="w-10 h-10" />
                 </div>
              </div>
              
              {/* Силовые линии к центру */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible -z-10">
                 <line 
                   x1="50%" y1="50%" 
                   x2={`calc(50% - ${offset.x}px)`} 
                   y2={`calc(50% - ${offset.y}px)`} 
                   stroke="#10b981" 
                   strokeWidth="1" 
                   strokeDasharray="4 4" 
                   opacity="0.3"
                 />
              </svg>
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${Math.abs(offset.x) > 5 ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-800'}`} />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Balance: {Math.abs(offset.x) < 2 ? 'Stable' : 'Calibrating'}</span>
           </div>
        </div>
      </div>
    </div>
  );
};
