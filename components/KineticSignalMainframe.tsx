
import React, { useState, useContext, useEffect } from 'react';
import { Terminal, Activity, Zap, Shield, Radio, Power, Settings, Globe, HardDrive, Cpu, Database, Monitor } from 'lucide-react';
import { LanguageContext } from '../App';

export const KineticSignalMainframe: React.FC = () => {
  const { isDiagnostic } = useContext(LanguageContext);
  const [pulse, setPulse] = useState(false);
  const [activeSystem, setActiveSystem] = useState<string | null>(null);

  const triggerPulse = (system: string) => {
    setActiveSystem(system);
    setPulse(true);
    setTimeout(() => {
      setPulse(false);
      setActiveSystem(null);
    }, 1500);
  };

  const systems = [
    { id: 'core', icon: Cpu, label: 'Compute_Unit' },
    { id: 'vram', icon: Database, label: 'Memory_Reg' },
    { id: 'uplink', icon: Globe, label: 'Sat_Edge' },
    { id: 'shield', icon: Shield, label: 'Enc_Protocol' }
  ];

  return (
    <div className="scroll-mt-32">
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           Industrial_Mainframe_0x88
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-white uppercase leading-[0.9]">
           Главный <br /><span className="text-indigo-500">Мэйнфрейм.</span>
         </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[800px]">
         {/* 1. INTERACTIVE CONTROL RACK */}
         <div className="lg:col-span-4 bg-[#121215] rounded-[64px] border-8 border-zinc-900 p-10 flex flex-col gap-10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8),0_40px_100px_rgba(0,0,0,0.5)] relative">
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
               <div className="flex items-center gap-4">
                  <Monitor className="w-6 h-6 text-zinc-600" />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest">Main_Rack_A1</span>
               </div>
               <div className={`w-3 h-3 rounded-full transition-all duration-500 ${pulse ? 'bg-indigo-500 shadow-[0_0_15px_#6366f1]' : 'bg-zinc-800'}`} />
            </div>

            <div className="flex-1 grid grid-cols-1 gap-6">
               {systems.map((sys) => (
                 <button 
                   key={sys.id}
                   onClick={() => triggerPulse(sys.id)}
                   className={`relative h-24 rounded-3xl border-2 transition-all duration-300 flex items-center px-8 gap-6 group overflow-hidden
                     ${activeSystem === sys.id 
                       ? 'bg-indigo-600 border-indigo-400 text-white shadow-[inset_0_4px_10px_rgba(255,255,255,0.3)] scale-95' 
                       : 'bg-zinc-800/50 border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:bg-zinc-800'}`}
                 >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeSystem === sys.id ? 'bg-white/20' : 'bg-black/40'}`}>
                       <sys.icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                       <div className="text-[8px] font-mono opacity-50 uppercase mb-1 tracking-widest">Relay_Path</div>
                       <div className="text-sm font-tech font-bold uppercase tracking-widest">{sys.label}</div>
                    </div>
                    {/* Recoil Animation Overlay */}
                    <div className={`absolute inset-0 bg-white/10 transition-opacity duration-300 ${activeSystem === sys.id ? 'opacity-100' : 'opacity-0'}`} />
                 </button>
               ))}
            </div>

            <div className="pt-8 border-t border-white/5 flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <Power className={`w-10 h-10 transition-all cursor-pointer ${pulse ? 'text-indigo-500 scale-90' : 'text-zinc-800 hover:text-zinc-600'}`} />
                  <span className="text-[8px] font-mono text-zinc-700 uppercase">Master_PWR</span>
               </div>
               <Settings className="w-5 h-5 text-zinc-800 hover:text-zinc-600 cursor-pointer" />
            </div>
         </div>

         {/* 2. LIVE SIGNAL DISPLAY */}
         <div className="lg:col-span-8 bg-zinc-950 rounded-[80px] border border-white/5 relative overflow-hidden flex flex-col p-12 shadow-2xl group/mainframe">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(99,102,241,0.02)_50%)] bg-[length:100%_4px] z-20 pointer-events-none" />
            
            {/* Energy Wave Visualization */}
            <div className="flex-1 flex flex-col justify-center items-center relative">
               <div className={`absolute w-[400px] h-[400px] rounded-full border-2 transition-all duration-1000 ${pulse ? 'scale-150 opacity-0 border-indigo-500' : 'scale-50 opacity-10 border-white/10'}`} />
               <div className={`absolute w-[300px] h-[300px] rounded-full border-2 transition-all duration-[1200ms] ${pulse ? 'scale-150 opacity-0 border-sky-500' : 'scale-50 opacity-10 border-white/10'}`} />
               
               <div className="relative z-30 flex flex-col items-center">
                  <Radio className={`w-24 h-24 transition-all duration-700 ${pulse ? 'text-indigo-500 scale-125' : 'text-zinc-900 animate-pulse'}`} />
                  <div className="mt-8 text-center space-y-4">
                     <div className="text-7xl font-tech font-bold text-white uppercase tracking-tighter leading-none">
                        {pulse ? 'SURGE_OK' : 'SYSTEM_IDLE'}
                     </div>
                     <div className="flex gap-2 justify-center">
                        {[...Array(8)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-8 rounded-full transition-all duration-500 ${pulse ? 'bg-indigo-500' : 'bg-zinc-900'}`}
                            style={{ height: pulse ? `${Math.random() * 40 + 20}px` : '4px', transitionDelay: `${i*0.05}s` }}
                          />
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Mainframe HUD Overlays */}
            <div className="flex justify-between items-end z-30">
               <div className="p-8 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-[40px] min-w-[280px] shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                     <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-indigo-500" />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">Sync_Coherence</span>
                     </div>
                     <span className="text-xl font-tech font-bold text-white">0.998</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full bg-indigo-500 transition-all duration-1000 ${pulse ? 'w-full' : 'w-1/3'}`} />
                  </div>
               </div>

               <div className="text-right">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-2 font-black">Terminal_Output: 0x88.A</div>
                  <div className="font-mono text-[9px] text-indigo-400 opacity-40 leading-relaxed uppercase">
                      ALLOCATING_BUFFERS_... [OK]<br />
                      HANDSHAKE_PROTOCOL_... [READY]<br />
                      KINETIC_FORCE_CALIB_... [DONE]
                  </div>
               </div>
            </div>

            {/* Corner Diagnostic Marker */}
            <div className="absolute top-12 left-12 flex items-center gap-3">
               <div className={`w-2 h-2 rounded-full ${pulse ? 'bg-indigo-500 animate-ping' : 'bg-zinc-800'}`} />
               <span className="text-[9px] font-tech text-zinc-600 uppercase tracking-[0.4em] font-black">Monitoring_Link_088</span>
            </div>
         </div>
      </div>
    </div>
  );
};
