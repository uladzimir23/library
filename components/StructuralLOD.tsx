
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Box, Layers, Zap, Activity, Grid3X3, Maximize2, Cpu, Gauge, AlertTriangle, ShieldCheck, ZapOff, RefreshCw, EyeOff, LayoutTemplate } from 'lucide-react';
import { LanguageContext } from '../App';

type LODLevel = 'LOW' | 'MED' | 'ULTRA';

interface LODConfig {
  polys: number;
  drawCalls: number;
  frameTime: string;
  vram: string;
  color: string;
  gridSize: string;
  tessellation: number;
}

export const StructuralLOD: React.FC = () => {
  const { t, isDiagnostic } = useContext(LanguageContext);
  const [lod, setLod] = useState<LODLevel>('MED');
  const [shading, setShading] = useState<'solid' | 'wire'>('solid');
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [tessellation, setTessellation] = useState(50);
  const [realtimeFPS, setRealtimeFPS] = useState(60);

  const configs: Record<LODLevel, LODConfig> = {
    LOW: { polys: 420, drawCalls: 12, frameTime: '0.4ms', vram: '12MB', color: 'zinc', gridSize: '80px', tessellation: 10 },
    MED: { polys: 2400, drawCalls: 64, frameTime: '1.8ms', vram: '140MB', color: 'sky', gridSize: '40px', tessellation: 40 },
    ULTRA: { polys: 12800, drawCalls: 256, frameTime: '4.2ms', vram: '840MB', color: 'emerald', gridSize: '15px', tessellation: 100 }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let targetFPS = 60;
      if (isStressTesting) {
        targetFPS = 24 + Math.random() * 10;
        if (autoOptimize && lod !== 'LOW') {
           setLod('LOW');
        }
      } else {
        targetFPS = lod === 'ULTRA' ? 58 + Math.random() * 2 : 60;
      }
      setRealtimeFPS(targetFPS);
    }, 500);
    return () => clearInterval(interval);
  }, [isStressTesting, lod, autoOptimize]);

  const current = configs[lod];

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
         <div>
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              Diagnostic_v16.LOD
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Менеджер <br /><span className="text-sky-500">Топологии.</span>
            </h2>
         </div>
         <div className="flex gap-4">
            <div className={`p-4 bg-zinc-900 border border-white/5 rounded-2xl flex flex-col items-end transition-all ${isStressTesting ? 'border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.1)]' : ''}`}>
               <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Engine_Status</span>
               <span className={`text-xl font-tech font-bold ${isStressTesting ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`}>
                  {isStressTesting ? 'STRESS_SPIKE' : 'NOMINAL'}
               </span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
         {/* 1. GPU PROFILER */}
         <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex flex-col gap-8 shadow-2xl h-full relative overflow-hidden group/profiler">
               <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover/profiler:opacity-100 transition-opacity" />
               <div className="flex items-center gap-3 relative z-10">
                  <Gauge className="w-5 h-5 text-sky-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">GPU_Profiler</span>
               </div>
               
               <div className="space-y-6 relative z-10">
                  {[
                    { label: 'Frame Time', val: current.frameTime, icon: Activity, limit: '5.0ms' },
                    { label: 'Draw Calls', val: current.drawCalls, icon: Layers, limit: '512' },
                    { label: 'VRAM Load', val: current.vram, icon: Cpu, limit: '1024MB' }
                  ].map((stat, i) => (
                    <div key={i} className="p-5 bg-white/5 rounded-[32px] border border-white/5 hover:border-sky-500/30 transition-all cursor-pointer">
                       <div className="flex items-center justify-between mb-2 opacity-40">
                          <div className="flex items-center gap-2">
                             <stat.icon className="w-3 h-3" />
                             <span className="text-[8px] font-bold uppercase tracking-widest">{stat.label}</span>
                          </div>
                          <span className="text-[7px] font-mono">LIM: {stat.limit}</span>
                       </div>
                       <div className="text-xl font-tech font-bold text-white uppercase">{stat.val}</div>
                    </div>
                  ))}
               </div>

               <div className="mt-auto pt-6 border-t border-white/5 space-y-4 relative z-10">
                  <button 
                    onClick={() => setAutoOptimize(!autoOptimize)}
                    className={`w-full py-4 rounded-2xl border text-[9px] font-black uppercase transition-all flex items-center justify-center gap-3 ${autoOptimize ? 'bg-emerald-600/10 border-emerald-500/40 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/10 text-zinc-500'}`}
                  >
                    <RefreshCw className={`w-3 h-3 ${autoOptimize ? 'animate-spin-slow' : ''}`} />
                    Adaptive_LOD: {autoOptimize ? 'Active' : 'Disabled'}
                  </button>
               </div>
            </div>
         </div>

         {/* 2. TOPOLOGY VISUALIZER */}
         <div className="lg:col-span-6 bg-zinc-950 rounded-[64px] border border-white/5 relative overflow-hidden min-h-[600px] flex items-center justify-center shadow-2xl group/vis">
            <div 
              className={`absolute inset-0 opacity-[0.07] pointer-events-none transition-all duration-1000 ${isStressTesting ? 'animate-pulse' : ''}`} 
              style={{ 
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
                backgroundSize: current.gridSize 
              }} 
            />
            
            <div className={`relative w-96 h-96 preserve-3d transition-transform duration-1000 group-hover/vis:scale-110 ${isStressTesting ? 'animate-bounce' : ''}`}>
               <div 
                className={`absolute inset-0 rounded-[64px] border-2 transition-all duration-1000 flex items-center justify-center overflow-hidden
                  ${lod === 'LOW' ? 'bg-zinc-800/10 border-zinc-700' : ''}
                  ${lod === 'MED' ? 'bg-sky-500/5 border-sky-500/40' : ''}
                  ${lod === 'ULTRA' ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_100px_rgba(16,185,129,0.2)]' : ''}
                `}
               >
                  {/* Procedural Mesh SVG */}
                  <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${shading === 'wire' ? 'opacity-100' : 'opacity-20'}`}>
                     <defs>
                        <pattern id="meshPattern" x="0" y="0" width={100 / current.tessellation + "%"} height={100 / current.tessellation + "%"} patternUnits="objectBoundingBox">
                           <rect width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                     </defs>
                     <rect width="100%" height="100%" fill="url(#meshPattern)" className={`transition-all duration-1000 ${lod === 'ULTRA' ? 'text-emerald-500' : 'text-sky-500'}`} />
                  </svg>

                  <div className={`text-center z-10 transition-all duration-500 ${shading === 'wire' ? 'blur-sm opacity-20' : 'blur-0 opacity-100'}`}>
                     <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Current_State</div>
                     <div className={`text-5xl font-tech font-bold uppercase tracking-tighter ${lod === 'ULTRA' ? 'text-emerald-500' : 'text-white'}`}>
                        {lod}_LOD
                     </div>
                  </div>
               </div>
            </div>

            <div className="absolute top-10 right-10 text-right bg-black/40 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/5">
               <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Realtime_Perf</div>
               <div className={`text-3xl font-tech font-bold ${realtimeFPS < 30 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {realtimeFPS.toFixed(1)} <span className="text-xs opacity-50 font-tech">FPS</span>
               </div>
            </div>

            {/* SCANLINE */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500/20 shadow-[0_0_20px_#10b981] animate-[scan_4s_linear_infinite]" />
         </div>

         {/* 3. SHADING & LEVEL CONTROLS */}
         <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex flex-col justify-between shadow-2xl relative group/override">
               <div className="flex items-center gap-3">
                  <Maximize2 className="w-5 h-5 text-sky-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest">Level_Override</span>
               </div>
               
               <div className="flex flex-col gap-3 my-8">
                  {(['LOW', 'MED', 'ULTRA'] as LODLevel[]).map(level => (
                    <button 
                      key={level}
                      onClick={() => setLod(level)}
                      disabled={isStressTesting && autoOptimize && level !== 'LOW'}
                      className={`w-full p-5 rounded-3xl border transition-all duration-500 flex items-center justify-between group/btn disabled:opacity-30 disabled:cursor-not-allowed ${lod === level ? 'bg-white text-zinc-900 border-white shadow-2xl scale-[1.05]' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10 hover:translate-x-1'}`}
                    >
                       <div className="text-[10px] font-bold uppercase tracking-widest">{level}</div>
                       <ShieldCheck className={`w-4 h-4 ${lod === level ? 'text-zinc-900 animate-pulse' : 'opacity-10'}`} />
                    </button>
                  ))}
               </div>

               <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase">
                     <span>Shading_Mode</span>
                  </div>
                  <div className="flex gap-2 p-1 bg-black/40 rounded-xl border border-white/5">
                     <button 
                       onClick={() => setShading('solid')}
                       className={`flex-1 py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${shading === 'solid' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
                     >
                       <LayoutTemplate className="w-3 h-3 mx-auto" />
                     </button>
                     <button 
                       onClick={() => setShading('wire')}
                       className={`flex-1 py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${shading === 'wire' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
                     >
                       <Grid3X3 className="w-3 h-3 mx-auto" />
                     </button>
                  </div>
               </div>

               <div className="pt-6">
                  <button 
                    onClick={() => setIsStressTesting(!isStressTesting)}
                    className={`w-full py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${isStressTesting ? 'bg-rose-600 text-white shadow-[0_0_40px_rgba(244,63,94,0.4)] animate-pulse' : 'bg-rose-500/10 text-rose-500 hover:bg-rose-600 hover:text-white'}`}
                  >
                     {isStressTesting ? <ZapOff className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                     {isStressTesting ? 'Abort_Stress' : 'Inject_Stress'}
                  </button>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[48px] p-8 flex-1 flex flex-col justify-center shadow-xl group/polys">
               <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-zinc-600 group-hover/polys:text-sky-500 transition-colors" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Polygons</span>
                  </div>
                  <span className="text-xl font-tech text-white font-bold">{current.polys.toLocaleString()}</span>
               </div>
               <div className="h-1.5 bg-black rounded-full overflow-hidden">
                  <div className={`h-full bg-sky-500 shadow-[0_0_15px_#0ea5e9] transition-all duration-1000`} style={{ width: `${(current.polys / 12800) * 100}%` }} />
               </div>
               <div className="mt-4 flex justify-between text-[7px] font-mono text-zinc-700 uppercase tracking-widest">
                  <span>Batch_Sync: {shading.toUpperCase()}</span>
                  <span>v16.5_STABLE</span>
               </div>
            </div>
         </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
