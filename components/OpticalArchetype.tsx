import React, { useState, useContext, useRef, useEffect } from 'react';
import { Scan, Cpu, Layers, Disc, Zap, Activity, Info, Crosshair } from 'lucide-react';
import { LanguageContext } from '../App';

export const OpticalArchetype: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [scanPos, setScanPos] = useState(0); // 0 to 100
  const [isFocus, setIsFocus] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(prev => (prev >= 100 ? 0 : prev + 0.5));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section className="py-32 scroll-mt-24 border-b border-black/5 dark:border-white/5" id="archetype">
      <div className="text-center mb-24">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
          {t.archetype.tag}
        </span>
        <h2 className="text-4xl md:text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
          {t.archetype.title} <span className="text-indigo-500">{t.archetype.titleAccent}</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed max-w-3xl mx-auto mt-6">
          The ultimate diagnostic tool for spatial matter. Watch as the neural scanner deconstructs the chromatic and geometric properties of the glass archetype.
        </p>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsFocus(true)}
        onMouseLeave={() => setIsFocus(false)}
        className="relative w-full h-[700px] bg-zinc-950 rounded-[64px] border border-white/5 overflow-hidden flex items-center justify-center perspective-2000 group shadow-2xl"
      >
        {/* Background Grid - Dark & Tech */}
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        {/* THE MASTER ARCHETYPE */}
        <div 
          className="relative w-[500px] h-[300px] transition-all duration-700 ease-out preserve-3d"
          style={{ 
            transform: `rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg)`,
            filter: isFocus ? 'none' : 'grayscale(1) brightness(0.7)'
          }}
        >
          {/* Base Layer */}
          <div 
            className="absolute inset-0 bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] transition-all duration-500"
            style={{ borderRadius: isFocus ? '12px' : '64px' }}
          >
            {/* Scanned Area (Saturated) */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent transition-all duration-0 pointer-events-none"
              style={{ 
                clipPath: `inset(0 ${100 - scanPos - 10}% 0 ${scanPos}%)`,
                filter: 'saturate(3) brightness(1.2)'
              }}
            />
          </div>

          {/* Internal Hardware Simulation */}
          <div className="absolute inset-10 border border-white/5 rounded-xl opacity-20 flex items-center justify-center">
             <Cpu className="w-20 h-20 text-white" />
          </div>

          {/* Floating Diagnostic HUDs */}
          <div className={`absolute -top-12 -left-12 p-6 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-500 ${isFocus ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
             <div className="flex items-center gap-3 mb-4">
                <Activity className="w-4 h-4 text-indigo-500" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Chromatic_Scan</span>
             </div>
             <div className="space-y-2">
                <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-500" style={{ width: `${scanPos}%` }} />
                </div>
                <div className="text-[8px] font-mono text-zinc-500">VAL: 0x{Math.floor(scanPos * 2.5).toString(16).toUpperCase()}</div>
             </div>
          </div>

          <div className={`absolute -bottom-12 -right-12 p-6 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-500 ${isFocus ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
             <div className="flex items-center gap-3 mb-2">
                <Crosshair className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Geometry_Lock</span>
             </div>
             <div className="text-[20px] font-tech text-emerald-500 font-bold uppercase tracking-tighter">
                {isFocus ? 'Focused_12px' : 'Organic_64px'}
             </div>
          </div>
        </div>

        {/* SCANNER BAR */}
        <div 
          className="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-indigo-500 to-transparent shadow-[0_0_20px_#6366f1] z-50 transition-all duration-0 pointer-events-none"
          style={{ left: `${scanPos}%` }}
        >
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-500 rounded-full" />
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-500 rounded-full" />
        </div>

        {/* HUD Data Matrix overlay */}
        <div className="absolute top-12 left-12 text-[8px] font-mono text-indigo-500/40 space-y-1 pointer-events-none">
           <div>SYSTEM_BOOT_SEQUENCE: 0x8892</div>
           <div>REFRACTION_STABILITY: OK</div>
           <div>NEURAL_LINK_ESTABLISHED: TRUE</div>
           <div>GRAYSCALE_BYPASS: {isFocus ? 'ACTIVE' : 'IDLE'}</div>
        </div>
      </div>
    </section>
  );
};
