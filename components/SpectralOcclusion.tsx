import React, { useState, useContext, useRef } from 'react';
import { Layers, Eye, Zap, Move, Shield, Box, LayoutGrid } from 'lucide-react';
import { LanguageContext } from '../App';

export const SpectralOcclusion: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeLayer, setActiveLayer] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="occlusion">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
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

          <div className="space-y-4">
             {[
               { id: 0, label: 'Standard_Depth', desc: 'Minimal refractive separation with balanced saturation.' },
               { id: 1, label: 'High_Density', desc: 'Maximum occlusion blur, object behind is nearly invisible.' }
             ].map(opt => (
               <button 
                 key={opt.id}
                 onClick={() => setActiveLayer(opt.id)}
                 className={`w-full p-6 rounded-[32px] border text-left transition-all ${activeLayer === opt.id ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-transparent shadow-xl' : 'bg-black/5 dark:bg-white/5 border-transparent text-zinc-500 hover:bg-black/10'}`}
               >
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1">{opt.label}</div>
                  <div className="text-xs opacity-60 font-light">{opt.desc}</div>
               </button>
             ))}
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="flex-1 w-full h-[550px] bg-zinc-50 dark:bg-zinc-950/20 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000"
        >
           {/* Background "Target" Object */}
           <div 
             className="absolute w-64 h-64 rounded-full border-8 border-emerald-500/20 flex items-center justify-center transition-transform duration-1000 ease-out"
             style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) scale(1.1)` }}
           >
              <Box className="w-20 h-20 text-emerald-500/40" />
           </div>

           {/* The Occluder - Front Layer */}
           <div 
             className={`relative w-80 h-96 transition-all duration-700 ease-out border border-white/20 rounded-[48px] shadow-2xl flex flex-col items-center justify-center group overflow-hidden ${
               activeLayer === 1 ? 'backdrop-blur-[60px] grayscale-[0.2]' : 'backdrop-blur-[20px] grayscale-0'
             }`}
             style={{ 
               transform: `rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg) scale(0.985)`,
               backgroundColor: 'rgba(255, 255, 255, 0.08)'
             }}
           >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-40" />
              <div className="relative z-10 flex flex-col items-center gap-6">
                 <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Eye className="w-8 h-8" />
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-1">Optical_Density</div>
                    <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white uppercase">{activeLayer === 1 ? '0.94_HD' : '0.42_ST'}</div>
                 </div>
              </div>
              
              {/* Internal Polish Edge */}
              <div className="absolute inset-0 border border-white/10 rounded-[inherit] pointer-events-none" />
           </div>

           {/* Floating HUD info */}
           <div className="absolute bottom-12 left-12">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Occlusion_Mode: ACTIVE</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
