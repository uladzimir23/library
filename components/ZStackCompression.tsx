import React, { useState, useContext } from 'react';
import { Layers, Zap, MousePointer2, Activity, Shield, Maximize2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const ZStackCompression: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="z-stack-compression">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Force_Feedback
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Z-Stack <br /><span className="text-indigo-500">Compression.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces should respond to pressure. Our Z-stack compression logic allows the hierarchy to physically squish under user interaction, establishing a tactile connection between the cursor and the underlying data layers.
            </p>
          </div>

          <div className="p-10 bg-zinc-900 rounded-[48px] border border-white/10 space-y-8">
             <div className="flex justify-between items-center text-indigo-500">
                <div className="flex items-center gap-4">
                   <Maximize2 className="w-6 h-6" />
                   <span className="text-xs font-bold uppercase tracking-[0.2em]">Compression_Delta</span>
                </div>
                <span className="text-2xl font-tech font-bold">{isPressed ? '120px' : '40px'}</span>
             </div>
             <button 
               onMouseDown={() => setIsPressed(true)}
               onMouseUp={() => setIsPressed(false)}
               onMouseLeave={() => setIsPressed(false)}
               className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-xl"
             >
               Press_to_Compress
             </button>
          </div>
        </div>

        <div className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl">
           {/* Visual Stack of Layers */}
           <div className="relative w-80 h-56 preserve-3d">
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="absolute inset-0 border border-white/20 rounded-[32px] transition-all duration-700 ease-out flex flex-col items-center justify-center p-8"
                  style={{ 
                    transform: `translateZ(${isPressed ? i * 20 : i * 60}px) scale(${1 - i * 0.05})`,
                    backgroundColor: `rgba(99, 102, 241, ${0.05 + i * 0.05})`,
                    backdropFilter: `blur(${isPressed ? 40 : 10}px)`,
                    opacity: 1 - (i * 0.15)
                  }}
                >
                   {i === 3 && <Layers className="w-12 h-12 text-indigo-500 animate-pulse" />}
                   <div className="absolute top-4 right-6 text-[7px] font-mono text-white/20 uppercase tracking-widest">Buffer_Slice_0{i}</div>
                </div>
              ))}
           </div>

           {/* Perspective HUD info */}
           <div className="absolute bottom-12 right-12 flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full transition-all duration-500 ${isPressed ? 'bg-indigo-500 shadow-[0_0_15px_#6366f1]' : 'bg-zinc-800'}`} />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Matter_State: {isPressed ? 'COMPRESSED' : 'STABLE'}</span>
           </div>
        </div>
      </div>
    </section>
  );
};
