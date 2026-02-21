
import React, { useState, useEffect, useRef } from 'react';
import { Anchor, Activity, Zap, Move, RefreshCw } from 'lucide-react';

export const InertialMomentumSlab: React.FC = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [vel, setVel] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let frame: number;
    const update = () => {
      if (!isDragging) {
        // Spring physics (Hooke's Law)
        const stiffness = 0.12;
        const damping = 0.85;

        const ax = -stiffness * pos.x;
        const ay = -stiffness * pos.y;

        const newVelX = (vel.x + ax) * damping;
        const newVelY = (vel.y + ay) * damping;

        setVel({ x: newVelX, y: newVelY });
        setPos(prev => ({ x: prev.x + newVelX, y: prev.y + newVelY }));
      }
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [pos, vel, isDragging]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && isDragging) {
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      setPos({ x: cx, y: cy });
    }
  };

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove} onMouseUp={() => setIsDragging(false)} onMouseLeave={() => setIsDragging(false)}>
      <div className="mb-20 flex justify-between items-end">
         <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.5em]">Inertial_Spring_Physics</span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
              Инерционная <br /><span className="text-rose-500">Плита.</span>
            </h2>
         </div>
         <div className="flex gap-4">
            <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl flex flex-col items-end">
               <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Momentum</div>
               <div className="text-xl font-tech font-bold text-rose-500">{Math.sqrt(vel.x * vel.x + vel.y * vel.y).toFixed(2)} KG·M/S</div>
            </div>
         </div>
      </div>

      <div className="relative h-[600px] bg-zinc-950 rounded-[64px] border border-white/5 overflow-hidden flex items-center justify-center group shadow-2xl perspective-2000">
         {/* Anchor Point Marker */}
         <div className="absolute w-2 h-2 bg-rose-500/20 rounded-full blur-[2px]" />
         
         {/* The Heavy Slab */}
         <div 
           onMouseDown={() => setIsDragging(true)}
           className={`relative w-96 h-64 cursor-grab active:cursor-grabbing transition-shadow duration-300 preserve-3d will-change-transform
             ${isDragging ? 'shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)]' : 'shadow-2xl'}`}
           style={{ 
             transform: `translate3d(${pos.x}px, ${pos.y}px, ${isDragging ? '100px' : '0px'}) rotateX(${-pos.y * 0.05}deg) rotateY(${pos.x * 0.05}deg)`,
           }}
         >
            <div className="absolute inset-0 bg-white/5 border-2 border-white/10 rounded-[48px] backdrop-blur-3xl p-12 flex flex-col justify-between overflow-hidden">
               {/* Internal Content */}
               <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-3xl bg-rose-600 flex items-center justify-center text-white shadow-xl">
                     <Anchor className={`w-8 h-8 ${isDragging ? 'animate-pulse' : ''}`} />
                  </div>
                  <div className="text-right opacity-30">
                     <div className="text-[10px] font-mono text-zinc-500 uppercase">Mass_ID</div>
                     <div className="text-xs font-bold text-white">4.20_UNIT</div>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div className="text-3xl font-tech font-bold text-white uppercase tracking-widest">Active_Drift</div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-rose-500 transition-all duration-100" style={{ width: `${Math.min(100, Math.sqrt(pos.x*pos.x + pos.y*pos.y) / 2)}%` }} />
                  </div>
               </div>

               {/* Edge Polish */}
               <div className="absolute inset-0 border-t border-l border-white/20 rounded-[inherit] pointer-events-none" />
            </div>
         </div>

         {/* Force Tether Visual */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-20">
            <line 
               x1="50%" y1="50%" 
               x2={`calc(50% + ${pos.x}px)`} 
               y2={`calc(50% + ${pos.y}px)`} 
               stroke="#f43f5e" 
               strokeWidth="2" 
               strokeDasharray="5 5" 
               className="transition-all duration-75"
            />
         </svg>

         <div className="absolute bottom-12 left-12 flex items-center gap-3">
            <RefreshCw className={`w-4 h-4 text-rose-500 ${!isDragging ? 'animate-spin-slow' : ''}`} />
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black">Equilibrium_Search: {isDragging ? 'SUSPENDED' : 'ACTIVE'}</span>
         </div>
      </div>
    </div>
  );
};
