
import React, { useState, useContext, useRef } from 'react';
import { Shield, Target, Zap, Activity, ThermometerSun, Sliders, Maximize2, ShieldAlert } from 'lucide-react';
import { LanguageContext } from '../App';

type ArmorState = 'PASSIVE' | 'DEFLECT' | 'THERMAL_VENT';

export const KineticArmorArray: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [state, setState] = useState<ArmorState>('PASSIVE');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (state !== 'DEFLECT') return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  const plates = Array.from({ length: 16 });

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 text-right">
         <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Tactical_Hardware_v13
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Кинетическая <br /><span className="text-rose-500">Броня.</span>
         </h2>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-16 items-start">
         {/* 1. VISUAL ARMOR GRID */}
         <div 
           onMouseMove={handleMouseMove}
           className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[80px] border border-white/5 relative overflow-hidden flex items-center justify-center p-12 perspective-2000 shadow-2xl group"
         >
            <div className="grid grid-cols-4 gap-4 w-full max-w-xl relative z-10 preserve-3d">
               {plates.map((_, i) => {
                  // Расчет угла наклона для каждой пластины в режиме DEFLECT
                  const rotateX = state === 'DEFLECT' ? mousePos.y * -45 : state === 'THERMAL_VENT' ? -60 : 0;
                  const rotateY = state === 'DEFLECT' ? mousePos.x * 45 : 0;
                  const translateZ = state === 'THERMAL_VENT' ? 40 : state === 'DEFLECT' ? 20 : 0;

                  return (
                    <div 
                      key={i}
                      className={`aspect-square transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) rounded-xl border flex items-center justify-center relative
                        ${state === 'PASSIVE' ? 'bg-white/5 border-white/10' : ''}
                        ${state === 'DEFLECT' ? 'bg-zinc-800 border-rose-500 shadow-[0_10px_30px_rgba(244,63,94,0.2)]' : ''}
                        ${state === 'THERMAL_VENT' ? 'bg-rose-600/20 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)]' : ''}
                      `}
                      style={{ 
                        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                        transitionDelay: `${(i % 4) * 50 + Math.floor(i / 4) * 50}ms`
                      }}
                    >
                       {state === 'THERMAL_VENT' && (
                         <div className="absolute inset-0 bg-rose-500 blur-xl opacity-20 animate-pulse" />
                       )}
                       <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    </div>
                  );
               })}
            </div>

            {/* Thermal Glow */}
            <div className={`absolute inset-0 bg-rose-600/10 blur-[120px] transition-opacity duration-1000 ${state === 'THERMAL_VENT' ? 'opacity-100' : 'opacity-0'}`} />

            {/* HUD Callouts */}
            <div className="absolute top-12 left-12 flex items-center gap-4 text-rose-500/60 font-mono">
               <ShieldAlert className={`w-5 h-5 ${state !== 'PASSIVE' ? 'animate-pulse' : ''}`} />
               <span className="text-[10px] uppercase tracking-[0.4em]">System_Integrity: LOCKED</span>
            </div>
         </div>

         {/* 2. CONTROL PANEL */}
         <div className="flex-1 space-y-8 h-full">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 space-y-10 shadow-xl">
               <div className="flex items-center gap-3 mb-6">
                  <Sliders className="w-5 h-5 text-rose-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest">Tactical_Interface</span>
               </div>

               <div className="space-y-4">
                  {(['PASSIVE', 'DEFLECT', 'THERMAL_VENT'] as ArmorState[]).map(s => (
                    <button 
                      key={s}
                      onClick={() => setState(s)}
                      className={`w-full p-6 rounded-3xl border transition-all duration-500 flex items-center justify-between group ${state === s ? 'bg-rose-600 border-rose-400 text-white shadow-xl translate-x-2' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}`}
                    >
                       <div className="flex items-center gap-4">
                          {s === 'PASSIVE' && <Shield className="w-4 h-4" />}
                          {s === 'DEFLECT' && <Target className="w-4 h-4 animate-pulse" />}
                          {s === 'THERMAL_VENT' && <ThermometerSun className="w-4 h-4" />}
                          <span className="text-[10px] font-bold uppercase tracking-widest">{s}</span>
                       </div>
                       <Zap className={`w-3 h-3 ${state === s ? 'text-white' : 'opacity-10'}`} />
                    </button>
                  ))}
               </div>

               <div className="pt-8 border-t border-white/5">
                  <div className="p-6 bg-white/5 rounded-3xl space-y-4">
                     <div className="flex justify-between text-[8px] font-mono text-zinc-500 uppercase">
                        <span>Shield_Efficiency</span>
                        <span className="text-rose-500">{state === 'PASSIVE' ? '42%' : state === 'DEFLECT' ? '98%' : '14%'}</span>
                     </div>
                     <div className="h-1 bg-black rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 transition-all duration-700" style={{ width: state === 'DEFLECT' ? '98%' : state === 'PASSIVE' ? '42%' : '14%' }} />
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[48px] p-8 h-40 flex items-center justify-center backdrop-blur-2xl">
               <div className="text-center">
                  <Maximize2 className="w-8 h-8 text-zinc-700 mb-2 mx-auto" />
                  <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Coord_X: {mousePos.x.toFixed(2)}</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
