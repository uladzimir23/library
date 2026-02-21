import React, { useState, useContext } from 'react';
import { Globe, Sun, Zap, Maximize2, Camera, Palette } from 'lucide-react';
import { LanguageContext } from '../App';

type EnvType = 'cyberpunk' | 'arctic' | 'sunset';

export const ReflectionMatrix: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [env, setEnv] = useState<EnvType>('cyberpunk');
  const [reflectivity, setReflectivity] = useState(0.7);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const envConfigs = {
    cyberpunk: {
      bg: 'from-fuchsia-900/20 via-slate-900 to-indigo-900/20',
      glow: 'rgba(192, 38, 211, 0.4)',
      accent: 'text-fuchsia-500',
      label: 'Neon_Grid_0x44'
    },
    arctic: {
      bg: 'from-sky-100/10 via-slate-900 to-blue-900/20',
      glow: 'rgba(56, 189, 248, 0.3)',
      accent: 'text-sky-400',
      label: 'Crystal_Peak_v2'
    },
    sunset: {
      bg: 'from-orange-900/20 via-slate-900 to-rose-900/20',
      glow: 'rgba(244, 63, 94, 0.3)',
      accent: 'text-rose-500',
      label: 'Solara_Prime'
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -40;
    setRotation({ x: y, y: x });
  };

  return (
    <section className="py-32 scroll-mt-24 border-t border-black/5 dark:border-white/5" id="reflection">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              {t.reflection.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {t.reflection.title} <span className="text-indigo-500">{t.reflection.titleAccent}</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
              {t.reflection.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(['cyberpunk', 'arctic', 'sunset'] as EnvType[]).map((type) => (
              <button
                key={type}
                onClick={() => setEnv(type)}
                className={`p-4 rounded-2xl border transition-all text-center ${env === type ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-black/5 dark:bg-white/5 border-transparent hover:border-white/10 text-zinc-500'}`}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest">{type}</div>
              </button>
            ))}
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/10 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-2"><Sun className="w-3 h-3" /> {t.reflection.reflectivity}</span>
                <span className="font-mono text-indigo-500">{(reflectivity * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0.1" max="1" step="0.01" value={reflectivity}
                onChange={e => setReflectivity(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 p-5 bg-white/40 dark:bg-zinc-900/40 rounded-2xl border border-black/5 dark:border-white/5 flex items-center gap-4">
               <Camera className="w-5 h-5 text-indigo-500" />
               <div>
                  <div className="text-[9px] font-bold uppercase text-zinc-400">Environment_Map</div>
                  <div className="text-sm font-mono text-zinc-900 dark:text-white">{envConfigs[env].label}</div>
               </div>
            </div>
          </div>
        </div>

        {/* 3D Visualization Area */}
        <div 
          className={`flex-1 w-full h-[500px] rounded-[40px] border border-black/5 dark:border-white/10 relative overflow-hidden flex items-center justify-center transition-all duration-1000 bg-gradient-to-br ${envConfigs[env].bg}`}
          onMouseMove={handleMouseMove}
        >
           {/* Dynamic Environment Reflections (Animated Gradients) */}
           <div className="absolute inset-0 opacity-30 animate-pulse bg-[radial-gradient(circle_at_20%_30%,var(--glow-color),transparent_50%)]" style={{ '--glow-color': envConfigs[env].glow } as any} />
           
           {/* The Spatial Object */}
           <div 
             className="relative w-64 h-64 transition-transform duration-200 ease-out preserve-3d"
             style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
           >
              {/* Outer Glass Shell */}
              <div 
                className="absolute inset-0 rounded-full border border-white/30 backdrop-blur-2xl shadow-2xl"
                style={{ 
                  backgroundColor: `rgba(255, 255, 255, ${0.05 * reflectivity})`,
                  boxShadow: `inset 0 0 50px rgba(255,255,255,${0.2 * reflectivity}), 0 20px 60px rgba(0,0,0,0.4)`
                }}
              >
                {/* Surface Reflection Highligh */}
                <div className="absolute top-4 left-1/4 w-1/2 h-1/4 bg-gradient-to-b from-white/40 to-transparent rounded-full blur-md transform -rotate-12" />
                
                {/* Internal HUD Elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-32 h-32 border border-dashed border-white/10 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_15px_#6366f1]" />
                   </div>
                </div>

                {/* Core Sphere */}
                <div className="absolute inset-8 rounded-full bg-zinc-900/80 border border-white/5 flex items-center justify-center overflow-hidden">
                   <div 
                     className="absolute inset-0 opacity-50 bg-[conic-gradient(from_0deg,transparent,var(--glow-color),transparent)] animate-[spin_4s_linear_infinite]"
                     style={{ '--glow-color': envConfigs[env].glow } as any}
                   />
                   <Globe className="w-12 h-12 text-white/20 relative z-10" />
                </div>
              </div>

              {/* Orbiting Ring */}
              <div className="absolute inset-[-20px] border border-white/5 rounded-full transform rotate-X-60 pointer-events-none" />
           </div>

           {/* UI Overlay Labels */}
           <div className="absolute bottom-8 left-8 flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">REALTIME_REFLECTIONS: ON</span>
           </div>
        </div>
      </div>
    </section>
  );
};
