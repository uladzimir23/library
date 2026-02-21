import React, { useState, useContext, useRef } from 'react';
import { Move3d, Maximize, Box, Disc, Database, Cpu, Navigation } from 'lucide-react';
import { LanguageContext } from '../App';

export const PerspectiveWarp: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [view, setView] = useState({ x: 0, y: 0 });
  const [depth, setDepth] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Снижаем чувствительность
    setView({ x: x * 0.6, y: y * 0.6 });
  };

  return (
    <section className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5" id="warp">
      <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/10 text-cyan-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.warp.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.warp.title} <span className="text-cyan-500">{t.warp.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.warp.desc}
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/10 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-2"><Maximize className="w-3 h-3" /> {t.warp.depthScale}</span>
                <span className="font-mono text-cyan-500">x{depth.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0" max="3" step="0.1" value={depth}
                onChange={e => setDepth(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {[
               { icon: Navigation, label: 'TILT_ANGLE', val: `${(view.y * 20).toFixed(1)}°` },
               { icon: Cpu, label: 'Z_REFR_INDEX', val: (depth * 1.22).toFixed(2) }
             ].map((item, i) => (
               <div key={i} className="p-5 bg-white/40 dark:bg-zinc-900/40 rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-2 text-cyan-500">
                    <item.icon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                  </div>
                  <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">{item.val}</div>
               </div>
             ))}
          </div>
        </div>

        {/* 3D Perspective Canvas */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setView({ x: 0, y: 0 })}
          className="flex-1 w-full h-[550px] bg-zinc-100 dark:bg-zinc-900/50 rounded-[48px] border border-black/5 dark:border-white/10 relative overflow-hidden flex items-center justify-center perspective-2000 group"
        >
           {/* Moving Background Grid */}
           <div className="absolute inset-0 opacity-10 pointer-events-none transition-transform duration-700" style={{ 
             backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)',
             backgroundSize: '30px 30px',
             transform: `translateZ(-500px) rotateX(${view.y * 3}deg) rotateY(${view.x * 3}deg) translate(${view.x * 3}px, ${view.y * 3}px)`
           }} />

           {/* The Adaptive 3D Stack */}
           <div 
             className="relative w-72 h-48 preserve-3d transition-transform duration-300 ease-out"
             style={{ transform: `rotateX(${view.y * -20}deg) rotateY(${view.x * 20}deg)` }}
           >
              {[
                { color: 'bg-cyan-500/5', icon: Database, z: -100, label: 'DATA_BASE', mass: 0.03 },
                { color: 'bg-indigo-500/5', icon: Disc, z: -40, label: 'LOGIC_CORE', mass: 0.08 },
                { color: 'bg-white/10', icon: Box, z: 20, label: 'INTERFACE_SURFACE', mass: 0.15 },
                { color: 'bg-white/20', icon: Move3d, z: 80, label: 'INTERACTION_HUD', mass: 0.25 }
              ].map((layer, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 border border-white/10 rounded-[32px] backdrop-blur-md flex flex-col items-center justify-center transition-all duration-500 ${layer.color}`}
                  style={{ 
                    transform: `translateZ(${layer.z * depth}px) translate(${view.x * layer.z * layer.mass}px, ${view.y * layer.z * layer.mass}px)`,
                    boxShadow: idx === 3 ? '0 20px 60px -10px rgba(0,0,0,0.15)' : 'none'
                  }}
                >
                   <layer.icon className={`w-8 h-8 mb-4 ${idx === 3 ? 'text-cyan-500' : 'text-zinc-500 opacity-40'}`} />
                   <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{layer.label}</span>
                </div>
              ))}
           </div>

           {/* Perspective HUD Elements */}
           <div className="absolute top-8 left-8 space-y-1 transition-transform duration-200"
                style={{ transform: `translate(${view.x * 60}px, ${view.y * 60}px)` }}>
              <div className="text-[10px] font-tech text-cyan-500">CAM_COORD_XYZ: [{(view.x*5).toFixed(1)}, {(view.y*5).toFixed(1)}, {(depth*10).toFixed(1)}]</div>
           </div>
        </div>
      </div>
    </section>
  );
};
