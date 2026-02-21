import React, { useState, useContext } from 'react';
import { Share2, Zap, Activity, Split, Merge, MousePointer2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const BifurcationMitosis: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isSplit, setIsSplit] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#080808]" id="mitosis">
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="mitosis-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Cellular_Logic_v2
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Bifurcation <br /><span className="text-indigo-500">Mitosis.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are living organisms. Watch how a single nucleus splits into dedicated functional nodes, maintaining a viscous connection until the topological break point is reached.
            </p>
          </div>

          <div className="flex gap-4">
             <button 
               onClick={() => setIsSplit(!isSplit)}
               className="px-10 py-5 bg-indigo-600 text-white rounded-[24px] font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
             >
                {isSplit ? <Merge className="w-4 h-4" /> : <Split className="w-4 h-4" />}
                {isSplit ? 'Trigger_Fusion' : 'Trigger_Split'}
             </button>
          </div>
        </div>

        <div className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#6366f1_0.5px,transparent_0.5px)] bg-[length:32px_32px]" />

           {/* Mitosis Container */}
           <div className="relative w-full h-full flex items-center justify-center" style={{ filter: 'url(#mitosis-goo)' }}>
              
              {/* Node A / Main Nucleus */}
              <div 
                className={`absolute w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-1000 cubic-bezier(0.6, -0.28, 0.735, 0.045)`}
                style={{ transform: isSplit ? 'translateX(-80px)' : 'translateX(0px)' }}
              >
                 <Zap className={`w-8 h-8 ${isSplit ? 'opacity-100' : 'opacity-40'}`} />
              </div>

              {/* Node B / Child Nucleus */}
              <div 
                className={`absolute w-32 h-32 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-1000 cubic-bezier(0.6, -0.28, 0.735, 0.045)`}
                style={{ transform: isSplit ? 'translateX(80px)' : 'translateX(0px)', opacity: isSplit ? 1 : 0.8 }}
              >
                 <Activity className={`w-8 h-8 ${isSplit ? 'opacity-100' : 'opacity-40'}`} />
              </div>

              {/* Central Tension Dot */}
              {!isSplit && (
                <div className="absolute w-4 h-4 bg-white/40 rounded-full animate-ping" />
              )}
           </div>

           {/* HUD Stats */}
           <div className="absolute bottom-12 left-12 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                 <div className={`w-2 h-2 rounded-full ${isSplit ? 'bg-indigo-500 animate-pulse' : 'bg-zinc-700'}`} />
                 <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Cycle_State: {isSplit ? 'DIPLOID' : 'HAPLOID'}</span>
              </div>
              <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-tighter">Membrane_Tension: {isSplit ? '0.04N' : '0.98N'}</div>
           </div>
        </div>
      </div>
    </section>
  );
};
