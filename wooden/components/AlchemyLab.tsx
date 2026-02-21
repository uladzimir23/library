
import React, { useState, useRef, useEffect } from 'react';
import { 
  Beaker, Sparkles, Droplet, Zap, 
  Layers, Target, Sliders, Activity, 
  RefreshCw, Disc, Cpu, Shield, 
  Wind, Hammer, Terminal, Gauge,
  Sun, Maximize2, AlertTriangle, Eye,
  Search, Binary, Radio
} from 'lucide-react';
import { playUISound } from './AudioService';

type MaterialType = 'GLASS' | 'CHROME' | 'CARBON' | 'WAX';

export const AlchemyLab: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="animate-in fade-in duration-1000 space-y-40 pb-40">
      {/* Intro Header */}
      <div className="text-center space-y-8">
         <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-bold uppercase tracking-[0.5em]">
            <Beaker className="w-3 h-3" /> Matter_Alchemy_v4.2
         </div>
         <h2 className="text-8xl font-tech font-bold uppercase text-zinc-900 dark:text-white leading-none tracking-tighter">
            Алхимия <br /><span className="text-emerald-500">Поверхности.</span>
         </h2>
         <p className="max-w-2xl mx-auto text-xl font-light opacity-60">
            Исследование молекулярного состава интерфейса. Мы не просто меняем цвета — мы трансформируем структуру вещества, управляя его плотностью, отражающей способностью и тактильным трением.
         </p>
      </div>

      {/* 01. Transmutation Engine */}
      <section className="space-y-24">
         <div className="space-y-6 max-w-xl">
            <h3 className="text-4xl font-tech font-bold text-zinc-900 dark:text-white uppercase">01_ Transmutation Engine</h3>
            <p className="text-lg font-light text-zinc-500 italic">"Фазовый переход. Мгновенная перестройка кристаллической решетки объекта."</p>
         </div>
         <TransmutationVisualizer isDark={isDark} />
      </section>

      {/* 02. Subsurface Scattering */}
      <section className="space-y-24">
         <div className="space-y-6 max-w-xl">
            <h3 className="text-4xl font-tech font-bold text-zinc-900 dark:text-white uppercase">02_ Subsurface Glow</h3>
            <p className="text-lg font-light text-zinc-500 italic">"Внутренняя энергия. Рассеивание фотонов данных внутри полупрозрачной среды."</p>
         </div>
         <SubsurfaceVisualizer isDark={isDark} />
      </section>

      {/* 03. Surface Friction */}
      <section className="space-y-24">
         <div className="space-y-6 max-w-xl">
            <h3 className="text-4xl font-tech font-bold text-zinc-900 dark:text-white uppercase">03_ Micro-Friction Texture</h3>
            <p className="text-lg font-light text-zinc-500 italic">"Тактильный шум. Визуализация сопротивления материала при взаимодействии."</p>
         </div>
         <FrictionVisualizer isDark={isDark} />
      </section>

      {/* 04. Molecular Density */}
      <section className="space-y-24">
         <div className="space-y-6 max-w-xl">
            <h3 className="text-4xl font-tech font-bold text-zinc-900 dark:text-white uppercase">04_ Density Calibration</h3>
            <p className="text-lg font-light text-zinc-500 italic">"Гравитационный вес. Управление массой через глубину блюра и массу теней."</p>
         </div>
         <DensityVisualizer isDark={isDark} />
      </section>
    </div>
  );
};

const TransmutationVisualizer: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [material, setMaterial] = useState<MaterialType>('GLASS');
  const [isMorphing, setIsMorphing] = useState(false);

  const morphTo = (m: MaterialType) => {
    if (m === material || isMorphing) return;
    setIsMorphing(true);
    playUISound('process');
    setTimeout(() => {
      setMaterial(m);
      setIsMorphing(false);
      playUISound('success');
    }, 1200);
  };

  const matStyles = {
    GLASS: { blur: 'backdrop-blur-3xl', bg: 'bg-white/5', border: 'border-white/20', color: 'text-sky-400', icon: Layers, label: 'Frosted_Lattice' },
    CHROME: { blur: 'backdrop-blur-md', bg: 'bg-zinc-200/20 dark:bg-zinc-100/10', border: 'border-white/40', color: 'text-indigo-400', icon: Disc, label: 'Specular_Reflect' },
    CARBON: { blur: 'backdrop-blur-none', bg: 'bg-zinc-900', border: 'border-zinc-700', color: 'text-emerald-500', icon: Cpu, label: 'Composite_Weave' },
    WAX: { blur: 'backdrop-blur-xl', bg: 'bg-amber-500/10', border: 'border-amber-500/20', color: 'text-amber-500', icon: Droplet, label: 'Organic_Paraffin' }
  };

  const current = matStyles[material];

  return (
    <div className={`relative h-[700px] rounded-[64px] border overflow-hidden flex flex-col lg:flex-row transition-all duration-1000
      ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-white border-black/5'}
    `}>
       <div className="w-full lg:w-80 border-r border-white/5 p-12 space-y-8 bg-panel/30 backdrop-blur-xl shrink-0">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Material_Fleet</div>
          <div className="grid grid-cols-1 gap-3">
             {(['GLASS', 'CHROME', 'CARBON', 'WAX'] as MaterialType[]).map(m => (
               <button 
                 key={m}
                 onClick={() => morphTo(m)}
                 className={`p-6 rounded-[32px] border transition-all duration-700 flex items-center justify-between group
                   ${material === m ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl translate-x-2' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}
                 `}
               >
                  <span className="text-[10px] font-black uppercase tracking-widest">{m}</span>
                  {material === m && <RefreshCw className="w-4 h-4 animate-spin-slow" />}
               </button>
             ))}
          </div>
          
          <div className="pt-10 border-t border-white/5 space-y-4">
             <div className="flex items-center gap-3 text-emerald-500">
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Coherence_Sync</span>
             </div>
             <div className="text-xl font-tech font-bold text-text-main uppercase tracking-widest">
               {isMorphing ? 'RESTRUCTURING' : 'STABLE_0x88'}
             </div>
          </div>
       </div>

       <div className="flex-1 relative overflow-hidden flex items-center justify-center p-12 bg-[#020203] group">
          {isMorphing && (
             <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-indigo-500/5 animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-500 shadow-[0_0_20px_#6366f1] animate-[scan_1.2s_linear_infinite]" />
             </div>
          )}

          <div className={`absolute inset-0 transition-opacity duration-1000 ${isMorphing ? 'opacity-40' : 'opacity-10'}`} 
               style={{ background: `radial-gradient(circle at center, #6366f1 0%, transparent 70%)` }} />
          
          <div 
            className={`relative w-80 h-96 transition-all duration-1000 ease-out border-2 flex flex-col items-center justify-center p-12 overflow-hidden shadow-2xl
              ${current.blur} ${current.bg} ${current.border}
              ${isMorphing ? 'scale-90 blur-2xl opacity-50 rotate-6 skew-x-12' : 'scale-100 blur-0 opacity-100 rotate-0'}
            `}
            style={{ borderRadius: material === 'CARBON' ? '0px' : material === 'GLASS' ? '80px' : '48px' }}
          >
             {material === 'CARBON' && (
               <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #fff 1px, transparent 1px), linear-gradient(-45deg, #fff 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
             )}
             
             <div className={`w-24 h-24 rounded-[40px] bg-zinc-900 border border-white/10 flex items-center justify-center mb-8 shadow-2xl transition-transform duration-1000 ${isMorphing ? 'rotate-[360deg]' : ''}`}>
                <current.icon className={`w-12 h-12 ${current.color}`} />
             </div>
             
             <div className="text-center relative z-10">
                <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-white">Matter_ID: {material}</div>
                <div className="text-3xl font-tech font-bold text-white uppercase tracking-tighter leading-none">{current.label}</div>
             </div>
             <div className="absolute inset-0 border-t border-l border-white/20 rounded-[inherit] pointer-events-none" />
          </div>

          <div className="absolute bottom-12 right-12 text-right">
             <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-black mb-1">State_Synthesis: OK</div>
             <div className="text-[8px] font-mono text-zinc-800 uppercase">Phase_Calibration_v4</div>
          </div>
       </div>
    </div>
  );
};

const SubsurfaceVisualizer: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [absorption, setAbsorption] = useState(0.45);
  const [glow, setGlow] = useState(0.6);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div className={`relative h-[650px] rounded-[64px] border overflow-hidden flex flex-col lg:flex-row transition-all duration-1000
      ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-zinc-50 border-black/5'}
    `}>
       <div className="w-full lg:w-80 border-r border-white/5 p-12 space-y-12 bg-panel/30 shrink-0">
          <div className="space-y-4">
             <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
                <span>Absorption</span>
                <span className="text-emerald-500">{(absorption * 100).toFixed(0)}%</span>
             </div>
             <input type="range" min="0.1" max="0.9" step="0.01" value={absorption} onChange={e => { setAbsorption(parseFloat(e.target.value)); playUISound('click'); }} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500" />
          </div>
          <div className="space-y-4">
             <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
                <span>Core_Glow</span>
                <span className="text-emerald-500">{(glow * 100).toFixed(0)}%</span>
             </div>
             <input type="range" min="0.1" max="1" step="0.01" value={glow} onChange={e => { setGlow(parseFloat(e.target.value)); playUISound('click'); }} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500" />
          </div>
          <div className="pt-10 border-t border-white/10">
             <div className="flex items-center gap-3 text-emerald-500 mb-2">
                <Target className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Ray_Scanner</span>
             </div>
             <div className="text-xl font-tech font-bold text-text-main">INTERNAL_PHI</div>
          </div>
       </div>

       <div 
         ref={containerRef}
         onMouseMove={handleMouseMove}
         className="flex-1 relative overflow-hidden flex items-center justify-center p-12 bg-[#020504] cursor-crosshair"
       >
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          
          <div className="relative w-80 h-96 transition-transform duration-700 ease-out preserve-3d">
             <div 
               className="absolute inset-0 bg-white/[0.05] border-2 border-white/15 rounded-[64px] backdrop-blur-3xl shadow-2xl z-20 flex items-center justify-center"
               style={{ transform: `rotateX(${(mousePos.y - 50) * -0.2}deg) rotateY(${(mousePos.x - 50) * 0.2}deg)` }}
             >
                <div className="text-center opacity-30 group-hover:opacity-100 transition-opacity">
                   <Shield className="w-16 h-16 text-white mb-6 mx-auto" />
                   <div className="text-[10px] font-mono text-white uppercase tracking-[0.5em]">Matter_Core</div>
                </div>
             </div>

             <div 
                className="absolute w-64 h-64 rounded-full blur-[100px] transition-all duration-300 z-10"
                style={{ 
                   left: `${mousePos.x}%`,
                   top: `${mousePos.y}%`,
                   background: `radial-gradient(circle, #10b981 0%, transparent 70%)`,
                   opacity: glow * (1.1 - absorption),
                   transform: `translate(-50%, -50%) scale(${1 + glow * 0.4})`,
                   filter: `blur(${40 + absorption * 120}px)`
                }}
             />
          </div>

          <div className="absolute bottom-12 right-12 flex items-center gap-4">
             <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
             <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">Ray_Diffusion_Buffer: ACTIVE</span>
          </div>
       </div>
    </div>
  );
};

const FrictionVisualizer: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [roughness, setRoughness] = useState(0.3);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsHovered(true); playUISound('hover'); }}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative h-[650px] rounded-[64px] border overflow-hidden flex flex-col lg:flex-row transition-all duration-1000
        ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-white border-black/5'}
      `}
    >
       <div className="w-full lg:w-80 border-r border-white/5 p-12 space-y-12 bg-panel/30 shrink-0">
          <div className="space-y-4">
             <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
                <span>Roughness</span>
                <span className="text-amber-500">{(roughness * 100).toFixed(0)}%</span>
             </div>
             <input type="range" min="0" max="1" step="0.01" value={roughness} onChange={e => { setRoughness(parseFloat(e.target.value)); playUISound('click'); }} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500" />
          </div>
          <div className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-3">
             <div className="flex items-center gap-2 text-amber-500">
                <Wind className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase">Micro_Resistance</span>
             </div>
             <div className="text-2xl font-tech font-bold text-white">{(roughness * 1.42).toFixed(3)}_Mu</div>
          </div>
       </div>

       <div className="flex-1 relative overflow-hidden flex items-center justify-center p-12 bg-black cursor-none">
          <div 
            className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-screen"
            style={{ 
               backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
               filter: `contrast(${1 + roughness * 4}) brightness(${1 + roughness})`,
               backgroundSize: '120px 120px'
            }}
          />
          
          <div 
             className={`relative w-full max-w-2xl h-80 bg-zinc-900/60 border border-white/10 rounded-[56px] overflow-hidden backdrop-blur-3xl shadow-2xl flex items-center justify-center transition-all duration-500
                ${isHovered ? 'scale-105 border-amber-500/30' : 'scale-100'}
             `}
             style={{ boxShadow: `inset 0 0 ${roughness * 120}px rgba(245, 158, 11, ${roughness * 0.15})` }}
          >
             <h4 className="text-6xl md:text-8xl font-tech font-black text-white/5 uppercase tracking-[0.6em] select-none">TACTILE</h4>
             
             <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping opacity-0 group-hover:opacity-60"
                    style={{ 
                       left: `${mousePos.x + (Math.random()-0.5) * 8}%`, 
                       top: `${mousePos.y + (Math.random()-0.5) * 8}%`,
                       animationDelay: `${i * 0.12}s`,
                       display: roughness > 0.4 ? 'block' : 'none'
                    }}
                  />
                ))}
             </div>
          </div>

          <div 
             className="absolute w-16 h-16 border-2 border-amber-500/40 rounded-full pointer-events-none flex items-center justify-center transition-transform duration-75"
             style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%`, transform: 'translate(-50%, -50%)' }}
          >
             <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_15px_#fff] animate-pulse" />
             <div className="absolute inset-[-10px] border border-amber-500/10 rounded-full animate-spin-slow" />
          </div>
       </div>
    </div>
  );
};

const DensityVisualizer: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [mass, setMass] = useState(1.0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div className={`relative h-[700px] rounded-[64px] border overflow-hidden flex flex-col lg:flex-row transition-all duration-1000
      ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-zinc-50 border-black/5 shadow-inner'}
    `}>
       <div className="w-full lg:w-80 border-r border-white/5 p-12 space-y-12 bg-panel/30 shrink-0">
          <div className="space-y-6">
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
                   <span>Mass_Weight</span>
                   <span className="text-rose-500">{mass.toFixed(2)} KG</span>
                </div>
                <input type="range" min="0.1" max="5.0" step="0.1" value={mass} onChange={e => { setMass(parseFloat(e.target.value)); playUISound('click'); }} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-rose-500" />
             </div>
             
             <div className={`p-8 rounded-[36px] border transition-all duration-700 ${mass > 4 ? 'bg-rose-600 border-rose-400 text-white animate-pulse' : 'bg-white/5 border-white/10 text-zinc-500'}`}>
                <div className="flex items-center gap-3 mb-2">
                   <Gauge className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Gravity_Bias</span>
                </div>
                <div className="text-3xl font-tech font-bold uppercase tracking-tighter">
                   {mass > 4 ? 'CRITICAL' : mass > 2 ? 'HEAVY' : 'AETHER'}
                </div>
             </div>
          </div>
          <div className="mt-auto opacity-20">
             <div className="text-[8px] font-mono uppercase tracking-[0.5em] text-zinc-700">Atomic_Stability_Check: OK</div>
          </div>
       </div>

       <div 
         onMouseMove={handleMouseMove}
         onMouseDown={() => setIsDragging(true)}
         onMouseUp={() => setIsDragging(false)}
         onMouseLeave={() => { setMousePos({x:0, y:0}); setIsDragging(false); }}
         className="flex-1 relative overflow-hidden flex items-center justify-center p-12 bg-[#050505] cursor-grab active:cursor-grabbing"
       >
          <div className="absolute inset-0 opacity-[0.03] transition-transform duration-1000" 
               style={{ 
                 backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
                 backgroundSize: '60px 60px',
                 transform: `scale(${1 + mass * 0.05}) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
               }} />
          
          <div 
            className={`relative w-80 h-96 transition-all duration-700 ease-out border-2 shadow-2xl flex flex-col items-center justify-center p-12 overflow-hidden
               ${isDragging ? 'scale-95' : 'scale-100'}
            `}
            style={{ 
               backgroundColor: `rgba(255, 255, 255, ${0.02 + mass * 0.03})`,
               backdropFilter: `blur(${mass * 15}px)`,
               borderColor: `rgba(244, 63, 94, ${0.1 + mass * 0.15})`,
               borderRadius: `${48 - mass * 4}px`,
               transform: `translate(${mousePos.x * (150 / mass)}px, ${mousePos.y * (150 / mass)}px) rotateX(${(mousePos.y * -20) / mass}deg) rotateY(${(mousePos.x * 20) / mass}deg)`,
               boxShadow: `0 ${30 + mass * 20}px ${60 + mass * 40}px -20px rgba(0,0,0,0.8)`
            }}
          >
             <div className={`w-24 h-24 rounded-full transition-all duration-700 flex items-center justify-center
                ${mass > 3 ? 'bg-rose-600 shadow-[0_0_60px_rgba(244,63,94,0.5)]' : 'bg-zinc-900 text-zinc-700'}
             `}>
                {mass > 4 ? <AlertTriangle className="w-12 h-12 text-white animate-bounce" /> : <Hammer className={`w-12 h-12 ${mass > 2.5 ? 'text-rose-400' : ''}`} />}
             </div>
             
             <div className="mt-10 text-center">
                <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-white">Weight_Units</div>
                <div className="text-4xl font-tech font-bold text-white uppercase tracking-widest">
                  {mass.toFixed(3)}<span className="text-xs opacity-20 ml-2">P_U</span>
                </div>
             </div>
             <div className="absolute inset-0 border-t border-l border-white/20 rounded-[inherit] pointer-events-none opacity-40" />
          </div>

          {/* HUD Marker */}
          <div className="absolute top-12 left-12 flex items-center gap-4 text-rose-500/40">
             <Eye className="w-5 h-5" />
             <span className="text-[10px] font-mono uppercase tracking-[0.5em]">Mass_Occlusion_Sim</span>
          </div>
       </div>
    </div>
  );
};
