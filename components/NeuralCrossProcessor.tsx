import React, { useState, useContext, useEffect } from 'react';
import { Cpu, Zap, Activity, Radio, Network, Layout, Share2, Grid } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralCrossProcessor: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#080808]" id="cross-processor">
      <div className="text-center mb-24">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
          Parallel_Logic_v10
        </span>
        <h2 className="text-4xl md:text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
          Neural <br /><span className="text-indigo-500">Cross_Processor.</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light max-w-3xl mx-auto mt-6">
          Intelligence through intersection. We visualize the crossing of horizontal and vertical data threads, where nodal activation creates high-velocity signal bursts across the spatial stack.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* Sidebar Stats */}
         <div className="lg:col-span-4 space-y-6">
            {[
              { icon: Cpu, label: 'Thread_Count', val: '64_Parallel', color: 'indigo' },
              { icon: Zap, label: 'Activation_Bias', val: '0.42_V', color: 'emerald' },
              { icon: Radio, label: 'Sync_Coherence', val: '99.9%', color: 'sky' }
            ].map((stat, i) => (
              <div key={i} className="p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-[40px] border border-black/5 dark:border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-all shadow-sm">
                 <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
                       <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                       <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</div>
                       <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white uppercase">{stat.val}</div>
                    </div>
                 </div>
                 <div className={`w-2 h-2 rounded-full bg-${stat.color}-500 ${pulse ? 'animate-ping' : ''}`} />
              </div>
            ))}
         </div>

         {/* Main 3D Visualization */}
         <div className="lg:col-span-8 h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl">
            {/* The Processing Cuboid */}
            <div className="relative w-96 h-96 preserve-3d animate-spin-slow" style={{ animationDuration: '20s' }}>
               
               {/* 3 Intersecting Glass Layers */}
               {[0, 1, 2].map((i) => (
                 <div 
                   key={i}
                   className="absolute inset-0 border border-white/20 bg-white/5 backdrop-blur-xl rounded-[48px] flex items-center justify-center transition-all duration-1000"
                   style={{ transform: `rotateX(45deg) rotateZ(45deg) translateZ(${(i-1)*60}px)` }}
                 >
                    {/* Cross-Signal Lines */}
                    <div className="absolute inset-0 overflow-hidden">
                       <div className={`absolute top-0 bottom-0 left-1/2 w-[1px] bg-indigo-500/40 transition-all duration-700 ${pulse ? 'opacity-100 scale-y-110' : 'opacity-20 scale-y-100'}`} />
                       <div className={`absolute left-0 right-0 top-1/2 h-[1px] bg-emerald-500/40 transition-all duration-700 ${pulse ? 'opacity-100 scale-x-110' : 'opacity-20 scale-x-100'}`} />
                    </div>

                    <div className="relative z-10">
                       <Grid className={`w-12 h-12 text-white/10 transition-opacity duration-1000 ${pulse ? 'opacity-40' : 'opacity-10'}`} />
                    </div>
                 </div>
               ))}

               {/* Center Activation Spark */}
               <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-md transition-all duration-500 ${pulse ? 'scale-150 opacity-100 shadow-[0_0_40px_#fff]' : 'scale-0 opacity-0 shadow-none'}`} />
            </div>

            <div className="absolute bottom-12 right-12 text-right">
               <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-bold mb-1">Processing_Core_v4</div>
               <div className="text-xs font-mono text-zinc-500">CYCLES_PER_MS: 842.1</div>
            </div>
         </div>
      </div>
    </section>
  );
};
