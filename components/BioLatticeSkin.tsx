import React, { useState, useContext, useRef } from 'react';
import { Grid, Target, Activity, Share2, MousePointer2, Move } from 'lucide-react';
import { LanguageContext } from '../App';

export const BioLatticeSkin: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isEngaged, setIsEngaged] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const gridSize = 12;
  const cells = Array.from({ length: gridSize * gridSize });

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#080808]" id="bio-lattice">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Elastic_Skin_v4
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Bio-Lattice <br /><span className="text-emerald-500">Surface.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Surfaces that sense. This lattice visualizes interaction as mechanical stress on an organic skin. Hovering deforms the coordinate grid, shifting opacity and weight based on the proximity of the user's focus.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex items-center justify-between shadow-xl">
             <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isEngaged ? 'bg-emerald-500 text-white' : 'bg-white/5 text-emerald-500'}`}>
                   <Target className="w-7 h-7" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Skin_Tension</div>
                   <div className="text-lg font-tech font-bold text-white uppercase tracking-widest">{isEngaged ? 'DEFORMED' : 'STABLE'}</div>
                </div>
             </div>
             <Activity className={`w-6 h-6 text-emerald-500 ${isEngaged ? 'animate-pulse' : 'opacity-20'}`} />
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsEngaged(true)}
          onMouseLeave={() => setIsEngaged(false)}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-none"
        >
           {/* Animated Lattice (SVG Grid) */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <defs>
                 <radialGradient id="meshGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="transparent" />
                 </radialGradient>
              </defs>
              
              {/* Horizontal Lines */}
              {Array.from({ length: gridSize + 1 }).map((_, i) => {
                const y = (i / gridSize) * 100;
                return (
                  <path 
                    key={`h-${i}`}
                    d={`M 0,${y} Q ${mousePos.x * 100},${mousePos.y * 100} 100,${y}`}
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth={isEngaged ? (0.5 + Math.abs(mousePos.y - y/100) * 0.5) : 0.5}
                    className="transition-all duration-300 ease-out"
                    style={{ d: `M 0%,${y}% Q ${mousePos.x * 100}%,${mousePos.y * 100}% 100%,${y}%` }}
                  />
                );
              })}

              {/* Vertical Lines */}
              {Array.from({ length: gridSize + 1 }).map((_, i) => {
                const x = (i / gridSize) * 100;
                return (
                  <path 
                    key={`v-${i}`}
                    d={`M ${x},0 Q ${mousePos.x * 100},${mousePos.y * 100} ${x},100`}
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth={isEngaged ? (0.5 + Math.abs(mousePos.x - x/100) * 0.5) : 0.5}
                    className="transition-all duration-300 ease-out"
                    style={{ d: `M ${x}%,0% Q ${mousePos.x * 100}%,${mousePos.y * 100}% ${x}%,100%` }}
                  />
                );
              })}
           </svg>

           {/* Focal Core */}
           <div 
             className="absolute w-32 h-32 bg-white/5 border border-white/20 rounded-[48px] backdrop-blur-3xl shadow-2xl flex items-center justify-center transition-all duration-150 ease-out pointer-events-none"
             style={{ 
               left: `calc(${mousePos.x * 100}% - 64px)`, 
               top: `calc(${mousePos.y * 100}% - 64px)`,
               transform: `scale(${isEngaged ? 1.1 : 1}) rotate(${mousePos.x * 20}deg)`
             }}
           >
              <div className="absolute inset-4 border border-emerald-500/20 rounded-[inherit] animate-spin-slow" />
              <Move className="w-8 h-8 text-emerald-500/60" />
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isEngaged ? 'bg-emerald-500 animate-ping' : 'bg-zinc-800'}`} />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Haptic_Skin_Sync: ACTIVE</span>
           </div>
        </div>
      </div>
    </section>
  );
};
