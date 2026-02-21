
import React, { useState, useEffect, useContext } from 'react';
import { Wind, Activity, Heart, Grid3X3, Layers, Sliders, Radio, Gauge } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const RespiratoryLattice: React.FC = () => {
  const [bpm, setBpm] = useState(15); // Дыханий в минуту (визуально)
  const [amplitude, setAmplitude] = useState(0.8); // Сила вдоха
  const [pulse, setPulse] = useState(0); 

  useEffect(() => {
    let start = 0;
    const animate = () => {
      start += (bpm / 600); // Расчет на основе BPM
      setPulse((Math.sin(start) + 1) / 2);
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [bpm]);

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500/50 animate-pulse" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Respiratory_Lattice_Workbench_v5.2</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Metabolic_Sync: ENABLED</div>
            <div className="w-12 h-1 bg-emerald-500/20 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-emerald-500">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Биоритмы_Сетки</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Частота (BPM)</span>
                     <span className="text-emerald-500">{bpm} BPM</span>
                  </div>
                  <input type="range" min="5" max="60" step="1" value={bpm} onChange={e => setBpm(parseInt(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Амплитуда_Вдоха</span>
                     <span className="text-emerald-500">{(amplitude * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.05" value={amplitude} onChange={e => setAmplitude(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-emerald-500">
                  <Activity className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase">Volume_Tide</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{(pulse * amplitude * 100).toFixed(1)}%_O2</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div className="flex-1 bg-[#020504] relative overflow-hidden flex items-center justify-center group shadow-inner">
            {/* Environmental Glow Sync */}
            <div 
              className="absolute inset-0 transition-all duration-1000 ease-in-out"
              style={{ 
                background: `radial-gradient(circle at center, rgba(16, 185, 129, ${pulse * 0.15}) 0%, transparent 70%)`,
                transform: `scale(${1 + pulse * 0.2})`
              }}
            />

            {/* The Breathing Layers */}
            <div className="relative w-96 h-96 flex items-center justify-center perspective-1000">
               {[...Array(6)].map((_, i) => {
                  const layerPulse = pulse * (1 - i * 0.1);
                  return (
                    <div 
                      key={i}
                      className="absolute border border-white/10 rounded-[64px] transition-all duration-700 ease-in-out flex items-center justify-center overflow-hidden"
                      style={{ 
                        width: `${260 + i * 30}px`,
                        height: `${340 + i * 30}px`,
                        transform: `translateZ(${i * -60 * amplitude}px) scale(${1 + layerPulse * 0.1 * amplitude})`,
                        opacity: 1 - i * 0.15,
                        backdropFilter: `blur(${layerPulse * 40 * amplitude}px)`,
                        backgroundColor: `rgba(255, 255, 255, ${0.01 + layerPulse * 0.05})`,
                        borderColor: `rgba(16, 185, 129, ${0.1 + layerPulse * 0.4})`
                      }}
                    >
                       {i === 0 && (
                         <div className="flex flex-col items-center gap-6">
                            <Heart className={`w-16 h-16 text-emerald-500 transition-transform duration-700 ${pulse > 0.5 ? 'scale-110' : 'scale-90'}`} />
                            <div className="text-center">
                               <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">State_Sync</div>
                               <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter">
                                  {pulse > 0.5 ? 'Exhale' : 'Inhale'}
                               </div>
                            </div>
                         </div>
                       )}
                    </div>
                  );
               })}
            </div>

            <div className="absolute top-12 left-12">
               <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900/80 border border-white/10 rounded-full">
                  <Wind className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Metabolism_Core_Active</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
