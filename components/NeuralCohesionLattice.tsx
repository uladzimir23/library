
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Target, Share2, Activity, Zap, Cpu, Network } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralCohesionLattice: React.FC = () => {
  const { isDiagnostic } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    }
  };

  const nodes = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    x: (i % 5) * 20 + 10,
    y: Math.floor(i / 5) * 20 + 10,
  }));

  return (
    <div className="scroll-mt-32" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-4">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em]">
            Neural_Lattice_v4.2
          </span>
          <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
            Решетка <br /><span className="text-emerald-500">Когезии.</span>
          </h2>
        </div>
        <div className="flex gap-4">
           <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-[32px] backdrop-blur-2xl">
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Network_Pressure</div>
              <div className="text-3xl font-tech font-bold text-white tracking-tighter">0.842_NP</div>
           </div>
        </div>
      </div>

      <div className="relative h-[700px] bg-[#020502] rounded-[80px] border border-white/5 overflow-hidden flex items-center justify-center group shadow-[0_0_100px_rgba(16,185,129,0.05)] cursor-none">
         {/* Adaptive SVG Connectivity */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <defs>
               <filter id="nodeGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
            </defs>
            {nodes.map((node) => {
              const dx = mousePos.x - node.x;
              const dy = mousePos.y - node.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const isActive = dist < 25;
              
              if (!isActive) return null;
              
              return (
                <g key={node.id}>
                  <line 
                    x1={`${node.x}%`} y1={`${node.y}%`} 
                    x2={`${mousePos.x}%`} y2={`${mousePos.y}%`}
                    stroke="#10b981" 
                    strokeWidth={2 * (1 - dist / 25)}
                    strokeDasharray="4 4"
                    className="transition-all duration-300"
                    opacity={0.6}
                  />
                  <circle 
                    cx={`${node.x + (mousePos.x - node.x) * 0.5}%`} 
                    cy={`${node.y + (mousePos.y - node.y) * 0.5}%`} 
                    r="2" 
                    fill="#fff" 
                    className="animate-pulse"
                  />
                </g>
              );
            })}
         </svg>

         {/* The Lattice Nodes */}
         <div className="grid grid-cols-5 grid-rows-5 w-full h-full p-20 gap-8">
            {nodes.map((node) => {
               const dx = mousePos.x - node.x;
               const dy = mousePos.y - node.y;
               const dist = Math.sqrt(dx * dx + dy * dy);
               const influence = Math.max(0, 1 - dist / 30);
               
               return (
                 <div key={node.id} className="flex items-center justify-center">
                    <div 
                      className={`relative w-12 h-12 rounded-2xl border transition-all duration-300 ease-out flex items-center justify-center
                        ${influence > 0.4 ? 'bg-emerald-600 border-white shadow-[0_0_40px_rgba(16,185,129,0.4)] scale-125' : 'bg-white/5 border-white/10 opacity-30'}
                      `}
                      style={{ 
                        transform: `translate(${dx * influence * 1.5}px, ${dy * influence * 1.5}px) rotate(${influence * 45}deg)`
                      }}
                    >
                       <Cpu className={`w-5 h-5 transition-colors ${influence > 0.4 ? 'text-white' : 'text-zinc-600'}`} />
                       
                       {influence > 0.7 && isDiagnostic && (
                         <div className="absolute -bottom-8 whitespace-nowrap text-[7px] font-mono text-emerald-500 uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
                            Link_Node: 0x{node.id}
                         </div>
                       )}
                    </div>
                 </div>
               );
            })}
         </div>

         {/* Focal Point (Mouse Indicator) */}
         <div 
           className="absolute pointer-events-none transition-transform duration-75 ease-out"
           style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%`, transform: 'translate(-50%, -50%)' }}
         >
            <div className="w-24 h-24 border-2 border-emerald-500/30 rounded-full animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_20px_#10b981]" />
            </div>
            {isDiagnostic && (
               <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 px-4 py-1.5 rounded-full text-[8px] font-mono text-white whitespace-nowrap shadow-2xl">
                  SCAN_X: {mousePos.x.toFixed(2)} | SCAN_Y: {mousePos.y.toFixed(2)}
               </div>
            )}
         </div>

         <div className="absolute bottom-12 left-12 flex items-center gap-6">
            <div className="flex items-center gap-3 text-emerald-500">
               <Network className="w-5 h-5 animate-pulse" />
               <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-black">Cohesion_Active</span>
            </div>
            <div className="h-1.5 w-40 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${Math.max(20, Math.sin(Date.now()/1000)*100)}%` }} />
            </div>
         </div>
      </div>
    </div>
  );
};
