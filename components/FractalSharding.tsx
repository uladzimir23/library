import React, { useState, useContext, useRef } from 'react';
import { Target, Zap, Layers, RefreshCw, Triangle, Sliders, Box } from 'lucide-react';
import { LanguageContext } from '../App';

export const FractalSharding: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [iterations, setIterations] = useState(3);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isExploded, setIsExploded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="fractal">
      <div className="flex flex-col lg:flex-row-reverse gap-16 items-start">
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-sky-400">
              <Layers className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Procedural_Fractal</span>
           </div>

           <div className="space-y-6">
              <div className="space-y-4">
                 <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                    <span className="flex items-center gap-2"><Sliders className="w-3 h-3" /> Iteration_Depth</span>
                    <span className="font-mono text-sky-500">{iterations}</span>
                 </div>
                 <input 
                   type="range" min="1" max="6" step="1" value={iterations}
                   onChange={e => setIterations(parseInt(e.target.value))}
                   className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                 />
              </div>

              <button 
                onClick={() => setIsExploded(!isExploded)}
                className={`w-full py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 ${isExploded ? 'bg-sky-500 text-white' : 'bg-black/5 dark:bg-white/5 text-zinc-500'}`}
              >
                {isExploded ? 'Reform_Core' : 'Trigger_Shatter'}
              </button>
           </div>

           <div className="p-6 bg-zinc-900 rounded-3xl border border-white/5">
              <div className="text-[8px] font-mono text-zinc-500 uppercase mb-4 tracking-widest">Shard_Buffer: OK</div>
              <div className="text-xl font-tech font-bold text-sky-400">{(Math.pow(2, iterations)).toFixed(0)}_SEGMENTS</div>
           </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 group shadow-2xl"
        >
           {/* Shard Field */}
           <div 
             className="relative w-96 h-96 transition-all duration-700 ease-out preserve-3d"
             style={{ transform: `rotateX(${mousePos.y * -20}deg) rotateY(${mousePos.x * 20}deg)` }}
           >
              {[...Array(Math.min(iterations * 4, 16))].map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 border border-white/20 transition-all duration-1000 ease-in-out bg-white/5 backdrop-blur-md"
                  style={{ 
                    transform: isExploded 
                      ? `translateZ(${i * 40}px) translate(${(i-8)*30}px, ${(i-8)*10}px) rotate(${i*45}deg) scale(0.6)` 
                      : `translateZ(${i * 2}px) scale(${1 - i * 0.02})`,
                    clipPath: i % 2 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'polygon(0% 0%, 100% 0%, 50% 100%)',
                    opacity: 1 - (i * 0.05)
                  }}
                >
                   <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent" />
                   {i === 0 && <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-sky-400 opacity-20" />}
                </div>
              ))}
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Procedural_Matter_Generator</span>
           </div>
        </div>
      </div>
    </section>
  );
};
