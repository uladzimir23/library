import React, { useState, useContext } from 'react';
import { Maximize2, MoveHorizontal, Box, Layers, Activity, Sliders } from 'lucide-react';
import { LanguageContext } from '../App';

export const ConstraintDynamics: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [widthFactor, setWidthFactor] = useState(0.8);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  // Чем меньше ширина, тем больше глубина (сохранение массы)
  const depth = (1.1 - widthFactor) * 150;

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="constraint-dynamics">
      <div className="flex flex-col lg:flex-row-reverse gap-16 items-start">
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-emerald-500">
              <MoveHorizontal className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Constraint_Manager</span>
           </div>

           <div className="space-y-6">
              <div className="space-y-4">
                 <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                    <span className="flex items-center gap-2"><Maximize2 className="w-3 h-3" /> Box_Width</span>
                    <span className="font-mono text-emerald-500">{(widthFactor * 100).toFixed(0)}%</span>
                 </div>
                 <input 
                   type="range" min="0.2" max="1" step="0.01" value={widthFactor}
                   onChange={e => setWidthFactor(parseFloat(e.target.value))}
                   className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                 />
              </div>

              <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                 <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Adaptive_Z_Depth</div>
                 <div className="text-xl font-tech font-bold text-emerald-500">{depth.toFixed(1)}px</div>
              </div>
           </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000"
        >
           {/* Visual Ruler */}
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />
           <div className="absolute top-1/2 left-0 right-0 flex justify-between px-12 opacity-20 font-mono text-[8px] text-zinc-500 uppercase">
              <span>Limit_Start</span>
              <span>Limit_End</span>
           </div>

           <div className="relative h-64 transition-all duration-500 ease-out preserve-3d flex items-center justify-center"
                style={{ 
                  width: `${widthFactor * 80}%`,
                  transform: `rotateX(${mousePos.y * -20}deg) rotateY(${mousePos.x * 20}deg)`
                }}>
              
              {/* Stacked volumetric planes */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 border border-white/10 rounded-3xl backdrop-blur-sm transition-all duration-300"
                  style={{ 
                    transform: `translateZ(${i * (depth / 12)}px)`,
                    backgroundColor: `rgba(16, 185, 129, ${0.01 + (i * 0.01)})`,
                    opacity: 1 - (i * 0.05)
                  }}
                >
                   {i === 0 && <div className="absolute inset-0 bg-emerald-500/5 rounded-[inherit]" />}
                   {i === 11 && (
                     <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="h-2 w-full bg-white/10 rounded-full" />
                     </div>
                   )}
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};
