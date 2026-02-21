import React, { useState, useContext, useRef, useEffect } from 'react';
import { Activity, Sliders, Zap, Database, Cpu, Waves } from 'lucide-react';
import { LanguageContext } from '../App';

export const StructuralInterference: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [freq, setFreq] = useState(2);
  const [amp, setAmp] = useState(15);
  const [damping, setDamping] = useState(0.5);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 0.05), 20);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="interference">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Control Panel */}
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-indigo-500">
              <Sliders className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Interference_Engine</span>
           </div>

           <div className="space-y-6">
              {[
                { label: 'Frequency', val: freq, set: setFreq, min: 1, max: 10, step: 0.1, icon: Waves },
                { label: 'Amplitude', val: amp, set: setAmp, min: 0, max: 50, step: 1, icon: Zap },
                { label: 'Damping', val: damping, set: setDamping, min: 0, max: 1, step: 0.01, icon: Database }
              ].map(ctrl => (
                <div key={ctrl.label} className="space-y-3">
                   <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                      <span className="flex items-center gap-2"><ctrl.icon className="w-3 h-3" /> {ctrl.label}</span>
                      <span className="font-mono text-indigo-500">{ctrl.val}</span>
                   </div>
                   <input 
                     type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.val}
                     onChange={e => ctrl.set(parseFloat(e.target.value))}
                     className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                   />
                </div>
              ))}
           </div>

           <div className="pt-6 border-t border-black/5 dark:border-white/10">
              <div className="flex items-center gap-3 text-emerald-500 mb-2">
                 <Cpu className="w-4 h-4" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">System_Stability</span>
              </div>
              <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">99.8%_NOMINAL</div>
           </div>
        </div>

        {/* Visualizer */}
        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 group cursor-crosshair shadow-2xl"
        >
           <div className="absolute inset-0 opacity-10" style={{ 
             backgroundImage: 'radial-gradient(#6366f1 0.5px, transparent 0.5px)', 
             backgroundSize: '20px 20px' 
           }} />

           <div className="relative w-80 h-[450px] preserve-3d">
              {Array.from({ length: 8 }).map((_, i) => {
                const phaseShift = i * damping;
                const offset = Math.sin(time * freq + phaseShift) * amp;
                return (
                  <div 
                    key={i}
                    className="absolute inset-0 border border-white/10 rounded-[40px] transition-all duration-75 flex items-center justify-center"
                    style={{ 
                      transform: `translateZ(${i * -40}px) translate(${mousePos.x * i * 20 + offset}px, ${mousePos.y * i * 20}px)`,
                      backgroundColor: `rgba(99, 102, 241, ${0.02 + (8-i) * 0.015})`,
                      backdropFilter: `blur(${i * 4}px)`,
                      zIndex: 10 - i,
                      opacity: 1 - (i * 0.1)
                    }}
                  >
                     {i === 0 && <div className="w-4 h-4 bg-indigo-500 rounded-full animate-ping shadow-[0_0_20px_#6366f1]" />}
                     <div className="absolute top-4 right-6 text-[7px] font-mono text-white/20">L_0{i}</div>
                  </div>
                );
              })}
           </div>

           <div className="absolute bottom-12 left-12 flex flex-col gap-1">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Cross_Layer_Sync: Active</span>
              </div>
              <div className="text-[8px] font-mono text-zinc-600 ml-5 uppercase tracking-tighter">Phase_Delta: {(damping * 360).toFixed(1)}deg</div>
           </div>
        </div>
      </div>
    </section>
  );
};
