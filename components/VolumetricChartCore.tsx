import React, { useState, useContext } from 'react';
import { BarChart3, TrendingUp, Zap, Activity, Layers, Maximize } from 'lucide-react';
import { LanguageContext } from '../App';

export const VolumetricChartCore: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const data = [40, 70, 45, 90, 65, 80, 50];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="volumetric-charts">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Data_Weight
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Volumetric <br /><span className="text-emerald-500">Chart_Core.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Data has mass. We visualize complex datasets as physical structures where height, glow, and refraction reflect real-time metrics, providing a deeper intuitive understanding of informational flow.
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-[24px] flex items-center justify-center text-emerald-500">
                   <TrendingUp className="w-7 h-7" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Market_Flux</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">+12.4%_UP</div>
                </div>
             </div>
             <Activity className="w-6 h-6 text-emerald-500 animate-pulse" />
          </div>
        </div>

        <div className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-end justify-center px-12 pb-24 group perspective-2000 shadow-2xl">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#10b981_1px,transparent_1px)] bg-[length:30px_30px]" />
           
           <div className="flex items-end gap-4 relative z-10 w-full max-w-lg h-64 preserve-3d">
              {data.map((val, i) => (
                <div 
                  key={i}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="flex-1 relative transition-all duration-700 cursor-pointer"
                  style={{ 
                    height: `${val}%`,
                    transform: hoveredIdx === i ? 'translateZ(40px) scaleX(1.1)' : 'translateZ(0px) scaleX(1)',
                  }}
                >
                   {/* 3D Bar Visual */}
                   <div className={`absolute inset-0 bg-emerald-500/20 border border-white/20 rounded-t-xl backdrop-blur-xl transition-all duration-500 ${hoveredIdx === i ? 'bg-emerald-500/40 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : ''}`}>
                      {/* Glow inside */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 transition-opacity ${hoveredIdx === i ? 'opacity-100' : ''}`} />
                   </div>
                   
                   {/* Tooltip on hover */}
                   <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 px-3 py-1.5 rounded-xl transition-all duration-300 shadow-2xl ${hoveredIdx === i ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'}`}>
                      <div className="text-[10px] font-tech font-bold text-emerald-500 uppercase tracking-tighter">{val} units</div>
                   </div>
                </div>
              ))}
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Volumetric_Processor: ACTIVE</span>
           </div>
        </div>
      </div>
    </section>
  );
};
