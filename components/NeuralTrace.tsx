import React, { useState, useContext, useRef } from 'react';
import { Target, Scan, Cpu, Activity, Zap, Compass, Crosshair } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralTrace: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="neural-trace">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Cognitive_Design
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              Neural <span className="text-indigo-500">Trace.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              Interfaces that watch you back. Our neural trace engine calculates informational importance based on your focal point, revealing metadata in real-time.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 space-y-6">
             <div className="flex justify-between items-center text-indigo-500">
                <div className="flex items-center gap-3">
                   <Target className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Active_Lock_v1.2</span>
                </div>
                <Activity className="w-5 h-5 animate-pulse" />
             </div>
             <div className="font-mono text-[9px] text-zinc-500 space-y-1">
                <div>X_COORD: {mousePos.x.toFixed(4)}</div>
                <div>Y_COORD: {mousePos.y.toFixed(4)}</div>
                <div>DEPTH_BIAS: 0.124_PRO</div>
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group cursor-none"
        >
           {/* HUD Lines */}
           <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-0 w-[1px] h-full bg-indigo-500 transition-all duration-75" style={{ left: `${mousePos.x * 100}%` }} />
              <div className="absolute left-0 w-full h-[1px] bg-indigo-500 transition-all duration-75" style={{ top: `${mousePos.y * 100}%` }} />
           </div>

           <div className="relative w-80 h-96 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-3xl shadow-2xl flex flex-col items-center justify-center p-12 transition-all duration-500 group-hover:scale-[0.98]">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-500 mb-8">
                 <Cpu className="w-8 h-8" />
              </div>
              <div className="space-y-4 w-full">
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${mousePos.x * 100}%` }} />
                 </div>
                 <div className="h-2 w-2/3 bg-white/5 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-indigo-500/40 transition-all duration-500" style={{ width: `${mousePos.y * 100}%` }} />
                 </div>
              </div>
           </div>

           {/* Crosshair Cursor */}
           <div 
             className="absolute w-24 h-24 pointer-events-none transition-transform duration-75"
             style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
           >
              <Crosshair className="w-full h-full text-indigo-500/40" />
              <div className="absolute top-1/2 left-full ml-4 whitespace-nowrap bg-indigo-600 text-white text-[8px] px-2 py-1 rounded font-mono font-bold">
                LOCK_IDENTIFIED
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
