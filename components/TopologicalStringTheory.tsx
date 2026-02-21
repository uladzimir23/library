import React, { useState, useContext, useRef } from 'react';
import { Activity, Target, Zap, Share2, Sliders, RefreshCw, Anchor } from 'lucide-react';
import { LanguageContext } from '../App';

export const TopologicalStringTheory: React.FC = () => {
  const { t } = useContext(LanguageContext);
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

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#050505]" id="string-theory">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Elastic_Hierarchy
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              String <br /><span className="text-sky-500">Topology_v1.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Connect components with tension. Our string engine generates dynamic spline links that bend and vibrate as you interact, visualizing the mechanical dependencies within the layout.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-black/5 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5">
                <Activity className="w-5 h-5 text-sky-500 mb-3" />
                <div className="text-[9px] font-bold text-zinc-400 uppercase">Tension_Load</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">0.42_STB</div>
             </div>
             <div className="p-6 bg-black/5 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5">
                <RefreshCw className="w-5 h-5 text-indigo-500 mb-3" />
                <div className="text-[9px] font-bold text-zinc-400 uppercase">Vibration_Sync</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">NOMINAL</div>
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({x:0.5, y:0.5})}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-none"
        >
           {/* The Tensioned Strings */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              {[
                { x: 20, y: 20 }, { x: 80, y: 20 },
                { x: 20, y: 80 }, { x: 80, y: 80 }
              ].map((anchor, i) => (
                <path 
                  key={i}
                  d={`M ${anchor.x}% ${anchor.y}% Q ${mousePos.x * 100}% ${mousePos.y * 100}% ${anchor.x}% ${anchor.y}%`}
                  fill="none" 
                  stroke="#0ea5e9" 
                  strokeWidth="1" 
                  strokeDasharray="4 4"
                  className="transition-all duration-300 ease-out"
                />
              ))}
           </svg>

           {/* Anchors */}
           {[
             { x: 20, y: 20 }, { x: 80, y: 20 },
             { x: 20, y: 80 }, { x: 80, y: 80 }
           ].map((anchor, i) => (
             <div 
               key={i}
               className="absolute w-12 h-12 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl flex items-center justify-center transition-transform duration-700"
               style={{ 
                 left: `${anchor.x}%`, 
                 top: `${anchor.y}%`,
                 transform: `translate(-50%, -50%) scale(${1 + Math.abs(mousePos.x - 0.5) * 0.2})`
               }}
             >
                <Anchor className="w-5 h-5 text-zinc-700" />
             </div>
           ))}

           {/* The Control Node */}
           <div 
             className="relative w-32 h-32 bg-sky-500 rounded-[40px] flex items-center justify-center text-white shadow-[0_0_80px_rgba(14,165,233,0.3)] transition-transform duration-100 ease-out z-20"
             style={{ 
               left: `${(mousePos.x - 0.5) * 100}px`, 
               top: `${(mousePos.y - 0.5) * 100}px`,
               rotate: `${(mousePos.x - 0.5) * 45}deg`
             }}
           >
              <Sliders className="w-12 h-12 animate-pulse" />
              <div className="absolute -top-10 bg-zinc-900 border border-white/10 px-3 py-1 rounded-full text-[8px] font-mono whitespace-nowrap">TOPOLOGY_DRIVE_0x1</div>
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <Share2 className="w-4 h-4 text-sky-500 animate-pulse" />
              <span className="text-[10px] font-tech text-zinc-400 uppercase tracking-[0.3em]">String_Calibration_Active</span>
           </div>
        </div>
      </div>
    </section>
  );
};