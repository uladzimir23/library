import React, { useState, useContext } from 'react';
import { Layers, Zap, Info, Settings, Play, Shield, Activity, RefreshCw } from 'lucide-react';
import { LanguageContext } from '../App';

export const ModularPhaseBay: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const modules = [
    { id: 0, label: 'Media_Core', icon: Play, color: 'indigo', meta: '0x88.A | MP4_READY' },
    { id: 1, label: 'Neural_Lattice', icon: Activity, color: 'emerald', meta: '0x42.F | SYNC_OK' },
    { id: 2, label: 'Security_Bay', icon: Shield, color: 'rose', meta: '0x12.S | LOCKED' }
  ];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#080808]" id="phase-bay">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Modular_Hierarchy
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Phase <br /><span className="text-emerald-500">Modular_Bay.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces have backends. This system allows you to flip individual functional modules into a "Service State," revealing the raw metadata and structural tokens that power the spatial object.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-black/5 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5 flex items-center gap-4">
                <RefreshCw className="w-6 h-6 text-emerald-500 animate-spin-slow" />
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase">Phase_Sync</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase">98%_Coherent</div>
                </div>
             </div>
             <button 
               onClick={() => setFlippedIndex(null)}
               className="p-6 bg-emerald-600 text-white rounded-3xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all active:scale-95 shadow-xl shadow-emerald-500/20"
             >
                Reset_All_Phases
             </button>
          </div>
        </div>

        <div className="flex-1 w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex flex-col items-center justify-center gap-6 p-12 perspective-2000">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#10b981_0.5px,transparent_0.5px)] bg-[length:40px_40px]" />

           {modules.map((mod, i) => (
             <div 
               key={i}
               className="relative w-full max-w-sm h-32 preserve-3d transition-transform duration-700 ease-out cursor-pointer"
               style={{ 
                 transform: flippedIndex === i ? 'rotateX(180deg)' : 'rotateX(0deg)',
               }}
               onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}
             >
                {/* Front: Functional Module */}
                <div className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 rounded-3xl backdrop-blur-3xl flex items-center justify-between px-8 shadow-xl hover:bg-white/10 transition-all group">
                   <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl bg-${mod.color}-500/10 border border-${mod.color}-500/20 flex items-center justify-center text-${mod.color}-500 group-hover:scale-110 transition-transform`}>
                         <mod.icon className="w-8 h-8" />
                      </div>
                      <div>
                         <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Module_0{i}</div>
                         <h3 className="text-xl font-tech font-bold text-white uppercase">{mod.label}</h3>
                      </div>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-emerald-500">
                      <Info className="w-5 h-5" />
                   </div>
                </div>

                {/* Back: Technical Structure */}
                <div className="absolute inset-0 backface-hidden bg-zinc-900 border border-emerald-500/30 rounded-3xl flex items-center justify-between px-8 shadow-2xl" style={{ transform: 'rotateX(180deg)' }}>
                   <div className="space-y-2">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold tracking-widest">Metadata_Live</span>
                      </div>
                      <div className="text-[9px] font-mono text-zinc-500">{mod.meta}</div>
                      <div className="text-[8px] font-mono text-zinc-600">STATE: PHASE_SHIFTED_BY_USER</div>
                   </div>
                   <div className="p-4 bg-emerald-500/10 rounded-2xl">
                      <Settings className="w-6 h-6 text-emerald-500 animate-spin-slow" />
                   </div>
                </div>
             </div>
           ))}

           <div className="absolute top-12 left-12 flex items-center gap-4 text-emerald-500/40">
              <Layers className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Multi_Module_Bay_088</span>
           </div>
        </div>
      </div>
      <style>{`
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </section>
  );
};
