
import React, { useState, useEffect } from 'react';
import { Snowflake, Wind, ThermometerSnowflake, ShieldAlert, Zap, Radio, Sliders, Power, Gauge } from 'lucide-react';
import { playUISound } from '../wooden/components/AudioService';

export const CryoContainmentVault: React.FC = () => {
  const [state, setState] = useState<'STABLE' | 'FROST' | 'LEAK'>('STABLE');
  const [frostLevel, setFrostLevel] = useState(0.4);
  const [pressure, setPressure] = useState(0.85);
  const [temp, setTemp] = useState(-180);

  useEffect(() => {
    const timer = setInterval(() => {
      if (state === 'STABLE') setTemp(prev => Math.max(-180, prev - 0.5));
      if (state === 'FROST') setTemp(prev => Math.max(-210, prev - 1));
      if (state === 'LEAK') setTemp(prev => Math.min(-150, prev + 2));
    }, 1000);
    return () => clearInterval(timer);
  }, [state]);

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-sky-500/50 animate-pulse" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-sky-500/60">Cryo_Containment_Workbench_v5.2</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Nitrogen_Cooling: ACTIVE</div>
            <div className="w-12 h-1 bg-sky-500/20 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-sky-400">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Крио_Протокол</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Интенсивность_Инея</span>
                     <span className="text-sky-400">{(frostLevel * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.05" value={frostLevel} onChange={e => setFrostLevel(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-sky-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Давление_В_Камере</span>
                     <span className="text-sky-400">{(pressure * 10).toFixed(2)}_ATM</span>
                  </div>
                  <input type="range" min="0.1" max="1.5" step="0.01" value={pressure} onChange={e => setPressure(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-sky-500" />
               </div>

               <div className="grid grid-cols-3 gap-2">
                  {(['STABLE', 'FROST', 'LEAK'] as const).map((s) => (
                    <button key={s} onClick={() => { setState(s); playUISound('click'); }} className={`py-2 rounded-xl text-[7px] font-black uppercase transition-all ${state === s ? 'bg-sky-600 text-white shadow-lg' : 'bg-white/5 text-zinc-500 hover:bg-white/10'}`}>
                      {s}
                    </button>
                  ))}
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-sky-500">
                  <Gauge className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase">Thermal_Delta</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{temp}°C</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div className="flex-1 bg-[#020508] relative overflow-hidden flex items-center justify-center p-12 group shadow-inner">
            {/* Environmental Fog */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${state === 'FROST' ? 'opacity-100' : 'opacity-20'}`}>
               <div className="absolute inset-0 bg-sky-500/5 backdrop-blur-[2px]" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_80%)]" />
            </div>

            {/* Frost Particles SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
               <filter id="cryo-noise">
                  <feTurbulence type="fractalNoise" baseFrequency={0.7} numOctaves="4" />
                  <feDisplacementMap in="SourceGraphic" scale={frostLevel * 50} />
               </filter>
               <rect width="100%" height="100%" filter="url(#cryo-noise)" className="fill-sky-400" />
            </svg>

            {/* Main Vault Cylinder */}
            <div 
               className={`relative w-80 h-96 transition-all duration-1000 border-2 rounded-[64px] flex flex-col items-center justify-center p-12 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]
                  ${state === 'STABLE' ? 'bg-white/5 border-white/10' : ''}
                  ${state === 'FROST' ? 'bg-white/10 border-sky-400/40 backdrop-blur-3xl' : ''}
                  ${state === 'LEAK' ? 'bg-rose-950/20 border-rose-500/40 animate-pulse' : ''}
               `}
               style={{ 
                 transform: `scale(${1 - pressure * 0.05}) rotateX(10deg)`,
                 boxShadow: `inset 0 0 ${frostLevel * 100}px rgba(56, 189, 248, 0.2)`
               }}
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
               <Snowflake className={`w-24 h-24 transition-all duration-1000 ${state === 'FROST' ? 'text-sky-300 rotate-180 scale-125' : 'text-sky-500/30'}`} />
               
               <div className="mt-12 text-center">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-2">Matter_ID: 0xCRYO</div>
                  <div className="text-4xl font-tech font-bold text-white uppercase tracking-widest">{state}</div>
               </div>

               {/* Overheat / Leak Warning */}
               {state === 'LEAK' && (
                 <div className="absolute top-10 flex items-center gap-2 px-4 py-1 bg-rose-600 rounded-full animate-bounce">
                    <ShieldAlert className="w-3 h-3 text-white" />
                    <span className="text-[8px] font-black text-white uppercase">Critical_Leak</span>
                 </div>
               )}
            </div>

            {/* Static HUD Callouts */}
            <div className="absolute bottom-12 right-12 text-right opacity-30">
               <div className="text-[9px] font-mono text-sky-500 uppercase tracking-widest font-bold">Cryo_Buffer: ACTIVE</div>
               <div className="text-[8px] font-mono text-zinc-600 uppercase">Phase_Calibration_0x88.F</div>
            </div>
         </div>
      </div>
    </div>
  );
};
