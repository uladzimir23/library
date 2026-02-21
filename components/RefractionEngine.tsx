
import React, { useState, useContext, useRef } from 'react';
import { Lightbulb, Zap, Move, Info, Layers, Aperture, Sliders, Activity, Gauge, Box } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

type MaterialType = 'AIR' | 'WATER' | 'GLASS' | 'DIAMOND';

export const RefractionEngine: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [density, setDensity] = useState(0.5);
  const [lightPos, setLightPos] = useState(50);
  const [material, setMaterial] = useState<MaterialType>('GLASS');
  const [dispersion, setDispersion] = useState(0.2);

  const materials = {
    AIR: { ior: 1.00, blur: 0, color: 'text-text-muted' },
    WATER: { ior: 1.33, blur: 20, color: 'text-sky-500' },
    GLASS: { ior: 1.52, blur: 40, color: 'text-indigo-500' },
    DIAMOND: { ior: 2.42, blur: 80, color: 'text-rose-500' }
  };

  const calculatePath = () => {
    const currentIOR = materials[material].ior;
    const shift = (currentIOR - 1) * 80 * density;
    return `M 0,${lightPos} L 200,${lightPos} L 300,${lightPos + shift} L 500,${lightPos + shift}`;
  };

  return (
    <div className="relative rounded-[48px] border overflow-hidden glass-panel p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/5 bg-panel/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500/50" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-text-muted opacity-60">Refractive_Index_Workbench_v4.2</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-text-muted uppercase tracking-widest">Physics_Engine: SNELLS_LAW</div>
            <div className="w-12 h-1 bg-panel border border-black/5 dark:border-white/10 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-black/5 dark:border-white/5 p-8 flex flex-col gap-10 bg-panel/30">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-indigo-500">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-main">Оптические_Параметры</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-text-muted">
                     <span>Плотность_Среды</span>
                     <span className="text-indigo-500">{(density * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.01" value={density} onChange={e => setDensity(parseFloat(e.target.value))} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500 text-indigo-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-text-muted">
                     <span>Дисперсия_Луча</span>
                     <span className="text-indigo-500">{(dispersion * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.05" value={dispersion} onChange={e => setDispersion(parseFloat(e.target.value))} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500 text-indigo-500" />
               </div>

               <div className="grid grid-cols-2 gap-2">
                  {(['AIR', 'WATER', 'GLASS', 'DIAMOND'] as MaterialType[]).map((m) => (
                    <button key={m} onClick={() => { setMaterial(m); playUISound('click'); }} className={`py-2 rounded-xl text-[8px] font-black uppercase transition-all border ${material === m ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-panel border-transparent text-text-muted hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}>
                      {m}
                    </button>
                  ))}
               </div>
            </div>

            <div className="mt-auto p-6 bg-panel rounded-[32px] border border-black/5 dark:border-white/5 space-y-4 shadow-inner">
               <div className="flex items-center gap-2 text-indigo-500">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">IOR_Constant</span>
               </div>
               <div className="text-2xl font-tech font-bold text-text-main uppercase">{materials[material].ior.toFixed(2)}_n</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div className="flex-1 bg-surface relative overflow-hidden flex items-center justify-center p-12 group shadow-inner">
            {/* Technical Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Light Ray Simulation Area */}
            <div className="relative w-full h-full flex items-center">
              <svg className="w-full h-full overflow-visible pointer-events-none drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                 <path 
                    d={calculatePath()} 
                    fill="none" 
                    stroke="#6366f1" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-out"
                    style={{ strokeDasharray: '10, 5' }}
                 />
                 
                 {/* Dispersion Rays (Visible when dispersion > 0) */}
                 {dispersion > 0.1 && (
                   <>
                     <path d={calculatePath()} fill="none" stroke="#f43f5e" strokeWidth="1" className="opacity-30 transition-transform duration-700" style={{ transform: `translateY(${dispersion * 10}px)` }} />
                     <path d={calculatePath()} fill="none" stroke="#2dd4bf" strokeWidth="1" className="opacity-30 transition-transform duration-700" style={{ transform: `translateY(${-dispersion * 10}px)` }} />
                   </>
                 )}

                 <circle r="6" fill="var(--text-main)" className="animate-pulse shadow-xl">
                    <animateMotion dur="2s" repeatCount="indefinite" path={calculatePath()} />
                 </circle>
              </svg>

              {/* Matter Slab Visualization */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-[120px] h-[350px] rounded-[48px] border-2 transition-all duration-700 overflow-hidden shadow-2xl"
                style={{ 
                   borderColor: `var(--glass-border)`,
                   backgroundColor: `var(--glass-bg)`,
                   backdropFilter: `blur(${materials[material].blur * density}px)`
                }}
              >
                 <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10 opacity-30" />
                 <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[8px] font-mono text-text-muted font-black uppercase tracking-[0.6em] rotate-90 whitespace-nowrap">
                   {material}_SUBSTRATE
                 </div>
              </div>

              {/* Light Source Indicator */}
              <div 
                onMouseDown={e => playUISound('click')}
                className="absolute left-12 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-300 cursor-ns-resize hover:scale-110 active:scale-95"
                style={{ top: `calc(${lightPos}px + 50%)`, marginTop: '-28px' }}
              >
                <input 
                  type="range" min="-150" max="150" step="1" value={lightPos} onChange={e => setLightPos(parseInt(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ns-resize"
                />
                <Aperture className="w-8 h-8 text-white animate-spin-slow" />
              </div>
            </div>

            <div className="absolute bottom-12 right-12 text-right">
               <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-bold mb-1">Optical_Stability: NOMINAL</div>
               <div className="text-[8px] font-mono text-text-muted uppercase">Phase_0x88.Calibration</div>
            </div>
         </div>
      </div>
    </div>
  );
};
