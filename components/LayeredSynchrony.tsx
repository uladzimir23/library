import React, { useState, useContext } from 'react';
import { Layers, Zap, MousePointer2, Activity, Shield, Ghost } from 'lucide-react';
import { LanguageContext } from '../App';

export const LayeredSynchrony: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ 
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="synchrony">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.synchrony.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.synchrony.title} <span className="text-emerald-500">{t.synchrony.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              In a spatial system, an action is never isolated. Experience layered synchrony, where a single planar input ripples through a stack of materials, each responding with unique physical lag.
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-[24px] flex items-center justify-center text-emerald-500 transition-all group-hover:scale-110">
                   <Activity className="w-7 h-7" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Cascade_Sync</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Multi_Layer_Active</div>
                </div>
             </div>
             <Zap className="w-6 h-6 text-emerald-500 animate-pulse" />
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setMousePos({x:0, y:0}); }}
          className="flex-1 w-full h-[600px] bg-zinc-50 dark:bg-zinc-950/20 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 group cursor-none"
        >
           {/* The Cascade Stack */}
           <div className="relative w-80 h-[400px] preserve-3d">
              {[0, 1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="absolute inset-0 border border-white/10 rounded-[40px] transition-all duration-[800ms] ease-out flex flex-col items-center justify-center p-8"
                  style={{ 
                    transform: `translateZ(${i * -60}px) translate(${mousePos.x * i * 30}px, ${mousePos.y * i * 30}px)`,
                    backgroundColor: `rgba(16, 185, 129, ${0.03 + (4-i) * 0.02})`,
                    backdropFilter: `blur(${i * 12}px)`,
                    opacity: hovered ? 1 - (i * 0.15) : 0.2,
                    zIndex: 10 - i
                  }}
                >
                   {i === 0 && (
                     <div className="relative z-10 flex flex-col items-center">
                        <MousePointer2 className="w-12 h-12 text-emerald-500 mb-4" />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Input_Master</span>
                     </div>
                   )}
                   {i === 4 && (
                     <div className="relative z-10 flex flex-col items-center opacity-40">
                        <Shield className="w-12 h-12 text-emerald-300 mb-4" />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Base_Anchor</span>
                     </div>
                   )}
                </div>
              ))}
           </div>

           {/* Custom Cursor for Sync */}
           <div 
             className="absolute w-6 h-6 border-2 border-emerald-500 rounded-full transition-transform duration-75 pointer-events-none"
             style={{ left: `calc(50% + ${mousePos.x * 100}% - 12px)`, top: `calc(50% + ${mousePos.y * 100}% - 12px)` }}
           >
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-30" />
           </div>
        </div>
      </div>
    </section>
  );
};
