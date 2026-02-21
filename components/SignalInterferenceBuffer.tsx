
import React, { useState, useContext, useEffect } from 'react';
/* Added RefreshCw to the imports from lucide-react */
import { Radio, ZapOff, Activity, Shield, Activity as Waves, Zap, Terminal, RefreshCw } from 'lucide-react';
import { LanguageContext } from '../App';

type SignalState = 'CRYSTAL' | 'NOISE' | 'COLLAPSE';

export const SignalInterferenceBuffer: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [state, setState] = useState<SignalState>('CRYSTAL');
  const [noise, setNoise] = useState(0);

  useEffect(() => {
    if (state === 'NOISE') setNoise(0.4 + Math.random() * 0.3);
    else if (state === 'COLLAPSE') setNoise(1);
    else setNoise(0);
  }, [state]);

  return (
    <div className="scroll-mt-24">
      <svg className="absolute w-0 h-0">
        <filter id="glitch-distort">
          <feTurbulence type="fractalNoise" baseFrequency={noise * 0.5} numOctaves="1" result="warp">
             <animate attributeName="baseFrequency" dur="0.1s" values={`0.01; ${noise}; 0.01`} repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="warp" scale={noise * 100} />
        </filter>
      </svg>

      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Comm_Array_v14
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Буфер <br /><span className="text-indigo-500">Помех.</span>
         </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[750px]">
         {/* 1. LEFT: SIGNAL MONITOR */}
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex flex-col gap-8 shadow-2xl h-full">
               <div className="flex items-center gap-3">
                  <Radio className="w-5 h-5 text-indigo-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Inbound_Stream</span>
               </div>
               
               <div className="flex-1 space-y-3">
                  {(['CRYSTAL', 'NOISE', 'COLLAPSE'] as SignalState[]).map((s) => (
                    <button 
                      key={s}
                      onClick={() => setState(s)}
                      className={`w-full p-6 rounded-3xl border transition-all duration-500 flex items-center justify-between group ${state === s ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl translate-x-2' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}`}
                    >
                       <div className="text-[10px] font-bold uppercase tracking-widest">{s}</div>
                       {state === s ? <Activity className="w-4 h-4 text-white animate-pulse" /> : <Shield className="w-2 h-2 text-zinc-700" />}
                    </button>
                  ))}
               </div>

               <div className="p-6 bg-white/5 rounded-3xl space-y-4">
                  <div className="flex justify-between text-[8px] font-mono text-zinc-500 uppercase">
                     <span>Baud_Rate</span>
                     <span className="text-indigo-500">{state === 'CRYSTAL' ? '9600' : state === 'NOISE' ? '1200' : '0'}_BPS</span>
                  </div>
                  <div className="h-1 bg-black rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: state === 'CRYSTAL' ? '90%' : state === 'NOISE' ? '30%' : '5%' }} />
                  </div>
               </div>
            </div>
         </div>

         {/* 2. CENTER: DISTORTION ENGINE (VISUAL) */}
         <div className="lg:col-span-6 bg-zinc-950 rounded-[64px] border border-white/5 relative overflow-hidden flex items-center justify-center shadow-2xl">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* The Fragmented Core */}
            <div 
              className="relative w-full h-full flex flex-col items-center justify-center p-12 transition-all duration-150"
              style={{ filter: state !== 'CRYSTAL' ? 'url(#glitch-distort)' : 'none' }}
            >
               <div className={`p-20 bg-white/5 border-4 rounded-[64px] backdrop-blur-3xl shadow-2xl transition-all duration-500 flex flex-col items-center justify-center
                  ${state === 'CRYSTAL' ? 'border-emerald-500/20' : state === 'NOISE' ? 'border-indigo-500/40' : 'border-rose-500/60 opacity-50'}
               `}>
                  <ZapOff className={`w-24 h-24 mb-10 transition-colors ${state === 'CRYSTAL' ? 'text-emerald-400' : state === 'NOISE' ? 'text-indigo-400' : 'text-rose-500'}`} />
                  <div className="text-center">
                     <div className="text-3xl font-tech font-bold text-white uppercase tracking-widest mb-2">STREAM_ID_0x14</div>
                     <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em]">{state === 'COLLAPSE' ? 'PACKET_LOSS_FATAL' : 'COHERENCE_STABLE'}</div>
                  </div>
               </div>

               {/* Random Noise Pixels when glitching */}
               {state !== 'CRYSTAL' && [...Array(20)].map((_, i) => (
                 <div 
                   key={i} 
                   className="absolute w-4 h-4 bg-indigo-500 opacity-20 animate-ping"
                   style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, animationDelay: `${i*0.05}s` }}
                 />
               ))}
            </div>

            {/* HUD Status Marker */}
            <div className="absolute bottom-12 left-12">
               <div className="flex items-center gap-3 px-6 py-2 bg-zinc-900 border border-white/10 rounded-full shadow-2xl">
                  <div className={`w-2 h-2 rounded-full ${state === 'CRYSTAL' ? 'bg-emerald-500' : 'bg-rose-500 animate-ping'}`} />
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Spectral_Lock: {state}</span>
               </div>
            </div>
         </div>

         {/* 3. RIGHT: BUFFER LOGS */}
         <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex-1 flex flex-col justify-between shadow-2xl relative">
               <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest">Protocol_Log</span>
               </div>
               
               <div className="space-y-3 font-mono text-[9px] text-zinc-600 transition-colors">
                  <p className={state === 'COLLAPSE' ? 'text-rose-500' : ''}> {state === 'CRYSTAL' ? 'SYNCING_OK' : 'LATENCY_SPIKE'}</p>
                  <p> 0x88.A_FETCHING...</p>
                  <p className={state !== 'CRYSTAL' ? 'animate-pulse text-indigo-400' : ''}> NOISE_LEVEL: {noise.toFixed(3)}</p>
                  <p> DECRYPTING_V14...</p>
               </div>

               <div className="pt-6 border-t border-white/5">
                  <button 
                    onClick={() => setState('CRYSTAL')}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-zinc-400 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                  >
                     {/* Fixed: Changed RefreshCw animation condition from non-existent 'RECONSTRUCT' to check for non-default state */}
                     <RefreshCw className={`w-4 h-4 ${state !== 'CRYSTAL' ? 'animate-spin' : ''}`} /> Reset_Stream
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
