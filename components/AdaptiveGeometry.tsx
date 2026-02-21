import React, { useState, useContext, useRef } from 'react';
import { Maximize, Target, MousePointer2, Sliders } from 'lucide-react';
import { LanguageContext } from '../App';

export const AdaptiveGeometry: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [radius, setRadius] = useState(56);
  const [distance, setDistance] = useState(100);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const d = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    
    const maxD = 400;
    const normalizedD = Math.min(d / maxD, 1);
    // Радиус становится острее (меньше) при приближении
    const newRadius = 12 + normalizedD * 44; 
    
    setDistance(normalizedD * 100);
    setRadius(newRadius);
  };

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="adaptive-geometry">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.adaptive.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.adaptive.title} <span className="text-indigo-500">{t.adaptive.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.adaptive.desc}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-[32px] border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-indigo-500">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Radius_Live</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">{radius.toFixed(0)}px</div>
             </div>
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-[32px] border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-emerald-500">
                  <Target className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Proximity</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">{distance.toFixed(0)}%</div>
             </div>
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { setRadius(56); setDistance(100); }}
          className="flex-1 w-full h-[550px] relative flex items-center justify-center group"
        >
           <div className="absolute w-[400px] h-[400px] border border-indigo-500/5 rounded-full animate-pulse pointer-events-none" />
           
           <div 
             ref={cardRef}
             className="relative w-80 h-96 transition-all duration-500 ease-out backdrop-blur-3xl border border-white/20 bg-white/5 shadow-2xl flex flex-col items-center justify-center p-12 overflow-hidden"
             style={{ 
               borderRadius: `${radius}px`,
               transform: `scale(${1 - (1 - distance/100) * 0.015})`
             }}
           >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center gap-8">
                 <div className={`w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-xl transition-all duration-700 ${distance < 40 ? 'scale-90 rotate-12' : 'scale-100 rotate-0'}`}>
                    <Maximize className="w-10 h-10" />
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-2">Structure_Mode</div>
                    <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                       {distance < 40 ? 'Focused' : 'Organic'}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
