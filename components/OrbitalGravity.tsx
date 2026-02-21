import React, { useState, useContext, useEffect } from 'react';
import { Globe, Target, Zap, Activity, Share2, Compass, Circle } from 'lucide-react';
import { LanguageContext } from '../App';

export const OrbitalGravity: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + (activeNode !== null ? 0.2 : 0.8));
    }, 20);
    return () => clearInterval(interval);
  }, [activeNode]);

  const nodes = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    angle: (i * 360) / 6,
    icon: i % 2 === 0 ? Zap : Activity
  }));

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="orbital">
      <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/10 text-cyan-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Nodal_Gravity
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Orbital <br /><span className="text-cyan-500">Sync_v2.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-4">
              Explore hierarchical connectivity through orbital physics. Hover nodes to disrupt gravitational equilibrium and establish dedicated data uplinks.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-[32px] border border-black/5 dark:border-white/5">
                <Compass className="w-5 h-5 text-cyan-500 mb-3" />
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Angular_Velocity</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">{activeNode !== null ? '0.2' : '0.8'}_RAD</div>
             </div>
             <div className="p-6 bg-white/40 dark:bg-zinc-900/40 rounded-[32px] border border-black/5 dark:border-white/5">
                <Share2 className="w-5 h-5 text-indigo-500 mb-3" />
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Uplink_State</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">{activeNode !== null ? 'CONNECTED' : 'STANDBY'}</div>
             </div>
          </div>
        </div>

        <div className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
           {/* Center Point */}
           <div className="relative w-32 h-32 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(34,211,238,0.1)] z-10 transition-transform duration-500 group-hover:scale-110">
              <Globe className="w-12 h-12 text-cyan-400 animate-pulse" />
              <div className="absolute inset-[-10px] border border-dashed border-cyan-500/20 rounded-full animate-spin-slow" />
           </div>

           {/* Orbit Tracks */}
           <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full" />
           <div className="absolute w-[280px] h-[280px] border border-white/5 rounded-full" />

           {/* Rotating Nodes */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-full h-full" style={{ transform: `rotate(${rotation}deg)` }}>
                 {nodes.map((node) => (
                   <div 
                     key={node.id}
                     onMouseEnter={() => setActiveNode(node.id)}
                     onMouseLeave={() => setActiveNode(null)}
                     className="absolute top-1/2 left-1/2 pointer-events-auto cursor-pointer group/node"
                     style={{ 
                       transform: `translate(-50%, -50%) rotate(${node.angle}deg) translateY(-200px) rotate(-${rotation + node.angle}deg)`
                     }}
                   >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeNode === node.id ? 'bg-cyan-500 text-white shadow-[0_0_40px_rgba(34,211,238,0.5)] scale-125 rotate-12' : 'bg-white/5 border border-white/10 text-zinc-500 hover:bg-white/10'}`}>
                         <node.icon className="w-6 h-6" />
                      </div>
                      
                      {/* Laser connection when active */}
                      {activeNode === node.id && (
                        <div className="absolute top-1/2 left-1/2 w-[200px] h-[1px] bg-gradient-to-r from-cyan-500 to-transparent origin-left rotate-90 opacity-40 translate-y-7" />
                      )}
                   </div>
                 ))}
              </div>
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-1">Gravity_Controller: OK</div>
              <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest italic">Phase_Sync_Enabled</div>
           </div>
        </div>
      </div>
    </section>
  );
};
