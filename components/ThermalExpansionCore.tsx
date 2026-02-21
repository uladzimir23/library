
import React, { useState, useContext, useEffect } from 'react';
import { ThermometerSun, ThermometerSnowflake, Zap, Activity, Target, Sliders, Maximize2, ShieldAlert, Gauge } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const ThermalExpansionCore: React.FC = () => {
  const [temp, setTemp] = useState(25);
  const [expansionCoeff, setExpansionCoeff] = useState(0.4);
  const [agitation, setAgitation] = useState(0.2);

  // Динамический объем на основе температуры и коэффициента
  const volume = 1 + (temp / 500) * expansionCoeff;
  const isOverheat = temp > 400;

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500/50" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Molecular_Expansion_Workbench_v5.2</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Physics_Engine: STABLE</div>
            <div className="w-12 h-1 bg-white/5 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-orange-400">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Молекулярный_Сдвиг</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Температура (K)</span>
                     <span className="text-orange-400">{temp + 273}K</span>
                  </div>
                  <input type="range" min="-150" max="600" step="5" value={temp} onChange={e => setTemp(parseInt(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Коэф_Расширения</span>
                     <span className="text-orange-400">{(expansionCoeff * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1.5" step="0.05" value={expansionCoeff} onChange={e => setExpansionCoeff(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Возбуждение (Agitation)</span>
                     <span className="text-orange-400">{(agitation * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.05" value={agitation} onChange={e => setAgitation(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-orange-500">
                  <Gauge className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">Volume_Index</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{volume.toFixed(3)}_M3</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div className="flex-1 bg-[#080502] relative overflow-hidden flex items-center justify-center p-12 group shadow-inner">
            {/* Heat Atmosphere */}
            <div 
              className="absolute inset-0 transition-all duration-1000"
              style={{ 
                background: `radial-gradient(circle at center, ${temp > 0 ? 'rgba(249, 115, 22, ' + (temp/1200) + ')' : 'rgba(56, 189, 248, ' + Math.abs(temp/600) + ')'} 0%, transparent 70%)`,
                filter: `blur(${40 + Math.abs(temp)/10}px)`
              }}
            />
            
            {/* Expanding Core */}
            <div 
              className={`relative transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col items-center justify-center p-12 border-2 shadow-2xl overflow-hidden
                ${temp > 0 ? 'border-orange-500/40 bg-orange-500/5' : 'border-sky-500/40 bg-sky-500/5'}
              `}
              style={{ 
                width: `${Math.max(100, volume * 250)}px`, 
                height: `${Math.max(100, volume * 250)}px`, 
                borderRadius: `${Math.max(8, 48 + (temp/20))}px`,
                transform: `scale(${1 + Math.sin(Date.now()/500)*0.01 * agitation * 5})`,
                boxShadow: temp > 300 ? `0 0 ${temp/5}px rgba(249, 115, 22, 0.3)` : 'none'
              }}
            >
               <div className={`transition-all duration-700 ${temp > 300 ? 'animate-pulse scale-125' : 'scale-100'}`}>
                  {temp < 0 ? <ThermometerSnowflake className="w-12 h-12 text-sky-400" /> : <ThermometerSun className={`w-12 h-12 ${temp > 300 ? 'text-orange-500' : 'text-orange-400/40'}`} />}
               </div>
               
               <div className="mt-6 text-center opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="text-[8px] font-mono text-white uppercase tracking-widest mb-1">State_Entropy</div>
                  <div className="text-xl font-tech font-bold text-white uppercase">{(temp + 273.15).toFixed(1)}K</div>
               </div>

               {isOverheat && (
                 <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-rose-600 rounded-full animate-bounce">
                    <ShieldAlert className="w-3 h-3 text-white" />
                    <span className="text-[7px] font-black text-white uppercase">Overload</span>
                 </div>
               )}
            </div>

            {/* Molecular Particles (Floating nodes) */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-1000
                  ${temp > 0 ? 'bg-orange-500' : 'bg-sky-400'}`}
                style={{ 
                  left: `${50 + Math.cos(i * 45) * 40 * volume}%`, 
                  top: `${50 + Math.sin(i * 45) * 40 * volume}%`,
                  opacity: 0.1 + agitation * 0.5,
                  transform: `scale(${1 + agitation})`
                }}
              />
            ))}

            <div className="absolute bottom-12 right-12 text-right">
               <div className="text-[10px] font-mono text-orange-500 uppercase tracking-widest font-bold mb-1">Matter_State: {temp > 400 ? 'SUPERHEAT' : temp < 0 ? 'CRYOGENIC' : 'STABLE'}</div>
               <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Calibration_Matrix_0x14</div>
            </div>
         </div>
      </div>
    </div>
  );
};
