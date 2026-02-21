import React, { useState, useContext } from 'react';
import { Box, Monitor, RefreshCcw, Wand2, Loader2, Sparkles, Gem, Sliders, Share2 } from 'lucide-react';
import { generateGlassStyle } from '../services/geminiService';
import { GlassStudioState } from '../types';
import { LanguageContext } from '../App';

export const GlassStudio: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [state, setState] = useState<GlassStudioState>({
    opacity: 0.1,
    blur: 24,
    borderAlpha: 0.2,
    radius: 32,
    zMultiplier: 1,
    is3D: true,
    isFloating: true,
    accentColor: '#6366f1',
    title: 'Prototype_v10'
  });

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState({ x: 15, y: -15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!state.is3D) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -40;
    setRotation({ x: y + 15, y: x - 15 });
  };

  const resetView = () => setRotation({ x: 15, y: -15 });

  const handleAI = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    try {
      const result = await generateGlassStyle(prompt);
      if (result.studioValues) {
        setState(prev => ({ ...prev, ...result.studioValues }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32" id="studio">
      <div className="flex flex-col items-center mb-16">
        <span className="text-[10px] font-tech text-indigo-500 uppercase tracking-[0.5em] mb-4">{t.studio.tag}</span>
        <h2 className="text-4xl font-tech font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-white">{t.studio.title}</h2>
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-[800px] bg-white/60 dark:bg-zinc-950/40 border border-black/5 dark:border-white/10 rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 dark:shadow-none">
        {/* Left Toolbar */}
        <div className="w-full lg:w-80 bg-black/5 dark:bg-zinc-900/30 border-r border-black/5 dark:border-white/5 p-8 space-y-10">
          <div className="flex items-center gap-3 text-zinc-400 font-tech text-[10px] uppercase tracking-widest border-b border-black/5 dark:border-white/10 pb-4">
            <Sliders className="w-4 h-4" /> {t.studio.settings}
          </div>

          <div className="space-y-8">
            {[
              { label: t.studio.opacity, key: 'opacity', min: 0, max: 1, step: 0.01 },
              { label: t.studio.blur, key: 'blur', min: 0, max: 64, step: 1 },
              { label: t.studio.border, key: 'borderAlpha', min: 0, max: 1, step: 0.01 },
              { label: t.studio.radius, key: 'radius', min: 0, max: 64, step: 1 }
            ].map(ctrl => (
              <div key={ctrl.key} className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  <span>{ctrl.label}</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{(state as any)[ctrl.key]}</span>
                </div>
                <input 
                  type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={(state as any)[ctrl.key]}
                  onChange={e => setState({...state, [ctrl.key]: parseFloat(e.target.value)})}
                  className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-black/5 dark:border-white/10 space-y-4">
            <div className="flex items-center gap-3 text-zinc-400 font-tech text-[10px] uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" /> {t.studio.aiTag}
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder={t.studio.placeholder}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className="w-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl py-3.5 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 shadow-sm transition-all"
              />
              <button 
                onClick={handleAI}
                disabled={loading || !prompt}
                className="absolute right-2 top-2 bottom-2 px-3 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Wand2 className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Studio Viewport */}
        <div 
          className="flex-1 min-h-[500px] relative flex items-center justify-center p-12 overflow-hidden perspective-2000 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_100%)]"
          onMouseMove={handleMouseMove}
        >
          {/* Floating Controls */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-black/40 backdrop-blur-2xl border border-black/5 dark:border-white/10 p-1.5 rounded-2xl flex gap-1 z-50 shadow-xl">
            <button 
              onClick={() => setState({...state, is3D: false})}
              className={`p-2.5 rounded-xl transition-all ${!state.is3D ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-zinc-500 hover:text-indigo-600 dark:hover:text-white'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setState({...state, is3D: true})}
              className={`p-2.5 rounded-xl transition-all ${state.is3D ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-zinc-500 hover:text-indigo-600 dark:hover:text-white'}`}
            >
              <Box className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-black/5 dark:bg-white/10 mx-2 my-auto" />
            <button onClick={resetView} className="p-2.5 text-zinc-500 hover:text-indigo-600 dark:hover:text-white transition-all">
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Result Card */}
          <div 
            className={`w-full max-w-lg aspect-[1.6/1] transition-all duration-300 preserve-3d shadow-2xl shadow-black/10 dark:shadow-none ${state.isFloating ? 'animate-float' : ''}`}
            style={{
              transform: state.is3D ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'none',
              backgroundColor: `rgba(255, 255, 255, ${state.opacity})`,
              backdropFilter: `blur(${state.blur}px)`,
              border: `${state.borderAlpha > 0 ? '1.5px' : '0px'} solid rgba(125, 125, 125, ${state.borderAlpha})`,
              borderRadius: `${state.radius}px`,
              animationDuration: '8s'
            }}
          >
            <div className="h-full p-10 flex flex-col justify-between relative z-10 font-tech text-zinc-900 dark:text-white">
              <div className="flex justify-between items-start">
                <div 
                  className="w-16 h-16 rounded-3xl flex items-center justify-center border border-black/5 dark:border-white/10 shadow-2xl"
                  style={{ backgroundColor: `${state.accentColor}33`, boxShadow: `0 0 40px -10px ${state.accentColor}66` }}
                >
                   <Gem className="w-8 h-8" style={{ color: state.accentColor }} />
                </div>
                <div className="flex gap-2 bg-white/50 dark:bg-black/40 px-3 py-1.5 rounded-full border border-black/5 dark:border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{t.studio.instance}</span>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold tracking-tight mb-2 uppercase">{state.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-500 text-xs tracking-[0.2em] font-medium">REFR_OBJECT_V10.OBJ</p>
              </div>
              
              <div className="flex justify-between items-end border-t border-black/5 dark:border-white/10 pt-8">
                <div className="flex gap-6">
                  <div className="space-y-1">
                    <div className="text-[9px] uppercase tracking-widest text-zinc-400">Index</div>
                    <div className="text-xs font-mono">0xSPATIAL_88</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] uppercase tracking-widest text-zinc-400">Density</div>
                    <div className="text-xs font-mono">0.82_PRO</div>
                  </div>
                </div>
                <button className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg hover:scale-110 transition-transform">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
