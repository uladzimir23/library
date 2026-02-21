import React, { useState, useContext, useRef } from 'react';
import { Share2, Zap, Activity, Target, Magnet, Share, Radio } from 'lucide-react';
import { LanguageContext } from '../App';

export const MagneticElasticLoom: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isLooming, setIsLooming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const anchors = [
    { x: 20, y: 20 }, { x: 80, y: 20 },
    { x: 20, y: 80 }, { x: 80, y: 80 },
    { x: 50, y: 30 }, { x: 50, y: 70 }
  ];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="loom">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Connection_Physics
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Magnetic <br /><span className="text-indigo-500">Elastic_Loom.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Relationships have tension. Our loom engine generates dynamic spline connections between focal points, which stretch and bend based on the magnetic pull of user interaction, visualizing the hierarchy of logic.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[48px] border border-white/10 flex items-center justify-between shadow-2xl">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-xl">
                   <Share2 className="w-8 h-8" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tension_State</div>
                   <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter">{isLooming ? 'HIGH_STRETCH' : 'STABLE'}</div>
                </div>
             </div>
             <Radio className={`w-8 h-8 text-indigo-500 ${isLooming ? 'animate-pulse' : 'opacity-20'}`} />
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsLooming(true)}
          onMouseLeave={() => setIsLooming(false)}
          className="flex-1 w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-none"
        >
           {/* The Loom Web (SVG Splines) */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              {anchors.map((anchor, i) => (
                <path 
                  key={i}
                  d={`M ${anchor.x} ${anchor.y} Q ${mousePos.x * 100} ${mousePos.y * 100} ${anchor.x} ${anchor.y}`}
                  fill="none" 
                  stroke="#6366f1" 
                  strokeWidth="0.5" 
                  strokeDasharray="4 4"
                  className="transition-all duration-300 ease-out"
                  style={{ 
                    d: `M ${anchor.x}% ${anchor.y}% Q ${mousePos.x * 100}% ${mousePos.y * 100}% ${anchor.x}% ${anchor.y}%`,
                    opacity: isLooming ? 0.8 : 0.2
                  }}
                />
              ))}
              {/* Cross Connections */}
              <path 
                d={`M 20 20 L 80 80 M 80 20 L 20 80`}
                stroke="white" strokeWidth="0.5" opacity="0.05"
              />
           </svg>

           {/* Floating Anchor Nodes */}
           {anchors.map((anchor, i) => (
             <div 
               key={i}
               className="absolute w-4 h-4 bg-white/10 border border-white/20 rounded-full backdrop-blur-md transition-transform duration-700"
               style={{ 
                 left: `${anchor.x}%`, 
                 top: `${anchor.y}%`,
                 transform: `translate(-50%, -50%) scale(${isLooming ? 1.2 : 1})`
               }}
             >
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping" />
             </div>
           ))}

           {/* The Magnetic Core (Cursor) */}
           <div 
             className="absolute w-32 h-32 bg-white/5 border border-white/20 rounded-[48px] backdrop-blur-3xl shadow-2xl flex items-center justify-center transition-all duration-150 ease-out z-20"
             style={{ 
               left: `calc(${mousePos.x * 100}% - 64px)`, 
               top: `calc(${mousePos.y * 100}% - 64px)`,
               transform: `rotate(${mousePos.x * 20}deg) scale(${isLooming ? 1.1 : 1})`,
               boxShadow: isLooming ? '0 0 80px rgba(99, 102, 241, 0.2)' : 'none'
             }}
           >
              <Magnet className={`w-12 h-12 transition-all duration-500 ${isLooming ? 'text-indigo-500 scale-125' : 'text-zinc-700'}`} />
              
              {/* Internal Polish */}
              <div className="absolute inset-4 border border-white/5 rounded-[inherit] animate-spin-slow" />
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-bold mb-1">Magnetic_Field: ACTIVE</div>
              <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-tighter">Vector_Sum: 0x88.A</div>
           </div>
        </div>
      </div>
    </section>
  );
};
