import React, { useState, useContext, useRef } from 'react';
import { Type, Zap, Activity, Cpu, Sparkles, Terminal } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralInputVisualizer: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [lastCharTime, setLastCharTime] = useState(0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setLastCharTime(Date.now());
  };

  const typingHeat = Math.max(0, 1 - (Date.now() - lastCharTime) / 1000);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="neural-input">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Input_Dynamics_v4
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Neural <br /><span className="text-indigo-500">Input_Field.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Data entry as a physical event. Our neural inputs track typing cadence to adjust refractive focus, creating a high-fidelity feedback loop between the user and the system core.
            </p>
          </div>

          <div className="relative group">
             <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 ${isFocused ? 'opacity-60 scale-105' : ''}`} />
             <div className="relative bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl p-2 flex items-center gap-4">
                <div className={`p-4 rounded-xl transition-all duration-500 ${isFocused ? 'bg-indigo-600 text-white' : 'bg-black/5 dark:bg-white/5 text-zinc-400'}`}>
                   <Type className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  value={text}
                  onChange={handleInput}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Analyze system state..."
                  className="bg-transparent border-none outline-none flex-1 text-sm font-tech uppercase tracking-widest text-zinc-900 dark:text-white placeholder:text-zinc-500"
                />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="text-[8px] font-mono text-zinc-500 uppercase mb-2 tracking-widest">Input_Cadence</div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white">{(typingHeat * 120).toFixed(0)} WPM</div>
             </div>
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="text-[8px] font-mono text-zinc-500 uppercase mb-2 tracking-widest">Buffer_Load</div>
                <div className="text-2xl font-tech font-bold text-indigo-500">{text.length} B</div>
             </div>
          </div>
        </div>

        <div className="flex-1 w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
           {/* Terminal Particles Simulation */}
           <div className="absolute inset-0 opacity-20 pointer-events-none">
              {text.split('').map((char, i) => (
                <div 
                  key={i}
                  className="absolute text-[10px] font-mono text-indigo-400 animate-[float-up_3s_ease-out_forwards]"
                  style={{ 
                    left: `${(i * 15) % 80 + 10}%`,
                    top: '80%',
                    animationDelay: `${i * 0.05}s`
                  }}
                >
                  {char.charCodeAt(0).toString(16)}
                </div>
              ))}
           </div>

           <div 
             className={`relative w-80 h-96 transition-all duration-700 backdrop-blur-3xl border border-white/20 rounded-[56px] flex flex-col items-center justify-center p-12 overflow-hidden ${isFocused ? 'scale-105 border-indigo-500/40' : 'scale-100'}`}
             style={{ backgroundColor: `rgba(99, 102, 241, ${0.05 + typingHeat * 0.1})` }}
           >
              <div className="relative z-10 flex flex-col items-center gap-6">
                 <div className={`w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-2xl transition-all duration-300 ${typingHeat > 0.5 ? 'scale-110 shadow-indigo-500/50' : ''}`}>
                    <Cpu className={`w-10 h-10 ${typingHeat > 0.5 ? 'animate-pulse' : ''}`} />
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-white">Kernel_Status</div>
                    <div className="text-xl font-tech font-bold text-white uppercase tracking-widest h-8">
                       {text.slice(-12) || 'Idle_Sync'}
                    </div>
                 </div>
              </div>
              
              {/* Internal Polish Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)] animate-pulse" />
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-bold mb-1">State_Lock: {isFocused ? 'ACTIVE' : 'IDLE'}</div>
              <div className="text-[8px] font-mono text-zinc-600 uppercase">Input_Protocol_v4.2</div>
           </div>
        </div>
      </div>
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-300px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
};
