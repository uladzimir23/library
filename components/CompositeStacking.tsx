import React, { useState, useContext } from 'react';
import { Sun, Layers, Zap, MousePointer2, Activity, Target, Shield, Box } from 'lucide-react';
import { LanguageContext } from '../App';

export const CompositeStacking: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [spread, setSpread] = useState(0.4);
  const [specular, setSpecular] = useState(0.6);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="composite">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-rose-500">
              <Layers className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Composite_Engine</span>
           </div>

           <div className="space-y-6">
              {[
                { label: 'Shadow Spread', val: spread, set: setSpread, min: 0.1, max: 1, step: 0.01, icon: Target },
                { label: 'Specular Power', val: specular, set: setSpecular, min: 0, max: 1, step: 0.01, icon: Sun }
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
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[650px] bg-zinc-50 dark:bg-zinc-900/20 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000"
        >
           {/* Visual Components Stacked */}
           <div className="relative w-80 h-96 preserve-3d">
              {/* Layer 1: Shadow Base */}
              <div 
                className="absolute inset-0 transition-all duration-700 ease-out pointer-events-none"
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '56px',
                  filter: `blur(${40 * spread}px)`,
                  transform: `translateZ(-100px) translate(${mousePos.x * -80}px, ${mousePos.y * -80}px) scale(${0.85 + spread * 0.1})`
                }}
              />

              {/* Layer 2: Core Glass */}
              <div className="absolute inset-0 bg-white/5 border border-white/20 rounded-[56px] backdrop-blur-2xl shadow-2xl transition-transform duration-700"
                   style={{ transform: `translateZ(0px) rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg)` }}>
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-[inherit]" />
              </div>

              {/* Layer 3: Specular Highlighting */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-300 rounded-[56px] border-t border-l border-white/60"
                style={{ 
                  opacity: specular,
                  transform: `translateZ(40px) translate(${mousePos.x * 30}px, ${mousePos.y * 30}px) rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg)`,
                  boxShadow: `0 0 ${specular * 60}px rgba(255,255,255,0.1)`
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center translate-z-20 pointer-events-none">
                 <Shield className="w-16 h-16 text-rose-500/20" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
