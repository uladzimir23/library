
import React, { useState, useContext, useEffect } from 'react';
import { Zap, Activity, Radio, Target, Move, Sliders, ChevronRight, Wind } from 'lucide-react';
import { LanguageContext } from '../App';

type ReactorState = 'IDLE' | 'ACTIVE' | 'SURGE';

export const KineticReactorDrive: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [state, setState] = useState<ReactorState>('IDLE');
  const [power, setPower] = useState(12);

  useEffect(() => {
    let interval: any;
    if (state === 'ACTIVE') {
      interval = setInterval(() => setPower(prev => (prev > 60 ? 40 : prev + 1)), 50);
    } else if (state === 'SURGE') {
      interval = setInterval(() => setPower(prev => (prev > 95 ? 85 : prev + 2)), 30);
    } else {
      setPower(12);
    }
    return () => clearInterval(interval);
  }, [state]);

  const config = {
    IDLE: { color: 'emerald', speed: '4s', scale: 1 },
    ACTIVE: { color: 'indigo', speed: '1s', scale: 1.1 },
    SURGE: { color: 'rose', speed: '0.4s', scale: 1.25 }
  };

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 text-right">
         <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Power_Lattice_v14
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Кинетический <br /><span className="text-emerald-500">Реактор.</span>
         </h2>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-16 items-start">
         {/* 1. MAIN REACTOR (VISUAL) */}
         <div className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[80px] border border-white/5 relative overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl group">
            {/* Background Surge Glow */}
            <div 
              className={`absolute inset-0 transition-opacity duration-1000 ${state === 'SURGE' ? 'opacity-20' : 'opacity-5'}`}
              style={{ background: `radial-gradient(circle at center, ${state === 'SURGE' ? '#f43f5e' : '#10b981'} 0%, transparent 70%)` }}
            />

            {/* The Reactor Body */}
            <div className="relative w-96 h-96 preserve-3d">
               {/* Orbital Shockwaves */}
               {[...Array(3)].map((_, i) => (
                 <div 
                   key={i}
                   className={`absolute inset-0 border-2 rounded-full transition-all duration-500 pointer-events-none
                     ${state === 'IDLE' ? 'border-white/5 scale-100' : state === 'ACTIVE' ? 'border-indigo-500/20 animate-ping' : 'border-rose-500/40 animate-pulse'}`}
                   style={{ animationDelay: `${i * 0.5}s`, transform: `scale(${1 + i * 0.3})` }}
                 />
               ))}

               {/* Central Piston Core */}
               <div 
                 className={`absolute inset-0 bg-white/5 border border-white/10 rounded-[64px] backdrop-blur-3xl shadow-2xl flex flex-col items-center justify-center transition-all duration-300
                    ${state === 'SURGE' ? 'bg-rose-500/10 border-rose-500/40' : ''}`}
                 style={{ 
                    transform: `translateZ(50px) scale(${config[state].scale})`,
                    animation: `pulse-reactor ${config[state].speed} ease-in-out infinite`
                 }}
               >
                  <div className={`w-24 h-24 rounded-3xl bg-zinc-900 border flex items-center justify-center shadow-inner transition-colors duration-700 ${state === 'SURGE' ? 'border-rose-500' : 'border-white/10'}`}>
                     <Zap className={`w-12 h-12 ${state === 'SURGE' ? 'text-rose-500 animate-bounce' : state === 'ACTIVE' ? 'text-indigo-400 animate-pulse' : 'text-emerald-500'}`} />
                  </div>
                  
                  <div className="mt-8 text-center">
                     <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-2">Reactor_Output</div>
                     <div className={`text-5xl font-tech font-bold uppercase transition-colors ${state === 'SURGE' ? 'text-rose-500' : 'text-white'}`}>
                        {power.toFixed(1)} <span className="text-sm opacity-40">GW</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* HUD Indicators */}
            <div className="absolute top-12 left-12 flex flex-col gap-4">
               <div className="flex items-center gap-3 px-6 py-2 bg-zinc-900 border border-white/10 rounded-full shadow-xl">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest">Torque: 842.1_NM</span>
               </div>
               <div className="flex items-center gap-3 px-6 py-2 bg-zinc-900 border border-white/10 rounded-full shadow-xl">
                  <Wind className="w-4 h-4 text-sky-500" />
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest">Coolant: NOMINAL</span>
               </div>
            </div>
         </div>

         {/* 2. CONTROL PANEL (LEFT) */}
         <div className="flex-1 space-y-8 h-full">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 space-y-10 shadow-xl">
               <div className="flex items-center gap-3 mb-6">
                  <Sliders className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest">Engine_Governor</span>
               </div>

               <div className="space-y-4">
                  {(['IDLE', 'ACTIVE', 'SURGE'] as ReactorState[]).map(s => (
                    <button 
                      key={s}
                      onClick={() => setState(s)}
                      className={`w-full p-6 rounded-3xl border transition-all duration-500 flex items-center justify-between group ${state === s ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl translate-x-2' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}`}
                    >
                       <div className="flex items-center gap-4">
                          <Radio className={`w-4 h-4 ${state === s ? 'text-white' : 'opacity-20'}`} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{s}_MODE</span>
                       </div>
                       <ChevronRight className={`w-4 h-4 transition-transform ${state === s ? 'translate-x-0' : '-translate-x-4 opacity-0'}`} />
                    </button>
                  ))}
               </div>

               <div className="pt-8 border-t border-white/5 space-y-6">
                  <div className="space-y-2">
                     <div className="flex justify-between text-[8px] font-mono text-zinc-500 uppercase">
                        <span>Energy_Containment</span>
                        <span className="text-emerald-500">{(100 - (power/2)).toFixed(1)}%</span>
                     </div>
                     <div className="h-1 bg-black rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${100 - (power/2)}%` }} />
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[48px] p-8 h-40 flex flex-col justify-center gap-2 backdrop-blur-2xl">
               <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Module_Serial</div>
               <div className="text-2xl font-tech font-bold text-white uppercase tracking-tighter">REACT-0x14_DRIVE</div>
            </div>
         </div>
      </div>
      <style>{`
        @keyframes pulse-reactor {
          0%, 100% { transform: translateZ(50px) scale(config[state].scale); }
          50% { transform: translateZ(80px) scale(config[state].scale + 0.05); }
        }
      `}</style>
    </div>
  );
};
