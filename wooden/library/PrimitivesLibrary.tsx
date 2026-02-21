
import React, { useState, useContext, useRef, useEffect } from 'react';
import { 
  Zap, Target, Activity, Sliders, Box, Layers, 
  Cpu, Shield, Radio, Search, Bell, User,
  CheckCircle2, AlertTriangle, Fingerprint,
  RefreshCw, Layout, Smartphone, Monitor,
  Compass, Command, Share2, MoreHorizontal,
  Mail, Play, Pause, ChevronRight, X, Check, Atom,
  Volume2, Disc, Navigation, List, Hash, 
  Eye, Thermometer, Battery, Signal, Wifi,
  Move, RotateCcw, RotateCw, Map
} from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../components/AudioService';

const GlassPrimitive: React.FC<{ children: React.ReactNode; className?: string; mass?: number }> = ({ children, className = "", mass = 1 }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * (15 / mass);
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * (-15 / mass);
    setTilt({ x: y, y: x });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => playUISound('hover')}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onMouseDown={() => { setIsPressed(true); playUISound('click'); }}
      onMouseUp={() => setIsPressed(false)}
      className={`relative transition-all duration-500 ease-out preserve-3d cursor-pointer ${className}`}
      style={{ 
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isPressed ? 'scale(0.97) translateZ(-10px)' : 'scale(1) translateZ(0)'}`,
      }}
    >
       <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[inherit] backdrop-blur-2xl shadow-2xl" />
       <div className="relative z-10 w-full h-full flex items-center justify-center">
          {children}
       </div>
       <div className="absolute inset-0 border-t border-l border-white/20 rounded-[inherit] pointer-events-none opacity-40" />
    </div>
  );
};

export const PrimitivesLibrary: React.FC<{ theme: string }> = ({ theme }) => {
  const { t } = useContext(LanguageContext);
  const isDark = theme === 'dark';

  // State for analog primitives
  const [knobRot, setKnobRot] = useState(45);
  const [xyPos, setXyPos] = useState({ x: 50, y: 50 });
  const [verticalFader, setVerticalFader] = useState(60);

  return (
    <div className="space-y-48 animate-in fade-in duration-1000 pb-40">
      {/* 1. HERO SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-end gap-12 px-4">
        <div className="space-y-6">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em]">
              <Layers className="w-3 h-3" /> {t.library.tag}
           </div>
           <h2 className="text-[100px] md:text-[120px] font-tech font-bold text-zinc-900 dark:text-white uppercase leading-[0.8] tracking-tighter">
              {t.library.title} <br /><span className="text-indigo-500">{t.library.titleAccent}</span>
           </h2>
           <p className="text-xl font-light text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
              {t.library.desc}
           </p>
        </div>

        <div className="p-10 bg-zinc-900/40 rounded-[56px] border border-white/5 flex items-center gap-12 shadow-2xl backdrop-blur-3xl">
           <div className="space-y-1">
              <div className="text-[9px] font-mono text-zinc-500 uppercase font-black">Registry_Sync</div>
              <div className="text-3xl font-tech font-bold text-emerald-500 tracking-widest">STABLE_V1.4</div>
           </div>
           <div className="w-px h-16 bg-white/5" />
           <Cpu className="w-12 h-12 text-indigo-500 animate-pulse" />
        </div>
      </div>

      {/* 2. CATEGORY: STATUS EMITTERS */}
      <section className="space-y-16">
         <div className="flex items-center justify-between px-4 border-b border-white/5 pb-8">
            <div className="flex items-center gap-4">
               <Radio className="w-8 h-8 text-emerald-500" />
               <h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">{t.library.categories.status}</h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Emitter_Group_0x08</span>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <GlassPrimitive className="h-40 rounded-[32px]">
               <div className="flex flex-col items-center gap-4">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-mono text-emerald-500 uppercase font-black">Pulse_Beacon</span>
               </div>
            </GlassPrimitive>

            <GlassPrimitive className="h-40 rounded-[32px]">
               <div className="relative w-24 h-24">
                  <svg className="w-full h-full -rotate-90">
                     <circle cx="50%" cy="50%" r="40%" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="6" />
                     <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="100" strokeDashoffset="25" className="animate-pulse" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-tech font-black text-white">75%</div>
               </div>
            </GlassPrimitive>

            <GlassPrimitive className="h-40 rounded-[32px]">
               <div className="flex flex-col items-center gap-6">
                  <div className="flex gap-1.5">
                     {[1,2,3,4,5].map(i => <div key={i} className={`w-1.5 h-6 rounded-full ${i < 4 ? 'bg-amber-500' : 'bg-white/10'}`} />)}
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Battery_Lvl</span>
               </div>
            </GlassPrimitive>

            <GlassPrimitive className="h-40 rounded-[32px]">
               <div className="flex flex-col items-center gap-4">
                  <Signal className="w-8 h-8 text-sky-500 animate-pulse" />
                  <div className="text-[8px] font-mono text-zinc-500 uppercase">Uplink: AMS_NORTH</div>
               </div>
            </GlassPrimitive>
         </div>
      </section>

      {/* 3. CATEGORY: ANALOG SURFACES */}
      <section className="space-y-16">
         <div className="flex items-center justify-between px-4 border-b border-white/5 pb-8">
            <div className="flex items-center gap-4">
               <Sliders className="w-8 h-8 text-amber-500" />
               <h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">{t.library.categories.analog}</h3>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* XY Pad */}
            <div className="lg:col-span-5 h-[400px] bg-black/40 border border-white/10 rounded-[56px] relative overflow-hidden group cursor-crosshair shadow-2xl"
                 onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setXyPos({
                       x: ((e.clientX - rect.left) / rect.width) * 100,
                       y: ((e.clientY - rect.top) / rect.height) * 100
                    });
                 }}>
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
               <div className="absolute top-8 left-10 text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-black">X-Y_Control_Surface</div>
               
               <div className="absolute transition-all duration-75 pointer-events-none" style={{ left: `${xyPos.x}%`, top: `${xyPos.y}%`, transform: 'translate(-50%, -50%)' }}>
                  <div className="w-12 h-12 border border-amber-500/50 rounded-full flex items-center justify-center backdrop-blur-xl">
                     <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_20px_#f59e0b]" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[1px] bg-amber-500/10 -z-10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-48 bg-amber-500/10 -z-10" />
               </div>
               
               <div className="absolute bottom-8 right-10 text-right font-mono text-[9px] text-zinc-500">
                  X: {xyPos.x.toFixed(2)}% | Y: {xyPos.y.toFixed(2)}%
               </div>
            </div>

            {/* Knob & Fader */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-8">
               <div className="bg-white/5 border border-white/10 rounded-[56px] flex flex-col items-center justify-center gap-10 shadow-2xl group relative overflow-hidden">
                  <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.5em] mb-4">Rotary_Encoder</div>
                  <div 
                    className="w-32 h-32 rounded-full bg-zinc-900 border-4 border-zinc-800 shadow-2xl cursor-ns-resize relative flex items-center justify-center transition-transform active:scale-95"
                    style={{ transform: `rotate(${knobRot}deg)` }}
                    onMouseMove={(e) => e.buttons === 1 && setKnobRot(prev => prev + e.movementX)}
                  >
                     <div className="absolute top-4 w-1.5 h-4 bg-indigo-500 rounded-full shadow-[0_0_15px_#6366f1]" />
                     <RotateCw className="w-10 h-10 text-zinc-800" />
                  </div>
                  <div className="text-3xl font-tech font-bold text-white uppercase">{knobRot.toFixed(0)}°</div>
               </div>

               <div className="bg-white/5 border border-white/10 rounded-[56px] flex items-center justify-center gap-12 p-12">
                  <div className="relative h-full w-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                     <div 
                        className="absolute bottom-0 w-full bg-indigo-500 shadow-[0_0_20px_#6366f1] transition-all"
                        style={{ height: `${verticalFader}%` }}
                     />
                     <input 
                        type="range" min="0" max="100" value={verticalFader}
                        onChange={e => setVerticalFader(parseInt(e.target.value))}
                        className="absolute inset-0 opacity-0 cursor-ns-resize"
                        style={{ writingMode: 'bt-lr' as any }}
                     />
                  </div>
                  <div className="flex flex-col gap-6 text-center">
                     <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Master_Gain</div>
                     <div className="text-5xl font-tech font-bold text-white uppercase">{verticalFader}%</div>
                     <Volume2 className="w-8 h-8 text-indigo-500 mx-auto animate-pulse" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. CATEGORY: NAVIGATION ANCHORS */}
      <section className="space-y-16">
         <div className="flex items-center justify-between px-4 border-b border-white/5 pb-8">
            <div className="flex items-center gap-4">
               <Navigation className="w-8 h-8 text-sky-500" />
               <h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">{t.library.categories.navigation}</h3>
            </div>
         </div>

         <div className="space-y-12">
            {/* Spatial Tabs */}
            <div className="p-4 bg-zinc-900 rounded-[32px] border border-white/5 flex gap-4 max-w-2xl mx-auto shadow-2xl">
               {['DASHBOARD', 'MATTER_CALIB', 'SPECTRAL_SCAN', 'KINETIC_LOG'].map((label, i) => (
                 <button 
                    key={label}
                    onClick={() => playUISound('click')}
                    className={`flex-1 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all duration-500 relative overflow-hidden group
                      ${i === 1 ? 'bg-white text-black shadow-[0_20px_40px_rgba(0,0,0,0.5)] translate-y-[-10px] z-10' : 'text-zinc-600 hover:text-white hover:bg-white/5'}
                    `}
                 >
                    {label}
                    {i === 1 && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600" />}
                 </button>
               ))}
            </div>

            {/* Path Breadcrumb */}
            <div className="flex items-center gap-6 px-12 py-8 bg-black/40 border border-white/5 rounded-full max-w-4xl mx-auto overflow-hidden group">
               <div className="flex items-center gap-4">
                  <Map className="w-4 h-4 text-sky-500" />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black">Path:</span>
               </div>
               <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                  {['Root', 'Architect', 'Genesis_v4', 'Active_Node_0x88'].map((crumb, i, arr) => (
                    <div key={crumb} className="flex items-center gap-8 shrink-0 animate-in slide-in-from-left-4" style={{ animationDelay: `${i * 150}ms` }}>
                       <span className={`text-[10px] font-tech font-bold uppercase tracking-widest transition-colors ${i === arr.length - 1 ? 'text-white' : 'text-zinc-700 hover:text-sky-400 cursor-pointer'}`}>{crumb}</span>
                       {i < arr.length - 1 && <ChevronRight className="w-3 h-3 text-zinc-800" />}
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 5. CATEGORY: ACTION UNITS (Existing, enriched) */}
      <section className="space-y-16">
         <div className="flex items-center gap-4 px-4 border-b border-white/5 pb-8">
            <Zap className="w-8 h-8 text-amber-500" />
            <h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">{t.library.categories.actions}</h3>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <GlassPrimitive className="h-32 rounded-[24px]" mass={0.5}>
               <span className="font-tech font-bold text-white uppercase tracking-[0.4em]">Primary_Unit</span>
            </GlassPrimitive>
            
            <div className="relative group cursor-pointer">
               <div className="absolute inset-0 bg-indigo-600 rounded-[24px] blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
               <button className="relative w-full h-32 bg-indigo-600 text-white rounded-[24px] font-tech font-black uppercase tracking-widest flex items-center justify-center gap-4 overflow-hidden shadow-2xl active:scale-95 transition-all">
                  <Play className="w-5 h-5 fill-current" /> Initialize_Core
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
               </button>
            </div>

            <GlassPrimitive className="h-32 rounded-[24px] border-dashed" mass={1.2}>
               <div className="flex items-center gap-4 text-zinc-500 group-hover:text-white transition-colors">
                  <RefreshCw className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Refine_Matter</span>
               </div>
            </GlassPrimitive>

            <button className="h-32 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[24px] flex items-center justify-center gap-4 hover:bg-rose-500/10 hover:text-rose-500 transition-all active:scale-95">
               <X className="w-5 h-5" /> <span className="text-[10px] font-black uppercase">Terminate</span>
            </button>
         </div>
      </section>

      {/* 6. CATEGORY: DATA CHANNELS (Existing, enriched) */}
      <section className="space-y-16">
         <div className="flex items-center gap-4 px-4 border-b border-white/5 pb-8">
            <Search className="w-8 h-8 text-sky-500" />
            <h3 className="text-4xl font-tech font-bold uppercase text-zinc-900 dark:text-white tracking-widest">{t.library.categories.inputs}</h3>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-black/20 dark:bg-black/40 rounded-[56px] border border-white/5 space-y-6 group hover:border-sky-500/30 transition-all">
               <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Search_Vector_Input</div>
               <div className="relative">
                  <input type="text" placeholder="Scan_Lattice..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-light text-white outline-none focus:border-sky-500/50 transition-all" />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shadow-xl"><Search className="w-5 h-5" /></div>
               </div>
            </div>

            <div className="p-10 bg-black/20 dark:bg-black/40 rounded-[56px] border border-white/5 flex flex-col justify-between group hover:border-indigo-500/30 transition-all">
               <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  <span>Numeric_Modulator</span>
                  <span className="text-indigo-400">0x88.A</span>
               </div>
               <div className="flex items-center gap-6">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 animate-pulse w-3/4" />
                  </div>
                  <div className="text-2xl font-tech font-bold text-white">74.2%</div>
               </div>
            </div>
         </div>
      </section>

      {/* 7. SYSTEM FOOTER */}
      <div className="flex justify-center pt-20">
         <div className="flex items-center gap-12 text-zinc-500 opacity-20">
            <div className="flex items-center gap-4"><Compass className="w-4 h-4" /> <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Navigator_Stable</span></div>
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <div className="flex items-center gap-4"><Target className="w-4 h-4" /> <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Unit_Precision: HIGH</span></div>
         </div>
      </div>
    </div>
  );
};
