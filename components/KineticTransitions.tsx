import React, { useState, useContext } from 'react';
import { Target, Zap, Sparkles, Move, Maximize2, MousePointer2, RefreshCw } from 'lucide-react';
import { LanguageContext } from '../App';

export const KineticTransitions: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const cards = [
    { id: 0, label: 'Micro_Squish', icon: Maximize2, desc: 'Ultra-subtle scale shift (1.5%) with a minor corner sharpening for professional focus.' },
    { id: 1, label: 'Density_Focus', icon: Zap, desc: 'Increases weight and blur intensity while contracting space with surgical precision.' },
    { id: 2, label: 'Adaptive_Hull', icon: RefreshCw, desc: 'Material relaxation with a minimal 4px radius delta, simulating high-tension surface.' }
  ];

  return (
    <section className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5" id="transitions">
      <style>{`
        /* Новые параметры: минимальная амплитуда отдачи (1.5%) */
        @keyframes recoil-bounce-refined {
          0% { transform: scale(0.985); }
          40% { transform: scale(1.015); }
          65% { transform: scale(0.998); }
          85% { transform: scale(1.002); }
          100% { transform: scale(1); }
        }

        .kinetic-card {
          transition: 
            transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
            border-radius 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
            backdrop-filter 0.4s ease,
            box-shadow 0.4s ease;
          transform-origin: center center;
          border-radius: 48px; /* Базовый радиус */
        }

        /* Hover: Очень тонкое уменьшение масштаба и радиуса */
        .kinetic-card:hover {
          transform: scale(0.985);
          border-radius: 42px; /* Минимальное изменение (с 48 до 42) */
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.08);
        }

        /* Leave: Аккуратная отдача */
        .kinetic-card:not(:hover) {
          animation: recoil-bounce-refined 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .kinetic-card:active {
          transform: scale(0.975);
          transition: transform 0.1s ease;
        }
      `}</style>

      <div className="text-center mb-24">
        <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/10 text-violet-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
          {t.transitions.tag}
        </span>
        <h2 className="text-4xl md:text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
          {t.transitions.title} <span className="text-violet-500">{t.transitions.titleAccent}</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed max-w-3xl mx-auto mt-6">
          Precision dynamics for spatial matter. Experience interactions where every micro-movement is calculated for ultimate tactile responsiveness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.id}
              className="group relative h-[450px] flex items-center justify-center"
            >
               {/* Background Glow - Subtle */}
               <div className="absolute inset-0 bg-indigo-500/[0.03] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
               
               {/* THE KINETIC OBJECT */}
               <div className="kinetic-card relative w-full h-full bg-white/20 dark:bg-zinc-900/40 backdrop-blur-3xl border border-black/5 dark:border-white/10 flex flex-col p-10 justify-between cursor-pointer overflow-hidden shadow-sm">
                  <div className="flex justify-between items-start">
                     <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12 duration-700">
                        <Icon className="w-7 h-7" />
                     </div>
                     <Sparkles className="w-5 h-5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="space-y-4">
                     <div className="text-[10px] font-mono text-indigo-500 font-bold uppercase tracking-[0.3em]">
                        Precision_State_{card.id}
                     </div>
                     <h3 className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase leading-none">
                        {card.label}
                     </h3>
                     <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                        {card.desc}
                     </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-black/5 dark:border-white/10 pt-6">
                     <div className="h-1 w-1 rounded-full bg-indigo-500 animate-pulse" />
                     <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Minimal_Friction_Active</span>
                  </div>

                  {/* Internal Polish Edge */}
                  <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[inherit]" />
               </div>

               <div className="absolute -top-6 bg-indigo-600/90 backdrop-blur-md text-white text-[8px] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-1 uppercase tracking-widest">
                  Low_Amplitude_Recoil
               </div>
            </div>
          );
        })}
      </div>

      <div className="mt-20 flex justify-center">
         <div className="flex items-center gap-8 p-5 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-2xl border border-black/5 dark:border-white/5 rounded-[32px] shadow-sm">
            <div className="flex items-center gap-4">
               <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-500">
                  <MousePointer2 className="w-4 h-4" />
               </div>
               <div>
                  <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Input</div>
                  <div className="text-[11px] font-mono text-zinc-900 dark:text-white">Subtle_Haptic</div>
               </div>
            </div>
            <div className="w-[1px] h-8 bg-black/5 dark:bg-white/10" />
            <div className="flex items-center gap-4">
               <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-500">
                  <RefreshCw className="w-4 h-4" />
               </div>
               <div>
                  <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Physics</div>
                  <div className="text-[11px] font-mono text-zinc-900 dark:text-white">Precision_V3</div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};
