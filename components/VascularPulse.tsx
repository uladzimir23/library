
import React, { useState, useEffect, useContext } from 'react';
import { Droplets, Heart, Zap, Activity } from 'lucide-react';
import { LanguageContext } from '../App';

export const VascularPulse: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scroll-mt-24">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              01_Vascular_Network
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Васкулярный <br /><span className="text-rose-500">Пульс.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Интерфейс больше не потребляет статичную энергию. Он питается через сложную сеть сосудов, где каждый «узел данных» получает импульс в такт системному сердцебиению.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10">
                <Heart className="w-8 h-8 text-rose-500 mb-4 animate-pulse" />
                <div className="text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-widest">Systolic_Bias</div>
                <div className="text-3xl font-tech font-bold text-zinc-900 dark:text-white">120/80</div>
             </div>
             <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/10">
                <Droplets className="w-8 h-8 text-indigo-500 mb-4" />
                <div className="text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-widest">Flow_Velocity</div>
                <div className="text-3xl font-tech font-bold text-emerald-500">0.84 m/s</div>
             </div>
          </div>
        </div>

        <div className="flex-[1.2] w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-white/5">
           <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <defs>
                 <linearGradient id="vascular-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0" />
                    <stop offset="50%" stopColor="#f43f5e" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                 </linearGradient>
              </defs>
              {/* "Вены" интерфейса */}
              <path d="M 50,275 C 150,100 350,450 550,275" fill="none" stroke="rgba(244,63,94,0.1)" strokeWidth="4" />
              <path d="M 50,275 C 150,450 350,100 550,275" fill="none" stroke="rgba(244,63,94,0.1)" strokeWidth="4" />
              
              {/* Пульсирующие потоки */}
              <path 
                d="M 50,275 C 150,100 350,450 550,275" 
                fill="none" 
                stroke="url(#vascular-grad)" 
                strokeWidth="6" 
                strokeDasharray="40 160" 
                strokeDashoffset={-pulse * 10} 
                className="transition-all duration-300"
              />
              <path 
                d="M 50,275 C 150,450 350,100 550,275" 
                fill="none" 
                stroke="url(#vascular-grad)" 
                strokeWidth="6" 
                strokeDasharray="40 160" 
                strokeDashoffset={-pulse * 8} 
                className="transition-all duration-300"
              />
           </svg>

           {/* Центральное "Сердце" */}
           <div className="relative w-40 h-40 bg-rose-600 rounded-full flex items-center justify-center text-white shadow-[0_0_100px_rgba(244,63,94,0.4)] animate-pulse">
              <Zap className="w-16 h-16 fill-current" />
              <div className="absolute inset-[-10px] border-2 border-dashed border-rose-500/20 rounded-full animate-spin-slow" />
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-rose-500 font-tech text-3xl font-bold uppercase tracking-widest">Pulse: Active</div>
              <div className="text-zinc-600 text-[9px] font-mono uppercase tracking-[0.3em]">Hemodynamic_Stability_OK</div>
           </div>
        </div>
      </div>
    </div>
  );
};
