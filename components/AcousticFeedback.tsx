import React, { useState, useContext, useEffect } from 'react';
import { Volume2, Zap, Activity, Waves, Bell, ShieldAlert, CheckCircle2, Music } from 'lucide-react';
import { LanguageContext } from '../App';

export const AcousticFeedback: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);

  const sounds = [
    { id: 'success', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Success_Ping' },
    { id: 'error', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-500/10', label: 'Error_Thud' },
    { id: 'action', icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-500/10', label: 'Action_Click' },
    { id: 'notify', icon: Bell, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Notify_Chime' }
  ];

  const triggerSound = (id: string) => {
    setActiveSound(id);
    const newRipple = { id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setActiveSound(null);
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="acoustic">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Multi_Sensory_Logic
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Acoustic <br /><span className="text-indigo-500">Feedback.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces should be heard, not just seen. We design auditory signatures that complement the physical properties of the material, creating a synchronized sensory experience.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {sounds.map((s) => (
               <button 
                 key={s.id}
                 onClick={() => triggerSound(s.id)}
                 className={`p-6 rounded-[32px] border text-left transition-all duration-500 group ${activeSound === s.id ? 'bg-white dark:bg-zinc-900 border-indigo-500 shadow-2xl translate-y-[-4px]' : 'bg-black/5 dark:bg-white/5 border-transparent text-zinc-500 hover:bg-black/10'}`}
               >
                  <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                     <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-60 mb-1">Sound_Profile</div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">{s.label}</div>
               </button>
             ))}
          </div>
        </div>

        <div className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
           {/* Frequency Visualizer Background */}
           <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-10 px-12">
              {Array.from({length: 40}).map((_, i) => (
                <div 
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${activeSound ? 'bg-indigo-500' : 'bg-zinc-800'}`}
                  style={{ 
                    height: `${activeSound ? Math.random() * 100 : 10}%`,
                    transitionDelay: `${i * 10}ms`
                  }}
                />
              ))}
           </div>

           {/* Central Waveform Component */}
           <div className="relative w-72 h-72">
              <div className={`absolute inset-0 rounded-full border-4 border-white/5 transition-all duration-1000 ${activeSound ? 'scale-110 border-indigo-500/20' : 'scale-100'}`} />
              
              <div className="absolute inset-8 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex flex-col items-center justify-center p-12 overflow-hidden shadow-2xl">
                 <div className={`transition-all duration-500 ${activeSound ? 'scale-125' : 'scale-100'}`}>
                    <Volume2 className={`w-16 h-16 ${activeSound ? 'text-indigo-400 animate-pulse' : 'text-zinc-600'}`} />
                 </div>
                 
                 {/* Visual Ripples */}
                 {ripples.map(r => (
                   <div 
                     key={r.id}
                     className="absolute border-2 border-indigo-500/40 rounded-full animate-[ping_1.5s_linear_infinite]"
                     style={{ inset: '-20px' }}
                   />
                 ))}
              </div>
           </div>

           {/* HUD UI Elements */}
           <div className="absolute top-12 left-12 flex items-center gap-4 text-indigo-400/40">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Sonification_Active</span>
           </div>

           <div className="absolute bottom-12 right-12 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl transition-all duration-500"
                style={{ opacity: activeSound ? 1 : 0.2 }}>
              <div className="flex items-center gap-4 mb-2">
                 <Music className="w-4 h-4 text-indigo-400" />
                 <span className="text-[8px] font-bold text-zinc-500 uppercase">Frequency_Response</span>
              </div>
              <div className="text-xl font-tech font-bold text-white uppercase">{activeSound ? 'Capture_0x88' : 'Idle_State'}</div>
           </div>
        </div>
      </div>
    </section>
  );
};
