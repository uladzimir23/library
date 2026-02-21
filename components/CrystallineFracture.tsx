import React, { useState, useContext } from 'react';
// Added missing RefreshCw import
import { Gem, Zap, Activity, Target, Shield, Maximize2, Trash2, RefreshCw } from 'lucide-react';
import { LanguageContext } from '../App';

export const CrystallineFracture: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isBroken, setIsBroken] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="fracture">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Material_Fatigue
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Crystalline <br /><span className="text-rose-500">Fracture.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Nothing is indestructible. Experience the transition from solid state to shattered geometry. Our fracture engine calculates procedural shard trajectories based on impact coordinates, redefining the concept of interface destruction.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex flex-col gap-3">
                <div className="flex justify-between items-center text-rose-500">
                   <Shield className="w-6 h-6" />
                   <span className="text-[10px] font-bold uppercase">Integrity</span>
                </div>
                <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase">{isBroken ? '0.04%' : '100%_STABLE'}</div>
             </div>
             <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 flex flex-col gap-3">
                <button 
                  onClick={() => setIsBroken(!isBroken)}
                  className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                   {isBroken ? <RefreshCw className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                   <span className="text-[9px] font-bold uppercase">{isBroken ? 'Reset_Structure' : 'Trigger_Shard'}</span>
                </button>
             </div>
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group perspective-2000 shadow-2xl"
        >
           {/* Shard Field */}
           <div className="relative w-80 h-96 preserve-3d transition-transform duration-1000 ease-out"
                style={{ transform: `rotateX(${mousePos.y * -20}deg) rotateY(${mousePos.x * 20}deg)` }}>
              
              {/* Shards (CSS Polygonal Slices) */}
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 bg-white/10 border border-white/20 backdrop-blur-3xl transition-all duration-[1200ms] cubic-bezier(0.2, 0.8, 0.2, 1)"
                  style={{ 
                    clipPath: i % 2 === 0 
                      ? 'polygon(0% 0%, 50% 50%, 0% 100%)' 
                      : 'polygon(100% 0%, 50% 50%, 100% 100%)',
                    transform: isBroken 
                      ? `translateZ(${i * 120}px) rotateX(${i * 45}deg) rotateY(${i * 22}deg) translate(${(i-4) * 40}px, ${(i-4) * 20}px) scale(0.6)`
                      : `translateZ(0px)`,
                    opacity: isBroken ? 0.3 : 1,
                    boxShadow: isBroken ? 'none' : '0 20px 50px rgba(0,0,0,0.3)'
                  }}
                >
                   <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-rose-500/10" />
                   {i === 0 && <Gem className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-rose-500/40" />}
                </div>
              ))}

              {/* Core Warning HUD */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isBroken ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
                 <div className="bg-rose-600 text-white p-6 rounded-[32px] shadow-[0_0_80px_rgba(244,63,94,0.4)] border-4 border-white/20 flex flex-col items-center">
                    <Zap className="w-12 h-12 mb-4 animate-bounce" />
                    <div className="text-[10px] font-mono uppercase font-bold tracking-widest">CRITICAL_FRACTURE</div>
                 </div>
              </div>
           </div>

           {/* Floating Info */}
           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isBroken ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Structural_Status: {isBroken ? 'COMPROMISED' : 'NOMINAL'}</span>
           </div>
        </div>
      </div>
    </section>
  );
};