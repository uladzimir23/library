import React, { useState, useContext, useEffect } from 'react';
import { Heart, Sun, Waves, Sparkles } from 'lucide-react';
import { LanguageContext } from '../App';

export const LuminousBreath: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [pulse, setPulse] = useState(0); // 0 to 1

  useEffect(() => {
    let startTime = Date.now();
    const update = () => {
      const elapsed = Date.now() - startTime;
      // Синусоидальное "дыхание" - 1 цикл за 3 секунды
      const p = (Math.sin(elapsed / 1000 * Math.PI / 1.5) + 1) / 2;
      setPulse(p);
      requestAnimationFrame(update);
    };
    const id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="breath">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.breath.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.breath.title} <span className="text-rose-500">{t.breath.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              Digital objects shouldn't be frozen. Experience Luminous Breath — a rhythmic synchronization of opacity, blur, and border radius that mimics biological vitality.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-rose-500">
                  <Heart className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">BPM_Sync</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">60_STABLE</div>
             </div>
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-emerald-500">
                  <Waves className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Phase_Shift</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">{(pulse * 100).toFixed(0)}%</div>
             </div>
          </div>
        </div>

        <div className="flex-1 w-full h-[550px] relative flex items-center justify-center group">
           {/* Ambient Pulse */}
           <div 
             className="absolute w-96 h-96 rounded-full transition-all duration-1000"
             style={{ 
               backgroundColor: `rgba(244, 63, 94, ${pulse * 0.1})`,
               filter: `blur(${80 + pulse * 40}px)`,
               transform: `scale(${1 + pulse * 0.2})`
             }}
           />

           {/* The Breathing Slab */}
           <div 
             className="relative w-80 h-96 transition-all duration-1000 ease-in-out border border-white/20 flex flex-col items-center justify-center p-12 overflow-hidden shadow-2xl"
             style={{ 
               backgroundColor: `rgba(255, 255, 255, ${0.05 + pulse * 0.05})`,
               backdropFilter: `blur(${20 + pulse * 30}px)`,
               borderRadius: `${32 + (1-pulse) * 48}px`,
               transform: `scale(${0.95 + pulse * 0.05})`,
               borderColor: `rgba(244, 63, 94, ${0.1 + pulse * 0.3})`
             }}
           >
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center gap-8">
                 <div className="w-20 h-20 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-xl transition-all duration-1000"
                      style={{ boxShadow: `0 0 ${40 + pulse * 40}px rgba(244, 63, 94, 0.4)` }}>
                    <Sun className={`w-10 h-10 transition-transform duration-1000 ${pulse > 0.5 ? 'rotate-90' : 'rotate-0'}`} />
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-2">Matter_Pulse</div>
                    <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                       Luminous_v4
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
