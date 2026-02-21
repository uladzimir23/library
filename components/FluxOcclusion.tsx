import React, { useState, useContext } from 'react';
import { Eye, Zap, Search, Layers } from 'lucide-react';
import { LanguageContext } from '../App';

export const FluxOcclusion: React.FC = () => {
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
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="flux-occlusion">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.occlusion.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.occlusion.title} <span className="text-emerald-500">{t.occlusion.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.occlusion.desc}
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-[24px] flex items-center justify-center text-emerald-500 transition-all group-hover:scale-110">
                   <Eye className="w-7 h-7" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Optic_Bias</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Flux_v9</div>
                </div>
             </div>
             <Layers className="w-6 h-6 text-emerald-500 animate-pulse" />
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex-1 w-full h-[550px] bg-zinc-900 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-none"
        >
           <div className="absolute inset-0 p-12 opacity-30 font-mono text-[10px] text-emerald-500/40 leading-loose pointer-events-none select-none overflow-hidden">
             {Array.from({length: 15}).map((_, i) => (
               <p key={i}>0xFLUX_SYSTEM_INIT_BUFFER_STATE_STABLE_SCAN_ACTIVE_REFRACTION_INDEX_1.442_DATA_STREAM_OCCLUSION_ACTIVE_...</p>
             ))}
           </div>

           <div 
             className="absolute w-64 h-64 border border-white/20 rounded-full shadow-2xl pointer-events-none transition-all duration-300 ease-out"
             style={{ 
               left: `${mousePos.x * 100}%`, 
               top: `${mousePos.y * 100}%`,
               transform: 'translate(-50%, -50%)',
               backdropFilter: isHovered ? 'blur(8px) contrast(1.5) saturate(1.2)' : 'none',
               background: isHovered ? 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)' : 'none'
             }}
           >
              <div className="absolute inset-4 border border-emerald-500/20 rounded-full animate-spin-slow" />
              <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-500/40" />
           </div>
        </div>
      </div>
    </section>
  );
};
