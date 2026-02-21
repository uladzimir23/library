import React, { useState, useRef, useContext } from 'react';
import { MousePointer2, MoveDown, Layers, Zap, Activity, RefreshCw } from 'lucide-react';
import { LanguageContext } from '../App';

export const ElasticScrollOverdrive: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const startY = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPulling(true);
    startY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPulling) return;
    const delta = e.clientY - startY.current;
    // Logarithmic pull resistance
    const resistance = delta > 0 ? Math.log10(1 + delta / 100) * 150 : -Math.log10(1 + Math.abs(delta) / 100) * 150;
    setScrollOffset(resistance);
  };

  const handleMouseUp = () => {
    setIsPulling(false);
    setScrollOffset(0); // Snap back
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="elastic-scroll">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Kinetic_Friction
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Elastic <br /><span className="text-indigo-500">Scroll_Limit.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Boundaries are not walls, they are springs. We implement a logarithmic resistance model for scroll overflows, ensuring that users feel the physical weight of the content when reaching its limits.
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 space-y-6">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-indigo-500">
                   <Activity className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Tension_Delta</span>
                </div>
                <span className="font-mono text-xl text-zinc-900 dark:text-white">{scrollOffset.toFixed(0)}px</span>
             </div>
             <div className="h-1 w-full bg-black/10 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${Math.abs(scrollOffset / 1.5)}%` }} />
             </div>
          </div>
        </div>

        <div 
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center cursor-ns-resize shadow-2xl group"
        >
           {/* Boundary Visuals */}
           <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-indigo-500/10 to-transparent transition-opacity duration-500 ${scrollOffset > 10 ? 'opacity-100' : 'opacity-0'}`} />
           <div className={`absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-indigo-500/10 to-transparent transition-opacity duration-500 ${scrollOffset < -10 ? 'opacity-100' : 'opacity-0'}`} />

           {/* The Scrollable Content Stack */}
           <div 
             className="flex flex-col gap-6 transition-all duration-500 cubic-bezier(0.2, 0.8, 0.2, 1)"
             style={{ transform: `translateY(${scrollOffset}px) scale(${1 - Math.abs(scrollOffset) / 2000})` }}
           >
              {[1, 2, 3, 4].map(i => (
                <div 
                  key={i}
                  className="w-80 h-24 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl flex items-center justify-between px-8 transition-transform duration-500"
                  style={{ transform: `scale(${1 - Math.abs(scrollOffset) * 0.0005 * i})` }}
                >
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                         <Layers className="w-5 h-5" />
                      </div>
                      <div className="h-2 w-24 bg-white/10 rounded-full" />
                   </div>
                   <div className="w-4 h-4 rounded-full border border-white/20" />
                </div>
              ))}
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <MoveDown className={`w-4 h-4 text-indigo-500 ${isPulling ? 'animate-bounce' : ''}`} />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Manual_Drag_Override</span>
           </div>
        </div>
      </div>
    </section>
  );
};