
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Waves, Activity, Zap, RefreshCw, BarChart3, Disc, Sliders, Maximize, Gauge } from 'lucide-react';
import { LanguageContext } from '../App';

export const SpectralAnalyzer: React.FC = () => {
  const { t, isDiagnostic } = useContext(LanguageContext);
  const [data, setData] = useState(Array.from({ length: 16 }).map(() => Math.random() * 100));
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map((v, i) => {
        if (hoveredIdx === i) return v; // Замораживаем наведенный столбец
        return Math.max(10, Math.min(100, v + (Math.random() - 0.5) * 15));
      }));
    }, 100);
    return () => clearInterval(interval);
  }, [hoveredIdx]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: x * 30, y: y * -30 });
    }
  };

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="mb-20 text-right">
         <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Inst_v16.5.Analyzer
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Спектральный <br /><span className="text-rose-500">Анализатор.</span>
         </h2>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-12 items-stretch">
         {/* 1. MAIN CHART (VISUAL) */}
         <div className="flex-[1.5] bg-[#08080a] rounded-[80px] border border-white/5 relative overflow-hidden min-h-[600px] flex items-center justify-center shadow-2xl group perspective-2000">
            {/* Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.05)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_100%)] z-10" />
            
            {/* The 3D Histogram with Rotation */}
            <div 
              className="relative w-full max-w-4xl h-96 flex items-end justify-center gap-3 px-16 preserve-3d transition-transform duration-300 ease-out"
              style={{ transform: `rotateX(${20 + tilt.y}deg) rotateY(${tilt.x}deg)` }}
            >
               {data.map((v, i) => {
                 const isHovered = hoveredIdx === i;
                 const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - i) === 1;
                 
                 return (
                   <div 
                     key={i}
                     onMouseEnter={() => setHoveredIdx(i)}
                     onMouseLeave={() => setHoveredIdx(null)}
                     className="flex-1 relative transition-all duration-300 cursor-pointer group/bar"
                     style={{ 
                       height: `${isHovered ? 100 : isNeighbor ? v * 0.8 : v}%`,
                       backgroundColor: isHovered ? '#f43f5e' : `rgba(244, 63, 94, ${0.1 + v / 250})`,
                       borderTop: isHovered ? '3px solid #fff' : '1px solid rgba(244, 63, 94, 0.4)',
                       transform: `translateZ(${i * 12}px) ${isHovered ? 'scaleX(1.2) translateZ(40px)' : ''}`,
                       boxShadow: isHovered ? '0 0 50px rgba(244, 63, 94, 0.4)' : 'none'
                     }}
                   >
                      {/* Technical Value on Hover */}
                      {isHovered && isDiagnostic && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-rose-950 px-2 py-1 rounded font-mono text-[8px] font-black shadow-xl z-50 whitespace-nowrap animate-in zoom-in-50 duration-300">
                          MAG: {v.toFixed(2)} dB
                        </div>
                      )}

                      {/* Glowing Top */}
                      <div className={`absolute top-0 inset-x-0 h-1 transition-all ${isHovered ? 'bg-white' : 'bg-rose-500'} blur-sm opacity-60`} />
                      
                      {/* Bar Face Light */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 transition-opacity ${isHovered ? 'opacity-40' : ''}`} />
                   </div>
                 );
               })}
            </div>

            {/* HUD Status Markers */}
            <div className="absolute top-12 left-12 flex flex-col gap-4">
               <div className="flex items-center gap-3 px-6 py-2 bg-zinc-900 border border-white/10 rounded-full shadow-2xl">
                  <Activity className="w-4 h-4 text-rose-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest font-mono">Realtime_FFT_Link: 0x16.5</span>
               </div>
            </div>
            
            {/* Coordinate HUD */}
            <div className="absolute top-12 right-12 text-right opacity-40">
               <div className="text-[7px] font-mono text-zinc-500 uppercase">Projection_Tilt</div>
               <div className="text-[10px] font-mono text-white">X:{tilt.x.toFixed(1)} Y:{tilt.y.toFixed(1)}</div>
            </div>
         </div>

         {/* 2. SIDEBAR CONFIG */}
         <div className="flex-1 flex flex-col gap-6">
            <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex-1 flex flex-col justify-between shadow-xl group/side">
               <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-rose-400 group-hover/side:rotate-12 transition-transform" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest">Spectral_Controls</span>
               </div>
               
               <div className="space-y-4 my-8">
                  {[
                    { label: 'Harmonic_Resonance', icon: Gauge, val: '0.84' },
                    { label: 'Spectral_Gain', icon: Maximize, val: '1.24' },
                    { label: 'Decay_Rate', icon: Sliders, val: '42.0' }
                  ].map((l, i) => (
                    <div key={i} className="p-5 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 hover:translate-x-1 transition-all cursor-pointer group/item">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest group-hover/item:text-rose-400 transition-colors">{l.label}</span>
                          <l.icon className="w-3 h-3 text-zinc-700" />
                       </div>
                       <div className="text-xl font-tech font-bold text-white uppercase">{l.val} <span className="text-[10px] opacity-30">UNIT</span></div>
                    </div>
                  ))}
               </div>

               <button 
                 onClick={() => setData(prev => prev.map(() => Math.random() * 100))}
                 className="w-full py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-[28px] font-bold uppercase text-[10px] tracking-widest border-2 border-rose-400/20 hover:border-white/20 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
               >
                  <RefreshCw className="w-4 h-4" /> Reset_Analyzer_State
               </button>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[48px] p-8 h-40 flex items-center justify-between group overflow-hidden relative shadow-2xl">
               <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative z-10">
                  <div className="text-[8px] font-mono text-rose-400 uppercase tracking-widest font-black mb-1">Optical_Serial</div>
                  <div className="text-2xl font-tech font-bold text-white uppercase tracking-tighter">LENS_0xV16_STABLE</div>
               </div>
               <Disc className="w-12 h-12 text-rose-500 animate-spin-slow opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
         </div>
      </div>
    </div>
  );
};
