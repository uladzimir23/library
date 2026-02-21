import React, { useState, useContext, useEffect } from 'react';
import { Workflow, Activity, Sparkles, Cpu, Layers, Link as LinkIcon, Radio } from 'lucide-react';
import { LanguageContext } from '../App';

export const ResonanceStructure: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 4000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 0, icon: Cpu, label: 'Core_Logic', color: 'indigo' },
    { id: 1, icon: Layers, label: 'Visual_Stack', color: 'emerald' },
    { id: 2, icon: Activity, label: 'Kinetic_Relay', color: 'pink' },
    { id: 3, icon: Sparkles, label: 'Spectral_Flux', color: 'rose' }
  ];

  return (
    <section className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5" id="resonance">
      <div className="text-center mb-24">
        <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/10 text-fuchsia-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
          {t.resonance.tag}
        </span>
        <h2 className="text-4xl md:text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
          {t.resonance.title} <span className="text-fuchsia-500">{t.resonance.titleAccent}</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed max-w-3xl mx-auto mt-6">
          {t.resonance.desc}
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-[500px] perspective-2000">
        {/* Connection Lines (Background) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20 pointer-events-none">
           <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent" />
           <div className="absolute w-[1px] h-96 bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 w-full max-w-6xl">
           {nodes.map((node) => {
             const Icon = node.icon;
             const isNeighbor = activeNode !== null && Math.abs(activeNode - node.id) === 1;
             const isActive = activeNode === node.id;

             return (
               <div 
                 key={node.id}
                 onMouseEnter={() => setActiveNode(node.id)}
                 onMouseLeave={() => setActiveNode(null)}
                 className={`relative p-10 bg-white/40 dark:bg-zinc-900/40 border transition-all duration-1000 rounded-[48px] cursor-pointer group ${
                   isActive ? 'border-fuchsia-500 scale-105 shadow-2xl' : isNeighbor ? 'border-fuchsia-500/30 scale-[1.02]' : 'border-black/5 dark:border-white/5'
                 }`}
               >
                  {/* Energy Pulse Ring */}
                  <div className={`absolute inset-0 border-2 border-fuchsia-500/50 rounded-[48px] transition-all duration-[2000ms] ${
                    isActive || pulse ? 'opacity-20 scale-110' : 'opacity-0 scale-100'
                  }`} />

                  <div className="flex flex-col items-center gap-6 relative z-10">
                     <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                       isActive ? 'bg-fuchsia-500 text-white shadow-lg' : 'bg-fuchsia-500/10 text-fuchsia-500'
                     }`}>
                        <Icon className={`w-8 h-8 ${isActive ? 'animate-pulse' : ''}`} />
                     </div>
                     <div className="text-center">
                        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">Node_ID: {node.id}</div>
                        <h4 className="text-xl font-tech font-bold text-zinc-900 dark:text-white uppercase transition-colors">{node.label}</h4>
                     </div>
                  </div>

                  {/* Flowing Data Indicator */}
                  <div className="mt-8 flex justify-center gap-1">
                     {[1,2,3,4].map(i => (
                       <div key={i} className={`h-1 rounded-full transition-all duration-700 ${
                         isActive ? 'w-4 bg-fuchsia-500' : 'w-2 bg-zinc-200 dark:bg-zinc-800'
                       }`} style={{ transitionDelay: `${i * 100}ms` }} />
                     ))}
                  </div>
               </div>
             );
           })}
        </div>

        {/* Global Resonance Status HUD */}
        <div className="mt-20 flex gap-12 items-center px-12 py-6 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl border border-black/5 dark:border-white/5 rounded-[32px]">
           <div className="flex items-center gap-4">
              <Radio className={`w-5 h-5 ${pulse ? 'text-fuchsia-500' : 'text-zinc-500'}`} />
              <div>
                 <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Global_Heartbeat</div>
                 <div className="text-xs font-mono text-zinc-900 dark:text-white uppercase">{pulse ? 'Pulsing' : 'Resting'}</div>
              </div>
           </div>
           <div className="w-[1px] h-10 bg-black/5 dark:bg-white/10" />
           <div className="flex items-center gap-4">
              <LinkIcon className="w-5 h-5 text-zinc-500" />
              <div>
                 <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Resonance_Sync</div>
                 <div className="text-xs font-mono text-zinc-900 dark:text-white uppercase">99.8% Coherent</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
