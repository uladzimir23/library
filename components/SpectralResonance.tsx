import React, { useState, useContext } from 'react';
import { Palette, Sparkles, Activity, Zap } from 'lucide-react';
import { LanguageContext } from '../App';

export const SpectralResonance: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="spectral-resonance">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.resonance.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.resonance.title} <span className="text-rose-500">{t.resonance.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.resonance.desc}
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-rose-500/10 rounded-[24px] flex items-center justify-center text-rose-500 transition-all group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white">
                   <Palette className="w-7 h-7" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Color_Profile</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">{isHovered ? 'Active_Chroma' : 'Muted_Static'}</div>
                </div>
             </div>
             <Activity className={`w-6 h-6 text-rose-500 ${isHovered ? 'animate-pulse' : 'opacity-20'}`} />
          </div>
        </div>

        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex-1 w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl"
        >
           <div className={`absolute inset-0 transition-opacity duration-1000 ${isHovered ? 'opacity-20' : 'opacity-5'}`} 
                style={{ background: 'radial-gradient(circle at center, #f43f5e 0%, transparent 70%)' }} />

           <div 
             className={`relative w-80 h-96 transition-all duration-700 ease-out border border-white/10 rounded-[48px] overflow-hidden flex flex-col items-center justify-center p-12 ${
               isHovered ? 'grayscale-0 saturate-[1.4] brightness-110 scale-[0.985]' : 'grayscale-[0.8] saturate-[0.5] brightness-90 scale-100'
             }`}
             style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(32px)' }}
           >
              <div className={`w-20 h-20 rounded-3xl bg-rose-500 flex items-center justify-center text-white shadow-2xl transition-transform duration-1000 ${isHovered ? 'rotate-[360deg]' : ''}`}>
                 <Sparkles className="w-10 h-10" />
              </div>
              <div className="mt-8 text-center">
                 <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-2">Matter_ID: 0xRESO</div>
                 <div className="text-2xl font-tech font-bold text-white uppercase tracking-widest">Resonance</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
