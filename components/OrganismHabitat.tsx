import React, { useState, useContext } from 'react';
import { Grid, Share2, MousePointer2, Box, Layers, Move } from 'lucide-react';
import { LanguageContext } from '../App';

export const OrganismHabitat: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [density, setDensity] = useState(1);
  const [gravity, setGravity] = useState(0.5);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="organism-habitat">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-sky-500">
              <Grid className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Habitat_Orchestrator</span>
           </div>

           <div className="space-y-6">
              {[
                { label: 'Stack Density', val: density, set: setDensity, min: 0.5, max: 2.5, step: 0.1, icon: Layers },
                { label: 'Orbital Gravity', val: gravity, set: setGravity, min: 0.1, max: 1.5, step: 0.1, icon: MousePointer2 }
              ].map(ctrl => (
                <div key={ctrl.label} className="space-y-3">
                   <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                      <span className="flex items-center gap-2"><ctrl.icon className="w-3 h-3" /> {ctrl.label}</span>
                      <span className="font-mono text-sky-500">{ctrl.val}</span>
                   </div>
                   <input 
                     type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.val}
                     onChange={e => ctrl.set(parseFloat(e.target.value))}
                     className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                   />
                </div>
              ))}
           </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000"
        >
           <div className="relative w-full h-full flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className="absolute w-64 h-80 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-3xl transition-all duration-700 ease-out shadow-2xl flex flex-col p-8"
                  style={{ 
                    transform: `translateZ(${i * -100 * density}px) translate(${mousePos.x * (i+1) * 100 * gravity}px, ${mousePos.y * (i+1) * 100 * gravity}px)`,
                    opacity: 1 - (i * 0.3),
                    filter: `blur(${i * 8}px)`
                  }}
                >
                   <div className="flex justify-between items-start mb-auto">
                      <Box className="w-6 h-6 text-sky-500" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   </div>
                   <div className="space-y-3">
                      <div className="h-2 w-24 bg-white/20 rounded-full" />
                      <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                   </div>
                </div>
              ))}
           </div>
           
           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-sky-500 uppercase tracking-widest mb-1">Environmental_Sync</div>
              <div className="text-xs font-bold text-white/40 uppercase tracking-tighter">Multi_Agent_Presence: Detected</div>
           </div>
        </div>
      </div>
    </section>
  );
};
