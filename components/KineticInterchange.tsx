import React, { useState, useContext } from 'react';
import { RefreshCw, Zap, Shield, ArrowLeftRight, Activity, Cpu } from 'lucide-react';
import { LanguageContext } from '../App';

export const KineticInterchange: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isSwapped, setIsSwapped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwap = () => {
    setIsAnimating(true);
    setIsSwapped(!isSwapped);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="interchange">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Kinetic_Swap_v4
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Kinetic <br /><span className="text-emerald-500">Interchange.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Positional data is fluid. Our interchange engine handles element swapping by projecting them into Z-space, avoiding collisions through temporary dimensional shifts.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 space-y-6">
             <button 
               onClick={handleSwap}
               disabled={isAnimating}
               className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all active:scale-95 shadow-xl flex items-center justify-center gap-4"
             >
               <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
               Swap_System_Nodes
             </button>
             <div className="flex justify-between text-[8px] font-mono text-zinc-500 uppercase">
                <span>Vector_Alignment: OK</span>
                <span>Collision_Bypass: ACTIVE</span>
             </div>
          </div>
        </div>

        <div className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl group">
           <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
           
           {/* Interchange Track */}
           <div className="relative w-full h-full flex items-center justify-center gap-12 preserve-3d">
              
              {/* Node 1 */}
              <div 
                className={`relative w-48 h-64 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${isAnimating ? 'blur-[4px]' : 'blur-0'}`}
                style={{ 
                  transform: isSwapped 
                    ? `translateX(120px) translateZ(-100px) rotateY(180deg)` 
                    : `translateX(-120px) translateZ(0px) rotateY(0deg)`,
                  zIndex: isSwapped ? 10 : 20
                }}
              >
                 <div className="absolute inset-0 bg-emerald-600 rounded-[48px] border-4 border-white/20 shadow-2xl flex flex-col items-center justify-center p-8">
                    <Cpu className="w-12 h-12 text-white mb-6" />
                    <div className="text-center">
                       <div className="text-[10px] font-mono text-white/40 uppercase mb-1 tracking-widest">Logic_Node</div>
                       <div className="text-xl font-tech font-bold text-white uppercase tracking-tighter">0xPrimary</div>
                    </div>
                 </div>
              </div>

              {/* Node 2 */}
              <div 
                className={`relative w-48 h-64 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${isAnimating ? 'blur-[4px]' : 'blur-0'}`}
                style={{ 
                  transform: isSwapped 
                    ? `translateX(-120px) translateZ(100px) rotateY(-180deg)` 
                    : `translateX(120px) translateZ(-50px) rotateY(0deg)`,
                  zIndex: isSwapped ? 20 : 10
                }}
              >
                 <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-[48px] border-2 border-white/20 shadow-2xl flex flex-col items-center justify-center p-8">
                    <Shield className="w-12 h-12 text-emerald-500 mb-6" />
                    <div className="text-center">
                       <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1 tracking-widest">Safety_Relay</div>
                       <div className="text-xl font-tech font-bold text-white uppercase tracking-tighter">0xBackup</div>
                    </div>
                 </div>
              </div>

              {/* Orbital Path Indicator */}
              <div className={`absolute w-[400px] h-[2px] bg-emerald-500/10 transition-all duration-700 ${isAnimating ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`} />
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <ArrowLeftRight className={`w-4 h-4 text-emerald-500 ${isAnimating ? 'animate-pulse' : ''}`} />
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-[0.3em]">Phase_Shift_Synchronizer</span>
           </div>
        </div>
      </div>
    </section>
  );
};
