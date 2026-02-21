import React from 'react';
import { Cpu, Shield, Zap, Globe, MousePointer2 } from 'lucide-react';

export const ComponentCatalog: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { icon: Cpu, label: 'Compute_Node', val: 'Active', color: 'indigo' },
        { icon: Shield, label: 'Security_Bay', val: 'Locked', color: 'emerald' },
        { icon: Zap, label: 'Power_Grid', val: '98%', color: 'amber' },
        { icon: Globe, label: 'Edge_Link', val: 'AMS_01', color: 'sky' }
      ].map((item, i) => (
        <div key={i} className="group bg-white/40 dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 p-8 rounded-[40px] hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-2">
           <div className={`w-12 h-12 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-500 mb-12 group-hover:scale-110 transition-transform`}>
              <item.icon className="w-6 h-6" />
           </div>
           <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{item.label}</div>
              <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">{item.val}</div>
           </div>
           <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center">
              <span className="text-[8px] font-mono text-zinc-500">0x8892.OBJ</span>
              <MousePointer2 className="w-3 h-3 text-indigo-500" />
           </div>
        </div>
      ))}
    </div>
  );
};
