
import React from 'react';
import { Share2, Zap, Activity, Cpu, Code2, Globe } from 'lucide-react';

export const IntegrationFlow: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="scroll-mt-32">
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-4">
           <span className="text-[9px] font-mono opacity-30 uppercase tracking-[0.6em] block">Development_Framework_Integration</span>
           <h2 className="text-7xl font-tech font-bold uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
              Бесшовная <br /><span className="text-indigo-500">Интеграция.</span>
           </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
         {[
           { title: 'React SDK', icon: Code2, desc: 'Полная поддержка React 19 с использованием новых хуков и оптимизаций рендеринга.' },
           { title: 'Tailwind JIT', icon: Zap, desc: 'Динамические стили, генерируемые на лету через расширенную конфигурацию Matter_Theme.' },
           { title: 'Edge Sync', icon: Globe, desc: 'Мгновенная синхронизация состояний интерфейса через децентрализованную сеть узлов.' }
         ].map((item, i) => (
           <div 
             key={i}
             className={`p-12 rounded-[56px] border transition-all duration-500 group
               ${isDark ? 'bg-white/[0.02] border-white/5 hover:border-indigo-500/30' : 'bg-white border-black/5 hover:shadow-2xl'}
             `}
           >
              <div className={`w-20 h-20 rounded-[32px] bg-indigo-600/10 flex items-center justify-center text-indigo-500 mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                 <item.icon className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-tech font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-6 leading-none">{item.title}</h3>
              <p className="text-lg text-zinc-500 font-light leading-relaxed">{item.desc}</p>
           </div>
         ))}
      </div>
    </div>
  );
};
