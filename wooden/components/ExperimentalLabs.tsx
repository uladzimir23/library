
import React, { useState, useContext, useRef } from 'react';
import { 
  FlaskConical, Sparkles, Activity, Layers, 
  Cpu, Target, Sliders, Palette, Zap, 
  ChevronRight, ArrowRight, Gauge, Database
} from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from './AudioService';
import { BlueprintStub } from './SharedStubs';

// Импорт существующих экспериментов (если они вынесены в отдельные файлы)
// Для примера оставим логику маппинга внутри
import { EntropyFieldDisplacement } from './EntropyFieldDisplacement'; // Допустим, мы вынесли его

export const ExperimentalLabs: React.FC<{ theme: string }> = ({ theme }) => {
  const { t } = useContext(LanguageContext);
  const isDark = theme === 'dark';

  const experiments = [
    { key: 'stackDecon', id: '01' },
    { key: 'depthBuffer', id: '02' },
    { key: 'teleport', id: '03' },
    { key: 'pressure', id: '04' },
    { key: 'spectral', id: '05' },
    { key: 'vortex', id: '06' },
    { key: 'overdrive', id: '07' },
    { key: 'thermal', id: '08' },
    { key: 'mitosis', id: '09' }
  ];

  return (
    <div className="animate-in fade-in duration-1000 space-y-40 pb-40">
      {/* Introduction */}
      <div className="text-center space-y-8">
         <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-fuchsia-600/10 border border-fuchsia-600/20 text-fuchsia-500 text-[9px] font-bold uppercase tracking-[0.5em]">
            <FlaskConical className="w-3 h-3" /> Experimental_Registry_v19.4
         </div>
         <h2 className="text-8xl font-tech font-bold uppercase text-zinc-900 dark:text-white leading-none tracking-tighter">
            {t.experiments.title}<br /><span className="text-fuchsia-600">{t.experiments.titleAccent}</span>
         </h2>
         <p className="max-w-2xl mx-auto text-xl font-light opacity-60">
            {t.experiments.desc}
         </p>
      </div>

      <div className="grid grid-cols-1 gap-32">
         {experiments.map((exp, i) => {
            const data = (t.experiments as any)[exp.key];
            return (
              <section key={exp.key} className="space-y-16">
                 <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-black/5 dark:border-white/5 pb-8">
                    <div className="space-y-4">
                       <div className="text-[10px] font-mono text-fuchsia-500 font-bold uppercase tracking-[0.4em]">Exp_Sequence_{exp.id}</div>
                       <h3 className="text-5xl font-tech font-bold text-zinc-900 dark:text-white uppercase leading-none">{data.title}</h3>
                       <p className="text-xl font-light text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">{data.desc}</p>
                    </div>
                    <div className="p-6 bg-zinc-900 border border-white/10 rounded-[32px] flex items-center gap-6 shadow-xl">
                       <div className="text-right">
                          <div className="text-[8px] font-mono text-zinc-500 uppercase">Phase</div>
                          <div className="text-xl font-tech font-bold text-fuchsia-500">ALPHA_LOG</div>
                       </div>
                       <div className="w-px h-10 bg-white/10" />
                       <Gauge className="w-8 h-8 text-fuchsia-500 animate-pulse" />
                    </div>
                 </div>

                 {/* Здесь мы рендерим реальный компонент если он есть, иначе заглушку */}
                 <div className="relative">
                    {/* Плейсхолдер для будущей интеграции реальных компонентов */}
                    <BlueprintStub 
                      index={i} 
                      title={`${data.title} // Structural_View`} 
                      desc="Модуль находится в процессе глубокой калибровки. Тестирование кинетических связей и оптических искажений в Z-пространстве." 
                    />
                 </div>
              </section>
            );
         })}
      </div>

      {/* Footer Info */}
      <div className="flex justify-center opacity-20">
         <div className="flex items-center gap-8 py-12 border-t border-current/10 w-full max-w-4xl justify-center text-[10px] font-mono uppercase tracking-[0.5em]">
            <span>Total_Experiments: 09</span>
            <div className="w-1 h-1 rounded-full bg-fuchsia-500" />
            <span>Archive_Access: GRANTED</span>
         </div>
      </div>
    </div>
  );
};
