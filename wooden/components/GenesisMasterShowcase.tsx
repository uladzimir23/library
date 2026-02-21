
import React, { useState, useRef, useEffect } from 'react';
import { 
  Cpu, Activity, Zap, Shield, Maximize2, 
  Layers, Sliders, Target, Search, Hexagon, 
  Radio, RefreshCw, Sparkles, Crosshair, 
  Terminal, Type, MousePointer2, ChevronRight,
  ShieldCheck, Radar, Grid3X3, Waves, Box,
  Fingerprint, Compass, Database, Network, 
  Binary, Share2, Eye
} from 'lucide-react';
import { playUISound } from './AudioService';

type AtomMode = 
  | 'HEADER' | 'INPUT' | 'METRICS' | 'SHIELD' 
  | 'SCAN' | 'PULSE' | 'LOD' | 'TERMINAL' 
  | 'BIOMETRIC' | 'QUANTUM' | 'DATA' | 'NETWORK';

export const GenesisMasterShowcase: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<AtomMode>('HEADER');
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isSyncing, setIsSyncing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [lastPulse, setLastPulse] = useState(0);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const physics = {
    stiffness: 0.12,
    damping: 0.85,
    mass: 2.0
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!active || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * (15 / physics.mass);
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * (-15 / physics.mass);
    setRotation({ x: y, y: x });
  };

  const handleNodeClick = (newMode: AtomMode) => {
    if (newMode === mode) return;
    setIsSyncing(true);
    setLastPulse(Date.now());
    playUISound('process');
    
    setTimeout(() => {
      setMode(newMode);
      setIsSyncing(false);
      playUISound('success');
    }, 450);
  };

  const renderModeContent = () => {
    switch(mode) {
      case 'HEADER':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
             <div className="flex items-center gap-3 text-indigo-400">
                <Box className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Structure_v4</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-tech font-bold text-white uppercase tracking-tighter leading-[0.85]">
               Matter<br /><span className="text-indigo-400">Synthesis_09</span>
             </h1>
             <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-md">
               Универсальный протокол формирования пространственных интерфейсов на основе нейронных паттернов.
             </p>
          </div>
        );
      case 'TERMINAL':
        return (
          <div className="space-y-4 animate-in fade-in duration-500 font-mono">
             <div className="flex items-center gap-2 text-emerald-500 mb-4">
                <Terminal className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Kernel_Access_Console</span>
             </div>
             <div className="text-[11px] text-zinc-500 space-y-1">
                <p className="text-emerald-400/80">> INITIALIZING_ATOMIC_CORE... OK</p>
                <p className="text-indigo-400/80">> MAPPING_Z_STACK_0x882... DONE</p>
                <p className="animate-pulse">> AWAITING_COMMAND_INJECTION_</p>
             </div>
          </div>
        );
      case 'BIOMETRIC':
        return (
          <div className="flex flex-col items-center py-8 animate-in zoom-in-95 duration-500">
             <div className="relative mb-6">
                <Fingerprint className="w-24 h-24 text-indigo-500" />
                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" />
             </div>
             <div className="text-center">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Fingerprint_Scan</div>
                <div className="text-2xl font-tech font-bold text-white uppercase">Identity_Verified</div>
             </div>
          </div>
        );
      case 'QUANTUM':
        return (
          <div className="relative h-40 flex items-center justify-center animate-in fade-in duration-1000">
             <div className="absolute inset-0 border border-dashed border-indigo-500/20 rounded-full animate-spin-slow" />
             <div className="flex gap-4">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center animate-bounce">
                   <Zap className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center animate-pulse delay-150">
                   <Box className="w-8 h-8 text-emerald-400" />
                </div>
             </div>
             <div className="absolute -bottom-4 text-[9px] font-mono text-indigo-500 uppercase tracking-[0.5em] font-black">Superposition_Active</div>
          </div>
        );
      case 'INPUT':
        return (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 py-4">
             <div className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest">Awaiting_Command_Input...</div>
             <div className="relative group/input">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="relative w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-3xl font-tech text-white outline-none focus:border-indigo-500/50 transition-all placeholder:opacity-20"
                  placeholder="_EXECUTE_SYSTEM_SCAN"
                />
                <Terminal className="absolute right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-500 opacity-40" />
             </div>
          </div>
        );
      case 'METRICS':
        return (
          <div className="grid grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-400">
                   <Activity className="w-4 h-4" />
                   <span className="text-[10px] font-mono uppercase font-black tracking-widest">Coherence_Sync</span>
                </div>
                <div className="text-6xl font-tech font-bold text-white tracking-tighter">0.998</div>
             </div>
             <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400">
                   <Target className="w-4 h-4" />
                   <span className="text-[10px] font-mono uppercase font-black tracking-widest">Runtime_LOD</span>
                </div>
                <div className="text-6xl font-tech font-bold text-white tracking-tighter">ULTRA</div>
             </div>
          </div>
        );
      case 'NETWORK':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="flex justify-between items-center text-indigo-400">
                <span className="text-[10px] font-mono uppercase font-black">Synaptic_Lattice</span>
                <Network className="w-5 h-5 animate-pulse" />
             </div>
             <div className="h-40 bg-indigo-500/5 border border-indigo-500/20 rounded-[40px] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#6366f1_1px,transparent_1px)] bg-[length:20px_20px]" />
                <Share2 className="w-12 h-12 text-indigo-500/40 animate-spin-slow" />
             </div>
          </div>
        );
      case 'DATA':
        return (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-500">
             <div className="flex justify-between font-mono text-[9px] text-zinc-500">
                <span>INCOMING_PACKETS</span>
                <Database className="w-3 h-3" />
             </div>
             <div className="grid grid-cols-4 gap-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-12 bg-white/5 rounded-xl border border-white/10 flex items-end p-2">
                     <div className="w-full bg-indigo-500" style={{ height: `${Math.random() * 100}%` }} />
                  </div>
                ))}
             </div>
          </div>
        );
      default:
        return <div className="p-12 text-zinc-500 italic">Sector_In_Development...</div>;
    }
  };

  return (
    <div className="scroll-mt-32 py-24 space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-4">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[8px] font-bold uppercase tracking-[0.4em]">
              <Hexagon className="w-3 h-3 animate-pulse" /> Master_Blueprint_Reference
           </div>
           <h2 className="text-6xl md:text-8xl font-tech font-bold text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
              Универсальный <br /><span className="text-indigo-500">Атом.</span>
           </h2>
        </div>
        <div className="flex items-center gap-4 text-right opacity-40">
           <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Calibration: Matter_Fluid_v4</div>
           <div className="w-px h-12 bg-indigo-500/20" />
           <Radio className={`w-6 h-6 ${isSyncing ? 'text-indigo-500 animate-pulse' : 'text-zinc-800'}`} />
        </div>
      </div>

      <div className={`relative flex flex-col xl:flex-row gap-1 border p-1 rounded-[80px] overflow-hidden transition-all duration-1000
        ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-zinc-100 border-black/5 shadow-inner'}
      `}>
         
         {/* 1. LEFT: DIAGNOSTICS */}
         <div className={`w-full xl:w-96 p-12 flex flex-col gap-12 border-r ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-black/5'}`}>
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-indigo-500">
                  <Activity className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Telemetry_Stream</span>
               </div>
               <div className="space-y-6">
                  {[
                    { label: 'Mass', val: '1.24_kg', progress: active ? 82 : 20 },
                    { label: 'Viscosity', val: '0.42_Pa', progress: active ? 45 : 15 },
                    { label: 'Refraction', val: '1.45_n', progress: active ? 94 : 30 }
                  ].map((spec, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between text-[10px] font-mono uppercase">
                          <span className="text-zinc-500">{spec.label}</span>
                          <span className="text-text-main dark:text-white font-bold">{spec.val}</span>
                       </div>
                       <div className="h-0.5 bg-black/10 dark:bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${spec.progress}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="mt-auto p-8 rounded-[40px] bg-black/40 border border-white/5 overflow-hidden group/gauge shadow-inner">
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3 text-indigo-400">
                     <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                     <span className="text-[9px] font-bold uppercase tracking-widest font-mono">Kernel_Status</span>
                  </div>
                  <div className="text-4xl font-tech font-bold text-white uppercase tracking-tighter leading-none">
                    {mode}<span className="text-xs opacity-30 ml-2">v4</span>
                  </div>
               </div>
            </div>
         </div>

         {/* 2. CENTER: THE MATTER ATOM (Universal Container) */}
         <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => { setActive(true); playUISound('hover'); }}
            onMouseLeave={() => { setActive(false); setRotation({ x: 0, y: 0 }); }}
            className="flex-1 min-h-[800px] relative flex items-center justify-center p-12 md:p-24 perspective-2000 overflow-hidden bg-zinc-950 shadow-inner group/viewport cursor-crosshair"
         >
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            
            {/* 3D Structure */}
            <div 
              className="relative w-full max-w-2xl transition-all duration-700 ease-out preserve-3d"
              style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
            >
               {/* 3D Glass Stack */}
               {[
                 { z: -60, blur: 40, op: 0.02 },
                 { z: -30, blur: 20, op: 0.05 },
                 { z: 0, blur: 10, op: 0.1 },
               ].map((layer, i) => (
                 <div 
                   key={i}
                   className={`absolute inset-0 border-2 rounded-[64px] transition-all duration-500 border-white/10
                    ${isSyncing ? 'animate-pulse border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.2)]' : ''}
                   `}
                   style={{ 
                     transform: `translateZ(${layer.z}px)`,
                     backgroundColor: `rgba(255, 255, 255, ${active ? layer.op : 0.01})`,
                     backdropFilter: `blur(${active ? layer.blur : 5}px)`,
                   }}
                 />
               ))}

               {/* MAIN INTERFACE LAYER (Adaptive Height) */}
               <div 
                 className={`relative z-50 border-2 border-white/20 rounded-[64px] p-12 md:p-16 transition-all duration-500
                   ${active ? 'bg-white/5 backdrop-blur-xl shadow-2xl border-white/30' : 'bg-transparent border-white/5 shadow-none'}
                 `}
                 style={{ transform: 'translateZ(60px)' }}
               >
                  <div className="flex flex-col h-full gap-16">
                    <div className="flex justify-between items-start">
                       <div className={`w-24 h-24 rounded-[36px] bg-indigo-600 flex items-center justify-center text-white shadow-2xl transition-all duration-700 ${isSyncing ? 'scale-110 rotate-12 bg-emerald-500' : ''}`}>
                          {mode === 'HEADER' && <Type className="w-12 h-12" />}
                          {mode === 'INPUT' && <Terminal className="w-12 h-12" />}
                          {mode === 'METRICS' && <Activity className="w-12 h-12" />}
                          {mode === 'TERMINAL' && <Binary className="w-12 h-12" />}
                          {mode === 'BIOMETRIC' && <Fingerprint className="w-12 h-12" />}
                          {mode === 'QUANTUM' && <Zap className="w-12 h-12" />}
                          {mode === 'DATA' && <Database className="w-12 h-12" />}
                          {mode === 'NETWORK' && <Network className="w-12 h-12" />}
                          {mode === 'SCAN' && <Radar className="w-12 h-12" />}
                          {mode === 'LOD' && <Grid3X3 className="w-12 h-12" />}
                       </div>
                       <div className="text-right">
                          <div className="text-[10px] font-mono text-indigo-400 font-black uppercase tracking-widest mb-1">Atom_Protocol</div>
                          <div className="text-5xl font-tech font-bold text-white uppercase tracking-widest leading-none">0x88.A</div>
                       </div>
                    </div>
                    
                    <div className="flex-1">
                       {renderModeContent()}
                    </div>

                    <div className="flex justify-between items-end border-t border-white/10 pt-10 mt-auto">
                       <div className="flex gap-12">
                          <div className="space-y-1">
                             <div className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">Integrity</div>
                             <div className="text-xs font-bold text-emerald-500 font-mono tracking-widest uppercase">Calibrated</div>
                          </div>
                          <div className="space-y-1">
                             <div className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">Latency</div>
                             <div className="text-xs font-bold text-indigo-400 font-mono">0.04ms</div>
                          </div>
                       </div>
                       <div className={`p-5 rounded-[28px] bg-zinc-900 border transition-all duration-500 ${active ? 'border-indigo-500/50 shadow-xl' : 'border-white/10 shadow-none'}`}>
                          <ShieldCheck className={`w-6 h-6 ${isSyncing ? 'text-emerald-500 animate-pulse' : 'text-indigo-500'}`} />
                       </div>
                    </div>
                  </div>

                  <div key={lastPulse} className="absolute inset-0 rounded-[64px] border-4 border-indigo-500/40 pointer-events-none animate-ping opacity-0" style={{ animationDuration: '1s' }} />

                  {/* Corner Brackets */}
                  <div className={`absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-indigo-500/40 transition-all duration-700 ${active ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
                  <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-indigo-500/40 transition-all duration-700 ${active ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
               </div>
            </div>

            {/* Status Overlay */}
            <div className={`absolute bottom-12 right-12 text-right transition-all duration-500 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
               <div className="flex items-center gap-5 justify-end">
                  <div className="space-y-1">
                     <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Observer_Lock</div>
                     <div className={`text-xl font-tech font-bold uppercase tracking-widest ${isSyncing ? 'text-indigo-400 animate-pulse' : 'text-emerald-500'}`}>
                        {isSyncing ? 'Syncing...' : 'Synchronized'}
                     </div>
                  </div>
                  <div className="p-5 bg-zinc-900 border border-white/10 rounded-[32px] shadow-2xl">
                     <Crosshair className={`w-7 h-7 text-indigo-500 ${isSyncing ? 'animate-spin' : 'animate-spin-slow'}`} />
                  </div>
               </div>
            </div>
         </div>

         {/* 3. RIGHT: LATTICE COMMAND (Mode Selector) */}
         <div className={`w-full xl:w-96 p-12 flex flex-col gap-8 border-l ${isDark ? 'bg-[#0a0a0c] border-white/5' : 'bg-zinc-50 border-black/5'}`}>
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-indigo-500">
                  <Sliders className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Lattice_Command</span>
               </div>
               <p className="text-[10px] font-light text-zinc-500 leading-relaxed uppercase tracking-tight">
                 Выберите узел для перепрошивки сущности «Атома» и изменения его функциональной специализации.
               </p>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-3 overflow-y-auto no-scrollbar max-h-[550px] pr-2">
               {[
                 { id: 'HEADER' as AtomMode, icon: Type, label: 'Header' },
                 { id: 'TERMINAL' as AtomMode, icon: Binary, label: 'Kernel' },
                 { id: 'INPUT' as AtomMode, icon: Terminal, label: 'Field' },
                 { id: 'METRICS' as AtomMode, icon: Activity, label: 'Metrics' },
                 { id: 'BIOMETRIC' as AtomMode, icon: Fingerprint, label: 'Scan' },
                 { id: 'QUANTUM' as AtomMode, icon: Zap, label: 'Quantum' },
                 { id: 'DATA' as AtomMode, icon: Database, label: 'Data' },
                 { id: 'NETWORK' as AtomMode, icon: Network, label: 'Net' },
                 { id: 'SCAN' as AtomMode, icon: Radar, label: 'Radar' },
                 { id: 'LOD' as AtomMode, icon: Grid3X3, label: 'Mesh' }
               ].map((node) => (
                 <button 
                   key={node.id} 
                   onClick={() => handleNodeClick(node.id)}
                   className={`p-6 rounded-[32px] border flex flex-col items-center justify-center gap-4 transition-all duration-500 group/node relative overflow-hidden
                    ${mode === node.id 
                      ? 'bg-indigo-600 border-indigo-400 scale-105 shadow-xl' 
                      : 'bg-white/5 border-white/5 hover:border-indigo-500/30'}
                   `}
                 >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all 
                      ${mode === node.id 
                        ? 'bg-white/20' 
                        : 'bg-zinc-950 group-hover/node:bg-indigo-500/20'}
                    `}>
                       <node.icon className={`w-6 h-6 
                        ${mode === node.id 
                          ? 'text-white' 
                          : 'text-zinc-700 group-hover/node:text-indigo-400'}
                       `} />
                    </div>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest
                      ${mode === node.id 
                        ? 'text-white' 
                        : 'text-zinc-500'}
                    `}>{node.label}</span>
                 </button>
               ))}
            </div>

            <div className="pt-8 border-t border-black/5 dark:border-white/5 space-y-6">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-indigo-500">
                     <MousePointer2 className="w-4 h-4" />
                     <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Registry_Verify</span>
                  </div>
                  {isSyncing && <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />}
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-emerald-500 transition-all duration-1000 ${isSyncing ? 'w-full' : 'w-10%'}`} />
               </div>
               <div className="text-[8px] font-mono text-zinc-700 uppercase tracking-tighter flex justify-between">
                 <span>Status: {isSyncing ? 'CALIBRATING' : 'READY'}</span>
                 <span>P_ID: 0x882{mode[0]}</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
