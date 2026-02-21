
import React, { useState, useEffect, useRef } from 'react';
import { Flame, ThermometerSun, Activity, Zap, Sliders, Wind, Gauge } from 'lucide-react';
import { playUISound } from '../wooden/components/AudioService';

export const ThermalTraceSurface: React.FC = () => {
  const [nodes, setNodes] = useState<number[]>(new Array(100).fill(0));
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 });
  const [coolingRate, setCoolingRate] = useState(0.02);
  const [heatPower, setHeatPower] = useState(0.35);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = setInterval(() => {
      setNodes(prev => prev.map(heat => Math.max(0, heat - coolingRate)));
    }, 50);
    return () => clearInterval(ticker);
  }, [coolingRate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });

    setNodes(prev => {
      const next = [...prev];
      const gridSize = 10;
      const mouseCol = Math.floor(x * gridSize);
      const mouseRow = Math.floor(y * gridSize);

      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          const dist = Math.sqrt(Math.pow(c - mouseCol, 2) + Math.pow(r - mouseRow, 2));
          if (dist < 2.2) {
             const idx = r * gridSize + c;
             next[idx] = Math.min(1, next[idx] + (1 - dist / 2.2) * heatPower);
          }
        }
      }
      return next;
    });
  };

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500/50" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Infrared_Trace_Workbench_v5.2</div>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-[8px] font-mono text-zinc-500 uppercase">Radiation_Type: BLACKBODY</div>
            <div className="w-12 h-1 bg-white/5 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-orange-500">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Таргетинг_Тепла</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Остывание (Decay)</span>
                     <span className="text-orange-500">{(coolingRate * 1000).toFixed(0)}u</span>
                  </div>
                  <input type="range" min="0.005" max="0.1" step="0.005" value={coolingRate} onChange={e => setCoolingRate(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Мощность_Луча</span>
                     <span className="text-orange-500">{(heatPower * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="0.8" step="0.05" value={heatPower} onChange={e => setHeatPower(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-orange-500">
                  <Gauge className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">Emission_Delta</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{(Math.max(...nodes) * 1200).toFixed(0)}K</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           onMouseLeave={() => setMousePos({ x: -1, y: -1 })}
           className="flex-1 bg-black relative overflow-hidden grid grid-cols-10 grid-rows-10 p-12 gap-3 group cursor-none"
         >
            {nodes.map((heat, i) => (
               <div 
                 key={i}
                 className="relative rounded-lg border transition-all duration-300 overflow-hidden"
                 style={{ 
                   backgroundColor: `rgba(249, 115, 22, ${heat * 0.4})`,
                   borderColor: heat > 0.2 ? `rgba(249, 115, 22, ${heat})` : 'rgba(255,255,255,0.03)',
                   boxShadow: heat > 0.6 ? `0 0 40px rgba(249, 115, 22, ${heat * 0.4})` : 'none',
                   transform: `scale(${1 + heat * 0.1})`
                 }}
               >
                  {heat > 0.3 && (
                    <div className="absolute inset-0 bg-white opacity-[0.05] animate-pulse" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="text-[6px] font-mono text-white/5 uppercase">0x{i.toString(16)}</div>
                  </div>
               </div>
            ))}

            {/* CURSOR HUD */}
            <div 
              className="absolute pointer-events-none transition-opacity duration-300"
              style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)', opacity: mousePos.x === -1 ? 0 : 1 }}
            >
               <div className="relative flex items-center justify-center">
                  <div className="w-32 h-32 border border-orange-500/20 rounded-full animate-spin-slow" />
                  <div className="absolute w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_20px_#f97316]" />
                  <div className="absolute -top-12 bg-zinc-900 border border-orange-500/40 px-3 py-1 rounded-lg text-[8px] font-mono text-orange-500 whitespace-nowrap shadow-2xl">
                     HEAT_SIG: {Math.max(...nodes).toFixed(3)}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
