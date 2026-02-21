import React, { useState, useContext } from 'react';
import { Clock, Play, SkipBack, SkipForward, Layers, Cpu, Box, Sparkles } from 'lucide-react';
import { LanguageContext } from '../App';

export const TemporalSequencer: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeFrame, setActiveFrame] = useState(0);

  const frames = [
    { id: 0, label: 'Initialization', icon: Cpu, desc: 'Allocating neural buffers and establishing phase stability.' },
    { id: 1, label: 'Mesh_Forge', icon: Box, desc: 'Procedural generation of volumetric geometry from interaction seeds.' },
    { id: 2, label: 'Refraction_Sync', icon: Layers, desc: 'Calculating light bending vectors across 6 structural layers.' },
    { id: 3, label: 'Final_Render', icon: Sparkles, desc: 'Applying spectral dispersion and atmospheric haze overlays.' }
  ];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="sequencer">
      <div className="text-center mb-24">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
          Motion_Logic
        </span>
        <h2 className="text-4xl md:text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
          Temporal <br /><span className="text-indigo-500">Sequencer.</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="relative h-[500px] bg-zinc-100 dark:bg-zinc-900/40 rounded-[64px] border border-black/5 dark:border-white/5 overflow-hidden flex flex-col shadow-inner group">
           
           {/* Frame Visualization Area */}
           <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#6366f1_1px,transparent_1px)] bg-[length:40px_40px]" />
              
              <div className="relative w-64 h-64 transition-all duration-1000 ease-out"
                   style={{ transform: `rotateY(${activeFrame * 90}deg) scale(${1 + activeFrame * 0.1})` }}>
                 <div className={`absolute inset-0 bg-indigo-500/10 border-4 border-indigo-500/40 rounded-[48px] backdrop-blur-3xl flex items-center justify-center transition-all duration-500 ${activeFrame === 0 ? 'opacity-100 rotate-0' : 'opacity-20 rotate-45 scale-50'}`}>
                    {React.createElement(frames[activeFrame].icon, { className: "w-20 h-20 text-indigo-500 animate-pulse" })}
                 </div>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-12 left-12 max-w-sm animate-in fade-in slide-in-from-left-4 duration-700" key={activeFrame}>
                 <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-bold mb-2">Frame_0{activeFrame + 1}</div>
                 <h3 className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase mb-2">{frames[activeFrame].label}</h3>
                 <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light">{frames[activeFrame].desc}</p>
              </div>
           </div>

           {/* Timeline Controls */}
           <div className="h-32 bg-white/40 dark:bg-black/40 backdrop-blur-3xl border-t border-black/5 dark:border-white/10 p-6 flex items-center gap-8">
              <div className="flex gap-2">
                 <button onClick={() => setActiveFrame(prev => Math.max(0, prev - 1))} className="p-3 bg-black/5 dark:bg-white/5 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"><SkipBack className="w-4 h-4" /></button>
                 <button className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20"><Play className="w-4 h-4 fill-current" /></button>
                 <button onClick={() => setActiveFrame(prev => Math.min(3, prev + 1))} className="p-3 bg-black/5 dark:bg-white/5 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"><SkipForward className="w-4 h-4" /></button>
              </div>
              
              <div className="flex-1 relative h-2 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                 <div className="absolute h-full bg-indigo-600 transition-all duration-700" style={{ width: `${(activeFrame + 1) * 25}%` }} />
                 <div className="absolute inset-0 flex justify-between px-4">
                    {[0,1,2,3].map(i => (
                      <div key={i} onClick={() => setActiveFrame(i)} className={`w-3 h-3 -mt-0.5 rounded-full cursor-pointer transition-all ${activeFrame >= i ? 'bg-indigo-400' : 'bg-zinc-700'}`} />
                    ))}
                 </div>
              </div>

              <div className="text-right">
                 <div className="text-[10px] font-mono text-zinc-400 uppercase">Sequence_ID</div>
                 <div className="text-xs font-bold text-zinc-900 dark:text-white">0x8892_MOT</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
