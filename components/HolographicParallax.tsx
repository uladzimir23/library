import React, { useState, useContext, useRef } from 'react';
import { Target, Layers, Activity, MousePointer2, Cpu, Globe, ArrowUpRight } from 'lucide-react';
import { LanguageContext } from '../App';

export const HolographicParallax: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const layers = [
    { z: -100, opacity: 0.1, speed: 10, label: 'Deep_Buffer' },
    { z: -40, opacity: 0.2, speed: 30, label: 'Logic_Grid' },
    { z: 40, opacity: 0.8, speed: 60, label: 'Active_Nodes' },
    { z: 120, opacity: 1, speed: 100, label: 'UI_Overdrive' }
  ];

  return (
    <section className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5" id="hologram">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/10 text-cyan-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.hologram.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.hologram.title} <span className="text-cyan-500">{t.hologram.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.hologram.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Cpu, label: 'Processing', val: 'Active' },
              { icon: Globe, label: 'Z-Depth', val: 'Adaptive' }
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                    <stat.icon className="w-5 h-5" />
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</div>
                    <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase">{stat.val}</div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="flex-1 w-full h-[600px] bg-zinc-900 rounded-[48px] border border-white/5 relative overflow-hidden flex items-center justify-center perspective-2000 cursor-crosshair group shadow-2xl"
        >
           {/* Grid Background */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
             backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
           }} />

           {/* Holographic Stack */}
           <div className="relative w-full h-full preserve-3d flex items-center justify-center">
              {layers.map((layer, i) => (
                <div 
                  key={i}
                  className="absolute w-80 h-48 border border-white/10 rounded-3xl backdrop-blur-sm flex flex-col p-6 transition-transform duration-200 ease-out"
                  style={{ 
                    transform: `translate(${mousePos.x * layer.speed}px, ${mousePos.y * layer.speed}px) translateZ(${layer.z}px) rotateX(${mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg)`,
                    backgroundColor: `rgba(34, 211, 238, ${layer.opacity * 0.05})`,
                    borderColor: `rgba(255, 255, 255, ${layer.opacity * 0.2})`
                  }}
                >
                   <div className="flex justify-between items-start mb-auto">
                      <div className="text-[8px] font-mono text-cyan-500 uppercase tracking-widest">{layer.label}</div>
                      <ArrowUpRight className="w-3 h-3 text-cyan-500/40" />
                   </div>
                   <div className="h-1 w-24 bg-white/10 rounded-full mb-2" />
                   <div className="h-1 w-16 bg-white/5 rounded-full" />
                </div>
              ))}
              
              {/* Connecting Laser Beam */}
              <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-20" />
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
              <span className="text-[9px] font-tech text-cyan-500 uppercase tracking-widest">Holographic_Link_v09</span>
           </div>
        </div>
      </div>
    </section>
  );
};
