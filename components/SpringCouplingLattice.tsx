import React, { useState, useContext, useRef, useEffect } from 'react';
import { Target, Share2, Zap, Activity, RefreshCw, Move } from 'lucide-react';
import { LanguageContext } from '../App';

export const SpringCouplingLattice: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [leaderPos, setLeaderPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setLeaderPos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#080808]" id="spring-lattice">
      <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Nodal_Physics
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Spring <br /><span className="text-emerald-500">Coupling.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Relationships have elasticity. In our coupling engine, subordinate elements are linked to a leader via virtual springs, creating a lag-and-bounce effect that visualizes the hierarchical tension between nodes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <RefreshCw className="w-5 h-5 text-emerald-500 mb-3" />
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Coupling_Stiffness</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">0.12_V1</div>
             </div>
             <div className="p-6 bg-white dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5">
                <Activity className="w-5 h-5 text-indigo-500 mb-3" />
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Nodal_Delay</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">42ms/STEP</div>
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-inner perspective-2000"
        >
           {/* Background Mesh */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#10b981_0.5px,transparent_0.5px)] bg-[length:30px_30px]" />

           <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-30">
                 {[1, 2, 3].map(i => (
                   <line 
                     key={i}
                     x1="50%" y1="50%" 
                     x2={`calc(50% + ${leaderPos.x}px)`} 
                     y2={`calc(50% + ${leaderPos.y}px)`} 
                     stroke="#10b981" 
                     strokeWidth="1" 
                     strokeDasharray="4 4"
                     className="transition-all duration-700 ease-out"
                     style={{ transitionDelay: `${i * 100}ms` }}
                   />
                 ))}
              </svg>

              {/* Follower Nodes */}
              {[3, 2, 1].map((i) => (
                <div 
                  key={i}
                  className="absolute w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl transition-all duration-700 ease-out"
                  style={{ 
                    transform: `translate(${leaderPos.x * (1 - i*0.2)}px, ${leaderPos.y * (1 - i*0.2)}px) translateZ(${-i * 40}px)`,
                    opacity: 1 - i * 0.2
                  }}
                >
                   <Share2 className="w-5 h-5 text-emerald-500 opacity-40" />
                </div>
              ))}

              {/* Leader Node */}
              <div 
                onMouseDown={() => setIsDragging(true)}
                className="pointer-events-auto relative w-20 h-20 rounded-3xl bg-emerald-600 flex items-center justify-center text-white shadow-[0_0_50px_rgba(16,185,129,0.3)] cursor-grab active:cursor-grabbing transition-transform duration-150"
                style={{ transform: `translate(${leaderPos.x}px, ${leaderPos.y}px) rotate(${leaderPos.x * 0.1}deg)` }}
              >
                 <Zap className="w-8 h-8 fill-current" />
                 <div className="absolute -top-10 bg-zinc-900 border border-white/10 px-3 py-1 rounded-full text-[8px] font-mono whitespace-nowrap">LEADER_NODE_0x88</div>
              </div>
           </div>

           <div className="absolute bottom-12 left-12 flex items-center gap-4 text-emerald-500/60">
              <Move className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Dragging_Vector_Locked</span>
           </div>
        </div>
      </div>
    </section>
  );
};