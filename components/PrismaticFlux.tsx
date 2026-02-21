import React, { useState, useContext, useRef } from 'react';
import { Sun, Zap, Disc, Activity, Sparkles, Filter } from 'lucide-react';
import { LanguageContext } from '../App';

export const PrismaticFlux: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dispersion, setDispersion] = useState(0.6);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 0.2, y: y * 0.2 });
  };

  return (
    <section className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5" id="prismatic">
      <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/10 text-violet-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.prismatic.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.prismatic.title} <span className="text-violet-500">{t.prismatic.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.prismatic.desc}
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/10 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-2"><Filter className="w-3 h-3" /> {t.prismatic.dispersionScale}</span>
                <span className="font-mono text-violet-500">{(dispersion * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0.1" max="1.5" step="0.01" value={dispersion}
                onChange={e => setDispersion(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-violet-500">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Spectral_Spread</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">{(dispersion * 420).toFixed(0)}nm</div>
             </div>
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-emerald-500">
                  <Activity className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Ray_Decomp</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">Active</div>
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="flex-1 w-full h-[600px] bg-zinc-50 dark:bg-zinc-950/20 rounded-[48px] border border-black/5 dark:border-white/10 relative overflow-hidden flex items-center justify-center perspective-2000 group shadow-inner"
        >
           {/* Light Beam */}
           <div className="absolute left-0 w-full h-[1px] bg-white opacity-20 pointer-events-none" 
                style={{ top: `${50 + mousePos.y * 100}%`, transform: `rotate(${mousePos.x * 20}deg)` }} />

           {/* The Prism Block */}
           <div 
             className="relative w-72 h-72 preserve-3d transition-transform duration-700 ease-out"
             style={{ 
               transform: `rotateX(${mousePos.y * -20}deg) rotateY(${mousePos.x * 20}deg)`,
             }}
           >
              {/* Spectral Layers */}
              {[
                { color: 'rgba(239, 68, 68, 0.15)', offset: -25 },
                { color: 'rgba(34, 197, 94, 0.15)', offset: 0 },
                { color: 'rgba(59, 130, 246, 0.15)', offset: 25 }
              ].map((layer, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 border-2 rounded-[48px] backdrop-blur-3xl transition-transform duration-300"
                  style={{ 
                    borderColor: layer.color,
                    transform: `translate(${mousePos.x * layer.offset * dispersion}px, ${mousePos.y * layer.offset * dispersion}px) translateZ(${i * 10}px)`,
                    boxShadow: `0 0 40px ${layer.color}`
                  }}
                />
              ))}

              {/* Main Body */}
              <div className="absolute inset-0 bg-white/10 border border-white/30 rounded-[48px] shadow-2xl flex items-center justify-center">
                 <Disc className="w-16 h-16 text-white/20 animate-spin-slow" />
              </div>

              {/* Rainbow Edges Overlay */}
              <div className="absolute inset-0 rounded-[48px] opacity-40 pointer-events-none" 
                   style={{ background: `linear-gradient(${45 + mousePos.x * 90}deg, transparent, rgba(239, 68, 68, 0.1), rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1), transparent)` }} />
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Optic_Engine_State</div>
              <div className="text-xs font-bold text-violet-500">PRISMATIC_ACTIVE_TRUE</div>
           </div>
        </div>
      </div>
    </section>
  );
};
