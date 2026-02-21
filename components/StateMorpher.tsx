import React, { useState, useContext } from 'react';
import { Sparkles, Loader2, CheckCircle2, AlertCircle, RefreshCw, Zap, Ghost, Gem } from 'lucide-react';
import { LanguageContext } from '../App';

type CompState = 'idle' | 'loading' | 'success' | 'error' | 'crystal' | 'ghost' | 'neon';

export const StateMorpher: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeState, setActiveState] = useState<CompState>('idle');

  const states = [
    { id: 'idle', label: 'Dormant', icon: Sparkles, color: 'indigo' },
    { id: 'loading', label: 'Melting', icon: Loader2, color: 'amber' },
    { id: 'success', label: 'Coherent', icon: CheckCircle2, color: 'emerald' },
    { id: 'crystal', label: 'Lattice', icon: Gem, color: 'sky' },
    { id: 'ghost', label: 'Phasing', icon: Ghost, color: 'zinc' },
    { id: 'neon', label: 'Overdrive', icon: Zap, color: 'rose' },
    { id: 'error', label: 'Entropy', icon: AlertCircle, color: 'rose' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* State Controls */}
        <div className="grid grid-cols-2 gap-4">
           {states.map((s) => (
             <button 
               key={s.id}
               onClick={() => setActiveState(s.id as CompState)}
               className={`p-8 rounded-[40px] border flex flex-col items-center justify-center gap-4 transition-all duration-500 group ${activeState === s.id ? 'bg-indigo-600 border-indigo-400 text-white shadow-2xl scale-105' : 'bg-white dark:bg-zinc-900 border-black/5 dark:border-white/10 text-zinc-500 hover:border-indigo-500/30'}`}
             >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeState === s.id ? 'bg-white/20' : 'bg-black/5 dark:bg-white/5'}`}>
                   <s.icon className={`w-8 h-8 ${activeState === s.id ? 'text-white' : 'text-zinc-500'} ${s.id === 'loading' ? 'animate-spin' : ''}`} />
                </div>
                <div className="text-center">
                   <div className="text-[8px] font-mono uppercase tracking-[0.3em] mb-1 opacity-50">Protocol_0x{s.id.toUpperCase()}</div>
                   <div className="text-xl font-tech font-bold uppercase tracking-widest">{s.label}</div>
                </div>
             </button>
           ))}
        </div>

        {/* Morphing Visualizer */}
        <div className="w-full h-[650px] bg-zinc-950 rounded-[80px] relative overflow-hidden flex items-center justify-center shadow-2xl border border-white/5">
           {/* Background Ambiance based on State */}
           <div className={`absolute inset-0 transition-all duration-1000 blur-[150px] opacity-10 bg-${states.find(s => s.id === activeState)?.color}-500`} />
           
           {/* The Morphing Object */}
           <div 
             className={`relative w-80 h-96 transition-all duration-700 ease-out backdrop-blur-3xl border shadow-2xl flex flex-col items-center justify-center p-12 overflow-hidden
               ${activeState === 'idle' ? 'rounded-[100px] border-white/20 bg-white/5 scale-100' : ''}
               ${activeState === 'loading' ? 'rounded-[60px] border-amber-500/40 bg-amber-500/5 animate-pulse scale-95' : ''}
               ${activeState === 'success' ? 'rounded-[40px] border-emerald-500/60 bg-emerald-500/10 scale-105' : ''}
               ${activeState === 'crystal' ? 'rounded-[0px] border-sky-400/40 bg-sky-400/5 rotate-45 scale-90' : ''}
               ${activeState === 'ghost' ? 'rounded-[120px] border-white/5 bg-transparent opacity-20 blur-md scale-110' : ''}
               ${activeState === 'neon' ? 'rounded-[48px] border-rose-500 bg-rose-500/20 shadow-[0_0_80px_rgba(244,63,94,0.4)] scale-100 rotate-3' : ''}
               ${activeState === 'error' ? 'rounded-[32px] border-rose-600 bg-rose-900/20 skew-x-12 scale-95' : ''}
             `}
           >
              {/* Internal Polish Edge */}
              <div className="absolute inset-0 border-t border-l border-white/40 pointer-events-none rounded-[inherit]" />

              <div className={`w-28 h-28 rounded-3xl flex items-center justify-center transition-all duration-700 bg-white/5 border border-white/10 shadow-2xl mb-8
                ${activeState === 'success' ? 'bg-emerald-500 text-white shadow-emerald-500/40' : 'text-zinc-400'}
              `}>
                 {React.createElement(states.find(s => s.id === activeState)!.icon, { className: "w-12 h-12" })}
              </div>

              <div className="text-center relative z-10">
                 <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] mb-3">Matter_State_Sync</div>
                 <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter leading-none">
                    {activeState === 'idle' && 'Initializing'}
                    {activeState === 'loading' && 'Recalibrating'}
                    {activeState === 'success' && 'Ready'}
                    {activeState === 'crystal' && 'Stabilized'}
                    {activeState === 'ghost' && 'Phasing'}
                    {activeState === 'neon' && 'Maximum'}
                    {activeState === 'error' && 'Failed'}
                 </div>
              </div>

              {/* Diagnostic Lines */}
              <div className="absolute bottom-8 left-0 right-0 px-12 flex justify-between items-center opacity-30">
                 <div className="flex gap-1">
                    {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-white rounded-full" />)}
                 </div>
                 <div className="text-[8px] font-mono text-zinc-500">HASH_0x882A</div>
              </div>
           </div>

           {/* HUD Callout */}
           <div className="absolute top-12 left-12 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] font-bold">Topological_Scan: Active</span>
           </div>
        </div>
    </div>
  );
};
