

import React, { useState, useContext } from 'react';
import { Maximize2, Zap, Layout, Sliders, Activity, Monitor, ArrowLeft, Layers, Shield } from 'lucide-react';
import { LanguageContext } from '../App';

export const LayeredDrilldown: React.FC = () => {
  const { t, isDiagnostic } = useContext(LanguageContext);
  const [selected, setSelected] = useState<number | null>(null);

  const modules = [
    { id: 0, label: 'Render_Core', icon: Monitor, color: 'sky' },
    { id: 1, label: 'Secure_Lattice', icon: Shield, color: 'emerald' },
    { id: 2, label: 'Kinetic_Relay', icon: Zap, color: 'rose' }
  ];

  // Fix: Extract selected module and its icon to capitalized variable for JSX compatibility
  const selectedModule = selected !== null ? modules[selected] : null;
  const SelectedIcon = selectedModule ? selectedModule.icon : null;

  return (
    <div className="scroll-mt-24">
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           System_Analysis_v4
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Глубинная <br /><span className="text-indigo-500">Детализация.</span>
         </h2>
      </div>

      <div className="relative h-[750px] bg-zinc-950 rounded-[80px] border border-white/5 overflow-hidden flex items-center justify-center shadow-2xl group perspective-2000">
         
         {/* INITIAL GRID STATE */}
         <div className={`grid grid-cols-3 gap-8 w-full max-w-5xl px-12 transition-all duration-1000 ${selected !== null ? 'opacity-0 scale-150 blur-3xl pointer-events-none' : 'opacity-100 scale-100'}`}>
            {modules.map((m) => (
              <button 
                key={m.id}
                onClick={() => setSelected(m.id)}
                className="aspect-square bg-white/5 border border-white/10 rounded-[48px] flex flex-col items-center justify-center gap-6 group hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-500 shadow-xl"
              >
                 <div className={`w-20 h-20 rounded-[32px] bg-${m.color}-500/10 flex items-center justify-center transition-all group-hover:scale-110`}>
                    <m.icon className={`w-10 h-10 text-${m.color}-500`} />
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] font-mono text-zinc-600 uppercase mb-1">Buffer_0{m.id}</div>
                    <div className="text-lg font-tech font-bold text-white uppercase tracking-widest">{m.label}</div>
                 </div>
                 <Maximize2 className="w-4 h-4 text-zinc-800 group-hover:text-white transition-colors" />
              </button>
            ))}
         </div>

         {/* DETAILED DRILLDOWN STATE */}
         {selected !== null && selectedModule && SelectedIcon && (
           <div className="absolute inset-0 z-50 animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center justify-center p-12">
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-12 left-12 flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
              >
                 <ArrowLeft className="w-4 h-4" /> Back_To_Fleet
              </button>

              <div className="relative w-full max-w-5xl h-full flex flex-col lg:flex-row items-center gap-20 preserve-3d">
                 {/* Deconstructed Layers Visualization */}
                 <div className="flex-1 relative w-full h-[400px] flex items-center justify-center perspective-1000">
                    {[0, 1, 2, 3].map((i) => (
                      <div 
                        key={i}
                        className="absolute inset-0 bg-white/5 border border-white/20 rounded-[56px] backdrop-blur-xl transition-all duration-1000 ease-out"
                        style={{ 
                          transform: `translateZ(${i * 60}px) rotateX(55deg) rotateZ(-35deg) scale(${1 - i * 0.05})`,
                          opacity: 1 - i * 0.2
                        }}
                      >
                         <div className="absolute top-6 left-8 text-[8px] font-mono text-indigo-500 font-bold uppercase tracking-[0.4em]">Structure_Slice_0{i}</div>
                         {/* Fix: Use capitalized SelectedIcon variable for Lucide component rendering */}
                         {i === 0 && <SelectedIcon className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-${selectedModule.color}-500 animate-pulse`} />}
                      </div>
                    ))}
                 </div>

                 {/* Detail Controls */}
                 <div className="w-full lg:w-[400px] space-y-10 animate-in slide-in-from-right-12 duration-1000">
                    <div className="space-y-4">
                       <span className={`px-4 py-1 rounded-full bg-${selectedModule.color}-500/10 border border-${selectedModule.color}-500/30 text-${selectedModule.color}-500 text-[10px] font-black uppercase`}>
                          Active_Drilldown: {selectedModule.label}
                       </span>
                       <h3 className="text-5xl font-tech font-bold text-white uppercase tracking-tighter leading-none">
                          Technical_Audit.
                       </h3>
                       <p className="text-zinc-500 font-light leading-relaxed">Детальный анализ топологического слоя {selected}. Проверка целостности вершин, калибровка теней и оптимизация LOD буферов для текущего сеанса.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       {[
                         { icon: Layers, label: 'Total_Slices', val: '04' },
                         { icon: Sliders, label: 'Optic_Index', val: '1.42n' }
                       ].map((stat, i) => (
                         <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                            <stat.icon className="w-5 h-5 text-indigo-400 mb-3" />
                            <div className="text-[9px] font-mono text-zinc-600 uppercase mb-1">{stat.label}</div>
                            <div className="text-xl font-tech font-bold text-white uppercase">{stat.val}</div>
                         </div>
                       ))}
                    </div>

                    <button className={`w-full py-5 bg-${selectedModule.color}-600 text-white rounded-[32px] font-bold text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all`}>
                       Recalibrate_Stack
                    </button>
                 </div>
              </div>
           </div>
         )}

         {/* HUD SCANLINES */}
         <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(99,102,241,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />
      </div>
    </div>
  );
};
