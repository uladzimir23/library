import React, { useState, useContext, useRef } from 'react';
import { Sun, Zap, Layers, Activity, Aperture, Sparkles, Ghost, Beaker } from 'lucide-react';
import { LanguageContext } from '../App';

type MaterialType = 'wax' | 'jade' | 'organic';

export const SubsurfaceScattering: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [material, setMaterial] = useState<MaterialType>('jade');
  const [absorption, setAbsorption] = useState(0.45);
  const containerRef = useRef<HTMLDivElement>(null);

  const materials = {
    wax: { color: '#fbbf24', scatter: '#f59e0b', label: 'Synthetic_Wax', ior: 1.32 },
    jade: { color: '#10b981', scatter: '#059669', label: 'Imperial_Jade', ior: 1.61 },
    organic: { color: '#f43f5e', scatter: '#e11d48', label: 'Bio_Tissue', ior: 1.44 }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 0.1, y: y * 0.1 });
  };

  return (
    <section className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5" id="subsurface">
      <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.subsurface.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.subsurface.title} <span className="text-emerald-500">{t.subsurface.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.subsurface.desc}
            </p>
          </div>

          <div className="flex gap-3">
             {(['wax', 'jade', 'organic'] as MaterialType[]).map((m) => (
               <button 
                 key={m} 
                 onClick={() => setMaterial(m)}
                 className={`flex-1 py-3 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all ${material === m ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-transparent shadow-xl' : 'bg-black/5 dark:bg-white/5 border-transparent text-zinc-500 hover:border-black/10 dark:hover:border-white/10'}`}
               >
                 {m}
               </button>
             ))}
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/10 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-2"><Aperture className="w-3 h-3" /> {t.subsurface.absorptionScale}</span>
                <span className="font-mono text-emerald-500">{(absorption * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0.1" max="0.9" step="0.01" value={absorption}
                onChange={e => setAbsorption(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-emerald-500">
                  <Ghost className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Internal_Bounced</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">{(materials[material].ior).toFixed(3)}_N</div>
             </div>
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-indigo-500">
                  <Beaker className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Material_Tag</span>
                </div>
                <div className="text-xs font-mono text-zinc-900 dark:text-white truncate">{materials[material].label}</div>
             </div>
          </div>
        </div>

        {/* Improved SSS Visualizer */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="flex-1 w-full h-[600px] bg-zinc-100 dark:bg-zinc-950/20 rounded-[48px] border border-black/5 dark:border-white/10 relative overflow-hidden flex items-center justify-center perspective-2000 group shadow-inner"
        >
           {/* The Slab - Multi-layered for density effect */}
           <div 
             className="relative w-80 h-96 bg-white/30 dark:bg-zinc-900/10 backdrop-blur-3xl border border-white/20 rounded-[64px] shadow-2xl transition-all duration-1000 ease-out preserve-3d flex items-center justify-center overflow-hidden"
             style={{ 
               transform: `rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg) translate(${mousePos.x * 4}px, ${mousePos.y * 4}px)`
             }}
           >
              {/* Internal Noise / Grain for Volume */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

              {/* Multi-layered Internal Glow */}
              {[1, 0.7, 0.4].map((scale, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full transition-all duration-700 pointer-events-none"
                  style={{ 
                    width: `${160 * scale}px`,
                    height: `${160 * scale}px`,
                    transform: `translate(${mousePos.x * (150 - i * 30)}px, ${mousePos.y * (150 - i * 30)}px) translateZ(${-40 + i * 10}px)`,
                    background: `radial-gradient(circle, ${materials[material].color} 0%, transparent 70%)`,
                    filter: `blur(${(absorption * 80) / scale}px)`,
                    opacity: (0.9 - (absorption * 0.5)) * scale
                  }}
                />
              ))}

              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-[32px] bg-white/5 border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-md">
                  <Sparkles className="w-8 h-8 transition-colors duration-500" style={{ color: materials[material].color }} />
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-zinc-900 dark:text-white">Spectral_Decay</div>
                  <div className="h-1 w-24 bg-white/10 rounded-full mx-auto overflow-hidden">
                     <div className="h-full bg-current transition-all duration-500" style={{ width: `${100 - absorption * 100}%`, color: materials[material].color }} />
                  </div>
                </div>
              </div>
              
              {/* Surface Highlight */}
              <div 
                className="absolute inset-8 rounded-[48px] border-t border-l border-white/40 pointer-events-none transition-transform duration-300"
                style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px) translateZ(30px)` }}
              />
           </div>

           {/* HUD Data */}
           <div className="absolute top-12 left-12 space-y-2 transition-transform duration-500"
                style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}>
              <div className="flex items-center gap-2 text-zinc-400">
                <Sun className="w-4 h-4" />
                <span className="text-[10px] font-tech font-bold uppercase tracking-widest">SSS_Simulation_Core</span>
              </div>
              <div className="font-mono text-[8px] text-zinc-500">PENETRATION: {(1-absorption).toFixed(3)} mm</div>
           </div>
        </div>
      </div>
    </section>
  );
};
