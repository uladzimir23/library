
import React, { useState, useContext, useRef } from 'react';
import { Eye, Wind, MousePointer2, Activity, Fingerprint } from 'lucide-react';
import { LanguageContext } from '../App';

export const PhototacticSwarm: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      // Нормализация координат 0..1 для всего контейнера
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  const gridSize = 6;
  const eyes = Array.from({ length: gridSize * gridSize });

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              02_Phototactic_Aperture
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Фототаксис <br /><span className="text-sky-500">Взгляда.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Интерфейс наблюдает за вами. Апертуры системы физически ориентируются на ваш курсор, расширяя зрачки при приближении, имитируя реакцию живой сетчатки на свет.
            </p>
          </div>

          <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 transition-all group-hover:scale-110">
                   <Eye className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Pupil_Dilation</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Active_Scan</div>
                </div>
             </div>
             <Activity className="w-5 h-5 text-sky-500 animate-pulse" />
          </div>
        </div>

        <div className="flex-[1.2] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5 cursor-none">
           {/* Сетка апертур */}
           <div className="grid h-full w-full p-16 gap-4" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}>
              {eyes.map((_, i) => {
                // Расчет позиции конкретного глаза в сетке 0..1
                const ix = i % gridSize;
                const iy = Math.floor(i / gridSize);
                const cellX = ix / (gridSize - 1);
                const cellY = iy / (gridSize - 1);
                
                // Вектор от глаза к курсору
                const dx = mousePos.x - cellX;
                const dy = mousePos.y - cellY;
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Расширение зрачка зависит от близости (0.3..1.0)
                const dilation = Math.max(0.3, 1 - dist * 1.5);
                // Ограничение смещения зрачка внутри глаза
                const offset = Math.min(dist * 10, 6);

                return (
                  <div key={i} className="flex items-center justify-center">
                     <div 
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-colors duration-500 bg-white/5 shadow-inner"
                        style={{ transform: `rotate(${angle}deg)` }}
                     >
                        <div 
                          className="w-4 h-4 bg-sky-500 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-transform duration-200"
                          style={{ transform: `scale(${dilation}) translateX(${offset}px)` }}
                        />
                     </div>
                  </div>
                );
              })}
           </div>

           {/* Световой курсор (подсветка) */}
           <div 
             className="absolute w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none transition-transform duration-150 ease-out"
             style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
           />
           
           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Vision_System: ONLINE</span>
           </div>
        </div>
      </div>
    </div>
  );
};
