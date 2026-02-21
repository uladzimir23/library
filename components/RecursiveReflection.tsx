import React, { useState, useContext, useRef } from 'react';
import { Disc, Layers, Zap, Activity, Radio, Cpu } from 'lucide-react';
import { LanguageContext } from '../App';

export const RecursiveReflection: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="recursive">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.recursive.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.recursive.title} <span className="text-rose-500">{t.recursive.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              3D is a construct of recursive 2D planes. This section deconstructs depth into ten sequential slices, illustrating how spatial volume emerges from the mathematical repetition of a single interaction seed.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-[32px] border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-rose-500">
                  <Layers className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Slice_Count</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">10_PLANES</div>
             </div>
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-[32px] border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-emerald-500">
                  <Radio className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Iterative_Sync</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">ACTIVE</div>
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({x:0, y:0})}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl"
        >
           {/* Recursive Plane Stack */}
           <div className="relative w-64 h-64 preserve-3d">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 border border-rose-500/20 rounded-full transition-transform duration-300 ease-out flex items-center justify-center"
                  style={{ 
                    transform: `translateZ(${i * -30}px) translate(${mousePos.x * i * 40}px, ${mousePos.y * i * 40}px) scale(${1 - i * 0.05})`,
                    backgroundColor: `rgba(244, 63, 94, ${0.02 + (10-i) * 0.01})`,
                    backdropFilter: `blur(${i * 4}px)`,
                    boxShadow: i === 0 ? '0 0 50px rgba(244, 63, 94, 0.2)' : 'none'
                  }}
                >
                   {i === 0 && <Disc className="w-12 h-12 text-rose-500 animate-spin-slow" />}
                   {i === 9 && <Cpu className="w-6 h-6 text-rose-500/20" />}
                </div>
              ))}
           </div>

           {/* HUD for Slice Data */}
           <div className="absolute top-12 left-12 text-[8px] font-mono text-rose-500/40 space-y-1">
              <div>ITERATION_LOOP_09_ACTIVE</div>
              <div>RECURSION_DEPTH: 300px</div>
              <div>MATTER_PHASE: COHERENT</div>
           </div>
        </div>
      </div>
    </section>
  );
};
