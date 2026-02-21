import React, { useState, useContext } from 'react';
import { Palette, Zap, Droplets, Sun, Sparkles, Activity } from 'lucide-react';
import { LanguageContext } from '../App';

export const ChromaCore: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [hovered, setHovered] = useState(false);

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="chroma">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.chroma.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.chroma.title} <span className="text-indigo-500">{t.chroma.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.chroma.desc}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-[32px] border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-indigo-500">
                  <Palette className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Saturation_Index</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">{hovered ? '140%' : '80%'}</div>
             </div>
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-[32px] border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-emerald-500">
                  <Activity className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Chroma_Stability</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">STABLE</div>
             </div>
          </div>
        </div>

        <div 
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex-1 w-full h-[550px] relative flex items-center justify-center group"
        >
           {/* Background Atmosphere */}
           <div className={`absolute inset-0 transition-all duration-1000 rounded-[64px] ${hovered ? 'bg-indigo-500/5 blur-[100px]' : 'bg-transparent blur-0'}`} />
           
           {/* The Chroma Slab */}
           <div 
             className={`relative w-80 h-96 transition-all duration-700 ease-out backdrop-blur-3xl border border-white/20 rounded-[48px] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-12 ${
               hovered ? 'grayscale-0 saturate-150 scale-[0.985] border-radius-[44px]' : 'grayscale-[0.5] saturate-[0.8] scale-100 border-radius-[48px]'
             }`}
             style={{ 
               backgroundColor: hovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
               boxShadow: hovered ? '0 20px 50px -10px rgba(99, 102, 241, 0.2)' : '0 10px 30px -10px rgba(0,0,0,0.1)'
             }}
           >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10 flex flex-col items-center gap-6">
                 <div className={`w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-xl transition-all duration-700 ${hovered ? 'rotate-[360deg] scale-110 shadow-indigo-500/40' : 'rotate-0 scale-100'}`}>
                    <Droplets className="w-10 h-10" />
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.5em] mb-2">Matter_State</div>
                    <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                       {hovered ? 'Vibrant_Flux' : 'Static_Null'}
                    </div>
                 </div>
              </div>

              {/* Decorative HUD corners */}
              <div className="absolute top-8 left-8 w-2 h-2 border-t border-l border-zinc-400 opacity-20" />
              <div className="absolute top-8 right-8 w-2 h-2 border-t border-r border-zinc-400 opacity-20" />
              <div className="absolute bottom-8 left-8 w-2 h-2 border-b border-l border-zinc-400 opacity-20" />
              <div className="absolute bottom-8 right-8 w-2 h-2 border-b border-r border-zinc-400 opacity-20" />
           </div>

           {/* Floating Tags */}
           <div className={`absolute top-12 left-12 flex items-center gap-2 transition-all duration-700 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-[9px] font-mono text-indigo-500 uppercase tracking-widest font-bold text-shadow-sm">Signal_Captured</span>
           </div>
        </div>
      </div>
    </section>
  );
};
