
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Orbit, Zap, Activity, Radio, Share2, Target, Globe, Maximize2, Compass, Shield } from 'lucide-react';
import { LanguageContext } from '../App';

export const GravitationalNexusHub: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mass, setMass] = useState(0.5);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + (mass * 2));
    }, 20);
    return () => clearInterval(interval);
  }, [mass]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5
      });
    }
  };

  const satellites = [
    { label: 'Storage', icon: Globe, angle: 0 },
    { label: 'Compute', icon: Zap, angle: 120 },
    { label: 'Network', icon: Radio, angle: 240 }
  ];

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Celestial_Registry_v12
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Гравитационный <br /><span className="text-amber-500">Нексус.</span>
         </h2>
      </div>

      <div 
        className="relative w-full h-[700px] bg-zinc-950 rounded-[80px] border border-white/5 overflow-hidden shadow-2xl flex flex-col p-8 gap-8 transition-transform duration-1000 ease-out"
        style={{ transform: `rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)` }}
      >
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.02)_0%,transparent_70%)]" />

         <div className="flex-1 flex flex-col lg:flex-row gap-8 relative z-10">
            {/* 1. LEFT: ORBITAL CONFIG */}
            <div className="w-full lg:w-80 space-y-6">
               <div className="bg-white/5 border border-white/10 rounded-[48px] p-8 backdrop-blur-2xl h-full flex flex-col gap-8">
                  <div className="flex items-center gap-3">
                     <Orbit className="w-5 h-5 text-amber-400" />
                     <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Gravity_Field</span>
                  </div>
                  
                  <div className="space-y-8 flex-1">
                     <div className="space-y-4">
                        <div className="flex justify-between text-[8px] font-bold text-zinc-500 uppercase tracking-widest">
                           <span>Event_Horizon_Mass</span>
                           <span className="text-amber-500">{(mass * 10).toFixed(2)}_M</span>
                        </div>
                        <input 
                          type="range" min="0.1" max="1" step="0.01" value={mass}
                          onChange={e => setMass(parseFloat(e.target.value))}
                          className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500"
                        />
                     </div>

                     <div className="p-6 bg-zinc-900 rounded-3xl space-y-4 border border-white/5">
                        <div className="flex items-center gap-4 text-amber-500 animate-pulse">
                           <Shield className="w-4 h-4" />
                           <span className="text-[8px] font-bold uppercase">Stability_Locked</span>
                        </div>
                        <div className="text-2xl font-tech font-bold text-white uppercase">99.8_SG</div>
                     </div>
                  </div>
                  
                  <div className="pt-6 border-t border-white/5">
                     <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Warp_Index: 0x88.2</div>
                  </div>
               </div>
            </div>

            {/* 2. CENTER: SINGULARITY CORE (3D) */}
            <div className="flex-1 bg-zinc-900/40 border border-white/5 rounded-[64px] relative flex items-center justify-center p-12 overflow-hidden shadow-inner group/nexus">
               {/* Orbital Tracks Visual */}
               <div className="absolute w-[450px] h-[450px] border border-white/5 rounded-full" />
               <div className="absolute w-[300px] h-[300px] border border-amber-500/10 rounded-full transition-all duration-1000 group-hover/nexus:scale-110" />

               {/* Black Hole Core */}
               <div className="relative w-48 h-48 bg-black rounded-full shadow-[0_0_100px_rgba(245,158,11,0.2)] flex items-center justify-center z-10 border border-amber-500/20 group-hover/nexus:scale-105 transition-transform duration-1000">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 via-transparent to-rose-600/30 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-white rounded-full blur-[2px] animate-ping" />
                  <div className="absolute inset-[-20px] border border-dashed border-amber-500/20 rounded-full animate-spin-slow" />
               </div>

               {/* Satellite Nodes */}
               <div className="absolute inset-0 pointer-events-none" style={{ transform: `rotate(${rotation}deg)` }}>
                  {satellites.map((s, i) => (
                    <div 
                      key={i} 
                      className="absolute top-1/2 left-1/2"
                      style={{ transform: `translate(-50%, -50%) rotate(${s.angle}deg) translateY(-200px) rotate(-${rotation + s.angle}deg)` }}
                    >
                       <div className="w-16 h-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl flex flex-col items-center justify-center shadow-2xl transition-all duration-500 group-hover/nexus:border-amber-500/50">
                          <s.icon className="w-6 h-6 text-amber-500/60" />
                       </div>
                       <div className="absolute top-1/2 left-1/2 w-[200px] h-[1px] bg-gradient-to-r from-amber-500/20 to-transparent origin-left rotate-90 -translate-y-[-10px] pointer-events-none" />
                    </div>
                  ))}
               </div>
            </div>

            {/* 3. RIGHT: VECTOR HUD */}
            <div className="w-full lg:w-80 flex flex-col gap-8">
               <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex-1 flex flex-col justify-between shadow-2xl">
                  <div className="flex items-center gap-3">
                     <Compass className="w-5 h-5 text-indigo-400" />
                     <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Vector_Scan</span>
                  </div>
                  
                  <div className="font-mono text-[9px] text-zinc-500 space-y-4">
                     <div>COORD_X: {mousePos.x.toFixed(4)}</div>
                     <div>COORD_Y: {mousePos.y.toFixed(4)}</div>
                     <div>MASS_CAL: {mass.toFixed(3)}_SUNS</div>
                     <div className="pt-4 border-t border-white/5 text-amber-500 font-bold uppercase">Singularity_Status: OK</div>
                  </div>

                  <div className="pt-6">
                     <button className="w-full py-4 bg-amber-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-amber-500 transition-all shadow-xl shadow-amber-500/20">
                        <Maximize2 className="w-4 h-4" /> Expand_Horizon
                     </button>
                  </div>
               </div>

               <div className="h-40 bg-white/5 border border-white/10 rounded-[48px] p-8 flex items-center justify-between group overflow-hidden">
                  <div className="space-y-1">
                     <div className="text-[8px] font-mono text-zinc-600 uppercase">System_Load</div>
                     <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter">1.21 GW</div>
                  </div>
                  <Share2 className="w-8 h-8 text-zinc-800 transition-all duration-700 group-hover:text-amber-500 group-hover:scale-110" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
