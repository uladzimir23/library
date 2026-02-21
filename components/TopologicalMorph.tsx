import React, { useState, useContext } from 'react';
import { Maximize, Minimize, Zap, Target, Box, Square, Circle, Triangle } from 'lucide-react';
import { LanguageContext } from '../App';

export const TopologicalMorph: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [morph, setMorph] = useState(0); // 0 to 100

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="topology">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Shape_Grammar
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Topological <br /><span className="text-indigo-500">Morph_Engine.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Form follows fluid dynamics. Our components can smoothly transition between disparate geometric archetypes, allowing the interface to adapt its structure based on functional priority.
            </p>
          </div>

          <div className="p-10 bg-zinc-900 rounded-[48px] border border-white/5 space-y-10">
             <div className="flex justify-between items-center text-indigo-500">
                <div className="flex items-center gap-4">
                   <Circle className="w-5 h-5" />
                   <div className="h-[2px] w-12 bg-white/10" />
                   <Square className="w-5 h-5" />
                </div>
                <span className="text-2xl font-tech font-bold">{morph}%</span>
             </div>
             
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                   <span>Transition_Factor</span>
                   <span className="font-mono text-indigo-400">0x{(morph * 2.55).toFixed(0).padStart(2, '0')}</span>
                </div>
                <input 
                  type="range" min="0" max="100" step="1" value={morph}
                  onChange={e => setMorph(parseInt(e.target.value))}
                  className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
             </div>

             <div className="grid grid-cols-3 gap-2">
                {[0, 50, 100].map(val => (
                  <button 
                    key={val}
                    onClick={() => setMorph(val)}
                    className={`py-2 rounded-xl text-[9px] font-bold uppercase border transition-all ${morph === val ? 'bg-indigo-600 text-white border-transparent' : 'bg-white/5 border-white/5 text-zinc-500 hover:bg-white/10'}`}
                  >
                    Set_{val}
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="flex-1 w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
           {/* Background Grid Visualization */}
           <div className="absolute inset-0 opacity-10" style={{ 
             backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             transform: `scale(${1 + morph / 500})`
           }} />

           {/* The Morphing Canvas */}
           <div className="relative w-full h-full flex items-center justify-center">
              <div 
                className="relative w-80 h-80 bg-white/5 border border-white/20 backdrop-blur-3xl shadow-2xl transition-all duration-700 ease-out flex flex-col items-center justify-center p-12 overflow-hidden"
                style={{ 
                  borderRadius: `${160 - morph * 1.52}px`, // From circle to sharp rounded rect
                  transform: `rotate(${morph * 0.9}deg) scale(${0.8 + (morph / 500)})`,
                  boxShadow: `0 40px 100px -20px rgba(99, 102, 241, ${0.1 + morph / 500})`
                }}
              >
                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-indigo-500/10" />
                 
                 <div className={`transition-all duration-700 ${morph > 50 ? 'scale-125' : 'scale-100'}`}>
                    <Box className={`w-20 h-20 text-indigo-500 transition-all duration-700 ${morph > 50 ? 'rotate-[-45deg]' : 'rotate-0'}`} />
                 </div>
                 
                 <div className="mt-8 text-center">
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-white">Topology_State</div>
                    <div className="text-2xl font-tech font-bold text-white uppercase tracking-widest">
                       {morph < 20 ? 'Circular' : morph > 80 ? 'Polygonal' : 'Hybrid'}
                    </div>
                 </div>

                 {/* Corner Marks that appear during rectangular state */}
                 <div className={`absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-indigo-500/40 transition-opacity duration-700 ${morph > 60 ? 'opacity-100' : 'opacity-0'}`} />
                 <div className={`absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-indigo-500/40 transition-opacity duration-700 ${morph > 60 ? 'opacity-100' : 'opacity-0'}`} />
              </div>
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Matter_Phase_Index</div>
              <div className="text-xl font-tech font-bold text-indigo-400">0xMOR_P.H_92</div>
           </div>
        </div>
      </div>
    </section>
  );
};
