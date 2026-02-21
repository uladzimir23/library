import React, { useState, useContext, useRef } from 'react';
import { LayoutGrid, Cpu, Zap, Box, Globe, Shield, Activity, Command } from 'lucide-react';
import { LanguageContext } from '../App';

const ICONS = [Cpu, Zap, Box, Globe, Shield, Activity, Command, LayoutGrid];

export const HolographicArray: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="holographic-array">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-8">
           <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/10 text-cyan-500 text-[9px] font-bold uppercase tracking-[0.4em]">Spatial_Array</span>
           <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
             Holographic <span className="text-cyan-500">Array.</span>
           </h2>
           <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
             Experience high-density volumetric interaction. A reactive grid of holographic nodes that detect proximity and elevate based on orbital gravity.
           </p>
           <div className="p-6 bg-zinc-900 rounded-[32px] border border-white/5 flex items-center justify-between">
              <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Signal_Strength: 94%</div>
              <div className="flex gap-1">
                 {Array.from({length: 8}).map((_, i) => (
                   <div key={i} className="w-1 h-3 bg-cyan-500/20 rounded-full" />
                 ))}
              </div>
           </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000"
        >
           <div className="grid grid-cols-4 gap-6 p-12 relative z-10 preserve-3d">
              {Array.from({ length: 16 }).map((_, i) => (
                <HoloNode key={i} index={i} mousePos={mousePos} icon={ICONS[i % ICONS.length]} />
              ))}
           </div>
           
           {/* Scanline Effect */}
           <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(6,182,212,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

const HoloNode: React.FC<{ index: number, mousePos: {x: number, y: number}, icon: any }> = ({ index, mousePos, icon: Icon }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elev, setElev] = useState(0);

  React.useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const parentRect = ref.current.parentElement?.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    const centerX = rect.left - parentRect.left + rect.width / 2;
    const centerY = rect.top - parentRect.top + rect.height / 2;
    
    const d = Math.hypot(mousePos.x - centerX, mousePos.y - centerY);
    const radius = 200;
    const strength = Math.max(0, 1 - d / radius);
    setElev(strength);
  }, [mousePos]);

  return (
    <div 
      ref={ref}
      className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 ease-out preserve-3d group"
      style={{ 
        transform: `translateZ(${elev * 80}px) rotateX(${elev * 20}deg) rotateY(${elev * -20}deg)`,
        borderColor: elev > 0.5 ? 'rgba(6, 182, 212, 0.5)' : 'rgba(255,255,255,0.1)',
        backgroundColor: `rgba(6, 182, 212, ${elev * 0.1})`
      }}
    >
       <Icon className={`w-6 h-6 transition-colors duration-500 ${elev > 0.5 ? 'text-cyan-400' : 'text-zinc-600'}`} />
       {elev > 0.7 && (
         <div className="absolute -inset-2 border border-cyan-500/20 rounded-[inherit] animate-pulse" />
       )}
    </div>
  );
};
