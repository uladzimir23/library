import React, { useState, useContext, useEffect } from 'react';
import { Box, Layers, Zap, Activity, Shield, Maximize2, Droplets } from 'lucide-react';
import { LanguageContext } from '../App';

export const OsmoticCell: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [breath, setBreath] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let start = 0;
    const animate = () => {
      start += 0.015;
      setBreath((Math.sin(start) + 1) / 2);
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="osmotic-cell">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Cellular_Metabolism
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Osmotic <br /><span className="text-indigo-500">Data_Cell.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6 italic">
              "Soft-body information." This cell undergoes continuous morphological shifts, automatically balancing its structural density through a simulated osmotic exchange with the viewport environment.
            </p>
          </div>

          <div className="space-y-4">
             <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-5">
                   <Droplets className="w-6 h-6 text-indigo-500" />
                   <div>
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Internal_Pressure</div>
                      <div className="text-xl font-tech font-bold text-white uppercase tracking-widest">{(0.5 + breath * 0.5).toFixed(2)}_BAR</div>
                   </div>
                </div>
                <div className={`w-3 h-3 rounded-full transition-all duration-1000 ${breath > 0.8 ? 'bg-indigo-500 shadow-[0_0_15px_#6366f1]' : 'bg-zinc-800'}`} />
             </div>
          </div>
        </div>

        <div 
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
          className="flex-[1.5] w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl"
        >
           {/* Osmotic Halo */}
           <div 
             className="absolute w-96 h-96 rounded-full transition-all duration-1000 blur-[100px] opacity-10"
             style={{ 
               backgroundColor: '#6366f1',
               transform: `scale(${1 + breath * 0.4})`,
               opacity: 0.05 + breath * 0.1
             }}
           />

           {/* The Soft Cell */}
           <div 
             className="relative w-80 h-96 transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) border border-white/10 flex flex-col items-center justify-center p-12 overflow-hidden shadow-2xl"
             style={{ 
               backgroundColor: `rgba(255, 255, 255, ${0.05 + breath * 0.05})`,
               backdropFilter: `blur(${20 + breath * 40}px)`,
               borderRadius: `${48 + (1-breath) * 64}px ${48 + breath * 64}px`,
               transform: `scale(${isFocused ? 1.05 : 1}) translateZ(${breath * 50}px)`,
               borderColor: `rgba(99, 102, 241, ${0.1 + breath * 0.3})`
             }}
           >
              <div className="relative z-10 flex flex-col items-center gap-8">
                 <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-2xl transition-all duration-1000"
                      style={{ borderRadius: `${24 + (1-breath) * 24}px` }}>
                    <Shield className="w-10 h-10 animate-pulse" />
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-white">Matter_Core_v9</div>
                    <div className="text-2xl font-tech font-bold text-white uppercase tracking-tighter">OSMOTIC_088</div>
                 </div>
              </div>

              {/* Internal Refraction Mesh */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
           </div>

           <div className="absolute top-12 right-12 text-right">
              <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-bold mb-1">State_Cycle: DYNAMIC</div>
              <div className="text-[8px] font-mono text-zinc-500 uppercase">Buffer_Coord_Z: {breath.toFixed(4)}</div>
           </div>
        </div>
      </div>
    </section>
  );
};
