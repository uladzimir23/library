import React, { useState, useContext } from 'react';
import { Power, ToggleLeft, ToggleRight, Radio, Settings, Activity } from 'lucide-react';
import { LanguageContext } from '../App';

export const TactileSwitchboard: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [switches, setSwitches] = useState([true, false, true, false]);
  const [power, setPower] = useState(false);

  const toggleSwitch = (i: number) => {
    const newSwitches = [...switches];
    newSwitches[i] = !newSwitches[i];
    setSwitches(newSwitches);
  };

  return (
    <section className="py-32 bg-[#e2e2e7] dark:bg-[#1a1a1e] rounded-[64px] my-16 border-8 border-[#d1d1d6] dark:border-[#121214] shadow-inner overflow-hidden" id="switchboard">
      <div className="container mx-auto px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <div className="inline-block px-4 py-1 bg-zinc-800 text-zinc-100 text-[10px] font-mono rounded-md uppercase tracking-widest">
              Manual_Override_System
            </div>
            <h2 className="text-5xl font-tech font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter leading-none">
              Tactile <br /><span className="text-zinc-500">Switchboard.</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg font-medium leading-relaxed font-sans">
              Digital feedback, physical feeling. These controls use high-definition skeuomorphic shadows to simulate the mechanical resistance of industrial hardware.
            </p>
            
            <div className="flex items-center gap-6 p-4 bg-[#d1d1d6]/50 dark:bg-black/20 rounded-2xl border border-white/20">
               <div className={`w-3 h-3 rounded-full transition-all duration-300 ${power ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-zinc-400 opacity-30'}`} />
               <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Master_System_Status: {power ? 'ONLINE' : 'OFFLINE'}</div>
            </div>
          </div>

          <div className="flex-1 w-full grid grid-cols-2 gap-8 p-12 bg-[#ebebef] dark:bg-[#232328] rounded-[48px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.1),0_20px_50px_rgba(0,0,0,0.2)] border border-white/10 relative">
             {/* Industrial Rivets */}
             <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-zinc-400 shadow-inner" />
             <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-zinc-400 shadow-inner" />
             <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-zinc-400 shadow-inner" />
             <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-zinc-400 shadow-inner" />

             {switches.map((active, i) => (
               <div key={i} className="flex flex-col items-center gap-4">
                  <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Relay_0x0{i}</div>
                  <button 
                    onClick={() => toggleSwitch(i)}
                    className={`w-20 h-28 rounded-2xl transition-all duration-200 relative flex flex-col items-center justify-between p-3 border-2 
                      ${active 
                        ? 'bg-[#f0f0f5] dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.1),0_8px_15px_rgba(0,0,0,0.1)]' 
                        : 'bg-[#d1d1d6] dark:bg-zinc-900 border-zinc-400 dark:border-zinc-950 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2)]'}`}
                  >
                     <div className={`w-full h-1 rounded-full transition-colors ${active ? 'bg-indigo-500' : 'bg-zinc-500'}`} />
                     {active ? <ToggleRight className="w-8 h-8 text-indigo-500" /> : <ToggleLeft className="w-8 h-8 text-zinc-500" />}
                     <span className={`text-[9px] font-bold ${active ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>{active ? 'ON' : 'OFF'}</span>
                  </button>
               </div>
             ))}

             <div className="col-span-2 mt-8 flex justify-center">
                <button 
                  onClick={() => setPower(!power)}
                  className={`group relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 border-4
                    ${power 
                      ? 'bg-red-500 border-red-400 text-white shadow-[0_0_30px_rgba(239,68,68,0.4),inset_0_4px_8px_rgba(255,255,255,0.3)] scale-95' 
                      : 'bg-zinc-300 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 shadow-[0_10px_20px_rgba(0,0,0,0.2)]'}`}
                >
                   <Power className={`w-10 h-10 ${power ? 'animate-pulse' : ''}`} />
                   <div className="absolute -top-12 bg-zinc-900 text-white text-[8px] font-mono px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">MASTER_PWR</div>
                </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
