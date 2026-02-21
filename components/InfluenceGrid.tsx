import React, { useState, useContext, useRef } from 'react';
import { Grid, Target, Layers, Box, Cpu, Fingerprint } from 'lucide-react';
import { LanguageContext } from '../App';

export const InfluenceGrid: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [radius, setRadius] = useState(250);
  const [zPush, setZPush] = useState(60);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const cells = Array.from({ length: 25 }); // 5x5 Grid

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="influence-grid">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-sky-500">
              <Grid className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Influence_Mesh</span>
           </div>

           <div className="space-y-6">
              {[
                { label: 'Effect Radius', val: radius, set: setRadius, min: 100, max: 400, step: 1, icon: Target },
                { label: 'Z-Axis Push', val: zPush, set: setZPush, min: 20, max: 150, step: 1, icon: Layers }
              ].map(ctrl => (
                <div key={ctrl.label} className="space-y-3">
                   <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                      <span className="flex items-center gap-2"><ctrl.icon className="w-3 h-3" /> {ctrl.label}</span>
                      <span className="font-mono text-sky-500">{ctrl.val}px</span>
                   </div>
                   <input 
                     type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.val}
                     onChange={e => ctrl.set(parseFloat(e.target.value))}
                     className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                   />
                </div>
              ))}
           </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000"
        >
           <div className="grid grid-cols-5 gap-4 w-full max-w-2xl px-8">
              {cells.map((_, i) => (
                <Cell 
                  key={i} 
                  index={i} 
                  mousePos={mousePos} 
                  radius={radius} 
                  zPush={zPush} 
                />
              ))}
           </div>

           {/* Custom Cursor Circle */}
           <div 
             className="absolute w-64 h-64 border border-sky-500/10 rounded-full pointer-events-none transition-all duration-300"
             style={{ 
               left: mousePos.x - 128, 
               top: mousePos.y - 128,
               backgroundColor: 'rgba(14, 165, 233, 0.03)',
               backdropFilter: 'blur(2px)',
               opacity: mousePos.x === -1000 ? 0 : 1
             }}
           />
        </div>
      </div>
    </section>
  );
};

const Cell: React.FC<{ index: number, mousePos: {x: number, y: number}, radius: number, zPush: number }> = ({ index, mousePos, radius, zPush }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(1);

  React.useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const parentRect = ref.current.parentElement?.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    const centerX = rect.left - parentRect.left + rect.width / 2;
    const centerY = rect.top - parentRect.top + rect.height / 2;
    
    const d = Math.hypot(mousePos.x - centerX, mousePos.y - centerY);
    const normalized = Math.max(0, 1 - d / radius);
    setDist(normalized);
  }, [mousePos, radius]);

  return (
    <div 
      ref={ref}
      className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center transition-all duration-300 ease-out"
      style={{ 
        transform: `translateZ(${dist * -zPush}px)`,
        opacity: 0.2 + dist * 0.8,
        borderColor: dist > 0.5 ? 'rgba(14, 165, 233, 0.5)' : 'rgba(255,255,255,0.1)'
      }}
    >
       <Box className={`w-6 h-6 transition-colors ${dist > 0.5 ? 'text-sky-400' : 'text-zinc-600'}`} />
    </div>
  );
};
