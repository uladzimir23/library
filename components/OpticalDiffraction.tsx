import React, { useState, useContext, useRef } from 'react';
import { Sun, Filter, Sparkles, Activity, Target, Zap, Aperture } from 'lucide-react';
import { LanguageContext } from '../App';

export const OpticalDiffraction: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [shift, setShift] = useState(0.5);
  const [density, setDensity] = useState(0.6);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="diffraction">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Control Panel */}
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-emerald-500">
              <Aperture className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Optical_Diffraction</span>
           </div>

           <div className="space-y-6">
              {[
                { label: 'Spectral Shift', val: shift, set: setShift, min: 0.1, max: 2, step: 0.01, icon: Filter },
                { label: 'Layer Density', val: density, set: setDensity, min: 0.1, max: 1, step: 0.01, icon: Activity }
              ].map(ctrl => (
                <div key={ctrl.label} className="space-y-3">
                   <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                      <span className="flex items-center gap-2"><ctrl.icon className="w-3 h-3" /> {ctrl.label}</span>
                      <span className="font-mono text-emerald-500">{(ctrl.val * 100).toFixed(0)}%</span>
                   </div>
                   <input 
                     type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.val}
                     onChange={e => ctrl.set(parseFloat(e.target.value))}
                     className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                   />
                </div>
              ))}
           </div>

           <div className="pt-6 border-t border-black/5 dark:border-white/10">
              <div className="flex items-center gap-3 text-emerald-500 mb-2">
                 <Sun className="w-4 h-4" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Luminous_Flux</span>
              </div>
              <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">RAY_TRACE: OK</div>
           </div>
        </div>

        {/* Visualizer */}
        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center shadow-2xl"
        >
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
           
           <div className="relative w-96 h-96 flex items-center justify-center">
              {/* Diffracted Light Rays */}
              {[
                { color: '#ef4444', off: -40 },
                { color: '#10b981', off: 0 },
                { color: '#3b82f6', off: 40 }
              ].map((ray, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 border-2 rounded-[64px] transition-all duration-300 pointer-events-none"
                  style={{ 
                    borderColor: ray.color,
                    opacity: 0.15,
                    transform: `scale(${1 + i * 0.05}) translate(${mousePos.x * ray.off * shift}px, ${mousePos.y * ray.off * shift}px)`,
                    filter: `blur(${20 * density}px)`,
                    boxShadow: `0 0 50px ${ray.color}`
                  }}
                />
              ))}

              {/* The Prism Heart */}
              <div className="relative z-10 w-64 h-64 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[48px] shadow-2xl flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-white/10" />
                 <Sparkles className="w-16 h-16 text-white/20 animate-pulse" />
                 
                 {/* Internal refractive edges */}
                 <div className="absolute inset-4 border border-white/5 rounded-[32px]" />
                 <div className="absolute inset-8 border border-white/5 rounded-[24px]" />
              </div>
           </div>

           <div className="absolute top-12 right-12 text-right">
              <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-1">Diffraction_System</div>
              <div className="text-xs font-bold text-white/40">COORD_SYNC: 0x88.A</div>
           </div>
        </div>
      </div>
    </section>
  );
};
