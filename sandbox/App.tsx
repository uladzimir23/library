
import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
  Atom, Box, Sliders, Zap, Activity, Cpu, 
  Target, Maximize2, RefreshCw, Terminal, 
  Search, Shield, Database, Layout, Command, 
  ChevronRight, Wand2, Loader2, Share2, Eye,
  Layers, Circle, Square, Gauge, CheckSquare,
  BarChart, Radio, Battery, Wifi, List, MousePointer2,
  Bell, Clock
} from 'lucide-react';
import { LanguageContext } from '../index';
import { playUISound } from '../wooden/components/AudioService';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  AtomicButton, 
  AtomicInput, 
  AtomicToggle, 
  AtomicCard, 
  AtomicSlider,
  AtomicRadialMeter,
  AtomicBadge,
  AtomicSearch,
  AtomicNode,
  AtomicCheckbox,
  AtomicVisualizer,
  AtomicRadar,
  AtomicKeypad,
  AtomicBattery,
  AtomicSignal,
  AtomicTabs
} from './elements/AtomicPrimitives';

export default function SandboxApp() {
  const { t, theme } = useContext(LanguageContext);
  const [selectedAtom, setSelectedAtom] = useState<string>('BUTTON');
  const [physics, setPhysics] = useState({
    mass: 1.0,
    refraction: 0.4,
    blur: 24,
    radius: 32,
    tension: 0.7
  });
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = viewportRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5
      });
    }
  };

  const atoms = [
    { id: 'BUTTON', icon: Command, label: 'Action_Unit', group: 'Basic' },
    { id: 'INPUT', icon: Terminal, label: 'Data_Channel', group: 'Basic' },
    { id: 'TOGGLE', icon: Sliders, label: 'Switch_Node', group: 'Basic' },
    { id: 'CHECKBOX', icon: CheckSquare, label: 'Toggle_Logic', group: 'Basic' },
    { id: 'SLIDER', icon: Activity, label: 'Linear_Mod', group: 'Basic' },
    { id: 'TABS', icon: List, label: 'Sector_Switch', group: 'Basic' },
    
    { id: 'KEYPAD', icon: Grid3X3, label: 'Input_Grid', group: 'Hardware' },
    { id: 'BATTERY', icon: Battery, label: 'Power_Cell', group: 'Hardware' },
    { id: 'SIGNAL', icon: Wifi, label: 'Relay_Link', group: 'Hardware' },
    
    { id: 'RADIAL', icon: Gauge, label: 'LOD_Meter', group: 'Diagnostic' },
    { id: 'BADGE', icon: Shield, label: 'Status_Tag', group: 'Diagnostic' },
    { id: 'VISUALIZER', icon: BarChart, label: 'Pulse_View', group: 'Diagnostic' },
    { id: 'RADAR', icon: Target, label: 'Search_Beam', group: 'Diagnostic' },
    
    { id: 'SEARCH', icon: Search, label: 'Optic_Lens', group: 'Complex' },
    { id: 'CARD', icon: Box, label: 'Matter_Slab', group: 'Complex' },
    { id: 'NODE', icon: Atom, label: 'Neural_Base', group: 'Complex' },
  ];

  const aiRefine = async () => {
    setIsSynthesizing(true);
    playUISound('process');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Optimize physical constants for a spatial UI ${selectedAtom}. Target: High tactile feel, organic motion. Return ONLY JSON: {mass, refraction, blur, radius, tension}`,
        config: { responseMimeType: "application/json" }
      });
      const data = JSON.parse(response.text || "{}");
      setPhysics(prev => ({ ...prev, ...data }));
      playUISound('success');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const renderActiveAtom = () => {
    switch (selectedAtom) {
      case 'BUTTON': return <AtomicButton physics={physics} />;
      case 'INPUT': return <AtomicInput physics={physics} />;
      case 'TOGGLE': return <AtomicToggle physics={physics} />;
      case 'CHECKBOX': return <AtomicCheckbox physics={physics} />;
      case 'SLIDER': return <AtomicSlider physics={physics} />;
      case 'TABS': return <AtomicTabs physics={physics} />;
      case 'KEYPAD': return <AtomicKeypad physics={physics} />;
      case 'BATTERY': return <AtomicBattery physics={physics} />;
      case 'SIGNAL': return <AtomicSignal physics={physics} />;
      case 'RADIAL': return <AtomicRadialMeter physics={physics} />;
      case 'BADGE': return <AtomicBadge physics={physics} />;
      case 'VISUALIZER': return <AtomicVisualizer physics={physics} />;
      case 'RADAR': return <AtomicRadar physics={physics} />;
      case 'SEARCH': return <AtomicSearch physics={physics} />;
      case 'CARD': return <AtomicCard physics={physics} />;
      case 'NODE': return <AtomicNode physics={physics} />;
      default: return <AtomicButton physics={physics} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans flex overflow-hidden">
      {/* LEFT SIDEBAR: ATOM REGISTRY */}
      <div className="w-80 border-r border-white/5 bg-zinc-900/50 backdrop-blur-3xl flex flex-col z-50">
         <div className="p-8 flex items-center gap-4 border-b border-white/5 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-600 flex items-center justify-center shadow-lg shadow-fuchsia-600/20">
               <Atom className="w-7 h-7 text-white" />
            </div>
            <div>
               <h1 className="text-xl font-tech font-bold uppercase tracking-tighter">Atomic_Sandbox</h1>
               <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Registry_v2.9.4</div>
            </div>
         </div>

         {/* Скроллируемый контент сайдбара */}
         <div className="flex-1 overflow-y-auto custom-scroll p-6 space-y-10">
            {['Basic', 'Hardware', 'Diagnostic', 'Complex'].map(group => (
              <div key={group} className="space-y-4">
                 <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest font-black flex items-center gap-2">
                    <div className="w-1 h-1 bg-fuchsia-500 rounded-full" /> {group}_Nodes
                 </div>
                 <div className="grid grid-cols-1 gap-2">
                    {atoms.filter(a => a.group === group).map(atom => (
                      <button 
                        key={atom.id}
                        onClick={() => { setSelectedAtom(atom.id); playUISound('click'); }}
                        className={`w-full p-4 rounded-2xl border transition-all duration-500 flex items-center justify-between group
                          ${selectedAtom === atom.id ? 'bg-fuchsia-600 border-fuchsia-400 shadow-xl' : 'bg-white/5 border-transparent hover:bg-white/10'}
                        `}
                      >
                         <div className="flex items-center gap-4">
                            <atom.icon className={`w-4 h-4 ${selectedAtom === atom.id ? 'text-white' : 'text-zinc-500'}`} />
                            <span className={`text-[10px] font-black uppercase tracking-widest ${selectedAtom === atom.id ? 'text-white' : 'text-zinc-400'}`}>{atom.label}</span>
                         </div>
                      </button>
                    ))}
                 </div>
              </div>
            ))}
         </div>

         <div className="p-6 border-t border-white/5 shrink-0">
            <div className="p-6 bg-black rounded-[40px] border border-white/5 shadow-inner">
               <div className="flex items-center gap-3 mb-4">
                  <Database className="w-4 h-4 text-fuchsia-500" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Memory_Alloc</span>
               </div>
               <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-fuchsia-500 animate-pulse" style={{ width: '68%' }} />
               </div>
            </div>
         </div>
      </div>

      {/* CENTER: SPATIAL VIEWPORT */}
      <div 
        ref={viewportRef}
        onMouseMove={handleMouseMove}
        className="flex-1 relative flex items-center justify-center p-20 cursor-none perspective-2000 group bg-[#020204]"
      >
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
         
         {/* Environmental Aura */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.08)_0%,transparent_70%)] opacity-30 animate-pulse pointer-events-none" />

         {/* Diagnostic HUD Scanline */}
         <div className={`absolute inset-0 z-50 pointer-events-none overflow-hidden transition-opacity duration-1000 ${isSynthesizing ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-full h-[2px] bg-fuchsia-500 shadow-[0_0_20px_#d946ef] animate-[scan_2s_linear_infinite]" />
         </div>

         {/* The Inspected Atom */}
         <div 
           className="relative transition-all duration-700 ease-out preserve-3d flex items-center justify-center"
           style={{ transform: `rotateX(${mousePos.y * -20}deg) rotateY(${mousePos.x * 20}deg)` }}
         >
            <div className="relative animate-in fade-in zoom-in-95 duration-1000">
               {renderActiveAtom()}
            </div>

            {/* Containment Field Visuals */}
            <div className="absolute w-[450px] h-[450px] border border-white/5 rounded-full -translate-z-40 scale-105 opacity-20" />
            <div className="absolute w-[550px] h-[550px] border border-white/5 rounded-full -translate-z-80 scale-110 opacity-10" />
         </div>

         {/* Precision Cursor */}
         <div 
           className="absolute pointer-events-none z-[100] transition-transform duration-75"
           style={{ left: `${(mousePos.x + 0.5) * 100}%`, top: `${(mousePos.y + 0.5) * 100}%`, transform: 'translate(-50%, -50%)' }}
         >
            <div className="w-16 h-16 border border-fuchsia-500/30 rounded-full flex items-center justify-center backdrop-blur-md">
               <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_15px_#fff]" />
               <Maximize2 className="absolute w-4 h-4 text-fuchsia-500 opacity-20 animate-pulse" />
            </div>
         </div>

         {/* Floating Metrics HUD */}
         <div className="absolute bottom-12 left-12 flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-zinc-900/90 border border-white/5 px-8 py-4 rounded-full backdrop-blur-3xl shadow-2xl">
               <Activity className="w-4 h-4 text-fuchsia-500 animate-pulse" />
               <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">LOD_Precision: 0.992_P</span>
            </div>
         </div>
      </div>

      {/* RIGHT SIDEBAR: PHYSICS PULPIT */}
      <div className="w-96 border-l border-white/5 bg-zinc-900/50 backdrop-blur-3xl p-10 flex flex-col gap-12 z-50">
         <div className="space-y-2 shrink-0">
            <div className="flex items-center gap-3 text-fuchsia-500">
               <Sliders className="w-5 h-5" />
               <span className="text-[10px] font-black uppercase tracking-widest">Calibration_Core</span>
            </div>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">Ручная настройка физических констант для {selectedAtom}.</p>
         </div>

         <div className="flex-1 space-y-10 overflow-y-auto pr-2 custom-scroll">
            {[
               { label: 'Matter_Mass', key: 'mass', min: 0.1, max: 2.0, step: 0.05, icon: Box },
               { label: 'Refraction_Index', key: 'refraction', min: 0.0, max: 1.0, step: 0.01, icon: Zap },
               { label: 'Blur_Sigma', key: 'blur', min: 0, max: 64, step: 1, icon: Layers },
               { label: 'Edge_Radius', key: 'radius', min: 0, max: 100, step: 1, icon: Target },
               { label: 'Spring_Tension', key: 'tension', min: 0.1, max: 1.0, step: 0.01, icon: Activity }
            ].map(ctrl => (
              <div key={ctrl.key} className="space-y-4 group/ctrl">
                 <div className="flex justify-between items-center text-[9px] font-mono text-zinc-400 uppercase font-black group-hover/ctrl:text-fuchsia-400 transition-colors">
                    <span className="flex items-center gap-2"><ctrl.icon className="w-3 h-3" /> {ctrl.label}</span>
                    <span className="text-fuchsia-500">{(physics as any)[ctrl.key].toFixed(2)}</span>
                 </div>
                 <input 
                   type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={(physics as any)[ctrl.key]}
                   onChange={e => setPhysics({...physics, [ctrl.key]: parseFloat(e.target.value)})}
                   className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-fuchsia-500"
                 />
              </div>
            ))}
         </div>

         <div className="pt-8 border-t border-white/5 space-y-4 shrink-0">
            <button 
              onClick={aiRefine}
              disabled={isSynthesizing}
              className={`w-full py-6 rounded-3xl font-black text-[9px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95
                ${isSynthesizing ? 'bg-zinc-800 text-zinc-600' : 'bg-fuchsia-600 text-white hover:bg-fuchsia-500 shadow-fuchsia-600/20'}
              `}
            >
               {isSynthesizing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
               AI_Synthesis_Recalib
            </button>
            <button className="w-full py-4 border border-white/10 rounded-2xl text-[8px] font-black uppercase text-zinc-500 hover:text-white transition-all flex items-center justify-center gap-3">
               <Share2 className="w-3 h-3" /> Export_Asset_DNA
            </button>
         </div>
      </div>

      <style>{`
        @keyframes scan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .-translate-z-40 { transform: translateZ(-40px); }
        .-translate-z-80 { transform: translateZ(-80px); }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.2); border-radius: 20px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(217, 70, 239, 0.4); }
      `}</style>
    </div>
  );
}

// Вспомогательная иконка для Keypad
const Grid3X3 = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
);
