
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Brain, Activity, Zap, Radio, Terminal, Settings, ArrowUpRight, Share2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralSynapseEngine: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [firingRate, setFiringRate] = useState(0.5);
  const [pulses, setPulses] = useState<number[]>([]);
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
      setPulses(prev => [Math.random(), ...prev.slice(0, 15)]);
    }, 2000 * (1 - firingRate));
    return () => clearInterval(interval);
  }, [firingRate]);

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           System_Cluster_0x88
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Синаптический <br /><span className="text-indigo-500">Кластер.</span>
         </h2>
      </div>

      <div 
        className="relative w-full h-[700px] bg-zinc-950 rounded-[80px] border border-white/5 overflow-hidden shadow-2xl flex flex-col lg:flex-row p-8 gap-8 transition-transform duration-1000 ease-out preserve-3d"
        style={{ transform: `rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)` }}
      >
         {/* 1. LEFT: FIRING STREAM */}
         <div className="w-full lg:w-80 flex flex-col gap-6 bg-white/5 border border-white/10 rounded-[48px] p-8 backdrop-blur-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-indigo-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Impulse_Monitor</span>
               </div>
               <span className="text-[10px] font-mono text-indigo-500">{(firingRate * 100).toFixed(0)}%</span>
            </div>
            
            <div className="flex-1 flex flex-col-reverse gap-1 items-center px-4 overflow-hidden">
               {pulses.map((p, i) => (
                 <div 
                   key={i} 
                   className="w-full h-1 bg-indigo-500/20 rounded-full relative overflow-hidden transition-all duration-700 animate-in slide-in-from-bottom-2"
                   style={{ opacity: 1 - i * 0.05 }}
                 >
                    <div 
                      className="absolute inset-y-0 left-0 bg-indigo-500 shadow-[0_0_10px_#6366f1]" 
                      style={{ width: `${p * 100}%`, transition: 'width 2s ease-in-out' }}
                    />
                 </div>
               ))}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4">
               <div className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Rate_Control</div>
               <input 
                 type="range" min="0.1" max="1" step="0.01" value={firingRate}
                 onChange={e => setFiringRate(parseFloat(e.target.value))}
                 className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
               />
            </div>
         </div>

         {/* 2. CENTER: 3D SYNAPSE CORE */}
         <div className="flex-1 bg-white/5 border border-white/10 rounded-[64px] relative flex flex-col items-center justify-center p-12 overflow-hidden group/core">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
            
            <div className="relative w-full h-full flex items-center justify-center">
               {/* Synapse A (Top) */}
               <div className="absolute top-1/4 w-32 h-32 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-2xl transition-all duration-1000 group-hover/core:translate-y-[-20px]">
                  <div className="w-16 h-16 rounded-full bg-indigo-600/20 animate-pulse flex items-center justify-center">
                     <Zap className="w-6 h-6 text-indigo-400" />
                  </div>
               </div>

               {/* Energy Connection (SVG) */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path 
                    d="M 50% 35% Q 50% 50% 50% 65%" 
                    fill="none" 
                    stroke="#6366f1" 
                    strokeWidth="4" 
                    strokeDasharray="10 20" 
                    className="animate-[dash_2s_linear_infinite]" 
                    style={{ strokeLinecap: 'round' }}
                  />
                  <circle r="6" fill="#6366f1" filter="blur(4px)">
                    <animateMotion dur="1s" repeatCount="indefinite" path="M 50% 35% L 50% 65%" />
                  </circle>
               </svg>

               {/* Synapse B (Bottom) */}
               <div className="absolute bottom-1/4 w-32 h-32 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-2xl transition-all duration-1000 group-hover/core:translate-y-[20px]">
                  <div className="w-16 h-16 rounded-full bg-indigo-600/20 flex items-center justify-center">
                     <Radio className="w-6 h-6 text-indigo-400 animate-pulse" />
                  </div>
               </div>
            </div>

            <div className="absolute bottom-10 left-10">
               <div className="text-2xl font-tech font-bold text-white uppercase tracking-widest">A-X_RELAY</div>
               <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Cohesion: 0.982_Stable</div>
            </div>
         </div>

         {/* 3. RIGHT: ANALYTICS & HUB */}
         <div className="w-full lg:w-80 flex flex-col gap-6">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex-1 flex flex-col justify-between shadow-2xl relative overflow-hidden">
               <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-indigo-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Calibration_Stats</span>
               </div>
               
               <div className="space-y-6">
                  {['Bias', 'Resonance', 'Gain'].map((l, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[8px] font-mono text-zinc-600 uppercase">
                          <span>{l}</span>
                          <span>0x{(80 + i*12).toString(16)}</span>
                       </div>
                       <div className="h-1 bg-black rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${40 + i*20}%` }} />
                       </div>
                    </div>
                  ))}
               </div>

               <div className="pt-6 border-t border-white/5">
                  <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-500 transition-all">
                     <Share2 className="w-4 h-4" /> Link_Sync_Protocol
                  </button>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[48px] p-8 h-48 backdrop-blur-2xl flex items-center justify-center group overflow-hidden">
               <div className="text-center transition-all duration-700 group-hover:scale-110">
                  <Brain className="w-12 h-12 text-white/20 mb-3 mx-auto" />
                  <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Cluster_Master</div>
                  <div className="text-xl font-tech font-bold text-white uppercase tracking-tighter">AMS_088.v12</div>
               </div>
            </div>
         </div>
      </div>
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -30; }
        }
      `}</style>
    </div>
  );
};
