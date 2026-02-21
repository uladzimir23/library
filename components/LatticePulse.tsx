import React, { useState, useContext, useEffect } from 'react';
import { Target, Zap, Activity, Cpu, Grid3X3, Layers, Share2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const LatticePulse: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [pulse, setPulse] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#080808]" id="lattice-pulse">
      <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Procedural_Growth
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Lattice <br /><span className="text-emerald-500">Pulse_Sync.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are crystalline. This lattice procedurally generates structural pathways between data points, creating a living grid that solidifies into rigid geometry under user interaction.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/5 flex flex-col gap-3">
                <Grid3X3 className="w-6 h-6 text-emerald-500" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Lattice_Density</div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">0.92_STB</div>
             </div>
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/5 flex flex-col gap-3">
                <Share2 className="w-6 h-6 text-indigo-500" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Active_Nodes</div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">12_UNITS</div>
             </div>
          </div>
        </div>

        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group perspective-2000 shadow-2xl"
        >
           {/* Background Scanner Line */}
           <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(16,185,129,0.05)_50%)] bg-[length:100%_4px] animate-[pulse_2s_infinite]" />

           {/* The Procedural Lattice */}
           <div className="relative w-96 h-96 preserve-3d transition-transform duration-1000 ease-out"
                style={{ transform: `rotateX(45deg) rotateZ(${pulse * 3.6}deg) scale(${isHovered ? 1.2 : 1})` }}>
              
              {/* Stacked Hairline Grids */}
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 border border-white/5 rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    transform: `translateZ(${i * 40}px)`,
                    opacity: 1 - i * 0.15,
                    borderWidth: '0.5px'
                  }}
                >
                   {/* Procedural Connections (SVG Lines) */}
                   <svg className="absolute inset-0 w-full h-full overflow-visible opacity-20">
                      {[...Array(4)].map((_, j) => (
                        <line 
                          key={j}
                          x1={`${j * 25}%`} y1="0" x2={`${100 - j * 25}%`} y2="100%"
                          stroke="#10b981"
                          strokeWidth="0.3"
                          strokeDasharray="4 8"
                          className="animate-[dash_10s_linear_infinite]"
                        />
                      ))}
                   </svg>
                </div>
              ))}

              {/* Core Processor Node */}
              <div className="absolute inset-0 flex items-center justify-center translate-z-120">
                 <div className={`w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-500 ${isHovered ? 'scale-125 rotate-45' : 'scale-100 rotate-0'}`}>
                    <Cpu className="w-8 h-8" />
                 </div>
              </div>
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-emerald-500 animate-ping' : 'bg-zinc-800'}`} />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold text-shadow-sm">Growth_Protocol: {isHovered ? 'STABILIZED' : 'PROXIMITY_SCAN'}</span>
           </div>
        </div>
      </div>
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
        .translate-z-120 { transform: translateZ(120px); }
      `}</style>
    </section>
  );
};
