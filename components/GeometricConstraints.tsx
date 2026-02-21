import React, { useState, useContext } from 'react';
import { Maximize2, Move, Box, Layers, Layout, LayoutGrid, Sliders } from 'lucide-react';
import { LanguageContext } from '../App';

export const GeometricConstraints: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [padding, setPadding] = useState(40);
  const [gap, setGap] = useState(20);
  const [is3D, setIs3D] = useState(true);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="geometric-constraints">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-start">
        <div className="flex-1 space-y-10 lg:sticky lg:top-40">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Matrix_Logic
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Geometric <br /><span className="text-emerald-500">Constraints.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Layout is a set of physical forces. We visualize margins, padding, and gaps as volumetric collision zones, ensuring architectural balance in every spatial viewport.
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 space-y-8">
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                   <span className="flex items-center gap-2"><Maximize2 className="w-3 h-3" /> Inner_Padding</span>
                   <span className="font-mono text-emerald-500">{padding}px</span>
                </div>
                <input 
                  type="range" min="10" max="80" step="1" value={padding}
                  onChange={e => setPadding(parseInt(e.target.value))}
                  className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
             </div>

             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                   <span className="flex items-center gap-2"><LayoutGrid className="w-3 h-3" /> Nodal_Gap</span>
                   <span className="font-mono text-emerald-500">{gap}px</span>
                </div>
                <input 
                  type="range" min="4" max="40" step="1" value={gap}
                  onChange={e => setGap(parseInt(e.target.value))}
                  className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
             </div>
          </div>

          <div className="flex gap-4">
             <button 
               onClick={() => setIs3D(!is3D)}
               className={`flex-1 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest border transition-all ${is3D ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg' : 'bg-black/5 dark:bg-white/5 border-transparent text-zinc-500'}`}
             >
               3D_Volume_View
             </button>
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[700px] bg-zinc-50 dark:bg-zinc-950/40 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 shadow-inner">
           {/* Ruler Grid */}
           <div className="absolute inset-0 opacity-10" style={{ 
             backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }} />

           {/* The Container Object */}
           <div 
             className="relative w-[500px] h-[350px] transition-all duration-700 ease-out preserve-3d"
             style={{ 
               transform: is3D ? 'rotateX(55deg) rotateZ(-35deg)' : 'rotateX(0deg) rotateZ(0deg)',
             }}
           >
              {/* Outer Shell (The "Div") */}
              <div className="absolute inset-0 border-2 border-emerald-500/40 rounded-3xl bg-white/5 backdrop-blur-md">
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[7px] font-mono text-emerald-500 font-bold uppercase tracking-widest">box_model_0x88</div>
                 
                 {/* Internal Padding Visualization (Force Field) */}
                 <div 
                   className="absolute border border-dashed border-emerald-500/20 bg-emerald-500/5 transition-all duration-500"
                   style={{ inset: `${padding}px` }}
                 >
                    {/* Content Atoms */}
                    <div className="h-full flex flex-wrap content-start gap-4 p-4" style={{ gap: `${gap}px` }}>
                       {[...Array(6)].map((_, i) => (
                         <div 
                           key={i}
                           className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center group"
                           style={{ transform: is3D ? `translateZ(${i * 10}px)` : 'none' }}
                         >
                            <Box className="w-6 h-6 text-emerald-500/40 group-hover:text-emerald-500 transition-colors" />
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Vertical Laser Callouts */}
              {is3D && (
                <div className="absolute inset-0 pointer-events-none">
                   <div className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-emerald-500 to-transparent -translate-z-40" />
                   <div className="absolute top-0 right-0 w-1 h-32 bg-gradient-to-b from-emerald-500 to-transparent -translate-z-40" />
                </div>
              )}
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                 <Layout className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                 <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Coordinate_System</div>
                 <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white uppercase">W:500 H:350 Z:{(padding * 1.5).toFixed(0)}</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
