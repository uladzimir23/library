import React, { useState, useContext, useRef } from 'react';
import { Cloud, Wind, Sun, Layers, Zap, Eye } from 'lucide-react';
import { LanguageContext } from '../App';

export const AtmosphericVolume: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [density, setDensity] = useState(0.4);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Очень низкая чувствительность для благородного движения
    setMousePos({ x: x * 0.4, y: y * 0.4 });
  };

  return (
    <section className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5" id="volume">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.volume.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.volume.title} <span className="text-sky-500">{t.volume.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.volume.desc}
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/10 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-2"><Wind className="w-3 h-3" /> {t.volume.densityScale}</span>
                <span className="font-mono text-sky-500">{(density * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.01" value={density}
                onChange={e => setDensity(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-sky-500">
                  <Sun className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Light_Scattering</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">Rayleigh_ON</div>
             </div>
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-indigo-500">
                  <Layers className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Depth_Occlusion</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">{(density * 1.5).toFixed(2)}_Z</div>
             </div>
          </div>
        </div>

        {/* Volumetric Visualizer */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="flex-1 w-full h-[600px] bg-slate-900 rounded-[48px] border border-white/10 relative overflow-hidden flex items-center justify-center perspective-2000 group shadow-2xl"
        >
           {/* Deep Light Rays */}
           <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{
             background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, #0ea5e9 0%, transparent 60%)`
           }} />

           {/* The Core Object - Heaviest Mass */}
           <div 
             className="relative w-64 h-80 bg-white/5 border border-white/10 rounded-[40px] shadow-2xl transition-transform duration-1000 ease-out preserve-3d"
             style={{ 
               transform: `rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg) translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
               filter: `blur(${density * 4}px)`
             }}
           >
              <div className="p-8 h-full flex flex-col justify-between">
                <div className="flex justify-between">
                  <Zap className="text-sky-400 w-6 h-6" />
                  <div className="w-8 h-8 rounded-full border border-white/20" />
                </div>
                <div className="space-y-4">
                  <div className="w-24 h-2 bg-white/20 rounded-full" />
                  <div className="w-16 h-2 bg-white/10 rounded-full" />
                </div>
              </div>
           </div>

           {/* Haze Layers - Mid/Low Mass */}
           {[
             { z: 100, blur: 12, opacity: 0.2, speed: 40 },
             { z: 200, blur: 24, opacity: 0.15, speed: 80 },
             { z: 300, blur: 40, opacity: 0.1, speed: 120 }
           ].map((haze, i) => (
             <div 
               key={i}
               className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out"
               style={{ 
                 transform: `translate(${mousePos.x * haze.speed}px, ${mousePos.y * haze.speed}px) translateZ(${haze.z}px)`,
                 backdropFilter: `blur(${haze.blur * density}px)`,
                 backgroundColor: `rgba(14, 165, 233, ${haze.opacity * density})`
               }}
             />
           ))}

           {/* Floating HUD - Lightest Mass */}
           <div className="absolute top-12 left-12 space-y-2 transition-transform duration-300"
                style={{ transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)` }}>
              <div className="flex items-center gap-2 text-sky-400">
                <Eye className="w-4 h-4" />
                <span className="text-[10px] font-tech font-bold uppercase tracking-widest">Visual_Depth_Scanner</span>
              </div>
              <div className="font-mono text-[9px] text-white/40">SCATTERING: {(density * 4.2).toFixed(3)} LX</div>
           </div>
        </div>
      </div>
    </section>
  );
};
