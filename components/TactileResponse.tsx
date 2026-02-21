import React, { useState, useContext } from 'react';
import { MousePointer2, Zap, Radio, Activity, Target, Hand } from 'lucide-react';
import { LanguageContext } from '../App';

export const TactileResponse: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [bounciness, setBounciness] = useState(0.6);
  const [impact, setImpact] = useState(15);
  const [activeBtn, setActiveBtn] = useState<number | null>(null);

  const triggerImpact = (id: number) => {
    setActiveBtn(id);
    setTimeout(() => setActiveBtn(null), 300);
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="tactile-response">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-amber-500">
              <Hand className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Tactile_Physics</span>
           </div>

           <div className="space-y-6">
              {[
                { label: 'Bounciness', val: bounciness, set: setBounciness, min: 0.1, max: 1, step: 0.01, icon: Radio },
                { label: 'Impact Force', val: impact, set: setImpact, min: 5, max: 40, step: 1, icon: Zap }
              ].map(ctrl => (
                <div key={ctrl.label} className="space-y-3">
                   <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                      <span className="flex items-center gap-2"><ctrl.icon className="w-3 h-3" /> {ctrl.label}</span>
                      <span className="font-mono text-amber-500">{(ctrl.val * 100).toFixed(0)}%</span>
                   </div>
                   <input 
                     type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.val}
                     onChange={e => ctrl.set(parseFloat(e.target.value))}
                     className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                   />
                </div>
              ))}
           </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-[600px]">
           {[0, 1].map((i) => (
             <div 
               key={i}
               onClick={() => triggerImpact(i)}
               className={`relative bg-zinc-100 dark:bg-zinc-900/40 rounded-[48px] border-2 border-dashed border-black/5 dark:border-white/5 flex items-center justify-center cursor-pointer transition-all duration-300 group overflow-hidden ${activeBtn === i ? 'scale-95' : 'hover:scale-[0.98]'}`}
             >
                {/* Impact Wave */}
                <div className={`absolute inset-0 bg-amber-500/10 transition-opacity duration-300 ${activeBtn === i ? 'opacity-100' : 'opacity-0'}`} />
                
                <div className="relative z-10 flex flex-col items-center gap-6">
                   <div 
                     className={`w-24 h-24 rounded-3xl bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/10 shadow-2xl flex items-center justify-center transition-all cubic-bezier(0.34, 1.56, 0.64, 1)`}
                     style={{ 
                       transform: activeBtn === i ? `translateY(${impact}px)` : 'translateY(0)',
                       transitionDuration: `${(1.1 - bounciness) * 1000}ms`
                     }}
                   >
                      <Target className={`w-10 h-10 ${activeBtn === i ? 'text-amber-500' : 'text-zinc-400'}`} />
                   </div>
                   <div className="text-center">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Trigger_Zone_0{i}</div>
                      <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">Press_to_Impact</div>
                   </div>
                </div>

                {/* Decorative particles on click */}
                {activeBtn === i && (
                  <div className="absolute inset-0 pointer-events-none">
                     {Array.from({length: 4}).map((_, j) => (
                       <div key={j} className="absolute top-1/2 left-1/2 w-1 h-1 bg-amber-500 rounded-full animate-ping" 
                            style={{ transform: `translate(${(j-1.5)*40}px, ${(j-1.5)*40}px)`, animationDelay: `${j*100}ms` }} />
                     ))}
                  </div>
                )}
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};
