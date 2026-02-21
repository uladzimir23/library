
import React, { useState, useContext, useRef } from 'react';
import { Monitor, Cpu, Activity, Globe, Zap, Shield, Settings, Terminal, Bell, LayoutGrid, Database, ArrowUpRight, Radio, Sliders, Gauge, RefreshCw } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const CommandCenter: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [gridDensity, setGridDensity] = useState(0.6);
  const [updateSpeed, setUpdateSpeed] = useState(0.4);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500/50 animate-pulse" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">System_Command_Center_Workbench_v10.4</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Cluster_Status: AGGREGATED</div>
            <div className="w-12 h-1 bg-indigo-500/20 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[850px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-indigo-400">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Параметры_Дашборда</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Плотность_Сетки</span>
                     <span className="text-indigo-400">{(gridDensity * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.05" value={gridDensity} onChange={e => setGridDensity(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Скор_Обновления</span>
                     <span className="text-indigo-400">{(updateSpeed * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.05" value={updateSpeed} onChange={e => setUpdateSpeed(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-indigo-500">
                  <Gauge className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase">Throughput_Index</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{(updateSpeed * 12.4).toFixed(2)}_GB/S</div>
            </div>
         </div>

         {/* VIEWPORT (Dashboard) */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="flex-1 bg-zinc-950 relative overflow-hidden flex items-center justify-center p-8 group shadow-inner"
         >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: `${80 * (1.1 - gridDensity)}px ${80 * (1.1 - gridDensity)}px` }} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full h-full relative z-10">
               {/* Main Monitor Module */}
               <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-[48px] p-10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between group/monitor hover:bg-white/10 transition-all duration-500">
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg">
                           <Monitor className="w-6 h-6 text-white" />
                        </div>
                        <div>
                           <h3 className="text-xl font-tech font-bold text-white uppercase tracking-widest">Main_Display_01</h3>
                           <div className="text-[8px] font-mono text-indigo-400 uppercase">Status: AGGREGATED</div>
                        </div>
                     </div>
                     <ArrowUpRight className="text-zinc-600 w-6 h-6 group-hover/monitor:text-indigo-400 transition-colors" />
                  </div>
                  
                  <div className="flex-1 my-10 flex gap-1.5 items-end px-4">
                     {[...Array(24)].map((_, i) => (
                       <div 
                         key={i} 
                         className="flex-1 bg-indigo-500/20 rounded-full transition-all duration-500 hover:bg-indigo-500"
                         style={{ height: `${Math.random() * 80 + 20}%`, transitionDelay: `${i * (0.1 / updateSpeed)}s` }} 
                       />
                     ))}
                  </div>

                  <div className="flex justify-between items-center pt-8 border-t border-white/5">
                     <div className="flex gap-8">
                        <div>
                           <div className="text-[9px] font-mono text-zinc-500 uppercase mb-1">State_Cohesion</div>
                           <div className="text-sm font-bold text-emerald-500">STABLE</div>
                        </div>
                        <div>
                           <div className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Sync_Rate</div>
                           <div className="text-sm font-bold text-white">99.8%</div>
                        </div>
                     </div>
                     <Radio className="w-5 h-5 text-indigo-500 animate-pulse" />
                  </div>
               </div>

               {/* Metrics Module */}
               <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[48px] p-8 flex flex-col justify-between shadow-2xl hover:bg-emerald-500/20 transition-all duration-500">
                  <Activity className="w-10 h-10 text-emerald-500 mb-6" />
                  <div>
                     <h4 className="text-2xl font-tech font-bold text-white uppercase mb-2 leading-none">Telemetry</h4>
                     <p className="text-[9px] text-zinc-400 leading-relaxed uppercase tracking-tighter">Real-time throughput analysis established across sector 08.</p>
                  </div>
                  <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[72%] animate-pulse" />
                  </div>
               </div>

               {/* Terminal Module */}
               <div className="lg:col-span-2 bg-zinc-900/80 border border-white/5 rounded-[48px] p-8 flex flex-col shadow-2xl group/term hover:bg-black transition-all">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                     <Terminal className="w-4 h-4 text-zinc-600" />
                     <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Kernel_Logs</span>
                  </div>
                  <div className="flex-1 space-y-1 font-mono text-[8px] text-zinc-600 group-hover/term:text-indigo-400 transition-colors">
                     <p> INITIALIZING_SPATIAL_CORE... [OK]</p>
                     <p> ALLOCATING_VRAM_BUFFERS_... [OK]</p>
                     <p className="animate-pulse"> WAITING_FOR_SYNC_PROTOCOL_</p>
                  </div>
               </div>

               {/* Energy Module */}
               <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex flex-col justify-between shadow-2xl hover:border-indigo-500/40 transition-all">
                  <div className="flex justify-between items-start">
                     <Zap className="w-10 h-10 text-indigo-500" />
                     <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  </div>
                  <div>
                     <h4 className="text-2xl font-tech font-bold text-white uppercase mb-1">Energy</h4>
                     <div className="text-4xl font-tech font-bold text-indigo-500 tracking-tighter">12.1kW</div>
                  </div>
               </div>

               {/* Security Node */}
               <div className="bg-rose-500/10 border border-rose-500/20 rounded-[48px] p-8 flex items-center justify-center shadow-2xl hover:bg-rose-500/20 transition-all">
                  <div className="text-center">
                     <Shield className="w-10 h-10 text-rose-500 mx-auto mb-4" />
                     <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">System_Lock</div>
                     <div className="text-xl font-tech font-bold text-white uppercase">Active</div>
                  </div>
               </div>
            </div>

            {/* CURSOR HUD */}
            <div 
              className="absolute pointer-events-none transition-opacity duration-300 z-50"
              style={{ left: mousePos.x, top: mousePos.y }}
            >
               <div className="relative">
                  <div className="absolute top-6 left-6 whitespace-nowrap bg-zinc-900 border border-indigo-500/40 px-3 py-1.5 rounded-lg shadow-2xl">
                     <div className="text-[8px] font-mono text-indigo-400">PTR_LOC: [{mousePos.x.toFixed(0)}, {mousePos.y.toFixed(0)}]</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
