import React, { useState, useContext } from 'react';
import { Scan, Search, Info, Target, Cpu, Activity, Move } from 'lucide-react';
import { LanguageContext } from '../App';

export const MetadataScanner: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isScanning, setIsScanning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="metadata-scanner">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.nav.blueprint}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              Metadata <span className="text-emerald-500">Scanner.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              Every digital object has a Z-axis fingerprint. Hover to reveal the architectural tokens and real-time operational metrics hidden within the material.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col gap-6">
             <div className="flex justify-between items-center text-emerald-500">
                <div className="flex items-center gap-3">
                   <Scan className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Active_Scan_Buffer</span>
                </div>
                <Activity className="w-5 h-5 animate-pulse" />
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-[8px] font-mono text-zinc-500 uppercase">
                   <span>Scan_Progress</span>
                   <span>{isScanning ? '98.2%' : '0%'}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className={`h-full bg-emerald-500 transition-all duration-1000 ${isScanning ? 'w-[98%]' : 'w-0'}`} />
                </div>
             </div>
          </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsScanning(true)}
          onMouseLeave={() => setIsScanning(false)}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group cursor-none"
        >
           {/* The Scanned Object */}
           <div 
             className="relative w-80 h-96 bg-white/5 border border-white/10 rounded-[56px] backdrop-blur-3xl shadow-2xl flex flex-col items-center justify-center p-12 transition-all duration-500"
             style={{ 
               transform: isScanning ? 'scale(0.95) rotateX(10deg)' : 'scale(1)',
               filter: isScanning ? 'grayscale(0.5)' : 'none'
             }}
           >
              <Cpu className="w-20 h-20 text-white/10 mb-8" />
              <div className="h-2 w-32 bg-white/5 rounded-full mb-3" />
              <div className="h-1.5 w-24 bg-white/5 rounded-full" />
           </div>

           {/* Metadata Overlay (Z-Index + Parallax) */}
           <div 
             className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isScanning ? 'opacity-100' : 'opacity-0'}`}
             style={{ 
               transform: `translate(${(mousePos.x - 0.5) * 60}px, ${(mousePos.y - 0.5) * 60}px)` 
             }}
           >
              {/* Floating Token A */}
              <div className="absolute top-[20%] left-[15%] p-4 bg-emerald-500/90 backdrop-blur-md rounded-2xl text-white shadow-xl">
                 <div className="text-[8px] font-bold uppercase mb-1">token: blur</div>
                 <div className="text-xl font-tech font-bold">48px</div>
              </div>

              {/* Floating Token B */}
              <div className="absolute bottom-[20%] right-[15%] p-4 bg-indigo-600/90 backdrop-blur-md rounded-2xl text-white shadow-xl">
                 <div className="text-[8px] font-bold uppercase mb-1">prop: z-index</div>
                 <div className="text-xl font-tech font-bold">0xFF.A</div>
              </div>

              {/* Laser Tracking HUD */}
              <div className="absolute inset-0 border-[1px] border-emerald-500/20 rounded-[inherit] m-24">
                 <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-500" />
                 <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-500" />
              </div>
           </div>

           {/* Custom Scanner Cursor */}
           <div 
             className="absolute w-12 h-12 border-2 border-emerald-500 rounded-full flex items-center justify-center transition-transform duration-75"
             style={{ left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: 'translate(-50%, -50%)' }}
           >
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <Target className="w-6 h-6 text-emerald-500/40 absolute" />
           </div>
        </div>
      </div>
    </section>
  );
};
