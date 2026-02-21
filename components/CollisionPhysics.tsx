import React, { useState, useContext, useRef, useEffect } from 'react';
import { Target, Zap, Layers, Box, Move, Shield, Activity, MousePointer2, AlertTriangle } from 'lucide-react';
import { LanguageContext } from '../App';

export const CollisionPhysics: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [posA, setPosA] = useState({ x: -120, y: 0 });
  const [posB, setPosB] = useState({ x: 120, y: 0 });
  const [impact, setImpact] = useState(0); // 0 to 1 intensity
  const [lastImpactPos, setLastImpactPos] = useState({ x: 0, y: 0 });

  const checkCollision = () => {
    const dist = Math.hypot(posA.x - posB.x, posA.y - posB.y);
    if (dist < 180) {
      // Calculate impact point
      setLastImpactPos({ x: (posA.x + posB.x) / 2, y: (posA.y + posB.y) / 2 });
      setImpact(1);
      
      // Physical kickback logic
      const angle = Math.atan2(posA.y - posB.y, posA.x - posB.x);
      const force = 60;
      setPosA(prev => ({ x: prev.x + Math.cos(angle) * force, y: prev.y + Math.sin(angle) * force }));
      setPosB(prev => ({ x: prev.x - Math.cos(angle) * force, y: prev.y - Math.sin(angle) * force }));
      
      setTimeout(() => setImpact(0), 400);
    }
  };

  useEffect(() => {
    checkCollision();
  }, [posA, posB]);

  return (
    <div className="relative h-[650px] bg-zinc-50 dark:bg-zinc-950/60 rounded-[64px] border border-black/5 dark:border-white/10 overflow-hidden flex items-center justify-center group shadow-inner perspective-2000">
       
       {/* Background Matter Grid */}
       <div className={`absolute inset-0 transition-opacity duration-500 ${impact > 0 ? 'opacity-30' : 'opacity-10'}`} 
            style={{ backgroundImage: `radial-gradient(${impact > 0 ? '#f43f5e' : '#6366f1'} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
       
       {/* Impact Rings */}
       {impact > 0 && (
         <div 
           className="absolute pointer-events-none z-0"
           style={{ left: `calc(50% + ${lastImpactPos.x}px)`, top: `calc(50% + ${lastImpactPos.y}px)` }}
         >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="absolute inset-0 border-2 border-rose-500 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ripple" style={{ width: 0, height: 0, animationDelay: `${i*0.1}s` }} />
            ))}
         </div>
       )}

       {/* Impact Glitch Overlay */}
       <div className={`absolute inset-0 bg-rose-500/5 transition-all duration-300 pointer-events-none ${impact > 0 ? 'opacity-100 saturate-200 contrast-150' : 'opacity-0'}`} />

       {/* Component A (Compute Block) */}
       <div 
         draggable
         onDrag={(e) => {
           if (e.clientX === 0) return;
           const rect = e.currentTarget.parentElement?.getBoundingClientRect();
           if (rect) setPosA({ x: e.clientX - rect.left - rect.width/2, y: e.clientY - rect.top - rect.height/2 });
         }}
         className={`absolute cursor-grab active:cursor-grabbing transition-all duration-300 ease-out z-20`}
         style={{ transform: `translate(${posA.x}px, ${posA.y}px)` }}
       >
          <div className={`w-44 h-44 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl border-2 rounded-[40px] flex flex-col items-center justify-center p-8 shadow-2xl transition-all ${impact > 0 ? 'border-rose-500 scale-110 rotate-3 shadow-rose-500/30' : 'border-white/10'}`}>
             <Box className={`w-12 h-12 mb-6 transition-colors ${impact > 0 ? 'text-rose-500' : 'text-indigo-500'}`} />
             <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">Mass: 42kg</div>
             <div className="h-1 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-500 ${impact > 0 ? 'bg-rose-500 w-full' : 'bg-indigo-500 w-1/3'}`} />
             </div>
          </div>
       </div>

       {/* Component B (Shield Node) */}
       <div 
         draggable
         onDrag={(e) => {
           if (e.clientX === 0) return;
           const rect = e.currentTarget.parentElement?.getBoundingClientRect();
           if (rect) setPosB({ x: e.clientX - rect.left - rect.width/2, y: e.clientY - rect.top - rect.height/2 });
         }}
         className="absolute cursor-grab active:cursor-grabbing transition-all duration-300 ease-out z-10"
         style={{ transform: `translate(${posB.x}px, ${posB.y}px)` }}
       >
          <div className={`w-56 h-36 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl border-2 rounded-[40px] flex flex-col items-center justify-center p-8 shadow-2xl transition-all ${impact > 0 ? 'border-emerald-500 scale-90 -rotate-3 shadow-emerald-500/20' : 'border-white/10'}`}>
             <Shield className={`w-12 h-12 mb-4 transition-colors ${impact > 0 ? 'text-emerald-500' : 'text-zinc-600'}`} />
             <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Elastic_Buffer: ON</div>
          </div>
       </div>

       {/* HUD HUD Diagnostics */}
       <div className="absolute top-12 left-12 flex flex-col gap-3">
          <div className="flex items-center gap-4 p-4 bg-white/40 dark:bg-zinc-900/90 rounded-2xl border border-white/10 backdrop-blur-xl">
             <div className={`w-2 h-2 rounded-full ${impact > 0 ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
             <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">
                {impact > 0 ? 'Collision_Detected' : 'Searching_Vectors'}
             </div>
          </div>
          {impact > 0 && (
            <div className="flex items-center gap-3 text-rose-500 font-mono text-[10px] uppercase font-bold animate-in slide-in-from-left-4">
               <AlertTriangle className="w-4 h-4" /> Structural_Stress: {(impact * 100).toFixed(0)}%
            </div>
          )}
       </div>

       <div className="absolute bottom-12 right-12 flex items-center gap-6">
          <div className="text-right">
             <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Momentum_Calibration</div>
             <div className="text-xs font-bold text-zinc-900 dark:text-white uppercase">Linear_Force_v2.1</div>
          </div>
          <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-xl">
             <MousePointer2 className="w-5 h-5" />
          </div>
       </div>

       <style>{`
         @keyframes ripple {
           0% { width: 0; height: 0; opacity: 1; }
           100% { width: 300px; height: 300px; opacity: 0; }
         }
         .animate-ripple {
           animation: ripple 0.8s cubic-bezier(0, 0.2, 0.8, 1) forwards;
         }
       `}</style>
    </div>
  );
};
