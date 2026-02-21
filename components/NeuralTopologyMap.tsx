import React, { useState, useContext, useRef } from 'react';
import { Network, Zap, Activity, Radio, Cpu, Share2, Target, Sliders } from 'lucide-react';
import { LanguageContext } from '../App';

export const NeuralTopologyMap: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const nodes = [
    { id: 0, x: 20, y: 20, icon: Cpu, label: 'Kernel' },
    { id: 1, x: 80, y: 20, icon: Zap, label: 'Power' },
    { id: 2, x: 50, y: 50, icon: Share2, label: 'Relay' },
    { id: 3, x: 20, y: 80, icon: Activity, label: 'IO_Node' },
    { id: 4, x: 80, y: 80, icon: Radio, label: 'Signal' }
  ];

  const connections = [
    [0, 2], [1, 2], [3, 2], [4, 2], [0, 1], [3, 4]
  ];

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#080808]" id="topology-map">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Cognitive_Graph_v9
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Neural <br /><span className="text-indigo-500">Topology_Map.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Logic is a geometry. This compound map visualizes the functional dependencies of the system, where interaction at any node triggers a luminous propagation of data across the topological weave.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-black/5 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Graph_Density</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white uppercase">High_Cohesion</div>
             </div>
             <div className="p-6 bg-black/5 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5">
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Sync_Buffer</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white uppercase">Locked</div>
             </div>
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#6366f1_0.5px,transparent_0.5px)] bg-[length:40px_40px]" />

           {/* The Map Weave */}
           <div className="relative w-full h-full">
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                 <defs>
                    <filter id="topo-glow">
                       <feGaussianBlur stdDeviation="6" result="blur" />
                       <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                 </defs>
                 
                 {connections.map(([from, to], i) => {
                    const isNodeActive = hoveredNode === from || hoveredNode === to;
                    return (
                      <g key={i}>
                         <line 
                           x1={`${nodes[from].x}%`} y1={`${nodes[from].y}%`} 
                           x2={`${nodes[to].x}%`} y2={`${nodes[to].y}%`} 
                           stroke={isNodeActive ? "#6366f1" : "rgba(255,255,255,0.05)"}
                           strokeWidth={isNodeActive ? "2" : "1"}
                           className="transition-all duration-700"
                           filter={isNodeActive ? "url(#topo-glow)" : "none"}
                         />
                         {isNodeActive && (
                           <circle r="4" fill="#6366f1">
                              <animateMotion dur="2s" repeatCount="indefinite" path={`M ${nodes[from].x}% ${nodes[from].y}% L ${nodes[to].x}% ${nodes[to].y}%`} />
                           </circle>
                         )}
                      </g>
                    );
                 })}
              </svg>

              {/* Interaction Nodes */}
              {nodes.map((node) => {
                const isActive = hoveredNode === node.id;
                return (
                  <div 
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="absolute transition-all duration-500 cursor-pointer"
                    style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                     <div className={`w-20 h-20 rounded-[28px] flex flex-col items-center justify-center transition-all duration-700 border shadow-2xl ${isActive ? 'bg-indigo-600 border-indigo-400 scale-125 rotate-12 text-white' : 'bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10'}`}>
                        <node.icon className={`w-8 h-8 ${isActive ? 'animate-pulse' : ''}`} />
                        {isActive && <div className="absolute -bottom-10 text-[9px] font-bold text-indigo-500 uppercase tracking-widest whitespace-nowrap animate-in fade-in duration-300">{node.label}</div>}
                     </div>
                  </div>
                );
              })}
           </div>

           <div className="absolute top-12 right-12 flex items-center gap-3">
              <Network className="w-4 h-4 text-indigo-500" />
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Topology_Scanner: {hoveredNode !== null ? 'TARGET_LOCKED' : 'SCANNING'}</span>
           </div>
        </div>
      </div>
    </section>
  );
};
