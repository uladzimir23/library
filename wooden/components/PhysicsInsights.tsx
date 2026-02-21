
import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Activity, Zap, RefreshCw, Gauge, Info, ChevronRight } from 'lucide-react';
import { playUISound } from './AudioService';

export const PhysicsInsights: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [time, setTime] = useState(0);
  const [activePreset, setActivePreset] = useState<'brittle' | 'standard' | 'fluid'>('standard');

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 0.1), 20);
    return () => clearInterval(interval);
  }, []);

  const presets = {
    brittle: { stiffness: 0.3, damping: 0.6, label: 'Хрупкая (Brittle)', color: '#f43f5e' },
    standard: { stiffness: 0.15, damping: 0.8, label: 'Баланс 50/50 (Forge)', color: '#6366f1' },
    fluid: { stiffness: 0.05, damping: 0.95, label: 'Жидкая (Fluid)', color: '#10b981' }
  };

  const getWavePath = (p: typeof presets.standard) => {
    let points = [];
    for (let x = 0; x <= 400; x += 2) {
      // Имитация затухающей синусоиды (Underdamped oscillator)
      const t = x / 50;
      const decay = Math.exp(-p.damping * t * 2);
      const y = 100 + Math.sin(t * p.stiffness * 50 + time) * 60 * decay;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="scroll-mt-32 py-24 space-y-24">
      <div className="flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-4">
           <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.6em]">
              Physics_Laboratory_Insights
           </span>
           <h2 className="text-7xl font-tech font-bold uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
              Инсайты <br /><span className="text-indigo-500">Калибровки.</span>
           </h2>
        </div>
        <div className="p-8 bg-zinc-900 border border-white/5 rounded-[40px] shadow-2xl flex items-center gap-10">
           <div className="space-y-1">
              <div className="text-[8px] font-mono text-zinc-500 uppercase">Equilibrium_State</div>
              <div className="text-4xl font-tech font-bold text-emerald-500">50 / 50</div>
           </div>
           <Gauge className="w-10 h-10 text-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[700px] p-1 rounded-[64px] border ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-zinc-100 border-black/5 shadow-inner'}`}>
         
         {/* PRESET CONTROLS */}
         <div className={`lg:col-span-4 p-10 border-r flex flex-col gap-8 ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-black/5'}`}>
            <div className="flex items-center gap-3 text-indigo-500">
               <Info className="w-5 h-5" />
               <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-zinc-500 uppercase">Calibration_Guide</span>
            </div>

            <div className="space-y-4 flex-1">
               {(Object.keys(presets) as Array<keyof typeof presets>).map(key => (
                 <button 
                   key={key}
                   onClick={() => { setActivePreset(key); playUISound('click'); }}
                   className={`w-full p-6 rounded-3xl border transition-all duration-500 flex flex-col gap-4 group
                     ${activePreset === key ? 'bg-zinc-900 border-white/10 text-white shadow-xl scale-[1.02]' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}
                   `}
                 >
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-black uppercase tracking-widest">{presets[key].label}</span>
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: presets[key].color }} />
                    </div>
                    <div className="flex gap-6 opacity-40 group-hover:opacity-100 transition-opacity">
                       <div className="text-[9px] font-mono uppercase">Stiff: {presets[key].stiffness}</div>
                       <div className="text-[9px] font-mono uppercase">Damp: {presets[key].damping}</div>
                    </div>
                 </button>
               ))}
            </div>

            <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
               <p className="text-[9px] text-zinc-500 leading-relaxed font-mono uppercase italic">
                 "Our golden 50/50 standard represents the perfect balance between reactive impulse and kinetic rest."
               </p>
            </div>
         </div>

         {/* OSCILLOSCOPE VIEWPORT */}
         <div className="lg:col-span-8 bg-black relative overflow-hidden flex items-center justify-center shadow-inner group/crt">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(99,102,241,0.02)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none z-30" />
            
            <div className="relative w-full h-full flex items-center justify-center p-20">
               <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  {/* Grid Lines */}
                  <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="200" y1="0" x2="200" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                  <path 
                    d={getWavePath(presets[activePreset])} 
                    fill="none" 
                    stroke={presets[activePreset].color} 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    className="transition-all duration-300 ease-in-out"
                  />
                  
                  {/* Traveling Pulse Dot */}
                  <circle r="4" fill="#fff" filter="blur(2px)">
                    <animateMotion dur="2s" repeatCount="indefinite" path={getWavePath(presets[activePreset])} />
                  </circle>
               </svg>
            </div>

            <div className="absolute top-12 left-12 flex flex-col gap-2">
               <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                  <Activity className="w-4 h-4 text-indigo-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">Wave_Buffer: {activePreset.toUpperCase()}</span>
               </div>
            </div>

            <div className="absolute bottom-12 right-12 text-right">
               <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-black mb-1">Physics_Engine: CALIBRATED_0x88</div>
               <div className="text-[8px] font-mono text-zinc-700 uppercase">Snells_Law_V4_Integrated</div>
            </div>
         </div>
      </div>
    </div>
  );
};
