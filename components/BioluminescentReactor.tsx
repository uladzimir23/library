
import React, { useState, useContext, useEffect } from 'react';
import { Droplets, Activity, Sparkles, Zap, Radio, Target, Waves, FlaskConical } from 'lucide-react';
import { LanguageContext } from '../App';

type BioState = 'DORMANT' | 'EVOLVING' | 'OVERLOAD';

export const BioluminescentReactor: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [state, setState] = useState<BioState>('DORMANT');
  const [energy, setEnergy] = useState(20);

  useEffect(() => {
    if (state === 'OVERLOAD') {
      const interval = setInterval(() => setEnergy(prev => (prev > 95 ? 80 : prev + 2)), 100);
      return () => clearInterval(interval);
    }
  }, [state]);

  const config = {
    DORMANT: { color: 'emerald', glow: 'rgba(16, 185, 129, 0.1)', speed: '20s' },
    EVOLVING: { color: 'sky', glow: 'rgba(14, 165, 233, 0.3)', speed: '5s' },
    OVERLOAD: { color: 'rose', glow: 'rgba(244, 63, 94, 0.6)', speed: '0.5s' }
  };

  return (
    <div className="scroll-mt-24">
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Organic_Synthesis_v13
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Био- <br /><span className="text-emerald-500">Реактор.</span>
         </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-stretch">
         {/* 1. VISUAL REACTOR CHAMBER */}
         <div className="flex-[1.5] bg-zinc-950 rounded-[80px] border border-white/5 relative overflow-hidden min-h-[600px] flex items-center justify-center shadow-2xl group">
            {/* Liquid Background Simulation */}
            <div 
              className="absolute inset-0 transition-all duration-1000 opacity-20"
              style={{ background: `radial-gradient(circle at center, ${config[state].glow} 0%, transparent 70%)` }}
            />
            
            <div className="relative w-80 h-[500px] flex items-center justify-center">
               {/* Glass Container */}
               <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[100px] shadow-inner overflow-hidden">
                  {/* Dynamic Fluid */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-[2000ms] bg-gradient-to-t from-${config[state].color}-500/40 to-transparent`}
                    style={{ height: state === 'OVERLOAD' ? '100%' : state === 'EVOLVING' ? '60%' : '30%' }}
                  />
                  {/* Moving Bubbles */}
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i}
                      className={`absolute w-3 h-3 rounded-full bg-${config[state].color}-400 blur-[1px] transition-all duration-[3000ms] animate-float-up`}
                      style={{ 
                        left: `${15 + i * 15}%`, 
                        bottom: '-20px', 
                        animationDelay: `${i * 0.7}s`,
                        opacity: state === 'DORMANT' ? 0.2 : 0.6
                      }}
                    />
                  ))}
               </div>

               {/* Central Core */}
               <div className={`relative z-10 w-32 h-32 rounded-full border-4 transition-all duration-1000 flex items-center justify-center
                  ${state === 'DORMANT' ? 'bg-emerald-950 border-emerald-500/20 text-emerald-500' : ''}
                  ${state === 'EVOLVING' ? 'bg-sky-900 border-sky-400 text-white shadow-[0_0_50px_rgba(14,165,233,0.4)] animate-pulse' : ''}
                  ${state === 'OVERLOAD' ? 'bg-rose-600 border-white text-white shadow-[0_0_100px_rgba(244,63,94,0.6)] scale-125' : ''}
               `}>
                  <Sparkles className={`w-12 h-12 transition-transform duration-1000 ${state === 'OVERLOAD' ? 'animate-spin' : ''}`} />
               </div>
            </div>

            {/* Diagnostics HUD */}
            <div className="absolute bottom-12 left-12 flex items-center gap-4 text-emerald-500/40">
               <Activity className={`w-5 h-5 ${state === 'OVERLOAD' ? 'animate-bounce text-rose-500' : ''}`} />
               <span className="text-[10px] font-mono uppercase tracking-widest">Reactor_Flux: {state}</span>
            </div>
         </div>

         {/* 2. CONTROL INTERFACE */}
         <div className="flex-1 grid grid-rows-3 gap-6">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex flex-col justify-between shadow-xl">
               <div className="flex items-center gap-3">
                  <Radio className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest">Phase_Calibration</span>
               </div>
               <div className="flex gap-2">
                  {(['DORMANT', 'EVOLVING', 'OVERLOAD'] as BioState[]).map(s => (
                    <button 
                      key={s} 
                      onClick={() => {
                         setState(s);
                         setEnergy(s === 'DORMANT' ? 20 : s === 'EVOLVING' ? 65 : 100);
                      }}
                      className={`flex-1 py-4 rounded-2xl text-[8px] font-black uppercase tracking-tighter transition-all ${state === s ? `bg-${config[s].color}-500 text-white shadow-lg` : 'bg-white/5 text-zinc-500 hover:bg-white/10'}`}
                    >
                      {s}
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[48px] p-8 flex flex-col justify-between">
               <div className="flex justify-between items-center">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Luminous_Output</div>
                  <span className="text-xl font-tech font-bold text-white">{energy}%</span>
               </div>
               <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 bg-${config[state].color}-500`} style={{ width: `${energy}%` }} />
               </div>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex items-center justify-center group cursor-pointer hover:border-rose-500/50 transition-colors">
               <div className="text-center">
                  <FlaskConical className="w-10 h-10 text-zinc-700 group-hover:text-rose-500 mx-auto mb-4 transition-colors" />
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Inject_Nutrients_0x88</div>
               </div>
            </div>
         </div>
      </div>
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-400px) scale(1.5); opacity: 0; }
        }
        .animate-float-up { animation: float-up 3s ease-in infinite; }
      `}</style>
    </div>
  );
};
