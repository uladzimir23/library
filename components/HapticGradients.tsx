import React, { useState, useContext, useRef } from 'react';
import { Droplet, Zap, Wind, MousePointer2, Activity, Sparkles } from 'lucide-react';
import { LanguageContext } from '../App';

export const HapticGradients: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pressure, setPressure] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    setPressure(Math.min(1, pressure + 0.01));
  };

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="haptic-gradients">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/10 text-pink-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.haptic.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.haptic.title} <span className="text-pink-500">{t.haptic.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.haptic.desc}
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-pink-500/10 rounded-[24px] flex items-center justify-center text-pink-500 transition-all group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white">
                   <Droplet className="w-7 h-7" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Surface_Tension</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Liquid_Mesh_v2</div>
                </div>
             </div>
             <Activity className="w-6 h-6 text-pink-500 animate-pulse" />
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { setMousePos({ x: 0.5, y: 0.5 }); setPressure(0); }}
          className="flex-1 w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center cursor-none group shadow-2xl"
        >
           {/* Reduced Brightness Gradient Mesh */}
           <div 
             className="absolute inset-0 transition-all duration-1000 ease-out grayscale-[0.3] saturate-150 group-hover:grayscale-0 group-hover:saturate-[1.5]"
             style={{ 
               // Reduced opacity for gradients
               background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(236, 72, 153, 0.12) 0%, rgba(99, 102, 241, 0.05) 30%, transparent 70%)` 
             }}
           />
           
           <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

           <div 
             className="relative w-72 h-72 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_0_80px_rgba(236,72,153,0.1)] flex flex-col items-center justify-center transition-all duration-500 ease-out"
             style={{ 
               transform: `translate(${(mousePos.x - 0.5) * 100}px, ${(mousePos.y - 0.5) * 100}px) scale(${1 - pressure * 0.015})`,
               borderRadius: `${50 - pressure * 8}%`
             }}
           >
              <Sparkles className="w-12 h-12 text-white/20 animate-pulse" />
           </div>

           <div 
             className="absolute w-10 h-10 border border-pink-500/20 rounded-full flex items-center justify-center pointer-events-none transition-transform duration-75 ease-out"
             style={{ left: `calc(${mousePos.x * 100}% - 20px)`, top: `calc(${mousePos.y * 100}% - 20px)` }}
           >
              <div className="w-1.5 h-1.5 bg-pink-500/30 rounded-full" />
           </div>
        </div>
      </div>
    </section>
  );
};
