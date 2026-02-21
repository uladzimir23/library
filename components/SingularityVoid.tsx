import React, { useState, useContext, useRef, useEffect } from 'react';
import { Target, Zap, Radio, Maximize2, Orbit, Atom } from 'lucide-react';
import { LanguageContext } from '../App';

export const SingularityVoid: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [mass, setMass] = useState(0.5);
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
    <section className="py-32 border-b border-black/5 dark:border-white/5 overflow-hidden" id="singularity">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/10 text-violet-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Gravitational_Optics
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Singularity <br /><span className="text-violet-500">Void_v2.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-4">
              The ultimate center of focus. Our gravitational engine warps the very fabric of the UI grid, bending light and data streams around an interactive event horizon.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 space-y-6">
             <div className="space-y-4">
                <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                   <span className="flex items-center gap-2"><Orbit className="w-3 h-3" /> Gravitational_Mass</span>
                   <span className="font-mono text-violet-500">{(mass * 10).toFixed(2)} M☉</span>
                </div>
                <input 
                  type="range" min="0.1" max="1" step="0.01" value={mass}
                  onChange={e => setMass(parseFloat(e.target.value))}
                  className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                />
             </div>
             <div className="flex justify-between items-end border-t border-white/5 pt-4">
                <div className="text-[8px] font-mono text-zinc-500 uppercase">Light_Bending: ACTIVE</div>
                <Atom className="w-4 h-4 text-violet-500 animate-spin-slow" />
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group cursor-crosshair shadow-2xl"
        >
           {/* Displacement Map Filter Simulation via CSS and Overlay */}
           <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="w-full h-full" style={{ 
                backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
           </div>

           {/* The Warp Field */}
           <div 
             className="absolute w-[800px] h-[800px] pointer-events-none transition-all duration-300 ease-out"
             style={{ 
               left: `${mousePos.x * 100}%`, 
               top: `${mousePos.y * 100}%`,
               transform: 'translate(-50%, -50%)',
               background: `radial-gradient(circle at center, rgba(139,92,246,${0.2 * mass}) 0%, transparent 70%)`
             }}
           >
              <div className="absolute inset-0 animate-spin-slow border-[1px] border-violet-500/10 rounded-full" />
           </div>

           {/* The Core Singularity */}
           <div 
             className="relative w-32 h-32 bg-black rounded-full shadow-[0_0_80px_rgba(139,92,246,0.3)] flex items-center justify-center border border-white/5 z-20 transition-transform duration-150"
             style={{ transform: `scale(${0.8 + mass * 0.4})` }}
           >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600 via-transparent to-pink-500 opacity-40 animate-pulse" />
              <div className="w-2 h-2 bg-white rounded-full blur-[2px] animate-ping" />
              
              {/* Accretion Disk (Subtle) */}
              <div className="absolute w-[200%] h-[20%] bg-violet-500/20 blur-xl rotate-12" />
           </div>

           {/* Warped UI Atoms */}
           {[...Array(12)].map((_, i) => (
             <div 
               key={i}
               className="absolute w-4 h-4 bg-white/5 border border-white/10 rounded-lg transition-all duration-1000 ease-out pointer-events-none"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 transform: `translate(${(mousePos.x - 0.5) * -100 * mass}px, ${(mousePos.y - 0.5) * -100 * mass}px) rotate(${i * 30}deg)`,
                 opacity: 0.2
               }}
             />
           ))}

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-violet-500 uppercase tracking-[0.4em] mb-1">Singularity_Status</div>
              <div className="text-xl font-tech font-bold text-white uppercase italic">CRITICAL_MASS</div>
           </div>
        </div>
      </div>
    </section>
  );
};
