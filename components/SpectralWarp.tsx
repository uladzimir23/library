import React, { useState, useContext, useRef, useEffect } from 'react';
import { Sun, Zap, Activity, Aperture, Wind, Layers } from 'lucide-react';
import { LanguageContext } from '../App';

export const SpectralWarp: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dispersion, setDispersion] = useState(0.5);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5" id="spectral">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.spectral.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.spectral.title} <span className="text-rose-500">{t.spectral.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.spectral.desc}
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/10 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-2"><Aperture className="w-3 h-3" /> {t.spectral.dispersion}</span>
                <span className="font-mono text-rose-500">{(dispersion * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0.1" max="1" step="0.01" value={dispersion}
                onChange={e => setDispersion(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-white/40 dark:bg-zinc-900/40 rounded-2xl border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3 mb-2 text-rose-500">
                <Wind className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Warp_Force</span>
              </div>
              <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">{(Math.abs(mousePos.x) + Math.abs(mousePos.y) * 10).toFixed(2)}N</div>
            </div>
            <div className="p-5 bg-white/40 dark:bg-zinc-900/40 rounded-2xl border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3 mb-2 text-indigo-500">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Spectral_Shift</span>
              </div>
              <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">{(dispersion * 450).toFixed(0)}nm</div>
            </div>
          </div>
        </div>

        {/* Visual Warp Area */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[550px] bg-zinc-100 dark:bg-zinc-900/50 rounded-[48px] border border-black/5 dark:border-white/10 relative overflow-hidden flex items-center justify-center group cursor-none"
        >
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ 
             backgroundImage: 'linear-gradient(rgba(244, 63, 94, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 63, 94, 0.2) 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`
           }} />

           {/* The Spectral Prism (Multi-layer) */}
           <div className="relative w-64 h-64 preserve-3d">
              {/* Blue Channel (Back) */}
              <div className="absolute inset-0 bg-blue-500/10 border border-blue-500/30 rounded-full blur-sm transition-transform duration-500 ease-out"
                   style={{ transform: `translate(${mousePos.x * -40 * dispersion}px, ${mousePos.y * -40 * dispersion}px) scale(1.05)` }} />
              
              {/* Red Channel (Front) */}
              <div className="absolute inset-0 bg-rose-500/10 border border-rose-500/30 rounded-full blur-sm transition-transform duration-300 ease-out"
                   style={{ transform: `translate(${mousePos.x * 40 * dispersion}px, ${mousePos.y * 40 * dispersion}px) scale(0.95)` }} />
              
              {/* Master Glass Layer (Center) */}
              <div className="absolute inset-0 bg-white/20 dark:bg-white/5 backdrop-blur-3xl border border-white/20 rounded-full shadow-2xl flex items-center justify-center overflow-hidden transition-transform duration-150 ease-out"
                   style={{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }}>
                 
                 <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 via-transparent to-blue-500/20" />
                 
                 {/* Internal HUD */}
                 <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-[spin_8s_linear_infinite]">
                       <div className="w-1 h-8 bg-white/40 rounded-full" />
                    </div>
                    <div className="mt-4 text-[8px] font-mono text-white/40 uppercase tracking-[0.3em]">Phase_Locked</div>
                 </div>
              </div>
           </div>

           {/* Custom Cursor Circle */}
           <div className="absolute w-8 h-8 border border-rose-500/50 rounded-full pointer-events-none transition-transform duration-75 ease-out"
                style={{ left: `calc(50% + ${mousePos.x * 100}% - 16px)`, top: `calc(50% + ${mousePos.y * 100}% - 16px)` }}>
              <div className="absolute inset-2 bg-rose-500 rounded-full animate-pulse" />
           </div>

           {/* Labels */}
           <div className="absolute bottom-8 right-8 text-right space-y-1">
              <div className="text-[10px] font-mono text-rose-500 uppercase tracking-widest">Spectral_Analysis: ON</div>
              <div className="text-[8px] font-mono text-zinc-500 uppercase">Buffer_State: Stable</div>
           </div>
        </div>
      </div>
    </section>
  );
};
