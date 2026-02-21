import React, { useState, useContext } from 'react';
import { Layers, Zap, Activity, Cpu, Radio, ChevronDown, ChevronUp } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralSynapseStack: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [pulsePos, setPulsePos] = useState(50); // 0 to 100

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="synapse-stack">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Neural_Propagation_v6
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Synapse <br /><span className="text-indigo-500">Stack_Sync.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Information travels in waves. This system visualizes the Z-axis propagation of a logic signal through a stack of specialized neural layers, each reacting to the "Synaptic Pulse" with unique refractive distortion.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 space-y-8 shadow-2xl">
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                   <span className="flex items-center gap-2"><Zap className="w-3 h-3 text-indigo-500" /> Pulse_Depth</span>
                   <span className="font-mono text-indigo-400">{pulsePos}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" step="1" value={pulsePos}
                  onChange={e => setPulsePos(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
             </div>
             
             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="flex flex-col gap-1">
                   <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest">Active_Layer</span>
                   <span className="text-sm font-tech text-white uppercase tracking-tighter">0x{Math.floor(pulsePos/33).toString(16)}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                   <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest">Stability</span>
                   <span className="text-sm font-tech text-emerald-500 uppercase tracking-tighter">COHERENT</span>
                </div>
             </div>
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl group">
           {/* Vertical Energy Rail */}
           <div className="absolute h-full w-[1px] bg-indigo-500/10" />

           {/* The Stack */}
           <div className="relative w-80 h-[500px] preserve-3d flex flex-col items-center justify-between py-12">
              {[0, 1, 2].map((i) => {
                const layerZ = i * 150;
                const layerPos = (i * 33);
                const isActive = Math.abs(pulsePos - (layerPos + 16)) < 20;
                
                return (
                  <div 
                    key={i}
                    className={`relative w-full h-32 rounded-[48px] border transition-all duration-700 ease-out flex flex-col items-center justify-center p-8 overflow-hidden ${
                      isActive ? 'bg-indigo-500/10 border-indigo-500/60 shadow-[0_0_50px_rgba(99,102,241,0.2)] scale-110' : 'bg-white/5 border-white/10 opacity-40 grayscale-[0.8]'
                    }`}
                  >
                     {/* Internal Glow if active */}
                     {isActive && (
                       <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-transparent to-indigo-500/10 animate-pulse" />
                     )}
                     
                     <div className={`transition-all duration-500 ${isActive ? 'text-indigo-400' : 'text-zinc-600'}`}>
                        {i === 0 ? <Cpu className="w-10 h-10 mb-4" /> : i === 1 ? <Radio className="w-10 h-10 mb-4" /> : <Activity className="w-10 h-10 mb-4" />}
                        <div className="text-center">
                           <div className="text-[10px] font-mono uppercase tracking-widest">Layer_0{i}</div>
                           <div className="text-xl font-tech font-bold uppercase tracking-tight">{['Compute', 'Signal', 'Result'][i]}</div>
                        </div>
                     </div>
                  </div>
                );
              })}
           </div>

           {/* Traveling Signal Pulse Visual */}
           <div 
             className="absolute w-2 h-16 bg-indigo-500 rounded-full blur-md shadow-[0_0_20px_#6366f1] transition-all duration-150 ease-out z-50 pointer-events-none"
             style={{ top: `${pulsePos}%`, opacity: 0.8 }}
           />

           <div className="absolute bottom-12 right-12 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em]">
              Propagating_Node: 0x88_A
           </div>
        </div>
      </div>
    </section>
  );
};
