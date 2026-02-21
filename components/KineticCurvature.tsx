import React, { useState, useContext, useEffect } from 'react';
import { Activity, Zap, RefreshCw, Move, Radio, Target, MousePointer2 } from 'lucide-react';
import { LanguageContext } from '../App';

type EaseType = 'elastic' | 'bounce' | 'quintic' | 'linear';

export const KineticCurvature: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [ease, setEase] = useState<EaseType>('elastic');
  const [play, setPlay] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (play) {
      let start = 0;
      const animate = () => {
        start += 0.015;
        if (start > 1) {
          setPlay(false);
          setProgress(1);
        } else {
          setProgress(start);
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [play]);

  const getPath = (type: EaseType) => {
    switch(type) {
      case 'elastic': return "M 0,200 C 50,200 80,0 120,250 C 160,50 200,200 300,200";
      case 'bounce': return "M 0,200 L 100,50 L 150,200 L 200,100 L 250,200 L 300,200";
      case 'quintic': return "M 0,200 C 150,200 250,200 300,0";
      default: return "M 0,200 L 300,0";
    }
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="curvature">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Motion_Dynamics
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Kinetic <br /><span className="text-rose-500">Curvature.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Animations are physics simulations. Our easing curves are calculated to mimic real-world inertia, ensuring that every transition feels purposeful and high-fidelity.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
             {(['elastic', 'bounce', 'quintic', 'linear'] as EaseType[]).map((e) => (
               <button 
                 key={e}
                 onClick={() => { setEase(e); setProgress(0); }}
                 className={`py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all ${ease === e ? 'bg-rose-500 border-rose-400 text-white shadow-xl scale-[1.02]' : 'bg-black/5 dark:bg-white/5 border-transparent text-zinc-500 hover:bg-black/10'}`}
               >
                 {e}
               </button>
             ))}
          </div>

          <button 
            onClick={() => setPlay(true)}
            className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <Zap className="w-4 h-4" /> Run_Animation_Sweep
          </button>
        </div>

        <div className="flex-1 w-full h-[600px] bg-zinc-50 dark:bg-zinc-950/40 rounded-[64px] border border-black/5 dark:border-white/10 relative overflow-hidden flex flex-col items-center justify-center group shadow-inner">
           {/* Oscilloscope Grid */}
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#f43f5e 1px, transparent 1px), linear-gradient(90deg, #f43f5e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           
           <div className="relative w-full max-w-md h-[400px] flex flex-col items-center justify-center">
              <svg className="w-full h-full overflow-visible opacity-20 dark:opacity-40">
                 <path d={getPath(ease)} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-rose-500 transition-all duration-700" />
              </svg>

              {/* The Moving Actor */}
              <div 
                className="absolute w-20 h-20 rounded-3xl bg-rose-500 shadow-2xl flex items-center justify-center text-white transition-all duration-75"
                style={{ 
                  left: `${progress * 100}%`,
                  transform: `translate(-50%, -50%) rotate(${progress * 360}deg) scale(${1 + Math.sin(progress * Math.PI) * 0.2})`,
                  top: '50%'
                }}
              >
                 <Activity className="w-10 h-10" />
              </div>
           </div>

           {/* HUD Diagnostics */}
           <div className="absolute bottom-12 left-12 flex items-center gap-4">
              <div className="p-3 bg-rose-500/10 rounded-xl text-rose-500">
                 <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                 <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Momentum_Bias</div>
                 <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white uppercase">{(progress * 1.22).toFixed(3)}_N</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
