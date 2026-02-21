

import React, { useState } from 'react';
import { Volume2, Radio } from 'lucide-react';

interface Props {
  theme: 'dark' | 'light';
}

// Fixed: Added Props generic to React.FC to define the theme prop type
export const TactileMixingConsole: React.FC<Props> = ({ theme }) => {
  const [channels, setChannels] = useState([80, 40, 60, 20]);
  const isDark = theme === 'dark';

  const updateChannel = (i: number, val: number) => {
    const next = [...channels];
    next[i] = val;
    setChannels(next);
  };

  return (
    <div className="scroll-mt-32">
      <div className="mb-20">
         <span className="text-[9px] font-mono opacity-30 uppercase tracking-[0.6em] mb-4 block">Analog_Signal_Path</span>
         <h2 className="text-6xl font-tech font-bold uppercase tracking-tighter">Микшер.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {channels.map((val, i) => (
           <div 
             key={i}
             className={`rounded-[48px] border p-12 flex flex-col items-center justify-between transition-all duration-500 overflow-hidden relative
               ${isDark ? 'bg-black/20 border-white/5 hover:border-white/10' : 'bg-white border-black/5 shadow-lg hover:shadow-xl'}
             `}
           >
              <div className="text-center relative z-10">
                 <div className="text-[8px] font-mono text-zinc-500 uppercase mb-2">Ch_0{i+1}</div>
                 <div className="text-xl font-tech font-bold uppercase tracking-widest">{['Vocals', 'Drums', 'Synth', 'Master'][i]}</div>
              </div>

              {/* TACTILE SLIDER - ULTRA MINIMAL */}
              <div className="relative h-64 flex justify-center w-full my-8">
                 <div className={`w-0.5 h-full rounded-full relative overflow-hidden ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                    <div 
                      className="absolute bottom-0 w-full bg-amber-600"
                      style={{ height: `${val}%` }}
                    />
                 </div>
                 <input 
                   type="range" min="0" max="100" value={val}
                   onChange={e => updateChannel(i, parseInt(e.target.value))}
                   className="absolute inset-0 opacity-0 cursor-ns-resize"
                   style={{ writingMode: 'bt-lr' as any }}
                 />
                 {/* FADER KNOB */}
                 <div 
                    className={`absolute left-1/2 -translate-x-1/2 w-14 h-8 rounded-lg shadow-xl pointer-events-none transition-all duration-300 flex items-center justify-center border
                      ${isDark ? 'bg-zinc-800 border-white/10' : 'bg-white border-black/10'}
                    `}
                    style={{ bottom: `calc(${val}% - 16px)` }}
                 >
                    <div className="w-8 h-[1px] bg-amber-500 opacity-40" />
                 </div>
              </div>

              <div className="flex justify-between w-full relative z-10 text-[9px] font-mono opacity-20">
                 <Radio className="w-4 h-4" />
                 <span>{val}%</span>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};