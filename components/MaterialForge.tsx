import React, { useState, useContext } from 'react';
import { Beaker, Shield, Zap, Droplet, Layers, Box, Sparkles, Activity } from 'lucide-react';
import { LanguageContext } from '../App';

type MaterialType = 'Lead' | 'Glass' | 'Mercury' | 'Helium';

export const MaterialForge: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [material, setMaterial] = useState<MaterialType>('Glass');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const materialConfig = {
    Lead: { color: 'zinc', blur: 5, opacity: 0.8, weight: '92kg', icon: Shield, shadow: 'shadow-2xl' },
    Glass: { color: 'sky', blur: 30, opacity: 0.1, weight: '4kg', icon: Box, shadow: 'shadow-sky-500/20' },
    Mercury: { color: 'slate', blur: 0, opacity: 0.9, weight: '13kg', icon: Droplet, shadow: 'shadow-zinc-500/40' },
    Helium: { color: 'amber', blur: 15, opacity: 0.05, weight: '0.1kg', icon: Sparkles, shadow: 'shadow-amber-500/50' }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="material-forge">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-80 space-y-8 bg-white/40 dark:bg-zinc-900/40 p-8 rounded-[40px] border border-black/5 dark:border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-6 text-fuchsia-500">
              <Beaker className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Material_Forge</span>
           </div>

           <div className="grid grid-cols-2 gap-3">
              {(['Lead', 'Glass', 'Mercury', 'Helium'] as MaterialType[]).map(m => (
                <button 
                  key={m}
                  onClick={() => setMaterial(m)}
                  className={`py-3 rounded-2xl text-[9px] font-bold uppercase tracking-widest border transition-all ${material === m ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-transparent shadow-xl scale-[1.02]' : 'bg-black/5 dark:bg-white/5 border-transparent text-zinc-500 hover:bg-black/10'}`}
                >
                  {m}
                </button>
              ))}
           </div>

           <div className="p-6 bg-zinc-900 rounded-3xl border border-white/5 space-y-4 transition-all">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase text-zinc-500">
                 <span>Effective_Mass</span>
                 <span className="text-fuchsia-500 font-mono">{materialConfig[material].weight}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase text-zinc-500">
                 <span>Material_Class</span>
                 <span className="text-fuchsia-500 font-mono">0x{material.toUpperCase()}</span>
              </div>
           </div>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 w-full h-[650px] bg-zinc-50 dark:bg-zinc-950/20 rounded-[64px] relative overflow-hidden flex items-center justify-center perspective-2000"
        >
           {/* Forge Glow */}
           <div className={`absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 transition-all duration-1000 bg-${materialConfig[material].color}-500`} />

           {/* The Resultant Component */}
           <div 
             className={`relative w-80 h-96 transition-all duration-700 ease-out border border-white/20 rounded-[56px] flex flex-col items-center justify-center p-12 overflow-hidden ${materialConfig[material].shadow}`}
             style={{ 
               backgroundColor: `rgba(${material === 'Lead' ? '63, 63, 70' : '255, 255, 255'}, ${materialConfig[material].opacity})`,
               backdropFilter: `blur(${materialConfig[material].blur}px)`,
               transform: `rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg) translateY(${material === 'Helium' ? '-20px' : material === 'Lead' ? '20px' : '0px'})`,
               transitionDuration: material === 'Helium' ? '1.5s' : '0.7s'
             }}
           >
              {/* Special effects per material */}
              {material === 'Mercury' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-400 via-white/40 to-zinc-400 opacity-60 animate-pulse" />
              )}
              {material === 'Helium' && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.2),transparent_70%)] animate-pulse" />
              )}

              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 bg-${materialConfig[material].color}-500 text-white shadow-xl transition-all duration-700`}>
                 {React.createElement(materialConfig[material].icon, { className: "w-10 h-10" })}
              </div>
              <div className="text-center relative z-20">
                 <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-zinc-900 dark:text-white">Forgery_ID: 088</div>
                 <div className="text-3xl font-tech font-bold text-zinc-900 dark:text-white tracking-tighter uppercase">{material}</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
