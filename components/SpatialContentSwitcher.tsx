
import React, { useState, useContext } from 'react';
import { Cpu, Activity, Zap, Layers, RefreshCw, Layout, Database, Radio } from 'lucide-react';
import { LanguageContext } from '../App';

type ContextType = 'HARDWARE' | 'LOGIC' | 'SIGNALS';

export const SpatialContentSwitcher: React.FC = () => {
  const { t, isDiagnostic } = useContext(LanguageContext);
  const [active, setActive] = useState<ContextType>('HARDWARE');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchContext = (ctx: ContextType) => {
    if (ctx === active) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(ctx);
      setIsTransitioning(false);
    }, 400);
  };

  const content = {
    HARDWARE: {
      title: 'Physical_Nodes',
      desc: 'Управление физическими кластерами рендеринга и VRAM буферами.',
      icon: Cpu,
      color: 'emerald',
      stats: ['CORE_01: NOMINAL', 'TEMP: 42°C', 'VOLT: 1.2V']
    },
    LOGIC: {
      title: 'Neural_Pathways',
      desc: 'Визуализация графа зависимостей и предиктивных моделей интерфейса.',
      icon: Activity,
      color: 'indigo',
      stats: ['WEIGHTS: CALIBRATED', 'NODES: 124', 'DROPOUT: 0.05']
    },
    SIGNALS: {
      title: 'Wavelength_Sync',
      desc: 'Мониторинг входящих спектральных сигналов и калибровка частот.',
      icon: Radio,
      color: 'rose',
      stats: ['FREQ: 44.1kHz', 'GAIN: +12dB', 'JITTER: <1ms']
    }
  };

  const CurrentIcon = content[active].icon;

  return (
    <div className="scroll-mt-24">
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Engine_v16.Switch
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Контекстный <br /><span className="text-emerald-500">Стек.</span>
         </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-stretch h-[600px]">
         {/* Sidebar Controls */}
         <div className="w-full lg:w-72 flex flex-col gap-4">
            {(['HARDWARE', 'LOGIC', 'SIGNALS'] as ContextType[]).map((ctx) => (
              <button 
                key={ctx}
                onClick={() => switchContext(ctx)}
                className={`p-6 rounded-[32px] border text-left transition-all duration-500 flex items-center justify-between group
                  ${active === ctx ? 'bg-white text-zinc-900 border-white shadow-2xl scale-105 z-10' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10 hover:translate-x-2'}
                `}
              >
                 <div className="space-y-1">
                    <div className="text-[8px] font-mono opacity-50 uppercase tracking-widest">Context_0{ctx[0]}</div>
                    <div className="text-xs font-bold uppercase tracking-widest">{ctx}</div>
                 </div>
                 {active === ctx && <div className="w-2 h-2 rounded-full bg-zinc-900 animate-pulse" />}
              </button>
            ))}
            
            <div className="mt-auto p-6 bg-zinc-900 border border-white/5 rounded-[40px] shadow-xl">
               <div className="flex items-center gap-3 mb-4">
                  <Database className="w-4 h-4 text-zinc-600" />
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Memory_Alloc</span>
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-3/4 animate-pulse" />
               </div>
            </div>
         </div>

         {/* Main Content Area with Depth Transition */}
         <div className="flex-1 relative perspective-2000 preserve-3d">
            <div 
              className={`absolute inset-0 bg-zinc-900 rounded-[64px] border border-white/10 p-16 flex flex-col justify-between shadow-2xl transition-all duration-700 ease-out
                ${isTransitioning ? 'translate-z-[-200px] opacity-0 blur-2xl scale-90' : 'translate-z-0 opacity-100 blur-0 scale-100'}
              `}
              style={{ backgroundColor: `rgba(15, 15, 20, 0.8)` }}
            >
               <div className="flex justify-between items-start">
                  <div className="space-y-6">
                     <div className={`w-20 h-20 rounded-[32px] bg-${content[active].color}-500/10 border border-${content[active].color}-500/30 flex items-center justify-center`}>
                        <CurrentIcon className={`w-10 h-10 text-${content[active].color}-500`} />
                     </div>
                     <div>
                        <h3 className="text-5xl font-tech font-bold text-white uppercase tracking-tighter mb-4">{content[active].title}</h3>
                        <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-lg">{content[active].desc}</p>
                     </div>
                  </div>
                  
                  {isDiagnostic && (
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3 min-w-[200px]">
                       <div className="text-[10px] font-mono text-emerald-500 flex items-center gap-2 mb-2 uppercase font-bold">
                          <Activity className="w-3 h-3" /> Live_Telemetry
                       </div>
                       {content[active].stats.map((s, i) => (
                         <div key={i} className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{s}</div>
                       ))}
                    </div>
                  )}
               </div>

               <div className="flex justify-between items-end">
                  <div className="flex gap-4">
                     <button className="px-8 py-4 bg-white text-zinc-900 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">Initialize</button>
                     <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Re-Sync</button>
                  </div>
                  <div className="text-right">
                     <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-1">Sector_Coordinate</div>
                     <div className="text-xl font-tech font-bold text-white uppercase tracking-widest">0x88.V2.Z</div>
                  </div>
               </div>

               {/* Background Decorative Mesh */}
               <div className="absolute inset-0 opacity-10 pointer-events-none transition-all duration-1000" 
                    style={{ 
                      backgroundImage: `radial-gradient(circle at 100% 100%, ${content[active].color}, transparent 40%)`,
                    }} />
            </div>
            
            {/* Transition Ghost Layer */}
            {isTransitioning && (
              <div className="absolute inset-0 bg-white/5 rounded-[64px] border border-white/20 animate-pulse blur-xl" />
            )}
         </div>
      </div>
    </div>
  );
};
