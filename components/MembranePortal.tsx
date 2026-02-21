import React, { useState, useContext, useRef } from 'react';
import { Target, Zap, Activity, Eye, Move3d, Compass } from 'lucide-react';
import { LanguageContext } from '../App';

export const MembranePortal: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#050505]" id="membrane-portal">
      <svg className="absolute w-0 h-0">
        <filter id="portal-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="goo" />
        </filter>
      </svg>

      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Organic_Structure_v7
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Membrane <br /><span className="text-indigo-500">Portal.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6 italic">
              "Depth is an organic property." This portal uses high-viscosity displacement to carve a 3D volume within the flat interface, reacting to focus with fluid deformation.
            </p>
          </div>

          <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border border-black/5 dark:border-white/5 flex items-center justify-between group">
             <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isHovered ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-zinc-800 text-zinc-400'}`}>
                   <Compass className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Aperture_State</div>
                   <div className="text-lg font-tech font-bold text-zinc-900 dark:text-white uppercase">{isHovered ? 'Dilated' : 'Constricted'}</div>
                </div>
             </div>
             <Activity className="w-5 h-5 text-indigo-500 animate-pulse" />
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePos({ x: 0.5, y: 0.5 });
          }}
          className="flex-[1.5] w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center shadow-2xl cursor-none"
        >
           {/* Gooey Liquid Edges */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ filter: 'url(#portal-goo)' }}>
              <div 
                className="w-80 h-80 bg-zinc-900 border-4 border-indigo-500/20 rounded-full transition-all duration-700 ease-out"
                style={{ 
                  transform: `scale(${isHovered ? 1.2 : 1})`,
                  backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.05)' : 'rgba(15, 15, 15, 1)'
                }}
              />
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-64 h-64 bg-indigo-500/10 rounded-full animate-pulse"
                  style={{ 
                    transform: `translate(${(mousePos.x - 0.5) * (i+1) * 30}px, ${(mousePos.y - 0.5) * (i+1) * 30}px)`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
           </div>

           {/* Inner Deep Content (Parallax) */}
           <div 
             className="relative w-full h-full flex items-center justify-center pointer-events-none perspective-2000"
           >
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute transition-all duration-700 ease-out"
                  style={{ 
                    transform: `translate(${(mousePos.x - 0.5) * (i+1) * 100}px, ${(mousePos.y - 0.5) * (i+1) * 100}px) translateZ(${i * -150}px)`,
                    opacity: 1 - i * 0.3
                  }}
                >
                   <div className="w-48 h-48 border border-white/5 rounded-[48px] backdrop-blur-sm flex items-center justify-center">
                      <Zap className={`w-8 h-8 text-white/${20 - i * 5}`} />
                   </div>
                </div>
              ))}
           </div>

           <div className="absolute top-12 left-12 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] font-bold">Deep_Space_Sync: ACTIVE</span>
           </div>
        </div>
      </div>
    </section>
  );
};