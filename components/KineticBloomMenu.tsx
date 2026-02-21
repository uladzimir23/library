import React, { useState, useContext } from 'react';
import { Target, Zap, Activity, Grid, Layers, Share2, Compass, Cpu, Bell, MousePointer2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const KineticBloomMenu: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { icon: Cpu, label: 'Compute' },
    { icon: Share2, label: 'Relay' },
    { icon: Bell, label: 'Signal' },
    { icon: Activity, label: 'Flow' },
    { icon: Zap, label: 'Energy' },
    { icon: Grid, label: 'Lattice' }
  ];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#080808]" id="kinetic-bloom">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Organism_Interface_v9
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Kinetic <br /><span className="text-indigo-500">Bloom_Organism.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are temporal. Experience a menu that "blooms" with organic spring physics, revealing a symmetrical array of functional petals that adapt to the hierarchy of system needs.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 space-y-8">
             <button 
               onClick={() => setIsOpen(!isOpen)}
               className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${isOpen ? 'bg-indigo-600 text-white shadow-indigo-500/20' : 'bg-black text-white hover:bg-zinc-800 shadow-xl'}`}
             >
                {isOpen ? <Compass className="w-5 h-5" /> : <MousePointer2 className="w-5 h-5" />}
                {isOpen ? 'Retract_Nodes' : 'Engage_Bloom'}
             </button>
             
             <div className="grid grid-cols-3 gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                {[1,2,3].map(i => (
                  <div key={i} className="h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full bg-indigo-500 transition-all duration-1000 ${isOpen ? 'w-full' : 'w-0'}`} />
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="flex-1 w-full h-[650px] relative flex items-center justify-center perspective-2000 group">
           {/* Organism Backdrop */}
           <div className={`absolute w-[400px] h-[400px] rounded-full transition-all duration-1000 ${isOpen ? 'bg-indigo-500/5 blur-[100px] scale-125' : 'bg-transparent blur-0 scale-100'}`} />

           {/* The Bloom Structure */}
           <div className="relative w-32 h-32 flex items-center justify-center">
              
              {/* Petal Items */}
              {items.map((item, i) => {
                const angle = (i * 360) / items.length;
                const distance = isOpen ? 180 : 0;
                return (
                  <div 
                    key={i}
                    className="absolute transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) pointer-events-auto"
                    style={{ 
                      transform: `rotate(${angle}deg) translateY(-${distance}px) rotate(-${angle}deg) scale(${isOpen ? 1 : 0})`,
                      opacity: isOpen ? 1 : 0,
                      zIndex: isOpen ? 20 : 10
                    }}
                  >
                     <div className="group/petal relative flex flex-col items-center gap-3">
                        <div className="w-20 h-20 rounded-[28px] bg-white/5 border border-white/20 backdrop-blur-3xl flex items-center justify-center text-zinc-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-400 transition-all duration-500 shadow-2xl">
                           <item.icon className="w-8 h-8" />
                        </div>
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold">{item.label}</span>
                     </div>
                  </div>
                );
              })}

              {/* Core Nucleus */}
              <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`relative z-30 w-32 h-32 rounded-full border-4 border-white/10 flex items-center justify-center cursor-pointer transition-all duration-700 ${isOpen ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_80px_rgba(99,102,241,0.4)] rotate-45 scale-110' : 'bg-white/5 hover:bg-white/10'}`}
              >
                 <Layers className={`w-12 h-12 transition-all duration-500 ${isOpen ? 'text-white' : 'text-zinc-600'}`} />
                 
                 {/* Internal Pulse Ring */}
                 {!isOpen && (
                   <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full animate-ping" />
                 )}
              </div>
           </div>

           <div className="absolute bottom-12 left-12 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Bloom_Status: {isOpen ? 'DEPLOYED' : 'DORMANT'}
           </div>
        </div>
      </div>
    </section>
  );
};
