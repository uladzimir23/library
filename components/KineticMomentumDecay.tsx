import React, { useState, useContext, useEffect, useRef } from 'react';
import { FastForward, Activity, Zap, RefreshCw, Sliders, Wind } from 'lucide-react';
import { LanguageContext } from '../App';

export const KineticMomentumDecay: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [velocity, setVelocity] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollPos = useRef(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const current = e.currentTarget.scrollLeft;
    const v = Math.abs(current - lastScrollPos.current);
    setVelocity(prev => Math.min(100, prev + v * 2));
    lastScrollPos.current = current;
    setIsScrolling(true);
  };

  useEffect(() => {
    const decay = setInterval(() => {
      setVelocity(v => {
        if (v <= 0.5) {
          setIsScrolling(false);
          return 0;
        }
        return v * 0.92; // Decay factor
      });
    }, 30);
    return () => clearInterval(decay);
  }, []);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="momentum-decay">
      <div className="text-center mb-24">
        <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
          Fluid_Momentum
        </span>
        <h2 className="text-4xl md:text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
          Kinetic <br /><span className="text-sky-500">Momentum_Decay.</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light max-w-3xl mx-auto mt-6">
          Scrolling is a physics event. We visualize kinetic energy through dynamic motion blur and spectral shifting, allowing the interface to react to the intensity of user intent.
        </p>
      </div>

      <div className="relative group">
         {/* Horizontal Scroll Area */}
         <div 
           ref={containerRef}
           onScroll={handleScroll}
           className="flex gap-8 overflow-x-auto no-scrollbar px-12 py-20 cursor-grab active:cursor-grabbing perspective-2000"
         >
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="shrink-0 w-80 h-96 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl border border-black/5 dark:border-white/10 rounded-[56px] shadow-2xl flex flex-col p-10 justify-between transition-all duration-75"
                style={{ 
                  filter: `blur(${velocity * 0.15}px) saturate(${1 + velocity * 0.02})`,
                  transform: `translateY(${velocity * (i % 2 === 0 ? 0.2 : -0.2)}px) rotateX(${velocity * 0.1}deg)`,
                  backgroundColor: `rgba(14, 165, 233, ${velocity * 0.002})`
                }}
              >
                 <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500 shadow-xl">
                       <Zap className={`w-7 h-7 ${velocity > 20 ? 'animate-pulse' : ''}`} />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">INDEX_0{i}</span>
                 </div>
                 
                 <div>
                    <div className="text-[10px] font-mono text-sky-500 uppercase font-bold mb-1">Momentum_Value</div>
                    <div className="text-3xl font-tech font-bold text-zinc-900 dark:text-white">0x{(velocity * (i+1)).toFixed(0)}</div>
                 </div>

                 <div className="h-1 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 transition-all duration-75" style={{ width: `${Math.random() * 100}%` }} />
                 </div>
              </div>
            ))}
         </div>

         {/* Gradient Overlays */}
         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-50 dark:from-[#050507] to-transparent pointer-events-none z-10" />
         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-50 dark:from-[#050507] to-transparent pointer-events-none z-10" />
      </div>

      <div className="mt-20 flex justify-center gap-12">
         <div className="flex items-center gap-4">
            <Wind className={`w-6 h-6 ${isScrolling ? 'text-sky-500 animate-pulse' : 'text-zinc-700'}`} />
            <div>
               <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Current_Velocity</div>
               <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">{velocity.toFixed(2)}_PXS</div>
            </div>
         </div>
         <div className="w-[1px] h-12 bg-black/5 dark:bg-white/10" />
         <div className="flex items-center gap-4">
            <RefreshCw className={`w-6 h-6 ${isScrolling ? 'animate-spin' : 'text-zinc-700'}`} />
            <div>
               <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Kinetic_Buffer</div>
               <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">{isScrolling ? 'DECAYING' : 'IDLE'}</div>
            </div>
         </div>
      </div>
    </section>
  );
};