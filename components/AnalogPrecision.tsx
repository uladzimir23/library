import React, { useState, useContext, useRef, useEffect } from 'react';
// Fixed: Removed non-existent DialTone import from lucide-react
import { Disc, Activity, RefreshCcw, Sliders, ChevronRight } from 'lucide-react';
import { LanguageContext } from '../App';

export const AnalogPrecision: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [val1, setVal1] = useState(45);
  const [val2, setVal2] = useState(120);
  const [isRotating, setIsRotating] = useState(false);

  return (
    <section className="py-32 bg-[#121214] rounded-[64px] my-16 border border-zinc-800 shadow-2xl relative overflow-hidden" id="analog">
      {/* Background Tech Patterns */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
      
      <div className="container mx-auto px-12 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
          <div className="flex-1 space-y-8">
            <span className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Signal_Modulator_v9</span>
            <h2 className="text-5xl font-tech font-bold text-white uppercase leading-none">
              Analog <span className="text-amber-500">Precision.</span>
            </h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed">
              Fine-tune the interaction response. Our analog engine uses rotational physics to adjust material constants, allowing for high-precision calibration of the spatial lattice.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl">
                  <div className="text-[9px] font-mono text-zinc-500 uppercase mb-2">Current_Freq</div>
                  <div className="text-3xl font-tech font-bold text-amber-500">{val1.toFixed(1)}Hz</div>
               </div>
               <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl">
                  <div className="text-[9px] font-mono text-zinc-500 uppercase mb-2">Gain_Level</div>
                  <div className="text-3xl font-tech font-bold text-indigo-400">+{val2.toFixed(0)}db</div>
               </div>
            </div>
          </div>

          <div className="flex-1 w-full h-[500px] flex items-center justify-center gap-12">
             {[
               { val: val1, set: setVal1, label: 'Frequency', color: '#f59e0b' },
               { val: val2, set: setVal2, label: 'Resonance', color: '#6366f1' }
             ].map((knob, idx) => (
               <div key={idx} className="flex flex-col items-center gap-8">
                  <div className="relative group">
                     {/* The Knob */}
                     <div 
                       className="w-40 h-40 rounded-full bg-zinc-800 shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.1)] border-4 border-zinc-900 cursor-ns-resize flex items-center justify-center transition-transform active:scale-95"
                       style={{ transform: `rotate(${knob.val * 2}deg)` }}
                       onMouseDown={() => setIsRotating(true)}
                       onMouseUp={() => setIsRotating(false)}
                     >
                        {/* Direction Marker */}
                        <div className="absolute top-4 w-1 h-4 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
                        <div className="w-24 h-24 rounded-full bg-zinc-900 shadow-inner flex items-center justify-center">
                           <Disc className="w-10 h-10 text-zinc-700" />
                        </div>
                     </div>
                     
                     {/* Circular Degree Marks */}
                     <svg className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none -rotate-90">
                        <circle 
                          cx="50%" cy="50%" r="90" 
                          fill="none" stroke={knob.color} strokeWidth="2" strokeDasharray="565"
                          strokeDashoffset={565 - (565 * (knob.val / 180))}
                          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                          opacity="0.3"
                        />
                     </svg>
                  </div>
                  <div className="text-center">
                     <div className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-1">{knob.label}</div>
                     <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Mode: {isRotating ? 'Calibrating' : 'Stable'}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};