
import React, { useState, useContext, useEffect } from 'react';
import { Share2, Zap, Activity, Cpu, Network } from 'lucide-react';
import { LanguageContext } from '../App';

export const SynapticRelay: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (pulse) {
      const timer = setTimeout(() => setPulse(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [pulse]);

  return (
    <div className="scroll-mt-24">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              02_Synaptic_Relay
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Синаптический <br /><span className="text-indigo-500">Поток.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Данные — это не просто нули и единицы. Это электрические импульсы. Мы визуализируем логику как поток энергии, бегущий по органическим каналам системы.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button 
               onClick={() => setPulse(true)}
               disabled={pulse}
               className="col-span-2 py-6 bg-indigo-600 text-white rounded-[24px] font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/40 disabled:opacity-50 flex items-center justify-center gap-4"
             >
                <Zap className={`w-5 h-5 ${pulse ? 'animate-pulse' : ''}`} />
                Запустить Импульс
             </button>
             <div className="p-6 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="text-[8px] font-mono text-zinc-500 uppercase mb-2">Signal_Strength</div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">0.992_V</div>
             </div>
             <div className="p-6 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="text-[8px] font-mono text-zinc-500 uppercase mb-2">Sync_Rate</div>
                <div className="text-2xl font-tech font-bold text-emerald-500">99.8%</div>
             </div>
          </div>
        </div>

        <div className="flex-[1.2] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5">
           <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-30">
              <defs>
                 <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                 </linearGradient>
              </defs>
              {/* Органические пути */}
              <path d="M 100,275 Q 300,100 500,275 T 900,275" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <path d="M 100,275 Q 300,450 500,275 T 900,275" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              
              {/* Импульсы */}
              {pulse && (
                <>
                  <circle r="4" fill="#6366f1" filter="blur(4px)">
                    <animateMotion dur="1.5s" repeatCount="1" path="M 100,275 Q 300,100 500,275 T 900,275" />
                  </circle>
                  <circle r="4" fill="#6366f1" filter="blur(4px)">
                    <animateMotion dur="1.5s" repeatCount="1" path="M 100,275 Q 300,450 500,275 T 900,275" />
                  </circle>
                </>
              )}
           </svg>

           {/* Узлы синапса */}
           <div className="relative z-10 flex gap-12 items-center">
              <div className={`w-24 h-24 rounded-[32px] bg-indigo-600 flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${pulse ? 'scale-125 shadow-indigo-500/60' : ''}`}>
                 <Cpu className="w-10 h-10" />
              </div>
              <div className={`w-12 h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center animate-spin-slow`}>
                 <Network className="w-6 h-6 text-zinc-600" />
              </div>
              <div className={`w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-3xl flex items-center justify-center text-zinc-400 transition-all duration-1000 ${pulse ? 'delay-700 bg-emerald-500/10 border-emerald-500 shadow-emerald-500/20 text-emerald-500' : ''}`}>
                 <Share2 className="w-10 h-10" />
              </div>
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-indigo-500 font-tech text-3xl font-bold uppercase tracking-widest">Signal: {pulse ? 'Active' : 'Idle'}</div>
              <div className="text-zinc-600 text-[9px] font-mono uppercase tracking-[0.3em]">Synaptic_Calibration_OK</div>
           </div>
        </div>
      </div>
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
