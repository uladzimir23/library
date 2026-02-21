import React, { useState, useContext, useRef } from 'react';
import { Grid, Share2, MousePointer2, Box, Layers, Move, Link as LinkIcon, Database } from 'lucide-react';
import { LanguageContext } from '../App';

export const ModularLattice: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [tension, setTension] = useState(0.5);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="lattice-system">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-sky-500">
              <Database className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Lattice_Manager</span>
           </div>

           <div className="space-y-6">
              <div className="space-y-4">
                 <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                    <span className="flex items-center gap-2"><LinkIcon className="w-3 h-3" /> System_Tension</span>
                    <span className="font-mono text-sky-500">{(tension * 100).toFixed(0)}%</span>
                 </div>
                 <input 
                   type="range" min="0" max="1" step="0.01" value={tension}
                   onChange={e => setTension(parseFloat(e.target.value))}
                   className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                 />
              </div>
           </div>

           <div className="p-6 bg-sky-500/10 rounded-3xl border border-sky-500/20">
              <div className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-2">Connectivity</div>
              <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white uppercase">Sync_Locked</div>
           </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000"
        >
           <div className="grid grid-cols-3 gap-8 relative z-10 preserve-3d">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="w-32 h-32 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl transition-all duration-700 ease-out shadow-2xl flex items-center justify-center group"
                  style={{ 
                    transform: `translateZ(${i * -20 * tension}px) rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg) translate(${mousePos.x * (i + 1) * 20 * tension}px, ${mousePos.y * (i + 1) * 20 * tension}px)`,
                    opacity: 1 - (i * 0.1)
                  }}
                >
                   <Box className={`w-8 h-8 transition-colors ${i % 2 === 0 ? 'text-sky-500' : 'text-indigo-500'}`} />
                   
                   {/* Connection Lines (Simulated) */}
                   <div className="absolute inset-0 rounded-[inherit] border border-sky-500/0 group-hover:border-sky-500/40 transition-all scale-110 opacity-0 group-hover:opacity-100" />
                </div>
              ))}
           </div>
           
           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-sky-500 uppercase tracking-widest mb-1">Grid_Snapping_Active</div>
              <div className="text-xs font-bold text-white/40 uppercase tracking-tighter italic">Phase_Alignment: 98%</div>
           </div>
        </div>
      </div>
    </section>
  );
};
