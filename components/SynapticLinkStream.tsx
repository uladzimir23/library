import React, { useState, useContext, useEffect } from 'react';
import { Share2, Zap, Activity, Cpu, Radio, Network } from 'lucide-react';
import { LanguageContext } from '../App';

export const SynapticLinkStream: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="synaptic-link">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Neural_Signal_Path
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Synaptic <br /><span className="text-indigo-500">Link_Stream.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Data isn't static. We visualize the flow of logic as synaptic impulses traveling through organic paths, establishing real-time synchronization between disparate system nodes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <Activity className="w-5 h-5 text-indigo-500 mb-3" />
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Propagation_Speed</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">0.94_MACH</div>
             </div>
             <div className="p-6 bg-white dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <Radio className="w-5 h-5 text-emerald-500 mb-3" />
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Signal_Coherence</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">99.8%</div>
             </div>
          </div>
        </div>

        <div className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
           {/* Background Mesh */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#6366f1_0.5px,transparent_0.5px)] bg-[length:40px_40px]" />

           {/* Synaptic Network */}
           <div className="relative w-full h-full flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                 <defs>
                    <filter id="synaptic-glow">
                       <feGaussianBlur stdDeviation="4" result="blur" />
                       <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                 </defs>
                 
                 {/* Connection Paths */}
                 {[
                   "M 200,300 Q 400,100 600,300",
                   "M 200,300 Q 400,500 600,300",
                   "M 400,150 L 400,450"
                 ].map((path, i) => (
                   <g key={i}>
                      <path d={path} fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="2" strokeDasharray="10 5" />
                      <path d={path} fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="100 500" strokeDashoffset="600" className="animate-[dash_3s_linear_infinite]" style={{ animationDelay: `${i * 0.5}s` }} filter="url(#synaptic-glow)" />
                   </g>
                 ))}
              </svg>

              {/* Node A */}
              <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl z-20 transition-transform hover:scale-110">
                 <Cpu className="w-8 h-8" />
                 <div className="absolute -bottom-8 text-[8px] font-mono text-zinc-500 uppercase">NODE_INPUT_0x1</div>
              </div>

              {/* Node B */}
              <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl z-20 transition-transform hover:scale-110">
                 <Network className="w-8 h-8" />
                 <div className="absolute -bottom-8 text-[8px] font-mono text-zinc-500 uppercase">NODE_OUTPUT_0x2</div>
              </div>

              {/* Central Processor */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 border border-white/10 rounded-full backdrop-blur-3xl flex items-center justify-center shadow-inner z-10">
                 <div className={`w-2 h-2 bg-indigo-500 rounded-full transition-all duration-1000 ${pulse ? 'scale-[15] opacity-5' : 'scale-1'}`} />
                 <Zap className="w-10 h-10 text-indigo-400 opacity-20 absolute" />
              </div>
           </div>

           {/* HUD overlay */}
           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Signal_Stream: ACTIVE</span>
           </div>
        </div>
      </div>
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
};