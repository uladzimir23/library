
import React, { useState } from 'react';
import { Box, Layers, Zap, Disc, RefreshCw, Activity, Cpu } from 'lucide-react';

type MaterialType = 'GLASS' | 'CHROME' | 'CARBON';

export const MaterialMorphConsole: React.FC = () => {
  const [material, setMaterial] = useState<MaterialType>('GLASS');
  const [isMorphing, setIsMorphing] = useState(false);

  const morphTo = (m: MaterialType) => {
    if (m === material || isMorphing) return;
    setIsMorphing(true);
    setTimeout(() => {
      setMaterial(m);
      setIsMorphing(false);
    }, 800);
  };

  const matData = {
    GLASS: { 
      label: 'Frosted_Lattice', 
      blur: 'backdrop-blur-3xl', 
      bg: 'bg-white/5', 
      border: 'border-white/20',
      color: 'sky',
      icon: Layers
    },
    CHROME: { 
      label: 'Specular_Reflect', 
      blur: 'backdrop-blur-md', 
      bg: 'bg-zinc-400/20 dark:bg-zinc-100/10', 
      border: 'border-zinc-300 dark:border-white/40',
      color: 'indigo',
      icon: Disc
    },
    CARBON: { 
      label: 'Composite_Weave', 
      blur: 'backdrop-blur-none', 
      bg: 'bg-zinc-900', 
      border: 'border-zinc-700',
      color: 'emerald',
      icon: Cpu
    }
  };

  return (
    <div className="scroll-mt-24">
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Phase_Topology_v18
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Консоль <br /><span className="text-indigo-500">Морфинга.</span>
         </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-center">
         {/* Material Selectors */}
         <div className="w-full lg:w-96 space-y-4">
            {(['GLASS', 'CHROME', 'CARBON'] as MaterialType[]).map((m) => (
              <button 
                key={m}
                onClick={() => morphTo(m)}
                className={`w-full p-8 rounded-[40px] border transition-all duration-500 flex items-center justify-between group
                  ${material === m ? 'bg-indigo-600 border-indigo-400 text-white shadow-2xl scale-105' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}
                `}
              >
                 <div className="text-left">
                    <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest mb-1">Matter_State</div>
                    <div className="text-xl font-tech font-bold uppercase tracking-widest">{m}</div>
                 </div>
                 <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${material === m ? 'bg-white/20 rotate-12' : 'bg-zinc-900'}`}>
                    {React.createElement(matData[m].icon, { className: "w-5 h-5" })}
                 </div>
              </button>
            ))}
            
            <div className="p-8 bg-zinc-900 rounded-[48px] border border-white/5 flex flex-col gap-4 shadow-xl">
               <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <span>Transformation_Load</span>
                  <span className="text-indigo-500">{isMorphing ? 'RESTRUCTURING' : 'STABLE'}</span>
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-indigo-500 transition-all duration-[800ms] ${isMorphing ? 'w-full' : 'w-0'}`} />
               </div>
            </div>
         </div>

         {/* The Morphing Object */}
         <div className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[80px] relative overflow-hidden flex items-center justify-center shadow-2xl group border border-white/5">
            {/* Wave Distortion Filter Simulation */}
            <div 
              className={`absolute inset-0 transition-opacity duration-1000 ${isMorphing ? 'opacity-30' : 'opacity-0'}`}
              style={{ background: `radial-gradient(circle at center, #6366f1 0%, transparent 70%)` }}
            />
            
            <div 
              className={`relative w-96 h-[450px] transition-all duration-1000 ease-in-out border-2 shadow-2xl flex flex-col items-center justify-center p-12 overflow-hidden
                ${matData[material].blur} ${matData[material].bg} ${matData[material].border}
                ${isMorphing ? 'scale-90 rotate-2 skew-x-2 blur-md opacity-50' : 'scale-100 rotate-0 skew-x-0 blur-0 opacity-100'}
              `}
              style={{ borderRadius: material === 'GLASS' ? '80px' : material === 'CHROME' ? '32px' : '0px' }}
            >
               {/* Carbon Weave Detail */}
               {material === 'CARBON' && (
                 <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #fff 1px, transparent 1px), linear-gradient(-45deg, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
               )}

               <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-all duration-1000 bg-${matData[material].color}-500 text-white shadow-2xl
                 ${isMorphing ? 'rotate-[360deg] scale-50' : 'scale-100'}
               `}>
                  <Zap className="w-12 h-12" />
               </div>

               <div className="text-center relative z-10">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-3">Matter_Identity_0x88</div>
                  <div className="text-4xl font-tech font-bold text-white uppercase tracking-tighter leading-none">
                     {matData[material].label}
                  </div>
               </div>

               {/* Shimmer Wave (Travels during morph) */}
               {isMorphing && (
                 <div className="absolute inset-x-0 top-0 h-24 bg-white/20 blur-3xl -translate-y-full animate-[shimmer-wave_0.8s_linear_infinite]" />
               )}
            </div>

            {/* Diagnostics HUD */}
            <div className="absolute top-12 left-12 flex items-center gap-3">
               <RefreshCw className={`w-4 h-4 text-indigo-500 ${isMorphing ? 'animate-spin' : ''}`} />
               <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black">Coherence: {isMorphing ? '0.12' : '0.99'}</span>
            </div>
         </div>
      </div>
      <style>{`
        @keyframes shimmer-wave {
          0% { transform: translateY(-100%) skewY(-20deg); }
          100% { transform: translateY(500%) skewY(-20deg); }
        }
      `}</style>
    </div>
  );
};
