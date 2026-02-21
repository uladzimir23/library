
import React, { useState, useContext, useRef } from 'react';
import { Target, Boxes, ThermometerSun, Maximize2, Move3d, Zap, Atom, Sliders } from 'lucide-react';
import { LanguageContext } from '../App';

export const VolumetricMatterKiln: React.FC = () => {
  const { isDiagnostic } = useContext(LanguageContext);
  const [pressure, setPressure] = useState(0.5);
  const [rotation, setRotation] = useState({ x: 15, y: -15 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -60;
      setRotation({ x: y, y: x });
    }
  };

  return (
    <div className="scroll-mt-32" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="mb-20 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6 flex-1">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-bold uppercase tracking-[0.5em]">
            Matter_Manipulation_v1
          </span>
          <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
            Печь <br /><span className="text-amber-500">Материи.</span>
          </h2>
          <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md italic">
            "Материя — это программный код." Настройте фазовое состояние цифровых атомов, управляя гравитационным давлением и температурным дрейфом.
          </p>
        </div>

        {/* 3D Controls Panel */}
        <div className="w-full md:w-96 bg-zinc-900 border border-white/10 p-10 rounded-[48px] shadow-2xl space-y-12">
           <div className="flex items-center gap-4 text-amber-500">
              <Sliders className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Phase_Parameters</span>
           </div>

           <div className="space-y-10">
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <span>Pressure_Level</span>
                    <span className="text-amber-500">{(pressure * 100).toFixed(0)}%</span>
                 </div>
                 <input 
                   type="range" min="0" max="1" step="0.01" value={pressure}
                   onChange={e => setPressure(parseFloat(e.target.value))}
                   className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-amber-500"
                 />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-white/5 rounded-[32px] border border-white/5 flex flex-col gap-2 transition-all hover:bg-white/10 cursor-pointer">
                    <ThermometerSun className="w-4 h-4 text-amber-600" />
                    <div className="text-[7px] text-zinc-600 uppercase font-black">Heat_Index</div>
                    <div className="text-xl font-tech font-bold text-white">42.2_K</div>
                 </div>
                 <div className="p-6 bg-white/5 rounded-[32px] border border-white/5 flex flex-col gap-2 transition-all hover:bg-white/10 cursor-pointer">
                    <Atom className="w-4 h-4 text-sky-500" />
                    <div className="text-[7px] text-zinc-600 uppercase font-black">Bond_Sync</div>
                    <div className="text-xl font-tech font-bold text-white">0.99_A</div>
                 </div>
              </div>
           </div>
           
           <button className="w-full py-5 bg-amber-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-600/20 active:scale-95 transition-all">
              Initialize_Synthesis
           </button>
        </div>
      </div>

      {/* Main 3D Viewport */}
      <div className="relative h-[750px] bg-[#050402] rounded-[100px] border border-white/5 overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl group/viewport">
         {/* Dynamic Conic Light Rays */}
         <div 
           className="absolute inset-0 opacity-10 transition-transform duration-500"
           style={{ transform: `rotate(${rotation.y}deg) scale(${1 + pressure * 0.5})`, background: 'conic-gradient(from 0deg, transparent, #f59e0b, transparent, #f59e0b, transparent)' }}
         />
         
         <div 
           className="relative w-96 h-96 transition-all duration-300 ease-out preserve-3d"
           style={{ 
             transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
           }}
         >
            {/* The Layered Core */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute inset-0 border-2 rounded-[64px] transition-all duration-700 ease-out flex items-center justify-center overflow-hidden"
                style={{ 
                  transform: `translateZ(${(i - 2.5) * (pressure * 120)}px) scale(${1 - i * 0.05})`,
                  borderColor: `rgba(245, 158, 11, ${0.1 + (6-i) * 0.1})`,
                  backgroundColor: `rgba(245, 158, 11, ${0.02 + (6-i) * 0.01})`,
                  backdropFilter: `blur(${i * (pressure * 10)}px)`,
                }}
              >
                 {i === 2 && (
                   <div className="relative">
                      <div className="w-32 h-32 bg-amber-500 rounded-full blur-[60px] opacity-20 animate-pulse" />
                      <Boxes className="w-16 h-16 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                   </div>
                 )}
                 {isDiagnostic && (
                   <div className="absolute top-6 left-8 text-[7px] font-mono text-amber-500/40 uppercase tracking-widest">Slice_Buffer_0{i}</div>
                 )}
              </div>
            ))}
         </div>

         {/* Floating Metric HUDs */}
         <div className="absolute bottom-12 left-12 flex flex-col gap-4 z-20">
            <div className="flex items-center gap-4 bg-zinc-900/90 border border-white/10 px-8 py-3 rounded-full backdrop-blur-3xl shadow-2xl">
               <Zap className="w-4 h-4 text-amber-500" />
               <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-black">Energy_Lvl: { (pressure * 842).toFixed(1) }_J</span>
            </div>
         </div>

         <div className="absolute top-12 right-12 text-right opacity-40">
            <div className="text-[8px] font-mono text-amber-500 uppercase tracking-widest font-black mb-1">Volumetric_Map_Active</div>
            <div className="text-[6px] font-mono text-zinc-600 uppercase">Sector: 0x88.V2</div>
         </div>
      </div>
    </div>
  );
};
