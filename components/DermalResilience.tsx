
import React, { useState, useContext, useRef } from 'react';
import { ShieldCheck, Fingerprint, Activity, Layers, Sparkles } from 'lucide-react';
import { LanguageContext } from '../App';

export const DermalResilience: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [impacts, setImpacts] = useState<{ id: number; x: number; y: number; time: number }[]>([]);

  const handleImpact = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newImpact = { id: Date.now(), x, y, time: 1 };
    setImpacts(prev => [...prev, newImpact]);

    // Регенерация
    setTimeout(() => {
      setImpacts(prev => prev.filter(i => i.id !== newImpact.id));
    }, 4000);
  };

  return (
    <div className="scroll-mt-24">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              03_Dermal_Resilience
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Защитный <br /><span className="text-rose-500">Эпидермис.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Реактивная регенерация. При нажатии поверхность BioGlass мгновенно кристаллизуется, создавая локальную зону жесткости. После исчезновения давления материя «заживает», возвращаясь к исходному состоянию.
            </p>
          </div>

          <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10 flex items-center justify-between">
             <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-rose-500/10 text-rose-500`}>
                   <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Tissue_Integrity</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase">{impacts.length > 0 ? 'Resilient' : 'Neutral'}</div>
                </div>
             </div>
             <Fingerprint className={`w-6 h-6 text-rose-500 ${impacts.length > 0 ? 'animate-pulse' : 'opacity-20'}`} />
          </div>
        </div>

        <div 
          onClick={handleImpact}
          className="flex-[1.2] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5 cursor-crosshair"
        >
           {/* Базовая "мягкая" поверхность */}
           <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-rose-500/5 opacity-50" />
           
           {/* Зоны кристаллизации (удары) */}
           {impacts.map(i => (
             <div 
               key={i.id}
               className="absolute w-64 h-64 pointer-events-none transition-all duration-[4000ms] animate-regen"
               style={{ left: `${i.x}%`, top: `${i.y}%`, transform: 'translate(-50%, -50%)' }}
             >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[40px] border-2 border-white/40 rounded-[48px] shadow-[0_0_80px_rgba(255,255,255,0.2)]" />
                <div className="absolute inset-8 border border-white/20 rounded-[24px] flex items-center justify-center">
                   <Sparkles className="text-white w-8 h-8 animate-ping" />
                </div>
             </div>
           ))}

           <div className="absolute inset-0 p-12 pointer-events-none opacity-20 border-2 border-dashed border-white/5 rounded-[64px]" />

           <div className="absolute bottom-12 left-12 flex items-center gap-3">
              <Layers className="w-4 h-4 text-rose-500" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Dermal_Scanner: ONLINE</span>
           </div>
        </div>
      </div>
      <style>{`
        @keyframes regen {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          10% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; filter: blur(40px); }
        }
        .animate-regen { animation: regen 4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
