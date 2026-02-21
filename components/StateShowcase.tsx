import React, { useState, useContext } from 'react';
import { MousePointer2, Maximize2, Move3d, Zap, Layers, Sparkles } from 'lucide-react';
import { LanguageContext } from '../App';

export const StateShowcase: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    setMagneticPos({ x, y });
  };

  const resetMagnetic = () => setMagneticPos({ x: 0, y: 0 });

  return (
    <section className="py-32 scroll-mt-24" id="states">
      <div className="text-center mb-24">
        <span className="text-indigo-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">
          {t.states.tag}
        </span>
        <h2 className="text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
          {t.states.title} <span className="text-indigo-500">{t.states.titleAccent}</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-light">
          {t.states.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-2000">
        {/* Elevation Card */}
        <div className="group relative bg-white/20 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[40px] p-12 overflow-hidden h-[400px] flex flex-col justify-between transition-all duration-700 hover:shadow-[0_80px_100px_-20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_80px_100px_-20px_rgba(0,0,0,0.5)]">
           <div className="flex justify-between items-start z-10">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                <Maximize2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">State_01</span>
           </div>
           
           <div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-600/10 dark:bg-white/10 backdrop-blur-3xl rounded-[32px] border border-white/20 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-125 group-hover:-translate-y-16 group-hover:shadow-2xl shadow-indigo-500/20 flex items-center justify-center"
             style={{ transformStyle: 'preserve-3d' }}
           >
              <div className="w-12 h-12 bg-indigo-500 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Layers className="w-10 h-10 text-indigo-500 absolute group-hover:scale-110 transition-transform" />
           </div>

           <div className="z-10">
              <h3 className="text-2xl font-tech font-bold uppercase mb-2 text-zinc-900 dark:text-white">{t.states.cards.elevation.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs">{t.states.cards.elevation.desc}</p>
           </div>
        </div>

        {/* Magnetic Card */}
        <div 
          onMouseMove={handleMagneticMove}
          onMouseLeave={resetMagnetic}
          className="group relative bg-white/20 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[40px] p-12 overflow-hidden h-[400px] flex flex-col justify-between transition-all duration-500"
        >
           <div className="flex justify-between items-start z-10">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <Move3d className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">State_02</span>
           </div>
           
           <div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-emerald-600/5 dark:bg-emerald-400/5 border border-emerald-500/20 rounded-full transition-all duration-200 ease-out flex items-center justify-center gap-8"
             style={{ 
               transform: `translate(calc(-50% + ${magneticPos.x}px), calc(-50% + ${magneticPos.y}px)) rotateX(${-magneticPos.y/2}deg) rotateY(${magneticPos.x/2}deg)`,
               boxShadow: '0 0 40px rgba(16, 185, 129, 0.1)'
             }}
           >
              {[1, 2, 3].map(i => (
                <div key={i} className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: `${i*200}ms` }}></div>
              ))}
           </div>

           <div className="z-10">
              <h3 className="text-2xl font-tech font-bold uppercase mb-2 text-zinc-900 dark:text-white">{t.states.cards.magnetic.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs">{t.states.cards.magnetic.desc}</p>
           </div>
        </div>

        {/* Refractive Card */}
        <div className="group relative bg-white/20 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[40px] p-12 overflow-hidden h-[400px] flex flex-col justify-between transition-all duration-700">
           <div className="flex justify-between items-start z-10">
              <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 border border-pink-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">State_03</span>
           </div>
           
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-violet-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="w-32 h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-[32px] transition-all duration-700 group-hover:backdrop-blur-[40px] group-hover:scale-110 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-pink-400" />
              </div>
           </div>

           <div className="z-10">
              <h3 className="text-2xl font-tech font-bold uppercase mb-2 text-zinc-900 dark:text-white">{t.states.cards.refractive.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs">{t.states.cards.refractive.desc}</p>
           </div>
        </div>

        {/* Chromatic Card */}
        <div className="group relative bg-white/20 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[40px] p-12 overflow-hidden h-[400px] flex flex-col justify-between transition-all duration-700">
           <div className="flex justify-between items-start z-10">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                <MousePointer2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">State_04</span>
           </div>
           
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-40">
              <div className="absolute inset-0 border-[3px] border-red-500/0 group-hover:border-red-500/30 rounded-3xl group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-500"></div>
              <div className="absolute inset-0 border-[3px] border-blue-500/0 group-hover:border-blue-500/30 rounded-3xl group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-white dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center">
                 <div className="text-4xl font-tech font-bold text-zinc-900 dark:text-white group-hover:tracking-[0.2em] transition-all duration-700">PRISM</div>
              </div>
           </div>

           <div className="z-10">
              <h3 className="text-2xl font-tech font-bold uppercase mb-2 text-zinc-900 dark:text-white">{t.states.cards.chromatic.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs">{t.states.cards.chromatic.desc}</p>
           </div>
        </div>
      </div>
    </section>
  );
};