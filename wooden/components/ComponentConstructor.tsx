
import React, { useState } from 'react';
import { Layers, Box, Maximize, Zap, Play, Layout } from 'lucide-react';
import { playUISound } from './AudioService';

export const ComponentConstructor: React.FC<{ theme: string }> = ({ theme }) => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const isDark = theme === 'dark';

  return (
    <div className="scroll-mt-32">
      <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-4">
           <span className="text-[9px] font-mono opacity-30 uppercase tracking-[0.6em] block">Visual_Constructor_v1</span>
           <h2 className="text-7xl font-tech font-bold uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
              Сборка <br /><span className="text-indigo-500">Компонента.</span>
           </h2>
        </div>
        <div className="p-8 bg-black/40 border border-white/5 rounded-[40px] flex items-center gap-8">
           <div className="space-y-2">
              <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">SDK_Status</div>
              <div className="text-2xl font-tech font-bold text-white tracking-widest">v2.4.0_Stable</div>
           </div>
           <Layout className="w-8 h-8 text-indigo-500 animate-pulse" />
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 rounded-[64px] border ${isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/5 shadow-2xl'}`}>
         <div className="space-y-8">
            <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-lg">
               Используйте наш визуальный конструктор для настройки свойств React-компонентов. Изменяйте индекс преломления и массу в реальном времени.
            </p>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: 'Surface', icon: Layers },
                 { label: 'Matter', icon: Box },
                 { label: 'Kinetics', icon: Zap },
                 { label: 'Geometry', icon: Maximize }
               ].map((item, i) => (
                 <button 
                   key={i}
                   onMouseEnter={() => playUISound('hover')}
                   onClick={() => { setActiveLayer(i); playUISound('click'); }}
                   className={`p-6 rounded-3xl border flex items-center gap-4 transition-all ${activeLayer === i ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}`}
                 >
                    <item.icon className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                 </button>
               ))}
            </div>
            <button className="w-full py-8 bg-white/5 border border-white/10 rounded-3xl text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] hover:text-white transition-colors">
               Copy_React_Code_Snippet
            </button>
         </div>

         <div className={`relative h-[400px] rounded-[48px] overflow-hidden flex items-center justify-center ${isDark ? 'bg-zinc-950' : 'bg-zinc-100'}`}>
            <div className={`w-64 h-64 bg-indigo-500/10 border-2 border-indigo-500/30 rounded-[40px] flex items-center justify-center transition-all duration-700 ${activeLayer !== null ? 'scale-110 shadow-[0_0_80px_rgba(99,102,241,0.2)]' : 'opacity-40'}`}>
               <Box className={`w-16 h-16 text-indigo-500 transition-all ${activeLayer === 1 ? 'animate-bounce' : ''}`} />
               {activeLayer === 0 && <div className="absolute inset-8 border border-white/40 rounded-[24px] animate-pulse" />}
            </div>
         </div>
      </div>
    </div>
  );
};
