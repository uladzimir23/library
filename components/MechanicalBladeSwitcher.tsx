
import React, { useState } from 'react';
import { HardDrive, Cpu, Radio, ChevronRight, Layers, Zap, Disc } from 'lucide-react';

type BladeID = 'CORE' | 'SENSOR' | 'RELAY';

export const MechanicalBladeSwitcher: React.FC = () => {
  const [active, setActive] = useState<BladeID>('CORE');
  const [isAnimating, setIsAnimating] = useState(false);

  const switchBlade = (id: BladeID) => {
    if (id === active || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActive(id);
      setIsAnimating(false);
    }, 600);
  };

  const bladeData = {
    CORE: { title: 'Central_Core', code: '0x88.CPU', icon: Cpu, color: 'emerald', desc: 'Первичный вычислительный узел с жидкостным охлаждением.' },
    SENSOR: { title: 'Optic_Array', code: '0x42.VIS', icon: Radio, color: 'amber', desc: 'Сенсорная панель для захвата спектральных искажений.' },
    RELAY: { title: 'Signal_Relay', code: '0x12.NET', icon: Disc, color: 'sky', desc: 'Магистральный ретранслятор для межпространственной связи.' }
  };

  return (
    <div className="scroll-mt-24">
      <div className="mb-20 flex justify-between items-end">
         <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em]">Mechanical_System</span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Слайдер <br /><span className="text-emerald-500">Лезвий.</span>
            </h2>
         </div>
         <div className="text-right opacity-40 font-mono text-[10px] uppercase">Slot_Inertia: 0.82n</div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch h-[600px] perspective-2000">
         {/* The Enclosure (Sidebar) */}
         <div className="w-full lg:w-80 bg-zinc-900 rounded-[48px] border border-white/5 p-6 flex flex-col gap-4 shadow-2xl relative z-20">
            {(['CORE', 'SENSOR', 'RELAY'] as BladeID[]).map((id) => (
              <button 
                key={id}
                onClick={() => switchBlade(id)}
                className={`p-6 rounded-3xl border text-left transition-all duration-300 flex items-center justify-between group relative overflow-hidden
                  ${active === id ? 'bg-white text-zinc-900 border-white translate-x-4 shadow-2xl' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}
                `}
              >
                 <div className="relative z-10">
                    <div className="text-[8px] font-mono opacity-50 uppercase tracking-widest">Buffer_Slot</div>
                    <div className="text-xs font-black uppercase tracking-widest">{id}</div>
                 </div>
                 {active === id && <ChevronRight className="w-5 h-5 animate-pulse" />}
                 {/* Internal Blade Indicator */}
                 <div className={`absolute bottom-0 left-0 h-1 bg-zinc-900 transition-all duration-700 ${active === id ? 'w-full' : 'w-0'}`} />
              </button>
            ))}
            
            <div className="mt-auto p-6 bg-black rounded-3xl border border-white/5">
               <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-4 h-4 text-zinc-600" />
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Hydraulic_Load</span>
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-2/3" />
               </div>
            </div>
         </div>

         {/* The Sliding Blades Area */}
         <div className="flex-1 relative bg-zinc-950 rounded-[64px] border border-white/5 overflow-hidden shadow-inner flex items-center justify-center">
            {/* Background Tracks */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-white/5 border-y border-white/5" />
            
            {/* The Blade Object */}
            <div 
              className={`relative w-[85%] h-[75%] transition-all duration-[600ms] cubic-bezier(0.34, 1.56, 0.64, 1)
                ${isAnimating ? 'translate-x-[120%] rotate-y-[30deg] opacity-0 blur-lg' : 'translate-x-0 rotate-y-0 opacity-100 blur-0'}
              `}
            >
               <div className="w-full h-full bg-zinc-900 rounded-[56px] border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] p-16 flex flex-col justify-between relative group/blade">
                  {/* Surface Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none rounded-[inherit]" />
                  
                  <div className="flex justify-between items-start relative z-10">
                     <div className="space-y-8">
                        <div className={`w-24 h-24 rounded-[36px] bg-${bladeData[active].color}-500/10 border border-${bladeData[active].color}-500/30 flex items-center justify-center shadow-xl group-hover/blade:scale-110 transition-transform`}>
                           {React.createElement(bladeData[active].icon, { className: `w-12 h-12 text-${bladeData[active].color}-500` })}
                        </div>
                        <div>
                           <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-2">{bladeData[active].code}</div>
                           <h3 className="text-6xl font-tech font-bold text-white uppercase tracking-tighter leading-none">{bladeData[active].title}</h3>
                        </div>
                     </div>
                     
                     <div className="bg-black/50 border border-white/10 rounded-2xl p-4 font-mono text-[10px] text-zinc-500">
                        STATUS: NOMINAL<br />
                        LOAD: 12.4%
                     </div>
                  </div>

                  <div className="flex justify-between items-end pt-12 border-t border-white/5 relative z-10">
                     <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-sm">{bladeData[active].desc}</p>
                     <div className="flex gap-4">
                        <button className="px-8 py-4 bg-white text-zinc-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Initialize</button>
                        <button className="p-4 bg-white/5 text-white border border-white/10 rounded-2xl hover:bg-white/10 transition-all"><Zap className="w-4 h-4" /></button>
                     </div>
                  </div>

                  {/* Corner Rivets */}
                  <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-zinc-800 shadow-inner" />
                  <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-zinc-800 shadow-inner" />
                  <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-zinc-800 shadow-inner" />
                  <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-zinc-800 shadow-inner" />
               </div>
            </div>

            {/* Depth Guides */}
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black to-transparent z-10" />
         </div>
      </div>
    </div>
  );
};
