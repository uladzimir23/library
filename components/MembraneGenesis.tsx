
import React, { useState, useContext } from 'react';
import { Share2, Zap, Activity, Split, Merge } from 'lucide-react';
import { LanguageContext } from '../App';

export const MembraneGenesis: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isSplit, setIsSplit] = useState(false);

  return (
    <div className="scroll-mt-24">
      {/* SVG фильтр для эффекта "тягучести" (gooey) */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              01_Membrane_Genesis
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Клеточное <br /><span className="text-emerald-500">Деление.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Компоненты больше не появляются мгновенно. Они «отпочковываются» от центрального ядра, сохраняя вязкую связь до полного формирования нового узла.
            </p>
          </div>

          <div className="flex gap-4">
             <button 
               onClick={() => setIsSplit(!isSplit)}
               className={`px-10 py-5 rounded-[24px] font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-2xl active:scale-95 ${isSplit ? 'bg-indigo-600 text-white shadow-indigo-600/30' : 'bg-emerald-600 text-white shadow-emerald-600/30'}`}
             >
                {isSplit ? <Merge className="w-4 h-4" /> : <Split className="w-4 h-4" />}
                {isSplit ? 'Trigger_Fusion' : 'Trigger_Mitosis'}
             </button>
          </div>
          
          <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10">
             <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-4">
                <span>MEMBRANE_TENSION</span>
                <span className="text-emerald-500">{isSplit ? '0.14_N' : '0.98_N'}</span>
             </div>
             <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-emerald-500 transition-all duration-1000 ${isSplit ? 'w-1/4' : 'w-full'}`} />
             </div>
          </div>
        </div>

        <div className="flex-[1.2] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           
           {/* Клеточное ядро с фильтром goo */}
           <div className="relative w-full h-full flex items-center justify-center" style={{ filter: 'url(#goo)' }}>
              
              {/* Главная клетка */}
              <div 
                className={`absolute w-40 h-40 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-1000 cubic-bezier(0.6, -0.28, 0.735, 0.045)`}
                style={{ transform: isSplit ? 'translateX(-100px)' : 'translateX(0px)' }}
              >
                 <Zap className={`w-10 h-10 ${isSplit ? 'opacity-100' : 'opacity-40'}`} />
              </div>

              {/* Дочерняя клетка */}
              <div 
                className={`absolute w-40 h-40 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-1000 cubic-bezier(0.6, -0.28, 0.735, 0.045)`}
                style={{ transform: isSplit ? 'translateX(100px)' : 'translateX(0px)', opacity: isSplit ? 1 : 0 }}
              >
                 <Activity className="w-10 h-10" />
              </div>

           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isSplit ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500 animate-ping'}`} />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Mitosis_Scan: {isSplit ? 'COMPLETED' : 'AWAITING'}</span>
           </div>
        </div>
      </div>
    </div>
  );
};
