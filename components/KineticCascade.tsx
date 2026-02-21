import React, { useState, useContext, useRef } from 'react';
import { Move, Wind, Activity, RefreshCw, Layers, Zap } from 'lucide-react';
import { LanguageContext } from '../App';

export const KineticCascade: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [viscosity, setViscosity] = useState(0.4);
  const [friction, setFriction] = useState(0.2);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="kinetic-cascade">
      <div className="flex flex-col lg:flex-row-reverse gap-16 items-start">
        {/* Control Panel */}
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-rose-500">
              <Wind className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Viscosity_Control</span>
           </div>

           <div className="space-y-6">
              {[
                { label: 'Medium Viscosity', val: viscosity, set: setViscosity, min: 0.1, max: 1, step: 0.01, icon: RefreshCw },
                { label: 'Layer Friction', val: friction, set: setFriction, min: 0, max: 0.5, step: 0.01, icon: Activity }
              ].map(ctrl => (
                <div key={ctrl.label} className="space-y-3">
                   <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                      <span className="flex items-center gap-2"><ctrl.icon className="w-3 h-3" /> {ctrl.label}</span>
                      <span className="font-mono text-rose-500">{(ctrl.val * 100).toFixed(0)}%</span>
                   </div>
                   <input 
                     type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.val}
                     onChange={e => ctrl.set(parseFloat(e.target.value))}
                     className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                   />
                </div>
              ))}
           </div>

           <div className="pt-6 border-t border-black/5 dark:border-white/10">
              <div className="flex items-center gap-3 text-rose-500 mb-2">
                 <Zap className="w-4 h-4" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Kinetic_Feedback</span>
              </div>
              <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">ACTIVE_DRAG</div>
           </div>
        </div>

        {/* Visualizer */}
        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[650px] bg-zinc-50 dark:bg-zinc-900/20 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 cursor-none"
        >
           <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(circle, #f43f5e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

           <div className="relative w-80 h-80 preserve-3d">
              {Array.from({ length: 6 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 border border-black/5 dark:border-white/10 rounded-[56px] transition-all ease-out"
                  style={{ 
                    transform: `translateZ(${i * -60}px) translate(${mousePos.x * (60 - i * 10 * viscosity)}px, ${mousePos.y * (60 - i * 10 * viscosity)}px)`,
                    backgroundColor: `rgba(244, 63, 94, ${0.03 + (6-i) * 0.01})`,
                    backdropFilter: `blur(${i * 8 * viscosity}px)`,
                    transitionDuration: `${300 + i * (200 * viscosity)}ms`,
                    zIndex: 10 - i
                  }}
                >
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 border border-rose-500/10 rounded-full" />
                   </div>
                </div>
              ))}
           </div>

           {/* Custom Cursor */}
           <div 
             className="absolute w-10 h-10 border border-rose-500 rounded-full flex items-center justify-center pointer-events-none transition-transform duration-75"
             style={{ left: `calc(50% + ${mousePos.x * 100}% - 20px)`, top: `calc(50% + ${mousePos.y * 100}% - 20px)` }}
           >
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
           </div>
        </div>
      </div>
    </section>
  );
};
