import React, { useState, useContext, useRef, useEffect } from 'react';
import { Zap, Wind, FastForward, Activity } from 'lucide-react';
import { LanguageContext } from '../App';

export const TachyonVelocity: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [velocity, setVelocity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    const v = Math.sqrt(dx * dx + dy * dy);
    setVelocity(v);
    lastPos.current = { x: e.clientX, y: e.clientY };
    
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ 
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  useEffect(() => {
    const decay = setInterval(() => {
      setVelocity(v => Math.max(0, v - 2));
    }, 50);
    return () => clearInterval(decay);
  }, []);

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="tachyon">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.tachyon.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.tachyon.title} <span className="text-sky-500">{t.tachyon.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              Experience motion as a material property. Our Tachyon engine simulates kinetic drag, shifting the material's saturation and blur based on interaction velocity.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-sky-500/10 rounded-3xl flex items-center justify-center text-sky-500 border border-sky-500/20">
                   <FastForward className="w-8 h-8" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Kinetic_Velocity</div>
                   <div className="text-3xl font-tech font-bold text-white uppercase">{velocity.toFixed(0)} PPS</div>
                </div>
             </div>
             <Activity className={`w-8 h-8 text-sky-500 ${velocity > 10 ? 'animate-pulse' : 'opacity-20'}`} />
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[550px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group cursor-none"
        >
           {/* Trail Background */}
           <div className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-500" style={{
             background: `radial-gradient(circle at ${50 + mousePos.x * 100}% ${50 + mousePos.y * 100}%, #0ea5e9 0%, transparent 60%)`,
             filter: `blur(${velocity * 0.5}px)`
           }} />

           {/* The Velocity Object */}
           <div 
             className="relative w-80 h-80 transition-all duration-100 ease-out border border-white/20 rounded-[48px] overflow-hidden flex flex-col items-center justify-center p-12"
             style={{ 
               backgroundColor: 'rgba(255, 255, 255, 0.05)',
               backdropFilter: `blur(${10 + velocity * 0.2}px)`,
               filter: `saturate(${1 + velocity * 0.02}) grayscale(${Math.max(0, 0.5 - velocity * 0.01)})`,
               transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px) scale(${1 - velocity * 0.001}) rotate(${mousePos.x * velocity * 0.1}deg)`,
               boxShadow: `0 ${20 + velocity}px ${40 + velocity}px rgba(14, 165, 233, ${0.1 + velocity * 0.005})`
             }}
           >
              <Zap className={`w-16 h-16 text-sky-500 mb-6 transition-all ${velocity > 50 ? 'scale-125' : 'scale-100'}`} />
              <div className="text-center">
                 <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-2">Matter_Drive</div>
                 <div className="text-2xl font-tech font-bold text-white uppercase tracking-widest">
                    {velocity > 40 ? 'Hyper_Flux' : 'Cruise'}
                 </div>
              </div>
           </div>

           {/* Custom Cursor */}
           <div 
             className="absolute w-6 h-6 border-2 border-sky-500 rounded-full transition-transform duration-75 pointer-events-none"
             style={{ left: `calc(50% + ${mousePos.x * 100}% - 12px)`, top: `calc(50% + ${mousePos.y * 100}% - 12px)` }}
           >
              <div className="absolute inset-0 bg-sky-500 rounded-full animate-ping opacity-30" />
           </div>
        </div>
      </div>
    </section>
  );
};
