import React, { useState, useContext } from 'react';
import { Activity, Zap, Radio, Bell, Hand, Sparkles, MoveRight } from 'lucide-react';
import { LanguageContext } from '../App';

export const HapticSignature: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeMode, setActiveMode] = useState('soft');
  const [isTriggered, setIsTriggered] = useState(false);

  const modes = [
    { id: 'soft', label: 'Feather_Touch', color: 'text-indigo-400', wave: 'M0,50 Q25,30 50,50 T100,50' },
    { id: 'sharp', label: 'Tension_Click', color: 'text-rose-500', wave: 'M0,50 L20,20 L40,80 L60,20 L80,80 L100,50' },
    { id: 'double', label: 'Echo_Impulse', color: 'text-emerald-500', wave: 'M0,50 Q20,10 40,50 Q60,10 80,50 L100,50' }
  ];

  const trigger = (id: string) => {
    setActiveMode(id);
    setIsTriggered(true);
    setTimeout(() => setIsTriggered(false), 800);
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="haptic">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Tactile_Feedback
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Haptic <br /><span className="text-indigo-500">Signatures.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              We design the feel of air. Each interaction carries a unique haptic frequency, visualized here as a structural wave pattern that defines the component's tactile weight.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
             {modes.map((m) => (
               <button 
                 key={m.id}
                 onClick={() => trigger(m.id)}
                 className={`p-6 rounded-[32px] border text-left flex items-center justify-between transition-all duration-500 group ${activeMode === m.id ? 'bg-white dark:bg-zinc-900 border-indigo-500/50 shadow-2xl scale-[1.02]' : 'bg-black/5 dark:bg-white/5 border-transparent text-zinc-500 hover:bg-black/10'}`}
               >
                  <div className="flex items-center gap-5">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeMode === m.id ? 'bg-indigo-600 text-white' : 'bg-zinc-500/10'}`}>
                        <Hand className="w-6 h-6" />
                     </div>
                     <div>
                        <div className="text-[8px] font-mono opacity-50 uppercase tracking-widest mb-1">Pattern_ID: 0x{m.id.toUpperCase()}</div>
                        <span className="text-xs font-bold uppercase tracking-widest">{m.label}</span>
                     </div>
                  </div>
                  <MoveRight className={`w-5 h-5 transition-transform group-hover:translate-x-2 ${activeMode === m.id ? 'text-indigo-500' : 'opacity-20'}`} />
               </button>
             ))}
          </div>
        </div>

        <div className="flex-1 w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex flex-col items-center justify-center group shadow-2xl">
           {/* Oscilloscope Visualizer */}
           <div className="w-full px-20">
              <div className="relative h-40 flex items-center">
                 <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d overflow-visible">
                    <path 
                      d={modes.find(m => m.id === activeMode)?.wave} 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="0.5" 
                      className={`transition-all duration-1000 ${isTriggered ? 'text-indigo-500 stroke-[2]' : 'text-zinc-800'}`}
                    />
                    {isTriggered && (
                      <circle r="2" fill="#6366f1" className="animate-ping">
                         <animateMotion dur="0.8s" repeatCount="1" path={modes.find(m => m.id === activeMode)?.wave} />
                      </circle>
                    )}
                 </svg>
              </div>
           </div>

           {/* The Interactive "Vibrating" Card */}
           <div 
             className={`mt-10 relative w-80 h-48 bg-white/5 border border-white/10 rounded-[40px] flex items-center justify-center overflow-hidden transition-all duration-100 ${isTriggered ? 'animate-[shake_0.1s_infinite]' : ''}`}
           >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent opacity-40" />
              <Radio className={`w-12 h-12 transition-all duration-500 ${isTriggered ? 'text-indigo-500 scale-125 rotate-12' : 'text-zinc-700'}`} />
              
              {/* Fluid Ripples */}
              {isTriggered && (
                <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-[40px] animate-ping" />
              )}
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-4">
              <Activity className={`w-5 h-5 ${isTriggered ? 'text-indigo-500 animate-pulse' : 'text-zinc-800'}`} />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Impulse_Monitor: {isTriggered ? 'ACTIVE' : 'IDLE'}</span>
           </div>
        </div>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, 2px); }
          75% { transform: translate(2px, 2px); }
        }
      `}</style>
    </section>
  );
};
