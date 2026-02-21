import React, { useState, useContext, useRef } from 'react';
import { Palette, Zap, Ghost, Timer, Activity, Waves } from 'lucide-react';
import { LanguageContext } from '../App';

export const KineticInertia: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [intensity, setIntensity] = useState(0); // 0 to 1

  const handleMouseEnter = () => setIntensity(1);
  const handleMouseLeave = () => {
    // Плавно уменьшаем интенсивность
    const fade = setInterval(() => {
      setIntensity(prev => {
        if (prev <= 0.01) {
          clearInterval(fade);
          return 0;
        }
        return prev - 0.02;
      });
    }, 20);
  };

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="kinetic-inertia">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/10 text-pink-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.inertia.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.inertia.title} <span className="text-pink-500">{t.inertia.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.inertia.desc}
            </p>
          </div>

          <div className="space-y-6">
             <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-pink-500/10 rounded-[24px] flex items-center justify-center text-pink-500 transition-all group-hover:scale-110">
                      <Timer className="w-7 h-7" />
                   </div>
                   <div>
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Color_Persistence</div>
                      <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Inertial_v4</div>
                   </div>
                </div>
                <div className="text-xl font-mono text-pink-500 font-bold">{(intensity * 100).toFixed(0)}%</div>
             </div>
          </div>
        </div>

        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex-1 w-full h-[550px] relative flex items-center justify-center group"
        >
           {/* Kinetic Trail Background */}
           <div 
             className="absolute inset-0 transition-all duration-500 rounded-[64px]"
             style={{ 
               background: `radial-gradient(circle at 50% 50%, rgba(236, 72, 153, ${intensity * 0.1}) 0%, transparent 70%)`,
               filter: `blur(${40 - intensity * 20}px)`
             }}
           />

           {/* The Inertial Slab */}
           <div 
             className="relative w-80 h-96 transition-all duration-700 ease-out backdrop-blur-3xl border border-white/20 rounded-[48px] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-12"
             style={{ 
               filter: `grayscale(${1 - intensity}) saturate(${1 + intensity})`,
               backgroundColor: `rgba(255, 255, 255, ${0.05 + intensity * 0.05})`,
               transform: `scale(${1 + intensity * 0.02})`
             }}
           >
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-indigo-500/10 opacity-40" />
              
              <div className="relative z-10 flex flex-col items-center gap-6">
                 <div className={`w-20 h-20 rounded-3xl bg-pink-600 flex items-center justify-center text-white shadow-xl transition-all duration-1000 ${intensity > 0.5 ? 'rotate-[360deg] scale-110 shadow-pink-500/40' : 'rotate-0 scale-100'}`}>
                    <Palette className="w-10 h-10" />
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-2">Chrominance_Level</div>
                    <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                       {intensity > 0.1 ? 'Vivid_Active' : 'Muted_Standby'}
                    </div>
                 </div>
              </div>

              {/* Persistence Bar */}
              <div className="absolute bottom-12 w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-pink-500 transition-all duration-200" style={{ width: `${intensity * 100}%` }} />
              </div>
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${intensity > 0 ? 'bg-pink-500 animate-ping' : 'bg-zinc-700'}`} />
              <span className="text-[9px] font-tech text-zinc-400 uppercase tracking-[0.3em]">Kinetic_Inertia_Engine</span>
           </div>
        </div>
      </div>
    </section>
  );
};
