
import React, { useState, useContext, useRef } from 'react';
import { Target, Zap, Sun, Move, Maximize, Disc, Sparkle, Sliders, Activity, Gauge, RefreshCw } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const CausticFocus: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [curvature, setCurvature] = useState(0.65);
  const [focalPower, setFocalPower] = useState(0.8);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const offsetX = e.clientX - rect.left - centerX;
    const offsetY = e.clientY - rect.top - centerY;
    const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    const limit = 15;

    if (distance > limit) {
      setMousePos({
        x: (offsetX / distance) * limit,
        y: (offsetY / distance) * limit
      });
    } else {
      setMousePos({ x: offsetX, y: offsetY });
    }
  };

  return (
    <div className="relative rounded-[48px] border overflow-hidden glass-panel p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/5 bg-panel/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-text-muted opacity-60">Caustic_Focus_Workbench_v5.2</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-text-muted uppercase tracking-widest">Ray_Convergence: ACTIVE</div>
            <div className="w-12 h-1 bg-panel border border-black/5 dark:border-white/10 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-black/5 dark:border-white/5 p-8 flex flex-col gap-10 bg-panel/30">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-amber-600 dark:text-amber-500">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-main">Геометрия_Линзы</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-text-muted">
                     <span>Кривизна (Radius)</span>
                     <span className="text-amber-600 dark:text-amber-500">{(curvature * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.01" value={curvature} onChange={e => setCurvature(parseFloat(e.target.value))} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500 text-amber-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-text-muted">
                     <span>Сила_Фокуса</span>
                     <span className="text-amber-600 dark:text-amber-500">{(focalPower * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1.5" step="0.05" value={focalPower} onChange={e => setFocalPower(parseFloat(e.target.value))} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500 text-amber-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-panel rounded-[32px] border border-black/5 dark:border-white/5 space-y-4 shadow-inner">
               <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">Photon_Density</span>
               </div>
               <div className="text-2xl font-tech font-bold text-text-main uppercase">{(curvature * focalPower * 4.2).toFixed(2)}x_LUM</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
           className="flex-1 bg-surface relative overflow-hidden flex flex-col items-center justify-center p-12 group shadow-inner cursor-none"
         >
            {/* Ground Surface for Caustics - Adaptive */}
            <div className="absolute inset-0 bg-panel opacity-40 dark:opacity-100" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* THE DYNAMIC CAUSTIC PATTERN */}
            <div 
              className="absolute w-96 h-96 pointer-events-none mix-blend-screen rounded-full overflow-hidden transition-transform duration-75 ease-out"
              style={{ 
                left: `calc(50% + ${mousePos.x}px)`,
                top: `calc(50% + ${mousePos.y}px)`,
                transform: `translate(-50%, -50%) scale(${1.2 - curvature * 0.4})`,
                filter: `blur(${2 + (1 - focalPower) * 25}px)`,
                opacity: 0.3 + curvature * focalPower * 0.7,
              }}
            >
               <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(251,191,36,0.6)_0%,transparent_60%)]" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-[conic-gradient(from_0deg,#fbbf24,transparent,#f59e0b,transparent,#fbbf24)] opacity-60 animate-[spin_8s_linear_infinite] rounded-full" />
                  <div className="absolute w-[120%] h-[120%] bg-[conic-gradient(from_180deg,transparent,#fbbf24,transparent,#fcd34d,transparent)] opacity-40 animate-[spin_12s_linear_infinite_reverse] rounded-full" />
               </div>
               <div className="absolute inset-12 bg-white rounded-full blur-3xl opacity-50" />
            </div>

            {/* THE REFRACTIVE OBJECT (The Lens) */}
            <div 
              className="relative w-72 h-72 transition-transform duration-700 ease-out preserve-3d"
              style={{ 
                transform: `rotateX(${(mousePos.y / 10) * -30}deg) rotateY(${(mousePos.x / 10) * 30}deg) translateZ(80px)`
              }}
            >
               <div 
                  className={`absolute inset-0 border transition-all duration-700 shadow-2xl overflow-hidden glass-panel
                    ${curvature > 0.8 ? 'rounded-full' : 'rounded-[80px]'}
                  `}
                  style={{ borderRadius: `${(1 - curvature) * 100 + 40}px` }}
               >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Sparkle className="w-16 h-16 text-text-main opacity-10 animate-pulse" />
                  </div>
                  {/* Fresnel Highlight */}
                  <div className="absolute top-4 left-4 right-4 h-4 bg-white/20 rounded-full blur-md opacity-30" />
               </div>
            </div>

            {/* LIGHT SOURCE HUD */}
            <div className="absolute top-12 left-12 flex flex-col gap-2">
               <div className="flex items-center gap-3 px-4 py-1.5 bg-panel border border-black/5 dark:border-white/10 rounded-full text-amber-600 dark:text-amber-500 shadow-xl">
                  <Sun className="w-4 h-4 animate-spin-slow" />
                  <span className="text-[9px] font-mono uppercase tracking-widest font-black">Emitter_Active</span>
               </div>
            </div>

            <div className="absolute bottom-12 right-12 text-right opacity-30">
               <div className="text-[10px] font-mono text-amber-600 dark:text-amber-500 uppercase tracking-widest font-bold">Refractive_Volume_v5</div>
               <div className="text-[8px] font-mono text-text-muted uppercase">Coord_Sync_0x88.A</div>
            </div>
         </div>
      </div>
    </div>
  );
};
