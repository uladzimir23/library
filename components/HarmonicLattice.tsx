import React, { useState, useRef, useContext } from 'react';
import { Box, Code, Cpu, Fingerprint, Globe, Layers, Shield, Sparkles, Zap } from 'lucide-react';
import { LanguageContext } from '../App';

const ICONS = [Box, Cpu, Code, Fingerprint, Globe, Shield, Sparkles, Zap];

export const HarmonicLattice: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Нормализуем координаты от -0.5 до 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    containerRef.current.style.setProperty('--mx', x.toString());
    containerRef.current.style.setProperty('--my', y.toString());
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--mx', '0');
    containerRef.current.style.setProperty('--my', '0');
  };

  // Генерируем 24 элемента
  const items = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    icon: ICONS[i % ICONS.length],
    delay: i * 0.12,
    code: `0x${Math.random().toString(16).slice(2, 6).toUpperCase()}`
  }));

  return (
    <section 
      ref={containerRef}
      className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5 [--mx:0] [--my:0]" 
      id="lattice"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-center mb-20">
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
          {t.lattice.tag}
        </span>
        <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
          {t.lattice.title} <span className="text-emerald-500">{t.lattice.titleAccent}</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
          {t.lattice.desc}
        </p>
      </div>

      <div className="relative grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 md:gap-4 perspective-2000">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id}
              className="relative aspect-square"
              style={{
                // Легкое притяжение к курсору (Magnetic Pull)
                transform: `translate(calc(var(--mx) * 15px), calc(var(--my) * 15px)) rotateX(calc(var(--my) * -10deg)) rotateY(calc(var(--mx) * 10deg))`,
                transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
            >
               {/* Bobbing Base Layer */}
               <div 
                 className="absolute inset-0 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-xl md:rounded-2xl transition-all duration-300 shadow-sm flex flex-col items-center justify-center p-2 group"
                 style={{
                   animation: `float ${5 + Math.random() * 3}s ease-in-out infinite`,
                   animationDelay: `${item.delay}s`,
                 }}
               >
                  <Icon className="w-4 h-4 md:w-6 md:h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                  <div className="mt-1.5 text-[6px] md:text-[8px] font-mono text-zinc-500 opacity-40 uppercase tracking-tighter">
                    {item.code}
                  </div>
                  
                  {/* Subtle hover indicator */}
                  <div className="absolute inset-0 border border-emerald-500/0 group-hover:border-emerald-500/20 rounded-xl md:rounded-2xl transition-all" />
               </div>
            </div>
          );
        })}
      </div>

      <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-40">
         {[
           { label: 'ELEMENT_COUNT', val: '24_ATOMS' },
           { label: 'MAGNETIC_BIAS', val: 'MINIMAL' },
           { label: 'SYNC_REACTIVE', val: 'STABLE' }
         ].map((tag, i) => (
           <div key={i} className="flex gap-3 items-center">
              <div className="w-1 h-1 bg-emerald-500 rounded-full" />
              <span className="text-[10px] font-mono tracking-widest text-zinc-500">{tag.label}: {tag.val}</span>
           </div>
         ))}
      </div>

      <style>{`
        .perspective-2000 { perspective: 2000px; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
};
