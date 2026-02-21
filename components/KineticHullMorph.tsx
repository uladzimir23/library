import React, { useState, useContext, useRef } from 'react';
import { Maximize2, Target, Shield, Activity, Fingerprint, Layers } from 'lucide-react';
import { LanguageContext } from '../App';

export const KineticHullMorph: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="hull-morph">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Elastic_Armor
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Kinetic <br /><span className="text-rose-500">Hull_Morph.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              UI surfaces are resilient. Our hull-morphing engine creates a reactive boundary that bends and compresses, simulating the displacement of a soft, refractive gel-like material.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-zinc-900 rounded-[40px] border border-black/5 dark:border-white/5 flex items-center justify-between shadow-sm">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500">
                   <Shield className="w-7 h-7" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Displacement</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Active_Gel</div>
                </div>
             </div>
             <Activity className="w-6 h-6 text-rose-500 animate-pulse" />
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({x:0, y:0})}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-none"
        >
           {/* Displacement Shadow */}
           <div 
             className="absolute w-[400px] h-[400px] bg-rose-500/5 blur-[100px] rounded-full transition-transform duration-700 ease-out"
             style={{ transform: `translate(${mousePos.x * 200}px, ${mousePos.y * 200}px)` }}
           />

           <div 
             className="relative w-80 h-96 transition-all duration-300 ease-out backdrop-blur-3xl border border-white/20 bg-white/5 shadow-2xl flex flex-col items-center justify-center p-12 overflow-hidden"
             style={{ 
               transform: `rotateX(${mousePos.y * -20}deg) rotateY(${mousePos.x * 20}deg) scale(${1 - Math.abs(mousePos.x) * 0.1})`,
               borderRadius: `${50 + mousePos.y * 30}% ${50 - mousePos.y * 30}% ${50 - mousePos.x * 30}% ${50 + mousePos.x * 30}% / ${50 - mousePos.x * 30}% ${50 + mousePos.x * 30}% ${50 + mousePos.y * 30}% ${50 - mousePos.y * 30}%`
             }}
           >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-rose-500/5 opacity-40 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center gap-8">
                 <div className="w-20 h-20 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-xl transition-all duration-700 group-hover:scale-110">
                    <Fingerprint className="w-10 h-10" />
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-2">Matter_Density</div>
                    <div className="text-2xl font-tech font-bold text-white uppercase tracking-widest">
                       Refractive
                    </div>
                 </div>
              </div>
           </div>

           {/* Custom Cursor */}
           <div 
             className="absolute w-12 h-12 border border-rose-500/30 rounded-full flex items-center justify-center pointer-events-none transition-transform duration-75"
             style={{ left: `calc(50% + ${mousePos.x * 100}% - 24px)`, top: `calc(50% + ${mousePos.y * 100}% - 24px)` }}
           >
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
           </div>
        </div>
      </div>
    </section>
  );
};