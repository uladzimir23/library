import React, { useState, useContext, useRef, useEffect } from 'react';
import { Share2, Zap, Activity, Radio, Cpu, Network, Target } from 'lucide-react';
import { LanguageContext } from '../App';

export const NodalConstellation: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const nodes = useRef(Array.from({ length: 15 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2
  }))).current;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="nodal-constellation">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Neural_Connectivity_v2
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Nodal <br /><span className="text-indigo-500">Constellation.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Logic is non-linear. We visualize data relationships as a living constellation of nodes that respond to user focus by forming ephemeral synaptic links.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex items-center justify-between shadow-2xl group">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 transition-all group-hover:scale-110">
                   <Network className="w-7 h-7" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Active_Links</div>
                   <div className="text-lg font-tech font-bold text-white uppercase tracking-widest">Calculated_Live</div>
                </div>
             </div>
             <Activity className="w-6 h-6 text-indigo-500 animate-pulse" />
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="flex-[1.5] w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-none"
        >
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#6366f1_0.5px,transparent_0.5px)] bg-[length:40px_40px]" />

           {/* The Constellation Web */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              {nodes.map((node, i) => {
                const distToMouse = Math.hypot(node.x - mousePos.x, node.y - mousePos.y);
                const isNear = distToMouse < 25;
                
                return (
                  <React.Fragment key={i}>
                    {/* Synaptic Link to Cursor */}
                    {isNear && (
                      <line 
                        x1={`${node.x}%`} y1={`${node.y}%`} 
                        x2={`${mousePos.x}%`} y2={`${mousePos.y}%`}
                        stroke="#6366f1" 
                        strokeWidth={2 * (1 - distToMouse / 25)}
                        strokeDasharray="4 4"
                        opacity={0.6 * (1 - distToMouse / 25)}
                        className="transition-all duration-300"
                      />
                    )}
                    
                    {/* Node Visual */}
                    <circle 
                      cx={`${node.x}%`} cy={`${node.y}%`} 
                      r={isNear ? 4 : 2} 
                      fill={isNear ? "#6366f1" : "#333"}
                      className="transition-all duration-500"
                    />
                  </React.Fragment>
                );
              })}
           </svg>

           {/* Center Focal Point */}
           <div 
             className="absolute w-12 h-12 border-2 border-indigo-500/40 rounded-full flex items-center justify-center transition-transform duration-75 pointer-events-none"
             style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%`, transform: 'translate(-50%, -50%)' }}
           >
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Topology_Scanner: ACTIVE</span>
           </div>
        </div>
      </div>
    </section>
  );
};
