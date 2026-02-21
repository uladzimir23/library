import React, { useState, useContext } from 'react';
import { Sliders, Target, Code, Search, Info, Shield, Info as InfoIcon } from 'lucide-react';
import { LanguageContext } from '../App';

export const ComponentBlueprint: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [explode, setExplode] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="blueprint">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-rose-500">
              <Code className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">DNA_Visualizer</span>
           </div>

           <div className="space-y-6">
              {[
                { label: 'Explode Factor', val: explode, set: setExplode, min: 1, max: 3, step: 0.1, icon: Sliders }
              ].map(ctrl => (
                <div key={ctrl.label} className="space-y-3">
                   <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                      <span className="flex items-center gap-2"><ctrl.icon className="w-3 h-3" /> {ctrl.label}</span>
                      <span className="font-mono text-rose-500">{ctrl.val}</span>
                   </div>
                   <input 
                     type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.val}
                     onChange={e => ctrl.set(parseFloat(e.target.value))}
                     className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                   />
                </div>
              ))}
           </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000"
        >
           <div className="relative w-80 h-96 transition-all duration-700 ease-out preserve-3d"
                style={{ transform: `rotateX(${mousePos.y * -20}deg) rotateY(${mousePos.x * 20}deg)` }}>
              
              {/* Technical Annotations */}
              <div className="absolute -top-12 -right-32 p-4 border border-rose-500/30 rounded-xl bg-zinc-900/90 text-rose-500 transition-transform duration-500"
                   style={{ transform: `translateZ(${150 * explode}px)` }}>
                 <div className="text-[9px] font-mono uppercase font-bold mb-1">Prop: backdrop-blur</div>
                 <div className="text-xl font-tech font-bold">{(40 * explode).toFixed(0)}px</div>
              </div>

              <div className="absolute -bottom-12 -left-32 p-4 border border-emerald-500/30 rounded-xl bg-zinc-900/90 text-emerald-500 transition-transform duration-500"
                   style={{ transform: `translateZ(${100 * explode}px)` }}>
                 <div className="text-[9px] font-mono uppercase font-bold mb-1">Prop: border-radius</div>
                 <div className="text-xl font-tech font-bold">48px</div>
              </div>

              {/* Component Schematic Layers */}
              <div className="absolute inset-0 border border-white/40 rounded-[48px] bg-white/5 transition-transform duration-700" 
                   style={{ transform: `translateZ(0px)` }} />
              <div className="absolute inset-4 border border-dashed border-white/20 rounded-[32px] transition-transform duration-700" 
                   style={{ transform: `translateZ(${40 * explode}px)` }} />
              <div className="absolute inset-12 border border-white/10 rounded-[24px] bg-white/10 transition-transform duration-700" 
                   style={{ transform: `translateZ(${80 * explode}px)` }} />

              <div className="absolute inset-0 flex items-center justify-center translate-z-120">
                 <Search className="w-12 h-12 text-white/20" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
