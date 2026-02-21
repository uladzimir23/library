
import React from 'react';
import { Activity, Cpu, Shield, Globe } from 'lucide-react';

export const GlobalLoadMatrix: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark';
  const nodes = Array.from({ length: 48 });

  return (
    <div className="scroll-mt-32">
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
         <div className="space-y-4">
            <span className="text-[9px] font-mono opacity-30 uppercase tracking-[0.6em] block">Realtime_Node_Analytics</span>
            <h2 className="text-7xl font-tech font-bold uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
               Глобальный <br /><span className="text-indigo-500">Контур.</span>
            </h2>
         </div>
         <div className="p-8 bg-black/40 border border-white/5 rounded-[40px] flex items-center gap-10">
            <div className="space-y-2">
               <div className="text-[8px] font-mono text-zinc-500 uppercase">Average_Load</div>
               <div className="text-4xl font-tech font-bold text-emerald-500">0.04ms</div>
            </div>
            <div className="w-px h-12 bg-white/5" />
            <div className="space-y-2">
               <div className="text-[8px] font-mono text-zinc-500 uppercase">Uptime</div>
               <div className="text-4xl font-tech font-bold text-white">99.9%</div>
            </div>
         </div>
      </div>

      <div className={`p-12 rounded-[64px] border ${isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/5 shadow-2xl'} overflow-hidden relative`}>
         <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 relative z-10">
            {nodes.map((_, i) => {
              const load = Math.random();
              return (
                <div 
                  key={i}
                  className={`aspect-square rounded-xl border transition-all duration-1000 flex items-center justify-center group cursor-crosshair
                    ${isDark ? 'bg-white/5 border-white/5 hover:border-indigo-500/50' : 'bg-black/5 border-black/5 hover:border-indigo-500/50'}
                  `}
                >
                   <div 
                     className={`w-2 h-2 rounded-full transition-all duration-1000 ${load > 0.8 ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e] animate-pulse' : load > 0.4 ? 'bg-indigo-500' : 'bg-zinc-800'}`}
                     style={{ transform: `scale(${0.5 + load * 1.5})` }}
                   />
                   
                   {/* Tooltip Simulation */}
                   <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[7px] font-mono py-1 px-2 rounded -top-8 pointer-events-none whitespace-nowrap z-20">
                      ID: 0x{i.toString(16)} | L: {(load * 100).toFixed(1)}%
                   </div>
                </div>
              );
            })}
         </div>

         {/* Ambient Grid Lines */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
    </div>
  );
};
