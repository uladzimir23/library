
import React, { useState, useContext, useRef, useEffect } from 'react';
import { 
  Atom, Sliders, Zap, MousePointer2, RefreshCw, 
  Layers, Sliders as SlidersIcon, Shield, Box, 
  Activity, Gauge, Target, Sparkles, Wand2,
  ChevronRight, ArrowRight, Loader2, Fingerprint,
  Mail, Search, Command, Layout, Component, Type,
  Cpu, Waves, Wind, AlertTriangle, Radio, Terminal,
  User, Bell, CreditCard, CheckCircle2, Check,
  MoreHorizontal, Share2, Info, ChevronLeft,
  Square, Circle, Play, Pause
} from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from './AudioService';
import { GoogleGenAI } from "@google/genai";

type UnitID = 
  | 'BUTTON' | 'INPUT' | 'BADGE' | 'TOGGLE' | 'SLIDER' | 'PROGRESS' | 'SEGMENT' | 'CHECKBOX'
  | 'AUTH_FORM' | 'SEARCH_BAR' | 'DATA_CARD' | 'PROFILE_CARD' | 'NOTIF_TOAST' | 'PRICING_TABLE';

interface AtomicPhysics {
  blur: number;
  mass: number;
  refraction: number;
  radius: number;
  hue: number;
  aberration: number;
  jitter: number;
  noise: number;
}

export const AtomicLab: React.FC<{ theme: string }> = ({ theme }) => {
  const { t, lang } = useContext(LanguageContext);
  const isDark = theme === 'dark';
  const [activeUnit, setActiveUnit] = useState<UnitID>('BUTTON');
  const [physics, setPhysics] = useState<AtomicPhysics>({
    blur: 24,
    mass: 1.0,
    refraction: 0.1,
    radius: 48,
    hue: 240,
    aberration: 0,
    jitter: 0,
    noise: 0.05
  });
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // States for interactive primitives
  const [val, setVal] = useState(65);
  const [toggle, setToggle] = useState(false);
  const [activeSegment, setActiveSegment] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5
      });
    }
  };

  const runAISynthesis = async () => {
    setIsSynthesizing(true);
    playUISound('process');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Suggest physical parameters for a UI unit: "${activeUnit}". 
        Logic goals: Make it feel tactile, heavy but responsive.
        Return ONLY JSON with keys: blur (0-64), mass (0.1-2.0), refraction (0-1), radius (0-100), hue (0-360), aberration (0-40), jitter (0-10), noise (0-0.2).`,
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

  const renderUnit = () => {
    const jitterX = (Math.random() - 0.5) * physics.jitter;
    const jitterY = (Math.random() - 0.5) * physics.jitter;

    const baseStyle = {
      backdropFilter: `blur(${physics.blur}px)`,
      borderRadius: `${physics.radius}px`,
      transform: `rotateX(${mousePos.y * 20}deg) rotateY(${mousePos.x * 20}deg) translate(${jitterX}px, ${jitterY}px) ${isPressed ? 'scale(0.95)' : 'scale(1)'}`,
      transition: isPressed ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.6s ease',
    };

    const coreColor = `hsla(${physics.hue}, 100%, 50%, ${physics.refraction})`;
    const aberrationShift = physics.aberration;

    const renderContent = () => {
      switch(activeUnit) {
        case 'BUTTON':
          return (
            <button 
              onMouseDown={() => { setIsPressed(true); playUISound('click'); }}
              onMouseUp={() => setIsPressed(false)}
              className="px-16 py-8 text-white font-tech font-bold uppercase tracking-[0.4em] relative group overflow-hidden border-2"
              style={{ ...baseStyle, backgroundColor: coreColor, borderColor: `hsla(${physics.hue}, 100%, 70%, 0.2)` }}
            >
              <span className="relative z-10">Initialize_Unit</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        case 'INPUT':
          return (
            <div className="w-full max-w-md space-y-4" style={baseStyle}>
               <div className="p-2 bg-black/40 rounded-[inherit] border border-white/10 relative group overflow-hidden" style={{ backgroundColor: coreColor }}>
                  <input type="text" placeholder="System_Query_..." className="w-full bg-transparent border-none outline-none p-6 text-xl font-light text-white placeholder:opacity-20" />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white"><Target className="w-5 h-5" /></div>
               </div>
            </div>
          );
        case 'BADGE':
          return (
            <div className="px-6 py-2 border-2 text-[10px] font-black uppercase tracking-[0.3em] text-white flex items-center gap-3" style={{ ...baseStyle, backgroundColor: coreColor, borderColor: `hsla(${physics.hue}, 100%, 70%, 0.3)` }}>
               <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
               Critical_Tag_v1
            </div>
          );
        case 'TOGGLE':
          return (
            <div onClick={() => { setToggle(!toggle); playUISound('click'); }} className={`w-32 h-16 rounded-full p-2 cursor-pointer transition-all duration-500 flex items-center ${toggle ? 'bg-indigo-600 shadow-[0_0_40px_rgba(99,102,241,0.4)]' : 'bg-zinc-800'}`} style={baseStyle}>
               <div className={`w-12 h-12 rounded-full bg-white shadow-xl transition-all duration-500 ${toggle ? 'translate-x-16' : 'translate-x-0'}`} />
            </div>
          );
        case 'SLIDER':
          return (
            <div className="w-full max-w-md p-10 flex flex-col gap-6" style={{ ...baseStyle, backgroundColor: coreColor, border: '1px solid rgba(255,255,255,0.1)' }}>
               <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest"><span>Signal_Level</span> <span>{val}%</span></div>
               <div className="relative h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 shadow-[0_0_15px_#6366f1]" style={{ width: `${val}%` }} />
                  <input type="range" min="0" max="100" value={val} onChange={e => setVal(parseInt(e.target.value))} className="absolute inset-0 opacity-0 cursor-pointer" />
               </div>
            </div>
          );
        case 'PROGRESS':
          return (
            <div className="w-full max-w-md p-10 flex flex-col gap-4" style={{ ...baseStyle, backgroundColor: coreColor, border: '1px solid rgba(255,255,255,0.1)' }}>
               <div className="text-[10px] font-mono text-white/40 uppercase">Sync_Progress</div>
               <div className="h-12 bg-black/40 rounded-2xl border border-white/5 overflow-hidden p-1.5 relative">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-xl transition-all duration-[2000ms] animate-pulse" style={{ width: '74%' }} />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white uppercase tracking-widest">74%_Ready</div>
               </div>
            </div>
          );
        case 'SEGMENT':
          return (
            <div className="p-2 flex gap-2" style={{ ...baseStyle, backgroundColor: coreColor, border: '1px solid rgba(255,255,255,0.1)' }}>
               {['LOD_1', 'LOD_2', 'LOD_3'].map((s, i) => (
                 <button key={i} onClick={() => { setActiveSegment(i); playUISound('click'); }} className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase transition-all duration-500 ${activeSegment === i ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:bg-white/5'}`}>{s}</button>
               ))}
            </div>
          );
        case 'CHECKBOX':
          return (
            <div onClick={() => { setToggle(!toggle); playUISound('click'); }} className={`w-16 h-16 border-2 transition-all duration-500 flex items-center justify-center cursor-pointer ${toggle ? 'bg-indigo-600 border-white shadow-2xl scale-110' : 'bg-black/40 border-white/10'}`} style={{ borderRadius: `${physics.radius/2}px` }}>
               {toggle && <Check className="w-8 h-8 text-white animate-in zoom-in duration-300" />}
            </div>
          );
        case 'AUTH_FORM':
          return (
            <div className="w-full max-w-sm p-12 space-y-8 shadow-2xl" style={{ ...baseStyle, backgroundColor: coreColor, border: '1px solid rgba(255,255,255,0.1)' }}>
               <div className="text-center space-y-2">
                  <Shield className="w-12 h-12 text-white mx-auto mb-4" />
                  <h4 className="text-2xl font-tech font-bold text-white uppercase tracking-widest">Access_Lock</h4>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">Handshake Protocol: 0x88.V2</p>
               </div>
               <div className="space-y-4">
                  <div className="h-12 bg-white/5 border border-white/10 rounded-xl" />
                  <div className="h-12 bg-white/5 border border-white/10 rounded-xl" />
                  <button className="w-full py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-colors">Decrypt_Vault</button>
               </div>
            </div>
          );
        case 'PROFILE_CARD':
          return (
            <div className="w-80 p-8 flex flex-col items-center gap-6" style={{ ...baseStyle, backgroundColor: coreColor, border: '1px solid rgba(255,255,255,0.1)' }}>
               <div className="w-24 h-24 rounded-full border-4 border-indigo-500/40 p-1 relative">
                  <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                     <User className="w-12 h-12 text-white/20" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-black" />
               </div>
               <div className="text-center space-y-1">
                  <h4 className="text-2xl font-tech font-bold text-white uppercase">Architect_01</h4>
                  <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">L7_Verification_OK</p>
               </div>
               <div className="w-full pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div className="text-center"><div className="text-[8px] text-zinc-500 uppercase">Assets</div><div className="text-xl font-tech font-bold text-white">124</div></div>
                  <div className="text-center"><div className="text-[8px] text-zinc-500 uppercase">Nodes</div><div className="text-xl font-tech font-bold text-white">4.2k</div></div>
               </div>
            </div>
          );
        case 'NOTIF_TOAST':
          return (
            <div className="w-96 p-6 flex items-center gap-6 shadow-2xl animate-in slide-in-from-right-4 duration-500" style={{ ...baseStyle, backgroundColor: coreColor, border: '1px solid rgba(255,255,255,0.2)' }}>
               <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shrink-0 shadow-lg"><Bell className="w-6 h-6" /></div>
               <div className="flex-1">
                  <div className="text-xs font-black uppercase text-white tracking-widest">System_Alert</div>
                  <p className="text-[10px] text-white/60 font-light mt-1">Nodal sync completed in sector 0x88.</p>
               </div>
               <X className="w-4 h-4 text-white/20" />
            </div>
          );
        case 'DATA_CARD':
          return (
            <div className="w-80 h-96 p-10 flex flex-col justify-between shadow-2xl" style={{ ...baseStyle, backgroundColor: coreColor, border: '1px solid rgba(255,255,255,0.1)' }}>
               <div className="flex justify-between items-start">
                  <Cpu className="w-10 h-10 text-white/40" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
               </div>
               <div className="space-y-4">
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Node_Identity</div>
                  <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter leading-none">Quantum_Buffer</div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 animate-pulse w-3/4" />
                  </div>
               </div>
            </div>
          );
        case 'PRICING_TABLE':
          return (
            <div className="w-80 p-10 border-2 flex flex-col gap-10" style={{ ...baseStyle, backgroundColor: coreColor, borderColor: 'rgba(255,255,255,0.1)' }}>
               <div className="space-y-2">
                  <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Elite_Tier</div>
                  <h4 className="text-4xl font-tech font-bold text-white uppercase leading-none">0xPRO.</h4>
               </div>
               <ul className="space-y-4">
                  {['Infinite_VRAM', 'Global_Edge', 'L7_Shield'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 uppercase"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> {f}</li>
                  ))}
               </ul>
               <button className="w-full py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl">Initialize_Plan</button>
            </div>
          );
        case 'SEARCH_BAR':
          return (
            <div className="w-full max-w-2xl p-4 flex items-center gap-6 shadow-2xl" style={{ ...baseStyle, backgroundColor: coreColor, border: '1px solid rgba(255,255,255,0.1)' }}>
               <Search className="w-8 h-8 text-white/40 ml-4" />
               <input className="bg-transparent border-none outline-none flex-1 text-2xl font-light text-white placeholder:opacity-20" placeholder="Search_Lattice..." />
               <div className="px-6 py-3 bg-white/10 rounded-2xl border border-white/20 text-[10px] font-mono text-white">⌘ + K</div>
            </div>
          );
        default: return null;
      }
    };

    return (
      <div className="relative group/aberration">
         {/* Aberration Layer: Red */}
         {aberrationShift > 0 && (
           <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen" style={{ ...baseStyle, transform: `translate(${aberrationShift}px, ${aberrationShift}px) rotateX(${mousePos.y * 20}deg) rotateY(${mousePos.x * 20}deg)`, border: '1px solid #ef4444' }}>
              <div className="w-full h-full bg-rose-500/10" style={{ borderRadius: baseStyle.borderRadius }} />
           </div>
         )}
         {/* Aberration Layer: Blue */}
         {aberrationShift > 0 && (
           <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen" style={{ ...baseStyle, transform: `translate(${-aberrationShift}px, ${-aberrationShift}px) rotateX(${mousePos.y * 20}deg) rotateY(${mousePos.x * 20}deg)`, border: '1px solid #0ea5e9' }}>
              <div className="w-full h-full bg-sky-500/10" style={{ borderRadius: baseStyle.borderRadius }} />
           </div>
         )}
         
         {/* Main Component */}
         {renderContent()}

         {/* Noise Overlay */}
         <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30" style={{ 
            borderRadius: baseStyle.borderRadius,
            opacity: physics.noise,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
         }} />
      </div>
    );
  };

  return (
    <div className="space-y-32">
      {/* Intro */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-6">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em]">
              <Atom className="w-3 h-3" /> {t.atoms.tag}
           </div>
           <h2 className="text-[100px] md:text-[120px] font-tech font-bold text-zinc-900 dark:text-white uppercase leading-[0.8] tracking-tighter">
              {t.atoms.title} <br /><span className="text-indigo-500">{t.atoms.titleAccent}</span>
           </h2>
           <p className="text-xl font-light text-zinc-500 dark:text-zinc-400 max-w-xl">
              {t.atoms.desc}
           </p>
        </div>

        <div className={`p-10 rounded-[48px] border transition-all duration-700 w-full lg:w-72 flex flex-col gap-4 shadow-2xl ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-white border-black/5'}`}>
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Cohesion_v1.2</span>
              <Gauge className="w-4 h-4 text-emerald-500" />
           </div>
           <div className="text-5xl font-tech font-black text-zinc-900 dark:text-white tracking-tighter">
             {(0.992 - (physics.jitter * 0.005)).toFixed(3)}
           </div>
           <div className="text-[10px] font-mono text-indigo-500 uppercase">System_State: {physics.jitter > 5 ? 'STRESS_DET' : 'NOMINAL'}</div>
        </div>
      </div>

      {/* Lab Interface */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:min-h-[850px] p-1 rounded-[80px] border transition-all duration-1000
        ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-zinc-100 border-black/5 shadow-inner'}
      `}>
         
         {/* 1. REGISTRY SELECTOR */}
         <div className={`lg:col-span-3 p-12 border-r flex flex-col gap-10 overflow-y-auto custom-scroll ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-black/5'}`}>
            <div className="space-y-12">
               <div className="space-y-6">
                  <div className="flex items-center gap-3 text-zinc-500">
                     <Layout className="w-5 h-5" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">{t.atoms.basic}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                     {(['BUTTON', 'INPUT', 'BADGE', 'TOGGLE', 'SLIDER', 'PROGRESS', 'SEGMENT', 'CHECKBOX'] as UnitID[]).map(id => (
                       <button key={id} onClick={() => { setActiveUnit(id); playUISound('click'); }} className={`p-4 rounded-2xl border text-left flex justify-between items-center transition-all ${activeUnit === id ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}`}>
                          <span className="text-[9px] font-black uppercase">{id}</span>
                       </button>
                     ))}
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center gap-3 text-zinc-500">
                     <Component className="w-5 h-5" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">{t.atoms.compound}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                     {(['AUTH_FORM', 'SEARCH_BAR', 'DATA_CARD', 'PROFILE_CARD', 'NOTIF_TOAST', 'PRICING_TABLE'] as UnitID[]).map(id => (
                       <button key={id} onClick={() => { setActiveUnit(id); playUISound('click'); }} className={`p-4 rounded-2xl border text-left flex justify-between items-center transition-all ${activeUnit === id ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}`}>
                          <span className="text-[10px] font-black uppercase">{id.replace('_', ' ')}</span>
                          <ChevronRight className={`w-4 h-4 transition-all ${activeUnit === id ? 'opacity-100 translate-x-1' : 'opacity-0'}`} />
                       </button>
                     ))}
                  </div>
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
               <div className="flex items-center gap-3 text-indigo-500">
                  <Terminal className="w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Logic_Kernel</span>
               </div>
               <div className="font-mono text-[8px] text-zinc-600 space-y-1">
                  <div> INIT_UNIT_{activeUnit}</div>
                  <div> SYNC_HUE_{physics.hue}</div>
                  <div className="text-indigo-500 animate-pulse"> AWAITING_AI_CALIB_</div>
               </div>
            </div>
         </div>

         {/* 2. THE VIEWPORT (FORGE) */}
         <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="lg:col-span-6 bg-black relative overflow-hidden flex items-center justify-center p-12 group cursor-crosshair shadow-inner"
         >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            
            <div className="relative w-full h-full flex items-center justify-center perspective-2000 preserve-3d">
               {renderUnit()}

               {/* Force Vector Display */}
               <div className="absolute top-1/2 left-1/2 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                  <div className="w-[1px] h-32 bg-gradient-to-t from-indigo-500 to-transparent origin-bottom" style={{ transform: `rotateX(${-mousePos.y * 360}deg) rotateY(${mousePos.x * 360}deg)` }} />
               </div>
            </div>

            {/* Diagnostic HUD Scanline */}
            <div className={`absolute inset-0 z-50 pointer-events-none overflow-hidden transition-opacity duration-1000 ${isSynthesizing ? 'opacity-100' : 'opacity-0'}`}>
               <div className="w-full h-[2px] bg-indigo-500 shadow-[0_0_20px_#6366f1] animate-[scan_2s_linear_infinite]" />
            </div>

            <div className="absolute bottom-12 right-12 text-right opacity-40">
               <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-black mb-1">Matter_State: {isPressed ? 'ACTIVE_COMP' : 'RESTING'}</div>
               <div className="text-[8px] font-mono text-zinc-700 uppercase">JIT_PTR: [{mousePos.x.toFixed(3)}, {mousePos.y.toFixed(3)}]</div>
            </div>

            <div className="absolute top-12 left-12">
               <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900 border border-white/10 rounded-full shadow-2xl">
                  <Activity className="w-3 h-3 text-indigo-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-zinc-400 uppercase font-black">Lattice_Field: ACTIVE</span>
               </div>
            </div>
         </div>

         {/* 3. CALIBRATION PULPIT */}
         <div className={`lg:col-span-3 p-12 border-l flex flex-col gap-8 ${isDark ? 'bg-[#0a0a0c] border-white/5' : 'bg-zinc-50 border-black/5'}`}>
            <div className="space-y-6">
               <div className="flex items-center gap-3 text-indigo-500">
                  <SlidersIcon className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{t.atoms.calibration}</span>
               </div>

               <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2 custom-scroll">
                  {[
                    { label: 'Blur_Intensity', key: 'blur', min: 0, max: 64, step: 1, icon: Wind },
                    { label: 'Refraction_Index', key: 'refraction', min: 0, max: 0.8, step: 0.01, icon: Waves },
                    { label: 'Matter_Mass', key: 'mass', min: 0.1, max: 2, step: 0.05, icon: Box },
                    { label: 'Edge_Sharpness', key: 'radius', min: 0, max: 100, step: 1, icon: Target },
                    { label: 'Spectral_Hue', key: 'hue', min: 0, max: 360, step: 1, icon: Sparkles },
                    { label: 'RGB_Aberration', key: 'aberration', min: 0, max: 40, step: 1, icon: AlertTriangle },
                    { label: 'Quantum_Jitter', key: 'jitter', min: 0, max: 10, step: 0.1, icon: Activity },
                    { label: 'Internal_Noise', key: 'noise', min: 0, max: 0.2, step: 0.001, icon: Radio }
                  ].map(ctrl => (
                    <div key={ctrl.key} className="space-y-3 group/ctrl">
                       <div className="flex justify-between text-[8px] font-mono text-zinc-500 uppercase font-black group-hover/ctrl:text-indigo-400 transition-colors">
                          <span className="flex items-center gap-2"><ctrl.icon className="w-3 h-3" /> {ctrl.label}</span>
                          <span className="text-indigo-500">{(physics as any)[ctrl.key]}</span>
                       </div>
                       <input 
                         type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={(physics as any)[ctrl.key]}
                         onChange={e => setPhysics({...physics, [ctrl.key]: parseFloat(e.target.value)})}
                         className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
                       />
                    </div>
                  ))}
               </div>
            </div>

            <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/5 space-y-4">
               <button 
                 onClick={runAISynthesis}
                 disabled={isSynthesizing}
                 className={`w-full py-5 rounded-[32px] font-black text-[9px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95
                   ${isSynthesizing ? 'bg-zinc-800 text-zinc-600' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/20'}
                 `}
               >
                  {isSynthesizing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                  {t.atoms.aibtn}
               </button>
               <div className="flex items-center gap-3 text-[8px] font-mono text-zinc-700 uppercase tracking-tighter">
                  <Activity className="w-3 h-3" /> System: Gemini-3-Pro-Preview
               </div>
            </div>
         </div>
      </div>

      <style>{`
        @keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

const X = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
