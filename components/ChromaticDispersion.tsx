import React, { useState, useContext } from 'react';
import { Aperture, Sparkles, Zap, Activity, Sun, Filter } from 'lucide-react';
import { LanguageContext } from '../App';

export const ChromaticDispersion: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [power, setPower] = useState(0.5);
  const [hovered, setHovered] = useState(false);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="chromatic-dispersion">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/10 text-violet-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
              Optic_Physics_v9
            </span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
              Chromatic <br /><span className="text-violet-500">Dispersion.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mt-6">
              Interfaces with soul. We simulate high-energy light diffraction at the material boundaries, creating organic spectral shifts that respond to interaction force and lighting conditions.
            </p>
          </div>

          <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[40px] border border-black/5 dark:border-white/10 space-y-8">
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                   <span className="flex items-center gap-2"><Filter className="w-3 h-3" /> Prism_Intensity</span>
                   <span className="font-mono text-violet-500">{(power * 100).toFixed(0)}%</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.01" value={power}
                  onChange={e => setPower(parseFloat(e.target.value))}
                  className="w-full h-1 bg-black/10 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
                <Sun className="w-5 h-5 text-violet-500 mb-3" />
                <div className="text-[9px] font-bold text-zinc-400 uppercase">Light_Vector</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">0x88_RAY</div>
             </div>
             <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
                <Activity className="w-5 h-5 text-emerald-500 mb-3" />
                <div className="text-[9px] font-bold text-zinc-400 uppercase">Wavelength</div>
                <div className="text-xl font-tech font-bold text-zinc-900 dark:text-white">540_NM</div>
             </div>
          </div>
        </div>

        <div 
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex-1 w-full h-[600px] bg-zinc-950 rounded-[64px] relative overflow-hidden flex items-center justify-center group shadow-2xl"
        >
           {/* Dynamic Prismatic Halo */}
           <div 
             className="absolute w-96 h-96 rounded-full blur-[100px] transition-all duration-1000 opacity-20"
             style={{ 
               background: `conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)`,
               transform: `rotate(${hovered ? 360 : 0}deg) scale(${1 + power * 0.5})`
             }}
           />

           {/* The Dispersed Object */}
           <div className="relative w-80 h-96">
              {/* RGB Offset Layers */}
              <div 
                className="absolute inset-0 border-2 border-red-500/20 rounded-[48px] blur-[2px] transition-transform duration-500"
                style={{ transform: `translate(${power * 10}px, ${power * 10}px)` }}
              />
              <div 
                className="absolute inset-0 border-2 border-blue-500/20 rounded-[48px] blur-[2px] transition-transform duration-500"
                style={{ transform: `translate(${power * -10}px, ${power * -10}px)` }}
              />

              {/* Core Glass Slab */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[48px] shadow-2xl flex flex-col items-center justify-center p-12 group-hover:scale-[0.98] transition-transform duration-700">
                 <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-xl">
                    <Aperture className={`w-10 h-10 text-white transition-all duration-1000 ${hovered ? 'rotate-180 scale-110' : ''}`} />
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-2 text-white">Spectral_ID</div>
                    <div className="text-2xl font-tech font-bold text-white uppercase tracking-widest">Diffraction</div>
                 </div>
                 
                 {/* Internal rainbow refraction effect */}
                 <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 rounded-[48px] pointer-events-none" />
              </div>
           </div>

           <div className="absolute bottom-12 right-12 text-right">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Optic_Calibration</div>
              <div className="text-xs font-bold text-violet-400">STATE: NOMINAL_0x88</div>
           </div>
        </div>
      </div>
    </section>
  );
};
