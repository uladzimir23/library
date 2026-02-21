
import React, { useState } from 'react';
import { Infinity, Zap, Activity, Link as LinkIcon, Share2 } from 'lucide-react';

export const QuantumEntanglementPair: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 flex justify-between items-end">
         <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/10 text-violet-500 text-[9px] font-bold uppercase tracking-[0.5em]">Quantum_Entanglement</span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
              Квантовая <br /><span className="text-violet-500">Связь.</span>
            </h2>
         </div>
         <div className="text-right opacity-40 font-mono text-[10px] uppercase text-zinc-500">Spooky_Action: ENABLED</div>
      </div>

      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); setMousePos({x:0, y:0}); }}
        className="relative h-[600px] bg-zinc-950 rounded-[64px] border border-white/5 overflow-hidden flex flex-col md:flex-row items-center justify-around p-12 perspective-2000 shadow-2xl group cursor-none"
      >
         {/* Quantum Bridge (The Line between them) */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <line 
              x1="25%" y1="50%" x2="75%" y2="50%" 
              stroke="#8b5cf6" strokeWidth="2" strokeDasharray="10 20" 
              className={`transition-all duration-700 ${isHovering ? 'opacity-100' : 'opacity-20'}`}
            />
            {isHovering && (
              <circle r="4" fill="#8b5cf6" filter="blur(4px)">
                <animateMotion dur="2s" repeatCount="indefinite" path="M 300,300 L 900,300" />
              </circle>
            )}
         </svg>

         {/* Node A (The Primary) */}
         <div 
           className="w-72 h-96 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-3xl relative transition-all duration-150 ease-out flex flex-col items-center justify-center gap-8 shadow-2xl"
           style={{ transform: `rotateX(${mousePos.y * 40}deg) rotateY(${mousePos.x * 40}deg) translateZ(50px)` }}
         >
            <div className="absolute top-6 left-8 text-[8px] font-mono text-violet-500/60 uppercase tracking-widest">Master_Node_0x1</div>
            <div className="w-20 h-20 rounded-3xl bg-violet-600 flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.3)]">
               <Zap className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="text-center space-y-2">
               <div className="text-2xl font-tech font-bold text-white uppercase tracking-widest">Active</div>
               <div className="text-[10px] font-mono text-zinc-500 uppercase">Input_Vector: [{mousePos.x.toFixed(2)}, {mousePos.y.toFixed(2)}]</div>
            </div>
         </div>

         {/* The "Entanglement" Sign (Infinity) */}
         <div className={`transition-all duration-1000 ${isHovering ? 'scale-125 opacity-100 rotate-[360deg]' : 'scale-100 opacity-20'}`}>
            <Infinity className="w-16 h-16 text-violet-500" />
         </div>

         {/* Node B (The Entangled Mirror) */}
         <div 
           className="w-72 h-96 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-3xl relative transition-all duration-150 ease-out flex flex-col items-center justify-center gap-8 shadow-2xl"
           style={{ 
             transform: `rotateX(${-mousePos.y * 40}deg) rotateY(${-mousePos.x * 40}deg) translateZ(50px)`,
             opacity: 0.2 + (isHovering ? 0.8 : 0)
           }}
         >
            <div className="absolute top-6 right-8 text-[8px] font-mono text-violet-400/40 uppercase tracking-widest">Mirror_Node_0x2</div>
            <div className="w-20 h-20 rounded-3xl bg-white/5 border border-violet-500/30 flex items-center justify-center">
               <Share2 className="w-10 h-10 text-violet-400/40" />
            </div>
            <div className="text-center space-y-2">
               <div className="text-2xl font-tech font-bold text-zinc-500 uppercase tracking-widest">Sync</div>
               <div className="text-[10px] font-mono text-zinc-700 uppercase">Anti_Vector: [{-mousePos.x.toFixed(2)}, {-mousePos.y.toFixed(2)}]</div>
            </div>
         </div>

         {/* Precision HUD elements */}
         <div className="absolute bottom-12 left-12 flex items-center gap-4">
            <LinkIcon className="w-4 h-4 text-violet-500" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Coherence_Lock: {isHovering ? '99.9%' : '0.0%'}</span>
         </div>
      </div>
    </div>
  );
};
