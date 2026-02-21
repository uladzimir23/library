
import React, { useState } from 'react';
import { Target, Zap, Layers, Cpu, Box, CheckCircle2 } from 'lucide-react';
import { playUISound } from './AudioService';

export const GenesisTimeline: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [hovered, setHovered] = useState<number | null>(null);

  const steps = [
    { date: 'Step_01', title: 'Neural_Seeding', desc: 'Первичный посев нейронных связей в вакуумную среду.', icon: Target },
    { date: 'Step_02', title: 'Mass_Injection', desc: 'Наполнение структуры физической массой и инерцией.', icon: Layers },
    { date: 'Step_03', title: 'Optic_Calibration', desc: 'Настройка индексов преломления и хроматики.', icon: Zap },
    { date: 'Step_04', title: 'Cohesion_Final', desc: 'Стабилизация когезии и выход в рабочую фазу.', icon: CheckCircle2 }
  ];

  return (
    <div className="scroll-mt-32">
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-4">
           <span className="text-[9px] font-mono opacity-30 uppercase tracking-[0.6em] block">Development_Roadmap_v2</span>
           <h2 className="text-7xl font-tech font-bold uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
              Генезис <br /><span className="text-indigo-500">Системы.</span>
           </h2>
        </div>
      </div>

      <div className="relative">
         {/* Vertical Connector Line */}
         <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />

         <div className="space-y-32">
            {steps.map((step, i) => (
              <div 
                key={i}
                onMouseEnter={() => { setHovered(i); playUISound('hover'); }}
                onMouseLeave={() => setHovered(null)}
                className={`flex items-center gap-20 transition-all duration-700 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-right'}`}
              >
                 <div className={`flex-1 space-y-4 transition-all duration-700 ${hovered === i ? 'scale-105' : 'opacity-40 blur-[1px]'}`}>
                    <div className="text-[10px] font-mono text-indigo-500 font-black uppercase tracking-widest">{step.date}</div>
                    <h3 className="text-4xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tight">{step.title}</h3>
                    <p className={`text-lg font-light leading-relaxed max-w-sm ${i % 2 !== 0 ? 'ml-auto' : ''}`}>{step.desc}</p>
                 </div>

                 <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-700 border-2
                      ${hovered === i ? 'bg-indigo-600 border-white text-white shadow-[0_0_50px_rgba(99,102,241,0.5)] scale-125 rotate-12' : (isDark ? 'bg-zinc-900 border-white/10 text-zinc-700' : 'bg-white border-black/5 text-zinc-300')}
                    `}>
                       <step.icon className="w-8 h-8" />
                    </div>
                 </div>

                 <div className="flex-1 hidden md:block" />
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
