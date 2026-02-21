
import React, { useState, useContext, useRef } from 'react';
import { Target, Zap, Activity, Sliders, Maximize, MousePointer2, Move, Box } from 'lucide-react';
import { LanguageContext } from '../App';

export const WeightedPressureGrid: React.FC = () => {
  const { t, isDiagnostic } = useContext(LanguageContext);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left),
        y: (e.clientY - rect.top)
      });
    }
  };

  const tiles = [
    { label: 'Compute', icon: Zap, val: '0.84_U' },
    { label: 'Shield', icon: Target, val: 'ACTIVE' },
    { label: 'Sync', icon: Activity, val: '99.8%' },
    { label: 'Load', icon: Sliders, val: '12ms' }
  ];

  return (
    <div className="scroll-mt-24">
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Physics_v17.Pressure
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Весовая <br /><span className="text-rose-500">Сетка.</span>
         </h2>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIdx(null)}
        className="relative min-h-[600px] bg-zinc-100 dark:bg-zinc-950/40 rounded-[80px] border border-black/5 dark:border-white/5 overflow-hidden flex items-center justify-center p-20 shadow-inner group"
      >
         {/* Background Static Grid */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl relative z-10 perspective-2000">
            {tiles.map((tile, i) => {
               const tileRef = useRef<HTMLDivElement>(null);
               const [pressure, setPressure] = useState(0);

               const updatePressure = (e: React.MouseEvent) => {
                  const rect = tileRef.current?.getBoundingClientRect();
                  if (rect) {
                     const centerX = rect.left + rect.width / 2;
                     const centerY = rect.top + rect.height / 2;
                     const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
                     const maxDist = 300;
                     setPressure(Math.max(0, 1 - dist / maxDist));
                  }
               };

               return (
                 <div 
                   key={i}
                   ref={tileRef}
                   onMouseMove={updatePressure}
                   onMouseEnter={() => setHoveredIdx(i)}
                   onMouseLeave={() => { setHoveredIdx(null); setPressure(0); }}
                   className="relative h-64 transition-all duration-300 ease-out preserve-3d"
                   style={{ 
                      transform: `translateZ(${-pressure * 50}px) rotateX(${pressure * mousePos.y * 0.01}deg) rotateY(${pressure * mousePos.x * 0.01}deg)` 
                   }}
                 >
                    {/* Shadow Layer - Changes based on pressure */}
                    <div 
                      className="absolute inset-0 bg-black/20 rounded-[48px] blur-2xl transition-all duration-300"
                      style={{ transform: `translateY(${pressure * 20}px) scale(${1 - pressure * 0.1})`, opacity: pressure }}
                    />

                    {/* Main Card Surface */}
                    <div className={`absolute inset-0 bg-white/60 dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-[48px] p-10 flex flex-col justify-between shadow-2xl transition-colors duration-500 ${hoveredIdx === i ? 'border-rose-500/30' : ''}`}>
                       <div className="flex justify-between items-start">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${hoveredIdx === i ? 'bg-rose-600 text-white shadow-lg' : 'bg-black/5 dark:bg-white/5 text-zinc-500'}`}>
                             <tile.icon className={`w-7 h-7 ${hoveredIdx === i ? 'animate-pulse' : ''}`} />
                          </div>
                          {isDiagnostic && (
                             <div className="text-[9px] font-mono text-rose-500 font-bold uppercase tracking-widest">
                                Load: {(pressure * 10).toFixed(1)}N
                             </div>
                          )}
                       </div>
                       
                       <div>
                          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-1">{tile.label}</div>
                          <div className="text-3xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">{tile.val}</div>
                       </div>

                       {/* Surface indentation lines */}
                       <div className={`absolute inset-6 border border-rose-500/10 rounded-[32px] transition-opacity duration-500 ${pressure > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                 </div>
               );
            })}
         </div>

         {/* Interactive Pointer Info (HUD) */}
         <div 
           className="absolute pointer-events-none transition-opacity duration-300 z-50"
           style={{ left: mousePos.x, top: mousePos.y, opacity: hoveredIdx !== null ? 1 : 0 }}
         >
            <div className="relative">
               <div className="absolute top-6 left-6 whitespace-nowrap font-mono text-[9px] text-rose-500 uppercase bg-black/80 px-2 py-1 rounded shadow-xl">
                  WEIGHT_INJECTION: TRUE
               </div>
            </div>
         </div>

         <div className="absolute bottom-12 right-12 flex items-center gap-4 text-zinc-500/40">
            <Move className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Physics_Engine: NOMINAL</span>
         </div>
      </div>
    </div>
  );
};
