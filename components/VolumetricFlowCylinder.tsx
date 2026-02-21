import React, { useState, useContext } from 'react';
import { Box, Layers, Zap, Activity, Sliders, ChevronRight, Share2, Compass } from 'lucide-react';
import { LanguageContext } from '../App';

export const VolumetricFlowCylinder: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [rotation, setRotation] = useState(0);

  const modules = [
    { label: 'Neural_Core', icon: Zap, color: 'indigo' },
    { label: 'Fluid_Relay', icon: Activity, color: 'emerald' },
    { label: 'Z_Buffer', icon: Layers, color: 'rose' },
    { label: 'Lattice_OS', icon: Box, color: 'amber' }
  ];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#080808]" id="flow-cylinder">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Dimensional_Rotator
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Flow <br /><span className="text-emerald-500">Cylinder_v3.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are non-Euclidean. Experience a volumetric layout where modules are arranged in 3D cylindrical space, utilizing perspective projection to manage information density.
            </p>
          </div>

          <div className="space-y-6">
             <div className="flex items-center justify-between p-6 bg-zinc-900 rounded-3xl border border-white/5">
                <div className="flex items-center gap-4">
                   <Compass className="w-5 h-5 text-emerald-500 animate-spin-slow" />
                   <span className="text-[10px] font-bold text-white uppercase">Rotation_Bias</span>
                </div>
                <input 
                  type="range" min="0" max="360" value={rotation}
                  onChange={e => setRotation(parseInt(e.target.value))}
                  className="w-48 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
             </div>
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl group">
           {/* The Cylinder Container */}
           <div 
             className="relative w-full h-full preserve-3d transition-transform duration-700 ease-out flex items-center justify-center"
             style={{ transform: `rotateY(${rotation}deg)` }}
           >
              {modules.map((mod, i) => {
                const angle = (i * 360) / modules.length;
                return (
                  <div 
                    key={i}
                    className="absolute w-64 h-80 preserve-3d"
                    style={{ 
                      transform: `rotateY(${angle}deg) translateZ(300px)`,
                    }}
                  >
                     <div className={`w-full h-full bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[48px] shadow-2xl flex flex-col items-center justify-center p-8 transition-all duration-700 group-hover:bg-white/10`}>
                        <div className={`w-16 h-16 rounded-2xl bg-${mod.color}-500/20 border border-${mod.color}-500/40 flex items-center justify-center text-${mod.color}-500 mb-8`}>
                           <mod.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-tech font-bold text-white uppercase tracking-tighter mb-2">{mod.label}</h3>
                        <div className="h-1 w-12 bg-white/10 rounded-full" />
                     </div>
                  </div>
                );
              })}
           </div>

           {/* Static HUD labels */}
           <div className="absolute bottom-12 left-12 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
              Cylindrical_Projection: ACTIVE
           </div>
        </div>
      </div>
    </section>
  );
};
