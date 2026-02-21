import React, { useState, useContext, useRef } from 'react';
import { Layers, Zap, Search, Target, Shield, Box, Layout, ArrowRight, Share2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const LayerExtractor3D: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [explode, setExplode] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layers = [
    { label: 'Surface_Glass', icon: Layout, color: 'indigo', desc: 'Main refractive body' },
    { label: 'Neural_Buffer', icon: Zap, color: 'emerald', desc: 'Logic state machine' },
    { label: 'Shadow_Caster', icon: Box, color: 'rose', desc: 'Volumetric depth map' },
    { label: 'Input_Lattice', icon: Target, color: 'sky', desc: 'Interactive grid' }
  ];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#080808]" id="layer-extractor">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Material_Deconstruction
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Z_Layer <br /><span className="text-emerald-500">Extractor.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are monolithic but architectural. Use the extractor to split a unified component into its constituent spatial planes, revealing the invisible stack that powers the visual feedback.
            </p>
          </div>

          <div className="space-y-4">
             <button 
               onClick={() => setExplode(!explode)}
               className={`w-full py-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${explode ? 'bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-black text-white hover:bg-zinc-800 shadow-xl'} shadow-2xl active:scale-95`}
             >
                {explode ? <Shield className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                {explode ? 'Consolidate_Structure' : 'Trigger_Exploded_View'}
             </button>
             
             <div className="grid grid-cols-2 gap-4 pt-4">
                {layers.map((l, i) => (
                  <div key={i} className={`p-4 rounded-2xl border transition-all ${activeLayer === i ? 'bg-emerald-500/10 border-emerald-500' : 'bg-black/5 dark:bg-white/5 border-transparent opacity-40'}`}>
                     <div className="text-[8px] font-mono text-zinc-500 uppercase">{l.label}</div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 group shadow-2xl">
           <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
           
           <div className="relative w-full h-full flex items-center justify-center preserve-3d">
              {layers.map((layer, i) => {
                const isActive = activeLayer === i;
                const zOffset = explode ? (i - 1.5) * 120 : i * 2;
                const scale = explode ? 0.9 : 1;
                
                return (
                  <div 
                    key={i}
                    onMouseEnter={() => setActiveLayer(i)}
                    onMouseLeave={() => setActiveLayer(null)}
                    className={`absolute w-[340px] h-[450px] rounded-[56px] border border-white/20 transition-all duration-1000 cubic-bezier(0.2, 0.8, 0.2, 1) flex flex-col items-center justify-center p-12 overflow-hidden cursor-pointer ${explode ? 'backdrop-blur-xl' : 'backdrop-blur-none'} ${isActive ? 'z-50 bg-white/10 border-emerald-500 scale-105' : 'bg-white/5 opacity-80'}`}
                    style={{ 
                      transform: `translateZ(${zOffset}px) scale(${scale}) rotateX(55deg) rotateZ(-35deg)`,
                      boxShadow: isActive ? '0 0 80px rgba(16,185,129,0.2)' : 'none'
                    }}
                  >
                     <div className={`transition-all duration-700 ${explode ? 'opacity-100' : 'opacity-0'}`}>
                        <layer.icon className={`w-12 h-12 mb-6 ${isActive ? 'text-emerald-400' : 'text-zinc-600'}`} />
                        <div className="text-center">
                           <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-2">Layer_0{i}</div>
                           <h3 className="text-xl font-tech font-bold text-white uppercase">{layer.label}</h3>
                           {isActive && <p className="text-[10px] text-zinc-500 mt-4 max-w-[150px] leading-relaxed mx-auto">{layer.desc}</p>}
                        </div>
                     </div>

                     {/* Grid lines inside layer */}
                     <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                  </div>
                );
              })}
           </div>

           <div className="absolute bottom-12 left-12 text-[10px] font-mono text-emerald-500/60 uppercase tracking-[0.4em]">
              Z_Space_Calibration: 1.24_UNIT
           </div>
        </div>
      </div>
    </section>
  );
};
