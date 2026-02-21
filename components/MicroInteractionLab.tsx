import React, { useState, useContext, useRef } from 'react';
import { Fingerprint, Zap, Sliders, ToggleRight, MousePointer2, Sparkles, Command } from 'lucide-react';
import { LanguageContext } from '../App';

export const MicroInteractionLab: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [toggle, setToggle] = useState(false);
  const [sliderVal, setSliderVal] = useState(50);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <section className="py-32 border-b border-black/5 dark:border-white/5" id="micro-lab">
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="text-center mb-24">
        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">
          Tactile_Precision
        </span>
        <h2 className="text-4xl md:text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
          Micro <span className="text-amber-500">Interactions.</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light max-w-3xl mx-auto mt-6">
          Beyond the click. We craft the subconscious feel of software through elastic animations and fluid physics that respond to the human touch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        
        {/* Gooey Toggle Card */}
        <div className="p-10 bg-white/40 dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 rounded-[48px] flex flex-col justify-between items-center group hover:border-amber-500/30 transition-all h-[400px]">
           <div className="w-full flex justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              <span>Gooey_Switch</span>
              <span className={toggle ? 'text-amber-500' : ''}>{toggle ? 'Active' : 'Idle'}</span>
           </div>
           
           <div 
             onClick={() => setToggle(!toggle)}
             className="relative w-32 h-16 bg-black/5 dark:bg-white/5 rounded-full p-2 cursor-pointer transition-colors"
             style={{ filter: 'url(#goo)' }}
           >
              <div className={`absolute w-12 h-12 rounded-full bg-amber-500 shadow-lg shadow-amber-500/40 transition-all duration-500 cubic-bezier(0.68, -0.55, 0.27, 1.55) ${toggle ? 'translate-x-16 rotate-180' : 'translate-x-0'}`} />
              <div className={`absolute w-8 h-8 rounded-full bg-amber-500/40 top-4 transition-all duration-700 ${toggle ? 'translate-x-4 opacity-0' : 'translate-x-20 opacity-100'}`} />
           </div>

           <p className="text-xs text-zinc-500 text-center font-light">Non-linear transition logic using metaball interpolation for organic feedback.</p>
        </div>

        {/* Refractive Button Card */}
        <div className="p-10 bg-white/40 dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 rounded-[48px] flex flex-col justify-between items-center group hover:border-indigo-500/30 transition-all h-[400px]">
           <div className="w-full flex justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              <span>Impact_Trigger</span>
              <Zap className="w-3 h-3 text-indigo-500" />
           </div>
           
           <button 
             onMouseDown={() => setIsPressed(true)}
             onMouseUp={() => setIsPressed(false)}
             onMouseLeave={() => setIsPressed(false)}
             className={`relative px-12 py-6 rounded-2xl bg-indigo-600 text-white font-tech font-bold uppercase tracking-[0.2em] transition-all duration-300 ${isPressed ? 'scale-90 shadow-none' : 'scale-100 shadow-2xl shadow-indigo-500/40'}`}
           >
              <span className="relative z-10">Initialize_Sync</span>
              {isPressed && (
                <div className="absolute inset-[-20px] rounded-[inherit] border-4 border-indigo-500/20 animate-ping" />
              )}
              {/* Refractive Ripple Effect */}
              <div className={`absolute inset-0 bg-white/20 backdrop-blur-xl transition-opacity duration-500 ${isPressed ? 'opacity-100' : 'opacity-0'}`} />
           </button>

           <p className="text-xs text-zinc-500 text-center font-light">Elastic recoil button with a simulated shockwave through the refractive stack.</p>
        </div>

        {/* Physics Slider Card */}
        <div className="p-10 bg-white/40 dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 rounded-[48px] flex flex-col justify-between items-center group hover:border-emerald-500/30 transition-all h-[400px]">
           <div className="w-full flex justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              <span>Tension_Slider</span>
              <span className="text-emerald-500">{sliderVal}%</span>
           </div>
           
           <div className="w-full space-y-8 py-10">
              <div className="relative h-12 flex items-center">
                 {/* Deforming Rail */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    <path 
                      d={`M 0,24 Q ${sliderVal * 3},${24 + (sliderVal > 50 ? 15 : -15)} 300,24`} 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      className="text-zinc-200 dark:text-zinc-800 transition-all duration-300"
                    />
                 </svg>
                 <input 
                   type="range" min="0" max="100" value={sliderVal}
                   onChange={(e) => setSliderVal(parseInt(e.target.value))}
                   className="relative z-10 w-full appearance-none bg-transparent cursor-pointer accent-emerald-500"
                 />
              </div>
           </div>

           <p className="text-xs text-zinc-500 text-center font-light">Momentum-based slider that simulates mechanical tension on the interaction rail.</p>
        </div>

      </div>
    </section>
  );
};
