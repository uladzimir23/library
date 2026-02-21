import React, { useState, useContext, useRef } from 'react';
import { Sun, Wind, Droplets, Zap, Activity, Thermometer, Shield, Cloud } from 'lucide-react';
import { LanguageContext } from '../App';

export const AtmosphericCoreSampler: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [level, setLevel] = useState(50); // 0 to 100
  const [hovered, setHovered] = useState(false);

  const getTheme = () => {
    if (level > 70) return { label: 'AETHER', color: 'sky', icon: Cloud, ior: 1.1 };
    if (level < 30) return { label: 'SOLID', color: 'rose', icon: Shield, ior: 2.4 };
    return { label: 'LIQUID', color: 'indigo', icon: Droplets, ior: 1.4 };
  };

  const theme = getTheme();

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5 bg-[#fafafa] dark:bg-[#050505]" id="core-sampler">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/10 text-sky-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Global_Token_Drift
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Atmospheric <br /><span className="text-sky-500">Core_Sampler.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces are environments. Adjust the global atmospheric core to shift the physical constants of your interface — from weightless aether to hyper-dense solid matter.
            </p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[48px] border border-white/5 space-y-10">
             <div className="flex justify-between items-center text-sky-400">
                <div className="flex items-center gap-3">
                   <Thermometer className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Core_Pressure</span>
                </div>
                <span className="text-3xl font-tech font-bold">{level.toFixed(0)}%</span>
             </div>

             <div className="relative h-64 flex justify-center">
                <div className="w-4 h-full bg-white/5 rounded-full relative overflow-hidden">
                   <div 
                     className={`absolute bottom-0 w-full transition-all duration-700 bg-${theme.color}-500 shadow-[0_0_20px_rgba(14,165,233,0.5)]`}
                     style={{ height: `${level}%` }}
                   />
                </div>
                <input 
                  type="range" min="0" max="100" step="1" value={level}
                  onChange={e => setLevel(parseInt(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ns-resize"
                  style={{ writingMode: 'bt-lr' as any }}
                />
                
                {/* Horizontal Level Markers */}
                <div className="absolute inset-y-0 right-10 flex flex-col justify-between py-2 text-[8px] font-mono text-zinc-600 uppercase">
                   <span>Aether_Max</span>
                   <span>Liquid_Neutral</span>
                   <span>Solid_Max</span>
                </div>
             </div>
          </div>
        </div>

        <div className="flex-[1.5] w-full h-[650px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
           {/* Environmental Backdrop Dynamic */}
           <div 
             className={`absolute inset-0 transition-all duration-1000 opacity-20 bg-${theme.color}-500`}
             style={{ filter: `blur(${100 - level}px)` }}
           />
           
           <div 
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
             className={`relative w-80 h-96 transition-all duration-700 ease-out border-2 rounded-[64px] shadow-2xl flex flex-col items-center justify-center p-12 overflow-hidden cursor-pointer`}
             style={{ 
               backgroundColor: `rgba(255, 255, 255, ${0.05 + (100 - level) / 500})`,
               backdropFilter: `blur(${level < 30 ? 5 : level > 70 ? 60 : 30}px)`,
               borderColor: `rgba(255,255,255, ${0.1 + (100 - level) / 300})`,
               transform: `scale(${hovered ? 1.05 : 1})`,
               boxShadow: `0 40px 100px -20px rgba(0,0,0,0.5)`
             }}
           >
              <div className={`w-24 h-24 rounded-[32px] bg-${theme.color}-500 flex items-center justify-center text-white shadow-2xl transition-all duration-700 ${hovered ? 'rotate-12 scale-110' : ''}`}>
                 <theme.icon className="w-12 h-12" />
              </div>
              
              <div className="mt-8 text-center">
                 <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-2">Matter_ID_0x{theme.label}</div>
                 <div className={`text-4xl font-tech font-bold text-white uppercase tracking-tighter`}>
                    {theme.label}
                 </div>
                 <div className="mt-4 text-[9px] font-mono text-emerald-500 uppercase tracking-widest">Refraction: {theme.ior}_n</div>
              </div>

              {/* Surface Dust / Bubbles based on level */}
              <div className={`absolute inset-0 transition-opacity duration-1000 ${level > 60 ? 'opacity-40' : 'opacity-0'}`}>
                 {[...Array(6)].map((_, i) => (
                   <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-ping" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, animationDelay: `${i*0.5}s` }} />
                 ))}
              </div>
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-sky-500 uppercase tracking-widest font-bold mb-1">Atmosphere_Calibration</div>
              <div className="text-[8px] font-mono text-zinc-600 uppercase">System_Load: Nominal</div>
           </div>
        </div>
      </div>
    </section>
  );
};
