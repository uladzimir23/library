
import React, { useState, useContext, useRef } from 'react';
// Fix: Removed non-existent Flare import and added Sparkles which is actually used in the component
import { Target, Move, Activity, Sliders, Waves, Wind, Sparkles, MousePointer2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const SurfaceFriction: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [roughness, setRoughness] = useState(0.3);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 0.2, y: y * 0.2 });
  };

  return (
    <section className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5" id="friction">
      <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/10 text-orange-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.friction.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.friction.title} <span className="text-orange-500">{t.friction.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.friction.desc}
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/10 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-2"><Sliders className="w-3 h-3" /> {t.friction.roughnessScale}</span>
                <span className="font-mono text-orange-500">{(roughness * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.01" value={roughness}
                onChange={e => setRoughness(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-orange-500">
                  <Waves className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Diff_Reflect</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">{(roughness * 2.4).toFixed(2)}_D</div>
             </div>
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-emerald-500">
                  <Activity className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Tactile_Sync</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">Active</div>
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="flex-1 w-full h-[600px] bg-zinc-100 dark:bg-zinc-950/20 rounded-[48px] border border-black/5 dark:border-white/10 relative overflow-hidden flex flex-col items-center justify-center group shadow-inner"
        >
           {/* Surface Grain Filter */}
           <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" 
                style={{ filter: `contrast(${1 + roughness}) brightness(${1 + roughness * 0.5})` }} />

           {/* The Tactical Slab */}
           <div 
             className="relative w-80 h-96 transition-all duration-700 ease-out preserve-3d"
             style={{ 
               transform: `rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg)`,
               backdropFilter: `blur(${roughness * 40}px) saturate(${1 + roughness})`,
               backgroundColor: `rgba(255, 255, 255, ${0.1 + roughness * 0.1})`,
               borderRadius: '56px',
               border: '1px solid rgba(255, 255, 255, 0.2)'
             }}
           >
              {/* Specular Highlight following mouse */}
              <div 
                className="absolute w-64 h-64 rounded-full bg-white opacity-40 blur-[60px] pointer-events-none transition-transform duration-200"
                style={{ 
                  transform: `translate(${mousePos.x * 600}px, ${mousePos.y * 600}px)`,
                  opacity: 0.8 - roughness * 0.6
                }}
              />

              <div className="p-10 h-full flex flex-col justify-between relative z-10">
                 <div className="flex justify-between">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Friction_Module_v1</div>
                    <Wind className="w-4 h-4 text-orange-500" />
                 </div>
                 <div className="text-4xl font-tech font-bold text-zinc-900 dark:text-white uppercase leading-none">Tactile<br />Engine</div>
                 <div className="flex justify-between items-end border-t border-black/5 dark:border-white/10 pt-6">
                    <div className="h-2 w-24 bg-zinc-400 dark:bg-white/20 rounded-full overflow-hidden">
                       <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${100 - roughness * 100}%` }} />
                    </div>
                    <MousePointer2 className="w-4 h-4 text-zinc-400" />
                 </div>
              </div>
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-2 text-orange-500/60">
              <Sparkles className="w-4 h-4" />
              <span className="text-[9px] font-mono uppercase tracking-widest">Micro_Texture_Scanner: Enabled</span>
           </div>
        </div>
      </div>
    </section>
  );
};
