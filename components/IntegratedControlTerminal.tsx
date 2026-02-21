
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Terminal, Activity, Zap, Shield, Radio, ArrowUpRight, Power, Settings } from 'lucide-react';
import { LanguageContext } from '../App';

export const IntegratedControlTerminal: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [logs, setLogs] = useState<string[]>([]);
  const [power, setPower] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5
      });
    }
  };

  useEffect(() => {
    if (!power) return;
    const interval = setInterval(() => {
      const code = `0x${Math.random().toString(16).slice(2, 6).toUpperCase()}`;
      const actions = ['SYNC', 'FETCH', 'DECRYPT', 'EMIT', 'CALIBRATE'];
      setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${actions[Math.floor(Math.random()*actions.length)]}_${code}: OK`, ...prev.slice(0, 10)]);
    }, 1500);
    return () => clearInterval(interval);
  }, [power]);

  return (
    <div className="scroll-mt-24" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="mb-20">
         <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 inline-block">
           01_Integrated_HUD_v11
         </span>
         <h2 className="text-6xl font-tech font-bold tracking-tight text-zinc-900 dark:text-white uppercase leading-[0.9]">
           Контрольный <br /><span className="text-indigo-500">Терминал.</span>
         </h2>
      </div>

      <div 
        className="relative w-full h-[700px] bg-zinc-950 rounded-[80px] border border-white/5 overflow-hidden shadow-2xl flex flex-col lg:flex-row p-8 gap-8 transition-transform duration-700 ease-out preserve-3d"
        style={{ transform: `rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg)` }}
      >
         {/* Background Scanlines */}
         <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(99,102,241,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />

         {/* 1. LEFT PANEL: SYSTEM LOGS */}
         <div className="w-full lg:w-80 flex flex-col gap-6 bg-white/5 border border-white/10 rounded-[48px] p-8 backdrop-blur-2xl relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-4">
               <Terminal className="w-5 h-5 text-indigo-400" />
               <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">System_Log_Stream</span>
            </div>
            <div className="flex-1 space-y-2 font-mono text-[9px] text-zinc-600 transition-colors group-hover:text-indigo-300">
               {logs.length > 0 ? logs.map((log, i) => (
                 <div key={i} className="animate-in slide-in-from-left-2 opacity-80">{log}</div>
               )) : <div className="italic opacity-30">Awaiting data...</div>}
            </div>
            <div className="pt-4 border-t border-white/10">
               <div className="text-[8px] font-bold text-zinc-500 uppercase">Buffer_Level</div>
               <div className="h-1 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-indigo-500 animate-pulse" style={{ width: '64%' }} />
               </div>
            </div>
         </div>

         {/* 2. CENTER PANEL: DATA CORE (3D VIS) */}
         <div className="flex-1 bg-white/5 border border-white/10 rounded-[64px] relative flex flex-col items-center justify-center p-12 overflow-hidden shadow-inner">
            <div className="absolute top-10 flex justify-between w-full px-12">
               <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${power ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-800'}`} />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Status: {power ? 'ONLINE' : 'LOCKED'}</span>
               </div>
               <Activity className={`w-6 h-6 ${power ? 'text-indigo-500 animate-pulse' : 'text-zinc-800'}`} />
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center">
               <div className={`absolute inset-0 rounded-full border-2 border-indigo-500/10 transition-all duration-1000 ${power ? 'scale-150 opacity-40' : 'scale-100 opacity-5'}`} />
               <div className={`absolute inset-[-40px] border border-dashed border-indigo-500/20 rounded-full ${power ? 'animate-[spin_20s_linear_infinite]' : ''}`} />
               
               <div className={`relative w-40 h-40 bg-indigo-600 rounded-[48px] flex items-center justify-center text-white shadow-2xl transition-all duration-1000 ${power ? 'rotate-12 scale-110 shadow-indigo-500/50' : 'grayscale blur-sm'}`}>
                  <Zap className={`w-16 h-16 ${power ? 'animate-pulse' : ''}`} />
               </div>
            </div>

            <div className="absolute bottom-10 text-center">
               <div className="text-3xl font-tech font-bold text-white uppercase tracking-[0.2em] mb-2">Matter_Drive_v11</div>
               <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em]">Integrated_Fusion_Logic: OK</div>
            </div>
         </div>

         {/* 3. RIGHT PANEL: TACTILE CONTROLS */}
         <div className="w-full lg:w-80 bg-zinc-900 border border-white/5 rounded-[48px] p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-zinc-700 shadow-inner" />
            <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-zinc-700 shadow-inner" />
            
            <div className="space-y-10">
               <div className="flex flex-col items-center gap-4">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Master_Power</div>
                  <button 
                    onClick={() => setPower(!power)}
                    className={`w-20 h-20 rounded-full border-4 transition-all duration-300 flex items-center justify-center
                      ${power ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_30px_rgba(99,102,241,0.5)]' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}
                  >
                    <Power className="w-10 h-10" />
                  </button>
               </div>

               <div className="space-y-6">
                  {['Refraction', 'Density', 'Kinetics'].map((label, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between text-[8px] font-mono text-zinc-600 uppercase">
                          <span>{label}</span>
                          <span className="text-indigo-500">0x{(80 + i*5).toString(16)}</span>
                       </div>
                       <div className="h-1.5 w-full bg-black rounded-full overflow-hidden border border-white/5">
                          <div className="h-full bg-indigo-500/50" style={{ width: `${60 + i*10}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex justify-between items-center">
               <Settings className="w-5 h-5 text-zinc-700 hover:text-indigo-500 cursor-pointer" />
               <div className="text-[10px] font-mono text-zinc-700">COORD_X: {mousePos.x.toFixed(2)}</div>
            </div>
         </div>

         {/* Floating Alert HUD */}
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-1000 ${!power ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
            <div className="bg-rose-600/90 backdrop-blur-xl border border-rose-400 p-8 rounded-[48px] shadow-[0_0_100px_rgba(244,63,94,0.4)] flex flex-col items-center">
               <Shield className="w-12 h-12 text-white mb-4 animate-bounce" />
               <div className="text-2xl font-tech font-bold text-white uppercase tracking-widest">System_Locked</div>
               <div className="text-[9px] font-mono text-rose-200 mt-2">BREACH_DETECTED_0x88</div>
            </div>
         </div>
      </div>
    </div>
  );
};
