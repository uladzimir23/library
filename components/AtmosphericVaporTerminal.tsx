
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Cloud, Wind, Droplets, Activity, Terminal, Thermometer, Shield, Radio, Zap, Sliders } from 'lucide-react';
import { LanguageContext } from '../App';

export const AtmosphericVaporTerminal: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [density, setDensity] = useState(0.4);
  const [temp, setTemp] = useState(24);
  const [particles, setParticles] = useState<string[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const p = `PARTICLE_0x${Math.random().toString(16).slice(2, 6).toUpperCase()}: ${Math.random() > 0.5 ? 'DRIFT' : 'SETTLE'}`;
      setParticles(prev => [p, ...prev.slice(0, 8)]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <svg className="absolute w-0 h-0">
        <filter id="vapor-complex-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10" result="goo" />
        </filter>
      </svg>

      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Environment_Module_v12
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Атмосферный <br /><span className="text-sky-500">Терминал.</span>
         </h2>
      </div>

      <div 
        className="relative w-full h-[700px] bg-zinc-950 rounded-[80px] border border-white/5 overflow-hidden shadow-2xl flex flex-col lg:flex-row p-8 gap-8"
      >
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.03)_0%,transparent_50%)]" />

         {/* 1. LEFT: GAS COMPOSITION */}
         <div className="w-full lg:w-80 flex flex-col gap-6 bg-white/5 border border-white/10 rounded-[48px] p-8 backdrop-blur-2xl">
            <div className="flex items-center gap-3 mb-4">
               <Cloud className="w-5 h-5 text-sky-400" />
               <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Vapor_Mix_Log</span>
            </div>
            
            <div className="flex-1 space-y-2 font-mono text-[9px] text-zinc-600 overflow-hidden">
               {particles.map((p, i) => (
                 <div key={i} className="animate-in fade-in slide-in-from-left-2 opacity-80">{p}</div>
               ))}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-6">
               <div className="space-y-3">
                  <div className="flex justify-between text-[8px] font-bold text-zinc-500 uppercase">
                     <span>Density_Delta</span>
                     <span className="text-sky-500">{(density * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="1" step="0.01" value={density}
                    onChange={e => setDensity(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-sky-500"
                  />
               </div>
            </div>
         </div>

         {/* 2. CENTER: CLOUD CORE SIMULATION */}
         <div className="flex-1 bg-white/5 border border-white/10 rounded-[64px] relative flex items-center justify-center p-12 overflow-hidden group/vapor shadow-inner">
            <div className="absolute inset-0 pointer-events-none" style={{ filter: 'url(#vapor-complex-goo)' }}>
               {/* Simulated Moving Clouds */}
               {[...Array(5)].map((_, i) => (
                 <div 
                   key={i}
                   className="absolute rounded-full transition-all duration-[3000ms] ease-in-out"
                   style={{ 
                     width: `${200 + i * 40}px`, 
                     height: `${200 + i * 40}px`,
                     left: `${50 + (mousePos.x * (100 + i * 10))}%`,
                     top: `${50 + (mousePos.y * (100 + i * 10))}%`,
                     transform: 'translate(-50%, -50%)',
                     backgroundColor: `rgba(14, 165, 233, ${0.05 * density})`,
                     filter: `blur(${20 + i * 10}px)`
                   }}
                 />
               ))}
            </div>

            <div className="relative z-10 text-center">
               <div className="w-24 h-24 bg-sky-600/10 border border-sky-400/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl backdrop-blur-3xl animate-pulse">
                  <Wind className="w-10 h-10 text-sky-400" />
               </div>
               <div className="text-3xl font-tech font-bold text-white uppercase tracking-widest">A-GAS_STABLE</div>
               <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mt-2">Viscosity: 0.124_Stokes</div>
            </div>
         </div>

         {/* 3. RIGHT: BAROMETRICS & GAUGES */}
         <div className="w-full lg:w-80 flex flex-col gap-6">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex-1 flex flex-col justify-between shadow-2xl relative">
               <div className="flex items-center gap-3">
                  <Thermometer className="w-5 h-5 text-sky-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Atmospheric_HUD</span>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-3xl border border-white/5">
                     <div className="text-[8px] font-bold text-zinc-500 uppercase mb-2">Temp</div>
                     <div className="text-xl font-tech font-bold text-white">{temp.toFixed(1)}°C</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-3xl border border-white/5">
                     <div className="text-[8px] font-bold text-zinc-500 uppercase mb-2">Pressure</div>
                     <div className="text-xl font-tech font-bold text-sky-500">1013_hPa</div>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Temperature_Calib</div>
                  <input 
                    type="range" min="0" max="100" step="1" value={temp}
                    onChange={e => setTemp(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-sky-500"
                  />
               </div>

               <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-emerald-500">
                     <Shield className="w-4 h-4" />
                     <span className="text-[8px] font-mono uppercase">Seal_Intact</span>
                  </div>
                  <button className="p-2 bg-sky-600 rounded-xl text-white shadow-lg"><Zap className="w-4 h-4" /></button>
               </div>
            </div>

            <div className="bg-sky-500/10 border border-sky-500/20 rounded-[48px] p-8 h-40 backdrop-blur-2xl flex flex-col justify-center gap-2">
               <div className="flex items-center gap-3 text-sky-400">
                  <Radio className="w-5 h-5 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Global_Sync</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase tracking-tighter">0xSKY_CORE</div>
            </div>
         </div>
      </div>
    </div>
  );
};
