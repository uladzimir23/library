
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Anchor, Activity, Zap, ArrowRight } from 'lucide-react';
import { LanguageContext } from '../App';

export const ElasticStringMatter: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [offsets, setOffsets] = useState<number[]>(new Array(10).fill(0));
  const mouseX = useRef(0);
  const lastMouseX = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.current = e.clientX;
    const delta = (mouseX.current - lastMouseX.current) * 0.5;
    
    // Влияем на первую букву
    setOffsets(prev => {
      const next = [...prev];
      next[0] += delta;
      return next;
    });
    
    lastMouseX.current = mouseX.current;
  };

  useEffect(() => {
    const ticker = setInterval(() => {
      setOffsets(prev => {
        const next = [...prev];
        const stiffness = 0.15;
        const damping = 0.85;

        for (let i = 0; i < next.length; i++) {
          // Сила возврата к 0
          const recoil = -stiffness * next[i];
          
          // Взаимодействие с соседом (передача импульса)
          let neighborForce = 0;
          if (i > 0) {
            neighborForce += (next[i-1] - next[i]) * 0.2;
          }
          if (i < next.length - 1) {
            neighborForce += (next[i+1] - next[i]) * 0.2;
          }

          next[i] = (next[i] + recoil + neighborForce) * damping;
        }
        return next;
      });
    }, 16);
    return () => clearInterval(ticker);
  }, []);

  const text = "ELASTICITY";
  const letters = text.split("");

  return (
    <div className="scroll-mt-24" onMouseMove={handleMouseMove}>
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              02_Spring_Coupling
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Нить <br /><span className="text-amber-500">Материи.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Данные имеют инерцию. Буквы соединены виртуальными пружинами. Малейшее колебание в начале строки вызывает волну затухающих колебаний, проходящую сквозь всю структуру.
            </p>
          </div>

          <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 transition-all group-hover:scale-110">
                   <Anchor className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Damping_Factor</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">0.85_BETA</div>
                </div>
             </div>
             <ArrowRight className="w-5 h-5 text-amber-500 animate-pulse" />
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5">
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
           
           <div className="flex gap-4 items-center justify-center select-none">
              {letters.map((char, i) => (
                <div 
                  key={i} 
                  className="text-6xl md:text-8xl font-tech font-black text-amber-500 transition-transform duration-75 will-change-transform"
                  style={{ 
                    transform: `translateY(${offsets[i]}px) rotate(${offsets[i] * 0.2}deg)`,
                    opacity: 1 - (Math.abs(offsets[i]) / 200)
                  }}
                >
                  {char}
                </div>
              ))}
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <Activity className="w-4 h-4 text-amber-500" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Vibration_Sync: ACTIVE</span>
           </div>
        </div>
      </div>
    </div>
  );
};
