import React, { useState, useContext, useRef } from 'react';
import { Zap, Cpu, Activity, Radio, Target, Share2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralSurge: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isSurging, setIsSurging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const triggerSurge = () => {
    setIsSurging(true);
    setTimeout(() => setIsSurging(false), 200);
  };

  const nodes = [
    { x: 20, y: 20 }, { x: 80, y: 20 },
    { x: 50, y: 50 },
    { x: 20, y: 80 }, { x: 80, y: 80 }
  ];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="surge">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/10 text-yellow-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Neural_High_Voltage
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              Neural <span className="text-yellow-500">Surge.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              Experience the raw speed of cognitive data transmission. Every click sends an electric high-voltage pulse through the interface lattice, recalibrating nodal weights in real-time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-[32px] border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-yellow-500">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Voltage_Level</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">1.21_GW</div>
             </div>
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-[32px] border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3 text-emerald-500">
                  <Share2 className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Node_Relay</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">ACTIVE</div>
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onClick={triggerSurge}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-none"
        >
           {/* Electric Field Background */}
           <div className={`absolute inset-0 transition-opacity duration-300 ${isSurging ? 'opacity-40' : 'opacity-10'}`} 
                style={{ background: 'radial-gradient(circle at var(--x) var(--y), #eab308 0%, transparent 50%)', '--x': `${mousePos.x * 100}%`, '--y': `${mousePos.y * 100}%` } as any} />

           <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {nodes.map((node, i) => (
                <g key={i}>
                   <line 
                     x1={`${mousePos.x * 100}%`} y1={`${mousePos.y * 100}%`} 
                     x2={`${node.x}%`} y2={`${node.y}%`} 
                     stroke="#eab308" 
                     strokeWidth={isSurging ? 3 : 0.5} 
                     className="transition-all duration-150"
                     opacity={isSurging ? 0.8 : 0.1}
                   />
                   <circle cx={`${node.x}%`} cy={`${node.y}%`} r="4" fill="#eab308" opacity="0.4" className={isSurging ? 'animate-ping' : ''} />
                </g>
              ))}
           </svg>

           <div className="relative w-32 h-32 bg-white/5 border border-white/20 rounded-[32px] backdrop-blur-3xl flex items-center justify-center shadow-2xl z-20">
              <Cpu className={`w-12 h-12 transition-all duration-150 ${isSurging ? 'text-yellow-500 scale-125' : 'text-zinc-500'}`} />
           </div>

           {/* Custom Cursor */}
           <div 
             className="absolute w-12 h-12 border border-yellow-500/40 rounded-full flex items-center justify-center transition-transform duration-75 pointer-events-none"
             style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
           >
              <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
           </div>

           <div className="absolute bottom-12 left-12 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Nodal_Surge_Status: {isSurging ? 'TRANSMITTING' : 'IDLE'}
           </div>
        </div>
      </div>
    </section>
  );
};
