import React, { useState, useContext } from 'react';
import { Layers, Box, Square, Type, MousePointer2, Sliders, Layout, Move } from 'lucide-react';
import { LanguageContext } from '../App';

export const AtomicDesign: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [hoveredAtom, setHoveredAtom] = useState<number | null>(null);

  const atoms = [
    { icon: Square, label: 'Shape', prop: 'radius: 12px' },
    { icon: Type, label: 'Text', prop: 'font: Mono' },
    { icon: Sliders, label: 'Logic', prop: 'state: Hover' },
    { icon: Layers, label: 'Stack', prop: 'z-index: 10' }
  ];

  return (
    <section className="py-32 bg-zinc-50 dark:bg-[#080808] border-y border-black/5 dark:border-white/5" id="atomic-design">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-3 text-emerald-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
              <Layout className="w-4 h-4" />
              Design_System_Orchestrator
            </div>
            <h2 className="text-5xl font-tech font-bold text-zinc-900 dark:text-white uppercase leading-none tracking-tighter">
              Atomic <br /><span className="text-emerald-500">Blueprint.</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-500 text-lg font-light leading-relaxed">
              Granular control over digital DNA. We decompose every interface into primitive atoms, allowing for infinite scalability and architectural consistency across the entire ecosystem.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
               {atoms.map((atom, i) => (
                 <div 
                   key={i}
                   onMouseEnter={() => setHoveredAtom(i)}
                   onMouseLeave={() => setHoveredAtom(null)}
                   className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${hoveredAtom === i ? 'bg-emerald-500 border-emerald-400 shadow-xl shadow-emerald-500/20 translate-y-[-4px]' : 'bg-white dark:bg-zinc-900 border-black/5 dark:border-white/10'}`}
                 >
                    <atom.icon className={`w-6 h-6 mb-4 ${hoveredAtom === i ? 'text-white' : 'text-emerald-500'}`} />
                    <div className={`text-[10px] font-bold uppercase tracking-widest ${hoveredAtom === i ? 'text-white/80' : 'text-zinc-400'}`}>{atom.label}</div>
                    <div className={`text-sm font-mono mt-1 ${hoveredAtom === i ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>{atom.prop}</div>
                 </div>
               ))}
            </div>
          </div>

          <div className="flex-1 w-full h-[600px] bg-white dark:bg-zinc-900/50 rounded-[64px] border border-black/5 dark:border-white/10 relative overflow-hidden flex items-center justify-center group shadow-inner">
             {/* Blueprint Grid */}
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

             {/* Assembler Visualization */}
             <div className="relative w-80 h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-500/5 rounded-[64px] border-2 border-dashed border-emerald-500/20 animate-pulse" />
                
                {/* Floating Atoms in 3D */}
                <div className="relative z-10 space-y-4 perspective-2000">
                   {[0, 1, 2].map(i => (
                     <div 
                       key={i}
                       className="w-48 h-20 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-between px-6 shadow-2xl transition-all duration-700 ease-out preserve-3d group-hover:scale-110"
                       style={{ 
                         transform: `translateZ(${i * 40}px) rotateX(${hoveredAtom === i ? '10deg' : '0'})`,
                         opacity: hoveredAtom !== null && hoveredAtom !== i ? 0.3 : 1
                       }}
                     >
                        <div className="flex items-center gap-4">
                           <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                              <Box className="w-4 h-4" />
                           </div>
                           <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                        </div>
                        <div className="w-4 h-4 rounded-full border border-emerald-500/50 flex items-center justify-center">
                           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        </div>
                     </div>
                   ))}
                </div>

                {/* Technical Annotation Line */}
                <div className="absolute top-1/2 left-[110%] w-32 h-[1px] bg-emerald-500/40 hidden lg:block">
                   <div className="absolute top-[-12px] right-0 text-[8px] font-mono text-emerald-500 bg-white dark:bg-zinc-900 px-2 py-1 border border-emerald-500/20 rounded-md">RENDER_SEQUENCE: OK</div>
                </div>
             </div>

             <div className="absolute bottom-12 left-12 flex items-center gap-4">
                <MousePointer2 className="w-5 h-5 text-emerald-500 animate-bounce" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Awaiting_Interaction_Seed...</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
