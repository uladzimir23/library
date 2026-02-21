import React, { useState, useContext, useRef } from 'react';
import { LayoutGrid, Box, Move3d, MousePointer2, Zap, ArrowRight } from 'lucide-react';
import { LanguageContext } from '../App';

export const DimensionalProjection: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="projection">
      <div className="text-center mb-24">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
          {t.projection.tag}
        </span>
        <h2 className="text-4xl md:text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
          {t.projection.title} <span className="text-indigo-500">{t.projection.titleAccent}</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed max-w-3xl mx-auto mt-6">
          Every 3D form starts as a 2D interaction. Watch how planar movements project through space to define complex material volumes.
        </p>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-[600px] flex flex-col lg:flex-row gap-8 perspective-2000"
      >
        {/* Left: 2D Input Plane */}
        <div className="flex-1 bg-white/5 border border-black/5 dark:border-white/10 rounded-[48px] relative overflow-hidden group shadow-inner">
           <div className="absolute inset-0 opacity-20" style={{ 
             backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
             backgroundSize: '30px 30px'
           }} />
           <div className="absolute top-8 left-8 flex items-center gap-2 text-indigo-500">
              <LayoutGrid className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-shadow-sm">Planar_Input_0x1</span>
           </div>
           
           {/* Interactive 2D Point */}
           <div 
             className="absolute w-12 h-12 border-2 border-indigo-500 rounded-full flex items-center justify-center transition-all duration-75"
             style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
           >
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
           </div>
        </div>

        {/* Center: Connection Projection */}
        <div className="hidden lg:flex items-center justify-center w-24">
           <ArrowRight className="w-8 h-8 text-zinc-300 dark:text-zinc-700 animate-pulse" />
        </div>

        {/* Right: 3D Resultant Matter */}
        <div className="flex-1 bg-zinc-950 border border-white/5 rounded-[48px] relative overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
           
           <div className="absolute top-8 left-8 flex items-center gap-2 text-emerald-500">
              <Box className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Volumetric_Result_3D</span>
           </div>

           {/* The Resulting 3D Object influenced by 2D Point */}
           <div 
             className="relative w-64 h-64 transition-all duration-300 ease-out preserve-3d"
             style={{ 
               transform: `rotateX(${(mousePos.y - 0.5) * -40}deg) rotateY(${(mousePos.x - 0.5) * 40}deg)`,
             }}
           >
              <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[56px] shadow-2xl overflow-hidden">
                 {/* Internal Core that lights up based on 2D position */}
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-emerald-500/20 opacity-40" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-indigo-600/30 rounded-full blur-[60px] animate-pulse" />
                    <Move3d className="w-16 h-16 text-white/40" />
                 </div>
              </div>
           </div>

           {/* HUD for Projection Data */}
           <div className="absolute bottom-8 right-8 text-right font-mono text-[9px] text-zinc-500">
              COORD_Z: {(mousePos.x * mousePos.y * 10).toFixed(3)}_U<br />
              PROJECTION_SYNC: STABLE
           </div>
        </div>
      </div>
    </section>
  );
};
