
import React, { useState, useContext, useRef } from 'react';
import { FlaskConical, Target, Zap, Activity, Box, Maximize2, Move, Sliders, Shield, RefreshCw } from 'lucide-react';
import { LanguageContext } from '../App';

export const MolecularArchitectConsole: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeAtom, setActiveAtom] = useState(0);
  const [bondStrength, setBondStrength] = useState(0.6);
  const [isForging, setIsForging] = useState(false);

  const atoms = [
    { label: 'C-06', color: 'indigo', density: 1.4 },
    { label: 'O-08', color: 'emerald', density: 1.2 },
    { label: 'N-07', color: 'rose', density: 1.3 },
    { label: 'H-01', color: 'sky', density: 0.8 }
  ];

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 text-right">
         <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Matter_Forge_v12
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Молекулярный <br /><span className="text-emerald-500">Архитектор.</span>
         </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[750px]">
         {/* 1. ATOM LIBRARY (LEFT) */}
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex flex-col gap-8 shadow-2xl h-full">
               <div className="flex items-center gap-3">
                  <FlaskConical className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Atom_Registry</span>
               </div>
               
               <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scroll">
                  {atoms.map((a, i) => (
                    <div 
                      key={i}
                      onClick={() => setActiveAtom(i)}
                      className={`p-5 rounded-3xl border transition-all duration-500 cursor-pointer flex items-center justify-between group ${activeAtom === i ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}`}
                    >
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${activeAtom === i ? 'bg-white/20' : 'bg-emerald-500/10'}`}>
                             <div className="text-xs font-tech font-bold">{a.label}</div>
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-widest">{['Carbon', 'Oxygen', 'Nitrogen', 'Hydrogen'][i]}</div>
                       </div>
                       <Activity className={`w-4 h-4 ${activeAtom === i ? 'opacity-100' : 'opacity-10'}`} />
                    </div>
                  ))}
               </div>

               <div className="p-6 bg-white/5 rounded-3xl space-y-4">
                  <div className="flex justify-between text-[8px] font-mono text-zinc-500 uppercase">
                     <span>Mass_Density</span>
                     <span className="text-emerald-500">{atoms[activeAtom].density}_P</span>
                  </div>
                  <div className="h-1 bg-black rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500" style={{ width: `${atoms[activeAtom].density * 60}%` }} />
                  </div>
               </div>
            </div>
         </div>

         {/* 2. FORGE CHAMBER (CENTER) */}
         <div className="lg:col-span-6 bg-zinc-950 rounded-[64px] border border-white/5 relative overflow-hidden flex items-center justify-center group/chamber shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
            
            {/* The Atomic Core Visual */}
            <div className={`relative w-80 h-80 flex items-center justify-center transition-all duration-1000 ${isForging ? 'scale-125' : 'scale-100'}`}>
               <div className={`absolute inset-0 rounded-full border-2 border-emerald-500/10 transition-all duration-1000 ${isForging ? 'animate-[spin_4s_linear_infinite] opacity-40' : 'opacity-10'}`} />
               <div className={`absolute inset-[-40px] border border-dashed border-emerald-500/20 rounded-full animate-spin-slow`} />
               
               <div className={`relative w-40 h-40 bg-zinc-900 border-2 border-emerald-500/30 rounded-[56px] flex flex-col items-center justify-center shadow-2xl transition-all duration-1000 ${isForging ? 'rotate-[-45deg] bg-emerald-600 border-white shadow-emerald-500/50' : ''}`}>
                  <Box className={`w-16 h-16 transition-all duration-1000 ${isForging ? 'text-white' : 'text-emerald-500/40'}`} />
                  {isForging && (
                    <div className="absolute -bottom-16 bg-white text-zinc-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl animate-bounce">Synthesizing...</div>
                  )}
               </div>
            </div>

            <div className="absolute top-10 right-10 flex flex-col items-end gap-2 text-right">
               <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-zinc-600" />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Focus_LOD: HIGH</span>
               </div>
               <div className="text-sm font-tech font-bold text-zinc-700">CHAMBER_088.B</div>
            </div>
         </div>

         {/* 3. BOND CONTROLS (RIGHT) */}
         <div className="lg:col-span-3 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-[48px] p-8 h-1/2 backdrop-blur-2xl flex flex-col justify-between shadow-xl">
               <div className="flex items-center gap-3">
                  <Sliders className="w-5 h-5 text-indigo-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Bond_Calibration</span>
               </div>

               <div className="space-y-6">
                  <div className="space-y-3">
                     <div className="flex justify-between text-[8px] font-bold text-zinc-500 uppercase tracking-widest">
                        <span>Magnetic_Tension</span>
                        <span className="text-indigo-500">{(bondStrength * 100).toFixed(0)}%</span>
                     </div>
                     <input 
                       type="range" min="0.1" max="1" step="0.01" value={bondStrength}
                       onChange={e => setBondStrength(parseFloat(e.target.value))}
                       className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
                     />
                  </div>
                  <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-600 italic">
                     <Zap className="w-3 h-3" /> Lattice_Alignment: COHERENT
                  </div>
               </div>
            </div>

            <button 
              onMouseDown={() => setIsForging(true)}
              onMouseUp={() => setIsForging(false)}
              onMouseLeave={() => setIsForging(false)}
              className="w-full h-1/2 bg-emerald-600 border-4 border-emerald-400 text-white rounded-[48px] flex flex-col items-center justify-center gap-4 shadow-2xl transition-all hover:bg-emerald-500 active:scale-95 group"
            >
               <RefreshCw className={`w-12 h-12 transition-all duration-1000 ${isForging ? 'animate-spin' : 'group-hover:rotate-90'}`} />
               <div className="text-center">
                  <div className="text-xl font-tech font-bold uppercase tracking-widest leading-none">Assemble</div>
                  <div className="text-[8px] font-mono opacity-60 uppercase tracking-widest mt-2">Hold_to_Fuse_Matter</div>
               </div>
            </button>
         </div>
      </div>
    </div>
  );
};
