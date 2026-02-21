
import React, { useState, useRef, useEffect } from 'react';
import { MousePointer2, Activity, Wind, Droplets, Sliders, Waves, Gauge } from 'lucide-react';
import { playUISound } from '../wooden/components/AudioService';

export const FluidDynamics: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [targetRadii, setTargetRadii] = useState({ tl: 48, tr: 48, bl: 48, br: 48 });
  const [currentRadii, setCurrentRadii] = useState({ tl: 48, tr: 48, bl: 48, br: 48 });
  const [velocity, setVelocity] = useState(0);
  const [slosh, setSlosh] = useState(0); 
  
  const lastPos = useRef({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [viscosity, setViscosity] = useState(0.3); 
  const [tension, setTension] = useState(0.5); 

  useEffect(() => {
    let frame = requestAnimationFrame(function animate() {
      setCurrentRadii(prev => ({
        tl: prev.tl + (targetRadii.tl - prev.tl) * (1 - viscosity * 0.9),
        tr: prev.tr + (targetRadii.tr - prev.tr) * (1 - viscosity * 0.9),
        bl: prev.bl + (targetRadii.bl - prev.bl) * (1 - viscosity * 0.9),
        br: prev.br + (targetRadii.br - prev.br) * (1 - viscosity * 0.9),
      }));
      
      setSlosh(s => s * 0.9);
      setVelocity(v => v * 0.95);
      
      frame = requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(frame);
  }, [targetRadii, viscosity]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const currentV = Math.sqrt(dx * dx + dy * dy) * 100;
    
    setVelocity(prev => Math.min(100, prev + currentV));
    setSlosh(dx * 50);
    setMousePos({ x, y });
    lastPos.current = { x, y };

    const calcBase = (tx: number, ty: number) => {
      const dist = Math.hypot(x - tx, y - ty);
      const influence = Math.max(0, 1 - dist * 1.5);
      return 48 + (influence * 150 * (1 - tension)) + (currentV * influence * 5);
    };

    setTargetRadii({
      tl: calcBase(0, 0),
      tr: calcBase(1, 0),
      bl: calcBase(0, 1),
      br: calcBase(1, 1)
    });
  };

  return (
    <div className="relative rounded-[48px] border overflow-hidden glass-panel p-1">
      {/* ТЕХНИЧЕСКАЯ ШАПКА */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/5 bg-zinc-100/50 dark:bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-text-muted">Matter_Viscosity_Core_v5.2</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="text-[8px] font-mono text-text-muted uppercase">Pressure</div>
               <div className="text-xs font-tech font-bold text-cyan-600 dark:text-cyan-500">{(velocity * (1 - tension)).toFixed(2)}_PSI</div>
            </div>
            <div className="w-12 h-1 bg-black/5 dark:bg-white/5 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-[750px]">
         {/* ПАНЕЛЬ УПРАВЛЕНИЯ */}
         <div className="w-full lg:w-80 border-r border-black/5 dark:border-white/5 p-8 flex flex-col gap-10 bg-zinc-100/30 dark:bg-zinc-900/30">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-cyan-600 dark:text-cyan-500">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-main">Реология_Данных</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-text-muted">
                     <span>Вязкость (Viscosity)</span>
                     <span className="text-cyan-600 dark:text-cyan-500">{(viscosity * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                     type="range" min="0.05" max="0.8" step="0.01" 
                     value={viscosity}
                     onChange={(e) => setViscosity(parseFloat(e.target.value))}
                     className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
                  />
                  <p className="text-[8px] text-text-muted leading-tight">Определяет инерцию возврата формы. Чем выше, тем медленнее реакция.</p>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-text-muted">
                     <span>Натяжение (Tension)</span>
                     <span className="text-cyan-600 dark:text-cyan-500">{(tension * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                     type="range" min="0.1" max="0.9" step="0.01" 
                     value={tension}
                     onChange={(e) => setTension(parseFloat(e.target.value))}
                     className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
                  />
                  <p className="text-[8px] text-text-muted leading-tight">Сила, удерживающая форму квадрата. Чем ниже, тем более «жидким» становится объект.</p>
               </div>
            </div>

            <div className="mt-auto p-6 bg-white dark:bg-black/40 rounded-[32px] border border-black/5 dark:border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">Flow_Stability</span>
               </div>
               <div className="text-2xl font-tech font-bold text-text-main uppercase tracking-tighter">
                  {velocity > 40 ? 'Turbulent' : 'Laminar'}
               </div>
            </div>
         </div>

         {/* ОСНОВНОЙ ВЬЮПОРТ */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="flex-1 bg-surface relative overflow-hidden flex flex-col items-center justify-center group shadow-inner cursor-none"
         >
            {/* Глубинное свечение, реагирующее на мышь */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-30 transition-transform duration-1000" 
              style={{ transform: `scale(1.2) translate(${(mousePos.x - 0.5) * 50}px, ${(mousePos.y - 0.5) * 50}px)` }}
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-900/10 rounded-full blur-[120px]" />
            </div>

            {/* ГЛАВНЫЙ ФЛЮИДНЫЙ ОБЪЕКТ */}
            <div 
              className={`relative w-96 h-96 transition-transform duration-200 backdrop-blur-3xl border border-black/10 dark:border-white/20 bg-white/10 dark:bg-white/5 shadow-2xl overflow-hidden`}
              style={{ 
                borderRadius: `${currentRadii.tl}px ${currentRadii.tr}px ${currentRadii.br}px ${currentRadii.bl}px`,
                transform: `rotateX(${(mousePos.y - 0.5) * -20}deg) rotateY(${(mousePos.x - 0.5) * 20}deg) scale(${1 - velocity * 0.001})`,
              }}
            >
               {/* Эффект Плещущейся Жидкости */}
               <div 
                 className="absolute inset-0 bg-cyan-500/10 transition-transform duration-500 ease-out"
                 style={{ transform: `translateX(${slosh * 20}px) translateY(${Math.abs(slosh) * 10}px)` }}
               >
                  <div className="absolute bottom-0 left-[-50%] w-[200%] h-[60%] bg-gradient-to-t from-cyan-500/20 via-cyan-500/5 to-transparent skew-y-[-5deg]" />
               </div>

               {/* Контент внутри объекта */}
               <div className="relative z-10 flex flex-col items-center gap-6">
                  <div 
                    className="w-24 h-24 rounded-full bg-cyan-600 flex items-center justify-center text-white shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-all duration-300"
                    style={{ transform: `scale(${1 + velocity * 0.005}) rotate(${slosh * 10}deg)` }}
                  >
                     <Droplets className="w-12 h-12" />
                  </div>
                  <div className="text-center">
                     <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-text-main">Dynamic_Fluid_0x88</div>
                     <div className="text-3xl font-tech font-bold text-text-main uppercase tracking-widest">Liquid_Logic</div>
                  </div>
               </div>

               {/* Блики по краям */}
               <div className="absolute inset-0 border-t border-l border-white/20 rounded-[inherit] pointer-events-none" />
            </div>

            {/* ИНТЕРАКТИВНЫЙ КУРСОР "ДАВЛЕНИЯ" */}
            <div 
              className="absolute w-16 h-16 border-2 border-cyan-500/40 rounded-full flex items-center justify-center pointer-events-none transition-transform duration-75"
              style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
            >
               <div className={`w-1 h-1 bg-cyan-500 dark:bg-cyan-400 rounded-full ${velocity > 1 ? 'animate-ping' : ''}`} />
               <MousePointer2 className="w-5 h-5 text-cyan-600 dark:text-cyan-500 absolute scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all" />
            </div>

            {/* ЛОКАЛЬНЫЙ HUD СТАТИСТИКИ */}
            <div className="absolute bottom-12 right-12 text-right">
               <div className="flex items-center gap-3 justify-end text-cyan-600 dark:text-cyan-500 mb-2">
                  <Gauge className="w-4 h-4" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Momentum_Scan</span>
               </div>
               <div className="text-4xl font-tech font-bold text-text-main">{(velocity).toFixed(2)}_V</div>
            </div>
            
            <div className="absolute top-12 left-12">
               <div className="flex items-center gap-3 px-4 py-2 glass-panel rounded-full">
                  <Waves className="w-3 h-3 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                  <span className="text-[8px] font-mono text-text-muted uppercase tracking-widest">Laminar_Flow_Active</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
