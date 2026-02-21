import React, { useState, useContext, useRef, useEffect } from 'react';
import { Share2, Zap, Activity, Cpu, Radio, Network, Database, MoveHorizontal } from 'lucide-react';
import { LanguageContext } from '../App';

export const NodalBioBridge: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [offset, setOffset] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="bio-bridge">
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="bio-bridge-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Organic_Connectivity_v4
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Nodal <br /><span className="text-indigo-500">Bio_Bridge.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Connections are not just lines; they are biological lifelines. This compound system links two compute nodes via a viscous fiber that maintains physical tension and packet flow during spatial displacement.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 space-y-8">
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                   <span className="flex items-center gap-2"><MoveHorizontal className="w-3 h-3" /> Nodal_Displacement</span>
                   <span className="font-mono text-indigo-500">{offset}px</span>
                </div>
                <input 
                  type="range" min="-150" max="150" step="1" value={offset}
                  onChange={e => setOffset(parseInt(e.target.value))}
                  className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
             </div>
             <button 
               onClick={() => setIsSyncing(!isSyncing)}
               className={`w-full py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all ${isSyncing ? 'bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-indigo-600 text-white shadow-indigo-600/20'} shadow-xl active:scale-95`}
             >
                {isSyncing ? 'Synchronizing_Flow...' : 'Engage_Transfer_Link'}
             </button>
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#6366f1_1px,transparent_1px)] bg-[length:32px_32px]" />

           <div className="relative w-full h-full flex items-center justify-center" style={{ filter: 'url(#bio-bridge-goo)' }}>
              
              {/* Terminal A */}
              <div 
                className="absolute w-40 h-40 bg-indigo-600 rounded-[40px] flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-700 ease-out"
                style={{ transform: `translateX(${-160 + offset * 0.5}px)` }}
              >
                 <Cpu className="w-10 h-10 mb-2" />
                 <div className="text-[8px] font-mono text-indigo-200">NODE_SOURCE_0x1</div>
              </div>

              {/* Terminal B */}
              <div 
                className="absolute w-40 h-40 bg-zinc-900 border-2 border-white/20 rounded-[40px] flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-700 ease-out"
                style={{ transform: `translateX(${160 + offset * 0.5}px)` }}
              >
                 <Database className="w-10 h-10 mb-2 text-indigo-400" />
                 <div className="text-[8px] font-mono text-zinc-500">NODE_BUFFER_0x8</div>
              </div>

              {/* The Gooey Bridge Segments */}
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-12 h-12 rounded-full bg-indigo-500 transition-all duration-500 ease-out flex items-center justify-center"
                  style={{ 
                    transform: `translateX(${(-120 + i * 34) + offset * 0.5}px) translateY(${Math.sin(i + offset*0.05) * 20}px) scale(${1 - Math.abs(i-3.5)*0.1})`,
                    opacity: 0.8
                  }}
                >
                   {isSyncing && (
                     <div className="w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: `${i * 0.1}s` }} />
                   )}
                </div>
              ))}
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-emerald-500 animate-ping' : 'bg-indigo-500'}`} />
              <span className="text-[10px] font-tech text-zinc-400 uppercase tracking-[0.3em]">Nodal_Sync_State: {isSyncing ? 'FLOWING' : 'IDLE'}</span>
           </div>
        </div>
      </div>
    </section>
  );
};
