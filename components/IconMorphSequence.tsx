import React, { useState, useContext } from 'react';
import { Play, Square, Menu, X, ArrowRight, Check, Zap, Sparkles } from 'lucide-react';
import { LanguageContext } from '../App';

export const IconMorphSequence: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [stateA, setStateA] = useState(false);
  const [stateB, setStateB] = useState(false);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="icon-morph">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Micro_Geometry
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Icon_Morph <br /><span className="text-indigo-500">Sequence.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Icons are not static symbols. They are topological entities that evolve through interaction. Our morphing engine ensures that every state transition is fluid, preserving visual momentum.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="p-8 bg-white dark:bg-zinc-900 rounded-[40px] border border-black/5 dark:border-white/10 flex flex-col items-center gap-6 group hover:border-indigo-500/30 transition-all">
                <button 
                  onClick={() => setStateA(!stateA)}
                  className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl transition-all duration-500 active:scale-90"
                >
                   {stateA ? <Square className="w-10 h-10 animate-in zoom-in-50 fade-in duration-300 fill-current" /> : <Play className="w-10 h-10 animate-in zoom-in-50 fade-in duration-300 fill-current" />}
                </button>
                <div className="text-center">
                   <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">State: {stateA ? 'Stop' : 'Play'}</div>
                   <div className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Action_Control</div>
                </div>
             </div>

             <div className="p-8 bg-white dark:bg-zinc-900 rounded-[40px] border border-black/5 dark:border-white/10 flex flex-col items-center gap-6 group hover:border-emerald-500/30 transition-all">
                <button 
                  onClick={() => setStateB(!stateB)}
                  className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center text-white shadow-2xl transition-all duration-500 active:scale-90"
                >
                   {stateB ? <X className="w-10 h-10 animate-in spin-in-90 duration-300" /> : <Menu className="w-10 h-10 animate-in spin-in-[-90] duration-300" />}
                </button>
                <div className="text-center">
                   <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">State: {stateB ? 'Close' : 'Menu'}</div>
                   <div className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Navigation_Hub</div>
                </div>
             </div>
          </div>
        </div>

        <div className="flex-1 w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center shadow-2xl">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] animate-pulse" />
           
           {/* Abstract Topological Visual */}
           <div className="relative w-64 h-64 flex items-center justify-center">
              <div className={`absolute inset-0 border-4 border-indigo-500/20 rounded-full transition-all duration-1000 ${stateA ? 'scale-110 rotate-180 border-indigo-500/40' : 'scale-100 rotate-0'}`} />
              <div className={`absolute inset-8 border-2 border-emerald-500/20 rounded-2xl transition-all duration-1000 ${stateB ? 'rotate-45 scale-90 border-emerald-500/40' : 'rotate-0 scale-100'}`} />
              
              <div className="relative z-10 flex flex-col items-center gap-4">
                 <Sparkles className={`w-16 h-16 transition-all duration-700 ${stateA || stateB ? 'text-indigo-400 scale-125' : 'text-zinc-700'}`} />
                 <div className="text-[10px] font-tech text-zinc-500 uppercase tracking-[0.5em]">Topology_Sync</div>
              </div>
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <Zap className="w-4 h-4 text-indigo-500" />
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Topological_Warp: NOMINAL</span>
           </div>
        </div>
      </div>
    </section>
  );
};
