import React, { useState, useContext, useRef } from 'react';
import { Target, Waves, Zap, Maximize, MousePointer2, Shield } from 'lucide-react';
import { LanguageContext } from '../App';

export const MembraneTensionSurface: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="membrane-tension">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Surface_Deformation
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Membrane <br /><span className="text-rose-500">Tension.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are skins. We simulate a tensioned membrane where interaction creates focal points of geometric stress. The surface deforms locally, shifting depth and light to emphasize the point of contact.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[48px] border border-white/10 flex items-center justify-between shadow-2xl">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-3xl bg-rose-500 flex items-center justify-center text-white shadow-xl">
                   <Target className="w-8 h-8" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Contact_Force</div>
                   <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter">{isHovered ? '0.84N' : '0.00N'}</div>
                </div>
             </div>
             <Waves className={`w-8 h-8 text-rose-500 ${isHovered ? 'animate-pulse' : 'opacity-20'}`} />
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-none"
        >
           {/* Membrane Grid Visual */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <defs>
                 <radialGradient id="holeGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="transparent" />
                 </radialGradient>
              </defs>
              {Array.from({ length: 15 }).map((_, i) => (
                <circle 
                  key={i} 
                  cx={`${mousePos.x * 100}%`} 
                  cy={`${mousePos.y * 100}%`} 
                  r={i * 20 * (isHovered ? 1.5 : 1)} 
                  fill="none" 
                  stroke="#f43f5e" 
                  strokeWidth="0.5" 
                  className="transition-all duration-700 ease-out"
                  opacity={0.5 - i * 0.03}
                />
              ))}
           </svg>

           {/* The Warped Object */}
           <div 
             className="relative w-72 h-72 transition-all duration-300 ease-out flex items-center justify-center preserve-3d"
             style={{ 
               left: `${(mousePos.x - 0.5) * 400}px`,
               top: `${(mousePos.y - 0.5) * 400}px`,
             }}
           >
              <div 
                className={`absolute inset-0 bg-white/5 border border-white/20 rounded-[48px] backdrop-blur-3xl shadow-2xl transition-all duration-500 ${isHovered ? 'scale-110 shadow-rose-500/20 rotate-12' : 'scale-100 rotate-0'}`}
              >
                 <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-rose-500/5 opacity-40 rounded-[inherit]" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className={`w-12 h-12 transition-all duration-700 ${isHovered ? 'text-rose-500 scale-125' : 'text-zinc-700'}`} />
                 </div>
              </div>
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-rose-500 uppercase tracking-widest font-bold mb-1">Grid_Elasticity: ON</div>
              <div className="text-[8px] font-mono text-zinc-600 uppercase">Buffer_Coord: [{mousePos.x.toFixed(2)}, {mousePos.y.toFixed(2)}]</div>
           </div>
        </div>
      </div>
    </section>
  );
};