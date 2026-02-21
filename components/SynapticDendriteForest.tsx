
import React, { useState, useEffect, useContext, useRef } from 'react';
import { GitBranch, Activity, Share2, Zap } from 'lucide-react';
import { LanguageContext } from '../App';

export const SynapticDendriteForest: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [branches, setBranches] = useState<{ x1: number, y1: number, x2: number, y2: number, opacity: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const nx = (e.clientX - rect.left) / rect.width * 100;
      const ny = (e.clientY - rect.top) / rect.height * 100;
      setMousePos({ x: nx, y: ny });
    }
  };

  useEffect(() => {
    // Генерация процедурных "корней" из краев к курсору
    const newBranches = Array.from({ length: 8 }).map((_, i) => {
      const side = i % 4; // 0: top, 1: right, 2: bottom, 3: left
      let x1 = 0, y1 = 0;
      if (side === 0) { x1 = (i * 25) % 100; y1 = 0; }
      if (side === 1) { x1 = 100; y1 = (i * 25) % 100; }
      if (side === 2) { x1 = (i * 25) % 100; y1 = 100; }
      if (side === 3) { x1 = 0; y1 = (i * 25) % 100; }
      
      return { x1, y1, x2: mousePos.x, y2: mousePos.y, opacity: 0.1 + Math.random() * 0.3 };
    });
    setBranches(newBranches);
  }, [mousePos]);

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              03_Synaptic_Arborization
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Нейронный <br /><span className="text-indigo-400">Лес.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Алгоритмы роста. Интерфейс постоянно выпускает новые «щупальца» данных, пытаясь дотянуться до вашего внимания. В точке фокуса плотность дендритов максимальна, создавая временные информационные хабы.
            </p>
          </div>

          <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 transition-all group-hover:scale-110">
                   <GitBranch className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Growth_Algorithm</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Fractal_Recursive</div>
                </div>
             </div>
             <Zap className="w-5 h-5 text-indigo-500 animate-pulse" />
          </div>
        </div>

        <div className="flex-[1.2] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5 cursor-crosshair">
           <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                 <filter id="forest-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
              </defs>
              
              {branches.map((b, i) => (
                <g key={i}>
                   {/* Основная ветка (кривая Безье) */}
                   <path 
                     d={`M ${b.x1}% ${b.y1}% C ${b.x1 + (b.x2 - b.x1)/2}% ${b.y1}%, ${b.x1}% ${b.y1 + (b.y2 - b.y1)/2}%, ${b.x2}% ${b.y2}%`}
                     fill="none" 
                     stroke="#6366f1" 
                     strokeWidth="1.5" 
                     className="transition-all duration-300 ease-out"
                     opacity={b.opacity}
                     filter="url(#forest-glow)"
                   />
                   {/* Фрактальные ответвления */}
                   <path 
                     d={`M ${b.x1 + (b.x2 - b.x1)*0.7}% ${b.y1 + (b.y2 - b.y1)*0.7}% L ${b.x1 + (b.x2 - b.x1)*0.8 + 5}% ${b.y1 + (b.y2 - b.y1)*0.8 - 5}%`}
                     fill="none" 
                     stroke="#6366f1" 
                     strokeWidth="0.5" 
                     opacity={b.opacity * 0.5}
                   />
                </g>
              ))}
           </svg>

           {/* Центральный узел (курсор) */}
           <div 
             className="absolute w-24 h-24 bg-indigo-600/10 backdrop-blur-xl border border-indigo-500/30 rounded-full flex items-center justify-center transition-all duration-75"
             style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%`, transform: 'translate(-50%, -50%)' }}
           >
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                 <Share2 className="w-6 h-6 animate-pulse" />
              </div>
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <Activity className="w-4 h-4 text-indigo-500" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">L-System_Generation: ACTIVE</span>
           </div>
        </div>
      </div>
    </div>
  );
};
