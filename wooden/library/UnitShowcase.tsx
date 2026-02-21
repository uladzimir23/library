
import React, { useState, useContext, useRef, useEffect } from 'react';
import { 
  Zap, Maximize2, Shield, X, AlertTriangle, 
  ChevronDown, ChevronUp, Bell, Info, 
  Settings, Sliders, Activity, MousePointer2,
  CheckCircle2, Share2, Layers, Cpu, Target, Sparkle,
  MoreVertical, Plus, Minus, Command, LayoutGrid, 
  Droplets, Waves, Box, ArrowRight, Compass,
  Check, Search, ListTodo, Layers3, Fingerprint,
  Radio, Database, Workflow, Smartphone, Monitor,
  Sun, Moon, Globe, Wind, Gauge, Disc, RefreshCw,
  Lock, Unlock, Target as TargetIcon, Magnet, 
  ArrowLeftRight, ZapOff, Fingerprint as TouchIcon,
  SearchCode, Ghost, Key,
  ChevronRight, ShieldCheck, Terminal, 
  Binary, MoveVertical, RotateCw, Orbit, 
  Eye, Scan, Dna, Flame, Heart, Atom,
  Cloud, Filter, Scissors, Diamond, Pocket,
  SunMedium, Radiation, Ghost as GhostIcon
} from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../components/AudioService';

// --- v2.9 SHARED COMPONENTS ---

const SpatialSearch: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-zinc-900/80 border border-white/10 rounded-[40px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
         <div className="flex items-center gap-4 mb-8 text-indigo-500">
            <Search className="w-6 h-6" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-black">Spatial_Registry_Search</span>
         </div>
         <input 
           autoFocus
           type="text" 
           placeholder="Search_Nodes..." 
           className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-2xl font-light text-white outline-none focus:border-indigo-500/50 transition-all"
         />
         <div className="mt-8 flex justify-between items-center text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
            <span>Press ESC to exit</span>
            <span>Refraction: ACTIVE</span>
         </div>
      </div>
    </div>
  );
};

// --- v2.9 NEW: SPECULAR LUSTER CORE ---
const SpecularLusterCore: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 500, y: 250 });
  const [shininess, setShininess] = useState(40);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="w-full h-[500px] bg-[#020204] rounded-[64px] border border-white/5 relative overflow-hidden flex items-center justify-center shadow-2xl group cursor-crosshair"
    >
       <svg className="absolute w-0 h-0">
          <filter id="specular-luster">
             <feSpecularLighting surfaceScale="5" specularConstant="1.2" specularExponent={shininess} lightingColor="#fff" result="specOut">
                <fePointLight x={mousePos.x} y={mousePos.y} z="150" />
             </feSpecularLighting>
             <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
       </svg>

       <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#6366f1 1.5px, transparent 1px)', backgroundSize: '40px 40px' }} />

       <div className="relative" style={{ filter: 'url(#specular-luster)' }}>
          <div className="w-80 h-80 bg-indigo-900/40 border border-indigo-500/30 rounded-[100px] flex flex-col items-center justify-center p-12 transition-all duration-700">
             <Diamond className="w-20 h-20 text-indigo-400 mb-6 drop-shadow-[0_0_20px_rgba(129,140,248,0.4)]" />
             <div className="text-center space-y-2">
                <div className="text-[10px] font-mono text-indigo-300 uppercase tracking-[0.4em] font-black">Reflective_Matter</div>
                <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter">Polished_Slab</div>
             </div>
          </div>
       </div>

       <div className="absolute bottom-12 left-12 space-y-4">
          <div className="flex items-center gap-3">
             <SunMedium className="w-4 h-4 text-amber-500 animate-pulse" />
             <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Light_Source_Z: 150u</span>
          </div>
          <div className="w-48">
             <input type="range" min="10" max="120" value={shininess} onChange={e => setShininess(parseInt(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none accent-amber-500" />
          </div>
       </div>
    </div>
  );
};

// --- v2.9 NEW: QUANTIZED LOGIC FIELD ---
const QuantizedLogicField: React.FC = () => {
  const [steps, setSteps] = useState(4);

  const tableValues = Array.from({ length: steps }).map((_, i) => (i / (steps - 1)).toFixed(2)).join(' ');

  return (
    <div className="w-full h-[500px] bg-zinc-950 rounded-[64px] border border-white/5 relative overflow-hidden flex items-center justify-center shadow-2xl group">
       <svg className="absolute w-0 h-0">
          <filter id="quantize-filter">
             <feComponentTransfer>
                <feFuncR type="discrete" tableValues={tableValues} />
                <feFuncG type="discrete" tableValues={tableValues} />
                <feFuncB type="discrete" tableValues={tableValues} />
             </feComponentTransfer>
          </filter>
       </svg>

       <div className="absolute inset-0 opacity-20" style={{ 
          background: 'radial-gradient(circle at 30% 30%, #4f46e5 0%, transparent 60%), radial-gradient(circle at 70% 70%, #ec4899 0%, transparent 60%)',
          filter: 'url(#quantize-filter)' 
       }} />

       <div className="relative z-10 space-y-12 text-center" style={{ filter: 'url(#quantize-filter)' }}>
          <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl rotate-12 group-hover:rotate-[102deg] transition-transform duration-1000">
             <Binary className="w-16 h-16 text-black" />
          </div>
          <div className="space-y-4">
             <h4 className="text-6xl font-tech font-bold text-white uppercase tracking-tighter">DISCRETE_LOGIC</h4>
             <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.6em] font-black">Bit_Depth_Reduction: {steps} Levels</div>
          </div>
       </div>

       <div className="absolute top-12 right-12 flex flex-col items-end gap-6">
          <button onClick={() => setSteps(Math.max(2, steps - 1))} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-indigo-600 transition-colors"><Minus className="w-4 h-4 text-white" /></button>
          <button onClick={() => setSteps(Math.min(10, steps + 1))} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-indigo-600 transition-colors"><Plus className="w-4 h-4 text-white" /></button>
       </div>
    </div>
  );
};

// --- v2.9 NEW: SPECTRAL SHADOW STACK ---
const SpectralShadowStack: React.FC = () => {
  const [offset, setOffset] = useState(20);

  return (
    <div className="w-full h-[550px] bg-[#fdfdfe] dark:bg-[#08080a] rounded-[64px] border border-black/5 dark:border-white/5 relative overflow-hidden flex items-center justify-center shadow-2xl transition-colors duration-1000">
       <svg className="absolute w-0 h-0">
          <filter id="spectral-shadow">
             <feDropShadow dx={offset} dy={offset} stdDeviation="15" floodColor="#6366f1" floodOpacity="0.4" result="shadow1" />
             <feDropShadow dx={-offset} dy={-offset} stdDeviation="15" floodColor="#f43f5e" floodOpacity="0.4" result="shadow2" />
             <feBlend in="shadow1" in2="shadow2" mode="screen" />
          </filter>
       </svg>

       <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

       <div className="relative" style={{ filter: 'url(#spectral-shadow)' }}>
          <div className="w-64 h-64 bg-zinc-900 dark:bg-white rounded-[48px] flex flex-col items-center justify-center p-8 transition-transform duration-700 hover:scale-105">
             <GhostIcon className="w-16 h-16 text-white dark:text-zinc-900 mb-4 animate-bounce" />
             <div className="text-center">
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black">Occlusion_v2.4</div>
                <div className="text-xl font-tech font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-tighter">Phasing_Object</div>
             </div>
          </div>
       </div>

       <div className="absolute bottom-12 right-12 w-64 space-y-4">
          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest">
             <span>Shadow_Drift</span>
             <span className="text-rose-500">{offset}px</span>
          </div>
          <input type="range" min="5" max="80" value={offset} onChange={e => setOffset(parseInt(e.target.value))} className="w-full h-1 bg-black/5 dark:bg-white/10 rounded-full appearance-none accent-rose-500 cursor-pointer" />
       </div>
    </div>
  );
};

// --- v2.9 NEW: CHROMATIC DISPLACEMENT FIELD ---
const ChromaticDisplacementField: React.FC = () => {
  const [velocity, setVelocity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    const v = Math.sqrt(dx * dx + dy * dy);
    setVelocity(prev => Math.min(prev + v * 0.1, 40));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const decay = setInterval(() => setVelocity(v => Math.max(0, v - 1.5)), 30);
    return () => clearInterval(decay);
  }, []);

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="w-full h-[500px] bg-zinc-950 rounded-[64px] border border-white/5 relative overflow-hidden flex items-center justify-center group cursor-none shadow-2xl"
    >
       <svg className="absolute w-0 h-0">
          <filter id="chromatic-split">
             <feOffset in="SourceGraphic" dx={velocity * 0.4} dy="0" result="red" />
             <feColorMatrix in="red" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="redOnly" />
             
             <feOffset in="SourceGraphic" dx={-velocity * 0.2} dy="0" result="blue" />
             <feColorMatrix in="blue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blueOnly" />

             <feBlend in="redOnly" in2="blueOnly" mode="screen" result="split" />
             <feBlend in="split" in2="SourceGraphic" mode="screen" />
          </filter>
       </svg>

       <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
       
       <div className="text-center space-y-8" style={{ filter: 'url(#chromatic-split)' }}>
          <div className="w-32 h-32 rounded-[40px] bg-indigo-600 flex items-center justify-center text-white shadow-2xl mx-auto transition-transform duration-75" style={{ transform: `scale(${1 + velocity * 0.005})` }}>
             <Zap className="w-12 h-12" />
          </div>
          <h4 className="text-6xl font-tech font-bold text-white uppercase tracking-widest">KINETIC_SPECTRUM</h4>
       </div>

       <div className="absolute bottom-12 left-12 flex items-center gap-4">
          <div className={`w-2 h-2 rounded-full ${velocity > 10 ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Spectral_Drift: {velocity.toFixed(2)}nm</span>
       </div>
    </div>
  );
};

// --- v2.9 NEW: REFRACTIVE TURBULENCE CORE ---
const RefractiveTurbulenceCore: React.FC = () => {
  const [intensity, setIntensity] = useState(20);

  return (
    <div className="w-full h-[600px] bg-[#050507] rounded-[64px] border border-white/5 relative overflow-hidden flex items-center justify-center shadow-2xl">
       <svg className="absolute w-0 h-0">
          <filter id="refractive-turb">
             <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" result="noise">
                <animate attributeName="baseFrequency" dur="10s" values="0.01 0.05; 0.02 0.1; 0.01 0.05" repeatCount="indefinite" />
             </feTurbulence>
             <feDisplacementMap in="SourceGraphic" in2="noise" scale={intensity} />
          </filter>
       </svg>

       {/* Background Grid that gets distorted */}
       <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          filter: 'url(#refractive-turb)'
       }} />

       <div className="relative z-10 space-y-12 text-center">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/20 backdrop-blur-3xl flex items-center justify-center mx-auto shadow-2xl" style={{ filter: 'url(#refractive-turb)' }}>
             <Droplets className="w-10 h-10 text-sky-400" />
          </div>
          <div className="space-y-4">
             <div className="text-[9px] font-mono text-sky-500 uppercase tracking-[0.5em] font-black">Refraction_Engine_v12</div>
             <div className="text-4xl font-tech font-bold text-white uppercase tracking-tighter">Liquid_Lattice_0x88</div>
          </div>
          <div className="max-w-xs mx-auto">
             <input type="range" min="0" max="100" value={intensity} onChange={e => setIntensity(parseInt(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none accent-sky-500 cursor-pointer" />
          </div>
       </div>
    </div>
  );
};

// --- v2.9 NEW: MORPHOLOGY FORGE ---
const MorphologyForge: React.FC = () => {
  const [growth, setGrowth] = useState(0); // -10 to 10

  return (
    <div className="w-full h-[500px] bg-zinc-900 rounded-[64px] border border-white/5 relative overflow-hidden flex items-center justify-center shadow-2xl">
       <svg className="absolute w-0 h-0">
          <filter id="morph-forge">
             <feMorphology operator={growth >= 0 ? "dilate" : "erode"} radius={Math.abs(growth)} />
          </filter>
       </svg>

       <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

       <div className="relative z-10 flex flex-col items-center gap-16">
          <div className="relative" style={{ filter: 'url(#morph-forge)' }}>
             <div className="w-40 h-40 bg-rose-500 rounded-[32px] flex items-center justify-center text-white shadow-2xl">
                <Box className="w-16 h-16" />
             </div>
          </div>

          <div className="w-full max-w-sm space-y-6">
             <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
                <span>Erode</span>
                <span className="text-rose-500">LOD_Shift: {growth}px</span>
                <span>Dilate</span>
             </div>
             <input 
               type="range" min="-8" max="8" step="0.5" value={growth} 
               onChange={e => { setGrowth(parseFloat(e.target.value)); playUISound('click'); }} 
               className="w-full h-1 bg-white/5 rounded-full appearance-none accent-rose-500 cursor-pointer" 
             />
          </div>
       </div>

       <div className="absolute top-12 left-12 flex items-center gap-3">
          <RefreshCw className="w-4 h-4 text-rose-500 animate-spin-slow" />
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black">Morphology_Processor: READY</span>
       </div>
    </div>
  );
};

// --- v2.9 NEW: NEURAL REFRACTIVE INPUT ---
const NeuralRefractiveInput: React.FC = () => {
  const [val, setVal] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <div onMouseMove={handleMouseMove} className="relative group w-full">
       <div className={`absolute -inset-4 bg-indigo-500/10 blur-[40px] rounded-[40px] transition-opacity duration-700 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
       <div className={`relative bg-black/60 border transition-all duration-700 rounded-[32px] p-2 flex items-center shadow-2xl overflow-hidden ${isFocused ? 'border-indigo-500/50 scale-[1.02]' : 'border-white/5'}`}
            style={{ transform: `perspective(1000px) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)` }}>
          <div className={`p-5 rounded-2xl transition-colors duration-500 ${isFocused ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white/5 text-zinc-600'}`}>
             <Terminal className="w-6 h-6" />
          </div>
          <input type="text" value={val} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onChange={(e) => { setVal(e.target.value); playUISound('glass'); }} placeholder="Neural_Query_Stream..." className="bg-transparent border-none outline-none flex-1 px-6 text-xl font-tech text-white placeholder:text-zinc-800 tracking-wider" />
          {val && (
            <div className="px-6 py-2 bg-indigo-500/20 rounded-xl mr-4 animate-in fade-in zoom-in duration-300">
               <span className="text-[8px] font-mono text-indigo-400 uppercase font-black tracking-widest">{val.length}_BITS</span>
            </div>
          )}
       </div>
    </div>
  );
};

const IonFlowToggle: React.FC = () => {
  const [active, setActive] = useState(false);
  return (
    <div onClick={() => { setActive(!active); playUISound(active ? 'click' : 'success'); }} className={`relative w-24 h-24 rounded-full border-4 transition-all duration-700 cursor-pointer flex items-center justify-center group ${active ? 'bg-indigo-600 border-white shadow-[0_0_60px_rgba(99,102,241,0.6)] scale-110' : 'bg-zinc-900/50 border-white/10 hover:border-white/20'}`}>
       <div className={`absolute inset-2 border-2 border-dashed rounded-full transition-all duration-[2000ms] ${active ? 'animate-spin-slow border-white/40' : 'border-transparent'}`} />
       <Atom className={`w-10 h-10 transition-all duration-700 ${active ? 'text-white rotate-180 scale-125' : 'text-zinc-700 group-hover:text-zinc-500'}`} />
    </div>
  );
};

const GeneticStepper: React.FC = () => {
  const [step, setStep] = useState(1);
  const fib = [13, 21, 34, 55];
  return (
    <div className="flex flex-col gap-4 w-full">
       {[1, 2, 3, 4].map((i, idx) => {
         const isActive = step >= i;
         return (
           <div key={i} onClick={() => { setStep(i); playUISound('click'); }} className={`relative transition-all duration-700 cursor-pointer group flex items-center gap-6 p-4 rounded-[24px] border ${isActive ? 'bg-white/5 border-indigo-500/40 opacity-100 shadow-xl' : 'bg-transparent border-transparent opacity-20 hover:opacity-40'}`} style={{ marginBottom: `${(4 - idx) * 2}px`, paddingLeft: `${fib[idx]}px` }}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-black transition-all duration-500 ${isActive ? 'bg-indigo-600 text-white shadow-[0_0_20px_#6366f1]' : 'bg-zinc-800 text-zinc-600'}`}>0{i}</div>
              <div className="flex-1 space-y-2">
                 <div className="flex justify-between items-center pr-4"><span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Node_Calibration_{i}</span>{isActive && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}</div>
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden"><div className={`h-full bg-indigo-500 transition-all duration-[1500ms] ease-out ${isActive ? 'w-full' : 'w-0'}`} /></div>
              </div>
           </div>
         );
       })}
    </div>
  );
};

const PressurePad: React.FC = () => {
  const [pressure, setPressure] = useState(0);
  return (
    <div onMouseDown={() => { setPressure(1); playUISound('heavy'); }} onMouseUp={() => setPressure(0)} onMouseLeave={() => setPressure(0)} className="relative w-full h-48 bg-zinc-900 border-4 border-zinc-800 rounded-[48px] cursor-pointer flex items-center justify-center transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] overflow-hidden">
       <div className="absolute inset-4 rounded-[40px] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 transition-all duration-200 shadow-2xl flex flex-col items-center justify-center gap-4" style={{ transform: `translateZ(${pressure * -20}px) scale(${1 - pressure * 0.05})`, backgroundColor: pressure > 0 ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)' }}>
          <Fingerprint className={`w-12 h-12 transition-all duration-300 ${pressure > 0 ? 'text-indigo-500 scale-110' : 'text-zinc-600'}`} />
          <div className="text-center"><div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Hold_To_Authorize</div><div className="text-xs font-tech font-bold text-white uppercase mt-1">L7_Pressure_Seal</div></div>
       </div>
    </div>
  );
};

const BiologicalFluxOrb: React.FC = () => {
  const [intensity, setIntensity] = useState(60);
  const [viscosity, setViscosity] = useState(0.4);
  const [isSurging, setIsSurging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const GOLDEN_ANGLE = 137.508;
  const PHI = 1.618033;

  useEffect(() => {
    let frame: number;
    const animate = () => { setTime(t => t + (isSurging ? 0.08 : 0.015)); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isSurging]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 });
  };

  const triggerSurge = () => {
    if (isSurging) return;
    setIsSurging(true); playUISound('heavy');
    setTimeout(() => { setIsSurging(false); playUISound('success'); }, 2500);
  };

  const coreColor = isSurging ? '#fb923c' : '#f43f5e';

  return (
    <div className="flex flex-col items-center gap-12 group w-full max-w-2xl select-none">
       <svg className="absolute w-0 h-0"><filter id="flux-goo-v2.9"><feGaussianBlur in="SourceGraphic" stdDeviation={18 * (1 - viscosity)} result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" /></filter></svg>
       <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => setMousePos({ x: 0, y: 0 })} onClick={triggerSurge} className="relative w-[450px] h-[450px] flex items-center justify-center cursor-none perspective-2000">
          <div className="absolute inset-0 rounded-full transition-all duration-1000 opacity-[0.12] blur-[120px]" style={{ backgroundColor: coreColor, transform: `scale(${1.2 + (intensity/120)} ) translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }} />
          <div className="relative w-full h-full flex items-center justify-center" style={{ filter: 'url(#flux-goo-v2.9)' }}>
             <div className="w-44 h-44 rounded-full transition-all duration-700 ease-out relative z-20 flex items-center justify-center" style={{ backgroundColor: coreColor, transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px) scale(${0.9 + Math.sin(time * 1.5) * 0.04 + (isSurging ? 0.15 : 0)})`, boxShadow: `0 0 80px ${coreColor}44` }}>
                <div className="w-16 h-16 bg-white/20 rounded-full blur-xl animate-pulse" style={{ transform: `translate(${Math.cos(time) * 10}px, ${Math.sin(time) * 10}px)` }} />
             </div>
             {[...Array(8)].map((_, i) => {
               const index = i + 1; const angle = index * GOLDEN_ANGLE + (time * 5); const distance = (Math.sqrt(index) * 45) + (intensity * 0.5);
               const driftX = Math.sin(time + index * PHI) * 12; const driftY = Math.cos(time * 0.8 + index) * 12;
               return <div key={i} className="absolute w-20 h-20 rounded-full opacity-80 transition-all duration-1000 ease-out" style={{ backgroundColor: coreColor, transform: `rotate(${angle}deg) translateY(${distance + (isSurging ? 40 : 0)}px) rotate(${-angle}deg) translate(${driftX + (mousePos.x * 120 / index)}px, ${driftY + (mousePos.y * 120 / index)}px) scale(${0.4 + (Math.sin(time + index) * 0.1) + (1 / (index + 2))})`, filter: `brightness(${0.7 + (i * 0.05)}) saturate(${0.8 + (i * 0.1)})` }} />;
             })}
          </div>
       </div>
    </div>
  );
};

const CognitiveTopologyField: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const nodes = useRef(Array.from({ length: 12 }).map(() => ({ x: Math.random() * 100, y: Math.random() * 100, id: Math.random() }))).current;
  const handleMouseMove = (e: React.MouseEvent) => { const rect = containerRef.current?.getBoundingClientRect(); if (rect) setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 }); };
  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="w-full h-[500px] bg-[#020203] rounded-[64px] border border-white/5 relative overflow-hidden group cursor-crosshair shadow-2xl">
       <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#6366f1 1.5px, transparent 1px)', backgroundSize: '40px 40px' }} />
       <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          {nodes.map((node, i) => { const dist = Math.hypot(node.x - mousePos.x, node.y - mousePos.y); const active = dist < 25; return <g key={node.id}>{active && <line x1={`${node.x}%`} y1={`${node.y}%`} x2={`${mousePos.x}%`} y2={`${mousePos.y}%`} stroke="#6366f1" strokeWidth={1.5 * (1 - dist/25)} strokeDasharray="4 4" className="animate-pulse" />}<circle cx={`${node.x}%`} cy={`${node.y}%`} r={active ? 4 : 2} fill={active ? "#6366f1" : "#1e1e24"} className="transition-all duration-500" /></g>; })}
       </svg>
    </div>
  );
};

const VolumetricZScanner: React.FC = () => {
  const [depth, setDepth] = useState(50);
  return (
    <div className="flex gap-12 w-full h-[600px] items-stretch">
       <div className="w-24 bg-zinc-900 border border-white/5 rounded-full p-4 flex flex-col items-center justify-between shadow-inner">
          <div className="flex-1 relative w-1 bg-white/5 rounded-full my-8">
             <div className="absolute bottom-0 w-full bg-indigo-500 transition-all duration-300 shadow-[0_0_20px_#6366f1]" style={{ height: `${depth}%` }} />
             <input type="range" min="0" max="100" value={depth} onChange={e => setDepth(parseInt(e.target.value))} className="absolute inset-0 opacity-0 cursor-ns-resize" style={{ writingMode: 'bt-lr' as any }} />
          </div>
          <div className="text-xl font-tech font-bold text-white">{depth}%</div>
       </div>
       <div className="flex-1 bg-black rounded-[64px] border border-white/5 relative overflow-hidden flex items-center justify-center perspective-2000 shadow-2xl">
          <div className="relative w-80 h-96 preserve-3d transition-transform duration-1000 ease-out rotate-X-12">
             {[0, 1, 2, 3, 4].map(i => <div key={i} className={`absolute inset-0 border-2 rounded-[56px] transition-all duration-700 ${Math.abs(depth/20 - i) < 0.5 ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_100px_rgba(99,102,241,0.2)] scale-105 opacity-100 z-20' : 'border-white/5 bg-white/[0.01] opacity-20 z-10'}`} style={{ transform: `translateZ(${(i - 2) * 80}px)` }}><div className="h-full flex items-center justify-center">{Math.abs(depth/20 - i) < 0.5 ? <Scan className="w-12 h-12 text-indigo-400 animate-pulse" /> : <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />}</div></div>)}
          </div>
       </div>
    </div>
  );
};

const MechanicalInputCluster: React.FC = () => {
  const [knob, setKnob] = useState(45); const [fader, setFader] = useState(60);
  return (
    <div className="w-full bg-[#0d0d0f] rounded-[80px] border-4 border-zinc-900 p-16 flex flex-col md:flex-row gap-20 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] relative">
       <div className="flex-1 space-y-12">
          <div className="flex gap-12 items-center">
             <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-[#1a1a1e] border-4 border-zinc-800 shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(255,255,255,0.05)] cursor-ns-resize flex items-center justify-center transition-transform active:scale-95" style={{ transform: `rotate(${knob * 2}deg)` }} onMouseMove={(e) => e.buttons === 1 && setKnob(prev => (prev + e.movementX) % 180)}>
                   <div className="absolute top-4 w-1.5 h-4 bg-indigo-500 rounded-full shadow-[0_0_15px_#6366f1]" /><RotateCw className="w-8 h-8 text-zinc-800" />
                </div>
                <div className="mt-6 text-center"><div className="text-xl font-tech font-bold text-white">{knob.toFixed(0)}Hz</div></div>
             </div>
             <div className="flex-1 h-32 flex items-center gap-8 px-10 bg-black/40 rounded-[40px] border border-white/5">
                <div className="flex-1 h-2 bg-zinc-900 rounded-full relative overflow-hidden border border-white/5"><div className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981] transition-all" style={{ width: `${fader}%` }} /><input type="range" min="0" max="100" value={fader} onChange={e => setFader(parseInt(e.target.value))} className="absolute inset-0 opacity-0 cursor-pointer" /></div>
                <div className="text-2xl font-tech font-bold text-emerald-500">{fader}%</div>
             </div>
          </div>
       </div>
    </div>
  );
};

const NeuralCommandHub: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       {[{ icon: LayoutGrid, label: 'Matrix_View', val: '0xFF.A' }, { icon: Shield, label: 'L7_Guard', val: 'SECURE' }, { icon: Activity, label: 'Pulse_Sync', val: '0.04ms' }].map((item, i) => (
         <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-3xl shadow-2xl flex flex-col gap-8 transition-all hover:border-indigo-500/30"><div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500"><item.icon className="w-6 h-6" /></div><div><div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{item.label}</div><div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter">{item.val}</div></div></div>
       ))}
    </div>
  );
};

const InertialSnapDrive: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 }); const [isDragging, setIsDragging] = useState(false);
  return (
    <div className="h-[400px] bg-black/20 rounded-[64px] border border-white/5 flex items-center justify-center relative overflow-hidden group">
       <div onMouseDown={() => { setIsDragging(true); playUISound('click'); }} onMouseMove={(e) => { if (!isDragging) return; setOffset(prev => ({ x: prev.x + e.movementX, y: prev.y + e.movementY })); }} onMouseUp={() => { setIsDragging(false); setOffset({ x: 0, y: 0 }); }} onMouseLeave={() => { setIsDragging(false); setOffset({ x: 0, y: 0 }); }} className="relative w-64 h-48 bg-white/5 border border-white/20 rounded-[40px] backdrop-blur-3xl shadow-2xl flex flex-col items-center justify-center gap-4 transition-transform duration-1000 ease-out cursor-grab active:cursor-grabbing" style={{ transform: `translate(${offset.x}px, ${offset.y}px) rotateX(${-offset.y * 0.1}deg) rotateY(${offset.x * 0.1}deg)` }}><Disc className={`w-10 h-10 text-indigo-500 ${isDragging ? 'animate-spin' : ''}`} /><div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Mass: 1.24kg</div></div>
    </div>
  );
};

// --- MAIN SHOWCASE ---
export const UnitShowcase: React.FC<{ theme: string }> = ({ theme }) => {
  const { t } = useContext(LanguageContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="space-y-48 animate-in fade-in duration-1000 pb-40 px-4">
      <SpatialSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* 1. HERO */}
      <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
        <div className="space-y-6">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em]">
              <Layers3 className="w-3 h-3" /> {t.showcaseV2.tag}
           </div>
           <h2 className="text-[100px] md:text-[120px] font-tech font-bold text-zinc-900 dark:text-white uppercase leading-[0.8] tracking-tighter">
              Unit <br /><span className="text-indigo-500">Showcase.</span>
           </h2>
           <p className="text-xl font-light text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
              Коллекция прецизионных пространственных компонентов, объединяющих физику материи и нейронный отклик.
           </p>
        </div>
        <div className="p-10 bg-zinc-900/40 rounded-[56px] border border-white/5 flex items-center gap-12 shadow-2xl backdrop-blur-3xl">
           <div className="space-y-1"><div className="text-[9px] font-mono text-zinc-500 uppercase font-black">Visual_Cohesion</div><div className="text-3xl font-tech font-bold text-emerald-500 tracking-widest">ULTRA_LOD</div></div>
           <div className="w-px h-16 bg-white/5" />
           <Sparkle className="w-12 h-12 text-indigo-500 animate-spin-slow" />
        </div>
      </div>

      {/* 2. SPECULAR LUSTER CORE (NEW) */}
      <section className="space-y-24">
         <div className="flex items-center justify-between border-b border-white/5 pb-8 px-4">
            <div className="flex items-center gap-4"><SunMedium className="w-8 h-8 text-amber-500" /><h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">Specular_Luster</h3></div>
         </div>
         <SpecularLusterCore />
      </section>

      {/* 3. QUANTIZED LOGIC FIELD (NEW) */}
      <section className="space-y-24">
         <div className="flex items-center justify-between border-b border-white/5 pb-8 px-4">
            <div className="flex items-center gap-4"><Radiation className="w-8 h-8 text-indigo-500" /><h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">Quantized_Logic</h3></div>
         </div>
         <QuantizedLogicField />
      </section>

      {/* 4. SPECTRAL SHADOW STACK (NEW) */}
      <section className="space-y-24">
         <div className="flex items-center justify-between border-b border-white/5 pb-8 px-4">
            <div className="flex items-center gap-4"><GhostIcon className="w-8 h-8 text-rose-500" /><h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">Spectral_Shadow</h3></div>
         </div>
         <SpectralShadowStack />
      </section>

      {/* 5. CHROMATIC DISPLACEMENT FIELD (v2.9 NEW) */}
      <section className="space-y-24">
         <div className="flex items-center justify-between border-b border-white/5 pb-8 px-4">
            <div className="flex items-center gap-4"><Filter className="w-8 h-8 text-rose-500" /><h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">Chromatic_Displacement</h3></div>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ChromaticDisplacementField />
            <div className="p-12 bg-white/5 border border-white/10 rounded-[64px] space-y-8 backdrop-blur-xl">
               <div className="flex items-center gap-4 text-rose-500"><Zap className="w-6 h-6" /><span className="text-[10px] font-mono font-black uppercase">Spectral_Decomposition</span></div>
               <p className="text-lg font-light text-zinc-500 leading-relaxed italic">
                  Демонстрация квантового расслоения цвета через <code>feColorMatrix</code>. При быстром движении пиксели разбиваются на RGB-каналы, визуализируя кинетическую энергию взаимодействия.
               </p>
               <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                  <div><div className="text-[8px] text-zinc-600 uppercase mb-1">Split_Baud</div><div className="text-xl font-tech font-bold text-white">0.92_NM</div></div>
                  <div><div className="text-[8px] text-zinc-600 uppercase mb-1">Color_Space</div><div className="text-xl font-tech font-bold text-white">sRGB_Bypassed</div></div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. REFRACTIVE TURBULENCE CORE (v2.9 NEW) */}
      <section className="space-y-24">
         <div className="flex items-center justify-between border-b border-white/5 pb-8 px-4">
            <div className="flex items-center gap-4"><Waves className="w-8 h-8 text-sky-500" /><h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">Turbulence_Refraction</h3></div>
         </div>
         <RefractiveTurbulenceCore />
      </section>

      {/* 7. MORPHOLOGY FORGE (v2.9 NEW) */}
      <section className="space-y-24">
         <div className="flex items-center justify-between border-b border-white/5 pb-8 px-4">
            <div className="flex items-center gap-4"><Scissors className="w-8 h-8 text-rose-500" /><h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">Morphology_Forge</h3></div>
         </div>
         <MorphologyForge />
      </section>

      {/* 8. COGNITIVE TOPOLOGY FIELD (RESTORED) */}
      <section className="space-y-24">
         <div className="flex items-center justify-between border-b border-white/5 pb-8 px-4">
            <div className="flex items-center gap-4"><Workflow className="w-8 h-8 text-indigo-500" /><h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">Cognitive_Topology</h3></div>
         </div>
         <CognitiveTopologyField />
      </section>

      {/* 9. VOLUMETRIC Z-SCANNER (RESTORED) */}
      <section className="space-y-24">
         <div className="flex items-center justify-between border-b border-white/5 pb-8 px-4">
            <div className="flex items-center gap-4"><Layers className="w-8 h-8 text-sky-500" /><h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">Volumetric_Z_Scanner</h3></div>
         </div>
         <VolumetricZScanner />
      </section>

      {/* 10. MECHANICAL INPUT CLUSTER (RESTORED) */}
      <section className="space-y-24">
         <div className="flex items-center justify-between border-b border-white/5 pb-8 px-4">
            <div className="flex items-center gap-4"><Sliders className="w-8 h-8 text-amber-500" /><h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">Mechanical_Rack</h3></div>
         </div>
         <MechanicalInputCluster />
      </section>

      {/* 11. BIOLOGICAL FLUX ORB (RESTORED) */}
      <section className="space-y-24">
         <div className="flex items-center justify-between border-b border-white/5 pb-8 px-4">
            <div className="flex items-center gap-4"><Dna className="w-8 h-8 text-rose-500" /><h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">Biological_Flux</h3></div>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <BiologicalFluxOrb />
            <div className="space-y-8 p-12 bg-zinc-900/40 rounded-[64px] border border-white/5">
               <div className="flex items-center gap-4 text-rose-500"><Binary className="w-6 h-6" /><span className="text-[10px] font-mono font-black uppercase">Metabolism_Phyllotaxis</span></div>
               <p className="text-lg font-light text-zinc-500 leading-relaxed italic">
                 Симуляция роста по законам Золотого Сечения. Сфера и её органоиды распределяются под углом 137.5°, создавая идеальный природный баланс.
               </p>
               <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div><div className="text-[8px] text-zinc-600 uppercase mb-1">Golden_Angle</div><div className="text-xl font-tech font-bold text-white">137.508°</div></div>
                  <div><div className="text-[8px] text-zinc-600 uppercase mb-1">Growth_Constant</div><div className="text-xl font-tech font-bold text-white">1.618_PHI</div></div>
               </div>
            </div>
         </div>
      </section>

      {/* 12. TACTILE INPUTS (RESTORED) */}
      <section className="space-y-24">
         <div className="flex items-center justify-between border-b border-white/5 pb-8 px-4">
            <div className="flex items-center gap-4"><ListTodo className="w-8 h-8 text-indigo-500" /><h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">{t.showcaseV2.categories.inputs}</h3></div>
         </div>
         
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
            <div className="lg:col-span-7 space-y-12">
               <div className="p-12 bg-black/20 rounded-[64px] border border-white/5 flex flex-col gap-16 shadow-2xl backdrop-blur-xl transition-all hover:border-indigo-500/20">
                  <div className="space-y-6">
                     <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">01_ Neural_Refractive_Field</span>
                     <NeuralRefractiveInput />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div className="space-y-6">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">02_ Ion_Flow_Trigger</span>
                        <div className="flex items-center gap-12">
                           <IonFlowToggle /><div className="space-y-1"><div className="text-white font-tech font-bold uppercase text-xl">Synapse_Gate</div><div className="text-[9px] font-mono text-zinc-600 uppercase">State_Sync: ACTIVE</div></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="lg:col-span-5 space-y-12">
               <div className="p-12 bg-white/5 border border-white/10 rounded-[64px] flex flex-col h-full gap-12 shadow-2xl relative overflow-hidden backdrop-blur-3xl">
                  <div className="space-y-4">
                     <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">03_ Genetic_Progression</span>
                     <p className="text-xs text-zinc-600 font-light leading-relaxed">Пошаговая калибровка физических констант в реальном времени по ряду Фибоначчи.</p>
                  </div>
                  <GeneticStepper />
                  <div className="space-y-6 pt-8 border-t border-white/5">
                     <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">04_ Haptic_Pressure_Pad</span>
                     <PressurePad />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <div className="flex justify-center pt-20">
         <div className="flex items-center gap-12 text-zinc-500 opacity-20">
            <div className="flex items-center gap-4"><MousePointer2 className="w-4 h-4" /> <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Interaction_Refined</span></div>
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <div className="flex items-center gap-4"><Activity className="w-4 h-4" /> <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Precision: MASTER_LOD</span></div>
         </div>
      </div>

      <style>{`
        @keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }
        .animate-scan { animation: scan 3s linear infinite; }
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};
