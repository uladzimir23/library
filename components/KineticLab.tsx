
import React, { useState, useEffect, useRef } from 'react';
import { Activity, Move, RefreshCw, Weight, Zap, Box, Hand, Sliders, Gauge, Wind, Target } from 'lucide-react';
import { playUISound } from '../wooden/components/AudioService';

export const KineticLab: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [stiffness, setStiffness] = useState(0.15);
  const [damping, setDamping] = useState(0.8);
  const [mass, setMass] = useState(1.0);
  const [friction, setFriction] = useState(0.05);
  
  const velocity = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    const update = () => {
      if (!isDragging) {
        // Учет массы в расчете ускорения (F = ma => a = F/m)
        const ax = (-stiffness * position.x) / mass;
        const ay = (-stiffness * position.y) / mass;
        
        // Применяем затухание и трение
        velocity.current.x = (velocity.current.x + ax) * (damping - friction);
        velocity.current.y = (velocity.current.y + ay) * (damping - friction);
        
        setPosition(prev => ({
          x: prev.x + velocity.current.x,
          y: prev.y + velocity.current.y
        }));
      }
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isDragging, position, stiffness, damping, mass, friction]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      setPosition({
        x: position.x + e.movementX,
        y: position.y + e.movementY
      });
      velocity.current = { x: e.movementX, y: e.movementY };
    }
  };

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/50 animate-pulse" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40 text-rose-500">Kinetic_Drive_Workbench_v8.4</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Physics_Engine: MULTIBODY_SOLVER</div>
            <div className="w-12 h-1 bg-rose-500/20 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50 overflow-y-auto custom-scroll">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-rose-500">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Константы_Материи</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Жесткость (Stiffness)</span>
                     <span className="text-rose-500">{(stiffness * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.01" max="0.5" step="0.01" value={stiffness} onChange={e => setStiffness(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-rose-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Масса_Объекта</span>
                     <span className="text-rose-500">{mass.toFixed(1)}kg</span>
                  </div>
                  <input type="range" min="0.1" max="5.0" step="0.1" value={mass} onChange={e => setMass(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-rose-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Трение_Воздуха</span>
                     <span className="text-rose-500">{(friction * 100).toFixed(1)}%</span>
                  </div>
                  <input type="range" min="0" max="0.2" step="0.005" value={friction} onChange={e => setFriction(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-rose-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-rose-500">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">Inertial_Energy</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{(Math.hypot(velocity.current.x, velocity.current.y) * mass * 10).toFixed(2)}_KJ</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           onMouseUp={() => setIsDragging(false)}
           onMouseLeave={() => setIsDragging(false)}
           className="flex-1 bg-[#080202] relative overflow-hidden flex items-center justify-center group shadow-inner cursor-grab active:cursor-grabbing"
         >
            {/* Field Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f43f5e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Displacement Shadow */}
            <div 
              className="absolute w-[400px] h-[400px] bg-rose-500/5 blur-[100px] rounded-full transition-all duration-700 ease-out"
              style={{ transform: `translate(${position.x * 0.5}px, ${position.y * 0.5}px)` }}
            />

            {/* Force Vector (Visual Line) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-20">
               <line 
                  x1="50%" y1="50%" 
                  x2={`calc(50% + ${position.x}px)`} 
                  y2={`calc(50% + ${position.y}px)`} 
                  stroke="#f43f5e" 
                  strokeWidth="2" 
                  strokeDasharray="5 5"
               />
               {isDragging && (
                 <circle cx={`calc(50% + ${position.x}px)`} cy={`calc(50% + ${position.y}px)`} r="40" fill="none" stroke="#f43f5e" strokeWidth="1" className="animate-ping" />
               )}
            </svg>

            {/* THE PHYSICAL OBJECT */}
            <div 
              onMouseDown={() => { setIsDragging(true); playUISound('click'); }}
              className="relative w-72 h-56 transition-all duration-75 preserve-3d"
              style={{ 
                transform: `translate(${position.x}px, ${position.y}px) rotateX(${-position.y * 0.05}deg) rotateY(${position.x * 0.05}deg) scale(${1 - Math.abs(position.x) * 0.0002})`,
              }}
            >
               <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[48px] shadow-2xl flex flex-col justify-between p-10 overflow-hidden">
                  <div className="flex justify-between items-start z-10">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-300 ${isDragging ? 'bg-rose-500 scale-110 shadow-rose-500/40' : 'bg-zinc-800'}`}>
                        <Weight className="w-7 h-7" />
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Mass_Unit</div>
                        <div className="text-xl font-tech font-bold text-white">{mass.toFixed(1)} KG</div>
                     </div>
                  </div>

                  <div className="z-10">
                     <div className="text-[9px] font-mono text-rose-500 uppercase tracking-[0.4em] mb-2 font-black">Matter_ID: 0xKINETIC</div>
                     <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter">Inertial_Slab</div>
                  </div>

                  {/* Surface Polish */}
                  <div className="absolute inset-0 border-t border-l border-white/20 rounded-[inherit] pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-40 pointer-events-none" />
               </div>
            </div>

            {/* COORDINATES HUD */}
            <div className="absolute bottom-12 left-12 flex flex-col gap-2">
               <div className="flex items-center gap-3 px-4 py-1.5 bg-zinc-900/80 border border-white/10 rounded-full">
                  <Wind className={`w-3 h-3 ${Math.hypot(velocity.current.x, velocity.current.y) > 2 ? 'text-rose-400 animate-pulse' : 'text-zinc-600'}`} />
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-black">Air_Resistance: {(friction*100).toFixed(1)}%</span>
               </div>
               <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">Vector: [{position.x.toFixed(0)}, {position.y.toFixed(0)}]</div>
            </div>

            <div className="absolute top-12 right-12">
               <div className="flex items-center gap-3 px-4 py-1.5 bg-zinc-900/80 border border-white/10 rounded-full">
                  <Target className="w-3 h-3 text-rose-400" />
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-black">Spring_Recoil: ACTIVE</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
