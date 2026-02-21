import React, { useState, useContext } from 'react';
import { Droplets, Zap, Activity, Move, Share2, Sparkles } from 'lucide-react';
import { LanguageContext } from '../App';

export const OsmosisAbsorption: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [dist, setDist] = useState(200); // Distance between nodes

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#080808]" id="osmosis">
      {/* Shared Goo Filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="osmosis-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Organic_Transfer
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Osmosis <br /><span className="text-emerald-500">Absorption.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are permeable membranes. Experience data osmosis where elements share their visual properties and energy through proximity, blurring the line between individual components.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 space-y-6">
             <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-500 tracking-widest">
                <span>Distance_Delta</span>
                <span className="font-mono text-emerald-500">{dist}px</span>
             </div>
             <input 
               type="range" min="80" max="300" step="1" value={dist}
               onChange={e => setDist(parseInt(e.target.value))}
               className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-emerald-500"
             />
             <div className="flex justify-between items-center text-[10px] font-mono text-zinc-600">
                <span>MEMBRANE: {dist < 120 ? 'BREACHED' : 'STABLE'}</span>
                <Sparkles className={`w-4 h-4 transition-opacity ${dist < 120 ? 'opacity-100 animate-pulse' : 'opacity-20'}`} />
             </div>
          </div>
        </div>

        <div className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

           <div className="relative w-full h-full flex items-center justify-center" style={{ filter: 'url(#osmosis-goo)' }}>
              {/* Receiver Node */}
              <div 
                className={`absolute w-32 h-32 bg-emerald-600 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-700`}
                style={{ 
                  transform: `translateX(-${dist/2}px) scale(${dist < 120 ? 1.2 : 1})`,
                  boxShadow: dist < 120 ? '0 0 60px rgba(16,185,129,0.4)' : 'none'
                }}
              >
                 <Droplets className="w-8 h-8" />
              </div>

              {/* Provider Node */}
              <div 
                className={`absolute w-24 h-24 bg-white/10 border-4 border-emerald-500/20 rounded-full flex flex-col items-center justify-center transition-all duration-700`}
                style={{ 
                  transform: `translateX(${dist/2}px) scale(${dist < 120 ? 0.8 : 1})`,
                  opacity: dist < 120 ? 0.4 : 1
                }}
              >
                 <Zap className="w-6 h-6 text-emerald-400" />
              </div>
           </div>

           <div className="absolute bottom-12 left-12 text-[9px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
              Matter_Transfer_Protocol_v08
           </div>
        </div>
      </div>
    </section>
  );
};