import React, { useState, useContext, useRef } from 'react';
import { Eye, Zap, Search, Target, Sparkles, Cpu } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralRefraction: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="neural-refraction">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.neuralRefraction.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.neuralRefraction.title} <span className="text-emerald-500">{t.neuralRefraction.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.neuralRefraction.desc}
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-[24px] flex items-center justify-center text-emerald-500 transition-all group-hover:scale-110">
                   <Cpu className="w-7 h-7" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Optical_Intelligence</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Active_Scan_09</div>
                </div>
             </div>
             <Sparkles className="w-6 h-6 text-emerald-500 animate-pulse" />
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex-1 w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-none"
        >
           {/* Underlying Text Data - Dark & Muted */}
           <div className="absolute inset-0 p-16 opacity-20 pointer-events-none select-none overflow-hidden font-mono text-[8px] text-emerald-500 leading-relaxed text-justify">
             {Array.from({ length: 20 }).map((_, i) => (
               <p key={i}>SPATIAL_LOGIC_INIT_CORE_BUFFER_0x{i}F_SYSTEM_CHECK_STABLE_99.9_REFRACTION_INDEX_1.45_NEURAL_MAP_UPDATING...</p>
             ))}
           </div>

           {/* The Refraction Lens (Cursor-following) */}
           <div 
             className="absolute w-64 h-64 border border-white/20 rounded-full shadow-[0_0_80px_rgba(16,185,129,0.1)] pointer-events-none transition-all duration-300 ease-out"
             style={{ 
               left: `${mousePos.x * 100}%`, 
               top: `${mousePos.y * 100}%`,
               transform: 'translate(-50%, -50%)',
               backdropFilter: isHovered ? 'blur(4px) contrast(1.5) brightness(1.2)' : 'none',
               background: isHovered ? 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)' : 'none'
             }}
           >
              {/* Lens HUD markings */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 flex flex-col items-center">
                 <div className="w-0.5 h-4 bg-emerald-500/40" />
                 <span className="text-[8px] font-bold text-emerald-500 mt-2">LENS_FOCUS_ID: 088</span>
              </div>
              <div className="absolute inset-4 border border-emerald-500/10 rounded-full animate-[spin_10s_linear_infinite]" />
              <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-500/30" />
           </div>

           {/* Background Mesh */}
           <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
           
           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[9px] font-tech text-zinc-400 uppercase tracking-[0.3em]">Neural_Refraction_Scanner</span>
           </div>
        </div>
      </div>
    </section>
  );
};
