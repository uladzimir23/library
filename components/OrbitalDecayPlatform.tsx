
import React, { useState, useContext, useEffect } from 'react';
import { Orbit, Zap, Activity, Radio, ShieldAlert, Target, RefreshCw } from 'lucide-react';
import { LanguageContext } from '../App';

type DecayState = 'LOCKED' | 'DECAY' | 'RECONSTRUCT';

export const OrbitalDecayPlatform: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [state, setState] = useState<DecayState>('LOCKED');
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => prev + (state === 'LOCKED' ? 1 : state === 'DECAY' ? 4 : 0.5));
    }, 20);
    return () => clearInterval(timer);
  }, [state]);

  const satellites = [
    { id: 1, dist: 180, size: 12 },
    { id: 2, dist: 260, size: 16 },
    { id: 3, dist: 340, size: 20 }
  ];

  return (
    <div className="scroll-mt-24">
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Grav_System_v14
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Орбитальный <br /><span className="text-amber-500">Распад.</span>
         </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[750px]">
         {/* 1. STATE SELECTOR (LEFT) */}
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex flex-col gap-8 shadow-2xl h-full">
               <div className="flex items-center gap-3">
                  <Orbit className="w-5 h-5 text-amber-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Orbital_Dynamics</span>
               </div>
               
               <div className="flex-1 space-y-3">
                  {(['LOCKED', 'DECAY', 'RECONSTRUCT'] as DecayState[]).map((s) => (
                    <button 
                      key={s}
                      onClick={() => setState(s)}
                      className={`w-full p-6 rounded-3xl border transition-all duration-500 flex items-center justify-between group ${state === s ? 'bg-amber-600 border-amber-400 text-white shadow-xl scale-105' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}`}
                    >
                       <div className="text-[10px] font-bold uppercase tracking-widest">{s}</div>
                       {state === s ? <Zap className="w-4 h-4 text-white animate-pulse" /> : <div className="w-2 h-2 rounded-full bg-zinc-700" />}
                    </button>
                  ))}
               </div>

               <div className="p-6 bg-white/5 rounded-3xl space-y-4">
                  <div className="flex justify-between text-[8px] font-mono text-zinc-500 uppercase">
                     <span>Stability_Index</span>
                     <span className={state === 'DECAY' ? 'text-rose-500' : 'text-amber-500'}>
                       {state === 'LOCKED' ? '0.992' : state === 'DECAY' ? '0.124' : '0.450'}
                     </span>
                  </div>
                  <div className="h-1 bg-black rounded-full overflow-hidden">
                     <div className={`h-full transition-all duration-1000 ${state === 'DECAY' ? 'bg-rose-500' : 'bg-amber-500'}`} style={{ width: state === 'LOCKED' ? '99%' : state === 'DECAY' ? '12%' : '45%' }} />
                  </div>
               </div>
            </div>
         </div>

         {/* 2. MAIN ORBITAL VIEW (CENTER) */}
         <div className="lg:col-span-6 bg-zinc-950 rounded-[64px] border border-white/5 relative overflow-hidden flex items-center justify-center shadow-2xl group/view">
            {/* Decay FX: Radial Noise */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${state === 'DECAY' ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.05)_0%,transparent_70%)] animate-pulse" />
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            {/* Central Anchor Node */}
            <div className={`relative z-20 w-40 h-40 bg-zinc-900 border border-white/10 rounded-full flex flex-col items-center justify-center backdrop-blur-3xl shadow-2xl transition-all duration-1000 ${state === 'DECAY' ? 'scale-90 grayscale' : 'scale-100'}`}>
               <Target className={`w-12 h-12 transition-all ${state === 'LOCKED' ? 'text-amber-500' : 'text-zinc-600'}`} />
               <div className="absolute inset-[-15px] border-2 border-dashed border-amber-500/20 rounded-full animate-spin-slow" />
            </div>

            {/* Orbiting Satellites */}
            <div className="absolute inset-0 pointer-events-none">
               {satellites.map((sat, i) => (
                 <div 
                   key={sat.id}
                   className="absolute top-1/2 left-1/2 transition-all duration-1000"
                   style={{ 
                     width: `${sat.dist * 2}px`, 
                     height: `${sat.dist * 2}px`,
                     transform: `translate(-50%, -50%) rotate(${rotation * (i % 2 === 0 ? 1 : -0.7)}deg) ${state === 'DECAY' ? 'scale(1.2)' : 'scale(1)'}`,
                     opacity: state === 'DECAY' ? 0.3 : 1
                   }}
                 >
                    {/* The Rail */}
                    <div className={`absolute inset-0 border rounded-full transition-colors ${state === 'LOCKED' ? 'border-white/5' : state === 'DECAY' ? 'border-rose-500/20 border-dashed' : 'border-amber-500/20'}`} />
                    
                    {/* The Satellite */}
                    <div 
                      className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500
                        ${state === 'LOCKED' ? 'bg-amber-500 border-white shadow-[0_0_20px_rgba(245,158,11,0.5)]' : 'bg-zinc-800 border-white/20'}`}
                      style={{ width: `${sat.size}px`, height: `${sat.size}px`, transform: state === 'DECAY' ? `translate(${Math.sin(rotation/10)*20}px, ${Math.cos(rotation/10)*20}px)` : 'none' }}
                    >
                       {state === 'LOCKED' && <div className="absolute inset-[-10px] bg-amber-500/10 rounded-full animate-ping" />}
                    </div>
                 </div>
               ))}
            </div>

            {/* Status Labels HUD */}
            <div className="absolute top-10 left-10">
               <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${state === 'LOCKED' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black">Sync_Status: {state}</span>
               </div>
            </div>
         </div>

         {/* 3. DIAGNOSTICS (RIGHT) */}
         <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex-1 flex flex-col justify-between shadow-2xl relative">
               <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-amber-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Vector_Buffer</span>
               </div>
               
               <div className="space-y-6">
                  {['Velocity', 'Altitude', 'Torque'].map((l, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[8px] font-mono text-zinc-600 uppercase">
                          <span>{l}</span>
                          <span className="text-amber-500">{(Math.random() * 100).toFixed(0)}%</span>
                       </div>
                       <div className="h-1 bg-black rounded-full overflow-hidden">
                          <div className={`h-full bg-amber-500 transition-all duration-1000 ${state === 'DECAY' ? 'opacity-20' : 'opacity-100'}`} style={{ width: `${state === 'LOCKED' ? 70 + i*10 : 20 + i*10}%` }} />
                       </div>
                    </div>
                  ))}
               </div>

               <div className="pt-6 border-t border-white/5">
                  <button className="w-full py-4 bg-amber-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-amber-500 transition-all shadow-xl shadow-amber-500/20">
                     <RefreshCw className={`w-4 h-4 ${state === 'RECONSTRUCT' ? 'animate-spin' : ''}`} /> Calibrate_Lattice
                  </button>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[48px] p-8 h-40 backdrop-blur-2xl flex flex-col justify-center gap-2">
               <div className="flex items-center gap-3 text-amber-400">
                  <Radio className="w-5 h-5 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Global_Orbits</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase tracking-tighter">0xSKY_PLATFORM</div>
            </div>
         </div>
      </div>
    </div>
  );
};
