
import React, { useState, useContext, useRef } from 'react';
// Added missing Box, Target, and Shield imports from lucide-react
import { LayoutGrid, Sliders, Zap, Activity, Maximize2, Move, Sparkles, Command, Box, Target, Shield } from 'lucide-react';
import { LanguageContext } from '../App';

export const MolecularFabricWorkbench: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [tension, setTension] = useState(0.5);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  const tiles = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    icon: [LayoutGrid, Zap, Sparkles, Command, Sliders, Box, Activity, Target, Shield][i % 9]
  }));

  return (
    <div className="scroll-mt-24" onMouseMove={handleMouseMove}>
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-80 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
              02_Fabric_Workbench_v4
            </span>
            <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
              Ткань <br /><span className="text-amber-500">Материи.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Весь интерфейс — это натянутая мембрана. Изменение «Системного Натяжения» влияет на то, как плитки реагируют на гравитацию вашего курсора и передают импульс соседям.
            </p>
          </div>

          <div className="p-10 bg-zinc-900 rounded-[48px] border border-white/5 space-y-10 shadow-2xl">
             <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                   <span className="flex items-center gap-2"><Move className="w-3 h-3 text-amber-500" /> Tension_Sync</span>
                   <span className="font-mono text-amber-500">{(tension * 100).toFixed(0)}%</span>
                </div>
                <input 
                  type="range" min="0.1" max="1" step="0.01" value={tension}
                  onChange={e => setTension(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
             </div>
             
             <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <div className="flex items-center gap-4 text-emerald-500 mb-3">
                   <Activity className="w-4 h-4 animate-pulse" />
                   <span className="text-[9px] font-bold uppercase tracking-widest">Coherence_Locked</span>
                </div>
                <div className="text-2xl font-tech font-bold text-white uppercase tracking-tighter">0.998_SIGMA</div>
             </div>
          </div>
        </div>

        <div className="flex-1 w-full h-[700px] bg-zinc-950 rounded-[80px] relative overflow-hidden flex items-center justify-center p-12 group shadow-2xl border border-white/5 perspective-2000">
           {/* Background Mesh */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

           <div className="grid grid-cols-3 gap-6 w-full max-w-2xl relative z-10 preserve-3d">
              {tiles.map((tile, i) => {
                const isHovered = hoveredIdx === i;
                // Расчет влияния соседа (упрощенно)
                const neighborDist = hoveredIdx !== null ? Math.abs(hoveredIdx - i) : 99;
                const neighborPull = Math.max(0, 1 - neighborDist / 3);

                return (
                  <div 
                    key={i}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`aspect-square transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer rounded-[40px] border flex flex-col items-center justify-center relative group/tile overflow-hidden
                      ${isHovered ? 'z-50 bg-amber-500 border-white shadow-[0_40px_100px_-20px_rgba(245,158,11,0.5)]' : 'bg-white/5 border-white/5'}`}
                    style={{ 
                      transform: isHovered 
                        ? `translateZ(120px) scale(1.1)` 
                        : `translateZ(${-neighborPull * 40 * tension}px) translate(${(mousePos.x * 20) * tension}px, ${(mousePos.y * 20) * tension}px)`,
                      opacity: isHovered ? 1 : 0.4 + neighborPull * 0.4
                    }}
                  >
                     <tile.icon className={`w-10 h-10 transition-all duration-700 ${isHovered ? 'text-white rotate-12' : 'text-zinc-600'}`} />
                     
                     {isHovered && (
                       <div className="absolute top-6 left-6 text-[8px] font-mono text-white/40 uppercase tracking-widest animate-in fade-in duration-700">
                          Atom_0x0{i}
                       </div>
                     )}

                     <div className={`absolute bottom-6 h-1 w-8 bg-white/20 rounded-full transition-all duration-700 ${isHovered ? 'w-16 bg-white/60' : ''}`} />
                  </div>
                );
              })}
           </div>

           {/* Floating HUD info */}
           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold mb-1">Matrix_Fabric: ON</div>
              <div className="text-[8px] font-mono text-zinc-700 uppercase">Calibrating_Tension_Field...</div>
           </div>
        </div>
      </div>
    </div>
  );
};
