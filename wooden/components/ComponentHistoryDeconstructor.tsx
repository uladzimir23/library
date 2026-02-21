
import React, { useState, useContext, useRef, useEffect } from 'react';
import { History, Clock, Database, Activity, ShieldCheck, Sliders, Maximize2, Gauge, RefreshCw, ChevronRight, Zap } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from './AudioService';

export const ComponentHistoryDeconstructor: React.FC<{ theme: string }> = ({ theme }) => {
  const { t } = useContext(LanguageContext);
  const isDark = theme === 'dark';
  
  // Состояния для вращения и смещения
  const [rotation, setRotation] = useState({ x: 55, z: -35 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [explodeScale, setExplodeScale] = useState(1.4);
  const containerRef = useRef<HTMLDivElement>(null);

  const versions = [
    { v: 'v19.4.1', date: '20.05.2025', status: 'HEAD', hash: '0x88F2A', stability: 99.8, load: '142MB' },
    { v: 'v19.4.0', date: '18.05.2025', status: 'STABLE', hash: '0x77E1B', stability: 99.2, load: '138MB' },
    { v: 'v19.3.5', date: '15.05.2025', status: 'DEPRECATED', hash: '0x66D0C', stability: 84.1, load: '156MB' },
    { v: 'v19.0.0', date: '01.05.2025', status: 'ARCHIVE', hash: '0x55C9D', stability: 97.5, load: '120MB' },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Координаты относительно центра
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const offX = e.clientX - rect.left - centerX;
    const offY = e.clientY - rect.top - centerY;

    setMouseOffset({ x: offX, y: offY });
    
    // Вращение как в AnatomyView
    setRotation({ 
      x: 55 + (offY / rect.height) * 30, 
      z: -35 + (offX / rect.width) * 30 
    });
  };

  const isAnyHovered = hoveredIdx !== null;

  return (
    <div className="scroll-mt-32 space-y-16 animate-in fade-in duration-1000">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
        <div className="space-y-6">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em]">
              <History className="w-3 h-3" /> TEMPORAL_MATTER_SCANNER
           </div>
           <h2 className="text-[80px] md:text-[100px] font-tech font-bold text-zinc-900 dark:text-white uppercase leading-[0.8] tracking-tighter">
              Деконструкция <br /><span className="text-indigo-500">Истории.</span>
           </h2>
           <p className="text-xl font-light text-zinc-500 max-w-xl">
             Протокол временного анализа. Каждая сборка MatterForge сохраняется как пространственный слой. Раздвиньте историю, чтобы исследовать эволюцию архитектуры.
           </p>
        </div>

        <div className={`p-10 rounded-[48px] border w-full lg:w-72 flex flex-col gap-4 shadow-2xl ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-white border-black/5'}`}>
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Снапшоты</span>
              <Database className="w-4 h-4 text-indigo-500" />
           </div>
           <div className="text-5xl font-tech font-black text-zinc-900 dark:text-white tracking-tighter">
             0{versions.length}
           </div>
           <div className="text-[10px] font-mono text-emerald-500 uppercase">Archive_Integrity: 100%</div>
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[800px] p-1 rounded-[80px] border transition-all duration-1000
        ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-zinc-100 border-black/5 shadow-inner'}
      `}>
         
         {/* SIDEBAR SETTINGS */}
         <div className={`lg:col-span-3 p-10 border-r flex flex-col gap-10 ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-black/5'}`}>
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-indigo-500">
                  <Sliders className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Temporal_Lens</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
                     <span>Z-Gap (Explosion)</span>
                     <span className="text-indigo-500">x{explodeScale.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="3" step="0.1" value={explodeScale}
                    onChange={e => setExplodeScale(parseFloat(e.target.value))}
                    className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
               </div>

               <div className="space-y-4">
                  <div className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest mb-4">Временные_Слои</div>
                  {versions.map((v, idx) => (
                    <button 
                      key={idx} 
                      onMouseEnter={() => { setHoveredIdx(idx); playUISound('hover'); }}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300
                        ${hoveredIdx === idx ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}
                      `}
                    >
                       <div className="flex flex-col items-start">
                          <span className="text-xs font-black uppercase tracking-widest">{v.v}</span>
                          <span className="text-[8px] font-mono opacity-50 uppercase">{v.date}</span>
                       </div>
                       <ChevronRight className={`w-4 h-4 ${hoveredIdx === idx ? 'opacity-100 translate-x-1' : 'opacity-0'} transition-all`} />
                    </button>
                  ))}
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-indigo-500">
                  <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">History_Sync</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase tracking-tighter">Verified</div>
            </div>
         </div>

         {/* VIEWPORT AREA */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="lg:col-span-9 bg-[#050508] relative overflow-hidden flex items-center justify-center p-12 group shadow-inner cursor-none"
         >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            {/* THE EXPLODED VERSION STACK */}
            <div 
              className="relative w-full max-w-[420px] h-[300px] preserve-3d transition-transform duration-700 ease-out"
              style={{ transform: `rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg)` }}
            >
              {versions.map((v, index) => {
                const isActive = hoveredIdx === index;
                // Текущая версия (index 0) выше всех
                const reverseIdx = versions.length - 1 - index;
                const zGap = isActive ? 180 : reverseIdx * 50 * explodeScale;

                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredIdx(index)}
                    className="absolute inset-0 rounded-[56px] border border-white/20 flex flex-col items-center justify-center transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) shadow-2xl"
                    style={{
                      backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : isAnyHovered ? 'rgba(255,255,255,0.02)' : index === 0 ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(30px)',
                      transform: `translateZ(${zGap}px) scale(${isActive ? 1.05 : 1})`,
                      opacity: isAnyHovered && !isActive ? 0.2 : 1 - (index * 0.15),
                      zIndex: versions.length - index,
                      borderColor: isActive ? 'rgba(99, 102, 241, 0.8)' : 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <div className={`text-[10px] font-mono text-white/40 absolute top-10 left-12 uppercase tracking-[0.3em] transition-opacity duration-500 ${isActive || index === 0 ? 'opacity-100' : 'opacity-0'}`}>
                      Build_{v.hash} // {v.v}
                    </div>
                    
                    <div className={`flex flex-col items-center gap-6 transition-all duration-700 ${isActive ? 'scale-110 opacity-100' : 'opacity-20'}`}>
                       <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-indigo-600 text-white shadow-xl' : 'bg-zinc-800 text-zinc-500'}`}>
                          {index === 0 ? <Zap className="w-8 h-8" /> : <Activity className="w-8 h-8" />}
                       </div>
                       {isActive && (
                         <div className="text-center space-y-3">
                           <div className="text-2xl font-tech font-bold text-white uppercase tracking-widest">{v.status}</div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col">
                                 <span className="text-[7px] text-zinc-500 uppercase">Stability</span>
                                 <span className="text-[10px] font-mono text-emerald-400">{v.stability}%</span>
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-[7px] text-zinc-500 uppercase">VRAM_Load</span>
                                 <span className="text-[10px] font-mono text-indigo-400">{v.load}</span>
                              </div>
                           </div>
                         </div>
                       )}
                    </div>

                    {/* Edge Shimmer */}
                    <div className="absolute inset-0 border-t border-l border-white/10 rounded-[inherit] pointer-events-none" />
                  </div>
                );
              })}
            </div>

            {/* CURSOR CROSSHAIR HUD - Исправлено позиционирование */}
            <div 
              className="absolute pointer-events-none transition-opacity duration-300 z-[100]"
              style={{ 
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${mouseOffset.x}px), calc(-50% + ${mouseOffset.y}px))`, 
                opacity: 1 
              }}
            >
               <div className="relative flex items-center justify-center">
                  <div className="w-20 h-20 border border-indigo-500/40 rounded-full flex items-center justify-center backdrop-blur-md">
                     <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                     <Maximize2 className="w-5 h-5 text-indigo-500 absolute opacity-40 animate-pulse" />
                  </div>
                  {/* Метка координат */}
                  <div className="absolute top-1/2 left-full ml-4 whitespace-nowrap bg-zinc-900 border border-white/10 px-3 py-1 rounded-lg">
                    <span className="text-[7px] font-mono text-indigo-400 uppercase">SCAN: [{mouseOffset.x.toFixed(0)}, {mouseOffset.y.toFixed(0)}]</span>
                  </div>
               </div>
            </div>

            {/* SYSTEM STATUS OVERLAY */}
            <div className="absolute bottom-12 left-12 flex flex-col gap-2 z-[60]">
               <div className="flex items-center gap-3 px-6 py-2 bg-zinc-900 border border-white/10 rounded-full shadow-2xl">
                  <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-white uppercase tracking-widest font-black">History_Analysis: ACTIVE</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
