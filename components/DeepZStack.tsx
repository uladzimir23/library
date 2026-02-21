import React, { useState, useContext, useRef } from 'react';
import { Layers, ArrowDown, Zap, Maximize, MousePointer2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const DeepZStack: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5
      });
    }
  };

  const layers = [
    { z: -200, scale: 1.2, blur: 20, opacity: 0.1, color: 'indigo' },
    { z: -100, scale: 1.1, blur: 10, opacity: 0.2, color: 'blue' },
    { z: 0, scale: 1, blur: 0, opacity: 1, color: 'white' },
    { z: 100, scale: 0.9, blur: 5, opacity: 0.4, color: 'cyan' },
    { z: 200, scale: 0.8, blur: 15, opacity: 0.2, color: 'emerald' }
  ];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="deep-z">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-8">
           <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em]">Spatial_Dynamics</span>
           <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
             Deep-Z <span className="text-indigo-500">Stack.</span>
           </h2>
           <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
             Infinite depth as a design construct. Layers are separated by massive Z-axis deltas, creating a profound sense of physical volume that reacts to your perspective.
           </p>
           <div className="flex gap-4">
              <div className="flex-1 p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5 text-center">
                 <Maximize className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
                 <div className="text-[10px] font-bold text-zinc-400 uppercase">Delta_Range</div>
                 <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white">400px</div>
              </div>
              <div className="flex-1 p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5 text-center">
                 <Layers className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
                 <div className="text-[10px] font-bold text-zinc-400 uppercase">Layer_Count</div>
                 <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white">05_UNITS</div>
              </div>
           </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({x:0, y:0})}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000"
        >
           {/* Background Void */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_80%)]" />

           <div className="relative w-full h-full flex items-center justify-center preserve-3d">
              {layers.map((layer, i) => (
                <div 
                  key={i}
                  className="absolute w-80 h-56 border border-white/10 rounded-[32px] backdrop-blur-md flex items-center justify-center transition-all duration-700 ease-out shadow-2xl"
                  style={{ 
                    transform: `translateZ(${layer.z}px) translate(${mousePos.x * (layer.z / 2)}px, ${mousePos.y * (layer.z / 2)}px) scale(${layer.scale})`,
                    opacity: layer.opacity,
                    backgroundColor: i === 2 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                    filter: `blur(${layer.blur}px)`
                  }}
                >
                   <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Stack_Slice_0{i}</div>
                   {i === 2 && (
                     <div className="absolute top-6 left-8 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                        <span className="text-[8px] font-bold text-indigo-500 uppercase">Focus_Plane</span>
                     </div>
                   )}
                </div>
              ))}
           </div>

           <div className="absolute bottom-12 right-12 flex items-center gap-3 text-zinc-500">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Z_Axis_Calibration_Active</span>
           </div>
        </div>
      </div>
    </section>
  );
};
