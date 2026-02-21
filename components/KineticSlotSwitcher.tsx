
import React, { useState, useContext } from 'react';
import { LayoutGrid, Database, Zap, Cpu, ArrowRight, ArrowLeft, Layers, Move } from 'lucide-react';
import { LanguageContext } from '../App';

type SlotID = 'COMPUTE' | 'MEMORY' | 'GRAPHICS';

export const KineticSlotSwitcher: React.FC = () => {
  const { t, isDiagnostic } = useContext(LanguageContext);
  const [active, setActive] = useState<SlotID>('COMPUTE');
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const switchSlot = (id: SlotID) => {
    if (id === active || isMoving) return;
    const order: SlotID[] = ['COMPUTE', 'MEMORY', 'GRAPHICS'];
    setDirection(order.indexOf(id) > order.indexOf(active) ? 'forward' : 'backward');
    setIsMoving(true);
    setTimeout(() => {
      setActive(id);
      setIsMoving(false);
    }, 600);
  };

  const slotData = {
    COMPUTE: { title: 'Compute_Engine', val: '840 TFLOPS', icon: Cpu, color: 'emerald' },
    MEMORY: { title: 'Buffer_Registry', val: '128 GB/s', icon: Database, color: 'sky' },
    GRAPHICS: { title: 'Pixel_Lattice', val: '16K Native', icon: LayoutGrid, color: 'rose' }
  };

  const CurrentIcon = slotData[active].icon;

  return (
    <div className="scroll-mt-24">
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Kinetic_Slot_0x88
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Кинетический <br /><span className="text-emerald-500">Слот.</span>
         </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-stretch h-[600px] perspective-2000">
         {/* Slot Selectors (Side) */}
         <div className="w-full lg:w-72 flex flex-col gap-3">
            {(['COMPUTE', 'MEMORY', 'GRAPHICS'] as SlotID[]).map((id) => (
              <button 
                key={id}
                onClick={() => switchSlot(id)}
                className={`p-6 rounded-[32px] border text-left transition-all duration-500 flex items-center justify-between group
                  ${active === id ? 'bg-white text-zinc-900 border-white shadow-2xl scale-[1.03] z-10' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10 hover:translate-x-2'}
                `}
              >
                 <div className="space-y-1">
                    <div className="text-[8px] font-mono opacity-50 uppercase tracking-widest">Buffer_ID</div>
                    <div className="text-xs font-bold uppercase tracking-widest">{id}</div>
                 </div>
                 <div className={`w-1.5 h-1.5 rounded-full ${active === id ? 'bg-indigo-600' : 'bg-zinc-800'}`} />
              </button>
            ))}
            
            <div className="mt-auto p-8 bg-zinc-900 border border-white/5 rounded-[48px] shadow-2xl">
               <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-4 h-4 text-zinc-600" />
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Slot_Pressure</span>
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[84%] animate-pulse" />
               </div>
            </div>
         </div>

         {/* The Slot Container */}
         <div className="flex-1 bg-[#0a0a0c] rounded-[64px] border border-white/5 relative overflow-hidden flex items-center justify-center group shadow-inner">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            
            {/* Moving Tray */}
            <div 
              className={`relative w-full h-full flex items-center justify-center transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)
                ${isMoving ? (direction === 'forward' ? 'translate-y-full opacity-0 scale-90' : 'translate-y-[-100%] opacity-0 scale-90') : 'translate-y-0 opacity-100 scale-100'}
              `}
            >
               <div className="w-[80%] h-[70%] bg-zinc-900 rounded-[56px] border border-white/10 p-16 flex flex-col justify-between shadow-2xl relative overflow-hidden group/tray">
                  {/* Decorative Reflection */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  
                  <div className="flex justify-between items-start">
                     <div className="space-y-6">
                        <div className={`w-20 h-20 rounded-[32px] bg-${slotData[active].color}-500/10 border border-${slotData[active].color}-500/30 flex items-center justify-center`}>
                           <CurrentIcon className={`w-10 h-10 text-${slotData[active].color}-500`} />
                        </div>
                        <div>
                           <h3 className="text-5xl font-tech font-bold text-white uppercase tracking-tighter mb-4">{slotData[active].title}</h3>
                           <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-md">Физический узел обработки данных с интегрированной системой охлаждения и фазовой синхронизации.</p>
                        </div>
                     </div>

                     {isDiagnostic && (
                       <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-3 min-w-[180px]">
                          <div className="text-[9px] font-mono text-emerald-500 font-bold uppercase mb-1">Live_Node_Stat</div>
                          <div className="text-2xl font-tech font-bold text-white">{slotData[active].val}</div>
                       </div>
                     )}
                  </div>

                  <div className="flex justify-between items-end border-t border-white/5 pt-8">
                     <div className="flex gap-4">
                        <button className="px-10 py-4 bg-white text-zinc-900 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-transform active:scale-95">Lock_State</button>
                        <button className="px-10 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Re-Sync</button>
                     </div>
                     <div className="text-right">
                        <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-1">Asset_Path</div>
                        <div className="text-xl font-tech font-bold text-zinc-400 uppercase">/0x88/{active}</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Depth Guides (Slot lines) */}
            <div className="absolute inset-y-0 left-12 w-[1px] bg-white/5 z-0" />
            <div className="absolute inset-y-0 right-12 w-[1px] bg-white/5 z-0" />
         </div>
      </div>
    </div>
  );
};
