import React, { useState, useContext, useRef } from 'react';
import { Aperture, Sparkles, Zap, Activity, Sun, Shield } from 'lucide-react';
import { LanguageContext } from '../App';

export const EdgeRefractionPulse: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="edge-refraction">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Optic_Precision
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Edge <br /><span className="text-rose-500">Refraction_Pulse.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Details define quality. We simulate high-energy light diffraction at the material boundaries, creating organic spectral shifts that respond to user motion, making every edge feel sharp and physical.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
                <Sun className="w-5 h-5 text-rose-500 mb-3" />
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Ray_Divergence</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">0.124_NM</div>
             </div>
             <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
                <Activity className="w-5 h-5 text-indigo-500 mb-3" />
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Edge_Tension</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">NOMINAL</div>
             </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[550px] bg-zinc-100 dark:bg-zinc-950/40 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-inner cursor-crosshair"
        >
           {/* The Target Box */}
           <div className="relative w-80 h-96 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl rounded-[56px] border border-white/20 shadow-2xl flex items-center justify-center group-hover:scale-[0.98] transition-transform duration-700">
              {/* Dynamic Edge Light */}
              <div 
                className="absolute inset-0 rounded-[56px] border-2 border-transparent transition-all duration-300 pointer-events-none"
                style={{ 
                  background: `linear-gradient(${mousePos.x * 360}deg, transparent 40%, rgba(244, 63, 94, 0.4) 50%, transparent 60%) border-box`,
                  WebkitMask: `linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)`,
                  WebkitMaskComposite: 'destination-out',
                  maskComposite: 'exclude'
                }}
              />
              
              <div className="text-center relative z-10">
                 <Shield className="w-16 h-16 text-rose-500/20 mb-6 group-hover:scale-110 transition-transform duration-1000" />
                 <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Edge_Detect_v9</div>
                 <div className="text-2xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">Spatial_Border</div>
              </div>
           </div>

           {/* Floating HUD info */}
           <div className="absolute top-12 right-12 text-right">
              <div className="text-[9px] font-mono text-rose-500 uppercase tracking-widest font-bold mb-1">Photon_Leaking: ON</div>
              <div className="text-[8px] font-mono text-zinc-500 uppercase">Buffer_Coord: [{mousePos.x.toFixed(2)}, {mousePos.y.toFixed(2)}]</div>
           </div>
        </div>
      </div>
    </section>
  );
};
