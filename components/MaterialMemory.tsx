
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Fingerprint, Activity, Timer, Zap, Waves, Move, Sliders, Gauge, Target, RefreshCw } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const MaterialMemory: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [points, setPoints] = useState<{ x: number, y: number, id: number, age: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [elasticity, setElasticity] = useState(0.88);
  const [recoveryRate, setRecoveryRate] = useState(0.05); // 0.01 to 0.1
  const containerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });

    // Добавляем точку деформации при быстром движении или клике
    if (Math.random() > (1.1 - elasticity)) {
      setPoints(prev => [
        ...prev.slice(-20), 
        { x: x * 100, y: y * 100, id: nextId.current++, age: 0 }
      ]);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPoints(prev => prev.map(p => ({ ...p, age: p.age + recoveryRate })).filter(p => p.age < 1));
    }, 50);
    return () => clearInterval(timer);
  }, [recoveryRate]);

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40 text-amber-500">Elastic_Memory_Workbench_v6.2</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Memory_Buffer: {(points.length/20 * 100).toFixed(0)}%</div>
            <div className="w-12 h-1 bg-amber-500/20 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[750px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50 overflow-y-auto custom-scroll">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-amber-500">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Параметры_Памяти</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Эластичность (Flex)</span>
                     <span className="text-amber-500">{(elasticity * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.01" value={elasticity} onChange={e => setElasticity(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Скорость_Восстановл.</span>
                     <span className="text-amber-500">{(recoveryRate * 1000).toFixed(0)}ms</span>
                  </div>
                  <input type="range" min="0.01" max="0.15" step="0.005" value={recoveryRate} onChange={e => setRecoveryRate(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-amber-500">
                  <RefreshCw className={`w-4 h-4 ${points.length > 0 ? 'animate-spin' : ''}`} />
                  <span className="text-[9px] font-bold uppercase">Surface_State</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{points.length > 0 ? 'Recovering' : 'Resting'}</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
           className="flex-1 bg-[#080502] relative overflow-hidden flex items-center justify-center group shadow-inner cursor-none"
         >
            {/* The Warp Grid Visual */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

            {/* Deformation Point Cloud */}
            <div className="absolute inset-0">
               {points.map(p => (
                 <div 
                   key={p.id}
                   className="absolute w-32 h-32 rounded-full blur-3xl pointer-events-none transition-all duration-300"
                   style={{ 
                     left: `${p.x}%`, 
                     top: `${p.y}%`,
                     background: `radial-gradient(circle, rgba(245, 158, 11, ${0.4 * (1-p.age)}) 0%, transparent 70%)`,
                     transform: `translate(-50%, -50%) scale(${1 + p.age})`,
                     opacity: 1 - p.age
                   }}
                 />
               ))}
            </div>

            {/* THE ELASTIC SLAB */}
            <div 
              className="relative w-80 h-[450px] transition-all duration-500 ease-out flex flex-col items-center justify-center p-12 overflow-hidden shadow-2xl border-2"
              style={{ 
                transform: `rotateX(${(mousePos.y - 0.5) * -15}deg) rotateY(${(mousePos.x - 0.5) * 15}deg)`,
                backgroundColor: `rgba(255, 255, 255, ${0.05 + points.length * 0.005})`,
                backdropFilter: `blur(${24 + points.length * 2}px)`,
                borderRadius: '56px',
                borderColor: `rgba(245, 158, 11, ${0.1 + points.length * 0.02})`
              }}
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-amber-500/5 pointer-events-none" />
               
               <div className="relative z-10 flex flex-col items-center gap-8">
                  <div className={`w-24 h-24 rounded-[36px] bg-amber-600/20 border border-amber-400/40 flex items-center justify-center text-amber-500 shadow-xl transition-all duration-700 ${points.length > 5 ? 'scale-110 shadow-amber-500/40' : ''}`}>
                     <Fingerprint className="w-12 h-12" />
                  </div>
                  <div className="text-center">
                     <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-white">Pressure_Mapping_0x88</div>
                     <div className="text-3xl font-tech font-bold text-white uppercase tracking-widest">Elastic_Substrate</div>
                  </div>
               </div>

               {/* Waveform HUD at bottom of slab */}
               <div className="absolute bottom-10 inset-x-12 h-1.5 flex items-end gap-1 opacity-20">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex-1 bg-amber-500" style={{ height: `${Math.random() * (points.length * 5 + 10)}%` }} />
                  ))}
               </div>
            </div>

            {/* CURSOR HUD */}
            <div 
              className="absolute pointer-events-none transition-transform duration-75"
              style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
            >
               <div className="w-12 h-12 border border-amber-500/30 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b]" />
               </div>
            </div>

            <div className="absolute top-12 left-12">
               <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900/80 border border-white/10 rounded-full">
                  <Waves className="w-3 h-3 text-amber-400 animate-pulse" />
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-black">Strain_Sensor: ONLINE</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
