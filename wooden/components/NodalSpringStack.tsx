
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Layers, Zap, Activity, Sliders, Move3d, MousePointer2, RefreshCw, Anchor } from 'lucide-react';
import { playUISound } from './AudioService';

export const NodalSpringStack: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Перекалиброванные параметры: 50% теперь середина (0.15 для жесткости, 0.80 для демпфирования)
  const [stiffness, setStiffness] = useState(0.15);
  const [damping, setDamping] = useState(0.80);
  
  // Состояния слоев (5 слоев)
  const [layers, setLayers] = useState(Array.from({ length: 5 }).map(() => ({ x: 0, y: 0 })));
  const velocities = useRef(Array.from({ length: 5 }).map(() => ({ x: 0, y: 0 })));
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let frame: number;
    const update = () => {
      setLayers(prev => {
        const next = [...prev];
        
        for (let i = 0; i < 5; i++) {
          // Цель для текущего слоя - позиция слоя выше (или курсор для L0)
          const target = i === 0 ? targetPos.current : next[i - 1];
          
          const dx = target.x - next[i].x;
          const dy = target.y - next[i].y;
          
          const ax = dx * stiffness;
          const ay = dy * stiffness;
          
          velocities.current[i].x = (velocities.current[i].x + ax) * damping;
          velocities.current[i].y = (velocities.current[i].y + ay) * damping;
          
          next[i] = {
            x: next[i].x + velocities.current[i].x,
            y: next[i].y + velocities.current[i].y
          };
        }
        return next;
      });
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [stiffness, damping]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      targetPos.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      };
    }
  };

  // Функции маппинга для слайдеров (чтобы 50% было серединой)
  const getStiffnessPercent = () => ((stiffness - 0.01) / (0.30 - 0.01)) * 100;
  const getDampingPercent = () => ((damping - 0.60) / (0.99 - 0.60)) * 100;

  return (
    <div className="scroll-mt-32">
      <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-4">
           <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em]">
             Kinetic_Optical_Chains_v2
           </span>
           <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
             Пружинный <br /><span className="text-indigo-500">Стек.</span>
           </h2>
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[750px] p-1 rounded-[64px] border ${isDark ? 'bg-zinc-950 border-white/5' : 'bg-zinc-100 border-black/5'}`}>
         
         {/* SIDEBAR */}
         <div className={`lg:col-span-3 p-8 border-r flex flex-col gap-10 ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-black/5'}`}>
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-indigo-500">
                  <Sliders className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Calibrated_Physics</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                     <span>Жесткость</span>
                     <span className="text-indigo-500">{getStiffnessPercent().toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" min="0.01" max="0.30" step="0.005" value={stiffness}
                    onChange={e => setStiffness(parseFloat(e.target.value))}
                    className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                     <span>Баунс (Damping)</span>
                     <span className="text-indigo-500">{getDampingPercent().toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" min="0.60" max="0.99" step="0.005" value={damping}
                    onChange={e => setDamping(parseFloat(e.target.value))}
                    className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
               </div>
               
               <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                  <p className="text-[8px] text-zinc-500 leading-relaxed uppercase font-mono">
                    Calibration_Notice: 50/50 settings are now established as the system equilibrium for fluid spatiality.
                  </p>
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-indigo-400">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Chain_Flow_Rate</span>
               </div>
               <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter">
                  {((stiffness * damping) * 100).toFixed(2)} <span className="text-xs opacity-30">FLUX</span>
               </div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="lg:col-span-9 bg-black relative overflow-hidden flex items-center justify-center group shadow-inner cursor-none"
         >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            {/* Connecting Springs SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10 opacity-30">
               {layers.map((layer, i) => {
                 if (i === 0) return null;
                 return (
                   <line 
                     key={i}
                     x1={`calc(50% + ${layers[i-1].x}px)`}
                     y1={`calc(50% + ${layers[i-1].y}px)`}
                     x2={`calc(50% + ${layer.x}px)`}
                     y2={`calc(50% + ${layer.y}px)`}
                     stroke="#6366f1"
                     strokeWidth="2"
                     strokeDasharray="4 4"
                   />
                 );
               })}
            </svg>

            {/* The Chained Glass Layers */}
            <div className="relative w-full h-full flex items-center justify-center perspective-2000 preserve-3d">
               {layers.map((layer, i) => {
                 const zIndex = 50 - i;
                 return (
                   <div 
                     key={i}
                     className="absolute w-[400px] h-[260px] transition-shadow duration-300 border-2 rounded-[56px] shadow-2xl flex flex-col items-center justify-center p-8 backdrop-blur-md"
                     style={{ 
                       transform: `translate3d(${layer.x}px, ${layer.y}px, ${i * -60}px) scale(${1 - i * 0.05})`,
                       zIndex: zIndex,
                       backgroundColor: `rgba(255, 255, 255, ${0.05 + i * 0.02})`,
                       borderColor: `rgba(99, 102, 241, ${0.2 + (5-i) * 0.1})`,
                       backdropFilter: `blur(${20 + (4-i) * 10}px)`
                     }}
                   >
                      <div className="absolute top-6 left-10 flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                         <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Layer_0{i} // Fluid_Lock</span>
                      </div>
                      
                      <div className={`transition-all duration-700 ${Math.abs(velocities.current[i].x) > 1 ? 'scale-110' : 'scale-100'}`}>
                         {i === 0 ? <Zap className="w-12 h-12 text-indigo-500" /> : <Anchor className="w-8 h-8 text-zinc-700" />}
                      </div>
                   </div>
                 );
               })}
            </div>

            {/* CUSTOM CURSOR HUD */}
            <div 
              className="absolute pointer-events-none z-50 transition-transform duration-75"
              style={{ transform: `translate(calc(50% + ${targetPos.current.x}px - 50%), calc(50% + ${targetPos.current.y}px - 50%))` }}
            >
               <div className="w-10 h-10 border border-indigo-500 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
               </div>
            </div>

            <div className="absolute bottom-12 right-12 text-right">
               <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-black mb-1">State: CALIBRATED_SYNC</div>
               <div className="text-[8px] font-mono text-zinc-700 uppercase">Spring_Chain: NOMINAL</div>
            </div>
         </div>
      </div>
    </div>
  );
};
