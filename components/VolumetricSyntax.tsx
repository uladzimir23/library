import React, { useState, useContext, useRef } from 'react';
import { Type, Move3d, Maximize, Sliders, Zap, Globe, Sparkles } from 'lucide-react';
import { LanguageContext } from '../App';

export const VolumetricSyntax: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [weight, setWeight] = useState(600);
  const [depth, setDepth] = useState(20);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="typography">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Semantic_Weights
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Volumetric <br /><span className="text-emerald-500">Syntax.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Typography as structural matter. We use variable font technology to adjust the physical "weight" of information, making the text respond to viewport depth and user engagement.
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 space-y-8">
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                   <span className="flex items-center gap-2"><Maximize className="w-3 h-3" /> Extrusion_Depth</span>
                   <span className="font-mono text-emerald-500">{depth}px</span>
                </div>
                <input 
                  type="range" min="0" max="60" step="1" value={depth}
                  onChange={e => setDepth(parseInt(e.target.value))}
                  className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
             </div>

             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                   <span className="flex items-center gap-2"><Sliders className="w-3 h-3" /> Variable_Weight</span>
                   <span className="font-mono text-emerald-500">{weight}</span>
                </div>
                <input 
                  type="range" min="100" max="900" step="10" value={weight}
                  onChange={e => setWeight(parseInt(e.target.value))}
                  className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({x:0, y:0})}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl group"
        >
           {/* Displacement Background */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#10b981_1px,transparent_1px)] bg-[length:30px_30px]" />

           {/* The Volumetric Text */}
           <div 
             className="relative transition-all duration-300 ease-out preserve-3d"
             style={{ 
               transform: `rotateX(${mousePos.y * -20}deg) rotateY(${mousePos.x * 20}deg)`,
               textShadow: Array.from({length: depth}).map((_, i) => (
                 `${mousePos.x * -i}px ${mousePos.y * -i}px 0 rgba(16, 185, 129, ${0.4 - i/depth})`
               )).join(', ')
             }}
           >
              <h3 
                className="text-[120px] font-tech font-black text-white leading-none tracking-tighter uppercase select-none"
                style={{ fontWeight: weight }}
              >
                SPATIAL
              </h3>
              
              {/* Internal Polish Glow */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-none">
                 <div className="w-full h-full bg-gradient-to-tr from-emerald-500/20 via-transparent to-white/10" />
              </div>
           </div>

           {/* Floating Markers */}
           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Neural_Font_Renderer: ACTIVE</span>
           </div>
           
           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Matrix_Translation</div>
              <div className="text-xs font-bold text-emerald-500 font-mono">X: {mousePos.x.toFixed(2)} Y: {mousePos.y.toFixed(2)}</div>
           </div>
        </div>
      </div>
    </section>
  );
};
