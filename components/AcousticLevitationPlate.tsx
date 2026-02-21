
import React, { useState, useRef, useEffect } from 'react';
import { Music, Zap, Activity, Waves } from 'lucide-react';

export const AcousticLevitationPlate: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [frequency, setFrequency] = useState(440);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  const nodes = Array.from({ length: 12 });

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="mb-20 flex justify-between items-end">
         <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.5em]">Acoustic_Levitation</span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
              Акустическая <br /><span className="text-sky-500">Левитация.</span>
            </h2>
         </div>
         <div className="text-right opacity-40 font-mono text-[10px] uppercase text-zinc-500">Carrier_Freq: {frequency}Hz</div>
      </div>

      <div className="relative h-[600px] bg-zinc-950 rounded-[64px] border border-white/5 overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl">
         {/* The Oscillating Surface */}
         <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#38bdf8 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
         
         {/* Levitation Nodes */}
         <div className="grid grid-cols-4 gap-12 relative z-10 preserve-3d">
            {nodes.map((_, i) => {
              const ix = i % 4;
              const iy = Math.floor(i / 4);
              const nodeX = (ix + 0.5) / 4;
              const nodeY = (iy + 0.5) / 3;
              
              const dx = mousePos.x - nodeX;
              const dy = mousePos.y - nodeY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const lift = Math.max(0, 1 - dist * 2);
              
              return (
                <div 
                  key={i}
                  className="w-20 h-20 relative transition-all duration-300 ease-out preserve-3d"
                  style={{ 
                    transform: `translateZ(${lift * 100}px) rotateX(${Math.sin(Date.now() / 100 + i) * lift * 10}deg) rotateY(${Math.cos(Date.now() / 100 + i) * lift * 10}deg)`,
                  }}
                >
                   {/* Shadow projection */}
                   <div 
                     className="absolute inset-0 bg-black/40 rounded-3xl blur-xl transition-all duration-300"
                     style={{ transform: `translateZ(${-lift * 100}px) scale(${1 - lift * 0.2})`, opacity: lift }}
                   />
                   
                   {/* The Floating Object */}
                   <div className={`absolute inset-0 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-2xl flex items-center justify-center shadow-2xl transition-colors duration-500 ${lift > 0.5 ? 'border-sky-500/50 bg-sky-500/5' : ''}`}>
                      <Zap className={`w-6 h-6 transition-all duration-500 ${lift > 0.5 ? 'text-sky-400 scale-110' : 'text-zinc-700'}`} />
                      
                      {/* High Frequency vibration lines */}
                      {lift > 0.7 && (
                        <div className="absolute inset-0 border border-sky-400/20 rounded-3xl animate-ping" />
                      )}
                   </div>
                </div>
              );
            })}
         </div>

         {/* Energy Field (HUD) */}
         <div 
           className="absolute w-64 h-64 border border-sky-500/20 rounded-full transition-transform duration-75 pointer-events-none"
           style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
         >
            <div className="absolute inset-0 bg-sky-500/5 rounded-full blur-[80px]" />
            <div className="absolute inset-0 border-2 border-dashed border-sky-500/10 rounded-full animate-spin-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <Music className="w-8 h-8 text-sky-500 animate-pulse" />
            </div>
         </div>

         <div className="absolute bottom-12 left-12 flex items-center gap-4">
            <Waves className="w-4 h-4 text-sky-500" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Acoustic_Pressure: {(Math.max(...nodes.map((_, i) => 1 - Math.sqrt(Math.pow(mousePos.x - ((i%4)+0.5)/4, 2) + Math.pow(mousePos.y - (Math.floor(i/4)+0.5)/3, 2)) * 2)) * 100).toFixed(1)}%</span>
         </div>
      </div>
    </div>
  );
};
