import React, { useState, useContext, useRef, useEffect } from 'react';
import { Share2, Zap, Radio, Target, Workflow, Activity } from 'lucide-react';
import { LanguageContext } from '../App';

export const SynergyFlux: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5" id="synergy">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/10 text-violet-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.synergy.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.synergy.title} <span className="text-violet-500">{t.synergy.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.synergy.desc}
            </p>
          </div>

          <div className="space-y-6">
             {[
               { id: 'latency', icon: Zap, val: '0.04ms', label: 'Response_Bias' },
               { id: 'harmony', icon: Radio, val: '124Hz', label: 'Sync_Frequency' },
               { id: 'cascade', icon: Workflow, val: 'Enabled', label: 'Layer_Logic' }
             ].map(stat => (
               <div key={stat.id} className="flex items-center gap-6 p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-black/5 dark:border-white/5 group hover:border-violet-500/30 transition-all">
                  <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-all">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                    <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">{stat.val}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Interactive Stack Visualization */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
          className="flex-1 w-full h-[600px] bg-zinc-50 dark:bg-zinc-950/20 rounded-[48px] border border-black/5 dark:border-white/5 relative overflow-hidden flex items-center justify-center cursor-crosshair"
        >
           {/* Background Synergy Grid - HEAVY MASS */}
           <div className="absolute inset-0 opacity-10 pointer-events-none transition-transform duration-1000" style={{ 
             backgroundImage: 'radial-gradient(circle at center, #8b5cf6 0.5px, transparent 0.5px)', 
             backgroundSize: '24px 24px',
             transform: `scale(${1 + mousePos.y * 0.05}) translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`
           }} />

           {/* Cascading Layers */}
           <div className="relative w-80 h-[400px] preserve-3d">
              
              {/* Layer 1: The Reactive Pulse (Heavy Foundation) */}
              <div className="absolute inset-0 bg-violet-500/5 border border-violet-500/10 rounded-[32px] transition-transform duration-700 ease-out"
                   style={{ transform: `translateZ(-40px) translate(${mousePos.x * 10}px, ${mousePos.y * 10}px) scale(1.05)` }}>
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)] animate-pulse" />
              </div>

              {/* Layer 2: Geometric Data (Mid Mass) */}
              <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-[32px] overflow-hidden transition-transform duration-500 ease-out"
                   style={{ transform: `translateZ(0px) translate(${mousePos.x * 35}px, ${mousePos.y * 35}px)` }}>
                 <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-400" />
                    <div className="absolute top-0 left-1/2 w-[1px] h-full bg-zinc-400" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-zinc-400 rounded-full" />
                 </div>
                 <div className="absolute bottom-6 left-6 text-[8px] font-mono text-zinc-400 uppercase">Coord_System_01</div>
              </div>

              {/* Layer 3: Interactive Hotspots (Light Mass - High Parallax) */}
              <div className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
                   style={{ transform: `translateZ(80px) translate(${mousePos.x * 110}px, ${mousePos.y * 110}px)` }}>
                 
                 {/* Synergy Points - Very reactive */}
                 <div className="absolute top-1/4 left-1/4 group/point">
                    <div className="w-3 h-3 bg-violet-500 rounded-full shadow-[0_0_15px_#8b5cf6] animate-ping opacity-40" />
                    <div className="w-3 h-3 bg-violet-500 rounded-full relative -top-3" />
                    <div className="absolute top-0 left-6 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl">
                       <span className="text-[9px] font-bold text-violet-500 uppercase tracking-tighter">Event_Trigger_0x</span>
                    </div>
                 </div>

                 <div className="absolute bottom-1/4 right-1/4">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]" />
                    <div className="absolute top-0 right-6 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl text-right">
                       <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Active_Sync: OK</span>
                    </div>
                 </div>
              </div>

              {/* Connecting Strings (SVG) */}
              <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none opacity-20 dark:opacity-40 transition-transform duration-300"
                   style={{ transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)` }}>
                <line x1="50%" y1="50%" x2={`${50 + mousePos.x * 240}%`} y2={`${50 + mousePos.y * 240}%`} stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx={`${50 + mousePos.x * 240}%`} cy={`${50 + mousePos.y * 240}%`} r="4" fill="none" stroke="#8b5cf6" />
              </svg>
           </div>

           {/* Floating Info HUD - Lightest Mass */}
           <div className="absolute top-10 right-10 flex flex-col items-end gap-2 text-right transition-transform duration-200"
                style={{ transform: `translate(${mousePos.x * 140}px, ${mousePos.y * 140}px)` }}>
              <div className="flex items-center gap-2 text-violet-500">
                <Target className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Focus_Tracking</span>
              </div>
              <div className="font-mono text-[9px] text-zinc-500">
                X: {(mousePos.x * 100).toFixed(2)}%<br />
                Y: {(mousePos.y * 100).toFixed(2)}%
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
