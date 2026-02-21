import React, { useState, useContext, useRef } from 'react';
import { Scissors, Zap, Database, Activity, Cpu, Shield } from 'lucide-react';
import { LanguageContext } from '../App';

export const PhaseShredder: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [hoverLevel, setHoverLevel] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const slices = Array.from({ length: 12 });

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="shredder">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Mechanical_Deconstruction
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Phase <span className="text-rose-500">Shredder.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-4">
              Physicality deconstructed. Hovering the material triggers a phase shift that slices the object into coherent data planes, revealing the internal neural architecture.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 space-y-6">
             <div className="flex justify-between items-center text-rose-500">
                <div className="flex items-center gap-3">
                   <Scissors className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Shred_Intensity</span>
                </div>
                <span className="font-mono text-xs">{(hoverLevel * 100).toFixed(0)}%</span>
             </div>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${hoverLevel * 100}%` }} />
             </div>
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHoverLevel(1)}
          onMouseLeave={() => { setHoverLevel(0); setMousePos({x:0, y:0}); }}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group cursor-crosshair shadow-2xl"
        >
           {/* Internal Data Stream (Behind slices) */}
           <div className="absolute inset-0 flex flex-col justify-center items-center opacity-40 pointer-events-none">
              <div className="text-[10px] font-mono text-rose-500/60 animate-pulse">0x882_DATA_FETCHING_...</div>
              <Activity className="w-12 h-12 text-rose-500/20 mt-4 animate-bounce" />
           </div>

           {/* Shredded Slices */}
           <div className="relative w-80 h-96 preserve-3d">
              {slices.map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 border-x border-white/10 transition-all duration-500 ease-out"
                  style={{ 
                    clipPath: `inset(${(i * 100) / slices.length}% 0 ${100 - ((i + 1) * 100) / slices.length}% 0)`,
                    transform: `translateX(${hoverLevel * (i % 2 === 0 ? 40 : -40) * Math.abs(mousePos.x + 0.5)}px) translateZ(${i * 2}px)`,
                    backgroundColor: `rgba(255, 255, 255, ${0.05 + (i * 0.01)})`,
                    backdropFilter: `blur(${hoverLevel * 20}px)`,
                  }}
                >
                   {/* Glow on slice edges */}
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-rose-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}

              {/* Core Icon Pulse */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className={`w-20 h-20 rounded-3xl bg-rose-600 flex items-center justify-center text-white shadow-2xl transition-all duration-700 ${hoverLevel ? 'scale-110 opacity-100' : 'scale-50 opacity-0'}`}>
                    <Cpu className="w-10 h-10 animate-spin-slow" />
                 </div>
              </div>
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${hoverLevel ? 'bg-rose-500 animate-ping' : 'bg-zinc-800'}`} />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Buffer_Shredding_ID: {hoverLevel ? '0x8A' : 'STABLE'}</span>
           </div>
        </div>
      </div>
    </section>
  );
};
