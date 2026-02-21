
import React from 'react';
import { Network, Cpu, Activity } from 'lucide-react';

export const NeuralLatticeMap: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark';
  const nodes = Array.from({ length: 12 });

  return (
    <div className="scroll-mt-32">
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
         <div className="space-y-4">
            <span className="text-[9px] font-mono opacity-30 uppercase tracking-[0.6em] block">Nodal_Connectivity_v8</span>
            <h2 className="text-7xl font-tech font-bold uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
               Глобальная <br /><span className="text-indigo-500">Сеть.</span>
            </h2>
         </div>
         <div className="flex items-center gap-6 p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-[32px]">
            <div className="text-right">
               <div className="text-[8px] font-mono text-zinc-500 uppercase mb-1">Global_Sync</div>
               <div className="text-2xl font-tech font-bold text-white tracking-widest">99.8%</div>
            </div>
            <Network className="w-8 h-8 text-indigo-500 animate-pulse" />
         </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
         {nodes.map((_, i) => (
           <div 
             key={i}
             className={`p-10 rounded-[40px] border transition-all duration-500 flex flex-col items-center gap-8 group
               ${isDark ? 'bg-black/20 border-white/5 hover:border-indigo-500/30' : 'bg-white border-black/5 hover:shadow-2xl'}
             `}
           >
              <div className="relative">
                 <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                    <Cpu className="w-6 h-6" />
                 </div>
                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
              </div>
              <div className="text-center">
                 <div className="text-[7px] font-mono text-zinc-500 uppercase mb-1">Sector_0x{i*2}</div>
                 <div className="h-1 w-12 bg-indigo-500/20 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-indigo-500 animate-pulse" style={{ width: `${Math.random() * 80 + 20}%` }} />
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};
