import React, { useState, useContext, useRef, useEffect } from 'react';
import { Grid, Target, Zap, Activity, RefreshCw, Layers } from 'lucide-react';
import { LanguageContext } from '../App';

export const EntropyGridShift: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [entropy, setEntropy] = useState(0); // 0 to 1
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    setEntropy(prev => Math.min(1, prev + 0.05));
  };

  useEffect(() => {
    const cooldown = setInterval(() => {
      setEntropy(prev => Math.max(0, prev - 0.02));
    }, 50);
    return () => clearInterval(cooldown);
  }, []);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#080808]" id="entropy">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Structural_Entropy
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Entropy <br /><span className="text-emerald-500">Grid_Shift.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Order is temporary. Experience a grid that destabilizes under high-velocity interaction, shifting from a rigid lattice to a cloud of stochastic probability before reforming its original geometry.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex flex-col gap-3">
                <RefreshCw className={`w-6 h-6 text-emerald-500 ${entropy > 0.5 ? 'animate-spin' : ''}`} />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Stability_Index</div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase">{(100 - entropy * 100).toFixed(0)}%_SYNC</div>
             </div>
             <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex flex-col gap-3">
                <Activity className="w-6 h-6 text-indigo-500 animate-pulse" />
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Chaos_Level</div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase">0x{Math.floor(entropy * 255).toString(16)}</div>
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center shadow-2xl group cursor-crosshair"
        >
           {/* The Entropy Grid */}
           <div className="grid grid-cols-8 grid-rows-8 gap-6 relative z-10 w-full max-w-md px-8">
              {[...Array(64)].map((_, i) => (
                <div 
                  key={i}
                  className="aspect-square bg-white/5 border border-white/10 rounded-lg transition-all duration-700 ease-out"
                  style={{ 
                    transform: `translate(${entropy * (Math.random() - 0.5) * 200}px, ${entropy * (Math.random() - 0.5) * 200}px) rotate(${entropy * (Math.random() - 0.5) * 180}deg) scale(${1 - entropy * 0.4})`,
                    opacity: 0.1 + (1 - entropy) * 0.4,
                    borderColor: entropy > 0.6 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255,255,255,0.1)'
                  }}
                />
              ))}
           </div>

           {/* Scanning Light */}
           <div 
             className="absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-300"
             style={{ 
               left: `calc(${mousePos.x * 100}% - 200px)`, 
               top: `calc(${mousePos.y * 100}% - 200px)`,
               background: `radial-gradient(circle at center, rgba(16, 185, 129, ${0.1 + entropy * 0.2}) 0%, transparent 70%)`,
               filter: 'blur(40px)'
             }}
           />

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${entropy > 0.1 ? 'bg-emerald-500 animate-ping' : 'bg-zinc-800'}`} />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Lattice_Calibration: {entropy > 0.1 ? 'ACTIVE' : 'IDLE'}</span>
           </div>
        </div>
      </div>
    </section>
  );
};
