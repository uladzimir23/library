
import React, { useState, useContext, useRef } from 'react';
import { LAYERS } from '../constants';
import { Eye, Layers, Settings, Info, Sliders, Maximize2, Activity, Gauge } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const AnatomyView: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [rotation, setRotation] = useState({ x: 55, z: -35 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [explodeScale, setExplodeScale] = useState(1.2);
  const [layerOpacity, setLayerOpacity] = useState(0.8);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: 55 + y * 20, z: -35 + x * 20 });
  };

  const layerStats = [
    { blur: '40px', ior: '1.4', opacity: '10%' },
    { blur: '0px', ior: '1.0', opacity: '100%' },
    { blur: '12px', ior: '1.1', opacity: '40%' },
    { blur: '20px', ior: '1.2', opacity: '20%' },
    { blur: '8px', ior: '1.0', opacity: '80%' },
    { blur: '60px', ior: '1.5', opacity: '50%' },
  ];

  const isAnyHovered = hoveredIdx !== null;

  return (
    <div className="relative rounded-[48px] border overflow-hidden glass-panel p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/5 bg-panel/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500/50" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-text-muted opacity-40">Anatomy_Scanner_Workbench_v6.1</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-text-muted uppercase tracking-widest">Stack_Status: DECONSTRUCTED</div>
            <div className="w-12 h-1 bg-indigo-500/20 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-[800px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-black/5 dark:border-white/5 p-8 flex flex-col gap-10 bg-panel/30 overflow-y-auto custom-scroll">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-indigo-500">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-main">Пространственный_Сдвиг</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-text-muted">
                     <span>Масштаб_Взрыва</span>
                     <span className="text-indigo-500">x{explodeScale.toFixed(2)}</span>
                  </div>
                  <input type="range" min="0.5" max="3" step="0.1" value={explodeScale} onChange={e => setExplodeScale(parseFloat(e.target.value))} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500 text-indigo-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-text-muted">
                     <span>Прозрачность_Слоев</span>
                     <span className="text-indigo-500">{(layerOpacity * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.05" value={layerOpacity} onChange={e => setLayerOpacity(parseFloat(e.target.value))} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500 text-indigo-500" />
               </div>
            </div>

            <div className="space-y-4">
               <div className="text-[10px] font-bold uppercase text-text-muted tracking-widest mb-4">Слои_Материи</div>
               {LAYERS.map((layer, idx) => (
                 <div 
                   key={layer.id} 
                   onMouseEnter={() => setHoveredIdx(idx)}
                   onMouseLeave={() => setHoveredIdx(null)}
                   className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 cursor-pointer ${hoveredIdx === idx ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-white/5 border-transparent text-text-muted hover:bg-panel'}`}
                 >
                    <span className="text-[10px] font-bold uppercase truncate max-w-[120px]">{layer.label}</span>
                    <div className="text-[8px] font-mono opacity-50">L_0{idx}</div>
                 </div>
               ))}
            </div>

            <div className="mt-auto p-6 bg-panel rounded-[32px] border border-black/5 dark:border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-indigo-500">
                  <Gauge className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">Z-Axis_Depth</span>
               </div>
               <div className="text-2xl font-tech font-bold text-text-main uppercase">{(explodeScale * 240).toFixed(0)}px</div>
            </div>
         </div>

         {/* VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="flex-1 bg-surface relative overflow-hidden flex items-center justify-center p-12 group shadow-inner cursor-none"
         >
            {/* Background Lines */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div 
              className="relative w-full max-w-[380px] h-[260px] preserve-3d transition-transform duration-700 ease-out"
              style={{ transform: `rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg)` }}
            >
              {LAYERS.map((layer, index) => {
                const isActive = hoveredIdx === index;
                const zGap = isActive ? 140 : index * 40 * explodeScale;

                return (
                  <div
                    key={layer.id}
                    onMouseEnter={() => setHoveredIdx(index)}
                    className="absolute inset-0 rounded-[48px] border flex flex-col items-center justify-center transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) shadow-2xl"
                    style={{
                      backgroundColor: isActive ? 'rgba(99, 102, 241, 0.25)' : isAnyHovered ? 'rgba(128,128,128,0.05)' : layer.color,
                      backdropFilter: layer.id === 'surface' || isActive ? 'blur(40px)' : 'none',
                      transform: `translateZ(${zGap}px) scale(${isActive ? 1.05 : 1})`,
                      opacity: isAnyHovered && !isActive ? 0.15 : layerOpacity,
                      zIndex: isActive ? 100 : index,
                      borderColor: isActive ? 'rgba(99, 102, 241, 0.8)' : 'rgba(128,128,128,0.1)'
                    }}
                  >
                    <div className={`text-[10px] font-mono text-text-main opacity-40 absolute top-8 left-10 uppercase tracking-[0.3em] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                      L_{index} // {layer.id}
                    </div>
                    
                    <div className={`flex flex-col items-center gap-6 transition-all duration-700 ${isActive ? 'scale-110 opacity-100' : 'opacity-10'}`}>
                       <Settings className={`w-12 h-12 ${isActive ? 'text-indigo-500 dark:text-indigo-400 animate-spin-slow' : 'text-text-main'}`} />
                       {isActive && (
                         <div className="text-center space-y-2">
                           <div className="text-xl font-tech font-bold text-text-main uppercase tracking-widest">Diagnostic_On</div>
                           <div className="flex gap-4 justify-center">
                              <span className="text-[9px] font-mono text-indigo-500">BLUR: {layerStats[index].blur}</span>
                              <span className="text-[9px] font-mono text-indigo-500">IOR: {layerStats[index].ior}</span>
                           </div>
                         </div>
                       )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CURSOR HUD */}
            <div 
              className="absolute pointer-events-none transition-opacity duration-300"
              style={{ left: 0, top: 0, transform: `translate(${rotation.z * 10 + 500}px, ${rotation.x * 10}px)`, opacity: isAnyHovered ? 1 : 0 }}
            >
               <div className="w-16 h-16 border border-indigo-500/40 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-text-main rounded-full animate-ping" />
                  <Maximize2 className="w-4 h-4 text-indigo-500 absolute opacity-40 animate-pulse" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
