
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Monitor, Activity, Zap, Sliders, RefreshCw, Radio, Waves, Info } from 'lucide-react';
import { LanguageContext } from '../App';

export const TopologyOscilloscope: React.FC = () => {
  const { t, isDiagnostic } = useContext(LanguageContext);
  const [freq, setFreq] = useState(2);
  const [amp, setAmp] = useState(40);
  const [noise, setNoise] = useState(0);
  const [time, setTime] = useState(0);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLocked) return;
      setTime(t => t + 0.1);
    }, 20);
    return () => clearInterval(interval);
  }, [isLocked]);

  const generatePath = () => {
    let points = [];
    for (let x = 0; x <= 400; x += 2) {
      // Базовая синусоида + случайный шум
      const jitter = (Math.random() - 0.5) * noise * 20;
      const y = 100 + Math.sin(x * 0.05 * freq + time) * amp + jitter;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="scroll-mt-24">
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Instrument_0x1A.Oscilloscope
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Осциллограф <br /><span className="text-emerald-500">Топологии.</span>
         </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
         <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex-1 flex flex-col justify-between shadow-2xl relative overflow-hidden group/controls">
               {/* Decorative Gradient */}
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover/controls:opacity-100 transition-opacity duration-500" />
               
               <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <Sliders className="w-5 h-5 text-emerald-400" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Signal_Params</span>
                  </div>
                  <Info className="w-3 h-3 text-zinc-700 cursor-help" />
               </div>
               
               <div className="space-y-10 py-10 relative z-10">
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                        <span>Frequency</span>
                        <span className="text-emerald-500">{freq.toFixed(2)} Hz</span>
                     </div>
                     <input 
                       type="range" min="0.5" max="5" step="0.1" value={freq}
                       onChange={e => setFreq(parseFloat(e.target.value))}
                       className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-emerald-500"
                     />
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                        <span>Amplitude</span>
                        <span className="text-emerald-500">{amp.toFixed(0)} px</span>
                     </div>
                     <input 
                       type="range" min="5" max="80" step="1" value={amp}
                       onChange={e => setAmp(parseInt(e.target.value))}
                       className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-emerald-500"
                     />
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                        <span>Signal Noise</span>
                        <span className="text-rose-400">{(noise * 100).toFixed(0)}%</span>
                     </div>
                     <input 
                       type="range" min="0" max="1" step="0.01" value={noise}
                       onChange={e => setNoise(parseFloat(e.target.value))}
                       className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-rose-500"
                     />
                  </div>
               </div>

               <div className="pt-6 border-t border-white/5 flex gap-4 relative z-10">
                  <button 
                    onClick={() => setIsLocked(!isLocked)}
                    className={`flex-1 p-4 rounded-2xl flex flex-col items-start transition-all ${isLocked ? 'bg-emerald-600/10 border border-emerald-500/20' : 'bg-rose-600/10 border border-rose-500/20'}`}
                  >
                     <div className="text-[8px] text-zinc-600 uppercase mb-1">Engine_State</div>
                     <div className={`text-xs font-mono font-bold uppercase ${isLocked ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {isLocked ? 'Running' : 'Paused'}
                     </div>
                  </button>
                  <button 
                    onClick={() => { setFreq(2); setAmp(40); setNoise(0); }}
                    className="p-4 bg-zinc-800 text-white rounded-2xl hover:bg-emerald-500 transition-all shadow-lg active:scale-95"
                  >
                     <RefreshCw className="w-4 h-4" />
                  </button>
               </div>
            </div>
         </div>

         <div className="lg:col-span-8 bg-[#020502] rounded-[64px] border-4 border-zinc-800 relative overflow-hidden flex items-center justify-center shadow-[inset_0_0_100px_rgba(16,185,129,0.1),0_40px_100px_-20px_rgba(0,0,0,0.5)] group/crt">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.03)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none z-30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] z-20 pointer-events-none" />
            
            <div className="relative w-full h-full p-12 flex items-center justify-center">
               {isDiagnostic && (
                  <div className="absolute top-10 right-10 flex gap-4 opacity-40">
                     <div className="text-[8px] font-mono text-emerald-500">SR: 44.1kHz</div>
                     <div className="text-[8px] font-mono text-emerald-500">BW: 20MHz</div>
                  </div>
               )}
               
               <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_#10b981] group-hover/crt:scale-105 transition-transform duration-700">
                  {/* Background Grid */}
                  {[...Array(5)].map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={40 * i} x2="400" y2={40 * i} stroke="rgba(16,185,129,0.08)" strokeWidth="1" />
                  ))}
                  {[...Array(9)].map((_, i) => (
                    <line key={`v-${i}`} x1={50 * i} y1="0" x2={50 * i} y2="200" stroke="rgba(16,185,129,0.08)" strokeWidth="1" />
                  ))}

                  <path 
                    d={generatePath()} 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    className="transition-all duration-75"
                  />
                  
                  {/* Signal Pulse Dot */}
                  <circle r="4" fill="#fff" filter="blur(2px)">
                    <animateMotion dur="2s" repeatCount="indefinite" path={generatePath()} />
                  </circle>
               </svg>
            </div>

            <div className="absolute top-12 left-12 flex flex-col gap-2">
               <div className="flex items-center gap-3 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                  <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-black">Wave_Buffer: 0x88.A</span>
               </div>
            </div>

            <div className="absolute bottom-12 right-12 text-right">
               <div className="text-[9px] font-mono text-emerald-500/40 uppercase tracking-[0.4em] mb-1">Temporal_Diagnostic</div>
               <div className="text-3xl font-tech font-bold text-emerald-500 uppercase tracking-tighter group-hover/crt:text-white transition-colors">OSC_0x16_OK</div>
            </div>
         </div>
      </div>
    </div>
  );
};
