import React, { useState, useContext, useEffect } from 'react';
import { Activity, Radio, Target, Workflow, Zap, Command } from 'lucide-react';
import { LanguageContext } from '../App';

export const MolecularSynthesis: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [velocity, setVelocity] = useState(0.8);
  const [echo, setEcho] = useState(3);
  const [pulse, setPulse] = useState(0);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (isTriggered) {
      let start = 0;
      const animate = () => {
        start += 0.05 * velocity;
        setPulse(start);
        if (start < 10) requestAnimationFrame(animate);
        else {
          setPulse(0);
          setIsTriggered(false);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isTriggered, velocity]);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="molecular-synthesis">
      <div className="flex flex-col lg:flex-row-reverse gap-16 items-start">
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-emerald-500">
              <Workflow className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Synthesis_Engine</span>
           </div>

           <div className="space-y-6">
              {[
                { label: 'Signal Velocity', val: velocity, set: setVelocity, min: 0.1, max: 2, step: 0.1, icon: Zap },
                { label: 'Echo Depth', val: echo, set: setEcho, min: 1, max: 8, step: 1, icon: Radio }
              ].map(ctrl => (
                <div key={ctrl.label} className="space-y-3">
                   <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                      <span className="flex items-center gap-2"><ctrl.icon className="w-3 h-3" /> {ctrl.label}</span>
                      <span className="font-mono text-emerald-500">{ctrl.val}</span>
                   </div>
                   <input 
                     type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.val}
                     onChange={e => ctrl.set(parseFloat(e.target.value))}
                     className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                   />
                </div>
              ))}
           </div>
           
           <button 
             onClick={() => setIsTriggered(true)}
             className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
           >
             Trigger_Pulse
           </button>
        </div>

        <div className="flex-1 w-full h-[650px] bg-zinc-50 dark:bg-zinc-900/20 rounded-[64px] relative overflow-hidden flex items-center justify-center">
           <div className="relative w-80 h-96 flex items-center justify-center">
              {Array.from({ length: echo }).map((_, i) => {
                const distance = Math.abs(pulse - i);
                const active = distance < 1;
                return (
                  <div 
                    key={i}
                    className="absolute inset-0 border border-emerald-500/10 rounded-[48px] transition-all duration-300"
                    style={{ 
                      transform: `translateZ(${i * -40}px) scale(${1 - i * 0.05})`,
                      backgroundColor: active ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                      borderColor: active ? 'rgba(16, 185, 129, 0.5)' : 'rgba(16, 185, 129, 0.1)',
                      boxShadow: active ? '0 0 40px rgba(16, 185, 129, 0.2)' : 'none',
                      zIndex: 10 - i
                    }}
                  >
                     {i === 0 && <div className="absolute inset-0 flex items-center justify-center"><Command className={`w-12 h-12 transition-colors ${active ? 'text-emerald-500' : 'text-zinc-300 dark:text-zinc-700'}`} /></div>}
                  </div>
                );
              })}
           </div>
        </div>
      </div>
    </section>
  );
};
