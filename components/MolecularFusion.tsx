import React, { useState, useContext, useRef } from 'react';
import { Atom, Zap, Activity, Target, Magnet, Share2, Sparkles } from 'lucide-react';
import { LanguageContext } from '../App';

export const MolecularFusion: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isFused, setIsFused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const particles = [
    { id: 1, x: 20, y: 30, speed: 2 },
    { id: 2, x: 80, y: 20, speed: 1.5 },
    { id: 3, x: 15, y: 80, speed: 3 },
    { id: 4, x: 85, y: 75, speed: 2.5 },
    { id: 5, x: 50, y: 15, speed: 1.2 }
  ];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="fusion">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Gravitational_Matter
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Molecular <br /><span className="text-rose-500">Fusion_v12.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Experience magnetic UI. Floating atomic components are drawn to the central core based on proximity, forming a unified super-structure that shares its energy and refractive properties.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex flex-col gap-3">
                <Magnet className="w-6 h-6 text-rose-500" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Magnetic_Flux</div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">{isFused ? 'MAX_PULL' : 'STANDBY'}</div>
             </div>
             <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex flex-col gap-3">
                <Share2 className="w-6 h-6 text-indigo-500" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Linked_Atoms</div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">{isFused ? '05_UNITS' : '00_UNITS'}</div>
             </div>
          </div>

          <button 
            onClick={() => setIsFused(!isFused)}
            className={`w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-4 ${isFused ? 'bg-rose-600 text-white' : 'bg-zinc-900 text-white'}`}
          >
            <Sparkles className="w-4 h-4" />
            {isFused ? 'Release_Fusion_Field' : 'Engage_Fusion_Core'}
          </button>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-crosshair"
        >
           {/* Fusion Core */}
           <div className={`relative w-48 h-48 bg-white/5 border border-white/10 rounded-full flex items-center justify-center transition-all duration-1000 z-20 ${isFused ? 'scale-125 shadow-[0_0_80px_rgba(244,63,94,0.4)] border-rose-500/50' : 'scale-100 shadow-none'}`}>
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-transparent to-rose-500/5 rounded-full animate-pulse" />
              <Atom className={`w-16 h-16 transition-all duration-1000 ${isFused ? 'text-rose-500 rotate-[360deg]' : 'text-zinc-700'}`} />
              
              {/* Internal Polish Glow */}
              <div className="absolute inset-4 border border-white/5 rounded-full animate-spin-slow" />
           </div>

           {/* Atomic Particles */}
           {particles.map((p) => (
             <div 
               key={p.id}
               className="absolute w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center transition-all duration-1000 ease-out z-30 shadow-xl"
               style={{ 
                 left: isFused ? '50%' : `${p.x}%`, 
                 top: isFused ? '50%' : `${p.y}%`,
                 transform: isFused 
                   ? `translate(-50%, -50%) rotate(${p.id * 72}deg) translateY(-80px) rotate(-${p.id * 72}deg) scale(0.8)` 
                   : `translate(${(mousePos.x - 0.5) * 40}px, ${(mousePos.y - 0.5) * 40}px) scale(1)`,
                 transitionDelay: isFused ? `${p.id * 0.1}s` : '0s'
               }}
             >
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
             </div>
           ))}

           {/* Energy Arcs when fused */}
           <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${isFused ? 'opacity-40' : 'opacity-0'}`}>
              {particles.map((p) => (
                <line 
                  key={p.id} 
                  x1="50%" y1="50%" 
                  x2="50%" y2="50%" 
                  stroke="#f43f5e" 
                  strokeWidth="1" 
                  strokeDasharray="4 4"
                  className="transition-all duration-1000"
                  style={{ transform: `rotate(${p.id * 72}deg) translateY(-80px)`, transformOrigin: '50% 50%' }}
                />
              ))}
           </svg>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isFused ? 'bg-rose-500 animate-ping' : 'bg-zinc-800'}`} />
              <span className="text-[9px] font-tech text-zinc-400 uppercase tracking-[0.3em]">Atomic_Alignment_System</span>
           </div>
        </div>
      </div>
    </section>
  );
};
