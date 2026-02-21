
import React, { useState, useEffect, useRef } from 'react';
import { 
  Type, Zap, Activity, Sliders, 
  Maximize2, MousePointer2, RefreshCw, 
  Terminal, Share2, Compass, Move,
  Sparkles, Gauge, LayoutTemplate, Scale,
  Monitor, Smartphone, Tablet, ChevronRight,
  Sun, Target, BarChart, Binary
} from 'lucide-react';
import { playUISound } from './AudioService';

export const TypographyLab: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="animate-in fade-in duration-1000 space-y-40 pb-40">
      {/* Intro Header */}
      <div className="text-center space-y-8">
         <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em]">
            <Type className="w-3 h-3" /> Matter_Typography_v12.4
         </div>
         <h2 className="text-8xl font-tech font-bold uppercase text-zinc-900 dark:text-white leading-none tracking-tighter">
            Текст как <br /><span className="text-indigo-500">Материя.</span>
         </h2>
         <p className="max-w-2xl mx-auto text-xl font-light opacity-60">
            В пространственном дизайне текст — это физическое тело. Он обладает массой, преломляет свет и реагирует на движение пользователя через инерцию и спектральный дрейф.
         </p>
      </div>

      {/* 01. Glitch Phase Transition */}
      <section className="space-y-24">
         <div className="space-y-6 max-w-xl">
            <h3 className="text-4xl font-tech font-bold text-zinc-900 dark:text-white uppercase">01_ Glitch Phase Shift</h3>
            <p className="text-lg font-light text-zinc-500 italic">"Деконструкция символа. Текст распадается на фазовые слои при переходе."</p>
         </div>
         <GlitchTypeVisualizer isDark={isDark} />
      </section>

      {/* 02. Viscous Fluid Type */}
      <section className="space-y-24">
         <div className="space-y-6 max-w-xl">
            <h3 className="text-4xl font-tech font-bold text-zinc-900 dark:text-white uppercase">02_ Viscous Fluid Dynamics</h3>
            <p className="text-lg font-light text-zinc-500 italic">"Тягучесть смысла. Буквы связаны невидимым полем вязкости."</p>
         </div>
         <FluidTypeVisualizer isDark={isDark} />
      </section>

      {/* 03. Volumetric Weight Depth */}
      <section className="space-y-24">
         <div className="space-y-6 max-w-xl">
            <h3 className="text-4xl font-tech font-bold text-zinc-900 dark:text-white uppercase">03_ Volumetric Extrusion</h3>
            <p className="text-lg font-light text-zinc-500 italic">"Топология веса. Начертание как геометрический объем."</p>
         </div>
         <VolumetricTypeVisualizer isDark={isDark} />
      </section>

      {/* 04. Spectral Kerning */}
      <section className="space-y-24">
         <div className="space-y-6 max-w-xl">
            <h3 className="text-4xl font-tech font-bold text-zinc-900 dark:text-white uppercase">04_ Spectral Interaction</h3>
            <p className="text-lg font-light text-zinc-500 italic">"Спектральное отталкивание. Текст раздвигается под давлением внимания."</p>
         </div>
         <SpectralKerningVisualizer isDark={isDark} />
      </section>

      {/* 05. Fluid Scaling Architecture */}
      <section className="space-y-24">
         <div className="space-y-6 max-w-xl">
            <h3 className="text-4xl font-tech font-bold text-zinc-900 dark:text-white uppercase">05_ Fluid Scaling Logic</h3>
            <p className="text-lg font-light text-zinc-500 italic">"Математика адаптивности. Автоматический расчет кегля на основе вьюпорта и золотого сечения."</p>
         </div>
         <FluidScalingVisualizer isDark={isDark} />
      </section>
    </div>
  );
};

const GlitchTypeVisualizer: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glitch, setGlitch] = useState(0);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setGlitch(Math.random());
        if (Math.random() > 0.8) playUISound('click');
      }, 60);
      return () => clearInterval(interval);
    } else {
      setGlitch(0);
    }
  }, [isHovered]);

  return (
    <div 
      onMouseEnter={() => { setIsHovered(true); playUISound('process'); }}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative h-[500px] rounded-[64px] border flex items-center justify-center overflow-hidden transition-all duration-1000 group
        ${isDark ? 'bg-zinc-950 border-white/5' : 'bg-white border-black/5 shadow-2xl'}
      `}
    >
       {/* Diagnostic HUD Scanline */}
       <div className={`absolute inset-0 z-50 pointer-events-none overflow-hidden transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-[2px] bg-rose-500/30 shadow-[0_0_20px_#f43f5e] animate-[scan_2s_linear_infinite]" />
       </div>

       <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
       
       <div className="relative text-center select-none cursor-crosshair">
          <h4 
            className="text-8xl md:text-[140px] font-tech font-black uppercase tracking-tighter leading-none transition-all duration-500"
            style={{ 
              color: isHovered ? 'transparent' : (isDark ? '#fff' : '#000'),
              WebkitTextStroke: isHovered ? (isDark ? '1px rgba(255,255,255,0.1)' : '1px rgba(0,0,0,0.05)') : 'none'
            }}
          >
            GLITCH
          </h4>
          
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center">
              <h4 className="absolute text-8xl md:text-[140px] font-tech font-black uppercase tracking-tighter text-rose-500 mix-blend-screen opacity-60 transition-transform duration-75"
                  style={{ transform: `translate(${glitch * 30}px, ${glitch * -15}px)` }}>GLITCH</h4>
              <h4 className="absolute text-8xl md:text-[140px] font-tech font-black uppercase tracking-tighter text-sky-500 mix-blend-screen opacity-60 transition-transform duration-75"
                  style={{ transform: `translate(${glitch * -30}px, ${glitch * 15}px)` }}>GLITCH</h4>
            </div>
          )}
       </div>

       <div className="absolute top-12 right-12 flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-rose-500 animate-ping' : 'bg-zinc-800'}`} />
          <span className="text-[10px] font-mono text-zinc-500 uppercase font-black">Entropy_Lost: {isHovered ? glitch.toFixed(4) : '0.0000'}</span>
       </div>

       <style>{`
          @keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }
       `}</style>
    </div>
  );
};

const FluidTypeVisualizer: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viscosity, setViscosity] = useState(0.4);
  const letters = "FLUID".split("");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    containerRef.current.style.setProperty('--mx', x.toString());
    containerRef.current.style.setProperty('--my', y.toString());
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => playUISound('hover')}
      className={`relative h-[600px] rounded-[64px] border flex flex-col lg:flex-row transition-all duration-1000 overflow-hidden
        ${isDark ? 'bg-[#050508] border-white/5' : 'bg-zinc-50 border-black/5 shadow-2xl'}
        [--mx:0] [--my:0]
      `}
    >
       <div className="w-full lg:w-80 border-r border-white/5 p-12 space-y-10 bg-panel/30 backdrop-blur-xl z-20">
          <div className="space-y-4">
             <div className="flex items-center gap-3 text-indigo-500">
                <Sliders className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-black">Viscosity_Control</span>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase font-bold">
                   <span>Натяжение</span>
                   <span className="text-indigo-500">{(viscosity * 100).toFixed(0)}%</span>
                </div>
                <input type="range" min="0.1" max="0.9" step="0.01" value={viscosity} onChange={e => { setViscosity(parseFloat(e.target.value)); playUISound('click'); }} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
             </div>
          </div>
          <div className="pt-8 border-t border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-indigo-400">
                <BarChart className="w-3 h-3" />
                <span className="text-[8px] font-mono uppercase font-black">Surface_Stress</span>
             </div>
             <div className="text-xl font-tech font-bold text-text-main">{(1.5 - viscosity).toFixed(3)}_PA</div>
          </div>
       </div>

       <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden group">
          <svg className="absolute w-0 h-0">
            <filter id="gooey-type-lux">
               <feGaussianBlur in="SourceGraphic" stdDeviation={12 * viscosity} result="blur" />
               <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" />
               <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </svg>

          <div className="flex gap-4 items-center justify-center select-none pointer-events-none" style={{ filter: 'url(#gooey-type-lux)' }}>
            {letters.map((char, i) => (
              <div 
                key={i}
                className="text-8xl md:text-[160px] font-tech font-black text-indigo-500 transition-transform duration-1000 ease-out will-change-transform"
                style={{ 
                  transform: `translate(calc(var(--mx) * ${100 + i * 40}px), calc(var(--my) * ${100 + i * 40}px)) scaleX(calc(1 + abs(var(--mx)) * 0.5))`
                }}
              >
                {char}
              </div>
            ))}
          </div>

          <div className="absolute bottom-12 right-12 text-right opacity-20 group-hover:opacity-100 transition-opacity">
             <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-black">Viscosity_Buffer_Active</div>
             <div className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">Force_Multiplier: {(1 + viscosity).toFixed(2)}x</div>
          </div>
       </div>
    </div>
  );
};

const VolumetricTypeVisualizer: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [weight, setWeight] = useState(400);
  const [depth, setDepth] = useState(24);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div className={`relative h-[650px] rounded-[64px] border flex flex-col lg:flex-row overflow-hidden transition-all duration-1000
      ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-white border-black/5'}
    `}>
       <div className="w-full lg:w-80 border-r border-black/5 dark:border-white/5 p-12 space-y-12 bg-panel/30 backdrop-blur-xl">
          <div className="space-y-4">
             <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest">
                <span>Weight</span>
                <span className="text-indigo-500">{weight}</span>
             </div>
             <input type="range" min="100" max="900" step="10" value={weight} onChange={e => { setWeight(parseInt(e.target.value)); playUISound('click'); }} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
          </div>
          <div className="space-y-4">
             <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest">
                <span>Z_Extrusion</span>
                <span className="text-indigo-500">{depth}PX</span>
             </div>
             <input type="range" min="0" max="60" step="1" value={depth} onChange={e => { setDepth(parseInt(e.target.value)); playUISound('click'); }} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
          </div>
          <div className="pt-10 border-t border-black/5 dark:border-white/10">
             <div className="flex items-center gap-3 text-emerald-500 mb-4">
                <Gauge className="w-4 h-4 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Mapping_Stable</span>
             </div>
             <div className="text-2xl font-tech font-bold text-text-main uppercase tracking-widest">0xSTABLE_3D</div>
          </div>
       </div>

       <div 
         onMouseMove={handleMouseMove}
         className="flex-1 relative overflow-hidden flex items-center justify-center p-12 bg-[#020202] group cursor-none"
       >
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Light source hint */}
          <div 
            className="absolute w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] transition-transform duration-300"
            style={{ left: `${lightPos.x}%`, top: `${lightPos.y}%`, transform: 'translate(-50%, -50%)' }}
          />

          <div className="relative perspective-2000 preserve-3d transition-transform duration-1000 group-hover:rotate-X-12">
             <h4 
               className="text-[120px] md:text-[180px] font-tech font-bold text-white uppercase leading-none tracking-tighter select-none transition-all duration-300"
               style={{ 
                 fontWeight: weight,
                 textShadow: Array.from({length: depth}).map((_, i) => (
                   `${(lightPos.x - 50) * 0.05 * i}px ${(lightPos.y - 50) * 0.05 * i}px 0px rgba(99, 102, 241, ${0.4 - i/depth})`
                 )).join(', ')
               }}
             >
                HEAVY
             </h4>
          </div>

          <div className="absolute bottom-12 right-12 text-right">
             <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest font-black">Shadow_Raycast: ENABLED</div>
          </div>
       </div>
    </div>
  );
};

const SpectralKerningVisualizer: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text = "KERNING";
  const letters = text.split("");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    containerRef.current.style.setProperty('--mx', x.toString());
    containerRef.current.style.setProperty('--my', y.toString());
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--mx', '0.5');
    containerRef.current.style.setProperty('--my', '0.5');
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-[550px] rounded-[64px] border flex items-center justify-center overflow-hidden transition-all duration-1000 group/kern
        ${isDark ? 'bg-zinc-950 border-white/5 shadow-2xl' : 'bg-white border-black/5'}
        [--mx:0.5] [--my:0.5]
      `}
    >
       <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-rose-500/5 opacity-50" />

       <div className="flex items-center justify-center gap-0 group/text select-none cursor-none z-10">
          {letters.map((char, i) => {
            const charPos = (i / (letters.length - 1));
            return (
              <div 
                key={i}
                className="text-7xl md:text-9xl font-tech font-black transition-all duration-500 ease-out will-change-transform"
                style={{ 
                  margin: `0 calc(max(0, 1.2 - abs(var(--mx) - ${charPos}) * 3.5) * 65px)`,
                  color: `color-mix(in srgb, #6366f1 calc(max(0, 1 - abs(var(--mx) - ${charPos}) * 3) * 100%), ${isDark ? '#fff' : '#000'})`,
                  transform: `translateY(calc(max(0, 1 - abs(var(--mx) - ${charPos}) * 3) * -40px)) scale(calc(1 + max(0, 1 - abs(var(--mx) - ${charPos}) * 3) * 0.15))`,
                }}
              >
                {char}
              </div>
            );
          })}
       </div>

       {/* Floating HUD Cursor */}
       <div 
         className="absolute w-24 h-24 border border-indigo-500/30 rounded-full flex items-center justify-center pointer-events-none transition-transform duration-75"
         style={{ left: `calc(var(--mx) * 100%)`, top: `calc(var(--my) * 100%)`, transform: 'translate(-50%, -50%)' }}
       >
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping shadow-[0_0_15px_#6366f1]" />
          <div className="absolute inset-0 border-2 border-dashed border-indigo-500/10 rounded-full animate-spin-slow" />
       </div>

       <div className="absolute bottom-12 left-12 flex items-center gap-4 text-zinc-500 opacity-40 group-hover/kern:opacity-100 transition-opacity">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span className="text-[10px] font-mono uppercase tracking-widest font-black">Spectral_Repulsion_Active</span>
       </div>
    </div>
  );
};

const FluidScalingVisualizer: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [viewportWidth, setViewportWidth] = useState(1440);
  const [ratio, setRatio] = useState(1.618); 
  const baseSize = 16;
  const minVW = 320;
  const maxVW = 1920;

  const calculateSize = (base: number, multiplier: number) => {
    const minSize = base * multiplier;
    const maxSize = base * multiplier * 1.5;
    const preferred = minSize + (maxSize - minSize) * ((viewportWidth - minVW) / (maxVW - minVW));
    return Math.min(Math.max(minSize, preferred), maxSize);
  };

  const hierarchy = [
    { label: 'H1_Display', multiplier: Math.pow(ratio, 3) },
    { label: 'H2_Headline', multiplier: Math.pow(ratio, 2) },
    { label: 'H3_Subhead', multiplier: ratio },
    { label: 'Body_Main', multiplier: 1 }
  ];

  return (
    <div className={`relative min-h-[700px] rounded-[64px] border overflow-hidden flex flex-col lg:flex-row transition-all duration-1000
      ${isDark ? 'bg-[#020204] border-white/5 shadow-2xl' : 'bg-zinc-50 border-black/5'}
    `}>
       <div className="w-full lg:w-96 border-r border-white/5 p-10 flex flex-col gap-8 bg-panel/30 backdrop-blur-xl shrink-0">
          <div className="space-y-2">
             <div className="flex items-center gap-3 text-indigo-500">
                <Scale className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-black">Ratio_Architect</span>
             </div>
             <h4 className="text-2xl font-tech font-bold text-text-main uppercase">Масштаб</h4>
          </div>

          <div className="space-y-8">
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase font-bold">
                   <span>Viewport</span>
                   <span className="text-indigo-500">{viewportWidth}px</span>
                </div>
                <div className="flex gap-1">
                   {[
                     { icon: Smartphone, w: 375 },
                     { icon: Tablet, w: 768 },
                     { icon: Monitor, w: 1440 }
                   ].map(d => (
                     <button key={d.w} onClick={() => { setViewportWidth(d.w); playUISound('click'); }} className={`flex-1 py-3 rounded-xl transition-all ${viewportWidth === d.w ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 text-zinc-500 hover:bg-white/10'}`}>
                        <d.icon className="w-4 h-4 mx-auto" />
                     </button>
                   ))}
                </div>
                <input type="range" min={minVW} max={maxVW} value={viewportWidth} onChange={e => setViewportWidth(parseInt(e.target.value))} className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none accent-indigo-500" />
             </div>

             <div className="space-y-4">
                <div className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Harmony_Interval</div>
                <div className="grid grid-cols-2 gap-2">
                   {[
                     { name: 'Golden', val: 1.618 },
                     { name: 'Perfect 5th', val: 1.500 },
                     { name: 'Major 3rd', val: 1.250 },
                     { name: 'Minor 3rd', val: 1.200 }
                   ].map(r => (
                     <button 
                       key={r.name} 
                       onClick={() => { setRatio(r.val); playUISound('click'); }}
                       className={`px-3 py-3 rounded-xl text-[8px] font-black uppercase transition-all border ${ratio === r.val ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/5 border-white/5 text-zinc-500 hover:bg-white/10'}`}
                     >
                       {r.name}
                     </button>
                   ))}
                </div>
             </div>
          </div>

          <div className="mt-auto p-6 bg-black/40 rounded-3xl font-mono text-[9px] text-indigo-400/60 space-y-1 border border-white/5">
             <p className="flex justify-between"><span>Ratio_Bias:</span> <span>{ratio.toFixed(3)}</span></p>
             <p className="flex justify-between"><span>Scaling_LOD:</span> <span>STABLE</span></p>
          </div>
       </div>

       <div className="flex-1 relative overflow-hidden flex items-center justify-center p-12 bg-black">
          {/* Fibonacci spiral visual hint */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
             <div className="w-[800px] h-[800px] border border-white rounded-full animate-spin-slow" />
          </div>
          
          <div 
            className="bg-zinc-900/40 border border-white/10 rounded-[48px] p-12 transition-all duration-1000 ease-out shadow-2xl relative overflow-hidden flex flex-col justify-center"
            style={{ width: `${Math.max(320, (viewportWidth / maxVW) * 100)}%`, maxWidth: '900px' }}
          >
             <div className="space-y-10 relative z-10">
                {hierarchy.map((item, i) => {
                  const size = calculateSize(baseSize, item.multiplier);
                  return (
                    <div key={i} className="group/item">
                       <div className="flex items-baseline gap-4 mb-2 opacity-0 group-hover/item:opacity-40 transition-opacity">
                          <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest">{item.label}</span>
                          <span className="text-[8px] font-mono text-zinc-500">{size.toFixed(1)}PX</span>
                       </div>
                       <h4 
                         className="font-tech font-bold text-white uppercase tracking-tighter leading-none transition-all duration-700"
                         style={{ fontSize: `${size}px` }}
                       >
                         {item.label.split('_')[0]} Matter
                       </h4>
                    </div>
                  );
                })}
             </div>
             <div className="absolute inset-0 pointer-events-none border-x border-white/[0.03]" />
          </div>
       </div>
    </div>
  );
};
