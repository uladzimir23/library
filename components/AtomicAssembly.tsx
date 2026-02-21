import React, { useState, useContext } from 'react';
import { Layers, Sliders, Maximize, Box, Zap, Cpu } from 'lucide-react';
import { LanguageContext } from '../App';

export const AtomicAssembly: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [zSpread, setZSpread] = useState(40);
  const [layers, setLayers] = useState(4);
  const [refraction, setRefraction] = useState(15);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="atomic-assembly">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-indigo-500">
              <Cpu className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Atomic_Assembler</span>
           </div>

           <div className="space-y-6">
              {[
                { label: 'Z-Spread', val: zSpread, set: setZSpread, min: 0, max: 120, step: 1, icon: Maximize },
                { label: 'Sub-Layers', val: layers, set: setLayers, min: 2, max: 6, step: 1, icon: Layers },
                { label: 'Refractive Power', val: refraction, set: setRefraction, min: 0, max: 60, step: 1, icon: Box }
              ].map(ctrl => (
                <div key={ctrl.label} className="space-y-3">
                   <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                      <span className="flex items-center gap-2"><ctrl.icon className="w-3 h-3" /> {ctrl.label}</span>
                      <span className="font-mono text-indigo-500">{ctrl.val}</span>
                   </div>
                   <input 
                     type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.val}
                     onChange={e => ctrl.set(parseFloat(e.target.value))}
                     className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                   />
                </div>
              ))}
           </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl group"
        >
           <div className="absolute inset-0 opacity-10" style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }} />

           <div className="relative w-80 h-56 preserve-3d transition-transform duration-500"
                style={{ transform: `rotateX(${mousePos.y * -30}deg) rotateY(${mousePos.x * 30}deg)` }}>
              {Array.from({ length: layers }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 border border-white/10 rounded-3xl flex flex-col items-center justify-center transition-all duration-700"
                  style={{ 
                    transform: `translateZ(${i * zSpread}px)`,
                    backgroundColor: `rgba(99, 102, 241, ${0.02 + (i * 0.02)})`,
                    backdropFilter: `blur(${i * refraction / 2}px)`,
                    opacity: 1 - (i * 0.1)
                  }}
                >
                   <div className="text-[7px] font-mono text-white/20 absolute top-4 left-6">SLOT_0{i}</div>
                   {i === layers - 1 && <Zap className="w-10 h-10 text-indigo-500 animate-pulse" />}
                   {i === 0 && <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl" />}
                </div>
              ))}
           </div>

           <div className="absolute top-12 left-12 text-[8px] font-mono text-indigo-500/40">
              BUILD_SEQUENCE: ACTIVE<br />
              MODULE_COMPATIBILITY: 100%<br />
              PHYSICS_ENGINE: FLEX_v4
           </div>
        </div>
      </div>
    </section>
  );
};
