
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AudioLines, Activity, Zap, Radio } from 'lucide-react';
import { LanguageContext } from '../App';

export const SonicLevitationType: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [frequency, setFrequency] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
      setFrequency(prev => Math.min(1, prev + 0.1));
    }
  };

  useEffect(() => {
    const decay = setInterval(() => setFrequency(f => Math.max(0, f - 0.05)), 100);
    return () => clearInterval(decay);
  }, []);

  const text = "ACOUSTIC_VOID";
  const letters = text.split("");

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              03_Sonic_Levitation
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Звуковая <br /><span className="text-rose-500">Левитация.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Материя управляется звуком. Курсор генерирует акустическое давление, которое заставляет буквы дрожать и подниматься в Z-пространстве. При максимальной частоте буквы распадаются на высокочастотные фрагменты.
            </p>
          </div>

          <div className="p-8 bg-zinc-900/50 rounded-[40px] border border-white/10 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 transition-all group-hover:scale-110">
                   <AudioLines className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Sonic_Frequency</div>
                   <div className="text-lg font-tech font-bold text-white uppercase tracking-widest">{(frequency * 440).toFixed(0)}_HZ</div>
                </div>
             </div>
             <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5 cursor-none">
           {/* Визуализация звуковых волн от курсора */}
           <div 
             className="absolute w-80 h-80 rounded-full border border-rose-500/10 pointer-events-none transition-transform duration-100 ease-out"
             style={{ 
                left: `${mousePos.x * 100}%`, 
                top: `${mousePos.y * 100}%`, 
                transform: `translate(-50%, -50%) scale(${1 + frequency})`,
                opacity: frequency 
             }}
           />

           <div className="flex gap-2 items-center justify-center select-none perspective-2000">
              {letters.map((char, i) => {
                const charNormX = i / (letters.length - 1);
                const dx = mousePos.x - charNormX;
                const dy = mousePos.y - 0.5;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const pressure = Math.max(0, 1 - dist * 2) * frequency;

                return (
                  <div 
                    key={i} 
                    className="text-4xl md:text-6xl font-tech font-black text-rose-500 transition-all duration-75 will-change-transform"
                    style={{ 
                      transform: `translateZ(${pressure * 200}px) translateY(${Math.sin(Date.now()*0.01 + i)*pressure*20}px) rotate(${pressure * 15}deg)`,
                      filter: `blur(${pressure * 10}px) brightness(${1 + pressure})`,
                      opacity: 0.3 + (1 - pressure) * 0.7
                    }}
                  >
                    {char}
                  </div>
                );
              })}
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-rose-500 font-tech text-3xl font-bold uppercase tracking-widest">Wave: {frequency > 0.5 ? 'Critical' : 'Stable'}</div>
              <div className="text-zinc-600 text-[9px] font-mono uppercase tracking-[0.3em]">Acoustic_Pressure_Sync: ON</div>
           </div>
        </div>
      </div>
    </div>
  );
};
