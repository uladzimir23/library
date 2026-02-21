import React, { useState, useContext, useRef, useEffect } from 'react';
import { Layers, Zap, Wind, Waves, Activity, MousePointer2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const BioMatterLattice: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    let start = 0;
    const animate = () => {
      start += 0.02;
      setPulse(Math.sin(start));
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#080808]" id="bio-matter">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-600 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Synthetic_Biology
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Bio-Matter <br /><span className="text-emerald-500">Lattice.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are soft bodies. Our Bio-Matter engine simulates a tensioned lattice that automatically expands and contracts, imitating the respiratory rhythm of organic life.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[40px] border border-black/5 dark:border-white/5 flex flex-col gap-2">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Respiration</div>
                <div className="text-2xl font-tech font-bold text-emerald-500 uppercase">{((pulse + 1) * 50).toFixed(0)}%</div>
             </div>
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[40px] border border-black/5 dark:border-white/5 flex flex-col gap-2">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Elasticity</div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase">ADAPTIVE</div>
             </div>
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group perspective-2000 shadow-2xl"
        >
           {/* Breathing Membrane Background */}
           <div 
             className="absolute inset-0 transition-all duration-1000 ease-out opacity-20"
             style={{ 
               background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, #10b981 0%, transparent 60%)`,
               transform: `scale(${1 + pulse * 0.1})`
             }}
           />

           {/* The Responsive 3D Grid */}
           <div 
             className="relative w-full h-full flex items-center justify-center preserve-3d transition-transform duration-300"
             style={{ transform: `rotateX(${(mousePos.y - 0.5) * -20}deg) rotateY(${(mousePos.x - 0.5) * 20}deg)` }}
           >
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute border border-white/10 rounded-[64px] backdrop-blur-xl transition-all duration-1000 ease-in-out"
                  style={{ 
                    width: `${300 + i * 40}px`,
                    height: `${400 + i * 40}px`,
                    transform: `translateZ(${i * -50 * (1 + pulse * 0.2)}px)`,
                    opacity: 1 - i * 0.15,
                    backgroundColor: `rgba(255,255,255, ${0.02 + i * 0.01})`
                  }}
                >
                   {i === 0 && (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Waves className="w-12 h-12 text-emerald-500 opacity-40 animate-pulse" />
                     </div>
                   )}
                </div>
              ))}
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold mb-1">Memebrane_Sync: ACTIVE</div>
              <div className="text-[8px] font-mono text-zinc-500 uppercase">Buffer_Coord_Z: {pulse.toFixed(3)}</div>
           </div>
        </div>
      </div>
    </section>
  );
};
