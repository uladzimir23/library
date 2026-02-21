import React, { useState, useContext, useRef } from 'react';
import { Droplet, Zap, Activity, Target, Shield, RefreshCw } from 'lucide-react';
import { LanguageContext } from '../App';

export const PlasmaCoreSync: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="plasma-core">
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="plasma-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Containment_v12
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Plasma <br /><span className="text-sky-500">Core_Sync.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Liquid logic. We visualize data storage as high-viscosity plasma blobs. Move the "Containment Shield" to influence the core, establishing magnetic focus and triggering energy fusion between nodes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col gap-3 shadow-xl group hover:border-sky-500/40 transition-all">
                <Shield className="w-6 h-6 text-sky-500" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Field_Density</div>
                <div className="text-2xl font-tech font-bold text-white uppercase tracking-widest">0.94_STB</div>
             </div>
             <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col gap-3 shadow-xl group hover:border-indigo-500/40 transition-all">
                <RefreshCw className="w-6 h-6 text-indigo-500 animate-spin-slow" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Recycle_Rate</div>
                <div className="text-2xl font-tech font-bold text-white uppercase tracking-widest">842_MS</div>
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsDragging(true)}
          onMouseLeave={() => setIsDragging(false)}
          className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-crosshair"
        >
           {/* Plasma Void */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.05)_0%,transparent_70%)] opacity-40 animate-pulse" />

           {/* The Containment Field (Cursor-following circle) */}
           <div 
             className="absolute w-80 h-80 border-2 border-dashed border-sky-500/20 rounded-full transition-all duration-300 ease-out z-50 pointer-events-none"
             style={{ 
               left: `calc(${mousePos.x * 100}% - 160px)`, 
               top: `calc(${mousePos.y * 100}% - 160px)`,
               transform: isDragging ? 'scale(1.1)' : 'scale(1)'
             }}
           >
              <div className="absolute inset-4 border border-sky-500/10 rounded-full animate-spin-slow" />
           </div>

           {/* Plasma Blobs (Gooey filtered) */}
           <div className="absolute inset-0 flex items-center justify-center" style={{ filter: 'url(#plasma-goo)' }}>
              {/* Static Center Core */}
              <div className="w-32 h-32 bg-sky-600 rounded-full shadow-2xl flex items-center justify-center text-white">
                 <Zap className="w-12 h-12" />
              </div>
              
              {/* Wandering Blobs that follow/react to cursor */}
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-20 h-20 bg-sky-500/80 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    transform: `translate(${(mousePos.x - 0.5) * (150 + i * 20)}px, ${(mousePos.y - 0.5) * (150 + i * 20)}px) scale(${1 - i * 0.1})`,
                    opacity: 0.8 - i * 0.1
                  }}
                />
              ))}
           </div>

           {/* HUD UI */}
           <div className="absolute top-12 left-12 flex items-center gap-4 text-sky-400/40 font-mono">
              <div className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              <span className="text-[10px] uppercase tracking-[0.4em]">Matter_Containment: STABLE</span>
           </div>
        </div>
      </div>
    </section>
  );
};
