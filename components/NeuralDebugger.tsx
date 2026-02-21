
import React, { useState, useContext, useEffect } from 'react';
import { Cpu, Zap, Activity, Radio, Terminal, Settings, Share2, Network, Bug, ShieldCheck, AlertCircle, ShieldAlert, Sliders, RefreshCw, Gauge } from 'lucide-react';
import { LanguageContext } from '../App';
import { playUISound } from '../wooden/components/AudioService';

export const NeuralDebugger: React.FC = () => {
  const { t, isDiagnostic } = useContext(LanguageContext);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [bootSequence, setBootSequence] = useState(0);
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [scanFreq, setScanFreq] = useState(0.5);
  const [sensitivity, setSensitivity] = useState(0.7);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isInterrupted) return;
      setBootSequence(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100 * (1.1 - scanFreq));
    return () => clearInterval(interval);
  }, [isInterrupted, scanFreq]);

  const triggerInterrupt = () => {
    if (isInterrupted) return;
    setIsInterrupted(true);
    playUISound('process');
    setTimeout(() => {
      setIsInterrupted(false);
      playUISound('success');
    }, 3000 * (1.1 - sensitivity));
  };

  const nodes = [
    { id: 0, label: 'Opacity_Map', pos: 'top-10 left-10', color: 'indigo', code: '0x88.A' },
    { id: 1, label: 'Gaussian_BL', pos: 'top-10 right-10', color: 'emerald', code: '0x42.F' },
    { id: 2, label: 'Z_Index_Stack', pos: 'bottom-10 left-10', color: 'rose', code: '0x12.S' },
    { id: 3, label: 'Kinetic_Bias', pos: 'bottom-10 right-10', color: 'amber', code: '0x99.M' }
  ];

  return (
    <div className="relative rounded-[48px] border overflow-hidden bg-zinc-950 border-white/5 shadow-2xl p-1">
      {/* HEADER */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/50" />
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">Neural_Log_Debugger_Workbench_v2.0</div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Diagnostic_Mode: {isInterrupted ? 'INTERRUPTED' : 'MONITORING'}</div>
            <div className="w-12 h-1 bg-rose-500/20 rounded-full" />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[800px]">
         {/* SETTINGS */}
         <div className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-zinc-900/50">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-rose-500">
                  <Sliders className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Параметры_Сканирования</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Частота_Опроса</span>
                     <span className="text-rose-500">{(scanFreq * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.05" value={scanFreq} onChange={e => setScanFreq(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-rose-500" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                     <span>Чувствит_Прерываний</span>
                     <span className="text-rose-500">{(sensitivity * 100).toFixed(0)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.05" value={sensitivity} onChange={e => setSensitivity(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-rose-500" />
               </div>
            </div>

            <div className="mt-auto p-6 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-rose-500">
                  <Gauge className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase">Kernel_Integrity</span>
               </div>
               <div className="text-2xl font-tech font-bold text-white uppercase">{isInterrupted ? 'Error_0x8' : 'Verified'}</div>
            </div>
         </div>

         {/* VIEWPORT (Circuit Board) */}
         <div className={`flex-1 bg-[#0a0a0c] relative overflow-hidden flex flex-col lg:flex-row transition-all duration-300 ${isInterrupted ? 'grayscale invert-[0.1]' : ''}`}>
            <div className="flex-1 relative flex items-center justify-center p-12">
               <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-10">
                  {nodes.map(node => (
                    <line key={node.id} x1="50%" y1="50%" x2={node.pos.includes('left') ? '20%' : '80%'} y2={node.pos.includes('top') ? '20%' : '80%'} stroke={isInterrupted ? '#f43f5e' : '#6366f1'} strokeWidth="1" />
                  ))}
               </svg>

               <button 
                 onClick={triggerInterrupt}
                 className={`relative z-20 w-48 h-48 rounded-[48px] border flex flex-col items-center justify-center shadow-2xl transition-all duration-700 active:scale-95 group/cpu
                   ${isInterrupted ? 'bg-rose-600 border-rose-400' : 'bg-zinc-900 border-white/10 hover:border-indigo-500/50'}
                 `}
               >
                  {isInterrupted ? <ShieldAlert className="w-12 h-12 text-white animate-pulse" /> : <Cpu className="w-12 h-12 text-indigo-500" />}
                  <div className="mt-4 text-center">
                     <div className={`text-[8px] font-mono uppercase tracking-widest ${isInterrupted ? 'text-white' : 'text-zinc-600'}`}>0xDEB_MASTER</div>
                  </div>
               </button>

               {nodes.map((node) => (
                 <div 
                   key={node.id}
                   onMouseEnter={() => !isInterrupted && setActiveNode(node.id)}
                   onMouseLeave={() => setActiveNode(null)}
                   className={`absolute ${node.pos} w-40 p-6 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-3xl transition-all duration-500 cursor-pointer group/node
                     ${activeNode === node.id ? 'bg-white/10 border-indigo-500/50 scale-105 shadow-2xl' : ''}
                   `}
                 >
                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 group-hover/node:text-white">{node.label}</div>
                    <div className="text-[8px] font-mono text-indigo-400/60">{node.code}</div>
                 </div>
               ))}
            </div>

            {/* TERMINAL PANEL */}
            <div className="w-full lg:w-96 bg-black border-l border-white/5 p-8 flex flex-col shadow-2xl">
               <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <Terminal className="w-4 h-4 text-zinc-600" />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Deep_Debug_Stream</span>
               </div>
               <div className="flex-1 font-mono text-[9px] text-zinc-600 space-y-2 overflow-y-auto custom-scroll">
                  <p className="opacity-40"> SYSTEM_INIT_... OK</p>
                  <p className="opacity-60"> NODAL_MAP_SYNC_... DONE</p>
                  <p className="text-emerald-500"> HANDSHAKE_ESTABLISHED</p>
                  {activeNode !== null && (
                    <div className="pt-4 mt-4 border-t border-white/10 space-y-1 animate-in slide-in-from-bottom-2">
                       <p className="text-indigo-400"> INSPECTING: {nodes[activeNode].label}</p>
                       <p className="text-zinc-500">VAL: 0x882_STABLE</p>
                    </div>
                  )}
                  {isInterrupted && <p className="text-rose-500 animate-pulse"> KERNEL_PANIC: INTERRUPT_SEQ</p>}
               </div>
               <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                  <span>Slices: {bootSequence}%</span>
                  <RefreshCw className={`w-3 h-3 ${!isInterrupted ? 'animate-spin-slow' : ''}`} />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
