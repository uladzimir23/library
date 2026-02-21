
import React, { useContext } from 'react';
import { Sun, Zap, Brain, Leaf, ArrowRight } from 'lucide-react';
import { LanguageContext } from '../App';

export const TechnicalPillars: React.FC<{ theme: string }> = ({ theme }) => {
  const { t } = useContext(LanguageContext);
  const isDark = theme === 'dark';

  const pillars = [
    { id: 'optics', icon: Sun, color: 'sky' },
    { id: 'kinetics', icon: Zap, color: 'amber' },
    { id: 'neural', icon: Brain, color: 'indigo' },
    { id: 'biological', icon: Leaf, color: 'emerald' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
      {pillars.map((p) => {
        const content = (t.genesis.pillars as any)[p.id];
        return (
          <div 
            key={p.id}
            className={`p-10 rounded-[48px] border transition-all duration-500 group relative overflow-hidden
              ${isDark ? 'bg-zinc-900 border-white/5 hover:border-white/10' : 'bg-white border-black/5 shadow-lg hover:shadow-xl'}
            `}
          >
            {/* Background Accent */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 blur-[80px] opacity-10 transition-opacity duration-700 group-hover:opacity-20 bg-${p.color}-500`} />
            
            <div className="relative z-10 space-y-8">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-2xl ${isDark ? 'bg-zinc-950 border border-white/10 text-white' : 'bg-zinc-50 border border-black/5 text-zinc-900'}`}>
                <p.icon className={`w-8 h-8 text-${p.color}-500`} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl font-tech font-bold uppercase tracking-widest text-zinc-900 dark:text-white leading-none">{content.title}</h3>
                <p className="text-lg font-light leading-relaxed opacity-60 text-zinc-600 dark:text-zinc-400">
                  {content.desc}
                </p>
              </div>

              <div className="pt-8 border-t border-current/5 flex items-center gap-3 text-[10px] font-mono font-black uppercase tracking-[0.4em] opacity-30 group-hover:opacity-100 transition-opacity">
                Module_Analysis <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
