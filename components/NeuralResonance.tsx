
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Music, Activity, Waves, Zap } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralResonance: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
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

  const handleClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const newRipple = {
        id: Date.now(),
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      };
      setRipples(prev => [...prev.slice(-5), newRipple]);
    }
  };

  return (
    <div className="scroll-mt-24">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              01_Acoustic_Resonance
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Нейронный <br /><span className="text-indigo-500">Резонанс.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Интерфейс больше не безмолвен. Каждое движение порождает визуальное эхо, которое распространяется по сетке, передавая импульсы соседним узлам и создавая гармонический отклик материи.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10">
                <Waves className="w-8 h-8 text-indigo-500 mb-4 animate-pulse" />
                <div className="text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-widest">Freq_Spectrum</div>
                <div className="text-3xl font-tech font-bold text-zinc-900 dark:text-white">44.1 kHz</div>
             </div>
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10">
                <Music className="w-8 h-8 text-rose-500 mb-4" />
                <div className="text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-widest">Harmonic_Gain</div>
                <div className="text-3xl font-tech font-bold text-emerald-500">0.12 dB</div>
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          className="flex-[1.2] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5 cursor-crosshair"
        >
           {/* Декоративная сетка частот */}
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex items-end justify-between px-10 pb-10 gap-1">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-indigo-500 transition-all duration-300"
                  style={{ height: `${Math.random() * (ripples.length > 0 ? 80 : 20) + 10}%` }}
                />
              ))}
           </div>

           {/* Пульсирующие волны */}
           {ripples.map(ripple => (
             <div 
               key={ripple.id}
               className="absolute rounded-full border border-indigo-500/40 pointer-events-none animate-ripple-out"
               style={{ 
                 left: `${ripple.x}%`, 
                 top: `${ripple.y}%`,
                 width: '20px',
                 height: '20px'
               }}
             />
           ))}

           {/* Центральный резонатор */}
           <div 
             className="relative w-40 h-40 bg-indigo-600/10 backdrop-blur-3xl border border-indigo-500/30 rounded-full flex items-center justify-center transition-transform duration-75 ease-out"
             style={{ transform: `translate(${(mousePos.x - 0.5) * 40}px, ${(mousePos.y - 0.5) * 40}px)` }}
           >
              <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(99,102,241,0.4)]">
                 <Music className="w-10 h-10 animate-pulse" />
              </div>
              <div className="absolute inset-[-20px] border border-indigo-500/10 rounded-full animate-spin-slow" />
           </div>

           <div className="absolute bottom-12 right-12 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Resonance_Active: TRUE</span>
           </div>
        </div>
      </div>
      <style>{`
        @keyframes ripple-out {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(40); opacity: 0; }
        }
        .animate-ripple-out { animation: ripple-out 2s cubic-bezier(0, 0.2, 0.8, 1) forwards; }
      `}</style>
    </div>
  );
};
