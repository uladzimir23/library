import React, { useState, useContext, useRef, useEffect } from 'react';
import { Wind, Zap, Activity, RefreshCw, MousePointer2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const VortexFluidTrail: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [velocity, setVelocity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    const v = Math.sqrt(dx * dx + dy * dy);
    setVelocity(v);
    lastPos.current = { x: e.clientX, y: e.clientY };

    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  useEffect(() => {
    const decay = setInterval(() => {
      setVelocity(v => Math.max(0, v - 1));
    }, 50);
    return () => clearInterval(decay);
  }, []);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="vortex">
      <svg className="hidden">
        <filter id="vortex-fluid">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Fluid_Dynamics_v2
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Vortex <br /><span className="text-sky-500">Fluid_Trail.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Movement is viscous. We simulate the aerodynamic drag of UI components through a fluid displacement field, creating a sensory trail that visualizes the speed and direction of user intent.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col gap-6">
             <div className="flex justify-between items-center text-sky-500">
                <div className="flex items-center gap-3">
                   <Wind className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Turbulence_Index</span>
                </div>
                <Activity className={`w-5 h-5 ${velocity > 10 ? 'animate-pulse' : ''}`} />
             </div>
             <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter">{(velocity * 0.12).toFixed(2)}_DISP</div>
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl cursor-none"
        >
           {/* Trail Container */}
           <div className="absolute inset-0" style={{ filter: 'url(#vortex-fluid)' }}>
              {/* Core Node */}
              <div 
                className="absolute w-24 h-24 bg-sky-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-75 ease-out"
                style={{ 
                  left: `calc(${mousePos.x * 100}% - 48px)`, 
                  top: `calc(${mousePos.y * 100}% - 48px)`,
                  transform: `scale(${1 + velocity * 0.005}) rotate(${velocity}deg)`
                }}
              >
                 <Zap className="w-10 h-10 fill-current" />
              </div>
              
              {/* Simulated Fluid Particles */}
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-16 h-16 bg-sky-500/40 rounded-full transition-all duration-[400ms] ease-out"
                  style={{ 
                    left: `calc(${mousePos.x * 100}% - 32px)`, 
                    top: `calc(${mousePos.y * 100}% - 32px)`,
                    transitionDelay: `${i * 50}ms`,
                    transform: `scale(${1 - i * 0.1})`,
                    opacity: 0.5 - i * 0.05
                  }}
                />
              ))}
           </div>

           {/* Perspective Labels */}
           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Matter_State: VISCOUS</div>
              <div className="text-xl font-tech font-bold text-sky-400">0xVORTEX_DRAG</div>
           </div>
        </div>
      </div>
    </section>
  );
};
