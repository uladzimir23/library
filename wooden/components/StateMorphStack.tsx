
import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
  Layers, Cpu, Zap, Activity, Shield, ShieldAlert, 
  Box, Share2, Move, Layout, Radio, Terminal, 
  Sliders, Target, Gauge, Aperture, CheckCircle2, 
  AlertTriangle, Palette, Fingerprint, RefreshCw,
  Anchor, MousePointer2
} from 'lucide-react';
import { playUISound } from './AudioService';
import { LanguageContext } from '../App';

type SystemState = 'STATIONARY' | 'ISOLATED' | 'IDLE' | 'FOCUS' | 'PROCESSING' | 'SUCCESS' | 'ERROR' | 'CHROMATIC' | 'SURGE';

export const StateMorphStack: React.FC<{ theme: string }> = ({ theme }) => {
  const { t } = useContext(LanguageContext);
  const isDark = theme === 'dark';
  const [systemState, setSystemState] = useState<SystemState>('IDLE');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [layers, setLayers] = useState([
    { x: 0, y: 0, z: -100, scale: 1, blur: 20, opacity: 0.1, label: 'Matter_L0', radius: 48 },
    { x: 0, y: 0, z: 0, scale: 1, blur: 10, opacity: 0.3, label: 'Logic_L1', radius: 48 },
    { x: 0, y: 0, z: 100, scale: 1, blur: 0, opacity: 0.8, label: 'UI_L2', radius: 48 }
  ]);

  const targetPos = useRef({ x: 0, y: 0 });
  const velocities = useRef([{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]);
  const [coherence, setCoherence] = useState(100);

  useEffect(() => {
    let frame: number;
    const update = () => {
      const configs: Record<SystemState, any> = {
        STATIONARY: { stiffness: 0.2, damping: 0.7, zGap: 10, jitter: 0 },
        ISOLATED: { stiffness: 0.25, damping: 0.82, zGap: 40, jitter: 0 },
        IDLE: { stiffness: 0.05, damping: 0.9, zGap: 40, jitter: 0 },
        FOCUS: { stiffness: 0.4, damping: 0.6, zGap: 20, jitter: 0 },
        PROCESSING: { stiffness: 0.1, damping: 0.8, zGap: 60, jitter: 0.5 },
        SUCCESS: { stiffness: 0.05, damping: 0.95, zGap: 80, jitter: 0 },
        ERROR: { stiffness: 0.8, damping: 0.3, zGap: 50, jitter: 12 },
        CHROMATIC: { stiffness: 0.15, damping: 0.85, zGap: 100, jitter: 0 },
        SURGE: { stiffness: 0.4, damping: 0.5, zGap: 140, jitter: 15 }
      };

      const cfg = configs[systemState];

      setLayers(prev => {
        const next = [...prev];
        let totalDeviation = 0;

        for (let i = 0; i < 3; i++) {
          // В STATIONARY цель всегда центр
          const currentTarget = systemState === 'STATIONARY' ? { x: 0, y: 0 } : targetPos.current;
          const localTarget = i === 2 ? currentTarget : next[i + 1];
          
          const dx = localTarget.x - next[i].x;
          const dy = localTarget.y - next[i].y;
          
          const jitterX = (systemState === 'SURGE' || systemState === 'ERROR') ? (Math.random() - 0.5) * cfg.jitter : 0;
          const jitterY = (systemState === 'SURGE' || systemState === 'ERROR') ? (Math.random() - 0.5) * cfg.jitter : 0;

          velocities.current[i].x = (velocities.current[i].x + dx * cfg.stiffness) * cfg.damping;
          velocities.current[i].y = (velocities.current[i].y + dy * cfg.stiffness) * cfg.damping;

          totalDeviation += Math.abs(velocities.current[i].x) + Math.abs(velocities.current[i].y);

          next[i] = {
            ...next[i],
            x: next[i].x + velocities.current[i].x + jitterX,
            y: next[i].y + velocities.current[i].y + jitterY,
            z: (i - 1) * cfg.zGap,
            scale: (systemState === 'FOCUS' || systemState === 'ISOLATED') && i === 2 ? 1.05 : 1 - (i * 0.05),
            opacity: i === 2 ? 0.9 : 0.2 + (i * 0.1)
          };
        }

        setCoherence(prev => {
           const targetCoherence = systemState === 'ERROR' ? 12 : systemState === 'SURGE' ? 45 : 100 - (totalDeviation * 0.5);
           return prev + (targetCoherence - prev) * 0.1;
        });
        return next;
      });
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [systemState]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offX = e.clientX - centerX;
    const offY = e.clientY - centerY;
    const rawDist = Math.sqrt(offX * offX + offY * offY);

    if (systemState === 'STATIONARY') {
      targetPos.current = { x: 0, y: 0 };
      return;
    }

    if (systemState === 'ISOLATED') {
      const activeRadius = 300; // Порог активации притяжения
      if (rawDist < activeRadius) {
        // Магнитная логика: чем ближе, тем сильнее тянет
        const pull = Math.max(0, 1 - rawDist / activeRadius);
        targetPos.current = { x: offX * pull * 0.8, y: offY * pull * 0.8 };
      } else {
        targetPos.current = { x: 0, y: 0 };
      }
      return;
    }

    // Обычная глобальная логика для остальных состояний
    const moveScale = systemState === 'IDLE' ? 0.1 : systemState === 'FOCUS' ? 1.2 : 0.8;
    targetPos.current = { x: offX * moveScale, y: offY * moveScale };
  };

  const toggleState = (s: SystemState) => {
    setSystemState(s);
    if (s === 'ERROR') playUISound('process');
    else if (s === 'STATIONARY') playUISound('click');
    else playUISound('click');
  };

  const getIcon = () => {
    switch(systemState) {
      case 'STATIONARY': return <Anchor className="w-8 h-8 text-zinc-400" />;
      case 'ISOLATED': return <Fingerprint className="w-8 h-8 text-emerald-400" />;
      case 'FOCUS': return <Aperture className="w-8 h-8 text-sky-400" />;
      case 'SUCCESS': return <CheckCircle2 className="w-8 h-8 text-emerald-500" />;
      case 'ERROR': return <AlertTriangle className="w-8 h-8 text-rose-500 animate-pulse" />;
      case 'CHROMATIC': return <Palette className="w-8 h-8 text-indigo-400" />;
      case 'PROCESSING': return <Activity className="w-8 h-8 text-indigo-400 animate-spin-slow" />;
      default: return <Zap className={`w-8 h-8 ${systemState === 'SURGE' ? 'text-rose-500 animate-bounce' : 'text-indigo-500'}`} />;
    }
  };

  return (
    <div className="scroll-mt-32 space-y-16 animate-in fade-in duration-1000">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
        <div className="space-y-6">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em]">
              <Cpu className="w-3 h-3" /> SYSTEM_BEHAVIOR_ORCHESTRATOR
           </div>
           <h2 className="text-[80px] md:text-[100px] font-tech font-bold text-zinc-900 dark:text-white uppercase leading-[0.8] tracking-tighter">
              Матрица <br /><span className="text-indigo-500">Состояний.</span>
           </h2>
           <p className="text-xl font-light text-zinc-500 max-xl">
             Калибровка отклика материи. Выберите режим, чтобы изменить физические константы, рефракцию и инерцию всего стека компонентов.
           </p>
        </div>

        {/* Coherence Gauge */}
        <div className={`p-10 rounded-[48px] border transition-all duration-700 w-full lg:w-72 flex flex-col gap-4 shadow-2xl
          ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-white border-black/5'}
          ${systemState === 'ERROR' ? 'border-rose-500/50' : ''}
        `}>
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Когезия</span>
              <Gauge className={`w-4 h-4 ${coherence < 50 ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`} />
           </div>
           <div className="text-5xl font-tech font-black text-zinc-900 dark:text-white tracking-tighter">
             {coherence.toFixed(1)}%
           </div>
           <div className="h-1 w-full bg-black/10 dark:bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-300 ${coherence < 50 ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${coherence}%` }} />
           </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:min-h-[750px] p-1 rounded-[80px] border transition-all duration-1000
        ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-zinc-100 border-black/5 shadow-inner'}
      `}>
         
         {/* SIDEBAR CONTROLS */}
         <div className={`lg:col-span-3 p-12 border-r flex flex-col gap-10 overflow-y-auto custom-scroll ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-black/5'}`}>
            <div className="space-y-6">
               <div className="flex items-center gap-3 text-indigo-500">
                  <Sliders className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Библиотека_Состояний</span>
               </div>

               <div className="grid grid-cols-1 gap-2">
                  {/* Новые состояния STATIONARY и ISOLATED на порядок выше */}
                  {(['STATIONARY', 'ISOLATED', 'IDLE', 'FOCUS', 'PROCESSING', 'SUCCESS', 'ERROR', 'CHROMATIC', 'SURGE'] as SystemState[]).map(s => (
                    <button 
                      key={s}
                      onClick={() => toggleState(s)}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group relative overflow-hidden
                        ${systemState === s ? (
                          s === 'ERROR' ? 'bg-rose-600 border-rose-400 text-white shadow-lg' :
                          s === 'SUCCESS' ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg' :
                          s === 'STATIONARY' ? 'bg-zinc-800 border-zinc-600 text-white shadow-lg' :
                          'bg-indigo-600 border-indigo-400 text-white shadow-xl'
                        ) : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10 hover:translate-x-1'}
                      `}
                    >
                       <div className="flex items-center gap-3">
                          {s === 'STATIONARY' && <Anchor className="w-3 h-3" />}
                          {s === 'ISOLATED' && <Fingerprint className="w-3 h-3" />}
                          <span className="text-[10px] font-black uppercase tracking-widest relative z-10">{s}</span>
                       </div>
                       <div className={`w-1.5 h-1.5 rounded-full transition-all ${systemState === s ? 'bg-white scale-125' : 'bg-zinc-800'}`} />
                    </button>
                  ))}
               </div>
            </div>

            <div className="mt-auto space-y-4 bg-black/20 p-6 rounded-[32px] border border-white/5">
               <div className="flex items-center gap-4 text-indigo-400">
                  <Terminal className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Physics_Log</span>
               </div>
               <div className="space-y-2 font-mono text-[8px] text-zinc-600 uppercase">
                  <div>Bias: {systemState}</div>
                  <div>Sync: {coherence > 90 ? 'LOCKED' : 'CALIBRATING'}</div>
                  <div className="text-indigo-500 animate-pulse"> Listening for input...</div>
               </div>
            </div>
         </div>

         {/* VISUAL VIEWPORT */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="lg:col-span-9 bg-[#050508] relative overflow-hidden flex items-center justify-center group shadow-inner cursor-none"
         >
            {/* Environmental Glow */}
            <div className={`absolute inset-0 transition-all duration-1000 opacity-20
              ${systemState === 'ERROR' ? 'bg-rose-500 blur-[150px]' : systemState === 'SUCCESS' ? 'bg-emerald-500 blur-[150px]' : 'bg-indigo-500 blur-[150px]'}
            `} />

            {/* THE SPATIAL STACK */}
            <div className="relative w-full h-full flex items-center justify-center perspective-2000 preserve-3d">
               
               {layers.map((layer, i) => {
                 const isTop = i === 2;
                 const isMid = i === 1;
                 
                 // Эффекты специфичные для состояний
                 const chromaticShadow = systemState === 'CHROMATIC' && isTop 
                   ? '10px 0 30px rgba(244,63,94,0.4), -10px 0 30px rgba(56,189,248,0.4)' 
                   : 'none';
                 
                 const errorFilter = systemState === 'ERROR' ? `hue-rotate(${Math.random()*90}deg) contrast(1.5)` : 'none';

                 return (
                   <div 
                     key={i}
                     className={`absolute transition-all duration-[50ms] border-2 flex flex-col items-center justify-center p-8 overflow-hidden
                        ${isTop ? 'w-[380px] h-[240px] z-50 bg-white/5 border-white/20' : ''}
                        ${isMid ? 'w-[420px] h-[280px] z-40 bg-indigo-500/5 border-indigo-500/20' : ''}
                        ${i === 0 ? 'w-[480px] h-[340px] z-30 bg-white/[0.01] border-white/5 opacity-40' : ''}
                        ${systemState === 'ERROR' ? 'border-rose-500/40 bg-rose-500/5' : ''}
                        ${systemState === 'SUCCESS' && isTop ? 'border-emerald-500/50 bg-emerald-500/5' : ''}
                        ${systemState === 'STATIONARY' ? 'grayscale opacity-60' : ''}
                     `}
                     style={{ 
                       transform: `translate3d(${layer.x}px, ${layer.y}px, ${layer.z}px) rotateX(45deg) rotateZ(-15deg) scale(${layer.scale})`,
                       borderRadius: `${(systemState === 'FOCUS' || systemState === 'ISOLATED') && isTop ? 12 : layer.radius}px`,
                       backdropFilter: `blur(${(systemState === 'FOCUS' || systemState === 'ISOLATED') && isTop ? 40 : layer.blur}px)`,
                       boxShadow: chromaticShadow,
                       filter: errorFilter
                     }}
                   >
                      {/* Internal Data Visuals */}
                      <div className="absolute top-6 left-8 flex items-center gap-2 opacity-20">
                         <Box className="w-3 h-3" />
                         <span className="text-[7px] font-mono uppercase tracking-[0.4em]">{layer.label}</span>
                      </div>

                      {isTop && (
                        <div className="flex items-center gap-6 z-10 animate-in zoom-in duration-500">
                           <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center transition-all duration-500 shadow-2xl
                             ${systemState === 'SUCCESS' ? 'bg-emerald-500 text-white' : 
                               systemState === 'ERROR' ? 'bg-rose-600 text-white' : 
                               systemState === 'STATIONARY' ? 'bg-zinc-700 text-white' :
                               'bg-zinc-800 text-zinc-500'}
                           `}>
                              {getIcon()}
                           </div>
                           <div>
                              <div className={`text-[10px] font-mono font-black uppercase transition-colors ${systemState === 'ERROR' ? 'text-rose-500' : 'text-indigo-400'}`}>
                                 {systemState}_LINK_0x14
                              </div>
                              <div className="text-4xl font-tech font-bold text-white uppercase tracking-tighter">
                                 {systemState === 'FOCUS' ? 'Aperture' : 
                                  systemState === 'CHROMATIC' ? 'Spectral' :
                                  systemState === 'STATIONARY' ? 'Inert' :
                                  systemState === 'ERROR' ? 'Critical' : 'Surface'}
                              </div>
                           </div>
                        </div>
                      )}

                      {isMid && systemState === 'PROCESSING' && (
                         <div className="flex flex-col items-center gap-4 opacity-40 animate-pulse">
                            <RefreshCw className="w-12 h-12 text-indigo-400 animate-spin-slow" />
                            <div className="text-[8px] font-mono uppercase tracking-widest text-indigo-400">Logic_Restructuring...</div>
                         </div>
                      )}

                      {/* Diagnostic HUD lines */}
                      <div className="absolute inset-0 border-t border-l border-white/5 pointer-events-none rounded-[inherit]" />
                   </div>
                 );
               })}
            </div>

            {/* CURSOR CROSSHAIR */}
            <div 
              className="absolute pointer-events-none z-[100] transition-transform duration-[50ms]"
              style={{ transform: `translate(calc(50% + ${targetPos.current.x}px - 50%), calc(50% + ${targetPos.current.y}px - 50%))` }}
            >
               <div className="relative">
                  <div className={`w-14 h-14 border rounded-full flex items-center justify-center backdrop-blur-md transition-colors duration-500
                    ${systemState === 'ERROR' ? 'border-rose-500/60' : 'border-indigo-500/40'}
                    ${systemState === 'STATIONARY' ? 'opacity-0' : 'opacity-100'}
                  `}>
                     <div className={`w-1 h-1 rounded-full shadow-[0_0_15px_#6366f1] ${systemState === 'ERROR' ? 'bg-rose-500' : 'bg-indigo-500'}`} />
                  </div>
                  <div className={`absolute top-1/2 left-full ml-4 whitespace-nowrap bg-zinc-900 border border-white/10 px-3 py-1 rounded-lg transition-opacity ${systemState === 'STATIONARY' ? 'opacity-0' : 'opacity-100'}`}>
                     <span className="text-[7px] font-mono text-indigo-400 uppercase">PTR: [{(targetPos.current.x).toFixed(0)}, {(targetPos.current.y).toFixed(0)}]</span>
                  </div>
               </div>
            </div>

            {/* SYSTEM STATUS OVERLAY */}
            <div className="absolute bottom-12 left-12 flex flex-col gap-2 z-[60]">
               <div className={`flex items-center gap-3 px-6 py-2 bg-zinc-900 border border-white/10 rounded-full shadow-2xl transition-colors duration-500
                 ${systemState === 'ERROR' ? 'border-rose-500/40' : ''}
               `}>
                  <Radio className={`w-4 h-4 ${systemState === 'IDLE' ? 'text-zinc-600' : systemState === 'ERROR' ? 'text-rose-500 animate-bounce' : 'text-emerald-500 animate-pulse'}`} />
                  <span className="text-[10px] font-mono text-white uppercase tracking-widest font-black">Mode: {systemState}</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
