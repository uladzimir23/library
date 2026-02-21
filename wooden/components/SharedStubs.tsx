
import React from 'react';
import { Box, Layers, Zap, Activity, Cpu, Shield, Search, Grid3X3, Radio, Database } from 'lucide-react';

const ICONS = [Box, Layers, Zap, Activity, Cpu, Shield, Search, Grid3X3, Radio, Database];

interface BlueprintStubProps {
  title: string;
  desc: string;
  index: number;
}

export const BlueprintStub: React.FC<BlueprintStubProps> = ({ title, desc, index }) => {
  const Icon = ICONS[index % ICONS.length];
  
  return (
    <div className="relative group p-12 rounded-[56px] border border-black/5 dark:border-white/5 bg-white/[0.02] dark:bg-black/20 overflow-hidden transition-all duration-700 hover:border-indigo-500/30 hover:translate-y-[-8px]">
       {/* Background Grid inside stub */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
       
       {/* Scanner Animation */}
       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden pointer-events-none">
          <div className="w-full h-[1px] bg-indigo-500/40 shadow-[0_0_15px_#6366f1] animate-[scan_3s_linear_infinite]" />
       </div>

       <div className="relative z-10 space-y-8">
          <div className="flex justify-between items-start">
             <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-500">
                <Icon className="w-6 h-6" />
             </div>
             <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest font-black">
                Phase: Blueprint_v{index + 1}
             </div>
          </div>

          <div className="space-y-3">
             <h4 className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest leading-none">{title}</h4>
             <p className="text-sm font-light text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
          </div>

          <div className="pt-8 border-t border-black/5 dark:border-white/5 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity duration-700">
             <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-indigo-500" />
                <span className="text-[7px] font-mono uppercase">LOD_Mapping: PENDING</span>
             </div>
             <span className="text-[7px] font-mono">HASH: 0x{Math.random().toString(16).slice(2, 6).toUpperCase()}</span>
          </div>
       </div>
       
       <style>{`
          @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
       `}</style>
    </div>
  );
};

export const SectionStubGroup: React.FC<{ category: string, count?: number }> = ({ category, count = 4 }) => {
  return (
    <div className="space-y-16">
       <div className="flex items-center gap-4 border-b border-black/5 dark:border-white/5 pb-8">
          <Cpu className="w-6 h-6 text-zinc-500" />
          <h3 className="text-3xl font-tech font-bold uppercase text-zinc-400 tracking-widest">{category}_Architectural_Nodes</h3>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: count }).map((_, i) => (
             <BlueprintStub 
               key={i}
               index={i}
               title={`Module_Node_0x${i}${category[0]}`}
               desc={`Архитектурный чертеж подсистемы ${category}. Данный узел находится в фазе калибровки нейронных весов.`}
             />
          ))}
       </div>
    </div>
  );
};
