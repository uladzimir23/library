
import React, { useState, useRef } from 'react';
import { Share2, Zap, Activity, Radio, Magnet } from 'lucide-react';

export const ElasticNeuralTether: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  const anchors = [
    { x: 0.2, y: 0.2, label: 'L_CORE_0' },
    { x: 0.8, y: 0.2, label: 'R_CORE_0' },
    { x: 0.2, y: 0.8, label: 'L_CORE_1' },
    { x: 0.8, y: 0.8, label: 'R_CORE_1' }
  ];

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/10 text-fuchsia-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Neural_Connectivity_v19
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
           Нейронные <br /><span className="text-fuchsia-500">Связи.</span>
         </h2>
      </div>

      <div className="relative h-[600px] bg-zinc-950 rounded-[64px] border border-white/5 overflow-hidden flex items-center justify-center group shadow-2xl">
         {/* Background Matter Grid */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#d946ef 1px, transparent 1px), linear-gradient(90deg, #d946ef 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

         {/* SVG Tethers */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
               <filter id="glow-tether">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
            </defs>
            {anchors.map((anchor, i) => (
               <g key={i}>
                  {/* The Elastic String (Spline) */}
                  <path 
                    d={`M ${anchor.x * 100}% ${anchor.y * 100}% Q ${mousePos.x * 100}% ${mousePos.y * 100}% ${anchor.x * 100}% ${anchor.y * 100}%`}
                    fill="none" 
                    stroke="#d946ef" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4"
                    className="transition-all duration-300 ease-out"
                    style={{ 
                      d: `M ${anchor.x * 100}% ${anchor.y * 100}% Q ${anchor.x * 100 + (mousePos.x * 100 - anchor.x * 100) * 0.5}% ${anchor.y * 100 + (mousePos.y * 100 - anchor.y * 100) * 0.5}% ${mousePos.x * 100}% ${mousePos.y * 100}%`,
                      opacity: 0.4
                    }}
                    filter="url(#glow-tether)"
                  />
                  {/* Traveling Pulse */}
                  <circle r="3" fill="#fff" filter="blur(2px)">
                     <animateMotion 
                        dur={`${2 + i}s`} 
                        repeatCount="indefinite" 
                        path={`M ${anchor.x * 100}% ${anchor.y * 100}% Q ${anchor.x * 100 + (mousePos.x * 100 - anchor.x * 100) * 0.5}% ${anchor.y * 100 + (mousePos.y * 100 - anchor.y * 100) * 0.5}% ${mousePos.x * 100}% ${mousePos.y * 100}%`} 
                     />
                  </circle>
               </g>
            ))}
         </svg>

         {/* Physical Anchor Nodes */}
         {anchors.map((anchor, i) => (
           <div 
             key={i}
             className="absolute w-20 h-20 bg-zinc-900 border border-white/10 rounded-[28px] flex flex-col items-center justify-center shadow-2xl transition-all duration-700"
             style={{ left: `${anchor.x * 100}%`, top: `${anchor.y * 100}%`, transform: 'translate(-50%, -50%)' }}
           >
              <div className="text-[7px] font-mono text-zinc-600 mb-1">{anchor.label}</div>
              <Radio className="w-5 h-5 text-fuchsia-500/40" />
              <div className="absolute inset-[-10px] border border-fuchsia-500/10 rounded-[32px] animate-pulse" />
           </div>
         ))}

         {/* The Attention Hub (The Node following mouse) */}
         <div 
           className="absolute w-32 h-32 transition-all duration-75 ease-out"
           style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
         >
            <div className="absolute inset-0 bg-fuchsia-600/10 rounded-[48px] backdrop-blur-3xl border border-fuchsia-500/30 shadow-[0_0_80px_rgba(217,70,239,0.2)] flex items-center justify-center">
               <Magnet className="w-10 h-10 text-fuchsia-500 animate-pulse" />
               
               {/* Technical Labels around hub */}
               <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-fuchsia-600 text-white text-[8px] font-mono px-3 py-1 rounded-full uppercase font-black">
                  Active_Gravity_Link
               </div>
            </div>
         </div>

         <div className="absolute bottom-12 right-12 text-right">
            <div className="text-fuchsia-500 font-tech text-3xl font-bold uppercase tracking-widest">Synergy: TRUE</div>
            <div className="text-zinc-600 text-[9px] font-mono uppercase tracking-[0.3em]">Nodal_Elasticity_Calibrated</div>
         </div>
      </div>
    </div>
  );
};
