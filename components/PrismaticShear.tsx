
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Zap, Activity, Aperture, Wind } from 'lucide-react';
import { LanguageContext } from '../App';

export const PrismaticShear: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [velocity, setVelocity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    const v = Math.sqrt(dx*dx + dy*dy);
    setVelocity(prev => Math.min(prev + v * 0.1, 40));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const decay = setInterval(() => {
      setVelocity(prev => Math.max(0, prev - 1.5));
    }, 30);
    return () => clearInterval(decay);
  }, []);

  const text = "PRISMATIC_SHIFT";
  const letters = text.split("");

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              03_Chromatic_Kinetics
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Призматический <br /><span className="text-indigo-400">Сдвиг.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Материя имеет разную плотность для каждого цвета. При ускорении текст распадается на спектральные слои, создавая эффект хроматической аберрации, зависящей от скорости вашего взаимодействия.
            </p>
          </div>

          <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 transition-all group-hover:scale-110">
                   <Zap className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Spectral_Drift</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">{(velocity * 2.5).toFixed(0)} NM</div>
                </div>
             </div>
             <Activity className="w-5 h-5 text-indigo-500 animate-pulse" />
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5 cursor-crosshair">
           <div className="flex gap-1 items-center justify-center select-none font-tech font-black text-4xl md:text-5xl uppercase tracking-tighter">
              {letters.map((char, i) => (
                <div key={i} className="relative transition-transform duration-150">
                   {/* Основной (Белый) */}
                   <span className="relative z-10 text-white opacity-90">{char}</span>
                   
                   {/* Красный канал (Медленный) */}
                   <span 
                     className="absolute inset-0 text-rose-500 pointer-events-none mix-blend-screen transition-transform duration-300"
                     style={{ transform: `translate(${velocity * 0.8}px, ${velocity * 0.2}px)`, opacity: velocity / 40 }}
                   >
                     {char}
                   </span>

                   {/* Синий канал (Быстрый) */}
                   <span 
                     className="absolute inset-0 text-sky-500 pointer-events-none mix-blend-screen transition-transform duration-75"
                     style={{ transform: `translate(${-velocity * 0.5}px, ${-velocity * 0.1}px)`, opacity: velocity / 40 }}
                   >
                     {char}
                   </span>
                </div>
              ))}
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <Aperture className="w-4 h-4 text-indigo-500 animate-spin-slow" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Lens_Distortion: ACTIVE</span>
           </div>
           
           {/* Спидометр в углу */}
           <div className="absolute bottom-12 right-12 flex flex-col items-end opacity-40">
              <div className="text-[8px] font-mono text-white mb-2 uppercase">Velocity_Buffer</div>
              <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 transition-all duration-75" style={{ width: `${(velocity / 40) * 100}%` }} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
