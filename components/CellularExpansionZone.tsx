import React, { useState, useContext, useEffect } from 'react';
import { LayoutGrid, Target, Zap, Activity, Box, Maximize2, Share2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const CellularExpansionZone: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [autoScale, setAutoScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoScale(1 + Math.sin(Date.now() / 1000) * 0.05);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="cellular-expansion">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Morphological_Scale
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Cellular <br /><span className="text-rose-500">Expansion.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are not rigid templates. This zone visualizes cellular mitosis, where elements expand their volumetric footprint automatically to find ecological balance within the viewport.
            </p>
          </div>

          <div className="space-y-6">
             <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex items-center justify-between group">
                <div className="flex items-center gap-5">
                   <Maximize2 className="w-6 h-6 text-rose-500" />
                   <div>
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Growth_Factor</div>
                      <div className="text-lg font-tech font-bold text-white uppercase tracking-widest">{autoScale.toFixed(2)}x_AUTO</div>
                   </div>
                </div>
                <Activity className="w-5 h-5 text-rose-500 animate-pulse" />
             </div>
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center p-12 group shadow-2xl">
           <div className="grid grid-cols-2 gap-8 w-full max-w-2xl relative z-10">
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative aspect-square transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) cursor-pointer overflow-hidden ${
                    hoveredIdx === i ? 'scale-110 z-50' : 'scale-100 z-10'
                  }`}
                  style={{ transform: `scale(${hoveredIdx === i ? 1.1 : autoScale})` }}
                >
                   <div className={`absolute inset-0 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-3xl transition-all duration-700 ${
                     hoveredIdx === i ? 'bg-rose-500/20 border-rose-500/60 shadow-[0_0_60px_rgba(244,63,94,0.3)]' : ''
                   }`}>
                      <div className="p-10 h-full flex flex-col justify-between">
                         <div className="flex justify-between items-start">
                            <Box className={`w-8 h-8 transition-colors ${hoveredIdx === i ? 'text-rose-500' : 'text-zinc-700'}`} />
                            <div className="text-[10px] font-mono text-zinc-600">0x0{i}</div>
                         </div>
                         <div className="space-y-2">
                            <div className="h-1.5 w-24 bg-white/10 rounded-full" />
                            <div className="h-1 w-16 bg-white/5 rounded-full" />
                         </div>
                      </div>
                      
                      {/* Growth HUD overlay on hover */}
                      <div className={`absolute bottom-6 right-8 transition-opacity duration-500 ${hoveredIdx === i ? 'opacity-100' : 'opacity-0'}`}>
                         <span className="text-[8px] font-bold text-rose-500 uppercase tracking-[0.2em]">Mitosis_Active</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           {/* Background Noise/Grain */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      </div>
    </section>
  );
};
