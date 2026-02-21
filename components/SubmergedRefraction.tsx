
import React, { useState, useContext, useRef } from 'react';
import { Waves as WavesIcon, Activity, Eye, Compass, Sliders, Droplets } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const SubmergedRefraction: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Local Settings
  const [depth, setDepth] = useState(60); // 0-100
  const [aberration, setAberration] = useState(15); // 0-50

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    }
  };

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500/50" />
            <div className="w-3 h-3 rounded-full bg-indigo-500/50" />
            <div className="w-3 h-3 rounded-full bg-zinc-500/50" />
         </div>
         <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Submerged_Optics_Workbench_v3.2</div>
         <div className="w-12 h-1 bg-current opacity-5 rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* LEFT SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-6">
               <div className="flex items-center gap-3 text-indigo-500 mb-6">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Оптика_Глубины</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Глубина_Слоя</span>
                     <span className="text-indigo-500">{depth}m</span>
                  </div>
                  <input 
                     type="range" min="10" max="200" step="5" 
                     value={depth}
                     onChange={(e) => setDepth(parseInt(e.target.value))}
                     className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
                  />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Аберрация</span>
                     <span className="text-indigo-500">{aberration}px</span>
                  </div>
                  <input 
                     type="range" min="0" max="50" step="1" 
                     value={aberration}
                     onChange={(e) => setAberration(parseInt(e.target.value))}
                     className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
                  />
               </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Описание_Стенда</h4>
              <p className="text-xs font-light leading-relaxed text-zinc-500 italic">
                Эффект погружения. Чем больше глубина, тем сильнее размываются границы контента и тем активнее проявляются каустические блики. Аберрация симулирует спектральное расщепление света в толще воды.
              </p>
            </div>

            <div className="mt-auto p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-[8px] font-mono text-zinc-500 uppercase">
               Refraction: 1.33_H2O<br />
               Caustics: CALCULATING
            </div>
         </div>

         {/* MAIN VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="flex-1 bg-zinc-950 relative overflow-hidden flex items-center justify-center group shadow-2xl border-white/5 cursor-none"
         >
           <svg className="absolute w-0 h-0">
             <filter id="water-turbulence-complex">
               <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="3" result="noise">
                  <animate attributeName="baseFrequency" dur="10s" values="0.01 0.05; 0.02 0.1; 0.01 0.05" repeatCount="indefinite" />
               </feTurbulence>
               <feDisplacementMap in="SourceGraphic" in2="noise" scale={aberration} />
             </filter>
           </svg>

           <div className="absolute inset-0 bg-sky-900/10 pointer-events-none" />
           <div 
              className="absolute w-full h-full opacity-20 pointer-events-none"
              style={{ 
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #38bdf8 0%, transparent 50%)`,
                filter: `blur(${40 + depth/2}px)`
              }}
           />
           
           <div className="text-center select-none" style={{ filter: 'url(#water-turbulence-complex)' }}>
              <h3 className="text-7xl md:text-9xl font-tech font-black text-sky-400/80 uppercase tracking-tighter"
                  style={{ opacity: 1 - depth/300 }}>
                SUBMERGED<br />LOGIC
              </h3>
              <div className="mt-4 flex gap-4 justify-center">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className="w-8 h-8 bg-sky-500/20 rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />
                 ))}
              </div>
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <Eye className="w-4 h-4 text-sky-500" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Deep_Scan: {depth}m</span>
           </div>
        </div>
      </div>
    </div>
  );
};
