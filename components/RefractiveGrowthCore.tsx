import React, { useState, useContext, useEffect } from 'react';
import { Target, Zap, Activity, Cpu, Radio, Disc, Maximize, Shield } from 'lucide-react';
import { LanguageContext } from '../App';

export const RefractiveGrowthCore: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [spread, setSpread] = useState(0); // 0 to 1
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (!isLocked) {
      const interval = setInterval(() => {
        setSpread(prev => (Math.sin(Date.now() / 1500) + 1) / 2);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isLocked]);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#080808]" id="growth-core">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Structural_Evolution
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Refractive <br /><span className="text-indigo-500">Growth_Core.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Intelligence evolves in layers. This growth core automatically expands its structural disks to reveal informational depth, utilizing procedural Z-mapping to maintain optical consistency.
            </p>
          </div>

          <div className="space-y-4">
             <button 
               onClick={() => setIsLocked(!isLocked)}
               className={`w-full py-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${isLocked ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'bg-black text-white hover:bg-zinc-800'}`}
             >
                {isLocked ? <Shield className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                {isLocked ? 'Release_Evolution' : 'Lock_Structural_State'}
             </button>
             <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest font-bold opacity-40">Auto_Calibration_v0.92</p>
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl">
           {/* Deep Light Rays */}
           <div className="absolute inset-0 opacity-20 bg-[conic-gradient(from_0deg,transparent,#6366f1,transparent)] animate-[spin_10s_linear_infinite]" />

           {/* The Growth Stack */}
           <div className="relative w-80 h-80 preserve-3d flex items-center justify-center">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute border border-white/10 rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    width: `${240 - i * 15}px`,
                    height: `${240 - i * 15}px`,
                    transform: `translateZ(${spread * i * 60}px) rotate(${spread * i * 45}deg)`,
                    backgroundColor: `rgba(99, 102, 241, ${0.05 + i * 0.01})`,
                    backdropFilter: `blur(${spread * 20}px)`,
                    opacity: 1 - i * 0.08,
                    boxShadow: spread > 0.5 ? `0 0 40px rgba(99, 102, 241, 0.1)` : 'none'
                  }}
                >
                   {i === 0 && <div className="absolute inset-0 flex items-center justify-center"><Disc className="w-12 h-12 text-indigo-500 opacity-60 animate-spin-slow" /></div>}
                </div>
              ))}
           </div>

           {/* Perspective HUD Labels */}
           <div className="absolute top-12 right-12 text-right">
              <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-bold mb-1">Stack_Depth: {(spread * 600).toFixed(0)}px</div>
              <div className="text-[8px] font-mono text-zinc-600 uppercase">Evolution_Phase: {isLocked ? 'STATIC' : 'DYNAMIC'}</div>
           </div>
        </div>
      </div>
    </section>
  );
};
