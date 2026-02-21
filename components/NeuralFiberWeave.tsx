import React, { useState, useContext, useEffect, useRef } from 'react';
import { Wind, Activity, Zap, Move, Target, Radio } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralFiberWeave: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    let start = 0;
    const animate = () => {
      start += 0.02;
      setTime(start);
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
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#080808]" id="fiber-weave">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-600 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Elastic_Intelligence
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Neural <br /><span className="text-emerald-500">Fiber_Weave.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces should have flow. This weave simulates biological fibers that maintain a constant harmonic motion, instantly deforming when disrupted by user interaction to visualize kinetic energy.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/5 flex flex-col gap-2">
                <Wind className="w-5 h-5 text-emerald-500" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Flow_Tension</div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">0.42_LOW</div>
             </div>
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/5 flex flex-col gap-2">
                <Activity className="w-5 h-5 text-indigo-500 animate-pulse" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Harmonic_Freq</div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">12_HZ</div>
             </div>
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({x: 0.5, y: 0.5})}
          className="flex-[1.5] w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-none"
        >
           {/* Fiber SVG Weave */}
           <svg className="w-full h-full pointer-events-none opacity-40">
              {[...Array(12)].map((_, i) => {
                const x = (i / 11) * 100;
                const offset = Math.sin(time + i) * 15;
                const distToMouse = Math.abs(x - (mousePos.x * 100));
                const repulsion = distToMouse < 20 ? (20 - distToMouse) * (x < mousePos.x * 100 ? -2 : 2) : 0;
                
                return (
                  <path 
                    key={i}
                    d={`M ${x + offset + repulsion},0 Q ${x + offset + repulsion / 2},50% ${x + offset + repulsion},100%`}
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="0.8"
                    className="transition-all duration-300 ease-out"
                    style={{ opacity: 0.8 - (distToMouse / 100) }}
                  />
                );
              })}
           </svg>

           {/* Interaction Core */}
           <div 
             className="absolute w-24 h-24 bg-white/5 border border-white/20 rounded-full backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all duration-150 ease-out"
             style={{ left: `calc(${mousePos.x * 100}% - 48px)`, top: `calc(${mousePos.y * 100}% - 48px)` }}
           >
              <Target className="w-6 h-6 text-emerald-500/40 animate-pulse" />
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold mb-1">Weave_Calibration: AUTO</div>
              <div className="text-[8px] font-mono text-zinc-500 uppercase">Buffer_State: NOMINAL</div>
           </div>
        </div>
      </div>
    </section>
  );
};
